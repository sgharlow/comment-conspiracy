# Task 005: Build Game State Machine

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 005 |
| **Status** | ready |
| **Branch** | task/005 |
| **Assigned** | |
| **Depends** | 002 |
| **Blocked-By** | |
| **Estimated** | 45 min |

## Inputs
- src/types/game.ts from task 002
- comment-conspiracy-spec-v2.md (Section 2: User Experience Flow)

## Description
Create a React hook that manages the game state machine. This is the core logic that drives which screen the user sees.

States:
- LOADING - Fetching puzzle/user data
- NEW_USER - First time, show welcome screen
- PLAYING - Active puzzle, selecting comment
- CONFIRMING - User selected, showing confirmation modal
- RESULT_CORRECT - Correct guess, show celebration
- RESULT_INCORRECT - Wrong guess, show explanation
- COMPLETED - Already played today, show stats

Transitions:
- LOADING → NEW_USER (if first time) or PLAYING (if returning)
- LOADING → COMPLETED (if already played today)
- PLAYING → CONFIRMING (on comment tap)
- CONFIRMING → PLAYING (on cancel)
- CONFIRMING → RESULT_* (on confirm)
- RESULT_* → COMPLETED (automatic after viewing)

## Acceptance Criteria
- [ ] src/hooks/useGameState.ts with full state machine
- [ ] Hook returns: { state, puzzle, selectedComment, selectComment, confirmGuess, cancelConfirm, result }
- [ ] All state transitions work correctly
- [ ] Loading state properly detected and transitioned

## Context Files
- comment-conspiracy-spec-v2.md (Section 2: User Experience Flow)
- src/types/game.ts

## Outputs
- Created: src/hooks/useGameState.ts
- Modified:
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
