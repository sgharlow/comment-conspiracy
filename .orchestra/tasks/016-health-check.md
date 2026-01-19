# Task 016: Add Puzzle Inventory Health Check

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 016 |
| **Status** | ready |
| **Branch** | task/016 |
| **Assigned** | |
| **Depends** | 015 |
| **Blocked-By** | |
| **Estimated** | 20 min |

## Inputs
- src/scheduler/dailyPuzzle.ts from task 015
- src/services/redisService.ts from task 003

## Description
Add a health check that monitors puzzle inventory and alerts if running low.

The health check should:
1. Count puzzles available for next 7 days
2. Identify any missing dates
3. Calculate "days of runway"
4. Send modmail alert if runway < 3 days

This can run after the daily puzzle posts, or as a separate scheduled job.

## Acceptance Criteria
- [ ] src/services/inventoryService.ts created with getInventoryStatus()
- [ ] Health check runs after daily puzzle job
- [ ] Returns: puzzlesLoaded, daysOfRunway, missingDates, nextEmptyDate
- [ ] Alerts via modmail if runway critically low

## Context Files
- comment-conspiracy-spec-v2.md (Section 4.5.2: Puzzle Inventory Monitoring)

## Outputs
- Created: src/services/inventoryService.ts
- Modified: src/scheduler/dailyPuzzle.ts (add health check call)
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
