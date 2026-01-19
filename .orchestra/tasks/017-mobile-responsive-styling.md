# Task 017: Mobile-Responsive Styling

## Metadata
| Field | Value |
|-------|-------|
| **ID** | 017 |
| **Status** | ready |
| **Branch** | task/017 |
| **Assigned** | |
| **Depends** | 007, 009, 010 |
| **Blocked-By** | |
| **Estimated** | 45 min |

## Inputs
- All screen components from tasks 007, 009, 010
- comment-conspiracy-spec-v2.md (Section 8: Mobile UX Specification)

## Description
Ensure all screens are fully responsive and optimized for mobile Reddit browsing.

Mobile requirements:
- Touch targets minimum 44px
- No horizontal scroll
- Text readable without zoom
- Portrait orientation optimized
- Respect safe areas (notch, home indicator)
- Smooth animations (60fps target)

Breakpoints:
- Mobile: 100% width, 12px padding
- Tablet (640px+): max-width 540px, centered
- Desktop (1024px+): max-width 640px

## Acceptance Criteria
- [ ] All touch targets meet 44px minimum
- [ ] Responsive breakpoints implemented
- [ ] CommentCard touch feedback (active:scale, transition)
- [ ] No layout issues on narrow screens (320px minimum)
- [ ] Buttons have proper padding and sizing
- [ ] Test on mobile viewport in browser devtools

## Context Files
- comment-conspiracy-spec-v2.md (Section 8: Mobile UX Specification)

## Outputs
- Created:
- Modified: src/components/game/CommentCard.tsx, all screen components, possibly add src/styles/globals.css
- Decisions:

---

## Work Log
<!-- Append progress here while working -->
