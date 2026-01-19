# Task 002: Create Core Type Definitions

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 002 |
| **Status** | ready |
| **Branch** | task/002 |
| **Assigned** | |
| **Depends** | 001 |
| **Blocked-By** | |
| **Estimated** | 30 min |

## Inputs
- sample_puzzles_week01.json (data structure reference)
- comment-conspiracy-spec-v2.md (Section 4.13: Puzzle JSON Schema, Section 6: Scoring)

## Description
Define TypeScript interfaces for all core data types. These types are the contract between all components and services.

Create types for:
- Puzzle, Comment (puzzle data structure)
- UserProgress (streaks, accuracy, history)
- GameState (NEW_USER, PLAYING, CONFIRMING, RESULT_CORRECT, RESULT_INCORRECT, COMPLETED)
- GuessResult (what gets returned after a guess)
- DailyStats (aggregate statistics)
- Difficulty, DayOfWeek, Category (enums/unions)

## Acceptance Criteria
- [ ] src/types/puzzle.ts with Puzzle, Comment interfaces
- [ ] src/types/user.ts with UserProgress, DayResult interfaces
- [ ] src/types/game.ts with GameState enum, GuessResult interface
- [ ] src/types/index.ts re-exports all types
- [ ] Types match the sample_puzzles_week01.json structure exactly

## Context Files
- comment-conspiracy-spec-v2.md (Section 4.13, Section 6)
- sample_puzzles_week01.json

## Outputs
- Created: src/types/puzzle.ts, src/types/user.ts, src/types/game.ts, src/types/index.ts
- Modified:
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
