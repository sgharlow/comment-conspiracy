# Task 010: Create CompletedScreen

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 010 |
| **Status** | ready |
| **Branch** | task/010 |
| **Assigned** | |
| **Depends** | 005, 009 |
| **Blocked-By** | |
| **Estimated** | 30 min |

## Inputs
- src/hooks/useGameState.ts from task 005
- src/components/results/*.tsx from task 009
- comment-conspiracy-spec-v2.md (Section 2.6: Already Played State)

## Description
Create the screen shown when a user returns after already playing today. Shows their result and community stats.

Shows:
- "YOU'VE PLAYED TODAY" banner
- Their answer and whether it was correct
- Current streak
- Today's community stats (total players, % correct, guess distribution)
- Countdown timer to next puzzle
- Action buttons (View Breakdown, Discuss)

## Acceptance Criteria
- [ ] src/components/screens/CompletedScreen.tsx created
- [ ] Shows user's previous answer for today
- [ ] Displays community stats panel
- [ ] Countdown timer to midnight UTC (next puzzle)
- [ ] Reuses StatsPanel from task 009
- [ ] Action buttons for engagement

## Context Files
- comment-conspiracy-spec-v2.md (Section 2.6: Already Played State)
- src/components/results/StatsPanel.tsx

## Outputs
- Created: src/components/screens/CompletedScreen.tsx, src/components/shared/Timer.tsx
- Modified:
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
