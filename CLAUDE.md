# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Comment Conspiracy is a daily Reddit game built on the Devvit platform where players identify which comment among 5 is AI-generated. Target prizes: Best Daily Game ($15K), Best Use of User Contributions ($3K), Best Mobile Game Play ($3K).

**Development Status:** 100% complete (20/20 tasks). See TODO.md for launch checklist.
**Hackathon Deadline:** February 12, 2026, 6:00 PM PST
**Puzzle Content:** 66 puzzles (Jan 19 - Mar 25, 2026)

## Technology Stack

- **Platform**: Reddit Devvit (developer.reddit.com)
- **Frontend**: React 18 via Devvit Web, TypeScript 5.x, Tailwind CSS
- **Backend**: Devvit Redis for persistence, Devvit Scheduler for daily puzzle posting
- **State**: React useState/useReducer (local), Devvit Redis/KV Store (persistent)

## Project Structure (Planned)

```
comment-conspiracy/
├── devvit.yaml                    # Devvit configuration
├── src/
│   ├── main.tsx                   # App entry point
│   ├── types/                     # TypeScript type definitions
│   ├── components/
│   │   ├── screens/               # WelcomeScreen, GameScreen, ResultScreen, CompletedScreen
│   │   ├── game/                  # CommentCard, CommentList, PromptHeader, ConfirmModal
│   │   ├── results/               # ResultBanner, AIExplanation, StatsPanel, ShareCard
│   │   └── shared/                # Button, ProgressBar, Timer, LoadingSpinner
│   ├── hooks/                     # useGameState, useUserProgress, usePuzzle, useStats
│   ├── services/                  # puzzleService, userService, statsService, schedulerService
│   ├── utils/                     # dateUtils, shuffleUtils, shareUtils
│   └── data/puzzles/              # Pre-generated puzzle JSON files
```

## Key Data Models

**Puzzle**: Contains 5 comments (4 real Reddit, 1 AI-generated), prompt, difficulty level, AI detection explanations
**UserProgress**: Tracks streaks, accuracy by difficulty, achievements, recent history
**DailyStats**: Aggregates guess distribution, player counts, percentiles

## Redis Key Patterns

- `puzzle:{date}` - Puzzle data
- `puzzle:current` - Today's puzzle ID
- `user:{userId}:progress` - User progression data
- `stats:{puzzleId}` - Daily statistics
- `leaderboard:streaks` - Sorted set for streak rankings

## Game Rules

1. One guess per day (no retries)
2. 24-hour puzzle window (expires at midnight UTC)
3. Streak tracking: consecutive correct answers, resets on wrong guess or missed day
4. Difficulty progression: Monday (easy) → Friday (hard) → Saturday (expert)

## Architecture Principles

- Puzzles are pre-generated and curated offline (not generated on-the-fly)
- AI comment index is hidden from client until after guess submission
- Comments are shuffled per-user to prevent position-based spoilers
- All timestamps use UTC for consistency
- Server-side source of truth for streaks/progress (prevents manipulation)
