import { render, screen, fireEvent } from '@testing-library/react'
import ResetPasswordPage from './page'

// Mock the server action
jest.mock('@/app/auth/actions', () => ({
    updatePassword: jest.fn(),
}))

describe('ResetPasswordPage', () => {
    it('renders the reset password form', () => {
        render(<ResetPasswordPage />)
        // shadcn CardTitle renders a <div>, not a heading — use getAllByText
        const novaLozinkaElements = screen.getAllByText('Nova lozinka')
        expect(novaLozinkaElements.length).toBeGreaterThanOrEqual(2) // CardTitle + Label
        expect(screen.getByLabelText('Nova lozinka')).toBeInTheDocument()
        expect(screen.getByLabelText('Potvrdi lozinku')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /sačuvaj novu lozinku/i })).toBeInTheDocument()
    })

    it('submit button is disabled when fields are empty', () => {
        render(<ResetPasswordPage />)
        const button = screen.getByRole('button', { name: /sačuvaj novu lozinku/i })
        expect(button).toBeDisabled()
    })

    it('shows mismatch error when passwords do not match', () => {
        render(<ResetPasswordPage />)
        const passwordInput = screen.getByLabelText('Nova lozinka')
        const confirmInput = screen.getByLabelText('Potvrdi lozinku')

        fireEvent.change(passwordInput, { target: { value: 'Lozinka123' } })
        fireEvent.change(confirmInput, { target: { value: 'DrugaLozinka' } })

        expect(screen.getByText('Lozinke se ne poklapaju.')).toBeInTheDocument()
    })

    it('submit button is enabled when passwords match and are long enough', () => {
        render(<ResetPasswordPage />)
        const passwordInput = screen.getByLabelText('Nova lozinka')
        const confirmInput = screen.getByLabelText('Potvrdi lozinku')

        fireEvent.change(passwordInput, { target: { value: 'Lozinka123' } })
        fireEvent.change(confirmInput, { target: { value: 'Lozinka123' } })

        const button = screen.getByRole('button', { name: /sačuvaj novu lozinku/i })
        expect(button).not.toBeDisabled()
    })

    it('submit button remains disabled when password is too short', () => {
        render(<ResetPasswordPage />)
        const passwordInput = screen.getByLabelText('Nova lozinka')
        const confirmInput = screen.getByLabelText('Potvrdi lozinku')

        fireEvent.change(passwordInput, { target: { value: 'abc' } })
        fireEvent.change(confirmInput, { target: { value: 'abc' } })

        const button = screen.getByRole('button', { name: /sačuvaj novu lozinku/i })
        expect(button).toBeDisabled()
    })
})
