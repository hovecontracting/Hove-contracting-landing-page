type ContactPayload = {
  name: string
  contact: string
  message: string
  website?: string
}

function readEnv(name: string) {
  const value = process.env[name]
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function clamp(value: string, max: number) {
  return value.length > max ? value.slice(0, max) : value
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function readJson(req: any) {
  if (req?.body && typeof req.body === 'object') return req.body

  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw.trim()) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'POST')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed' }))
    return
  }

  const body = await readJson(req)
  const payload: Partial<ContactPayload> = body && typeof body === 'object' ? body : {}

  if (isNonEmptyString(payload.website)) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: true }))
    return
  }

  const name = isNonEmptyString(payload.name) ? clamp(payload.name.trim(), 120) : ''
  const contact = isNonEmptyString(payload.contact) ? clamp(payload.contact.trim(), 200) : ''
  const message = isNonEmptyString(payload.message) ? clamp(payload.message.trim(), 5000) : ''

  if (!name || !contact || !message) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: false, error: 'Missing required fields' }))
    return
  }

  const toEmail = readEnv('CONTACT_TO_EMAIL') ?? 'hovecontracting@gmail.com'
  const fromEmail = readEnv('CONTACT_FROM_EMAIL')
  const resendApiKey = readEnv('RESEND_API_KEY')

  if (!fromEmail || !resendApiKey) {
    res.statusCode = 501
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: false, error: 'Email service not configured' }))
    return
  }

  const subject = `Website enquiry from ${name}`
  const text = [`Name: ${name}`, `Contact: ${contact}`, '', message].join('\n')
  const replyTo = looksLikeEmail(contact) ? contact : undefined

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      text,
    }),
  }).catch(() => null)

  if (!response || !response.ok) {
    res.statusCode = 502
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: false, error: 'Failed to send email' }))
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ ok: true }))
}
