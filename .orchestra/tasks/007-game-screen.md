# Task 007: Create GameScreen with Puzzle Display

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 007 |
| **Status** | ready |
| **Branch** | task/007 |
| **Assigned** | |
| **Depends** | 005, 006 |
| **Blocked-By** | |
| **Estimated** | 45 min |

## Inputs
- src/hooks/useGameState.ts from task 005
- src/components/game/CommentCard.tsx from task 006
- comment-conspiracy-spec-v2.md (Section 2.2: Active Game Flow)

## Description
Create the main game screen that shows the daily puzzle. This includes:
- Header with day number, day of week, difficulty
- Prompt card showing the question
- List of 5 CommentCard components
- Warning text about one guess only

The screen should use the game state hook and handle comment selection.

## Acceptance Criteria
- [ ] src/components/screens/GameScreen.tsx created
- [ ] Header shows: "DAY {n} • {dayOfWeek} • {difficulty}"
- [ ] Prompt displayed prominently
- [ ] 5 CommentCards rendered in shuffled order
- [ ] Tapping a card triggers selection (highlights it)
- [ ] Warning text: "Choose carefully - you only get one guess!"
- [ ] Integrates with useGameState hook

## Context Files
- comment-conspiracy-spec-v2.md (Section 2.2: Active Game Flow)
- src/hooks/useGameState.ts
- src/components/game/CommentCard.tsx

## Outputs
- Created: src/components/screens/GameScreen.tsx
- Modified:
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
