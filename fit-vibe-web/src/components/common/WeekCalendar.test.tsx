import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import WeekCalendar from './WeekCalendar'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: () => '/test',
    useSearchParams: () => new URLSearchParams(),
}))

describe('WeekCalendar', () => {
    it('renders current month and year', () => {
        const dateStr = '2026-02-17' // A specific date string
        render(<WeekCalendar dateString={dateStr} />)
        expect(screen.getByText(/2026/i)).toBeInTheDocument()
    })

    it('renders 7 days', () => {
        render(<WeekCalendar />)
        // Check if there are 7 link elements (days)
        const links = screen.getAllByRole('link')
        // 2 navigation arrows + 7 days = 9 links
        expect(links.length).toBeGreaterThanOrEqual(7)
    })
})
