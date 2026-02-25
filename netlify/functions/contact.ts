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

export async function handler(event: any) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json; charset=utf-8', Allow: 'POST' },
      body: JSON.stringify({ ok: false, error: 'Method Not Allowed' }),
    }
  }

  let body: any = null
  try {
    body = event.body ? JSON.parse(event.body) : null
  } catch {
    body = null
  }

  const payload: Partial<ContactPayload> = body && typeof body === 'object' ? body : {}

  if (isNonEmptyString(payload.website)) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: true }),
    }
  }

  const name = isNonEmptyString(payload.name) ? clamp(payload.name.trim(), 120) : ''
  const contact = isNonEmptyString(payload.contact) ? clamp(payload.contact.trim(), 200) : ''
  const message = isNonEmptyString(payload.message) ? clamp(payload.message.trim(), 5000) : ''

  if (!name || !contact || !message) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: false, error: 'Missing required fields' }),
    }
  }

  const toEmail = readEnv('CONTACT_TO_EMAIL') ?? 'hovecontracting@gmail.com'
  const fromEmail = readEnv('CONTACT_FROM_EMAIL')
  const resendApiKey = readEnv('RESEND_API_KEY')

  if (!fromEmail || !resendApiKey) {
    return {
      statusCode: 501,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: false, error: 'Email service not configured' }),
    }
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
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: false, error: 'Failed to send email' }),
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ ok: true }),
  }
}

