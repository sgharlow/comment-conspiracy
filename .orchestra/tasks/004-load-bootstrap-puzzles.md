# Task 004: Load Bootstrap Puzzles

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 004 |
| **Status** | ready |
| **Branch** | task/004 |
| **Assigned** | |
| **Depends** | 001, 002, 003 |
| **Blocked-By** | |
| **Estimated** | 30 min |

## Inputs
- sample_puzzles_week01.json
- src/services/redisService.ts from task 003

## Description
Create a mechanism to load the bootstrap puzzle data from the bundled JSON file into Redis. This ensures the game has puzzles available immediately for demo/judging.

Options:
1. Load on app install trigger
2. Load on first puzzle request if not present
3. Admin menu action to seed data

Implement option 2 (lazy loading) with a check-and-seed pattern. If puzzle:current is empty, seed all puzzles from the JSON file.

## Acceptance Criteria
- [ ] src/data/bootstrap/week01.json contains the sample puzzles (copy from sample_puzzles_week01.json)
- [ ] src/services/bootstrapService.ts with seedPuzzles() function
- [ ] seedPuzzles() checks if puzzle:index is empty before seeding
- [ ] All 7 puzzles from week01.json loaded with correct date keys
- [ ] puzzle:index populated with all puzzle IDs

## Context Files
- sample_puzzles_week01.json
- src/services/redisService.ts
- .orchestra/DECISIONS.md (DEC-001: Use Pre-Generated Puzzles)

## Outputs
- Created: src/data/bootstrap/week01.json, src/services/bootstrapService.ts
- Modified:
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
