import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import ContactForm from '@/components/ContactForm'

describe('ContactForm', () => {
  it('submits to Netlify Forms and shows success state', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

        render(<ContactForm emailTo="test@example.com" />)

    await user.type(screen.getByLabelText(/name/i), 'Alex')
    await user.type(screen.getByLabelText(/email or phone/i), 'alex@example.com')
    await user.type(screen.getByLabelText(/project details/i), 'Hello there')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      '/',
      expect.objectContaining({ method: 'POST' }),
    )

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument()
  })
})
