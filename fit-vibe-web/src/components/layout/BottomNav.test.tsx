import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BottomNav from './BottomNav'

// Mock usePathname
jest.mock('next/navigation', () => ({
    usePathname: () => '/dashboard',
}))

describe('BottomNav', () => {
    it('renders navigation items on dashboard', () => {
        render(<BottomNav />)

        expect(screen.getByTestId('nav-home')).toBeInTheDocument()
        expect(screen.getByTestId('nav-workout')).toBeInTheDocument()
        expect(screen.getByTestId('nav-meals')).toBeInTheDocument()
        // expect(screen.getByTestId('nav-progress')).toBeInTheDocument() 
        expect(screen.getByTestId('nav-profile')).toBeInTheDocument()
    })

    // We would need to mock different pathnames to test active states, 
    // but jest.mock is hoisted. For simple verification this is enough.
})
