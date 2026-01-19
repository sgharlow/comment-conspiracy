# Task 009: Create ResultScreen

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 009 |
| **Status** | ready |
| **Branch** | task/009 |
| **Assigned** | |
| **Depends** | 005, 006 |
| **Blocked-By** | |
| **Estimated** | 45 min |

## Inputs
- src/hooks/useGameState.ts from task 005
- comment-conspiracy-spec-v2.md (Section 2.4, 2.5: Result screens)

## Description
Create the result screen that shows after a user submits their guess. Has two variants:
1. RESULT_CORRECT - Celebration, streak update, top percentage
2. RESULT_INCORRECT - Explanation, streak reset

Both show:
- Result banner (correct/incorrect with emoji)
- AI Tells explanation (why the AI comment was detectable)
- Updated streak info
- Stats (percentage of players who got it right)
- Share card preview
- Action buttons (View Breakdown, Join Discussion)

## Acceptance Criteria
- [ ] src/components/screens/ResultScreen.tsx created
- [ ] Correct variant shows celebration (🎉), green styling
- [ ] Incorrect variant shows (❌), red styling, also shows why user's pick was human
- [ ] AIExplanation component shows bullet points of AI tells
- [ ] Streak display with fire emoji if 3+ days
- [ ] Stats panel shows % correct, player count
- [ ] Share card component (see task 018) placeholder
- [ ] Buttons for next actions

## Context Files
- comment-conspiracy-spec-v2.md (Section 2.4, 2.5: Result Screens)
- comment-conspiracy-spec-v2.md (Section 12.3: ResultBanner Component Spec)

## Outputs
- Created: src/components/screens/ResultScreen.tsx, src/components/results/ResultBanner.tsx, src/components/results/AIExplanation.tsx, src/components/results/StatsPanel.tsx
- Modified:
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
