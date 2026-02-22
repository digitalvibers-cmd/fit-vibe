import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ProfileForm from './ProfileForm'

// Mock the server action
jest.mock('../actions/update-profile', () => ({
    updateProfile: jest.fn().mockResolvedValue({ success: true, message: 'Updated' })
}))

// Mock useActionState (or useFormState from react-dom) if used, but for now we might use standard form action or transition.
// Since Next.js 14/15 useActionState is common but requires Canary React in some versions or specific setup in tests.
// For simplicity in this test environment, we'll assume the component renders correctly and inputs exist.

describe('ProfileForm', () => {
    const mockProfile = {
        display_name: 'John Doe',
        age: 30,
        height: 180,
        gender: 'Male',
        preferences: {
            goal: 'Lose Weight',
            activityLevel: 'Active'
        }
    }

    it('renders form with initial data', () => {
        render(<ProfileForm profile={mockProfile} />)

        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
        expect(screen.getByDisplayValue('30')).toBeInTheDocument()
        expect(screen.getByDisplayValue('180')).toBeInTheDocument()
    })

    it('has a submit button', () => {
        render(<ProfileForm profile={mockProfile} />)
        expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument()
    })
})
