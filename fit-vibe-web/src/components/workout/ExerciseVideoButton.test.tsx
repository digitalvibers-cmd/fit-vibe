import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ExerciseVideoButton from './ExerciseVideoButton'

// Mock window.open
const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
    value: mockWindowOpen,
    writable: true,
})

describe('ExerciseVideoButton', () => {
    beforeEach(() => {
        mockWindowOpen.mockClear()
    })

    it('renders the Pogledaj Video button', () => {
        render(<ExerciseVideoButton exerciseName="Čučnjevi" />)
        expect(screen.getByText('Pogledaj Video')).toBeInTheDocument()
    })

    it('opens YouTube search with English name when englishName is provided', () => {
        render(
            <ExerciseVideoButton
                exerciseName="Čučnjevi"
                exerciseEnglishName="Squats"
            />
        )
        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(mockWindowOpen).toHaveBeenCalledTimes(1)
        const calledUrl = mockWindowOpen.mock.calls[0][0] as string
        expect(calledUrl).toContain('youtube.com/results')
        expect(calledUrl).toContain('Squats')
        expect(calledUrl).toContain('exercise%20tutorial')
        expect(calledUrl).not.toContain('%C4%8Cu%C4%8Dnjevi') // not using Serbian name
    })

    it('falls back to Serbian exercise name when englishName is not provided', () => {
        render(<ExerciseVideoButton exerciseName="Čučnjevi" />)
        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(mockWindowOpen).toHaveBeenCalledTimes(1)
        const calledUrl = mockWindowOpen.mock.calls[0][0] as string
        expect(calledUrl).toContain('youtube.com/results')
        expect(calledUrl).toContain('%C4%8Cu%C4%8Dnjevi') // encoded Serbian char
    })

    it('opens link in a new tab with security attributes', () => {
        render(<ExerciseVideoButton exerciseName="Bench Press" exerciseEnglishName="Bench Press" />)
        fireEvent.click(screen.getByRole('button'))

        expect(mockWindowOpen).toHaveBeenCalledWith(
            expect.stringContaining('youtube.com'),
            '_blank',
            'noopener,noreferrer'
        )
    })

    it('has a descriptive aria-label', () => {
        render(<ExerciseVideoButton exerciseName="Čučnjevi" />)
        expect(
            screen.getByRole('button', { name: /Pogledaj YouTube video za vežbu: Čučnjevi/i })
        ).toBeInTheDocument()
    })
})
