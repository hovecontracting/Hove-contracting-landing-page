import { useId, useMemo, useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'

type FormState = {
  name: string
  contact: string
  message: string
}

type Props = {
  emailTo: string
}

function validate(state: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {}

  if (!state.name.trim()) errors.name = 'Please enter your name.'
  if (!state.contact.trim()) errors.contact = 'Please enter an email or phone number.'
  if (!state.message.trim()) errors.message = 'Please add a short message about the project.'

  return errors
}

export default function ContactForm({ emailTo }: Props) {
  const headingId = useId()
  const [state, setState] = useState<FormState>({ name: '', contact: '', message: '' })
  const [submitted, setSubmitted] = useState<'idle' | 'sent'>('idle')
  const [submitError, setSubmitError] = useState<{ message: string; showEmailLink?: boolean } | null>(null)
  const [sending, setSending] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const errors = useMemo(() => validate(state), [state])
  const hasErrors = Object.keys(errors).length > 0

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setSubmitted('idle')
    setState((s) => ({ ...s, [key]: value }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched({ name: true, contact: true, message: true })
    setSubmitError(null)

    if (Object.keys(validate(state)).length > 0) return

    setSending(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name,
          contact: state.contact,
          message: state.message,
        }),
      })

      const result = await response.json()

      if (response.ok && result.ok) {
        setSubmitted('sent')
        setState({ name: '', contact: '', message: '' })
        setTouched({})
        return
      }

      setSubmitError({ message: 'Something went wrong sending your message. Please email us or try again later.', showEmailLink: true })
    } catch {
      setSubmitError({ message: 'Something went wrong sending your message. Please email us or try again later.', showEmailLink: true })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="w-full rounded-2xl border border-hove-brown/10 bg-hove-gray p-6 shadow-sm sm:p-8">
      <h3 id={headingId} className="sr-only">Contact</h3>

      {submitted === 'sent' ? (
        <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-hove-brown/10 bg-hove-gray px-3 py-2 text-sm font-medium text-hove-brown">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Message sent — we’ll get back to you promptly.
        </div>
      ) : null}

      {submitError ? (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          <span>{submitError.message}</span>
          {submitError.showEmailLink ? (
            <>
              {' '}
              <a href={`mailto:${emailTo}`} className="underline underline-offset-4">
                {emailTo}
              </a>
            </>
          ) : null}
        </div>
      ) : null}

      <form
        aria-labelledby={headingId}
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={state.name}
            onChange={(e) => setField('name', e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            className="mt-1 block w-full rounded-lg border border-hove-brown/20 bg-hove-gray px-3 py-2 text-hove-brown placeholder-hove-brown-light/70 focus:border-hove-brown/40 focus:outline-none focus:ring-1 focus:ring-hove-brown/25 sm:text-sm"
            placeholder="Your name"
            autoComplete="name"
          />
          {touched.name && errors.name ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contactInfo" className="block text-sm font-medium text-zinc-700">
            Email or phone
          </label>
          <input
            id="contactInfo"
            name="contactInfo"
            value={state.contact}
            onChange={(e) => setField('contact', e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, contact: true }))}
            className="mt-1 block w-full rounded-lg border border-hove-brown/20 bg-hove-gray px-3 py-2 text-hove-brown placeholder-hove-brown-light/70 focus:border-hove-brown/40 focus:outline-none focus:ring-1 focus:ring-hove-brown/25 sm:text-sm"
            placeholder="name@example.com"
            autoComplete="email"
          />
          {touched.contact && errors.contact ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.contact}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-700">
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            value={state.message}
            onChange={(e) => setField('message', e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            rows={4}
            className="mt-1 block w-full resize-none rounded-lg border border-hove-brown/20 bg-hove-gray px-3 py-2 text-hove-brown placeholder-hove-brown-light/70 focus:border-hove-brown/40 focus:outline-none focus:ring-1 focus:ring-hove-brown/25 sm:text-sm"
            placeholder="Tell us what you need painted..."
          />
          {touched.message && errors.message ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          aria-disabled={sending}
          disabled={sending || (hasErrors && (touched.name || touched.contact || touched.message))}
          className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-hove-brown px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-hove-brown-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hove-brown/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
