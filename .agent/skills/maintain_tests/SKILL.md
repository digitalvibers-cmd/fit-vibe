---
name: maintain-tests
description: Instructions for creating and updating automated tests for every new feature.
---

# Maintain Tests Skill

This skill ensures that the Fit Vibe codebase maintains high test coverage and reliability. You MUST follow these instructions whenever you create new features or modify existing logic.

## Instructions

### 1. When Creating New Features
*   **Create a Test File**: For every new component (e.g., `BottomNav.tsx`), create a corresponding test file (e.g., `BottomNav.test.tsx`) in the same directory or a `__tests__` folder.
*   **Write Basic Tests**: At a minimum, test that:
    *   The component renders without crashing.
    *   Crucial user interactions (clicks, form submissions) trigger expected handlers.
    *   Props are correctly displayed.
*   **Use Testing Library**: Use `@testing-library/react` for component tests. Avoid testing implementation details; test user behavior.

### 2. When Modifying Existing Features
*   **Check Existing Tests**: Look for `*.test.tsx` or `*.spec.ts` files related to the code you are changing.
*   **Run Tests First**: Run `npm test` (or specific test file) to see the current state.
*   **Update Tests**: If your changes break existing tests (and the changes are intentional), update the tests to reflect the new behavior.
*   **Add Regression Tests**: If you are fixing a bug, write a test that reproduces the bug (fails) before the fix, and passes after the fix.

### 3. Running Tests
*   Always run `npm test` before declaring a task complete to ensure no regressions.
*   If tests fail, fix the code or the test before proceeding.

## Example Test Structure (Jest + RTL)

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('handles click', () => {
    const handleClick = jest.fn()
    render(<MyComponent onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```
