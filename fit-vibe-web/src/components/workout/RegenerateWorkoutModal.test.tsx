import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegenerateWorkoutModal from './RegenerateWorkoutModal'
import { generateWorkoutPlan } from '@/app/actions/generate-workout-plan'
import { toast } from 'sonner'

// Mock the dependencies
jest.mock('@/app/actions/generate-workout-plan', () => ({
    generateWorkoutPlan: jest.fn()
}))

jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}))

describe('RegenerateWorkoutModal', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders the trigger button correctly', () => {
        render(<RegenerateWorkoutModal />)
        expect(screen.getByRole('button', { name: /Regeneriši Plan/i })).toBeInTheDocument()
    })

    it('opens modal on trigger click', () => {
        render(<RegenerateWorkoutModal />)

        // Open modal
        fireEvent.click(screen.getByRole('button', { name: /Regeneriši Plan/i }))

        expect(screen.getByText('Regeneriši Plan Treninga')).toBeInTheDocument()
        expect(screen.getByText(/Ovo će prebrisati tvoj trenutni plan/i)).toBeInTheDocument()
    })

    it('handles successful plan generation', async () => {
        (generateWorkoutPlan as jest.Mock).mockResolvedValueOnce({ success: true })

        render(<RegenerateWorkoutModal />)

        // Open modal
        fireEvent.click(screen.getByRole('button', { name: /Regeneriši Plan/i }))

        // Select 14 days
        const durationBtn = screen.getByRole('button', { name: /14d/i })
        fireEvent.click(durationBtn)

        // Click generate button
        const generateBtn = screen.getByRole('button', { name: /Generiši Novi Plan/i })
        fireEvent.click(generateBtn)

        // Verify action is called with correct duration
        await waitFor(() => {
            expect(generateWorkoutPlan).toHaveBeenCalledWith(14)
            expect(toast.success).toHaveBeenCalledWith('Novi plan treninga je uspešno generisan od danas!')
        })
    })

    it('handles error during generation', async () => {
        (generateWorkoutPlan as jest.Mock).mockResolvedValueOnce({ error: 'Neka greska' })

        render(<RegenerateWorkoutModal />)

        // Open modal
        fireEvent.click(screen.getByRole('button', { name: /Regeneriši Plan/i }))

        // Click generate button
        const generateBtn = screen.getByRole('button', { name: /Generiši Novi Plan/i })
        fireEvent.click(generateBtn)

        // Verify toast error
        await waitFor(() => {
            expect(generateWorkoutPlan).toHaveBeenCalledWith(7) // default is 7
            expect(toast.error).toHaveBeenCalledWith('Neka greska')
        })
    })
})
