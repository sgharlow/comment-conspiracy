# Task 003: Set Up Redis Service Layer

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 003 |
| **Status** | ready |
| **Branch** | task/003 |
| **Assigned** | |
| **Depends** | 001, 002 |
| **Blocked-By** | |
| **Estimated** | 45 min |

## Inputs
- src/types/*.ts from task 002
- comment-conspiracy-spec-v2.md (Section 10: Data Models)

## Description
Create the Redis key schema and basic service wrapper for Devvit Redis operations. This is the foundation for all persistent storage.

Redis Key Schema:
- `puzzle:{date}` → Puzzle JSON
- `puzzle:index` → List of all puzzle IDs
- `puzzle:current` → Today's puzzle ID
- `user:{userId}:progress` → UserProgress JSON
- `user:{userId}:guess:{puzzleId}` → User's guess for a puzzle
- `stats:{puzzleId}` → DailyStats JSON

Create a thin wrapper service that provides typed access to these keys.

## Acceptance Criteria
- [ ] src/services/redisKeys.ts with all key patterns
- [ ] src/services/redisService.ts with typed get/set helpers
- [ ] Helper functions: getPuzzle, setPuzzle, getUserProgress, setUserProgress, getUserGuess, setUserGuess, getStats, updateStats
- [ ] All functions use proper TypeScript types from task 002

## Context Files
- comment-conspiracy-spec-v2.md (Section 10: Data Models)
- .orchestra/DECISIONS.md (DEC-002: Server-Side Streak Tracking)

## Outputs
- Created: src/services/redisKeys.ts, src/services/redisService.ts
- Modified:
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
