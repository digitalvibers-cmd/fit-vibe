import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegenerateMealModal from './RegenerateMealModal'
import { generateMealPlan } from '@/app/actions/generate-meal-plan'
import { toast } from 'sonner'

// Mock the dependencies
jest.mock('@/app/actions/generate-meal-plan', () => ({
    generateMealPlan: jest.fn()
}))

jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}))

describe('RegenerateMealModal', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders the trigger button correctly', () => {
        render(<RegenerateMealModal />)
        expect(screen.getByRole('button', { name: /Regeneriši Plan/i })).toBeInTheDocument()
    })

    it('opens modal on trigger click', () => {
        render(<RegenerateMealModal />)

        // Open modal
        fireEvent.click(screen.getByRole('button', { name: /Regeneriši Plan/i }))

        expect(screen.getByText('Regeneriši Plan Ishrane')).toBeInTheDocument()
        expect(screen.getByText(/Ovo će prebrisati tvoj trenutni plan i generisati/i)).toBeInTheDocument()
    })

    it('handles successful meal plan generation', async () => {
        (generateMealPlan as jest.Mock).mockResolvedValueOnce({ success: true, plan: {} })

        render(<RegenerateMealModal />)

        // Open modal
        fireEvent.click(screen.getByRole('button', { name: /Regeneriši Plan/i }))

        // Select 21 days
        const durationBtn = screen.getByRole('button', { name: /21d/i })
        fireEvent.click(durationBtn)

        // Click generate button
        const generateBtn = screen.getByRole('button', { name: /Generiši Novi Plan/i })
        fireEvent.click(generateBtn)

        // Verify action is called with correct duration
        await waitFor(() => {
            expect(generateMealPlan).toHaveBeenCalledWith(21)
            expect(toast.success).toHaveBeenCalledWith('Novi plan ishrane je uspešno generisan od danas!')
        })
    })

    it('handles error during generation', async () => {
        (generateMealPlan as jest.Mock).mockResolvedValueOnce({ error: 'Neka greska' })

        render(<RegenerateMealModal />)

        // Open modal
        fireEvent.click(screen.getByRole('button', { name: /Regeneriši Plan/i }))

        // Click generate button
        const generateBtn = screen.getByRole('button', { name: /Generiši Novi Plan/i })
        fireEvent.click(generateBtn)

        // Verify toast error
        await waitFor(() => {
            expect(generateMealPlan).toHaveBeenCalledWith(7) // default is 7
            expect(toast.error).toHaveBeenCalledWith('Neka greska')
        })
    })
})
