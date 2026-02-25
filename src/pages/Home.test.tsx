import { render, screen } from '@testing-library/react'
import Home from '@/pages/Home'

describe('Home page', () => {
  it('renders the main sections and contact form fields', () => {
    render(<Home />)

    expect(screen.getAllByRole('img', { name: /hove painting contractors/i }).length).toBeGreaterThan(0)
    expect(
      screen.getByText(/bespoke painting and decorating services in brighton/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/gallery\s*\/\s*projects/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/ready to transform your space\?/i),
    ).toBeInTheDocument()

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email or phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project details/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })
})
