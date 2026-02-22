import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LogWeightForm from './LogWeightForm'

// Mock server action
jest.mock('../actions/log-weight', () => ({
    logWeight: jest.fn().mockResolvedValue({ success: true, message: 'Logged' })
}))

// Mock Dialog component parts since they are complex radix primitives
jest.mock('../../components/ui/dialog', () => ({
    Dialog: ({ children }: any) => <div>{children}</div>,
    DialogTrigger: ({ children }: any) => <div>{children}</div>,
    DialogContent: ({ children }: any) => <div>{children}</div>,
    DialogHeader: ({ children }: any) => <div>{children}</div>,
    DialogTitle: ({ children }: any) => <div>Title</div>,
    DialogDescription: ({ children }: any) => <div>Desc</div>,
}), { virtual: true })

describe('LogWeightForm', () => {
    it('renders log weight button', () => {
        render(<LogWeightForm />)
        // The button text is "Log Weight" inside DialogTrigger
        expect(screen.getByText(/Log Weight/i)).toBeInTheDocument()
    })
})
