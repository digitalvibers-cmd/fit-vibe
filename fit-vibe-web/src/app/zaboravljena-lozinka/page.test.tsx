import { render, screen } from '@testing-library/react'
import ForgotPasswordPage from './page'

// Mock the server action
jest.mock('@/app/auth/actions', () => ({
    resetPasswordRequest: jest.fn(),
}))

// Mock next/link
jest.mock('next/link', () => {
    return function Link({ children, href }: { children: React.ReactNode; href: string }) {
        return <a href={href}>{children}</a>
    }
})

describe('ForgotPasswordPage', () => {
    it('renders the forgot password form', () => {
        render(<ForgotPasswordPage />)
        expect(screen.getByText('Zaboravljena lozinka')).toBeInTheDocument()
        expect(screen.getByLabelText('Email adresa')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /pošalji link za reset/i })).toBeInTheDocument()
    })

    it('has a link back to login', () => {
        render(<ForgotPasswordPage />)
        const loginLink = screen.getByRole('link', { name: /nazad na prijavu/i })
        expect(loginLink).toBeInTheDocument()
        expect(loginLink).toHaveAttribute('href', '/login')
    })

    it('submit button is of type submit', () => {
        render(<ForgotPasswordPage />)
        const button = screen.getByRole('button', { name: /pošalji link za reset/i })
        expect(button).toHaveAttribute('type', 'submit')
    })

    it('has an email input field', () => {
        render(<ForgotPasswordPage />)
        const emailInput = screen.getByLabelText('Email adresa')
        expect(emailInput).toHaveAttribute('type', 'email')
        expect(emailInput).toHaveAttribute('name', 'email')
    })
})
