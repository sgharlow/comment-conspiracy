# Task 008: Create ConfirmModal Component

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 008 |
| **Status** | ready |
| **Branch** | task/008 |
| **Assigned** | |
| **Depends** | 005, 006 |
| **Blocked-By** | |
| **Estimated** | 20 min |

## Inputs
- src/hooks/useGameState.ts from task 005
- comment-conspiracy-spec-v2.md (Section 2.3: Confirmation Modal)

## Description
Create the modal that appears when a user selects a comment, asking them to confirm their guess. This is a critical UX moment that prevents accidental submissions.

Shows:
- "You selected Comment #X:"
- Preview of the selected comment text (truncated)
- "Is this your final answer?"
- Cancel button (returns to PLAYING state)
- Confirm button (submits guess)

## Acceptance Criteria
- [ ] src/components/game/ConfirmModal.tsx created
- [ ] Modal overlays the game screen
- [ ] Shows selected comment number and preview
- [ ] Cancel button calls cancelConfirm()
- [ ] Confirm button calls confirmGuess()
- [ ] Touch-friendly button sizes (44px+ height)
- [ ] Accessible (focus trap, escape key to cancel)

## Context Files
- comment-conspiracy-spec-v2.md (Section 2.3: Confirmation Modal)
- src/hooks/useGameState.ts

## Outputs
- Created: src/components/game/ConfirmModal.tsx
- Modified:
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
