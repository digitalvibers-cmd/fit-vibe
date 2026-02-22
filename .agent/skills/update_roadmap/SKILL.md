---
name: update-roadmap
description: Tools for tracking and updating the Fit Vibe product roadmap.
---

# Update Roadmap Skill

This skill helps you maintain the `roadmap.md` file and ensure it stays in sync with `task.md` and the actual codebase state.

## Instructions

When the user asks to "update roadmap" or "check progress", follow these steps:

1.  **Read the current state**:
    -   Read `roadmap.md` to understand the high-level plan.
    -   Read `task.md` to see recent granular tasks.
    -   Check the codebase (e.g., `list_dir src/app`) if needed to verify implemented features.

2.  **Update `roadmap.md`**:
    -   Mark completed items with `[x]`.
    -   If new features were discussed or implemented, add them to the appropriate phase.
    -   Ensure the "Current" phase accurately reflects the active development focus.

3.  **Sync `task.md`**:
    -   If the roadmap has shifted focus, update `task.md` to reflect the new priorities for the immediate next steps.

4.  **Report to User**:
    -   Provide a brief summary of what was updated and what the immediate next focus is.

## Example Usage

**User:** "We finished the assessment flow. Update the roadmap."

**Agent Action:**
1.  Read `roadmap.md` and see "Comprehensive Assessment Flow" is unchecked.
2.  Verify implementation in `src/app/onboarding`.
3.  Edit `roadmap.md` to check `[x] Comprehensive Assessment Flow`.
4.  Edit `roadmap.md` to mark "AI Integration" as the next active focus.
5.  Notify user: "Roadmap updated. Assessment flow marked complete. Next up: AI Integration."
