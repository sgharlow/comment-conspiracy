# Task 011: Implement puzzleService

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 011 |
| **Status** | ready |
| **Branch** | task/011 |
| **Assigned** | |
| **Depends** | 003, 004 |
| **Blocked-By** | |
| **Estimated** | 45 min |

## Inputs
- src/services/redisService.ts from task 003
- src/services/bootstrapService.ts from task 004
- src/types/puzzle.ts from task 002

## Description
Create the puzzle service that handles all puzzle-related operations. This is the main interface for getting puzzles and submitting guesses.

Functions:
- getTodaysPuzzle(): Fetches today's puzzle, seeds if needed, shuffles comments
- getPuzzleByDate(date): Fetches specific puzzle
- submitGuess(userId, puzzleId, guessIndex): Records guess, returns result
- getUserGuess(userId, puzzleId): Checks if user already played
- hasUserPlayedToday(userId): Quick check for guard logic

Important: Comments must be shuffled per-user to prevent position-based spoilers. The shuffled AI index must be tracked for correct/incorrect determination.

## Acceptance Criteria
- [ ] src/services/puzzleService.ts created
- [ ] getTodaysPuzzle() returns ShuffledPuzzle (without exposing aiIndex)
- [ ] submitGuess() validates guess, records in Redis, returns GuessResult
- [ ] submitGuess() is idempotent (second call returns first result)
- [ ] Comment shuffling works correctly
- [ ] Bootstrap seeding called if needed

## Context Files
- comment-conspiracy-spec-v2.md (Section 11: API Specifications)
- src/services/redisService.ts
- src/services/bootstrapService.ts

## Outputs
- Created: src/services/puzzleService.ts
- Modified:
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
