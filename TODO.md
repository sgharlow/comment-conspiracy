# Comment Conspiracy - Launch TODO

> Last Updated: 2026-01-25 (Screenshots captured, app deployed v0.0.11)
> Hackathon Deadline: February 12, 2026, 6:00 PM PST (18 days remaining)

---

## IMMEDIATE NEXT STEPS (Manual Actions Required)

### Step 1: Deploy the updated app ✅ DONE
App deployed to v0.0.11 with 66 puzzles (week10 data included).

### Step 2: Create or configure the demo subreddit
1. Go to https://www.reddit.com/subreddits/create
2. Create r/CommentConspiracy (or make r/comment_conspire_dev public)
3. Install the app: Devvit Dashboard → comment-conspire → Install → select subreddit

### Step 3: Create the first puzzle post ✅ DONE (on r/comment_conspire_dev)
Daily scheduler is running - multiple puzzle posts exist (Day 3-8).

### Step 4: Take screenshots for Devpost ✅ DONE
Screenshots saved in `screenshots/` folder:
- 01-welcome-screen.png
- 02-game-screen.png
- 03-comment-selected.png
- 04-confirmation-modal.png
- 05-correct-result.png

### Step 5: Submit to Devpost
- Go to the hackathon Devpost page
- Fill out the submission form
- Upload screenshots from `screenshots/` folder
- Submit before Feb 12, 6:00 PM PST

---

## Executive Summary

**Development Status**: 100% complete (20/20 tasks)
**Puzzle Content**: 66 puzzles (Jan 19 - Mar 25, 2026)
**Days of Runway from Today**: 60 days - COMPLETE

---

## Critical Path to Launch

### 1. Content: Puzzle Data - COMPLETE
**Status: DONE**

Current puzzle coverage:
- Start: 2026-01-19 (Day 1)
- End: 2026-03-25 (Day 66)
- Total: 66 puzzles

From today (2026-01-25):
- Days available: 60 (Jan 25 - Mar 25)
- **Full 60-day runway achieved**

Completed:
- [x] Create 6 additional puzzles for dates 2026-03-20 through 2026-03-25
- [x] Add puzzles to `src/data/bootstrap/week10.json` (new file)
- [x] Update `bootstrapService.ts` to import week10Data
- [ ] Rebuild and redeploy app (`npm run upload`)

---

### 2. Devpost Submission
**Priority: HIGH | Effort: 2-4 hours**

Required for hackathon entry:

- [ ] **App listing verified** on developer.reddit.com
  - URL: https://developers.reddit.com/apps/comment-conspire

- [ ] **Demo subreddit live** at r/CommentConspiracy
  - [ ] Subreddit is Public
  - [ ] Description: "Can you spot the AI comment? Daily puzzle game."
  - [ ] Pinned post: "How to Play Comment Conspiracy"
  - [ ] At least 1 live puzzle post running

- [x] **Screenshots captured** (5 screenshots in `screenshots/` folder)
  - [x] Welcome screen (01-welcome-screen.png)
  - [x] Game screen (02-game-screen.png)
  - [x] Comment selected state (03-comment-selected.png)
  - [x] Confirmation modal (04-confirmation-modal.png)
  - [x] Correct result screen with AI tells (05-correct-result.png)
  - [ ] Incorrect result screen (optional - requires playing another puzzle)
  - [ ] Completed screen with leaderboard (optional)
  - [ ] Mobile view (optional)

- [ ] **Video demo** (recommended, not required)
  - 1-2 minute walkthrough of gameplay
  - Show: discover post → play puzzle → see result → share

- [ ] **Devpost submission form completed**
  - Title: Comment Conspiracy
  - Tagline: "One of these comments isn't human. Can you spot the imposter?"
  - Categories: Best Daily Game, Best Use of User Contributions, Best Mobile Game Play
  - Demo link: https://reddit.com/r/CommentConspiracy
  - App link: https://developers.reddit.com/apps/comment-conspire

---

### 3. Scheduler Verification
**Priority: HIGH | Effort: 30 min**

The daily puzzle scheduler posts at midnight UTC.

- [ ] Verify scheduler job is registered in Devvit dashboard
- [ ] Confirm cron schedule: `0 0 * * *` (midnight UTC)
- [ ] Check that first manual puzzle post works
- [ ] Verify `puzzle:current` pointer updates correctly
- [ ] Test inventory health check sends modmail on low stock

---

### 4. Subreddit Configuration
**Priority: HIGH | Effort: 30 min**

**Note:** r/CommentConspiracy does not exist yet. Current playtest is on r/comment_conspire_dev (private).

**Option A: Create r/CommentConspiracy (recommended for demo)**
- [ ] Create r/CommentConspiracy subreddit
- [ ] Set subreddit to Public
- [ ] Install Comment Conspiracy app on new subreddit
- [ ] Configure description: "Can you spot the AI comment? Daily puzzle game."
- [ ] Create pinned "How to Play" post
- [ ] Upload banner/icon (optional)

**Option B: Make playtest subreddit public**
- [ ] Change r/comment_conspire_dev to Public
- [ ] Update demo links to use this subreddit

**Either way:**
- [ ] At least 1 live puzzle post running
- [ ] Verify app works for non-logged-in viewers

---

### 5. Full Playtest Verification
**Priority: HIGH | Effort: 1-2 hours**

Run through `PLAYTEST_GUIDE.md` checklist completely:

**Core Flow:**
- [ ] Welcome screen displays correctly
- [ ] Can start puzzle
- [ ] Comment selection works (tap to select/deselect)
- [ ] Confirmation modal appears
- [ ] Can cancel confirmation
- [ ] Guess submission works
- [ ] Correct result displays with AI tells
- [ ] Incorrect result displays with explanations
- [ ] Already-played state works after refresh

**Features:**
- [ ] Share copy button works
- [ ] Achievement toast appears on unlock (First Blood)
- [ ] Achievements display in result
- [ ] Leaderboard shows ranks (after 1+ games)
- [ ] Stats panel shows community data
- [ ] Countdown timer works

**Mobile Testing:**
- [ ] Responsive layout on iPhone/Android
- [ ] Touch interactions work smoothly
- [ ] No overflow issues
- [ ] 44px+ touch targets

---

## Medium Priority

### 6. Documentation Updates - MOSTLY COMPLETE
**Priority: MEDIUM | Status: 3/4 done**

- [x] Update GOAL.md acceptance criteria (mark completed items)
- [x] Update PLAN.md phases (mark completed)
- [x] Fix bootstrapService.ts comment (now says "10 weeks")
- [ ] Update README.md with final deployment info (optional polish)

---

### 7. Code Quality - COMPLETE
**Priority: MEDIUM | Status: DONE**

- [x] Run `npm run typecheck` - PASSING
- [x] Run `npm run lint` - PASSING
- [x] Run `npm test` - PASSING
- [x] Run `npm run build` - PASSING
- [x] Console.log statements - kept for debugging (intentional)
- [x] Remove `// v24 touch` comment from main.tsx - REMOVED

---

### 8. Cross-Browser Testing
**Priority: MEDIUM | Effort: 1 hour**

Test on:
- [ ] Chrome (desktop)
- [ ] Safari (desktop + iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Reddit mobile app (iOS)
- [ ] Reddit mobile app (Android)

---

## Low Priority / Post-Launch

### 9. Contribution System Polish
**Priority: LOW | Status: Backend implemented, UI may need testing**

The contribution system allows users to submit AI comment ideas:
- [ ] Verify ContributeScreen is accessible from UI
- [ ] Test contribution submission flow
- [ ] Test voting on contributions
- [ ] Verify contributor leaderboard displays

---

### 10. Admin Tooling (Post-Hackathon)
**Priority: LOW | Status: Out of scope for hackathon**

Future improvements:
- [ ] Admin UI for uploading puzzles without code changes
- [ ] Puzzle generator CLI tool
- [ ] Contribution moderation interface

---

## Infrastructure Checklist

| Component | Status | Notes |
|-----------|--------|-------|
| Devvit app | DEPLOYED | v0.0.2 on developer.reddit.com |
| Redis storage | CONFIGURED | Devvit managed |
| Scheduler | CONFIGURED | Cron: 0 0 * * * UTC |
| Subreddit | NEEDS SETUP | r/CommentConspiracy doesn't exist yet |
| Puzzle data | 66 PUZZLES | Jan 19 - Mar 25, 2026 (updated today) |
| Build | PASSING | npm run build |
| TypeScript | PASSING | npm run typecheck |
| Tests | PASSING | npm test |
| Lint | PASSING | npm run lint |

---

## Puzzle Inventory

| Week | Dates | Puzzles | Status |
|------|-------|---------|--------|
| Week 1 | Jan 19-25 | 7 | Complete |
| Week 2 | Jan 26 - Feb 1 | 7 | Complete |
| Week 3 | Feb 2-8 | 7 | Complete |
| Week 4 | Feb 9-15 | 7 | Complete |
| Week 5 | Feb 16-22 | 7 | Complete |
| Week 6 | Feb 23 - Mar 1 | 7 | Complete |
| Week 7 | Mar 2-8 | 7 | Complete |
| Week 8 | Mar 9-15 | 7 | Complete |
| Week 9 | Mar 16-19 | 4 | Complete |
| Week 10 | Mar 20-25 | 6 | Complete |

**Total: 66 puzzles covering Jan 19 - Mar 25, 2026**

---

## Timeline to Deadline

| Date | Days Left | Milestone |
|------|-----------|-----------|
| Jan 25 | 18 | TODAY - Puzzles complete, code quality verified |
| Jan 26-28 | 17-15 | Deploy update, create subreddit, take screenshots |
| Jan 29 - Feb 5 | 14-7 | Final testing, video demo |
| Feb 6-10 | 6-2 | Submit to Devpost, buffer time |
| Feb 12 | 0 | DEADLINE 6:00 PM PST |

---

## Completed Today (Jan 25)

- [x] Created 6 new puzzles (week10.json) for Mar 20-25
- [x] Updated bootstrapService.ts to include week10
- [x] Verified build passes (`npm run build`)
- [x] Verified TypeScript passes (`npm run typecheck`)
- [x] Verified lint passes (`npm run lint`)
- [x] Verified tests pass (`npm test`)
- [x] Removed `// v24 touch` comment from main.tsx
- [x] Updated GOAL.md with completed acceptance criteria
- [x] Updated PLAN.md with completed phases
- [x] Updated CLAUDE.md with project status
- [x] Updated PLAYTEST_GUIDE.md with correct puzzle dates
- [x] Created comprehensive TODO.md

---

## Quick Reference

**Build Commands:**
```bash
npm run dev          # Local playtest
npm run build        # Full build
npm run upload       # Deploy to Reddit
npm run test         # Run tests
npm run typecheck    # TypeScript check
```

**Key URLs:**
- Devvit Dashboard: https://developers.reddit.com/apps/comment-conspire
- Demo Subreddit: https://reddit.com/r/CommentConspiracy
- Playtest Subreddit: https://reddit.com/r/comment_conspire_dev

**Key Files:**
- Puzzle data: `src/data/bootstrap/week*.json`
- Bootstrap service: `src/services/bootstrapService.ts`
- Scheduler: `src/scheduler/dailyPuzzle.tsx`
- Main app: `src/main.tsx`
