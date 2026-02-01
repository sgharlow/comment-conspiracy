# Comment Conspiracy

Daily Reddit game where players identify which comment among 5 is AI-generated. Built for the Reddit Games & Puzzles Hackathon 2026.

## Tech Stack

- **Platform**: Reddit Devvit (developer.reddit.com)
- **Frontend**: React 18 + TypeScript 5.x + Tailwind CSS (via Devvit WebView)
- **Backend**: Devvit Redis for persistence, Devvit Scheduler for daily puzzle posting
- **Build**: esbuild for webview bundling
- **Testing**: Vitest

## Project Structure

```
comment-conspiracy/
├── devvit.yaml              # Devvit app config (name, version, capabilities)
├── package.json             # v0.0.12, @devvit/public-api 0.12.8
├── src/
│   ├── main.tsx             # Devvit entry: WebView host, message handlers, triggers
│   ├── types/               # TypeScript definitions
│   │   ├── puzzle.ts        # Puzzle, Comment, Difficulty, ShuffledPuzzle
│   │   ├── user.ts          # UserProgress, UserGuess, Achievement
│   │   ├── game.ts          # GameState, GuessResult, GameAction
│   │   ├── messages.ts      # WebView <-> Devvit message types
│   │   └── contribution.ts  # User contribution types
│   ├── components/
│   │   ├── App.tsx          # Main React app, state machine, message handling
│   │   ├── screens/         # WelcomeScreen, GameScreen, ResultScreen, CompletedScreen
│   │   ├── game/            # CommentCard, ConfirmModal
│   │   ├── results/         # ResultBanner, AIExplanation, StatsPanel, ShareCard
│   │   ├── contributions/   # ContributeScreen, ContributionForm
│   │   └── shared/          # LoadingSpinner, Timer, ErrorState
│   ├── hooks/
│   │   └── useGameState.ts  # Game state reducer
│   ├── services/
│   │   ├── puzzleService.ts     # getTodaysPuzzle, submitGuess, getPreviousResult
│   │   ├── redisService.ts      # Low-level Redis operations
│   │   ├── redisKeys.ts         # Redis key schema
│   │   ├── bootstrapService.ts  # Loads 66 puzzles from JSON into Redis
│   │   ├── userService.ts       # User progress management
│   │   ├── achievementService.ts# Achievement checking/awarding
│   │   ├── contributionService.ts# User-submitted puzzle ideas
│   │   └── inventoryService.ts  # Puzzle inventory health checks
│   ├── scheduler/
│   │   └── dailyPuzzle.tsx  # Cron job: posts new puzzle at midnight UTC
│   ├── utils/
│   │   ├── shuffleUtils.ts  # Deterministic shuffle (userId:puzzleId seed)
│   │   ├── shareUtils.ts    # Generate share text
│   │   └── leaderboardUtils.ts
│   ├── data/bootstrap/
│   │   └── week01-10.json   # 66 pre-curated puzzles (Jan 19 - Mar 25, 2026)
│   └── web/
│       └── index.tsx        # WebView React entry
├── webroot/                 # Built webview assets (index.html, bundle.js)
└── scripts/
    └── build-webview.cjs    # esbuild script for webview
```

## Development

```bash
npm install           # Install dependencies
npm run dev           # Start Devvit playtest
npm run build         # Build webview + devvit
npm run upload        # Deploy to Reddit
npm run test          # Run Vitest tests
npm run typecheck     # TypeScript check
npm run lint          # ESLint check
```

## Architecture

### Message Flow
1. WebView sends `INIT` on load
2. Devvit host fetches puzzle from Redis, shuffles for user, responds with `INIT_RESPONSE`
3. User selects comment, confirms guess
4. WebView sends `SUBMIT_GUESS` with guessIndex
5. Devvit validates, updates streak/stats, responds with `GUESS_RESPONSE`

### Key Patterns
- **Shuffling**: Comments are deterministically shuffled per-user using `hashSeed(userId:puzzleId)`. AI index hidden until guess.
- **Idempotent Guesses**: `submitGuess` checks for existing guess first, returns cached result.
- **Streak Logic**: Consecutive correct answers, resets on wrong or missed day. Uses UTC dates.
- **Lazy Bootstrap**: Puzzles seeded into Redis on first request if empty.

### Redis Keys
- `puzzle:{YYYY-MM-DD}` - Puzzle JSON
- `puzzle:current` - Today's puzzle ID
- `puzzle:index` - Array of all puzzle IDs (stored as JSON string)
- `user:{userId}:progress` - UserProgress JSON
- `user:{userId}:guess:{puzzleId}` - UserGuess JSON
- `stats:{puzzleId}` - PuzzleStats hash
- `leaderboard:streaks` - Sorted set
- `leaderboard:accuracy` - Sorted set

### Game Rules
- One guess per day (no retries)
- 24-hour puzzle window (midnight UTC reset)
- Difficulty: Monday (easy) -> Friday (hard) -> Weekend (expert)
- 8 achievements: first_correct, streak_3/7/30, perfect_week, hard_mode, veteran, sharp_eye

## Current Status

- **Live**: r/CommentConspiracy
- **Version**: 0.0.13 (devvit.yaml)
- **Puzzle Content**: 66 puzzles (Jan 19 - Mar 25, 2026)
- **Hackathon Deadline**: February 12, 2026

### Key Files to Check
- `devvit.yaml` - Version and scheduled job config
- `src/scheduler/dailyPuzzle.tsx` - Job name must match devvit.yaml (`daily-puzzle-post`)
- `src/services/bootstrapService.ts` - Puzzle data loading

## Testing

Tests located in `src/**/*.test.ts`:
- `puzzleData.test.ts` - Validates puzzle JSON format
- `shuffleUtils.test.ts` - Deterministic shuffle verification
- `shareUtils.test.ts` - Share text generation
- `achievementService.test.ts` - Achievement logic
- `leaderboardService.test.ts` - Ranking calculations

Run with `npm run test` or `npm run test:watch`.
