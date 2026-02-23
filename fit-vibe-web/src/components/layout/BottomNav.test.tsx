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

        expect(screen.getByTestId('nav-početna')).toBeInTheDocument()
        expect(screen.getByTestId('nav-trening')).toBeInTheDocument()
        expect(screen.getByTestId('nav-ishrana')).toBeInTheDocument()
        expect(screen.getByTestId('nav-progres')).toBeInTheDocument()
        expect(screen.getByTestId('nav-profil')).toBeInTheDocument()
    })

    // We would need to mock different pathnames to test active states, 
    // but jest.mock is hoisted. For simple verification this is enough.
})
