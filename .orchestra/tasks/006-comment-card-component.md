# Task 006: Create CommentCard Component

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 006 |
| **Status** | ready |
| **Branch** | task/006 |
| **Assigned** | |
| **Depends** | 001, 002 |
| **Blocked-By** | |
| **Estimated** | 30 min |

## Inputs
- src/types/puzzle.ts from task 002
- comment-conspiracy-spec-v2.md (Section 12: UI Component Specifications)

## Description
Create the CommentCard component that displays a single comment with its fake username. This is the primary interactive element of the game.

Visual States:
1. DEFAULT - Gray border, white background
2. HOVER - Light blue border, slight shadow (on desktop)
3. SELECTED - Blue border, blue tint background
4. REVEALED_AI - Red border, red tint + 🤖 badge
5. REVEALED_HUMAN - Gray, slightly faded
6. DISABLED - Opacity 0.5, no interactions

Props:
- comment: DisplayComment
- isSelected: boolean
- isRevealed: boolean
- isAI?: boolean (only set after reveal)
- onSelect: (id: string) => void
- disabled?: boolean

## Acceptance Criteria
- [ ] src/components/game/CommentCard.tsx created
- [ ] Shows comment number, username (u/...), and text
- [ ] All 6 visual states implemented with Tailwind
- [ ] Touch-friendly (min 44px tap target)
- [ ] Accessible (button role, proper labels)

## Context Files
- comment-conspiracy-spec-v2.md (Section 12.2: CommentCard Component Spec)

## Outputs
- Created: src/components/game/CommentCard.tsx
- Modified:
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
