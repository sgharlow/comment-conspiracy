# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Comment Conspiracy is a daily Reddit game built on the Devvit platform where players identify which comment among 5 is AI-generated. Target prizes: Best Daily Game ($15K), Best Use of User Contributions ($3K), Best Mobile Game Play ($3K).

**Development Status:** 100% complete (20/20 tasks). See TODO.md for launch checklist.
**Hackathon Deadline:** February 12, 2026, 6:00 PM PST
**Puzzle Content:** 66 puzzles (Jan 19 - Mar 25, 2026)
**Demo URL:** https://reddit.com/r/CommentConspiracy

## Status (As of Jan 26, 2026)

**All Critical Issues Resolved:**
1. ✅ **Scheduler job name** - Fixed in v0.0.12 (synced to `daily-puzzle-post`)
2. ✅ **Version** - Updated to `0.0.12` and deployed

**Remaining:** Submit to Devpost before Feb 12 deadline.

## Technology Stack

- **Platform**: Reddit Devvit (developer.reddit.com)
- **Frontend**: React 18 via Devvit Web, TypeScript 5.x, Tailwind CSS
- **Backend**: Devvit Redis for persistence, Devvit Scheduler for daily puzzle posting
- **State**: React useState/useReducer (local), Devvit Redis/KV Store (persistent)

## Project Structure

```
comment-conspiracy/
├── devvit.yaml                    # Devvit configuration (NEEDS version update)
├── src/
│   ├── main.tsx                   # App entry point & WebView message handlers
│   ├── types/                     # TypeScript type definitions (6 files)
│   ├── components/
│   │   ├── screens/               # WelcomeScreen, GameScreen, ResultScreen, CompletedScreen
│   │   ├── game/                  # CommentCard, ConfirmModal
│   │   ├── results/               # ResultBanner, AIExplanation, StatsPanel, ShareCard, etc.
│   │   ├── contributions/         # ContributeScreen, ContributionForm, ContributionCard, etc.
│   │   └── shared/                # LoadingSpinner, Timer, ErrorState, App.tsx
│   ├── hooks/                     # useGameState
│   ├── services/                  # puzzleService, bootstrapService, redisService, etc.
│   ├── scheduler/                 # dailyPuzzle.tsx (NEEDS job name sync)
│   ├── utils/                     # shuffleUtils, shareUtils, leaderboardUtils
│   └── data/bootstrap/            # week01-10.json (66 puzzles)
├── tests/                         # 5 test suites (all passing)
├── screenshots/                   # 5 Devpost screenshots
└── webroot/                       # Static web files
```

## Key Files to Know

| File | Purpose | Notes |
|------|---------|-------|
| `devvit.yaml` | App config | v0.0.12 deployed |
| `src/scheduler/dailyPuzzle.tsx` | Daily posting | Job name: `daily-puzzle-post` |
| `src/services/bootstrapService.ts` | Loads 66 puzzles | Imports week01-10.json |
| `src/services/puzzleService.ts` | Core game logic | Shuffle, guess, streak |
| `src/components/App.tsx` | Main React app | Renders all screens |

## Key Data Models

**Puzzle**: Contains 5 comments (4 real Reddit, 1 AI-generated), prompt, difficulty level, AI detection explanations
**UserProgress**: Tracks streaks, accuracy by difficulty, achievements, recent history
**DailyStats**: Aggregates guess distribution, player counts, percentiles

## Redis Key Patterns

- `puzzle:{YYYY-MM-DD}` - Puzzle data
- `puzzle:current` - Today's puzzle ID
- `puzzle:index` - Array of all puzzle IDs
- `user:{userId}:progress` - User progression data
- `user:{userId}:guess:{puzzleId}` - Individual guess (idempotent)
- `stats:{puzzleId}` - Daily statistics
- `leaderboard:streaks` - Sorted set for streak rankings
- `leaderboard:accuracy` - Sorted set for accuracy rankings (10+ games)

## Game Rules

1. One guess per day (no retries)
2. 24-hour puzzle window (expires at midnight UTC)
3. Streak tracking: consecutive correct answers, resets on wrong guess or missed day
4. Difficulty progression: Monday (easy) → Friday (hard) → Saturday (expert)

## Achievements (8 total)

1. `first_correct` - First correct guess
2. `streak_3` - 3-day streak
3. `streak_7` - 7-day streak
4. `streak_30` - 30-day streak
5. `perfect_week` - 7 correct in a row
6. `hard_mode` - Expert difficulty correct
7. `veteran` - Play 30 puzzles
8. `sharp_eye` - 80%+ accuracy over 20+ games

## Architecture Principles

- Puzzles are pre-generated and curated offline (not generated on-the-fly)
- AI comment index is hidden from client until after guess submission
- Comments are shuffled per-user using deterministic seed (userId:puzzleId)
- All timestamps use UTC for consistency
- Server-side source of truth for streaks/progress (prevents manipulation)
- Idempotent guess submission (safe for retries)

## Build Commands

```bash
npm run dev          # Local playtest
npm run build        # Full build (webview + devvit)
npm run upload       # Deploy to Reddit
npm run test         # Run Vitest tests
npm run typecheck    # TypeScript check
npm run lint         # ESLint check
```

## Current Status (Jan 26, 2026)

- **r/CommentConspiracy**: Live, public, app installed (v0.0.12), game fully tested
- **r/comment_conspire_dev**: Available for testing (private)
- **Puzzle inventory**: 66 days (through Mar 25)
- **Code quality**: All checks passing
- **App version**: 0.0.12 (all critical issues fixed)
- **Next step**: Submit to Devpost, verify scheduler at midnight UTC
