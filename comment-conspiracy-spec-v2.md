# Comment Conspiracy: Complete Product Specification

## Executive Summary

**Comment Conspiracy** is a daily deduction game for Reddit where players identify which comment among a set is AI-generated. Each day presents a fresh puzzle that drives community discussion, rewards pattern recognition, and creates shareable moments.

**Target Prizes:**
- 🥇 Best Daily Game ($15,000)
- 🥈 Best Use of User Contributions ($3,000)
- 🥉 Best Mobile Game Play ($3,000)

**Tagline:** *"One of these comments isn't human. Can you spot the imposter?"*

---

## Table of Contents

1. [Game Design](#1-game-design)
2. [User Experience Flow](#2-user-experience-flow)
3. [Technical Architecture](#3-technical-architecture)
4. [Content Operations & Puzzle Pipeline](#4-content-operations--puzzle-pipeline)
5. [Puzzle Generator Tool Specification](#5-puzzle-generator-tool-specification)
6. [Scoring & Progression System](#6-scoring--progression-system)
7. [Social & Community Features](#7-social--community-features)
8. [Mobile UX Specification](#8-mobile-ux-specification)
9. [Judging Criteria Alignment](#9-judging-criteria-alignment)
10. [Data Models](#10-data-models)
11. [API Specifications](#11-api-specifications)
12. [UI Component Specifications](#12-ui-component-specifications)
13. [Content Guidelines](#13-content-guidelines)
14. [Edge Cases & Error Handling](#14-edge-cases--error-handling)
15. [Testing Strategy](#15-testing-strategy)
16. [Launch Checklist](#16-launch-checklist)
17. [Future Roadmap](#17-future-roadmap)
18. [Implementation Roadmap](#18-implementation-roadmap)

---

## 1. Game Design

### 1.1 Core Concept

Players are shown 5 Reddit-style comments responding to a prompt. Four comments are real (sourced from Reddit). One comment is AI-generated. Players must identify the AI comment.

### 1.2 Why This Works

| Element | Engagement Driver |
|---------|------------------|
| Daily puzzle | Creates FOMO, habit formation |
| AI detection | Timely, culturally relevant topic |
| Discussion potential | Every guess sparks debate |
| Low barrier | Read + tap = complete interaction |
| Skill progression | Players improve at detecting AI patterns |

### 1.3 Core Game Loop

```
┌─────────────────────────────────────────────────────────┐
│  1. DISCOVER                                            │
│     User sees daily post in feed: "Day 47: Can you     │
│     spot the AI comment?"                               │
├─────────────────────────────────────────────────────────┤
│  2. READ                                                │
│     User reads the prompt and 5 comments carefully      │
│     Looking for: tone inconsistencies, over-           │
│     helpfulness, unnatural phrasing                     │
├─────────────────────────────────────────────────────────┤
│  3. GUESS                                               │
│     User taps one comment as their answer               │
│     ONE guess allowed (creates tension)                 │
├─────────────────────────────────────────────────────────┤
│  4. REVEAL                                              │
│     Immediate feedback: Correct ✓ or Wrong ✗           │
│     AI comment highlighted with explanation             │
├─────────────────────────────────────────────────────────┤
│  5. DISCUSS                                             │
│     User joins Reddit comments to debate                │
│     "I KNEW it was #3!" or "How did anyone fall        │
│     for #2?!"                                           │
├─────────────────────────────────────────────────────────┤
│  6. SHARE                                               │
│     Shareable result card (no spoilers)                 │
│     "Comment Conspiracy Day 47: ✓ 1/1"                  │
└─────────────────────────────────────────────────────────┘
```

### 1.4 Difficulty Progression

The game gets progressively harder throughout the week:

| Day | Difficulty | AI Comment Characteristics |
|-----|------------|---------------------------|
| Monday | Easy | Obvious tells: over-formal, too helpful, no typos |
| Tuesday | Easy-Medium | Slight personality injection |
| Wednesday | Medium | Mimics casual tone, includes minor "errors" |
| Thursday | Medium-Hard | Contextually aware, community-specific references |
| Friday | Hard | Near-indistinguishable, subtle pattern breaks |
| Saturday | Expert | Intentionally includes red herrings in real comments |
| Sunday | Wildcard | Theme days (all tech, all emotional, etc.) |

### 1.5 Game Rules

1. **One guess per day** - No retries, increases stakes
2. **24-hour window** - Puzzle expires at midnight UTC
3. **No editing** - Once submitted, answer is final
4. **Spoiler prevention** - Results hidden until user completes
5. **Streak tracking** - Consecutive correct answers tracked

---

## 2. User Experience Flow

### 2.1 First-Time User Flow

```
State: NEW_USER
┌────────────────────────────────────────┐
│         COMMENT CONSPIRACY             │
│                                        │
│  One of these comments was written     │
│  by AI. Can you spot the imposter?     │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ How to Play:                     │  │
│  │ • Read all 5 comments carefully  │  │
│  │ • Tap the one you think is AI    │  │
│  │ • You only get ONE guess!        │  │
│  └──────────────────────────────────┘  │
│                                        │
│  [ START TODAY'S PUZZLE ]              │
│                                        │
│  🔥 Current streak: 0 days            │
└────────────────────────────────────────┘
```

### 2.2 Active Game Flow

```
State: PLAYING
┌────────────────────────────────────────┐
│  DAY 47 • Wednesday • Medium           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                        │
│  PROMPT: "What's the most underrated   │
│  kitchen gadget everyone should own?"  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ 1. u/HomeCookPro                 │  │
│  │ "Honestly? A bench scraper.      │  │
│  │ Cost me $3 and I use it every    │  │
│  │ single day. Cleanup is so much   │  │
│  │ faster now."                     │  │
│  │                         [ TAP ]  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ 2. u/KitchenMinimalist           │  │
│  │ "A good instant-read thermometer │  │
│  │ changed my cooking game. No more │  │
│  │ guessing if meat is done."       │  │
│  │                         [ TAP ]  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ 3. u/BudgetFoodie2024            │  │
│  │ "Microplane zester! Fresh citrus │  │
│  │ zest and garlic in seconds. It's │  │
│  │ a game-changer for flavor."      │  │
│  │                         [ TAP ]  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ 4. u/LazyChefLife                │  │
│  │ "rice cooker lol. threw out my   │  │
│  │ pot years ago never looked back  │  │
│  │ perfect rice every time"         │  │
│  │                         [ TAP ]  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ 5. u/SousVideSally               │  │
│  │ "Kitchen scale. Once you start   │  │
│  │ weighing ingredients instead of  │  │
│  │ measuring cups, baking becomes   │  │
│  │ so much more consistent."        │  │
│  │                         [ TAP ]  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ⚠️ Choose carefully - you only get   │
│     one guess!                         │
└────────────────────────────────────────┘
```

### 2.3 Confirmation Modal

```
State: CONFIRMING
┌────────────────────────────────────────┐
│                                        │
│     You selected Comment #3:           │
│                                        │
│     "Microplane zester! Fresh citrus   │
│      zest and garlic in seconds..."    │
│                                        │
│     Is this your final answer?         │
│                                        │
│   [ CANCEL ]        [ CONFIRM GUESS ]  │
│                                        │
└────────────────────────────────────────┘
```

### 2.4 Result - Correct

```
State: RESULT_CORRECT
┌────────────────────────────────────────┐
│                                        │
│            🎉 CORRECT! 🎉              │
│                                        │
│     Comment #3 was the AI imposter!    │
│                                        │
│     ┌────────────────────────────┐     │
│     │ 🤖 AI TELLS:               │     │
│     │ • "Game-changer" is an     │     │
│     │   overused AI phrase       │     │
│     │ • Exclamation marks feel   │     │
│     │   artificially enthusiastic│     │
│     │ • Too structured: tool →   │     │
│     │   use → benefit            │     │
│     └────────────────────────────┘     │
│                                        │
│     🔥 Streak: 5 days                  │
│     📊 You're in the top 23% today     │
│                                        │
│     ┌────────────────────────────┐     │
│     │ Comment Conspiracy Day 47  │     │
│     │ ✅ 1/1                      │     │
│     │ 🔥 5-day streak            │     │
│     │                            │     │
│     │ [ COPY ] [ SHARE ]         │     │
│     └────────────────────────────┘     │
│                                        │
│   [ VIEW FULL BREAKDOWN ]              │
│   [ JOIN DISCUSSION 💬 247 ]           │
│                                        │
└────────────────────────────────────────┘
```

### 2.5 Result - Incorrect

```
State: RESULT_INCORRECT
┌────────────────────────────────────────┐
│                                        │
│            ❌ NOT QUITE ❌              │
│                                        │
│     You guessed #4, but the AI was #3  │
│                                        │
│     ┌────────────────────────────┐     │
│     │ 🤖 WHY #3 WAS AI:          │     │
│     │ • "Game-changer" cliché    │     │
│     │ • Artificial enthusiasm    │     │
│     │ • Formulaic structure      │     │
│     │                            │     │
│     │ 👤 WHY #4 WAS HUMAN:       │     │
│     │ • Lowercase + casual "lol" │     │
│     │ • Missing punctuation      │     │
│     │ • Authentic laziness vibe  │     │
│     └────────────────────────────┘     │
│                                        │
│     💔 Streak reset: 0 days            │
│     📊 67% of players got this right   │
│                                        │
│     ┌────────────────────────────┐     │
│     │ Comment Conspiracy Day 47  │     │
│     │ ❌ 0/1                      │     │
│     │ Better luck tomorrow!      │     │
│     │                            │     │
│     │ [ COPY ] [ SHARE ]         │     │
│     └────────────────────────────┘     │
│                                        │
│   [ VIEW FULL BREAKDOWN ]              │
│   [ JOIN DISCUSSION 💬 247 ]           │
│                                        │
└────────────────────────────────────────┘
```

### 2.6 Already Played State

```
State: COMPLETED
┌────────────────────────────────────────┐
│                                        │
│     ✓ YOU'VE PLAYED TODAY             │
│                                        │
│     Your answer: #3 (Correct ✓)        │
│     Streak: 5 days 🔥                  │
│                                        │
│     ┌────────────────────────────┐     │
│     │ TODAY'S STATS              │     │
│     │ • 12,847 players           │     │
│     │ • 67% guessed correctly    │     │
│     │ • Most picked: #3 (41%)    │     │
│     │ • Least picked: #1 (8%)    │     │
│     └────────────────────────────┘     │
│                                        │
│     Next puzzle in: 4h 23m             │
│                                        │
│   [ VIEW BREAKDOWN ] [ DISCUSS 💬 ]    │
│                                        │
└────────────────────────────────────────┘
```

---

## 3. Technical Architecture

### 3.1 Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                    DEVVIT WEB APP                       │
├─────────────────────────────────────────────────────────┤
│  Frontend                                               │
│  ├── React 18 (Devvit Web)                             │
│  ├── TypeScript 5.x                                    │
│  ├── Tailwind CSS (utility classes only)              │
│  └── Framer Motion (animations)                        │
├─────────────────────────────────────────────────────────┤
│  State Management                                       │
│  ├── React useState/useReducer (local)                 │
│  ├── Devvit Redis (persistent)                         │
│  └── Devvit KV Store (user progress)                   │
├─────────────────────────────────────────────────────────┤
│  Backend (Devvit)                                       │
│  ├── Devvit Scheduler (daily puzzle posting)           │
│  ├── Devvit Redis (game state, leaderboards)           │
│  ├── Devvit HTTP (external API calls if needed)        │
│  └── Devvit Triggers (post creation, scheduling)       │
├─────────────────────────────────────────────────────────┤
│  Content Pipeline                                       │
│  ├── Pre-generated puzzle bank (JSON)                  │
│  ├── AI comment generation (Claude API - offline)      │
│  └── Manual curation queue                             │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Project Structure

```
comment-conspiracy/
├── devvit.yaml                    # Devvit configuration
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── src/
│   ├── main.tsx                   # App entry point
│   ├── types/
│   │   ├── index.ts              # Shared type definitions
│   │   ├── puzzle.ts             # Puzzle-related types
│   │   ├── user.ts               # User state types
│   │   └── game.ts               # Game state types
│   ├── components/
│   │   ├── App.tsx               # Root component
│   │   ├── screens/
│   │   │   ├── WelcomeScreen.tsx # First-time user
│   │   │   ├── GameScreen.tsx    # Active gameplay
│   │   │   ├── ResultScreen.tsx  # Post-guess results
│   │   │   └── CompletedScreen.tsx # Already played
│   │   ├── game/
│   │   │   ├── CommentCard.tsx   # Individual comment
│   │   │   ├── CommentList.tsx   # All 5 comments
│   │   │   ├── PromptHeader.tsx  # Daily prompt display
│   │   │   └── ConfirmModal.tsx  # Guess confirmation
│   │   ├── results/
│   │   │   ├── ResultBanner.tsx  # Correct/incorrect
│   │   │   ├── AIExplanation.tsx # Why it was AI
│   │   │   ├── StatsPanel.tsx    # Today's statistics
│   │   │   └── ShareCard.tsx     # Shareable result
│   │   ├── admin/                 # Moderator-only components
│   │   │   ├── AdminPanel.tsx    # Admin dashboard
│   │   │   ├── PuzzleUploader.tsx # Upload puzzle JSON
│   │   │   ├── InventoryView.tsx # Calendar view of puzzles
│   │   │   └── HealthStatus.tsx  # System health check
│   │   └── shared/
│   │       ├── Button.tsx        # Reusable button
│   │       ├── ProgressBar.tsx   # Streak indicator
│   │       ├── Timer.tsx         # Countdown to next
│   │       └── LoadingSpinner.tsx
│   ├── hooks/
│   │   ├── useGameState.ts       # Current game state
│   │   ├── useUserProgress.ts    # Streak, history
│   │   ├── usePuzzle.ts          # Today's puzzle data
│   │   ├── useStats.ts           # Community statistics
│   │   └── useAdmin.ts           # Admin permissions check
│   ├── services/
│   │   ├── puzzleService.ts      # Fetch/manage puzzles
│   │   ├── userService.ts        # User data operations
│   │   ├── statsService.ts       # Aggregate statistics
│   │   ├── schedulerService.ts   # Daily posting logic
│   │   └── inventoryService.ts   # Puzzle inventory management
│   ├── scheduler/
│   │   ├── dailyPuzzle.ts        # Main scheduler job
│   │   └── healthCheck.ts        # Monitoring job
│   ├── api/                       # HTTP endpoints (optional)
│   │   └── uploadPuzzle.ts       # Puzzle upload endpoint
│   ├── utils/
│   │   ├── dateUtils.ts          # Timezone handling
│   │   ├── shuffleUtils.ts       # Comment randomization
│   │   ├── shareUtils.ts         # Share text generation
│   │   └── validators.ts         # Puzzle validation
│   └── data/
│       └── bootstrap/             # Initial puzzles bundled in code
│           └── week01.json       # First 7 puzzles for immediate demo
├── assets/
│   └── (empty - text only game)
└── README.md                      # Documentation

puzzle-generator/                  # SEPARATE PROJECT - Local CLI tool
├── package.json
├── tsconfig.json
├── .env.example                   # API key template
├── src/
│   ├── index.ts                   # CLI entry point
│   ├── commands/
│   │   ├── generate.ts           # Interactive puzzle generation
│   │   ├── batch.ts              # Batch generation mode
│   │   ├── review.ts             # Review pending puzzles
│   │   ├── upload.ts             # Upload to Devvit Redis
│   │   ├── status.ts             # Check inventory status
│   │   └── validate.ts           # Validate puzzle JSON
│   ├── services/
│   │   ├── redditService.ts      # Reddit API wrapper
│   │   ├── claudeService.ts      # Claude API wrapper
│   │   ├── devvitService.ts      # Devvit upload (if using HTTP)
│   │   └── fileService.ts        # Local file management
│   ├── prompts/
│   │   ├── easy.txt              # AI generation prompt - easy
│   │   ├── medium.txt            # AI generation prompt - medium
│   │   ├── hard.txt              # AI generation prompt - hard
│   │   └── expert.txt            # AI generation prompt - expert
│   ├── templates/
│   │   └── puzzle.json           # Empty puzzle template
│   └── utils/
│       ├── usernameGenerator.ts  # Fake Reddit usernames
│       ├── commentFilter.ts      # Comment quality filters
│       └── diversitySelector.ts  # Select diverse comments
├── puzzles/                       # Local puzzle storage
│   ├── pending/                  # Awaiting review
│   ├── approved/                 # Ready to upload
│   └── uploaded/                 # Confirmed in Redis
└── README.md
```

### 3.3 Devvit Configuration

```yaml
# devvit.yaml
name: comment-conspiracy
version: 1.0.0
description: "Daily game - spot the AI-generated comment among real Reddit comments"

# Capabilities required
capabilities:
  - redis           # Persistent storage
  - scheduler       # Daily puzzle posting
  - http            # External API (if needed)
  - ui              # Web views
  - triggers        # Post creation hooks

# Web view configuration
webRoot: ./webroot

# Scheduled jobs
scheduledJobs:
  - name: post-daily-puzzle
    cron: "0 0 * * *"  # Midnight UTC daily
    
# Form configurations (none needed)

# Menu items
menuItems:
  - name: "View Comment Conspiracy Stats"
    location: subreddit
    postFilter: currentApp
```

### 3.4 Data Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Puzzle    │────▶│   Redis     │────▶│   React     │
│   Bank      │     │   Cache     │     │   Frontend  │
│   (JSON)    │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                   │
                           │                   │
                    ┌──────▼──────┐           │
                    │   User      │◀──────────┘
                    │   Actions   │
                    │  (guesses)  │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Stats      │
                    │  Aggregator │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ Leaderboard │
                    │   & Share   │
                    └─────────────┘
```

---

## 4. Content Operations & Puzzle Pipeline

This section covers the complete operational side of running Comment Conspiracy: how puzzles are created, stored, scheduled, and delivered. This is critical infrastructure that determines long-term viability.

### 4.1 Architecture Overview: Where Puzzles Live

```
PUZZLE STORAGE ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────┐
│                     YOUR LOCAL MACHINE                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Puzzle Generator CLI Tool                               │   │
│  │  • Fetches Reddit comments                               │   │
│  │  • Generates AI comments via Claude API                  │   │
│  │  • Outputs puzzle JSON files                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  /puzzles/                                               │   │
│  │  ├── pending/          (awaiting review)                 │   │
│  │  │   ├── 2026-02-15.json                                │   │
│  │  │   └── 2026-02-16.json                                │   │
│  │  ├── approved/         (ready to upload)                 │   │
│  │  │   ├── 2026-02-01.json                                │   │
│  │  │   └── ...                                            │   │
│  │  └── uploaded/         (confirmed in Redis)              │   │
│  │      └── ...                                            │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Upload via Admin UI
                              │ (or HTTP endpoint)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DEVVIT PLATFORM                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Redis Database                                          │   │
│  │  ├── puzzle:2026-02-01  → {puzzle JSON}                 │   │
│  │  ├── puzzle:2026-02-02  → {puzzle JSON}                 │   │
│  │  ├── puzzle:index       → [list of puzzle IDs]          │   │
│  │  ├── puzzle:current     → "2026-02-01"                  │   │
│  │  └── schedule:calendar  → {date → puzzleId mapping}     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              │ Scheduler reads daily             │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Devvit Scheduler (runs at 00:00 UTC)                   │   │
│  │  1. Look up today's date                                 │   │
│  │  2. Fetch puzzle from Redis                              │   │
│  │  3. Create new Reddit post                               │   │
│  │  4. Update puzzle:current pointer                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  r/CommentConspiracy                                     │   │
│  │  └── "Day 47: Can you spot the AI?" (new post)          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Key Design Decision: Redis vs Bundled JSON

**Why Redis (not bundled JSON files)?**

| Approach | Pros | Cons |
|----------|------|------|
| **Bundled JSON** | Simple, no upload step | Must redeploy app to add puzzles |
| **Redis Storage** | Add puzzles anytime, no redeploy | Needs upload mechanism |

**We use Redis because:**
1. You can add puzzles without redeploying code
2. Enables future community puzzle submissions
3. Allows real-time puzzle statistics
4. Matches how production games work

**Bootstrap Strategy:**
- Bundle first 7 puzzles in code (immediate demo)
- All subsequent puzzles via Redis upload
- This gives you a working demo instantly while building the upload pipeline

### 4.3 The Puzzle Generator CLI Tool

This is a **local Node.js CLI tool** that runs on your development machine. It accelerates puzzle creation from ~40 minutes to ~10 minutes per puzzle.

#### 4.3.1 Tool Architecture

```
puzzle-generator/
├── package.json
├── tsconfig.json
├── .env                      # API keys (Reddit, Claude)
├── src/
│   ├── index.ts             # CLI entry point
│   ├── commands/
│   │   ├── generate.ts      # Main generation workflow
│   │   ├── fetch-comments.ts # Reddit API integration
│   │   ├── create-ai.ts     # Claude API integration
│   │   ├── review.ts        # Interactive review mode
│   │   └── upload.ts        # Push to Devvit Redis
│   ├── services/
│   │   ├── redditService.ts # Reddit API wrapper
│   │   ├── claudeService.ts # Claude API wrapper
│   │   └── storageService.ts # Local file management
│   ├── prompts/
│   │   ├── easy.txt         # AI generation prompts by difficulty
│   │   ├── medium.txt
│   │   ├── hard.txt
│   │   └── expert.txt
│   └── utils/
│       ├── usernameGen.ts   # Fake username generator
│       └── validators.ts    # Content validation
├── puzzles/
│   ├── pending/             # Generated, awaiting review
│   ├── approved/            # Reviewed, ready to upload
│   └── uploaded/            # Confirmed in Redis
└── README.md
```

#### 4.3.2 CLI Commands

```bash
# Generate a new puzzle interactively
npx puzzle-gen generate --difficulty medium --category food

# Batch generate multiple puzzles
npx puzzle-gen batch --count 7 --start-date 2026-02-01

# Review pending puzzles
npx puzzle-gen review

# Upload approved puzzles to Devvit Redis
npx puzzle-gen upload --all
# or
npx puzzle-gen upload --date 2026-02-01

# Check puzzle inventory status
npx puzzle-gen status

# Validate puzzle JSON file
npx puzzle-gen validate ./puzzles/pending/2026-02-01.json
```

#### 4.3.3 Interactive Generation Flow

```
$ npx puzzle-gen generate --difficulty medium --category food

╔══════════════════════════════════════════════════════════════╗
║  PUZZLE GENERATOR - Medium Difficulty - Food Category        ║
╚══════════════════════════════════════════════════════════════╝

Step 1/5: PROMPT SELECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━

Fetching popular food-related AskReddit prompts...

  [1] "What's a food combination that sounds disgusting but works?"
  [2] "What's the most overrated food in your opinion?"
  [3] "What food did you hate as a kid but love now?"
  [4] "What's your controversial food opinion?"
  [5] Enter custom prompt

Select prompt (1-5): 3

✓ Selected: "What food did you hate as a kid but love now?"

Step 2/5: FETCHING REAL COMMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Searching Reddit for relevant comments...
Found 156 candidates. Filtering...
  • Length filter (50-200 chars): 89 remaining
  • Quality filter (positive karma): 67 remaining
  • Diversity filter: 23 remaining

Selecting 4 diverse comments...

  [1] u/PickyEaterRecovered: "Olives. I used to gag just 
      smelling them. Now I'll eat a whole jar while watching 
      TV. No idea what changed."
      
  [2] u/GrownUpTastebuds: "Mushrooms. The texture was so 
      weird to me as a kid. Now I put them in everything."
      
  [3] u/AdultPalate_: "blue cheese. dad always had it and 
      i thought it smelled like feet. now i get it"
      
  [4] u/FoodieJourney2024: "Sushi! Raw fish seemed insane 
      to 8-year-old me. Now it's my favorite treat."

  [a] Accept all  [s] Swap a comment  [m] More options

Select: a

✓ 4 real comments selected

Step 3/5: GENERATING AI COMMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generating AI comment (medium difficulty)...

Using prompt template: medium.txt
Target characteristics:
  • Mix formal/casual language
  • Include 1-2 subtle AI tells
  • Match length of real comments

Generated 3 candidates:

  [1] "Spinach for me. I refused to touch it as a child, but 
       now I find it's a versatile ingredient that adds great 
       nutrition to smoothies and salads."
       
  [2] "Brussels sprouts - couldn't stand the smell growing up.
       Turns out my mom just boiled them to death. Roasted with
       garlic? Completely different experience."
       
  [3] "Tomatoes! The texture was off-putting when I was young.
       Now I appreciate their fresh, vibrant flavor in almost
       every dish I make."

Select AI comment (1-3) or [r]egenerate: 1

✓ AI comment selected

Step 4/5: IDENTIFY AI TELLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━

What makes this comment detectable as AI?
(Enter tells one per line, empty line to finish)

> "versatile ingredient" - food blogger speak
> "adds great nutrition" - health content phrasing  
> Structured: food → past feeling → current use → benefit
> No personal anecdote or humor
> 

✓ 4 AI tells recorded

Step 5/5: FINALIZE & SAVE
━━━━━━━━━━━━━━━━━━━━━━━━━

Generating fake username for AI comment...
  → "HealthyEaterNow" 

Assigning to date: 2026-02-15 (next available)

╔══════════════════════════════════════════════════════════════╗
║  PUZZLE PREVIEW                                              ║
╠══════════════════════════════════════════════════════════════╣
║  Date: 2026-02-15 (Day 52)                                  ║
║  Difficulty: Medium | Category: Food                         ║
║                                                              ║
║  Prompt: "What food did you hate as a kid but love now?"    ║
║                                                              ║
║  Comments:                                                   ║
║  1. [REAL] u/PickyEaterRecovered: "Olives. I used to..."   ║
║  2. [AI]   u/HealthyEaterNow: "Spinach for me. I..."       ║
║  3. [REAL] u/GrownUpTastebuds: "Mushrooms. The texture..." ║
║  4. [REAL] u/AdultPalate_: "blue cheese. dad always..."    ║
║  5. [REAL] u/FoodieJourney2024: "Sushi! Raw fish..."       ║
║                                                              ║
║  AI Position (after shuffle): Will be randomized            ║
╚══════════════════════════════════════════════════════════════╝

  [s] Save to pending  [e] Edit  [d] Discard

Select: s

✓ Saved to puzzles/pending/2026-02-15.json

Next steps:
  • Run 'npx puzzle-gen review' to approve
  • Run 'npx puzzle-gen upload' to push to Redis
```

#### 4.3.4 Batch Generation Mode

For efficient monthly content creation:

```bash
$ npx puzzle-gen batch --count 28 --start-date 2026-02-01

Batch Generation Mode
━━━━━━━━━━━━━━━━━━━━━

Generating 28 puzzles for 2026-02-01 through 2026-02-28

Difficulty distribution (based on day of week):
  • 4 Easy (Mondays)
  • 4 Easy-Medium (Tuesdays)  
  • 4 Medium (Wednesdays)
  • 4 Medium-Hard (Thursdays)
  • 4 Hard (Fridays)
  • 4 Expert (Saturdays)
  • 4 Wildcard (Sundays)

Category rotation: food → tech → life → entertainment → ...

[██████████░░░░░░░░░░] 12/28 complete

Current: 2026-02-13 (Medium, Gaming)
  ✓ Prompt selected
  ✓ Comments fetched
  ⟳ Generating AI comment...

Estimated time remaining: 45 minutes
```

### 4.4 Upload Mechanism: Getting Puzzles into Redis

Since Devvit Redis is only accessible from within the Devvit runtime, we have two upload options:

#### Option A: Admin UI in the App (Recommended)

Build a moderator-only interface within the Devvit app:

```typescript
// src/admin/PuzzleUploader.tsx

/**
 * This component is only visible to subreddit moderators.
 * It provides a form to paste puzzle JSON and upload to Redis.
 */

const PuzzleUploader = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  
  const handleUpload = async () => {
    try {
      setStatus('uploading');
      const puzzle = JSON.parse(jsonInput);
      
      // Validate puzzle structure
      validatePuzzle(puzzle);
      
      // Write to Redis
      await redis.set(`puzzle:${puzzle.id}`, JSON.stringify(puzzle));
      
      // Add to index
      await redis.lPush('puzzle:index', puzzle.id);
      
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };
  
  return (
    <div className="admin-uploader">
      <h2>Upload Puzzle</h2>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste puzzle JSON here..."
        rows={20}
      />
      <button onClick={handleUpload} disabled={status === 'uploading'}>
        {status === 'uploading' ? 'Uploading...' : 'Upload Puzzle'}
      </button>
      {status === 'success' && <p className="success">✓ Puzzle uploaded!</p>}
      {status === 'error' && <p className="error">✗ Upload failed</p>}
    </div>
  );
};
```

**Access Flow:**
1. Go to r/CommentConspiracy
2. Click "Mod Tools" menu item (only visible to mods)
3. Select "Upload Puzzle"
4. Paste JSON from your local `approved/` folder
5. Click Upload

#### Option B: HTTP Endpoint (More Automated)

Create a Devvit HTTP handler that accepts puzzle uploads:

```typescript
// src/api/uploadPuzzle.ts

import { Devvit } from '@devvit/public-api';

Devvit.addHTTPHandler({
  path: '/api/upload-puzzle',
  method: 'POST',
  handler: async (req, context) => {
    // Verify secret token
    const authToken = req.headers.get('X-Upload-Token');
    if (authToken !== context.settings.get('uploadSecret')) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    const puzzle = await req.json();
    
    // Validate and store
    await context.redis.set(`puzzle:${puzzle.id}`, JSON.stringify(puzzle));
    await context.redis.lPush('puzzle:index', puzzle.id);
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
```

**CLI uploads directly:**
```bash
$ npx puzzle-gen upload --date 2026-02-15

Uploading puzzle 2026-02-15...
POST https://developers.reddit.com/r/CommentConspiracy/api/upload-puzzle
✓ Puzzle uploaded successfully
✓ Moved to puzzles/uploaded/2026-02-15.json
```

**Recommendation:** Start with Option A (Admin UI) for simplicity. Add Option B later if you want full automation.

### 4.5 Content Calendar & Scheduling

#### 4.5.1 How the Scheduler Works

```typescript
// src/scheduler/dailyPuzzle.ts

import { Devvit } from '@devvit/public-api';

Devvit.addSchedulerJob({
  name: 'post-daily-puzzle',
  onRun: async (event, context) => {
    const today = new Date().toISOString().split('T')[0]; // "2026-02-15"
    
    // 1. Fetch today's puzzle from Redis
    const puzzleJson = await context.redis.get(`puzzle:${today}`);
    
    if (!puzzleJson) {
      // CRITICAL: No puzzle for today!
      await notifyModerators(context, `Missing puzzle for ${today}`);
      return;
    }
    
    const puzzle = JSON.parse(puzzleJson);
    
    // 2. Shuffle comment order (randomize AI position)
    const shuffledComments = shuffleComments(puzzle.comments);
    
    // 3. Create the Reddit post
    const post = await context.reddit.submitPost({
      subredditName: 'CommentConspiracy',
      title: `Day ${puzzle.dayNumber}: Can you spot the AI comment?`,
      // ... post configuration
    });
    
    // 4. Update current puzzle pointer
    await context.redis.set('puzzle:current', today);
    await context.redis.set(`puzzle:${today}:postId`, post.id);
    
    // 5. Initialize daily stats
    await context.redis.set(`stats:${today}`, JSON.stringify({
      totalPlayers: 0,
      correctCount: 0,
      guessDistribution: [0, 0, 0, 0, 0]
    }));
  }
});

// Schedule to run at midnight UTC daily
Devvit.addTrigger({
  event: 'AppInstall',
  onEvent: async (event, context) => {
    await context.scheduler.runJob({
      name: 'post-daily-puzzle',
      cron: '0 0 * * *' // Every day at 00:00 UTC
    });
  }
});
```

#### 4.5.2 Puzzle Inventory Monitoring

```typescript
// src/services/inventoryService.ts

interface InventoryStatus {
  puzzlesLoaded: number;
  nextEmptyDate: string | null;
  daysOfRunway: number;
  missingDates: string[];
}

async function getInventoryStatus(redis: RedisClient): Promise<InventoryStatus> {
  const today = new Date();
  const puzzleIds = await redis.lRange('puzzle:index', 0, -1);
  
  // Check next 30 days
  const missingDates: string[] = [];
  let daysOfRunway = 0;
  
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() + i);
    const dateStr = checkDate.toISOString().split('T')[0];
    
    if (puzzleIds.includes(dateStr)) {
      if (missingDates.length === 0) {
        daysOfRunway = i + 1;
      }
    } else {
      missingDates.push(dateStr);
    }
  }
  
  return {
    puzzlesLoaded: puzzleIds.length,
    nextEmptyDate: missingDates[0] || null,
    daysOfRunway,
    missingDates
  };
}
```

#### 4.5.3 Inventory Dashboard (Admin UI)

```
╔══════════════════════════════════════════════════════════════╗
║  PUZZLE INVENTORY STATUS                                     ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Total Puzzles Loaded: 45                                    ║
║  Days of Runway: 23 days                                     ║
║  Next Empty Date: 2026-02-24                                 ║
║                                                              ║
║  CALENDAR VIEW (February 2026)                               ║
║  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐               ║
║  │ Sun │ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │               ║
║  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤               ║
║  │     │     │  1  │  2  │  3  │  4  │  5  │               ║
║  │     │     │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │               ║
║  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤               ║
║  │  6  │  7  │  8  │  9  │ 10  │ 11  │ 12  │               ║
║  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │               ║
║  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤               ║
║  │ 13  │ 14  │ 15  │ 16  │ 17  │ 18  │ 19  │               ║
║  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │               ║
║  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤               ║
║  │ 20  │ 21  │ 22  │ 23  │ 24  │ 25  │ 26  │               ║
║  │  ✓  │  ✓  │  ✓  │  ✓  │  ✗  │  ✗  │  ✗  │               ║
║  └─────┴─────┴─────┴─────┴─────┴─────┴─────┘               ║
║                                                              ║
║  ✓ = Puzzle loaded   ✗ = Missing                            ║
║                                                              ║
║  ⚠️  WARNING: Only 23 days of content remaining!             ║
║      Recommended action: Generate puzzles for Feb 24-28      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### 4.6 Workflow Comparison: Daily vs Weekly vs Monthly

The key insight: **Generation frequency doesn't affect game operation—only your workload.**

```
WORKFLOW COMPARISON
━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────┐
│ DAILY GENERATION (Not Recommended)                          │
├─────────────────────────────────────────────────────────────┤
│ Schedule: Every day, create tomorrow's puzzle               │
│                                                             │
│ Monday:    Create Tuesday puzzle    (~10 min)               │
│ Tuesday:   Create Wednesday puzzle  (~10 min)               │
│ Wednesday: Create Thursday puzzle   (~10 min)               │
│ ...                                                         │
│                                                             │
│ Pros:                                                       │
│ • Always fresh, can react to current events                 │
│ • Minimal inventory management                              │
│                                                             │
│ Cons:                                                       │
│ • Daily commitment EVERY DAY                                │
│ • Miss one day = no puzzle tomorrow                         │
│ • Context switching kills productivity                      │
│ • High risk of burnout                                      │
│                                                             │
│ Total monthly time: ~5 hours (but spread across 30 days)    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ WEEKLY GENERATION (Good Balance)                            │
├─────────────────────────────────────────────────────────────┤
│ Schedule: Every Sunday, create next week's 7 puzzles        │
│                                                             │
│ Sunday:    Generate Mon-Sun puzzles  (~70 min)              │
│            Upload to Redis           (~10 min)              │
│            Done for the week!                               │
│                                                             │
│ Pros:                                                       │
│ • Concentrated effort, clear completion                     │
│ • Can skip a week if you have 2-week buffer                 │
│ • Good for maintaining quality consistency                  │
│                                                             │
│ Cons:                                                       │
│ • Still requires weekly attention                           │
│ • Can't react to very recent events                         │
│                                                             │
│ Total monthly time: ~5 hours (4 sessions of ~80 min)        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ MONTHLY GENERATION (Recommended)                            │
├─────────────────────────────────────────────────────────────┤
│ Schedule: First weekend of month, create entire month       │
│                                                             │
│ Saturday: Generate 15 puzzles        (~2.5 hours)           │
│ Sunday:   Generate 15 puzzles        (~2.5 hours)           │
│           Review & upload all        (~30 min)              │
│           Done for the month!                               │
│                                                             │
│ Pros:                                                       │
│ • Maximum efficiency (batching)                             │
│ • "Set and forget" for 30 days                              │
│ • Can plan vacation/breaks around it                        │
│ • Best for maintaining work-life balance                    │
│                                                             │
│ Cons:                                                       │
│ • Requires discipline to do the monthly session             │
│ • Can't reference very recent events                        │
│ • Need good content variety planning                        │
│                                                             │
│ Total monthly time: ~5-6 hours (one weekend)                │
└─────────────────────────────────────────────────────────────┘
```

**Recommendation: Monthly generation with 2-week buffer**

Always maintain at least 14 days of puzzle inventory. This gives you:
- Flexibility to skip a weekend if needed
- Buffer for unexpected issues
- Peace of mind

### 4.7 Puzzle Generation Process (Detailed)

Now with the CLI tool in mind, here's the refined process:

```
PUZZLE GENERATION WORKFLOW (WITH CLI TOOL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 1: PROMPT SELECTION (Automated + Human Choice)
│
├── CLI fetches trending prompts from:
│   • r/AskReddit (top posts, past month)
│   • r/NoStupidQuestions
│   • r/DoesAnybodyElse
│
├── Filters for:
│   • High engagement (500+ comments)
│   • Opinion-based (not factual)
│   • Broad appeal (not niche)
│
├── Human selects from candidates
│   (or enters custom prompt)
│
▼
PHASE 2: COMMENT SOURCING (Automated + Human Filter)
│
├── CLI searches Reddit API for prompt keywords
│
├── Auto-filters:
│   • Length: 50-200 characters
│   • Karma: Positive
│   • Standalone: No parent context needed
│   • Clean: No links, no offensive terms
│
├── Diversity algorithm selects 8-10 candidates
│   • Different writing styles
│   • Different perspectives
│   • Mix of formal/casual
│
├── Human selects final 4
│   (can request more options)
│
▼
PHASE 3: AI COMMENT GENERATION (Automated + Human Selection)
│
├── CLI calls Claude API with difficulty-tuned prompt
│
├── Generates 3 candidate AI comments
│
├── Each candidate has:
│   • Matched length to real comments
│   • Difficulty-appropriate tells
│   • Generated fake username
│
├── Human selects best fit
│   (or regenerates)
│
▼
PHASE 4: AI TELLS DOCUMENTATION (Human Input)
│
├── Human identifies what makes AI detectable:
│   • Phrasing patterns
│   • Structural tells
│   • Tone inconsistencies
│
├── CLI prompts for 3-5 tells
│
├── Optional: Human tells for real comments
│
▼
PHASE 5: VALIDATION & SAVE (Automated)
│
├── CLI validates:
│   • All required fields present
│   • No duplicate content
│   • Date not already taken
│   • Content passes safety check
│
├── Saves to puzzles/pending/{date}.json
│
├── Human reviews in pending folder
│
├── Move to puzzles/approved/ when ready
│
▼
PHASE 6: UPLOAD (Semi-Automated)
│
├── Human runs: npx puzzle-gen upload --all
│   OR uses Admin UI to paste JSON
│
├── CLI/UI validates and pushes to Redis
│
├── Moves files to puzzles/uploaded/
│
└── Puzzle now ready for scheduler to post
```

### 4.8 Required API Keys & Services

```
EXTERNAL SERVICES REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────┐
│ SERVICE          │ PURPOSE              │ COST             │
├─────────────────────────────────────────────────────────────┤
│ Reddit API       │ Fetch real comments  │ Free             │
│ Claude API       │ Generate AI comments │ ~$0.50/month*    │
│ Devvit Platform  │ Host the game        │ Free             │
└─────────────────────────────────────────────────────────────┘

* Estimated based on ~30 puzzles/month, 3 generations each
```

#### Reddit API Setup

```bash
# 1. Create a Reddit app at https://www.reddit.com/prefs/apps
# 2. Select "script" application type
# 3. Note your client_id and client_secret

# .env file for puzzle generator
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password
```

#### Claude API Setup

```bash
# 1. Get API key from https://console.anthropic.com
# 2. Add to .env

ANTHROPIC_API_KEY=sk-ant-...
```

### 4.9 Hackathon-Specific Timeline

For the Reddit Daily Games Hackathon (deadline: Feb 12, 2026):

```
HACKATHON CONTENT TIMELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━

Week 1 (Jan 15-21): DEVELOPMENT
├── Build core game
├── Build puzzle generator tool
├── Create 7 bootstrap puzzles (bundled in code)
└── No puzzle uploads needed yet

Week 2 (Jan 22-28): POLISH & CONTENT
├── Complete UI polish
├── Generate 14 more puzzles using tool
├── Upload puzzles to Redis
└── Test full daily cycle

Week 3 (Jan 29 - Feb 4): DEMO PREP
├── Generate puzzles through Feb 15
├── Run live demo on r/CommentConspiracy
├── Monitor and fix any issues
└── Document everything

Week 4 (Feb 5-12): SUBMISSION
├── Final testing
├── Create submission video/screenshots
├── Submit to Devpost
├── Ensure puzzles loaded through Feb 20
└── Deadline: Feb 12, 6:00 PM PST

MINIMUM VIABLE PUZZLE COUNT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Bundled in code: 7 (immediate demo)
• Uploaded to Redis: 14 (through judging period)
• Total needed: 21 puzzles
• Buffer recommended: 28 puzzles (through Feb 20)
```

### 4.10 Failure Modes & Recovery

What happens when things go wrong:

```
FAILURE MODE HANDLING
━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────┐
│ SCENARIO: Missing puzzle for today                          │
├─────────────────────────────────────────────────────────────┤
│ Detection: Scheduler runs, no puzzle found                  │
│ Impact: No new post created, users see "no puzzle today"    │
│ Recovery:                                                   │
│   1. Scheduler sends alert to mod queue                     │
│   2. Manual: Upload emergency puzzle via Admin UI           │
│   3. Manual: Trigger scheduler re-run                       │
│ Prevention: Always maintain 7+ day buffer                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SCENARIO: Duplicate puzzle uploaded                         │
├─────────────────────────────────────────────────────────────┤
│ Detection: Upload validator checks puzzle:index             │
│ Impact: Blocked at upload time                              │
│ Recovery: CLI/UI rejects with clear error message           │
│ Prevention: Validator checks date before write              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SCENARIO: Puzzle content is offensive/problematic           │
├─────────────────────────────────────────────────────────────┤
│ Detection: User reports, mod review                         │
│ Impact: Bad UX, potential rule violation                    │
│ Recovery:                                                   │
│   1. Delete the post (manual)                               │
│   2. Replace puzzle in Redis                                │
│   3. Optionally re-post corrected version                   │
│ Prevention: Human review of all puzzles before approval     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SCENARIO: Claude API down during batch generation           │
├─────────────────────────────────────────────────────────────┤
│ Detection: CLI tool errors on AI generation step            │
│ Impact: Can't generate new puzzles                          │
│ Recovery:                                                   │
│   1. Save partial progress (real comments)                  │
│   2. Retry later                                            │
│   3. Manual AI comment writing (fallback)                   │
│ Prevention: Generate with buffer, never last-minute         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SCENARIO: Reddit API rate limited during comment fetch      │
├─────────────────────────────────────────────────────────────┤
│ Detection: 429 responses from Reddit                        │
│ Impact: Can't fetch real comments                           │
│ Recovery:                                                   │
│   1. Wait and retry (exponential backoff built into CLI)    │
│   2. Use cached comments from previous sessions             │
│ Prevention: Batch generation respects rate limits           │
└─────────────────────────────────────────────────────────────┘
```

### 4.11 Monitoring & Alerts

Simple monitoring for a solo developer:

```typescript
// src/monitoring/healthCheck.ts

interface HealthStatus {
  puzzleRunway: number;        // Days of puzzles remaining
  todayPuzzleExists: boolean;  // Is today's puzzle loaded?
  lastPostSuccess: boolean;    // Did scheduler run successfully?
  lastPostTime: string;        // When was last post?
}

// Run daily after scheduler
async function checkHealth(context: Context): Promise<HealthStatus> {
  const today = new Date().toISOString().split('T')[0];
  
  const status: HealthStatus = {
    puzzleRunway: await calculateRunway(context.redis),
    todayPuzzleExists: await context.redis.exists(`puzzle:${today}`),
    lastPostSuccess: await context.redis.get('scheduler:lastSuccess') === 'true',
    lastPostTime: await context.redis.get('scheduler:lastRun') || 'never'
  };
  
  // Send alerts if issues detected
  if (status.puzzleRunway < 7) {
    await sendModMail(context, `⚠️ Low puzzle inventory: ${status.puzzleRunway} days remaining`);
  }
  
  if (!status.todayPuzzleExists) {
    await sendModMail(context, `🚨 CRITICAL: No puzzle for today (${today})`);
  }
  
  return status;
}
```

### 4.12 Content Operations Summary

```
OPERATIONAL RHYTHM (Post-Hackathon)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MONTHLY (First weekend of each month):
□ Generate 30 puzzles using batch mode
□ Review and approve all puzzles
□ Upload to Redis
□ Verify inventory shows 30+ days runway
□ Time: ~5 hours

WEEKLY (Optional check-in):
□ Check inventory dashboard
□ Review any user reports
□ Monitor engagement stats
□ Time: ~15 minutes

DAILY (Automated):
✓ Scheduler posts puzzle at midnight UTC
✓ Stats accumulate automatically
✓ No human intervention needed

INCIDENT RESPONSE (As needed):
□ Missing puzzle alert → Emergency upload
□ Content issue report → Review and replace
□ Bug report → Fix and deploy
```

---

### 4.13 Puzzle JSON Schema

```typescript
// types/puzzle.ts

interface Puzzle {
  id: string;                    // Unique identifier: "2026-01-20"
  dayNumber: number;             // Sequential day: 47
  difficulty: Difficulty;        // "easy" | "medium" | "hard" | "expert"
  dayOfWeek: DayOfWeek;         // "monday" | "tuesday" | etc.
  category: Category;            // "food" | "tech" | "life" | "entertainment"
  
  prompt: {
    text: string;                // The question/topic
    source?: string;             // Original subreddit (optional display)
  };
  
  comments: Comment[];           // Exactly 5 comments
  aiCommentIndex: number;        // 0-4, which is AI (before shuffle)
  
  explanation: {
    aiTells: string[];           // Why the AI comment is detectable
    humanTells?: string[];       // Why human comments seem human
    difficulty_note?: string;    // Why this difficulty rating
  };
  
  metadata: {
    createdAt: string;           // ISO date
    createdBy: string;           // Curator ID
    reviewed: boolean;           // Quality check passed
  };
}

interface Comment {
  id: string;                    // "comment_1"
  username: string;              // Fake Reddit username
  text: string;                  // Comment content
  isAI: boolean;                 // True for AI comment
  source?: {
    subreddit: string;           // Original source (real comments only)
    postId: string;              // For attribution
  };
}

type Difficulty = "easy" | "medium" | "hard" | "expert";
type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
type Category = "food" | "tech" | "life" | "entertainment" | "sports" | "gaming" | "finance" | "relationships";
```

### 4.3 Example Puzzle Data

```json
{
  "id": "2026-01-20",
  "dayNumber": 47,
  "difficulty": "medium",
  "dayOfWeek": "wednesday",
  "category": "food",
  
  "prompt": {
    "text": "What's the most underrated kitchen gadget everyone should own?",
    "source": "r/Cooking"
  },
  
  "comments": [
    {
      "id": "comment_1",
      "username": "HomeCookPro",
      "text": "Honestly? A bench scraper. Cost me $3 and I use it every single day. Cleanup is so much faster now.",
      "isAI": false,
      "source": {
        "subreddit": "Cooking",
        "postId": "abc123"
      }
    },
    {
      "id": "comment_2",
      "username": "KitchenMinimalist",
      "text": "A good instant-read thermometer changed my cooking game. No more guessing if meat is done.",
      "isAI": false,
      "source": {
        "subreddit": "Cooking",
        "postId": "def456"
      }
    },
    {
      "id": "comment_3",
      "username": "BudgetFoodie2024",
      "text": "Microplane zester! Fresh citrus zest and garlic in seconds. It's a game-changer for flavor.",
      "isAI": true
    },
    {
      "id": "comment_4",
      "username": "LazyChefLife",
      "text": "rice cooker lol. threw out my pot years ago never looked back perfect rice every time",
      "isAI": false,
      "source": {
        "subreddit": "Cooking",
        "postId": "ghi789"
      }
    },
    {
      "id": "comment_5",
      "username": "SousVideSally",
      "text": "Kitchen scale. Once you start weighing ingredients instead of measuring cups, baking becomes so much more consistent.",
      "isAI": false,
      "source": {
        "subreddit": "Baking",
        "postId": "jkl012"
      }
    }
  ],
  
  "aiCommentIndex": 2,
  
  "explanation": {
    "aiTells": [
      "\"Game-changer\" is an overused AI phrase",
      "Exclamation marks feel artificially enthusiastic",
      "Too structured: tool → use → benefit formula",
      "\"Fresh\" and \"seconds\" create false urgency"
    ],
    "humanTells": [
      "Comment #4 has authentic casual typing (no caps, missing punctuation)",
      "Comment #1 uses natural hedging (\"Honestly?\")",
      "Comment #5 has earned authority tone from experience"
    ],
    "difficulty_note": "Medium - AI tells are present but require attention to catch"
  },
  
  "metadata": {
    "createdAt": "2026-01-15T10:30:00Z",
    "createdBy": "curator_steve",
    "reviewed": true
  }
}
```

### 4.4 AI Comment Generation Prompts by Difficulty

```markdown
## EASY (Monday)
Generate a Reddit comment with OBVIOUS AI tells:
- Use formal language inappropriate for Reddit
- Include clichés: "game-changer", "I highly recommend", "absolutely"
- Structure: clear intro → body → conclusion
- No typos or casual language
- Over-explain simple concepts

## MEDIUM (Wednesday)
Generate a Reddit comment with SUBTLE AI tells:
- Mix formal and casual language
- Include 1-2 AI clichés but not excessively  
- Allow some personality but keep it generic
- Structure should be slightly formulaic
- Can include one intentional "typo"

## HARD (Friday)
Generate a Reddit comment that is DIFFICULT to detect:
- Match casual Reddit tone precisely
- Include specific details that sound experiential
- Add personality quirks and opinions
- Use Reddit-specific language ("imo", "tbh", "this")
- Avoid all common AI phrases

## EXPERT (Saturday)
Generate a Reddit comment that is NEARLY INDISTINGUISHABLE:
- Deep mimic of authentic Reddit voice
- Include subtle humor or sarcasm
- Reference specific but not famous things
- Natural tangents and incomplete thoughts
- Strategic grammar "mistakes"
```

### 4.5 Fake Username Generation

Usernames should feel authentically Reddit-like:

```typescript
// utils/usernameGenerator.ts

const prefixes = [
  "Lazy", "Budget", "Home", "Daily", "Real", "Actual", "Just", "The",
  "Anonymous", "Random", "Average", "Humble", "Chronic", "Serial"
];

const topics = [
  "Chef", "Cook", "Foodie", "Gamer", "Dev", "Dad", "Mom", "Student",
  "Worker", "Reader", "Writer", "Artist", "Nerd", "Fan", "Expert"
];

const suffixes = [
  "2024", "2025", "2026", "Pro", "Life", "Daily", "IRL", "Online",
  "_", "__", "Official", "Real", "Actual", "Here", "Guy", "Person"
];

// Generate: "LazyChefLife", "BudgetFoodie2024", "HomeCookPro"
```

---

## 5. Puzzle Generator Tool Specification

The Puzzle Generator is a **local CLI application** that runs on your development machine. It is a separate project from the Devvit app, designed to accelerate puzzle creation.

### 5.1 Tool Overview

```
PURPOSE: Reduce puzzle creation time from ~40 min to ~10 min per puzzle
TARGET USER: You (the developer/content creator)
RUNTIME: Node.js CLI on your local machine
DEPENDENCIES: Reddit API, Claude API
OUTPUT: JSON files ready for upload to Devvit Redis
```

### 5.2 Installation & Setup

```bash
# Clone or create the puzzle-generator project
mkdir puzzle-generator
cd puzzle-generator
npm init -y

# Install dependencies
npm install commander inquirer chalk ora axios @anthropic-ai/sdk snoowrap

# TypeScript setup
npm install -D typescript @types/node @types/inquirer ts-node
npx tsc --init

# Create environment file
cp .env.example .env
# Edit .env with your API keys
```

**.env.example:**
```bash
# Reddit API (from https://www.reddit.com/prefs/apps)
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USERNAME=your_username
REDDIT_PASSWORD=your_password
REDDIT_USER_AGENT=puzzle-generator:v1.0.0 (by /u/your_username)

# Claude API (from https://console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-...

# Devvit Upload (optional - for HTTP upload method)
DEVVIT_UPLOAD_URL=https://developers.reddit.com/r/CommentConspiracy/api/upload-puzzle
DEVVIT_UPLOAD_SECRET=your_secret_token
```

### 5.3 CLI Command Reference

```bash
# Main commands
npx puzzle-gen generate [options]    # Interactive puzzle creation
npx puzzle-gen batch [options]       # Batch generation mode
npx puzzle-gen review                # Review pending puzzles
npx puzzle-gen upload [options]      # Upload to Redis
npx puzzle-gen status                # Check inventory
npx puzzle-gen validate <file>       # Validate puzzle JSON

# Generate options
--difficulty, -d    Difficulty level (easy|medium|hard|expert)
--category, -c      Content category (food|tech|life|entertainment|...)
--date              Target date (YYYY-MM-DD), defaults to next available
--prompt, -p        Skip prompt selection, use this prompt directly

# Batch options
--count, -n         Number of puzzles to generate
--start-date        First puzzle date (YYYY-MM-DD)
--dry-run           Preview without saving

# Upload options
--all               Upload all approved puzzles
--date              Upload specific date
--force             Overwrite existing puzzle

# Examples
npx puzzle-gen generate -d medium -c food
npx puzzle-gen batch -n 7 --start-date 2026-02-01
npx puzzle-gen upload --all
npx puzzle-gen status
```

### 5.4 Core Services Implementation

#### 5.4.1 Reddit Service

```typescript
// src/services/redditService.ts

import Snoowrap from 'snoowrap';

interface CommentCandidate {
  id: string;
  author: string;
  body: string;
  score: number;
  subreddit: string;
  permalink: string;
}

interface FetchOptions {
  query: string;
  subreddits?: string[];
  minScore?: number;
  minLength?: number;
  maxLength?: number;
  limit?: number;
}

class RedditService {
  private reddit: Snoowrap;
  
  constructor() {
    this.reddit = new Snoowrap({
      userAgent: process.env.REDDIT_USER_AGENT!,
      clientId: process.env.REDDIT_CLIENT_ID!,
      clientSecret: process.env.REDDIT_CLIENT_SECRET!,
      username: process.env.REDDIT_USERNAME!,
      password: process.env.REDDIT_PASSWORD!,
    });
  }
  
  /**
   * Fetch comment candidates matching criteria
   */
  async fetchComments(options: FetchOptions): Promise<CommentCandidate[]> {
    const {
      query,
      subreddits = ['AskReddit', 'NoStupidQuestions', 'DoesAnybodyElse'],
      minScore = 5,
      minLength = 50,
      maxLength = 200,
      limit = 100
    } = options;
    
    const candidates: CommentCandidate[] = [];
    
    for (const subreddit of subreddits) {
      try {
        // Search for posts matching the query
        const posts = await this.reddit
          .getSubreddit(subreddit)
          .search({ query, time: 'year', sort: 'relevance', limit: 10 });
        
        for (const post of posts) {
          // Get comments from each post
          const comments = await post.comments.fetchAll();
          
          for (const comment of comments) {
            // Filter criteria
            if (comment.score < minScore) continue;
            if (comment.body.length < minLength) continue;
            if (comment.body.length > maxLength) continue;
            if (comment.body.includes('http')) continue; // No links
            if (comment.body.includes('[deleted]')) continue;
            if (comment.body.includes('[removed]')) continue;
            
            candidates.push({
              id: comment.id,
              author: comment.author.name,
              body: comment.body,
              score: comment.score,
              subreddit: subreddit,
              permalink: comment.permalink
            });
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch from r/${subreddit}:`, err);
      }
    }
    
    return candidates.slice(0, limit);
  }
  
  /**
   * Fetch trending prompts from AskReddit
   */
  async fetchTrendingPrompts(category?: string): Promise<string[]> {
    const posts = await this.reddit
      .getSubreddit('AskReddit')
      .getTop({ time: 'month', limit: 50 });
    
    return posts
      .map(p => p.title)
      .filter(title => {
        // Filter for opinion-based questions
        const isQuestion = title.includes('?');
        const isOpinionBased = /what|how|why|best|worst|favorite|opinion/i.test(title);
        return isQuestion && isOpinionBased;
      })
      .slice(0, 10);
  }
}

export const redditService = new RedditService();
```

#### 5.4.2 Claude Service

```typescript
// src/services/claudeService.ts

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { join } from 'path';

interface GenerateOptions {
  prompt: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  realComments: string[];
  count?: number;
}

interface AIComment {
  text: string;
  username: string;
}

class ClaudeService {
  private client: Anthropic;
  private prompts: Map<string, string>;
  
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });
    
    // Load difficulty-specific prompts
    this.prompts = new Map();
    for (const difficulty of ['easy', 'medium', 'hard', 'expert']) {
      const promptPath = join(__dirname, '..', 'prompts', `${difficulty}.txt`);
      this.prompts.set(difficulty, readFileSync(promptPath, 'utf-8'));
    }
  }
  
  /**
   * Generate AI comment candidates
   */
  async generateAIComments(options: GenerateOptions): Promise<AIComment[]> {
    const { prompt, difficulty, realComments, count = 3 } = options;
    
    const systemPrompt = this.prompts.get(difficulty)!;
    
    const userPrompt = `
You are generating a Reddit comment for a game where players try to identify AI-written comments.

ORIGINAL PROMPT: "${prompt}"

REAL HUMAN COMMENTS (for reference on length and tone):
${realComments.map((c, i) => `${i + 1}. "${c}"`).join('\n')}

Generate ${count} different AI comment candidates. Each should:
- Match the approximate length of the real comments (50-200 chars)
- Follow the difficulty guidelines in your instructions
- Be detectable to a careful reader, but not obviously fake

For each comment, also generate a plausible Reddit-style username.

Respond in this JSON format:
{
  "comments": [
    { "text": "comment text here", "username": "UsernameHere" },
    ...
  ]
}
`;

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    });
    
    // Parse JSON response
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }
    
    const parsed = JSON.parse(content.text);
    return parsed.comments;
  }
  
  /**
   * Generate AI tells explanation
   */
  async analyzeAITells(aiComment: string, realComments: string[]): Promise<string[]> {
    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      messages: [{
        role: 'user',
        content: `
Analyze this AI-generated comment and identify 3-5 "tells" that make it detectable:

AI COMMENT: "${aiComment}"

REAL HUMAN COMMENTS (for comparison):
${realComments.map((c, i) => `${i + 1}. "${c}"`).join('\n')}

List specific patterns that distinguish the AI comment from the human ones.
Focus on: phrasing, structure, tone, word choice, authenticity markers.

Respond as a JSON array of strings:
["tell 1", "tell 2", "tell 3"]
`
      }]
    });
    
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }
    
    return JSON.parse(content.text);
  }
}

export const claudeService = new ClaudeService();
```

#### 5.4.3 File Service

```typescript
// src/services/fileService.ts

import { readFileSync, writeFileSync, readdirSync, renameSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { Puzzle } from '../types';

const PUZZLES_DIR = join(__dirname, '..', '..', 'puzzles');
const PENDING_DIR = join(PUZZLES_DIR, 'pending');
const APPROVED_DIR = join(PUZZLES_DIR, 'approved');
const UPLOADED_DIR = join(PUZZLES_DIR, 'uploaded');

class FileService {
  constructor() {
    // Ensure directories exist
    [PENDING_DIR, APPROVED_DIR, UPLOADED_DIR].forEach(dir => {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    });
  }
  
  /**
   * Save puzzle to pending folder
   */
  saveToPending(puzzle: Puzzle): string {
    const filename = `${puzzle.id}.json`;
    const filepath = join(PENDING_DIR, filename);
    writeFileSync(filepath, JSON.stringify(puzzle, null, 2));
    return filepath;
  }
  
  /**
   * Move puzzle from pending to approved
   */
  approvePuzzle(puzzleId: string): void {
    const srcPath = join(PENDING_DIR, `${puzzleId}.json`);
    const destPath = join(APPROVED_DIR, `${puzzleId}.json`);
    renameSync(srcPath, destPath);
  }
  
  /**
   * Move puzzle from approved to uploaded
   */
  markAsUploaded(puzzleId: string): void {
    const srcPath = join(APPROVED_DIR, `${puzzleId}.json`);
    const destPath = join(UPLOADED_DIR, `${puzzleId}.json`);
    renameSync(srcPath, destPath);
  }
  
  /**
   * Get all pending puzzles
   */
  getPendingPuzzles(): Puzzle[] {
    return this.loadFromDirectory(PENDING_DIR);
  }
  
  /**
   * Get all approved puzzles
   */
  getApprovedPuzzles(): Puzzle[] {
    return this.loadFromDirectory(APPROVED_DIR);
  }
  
  /**
   * Get next available date
   */
  getNextAvailableDate(): string {
    const allPuzzles = [
      ...this.getPendingPuzzles(),
      ...this.getApprovedPuzzles(),
      ...this.loadFromDirectory(UPLOADED_DIR)
    ];
    
    const usedDates = new Set(allPuzzles.map(p => p.id));
    
    const date = new Date();
    while (usedDates.has(date.toISOString().split('T')[0])) {
      date.setDate(date.getDate() + 1);
    }
    
    return date.toISOString().split('T')[0];
  }
  
  private loadFromDirectory(dir: string): Puzzle[] {
    const files = readdirSync(dir).filter(f => f.endsWith('.json'));
    return files.map(f => {
      const content = readFileSync(join(dir, f), 'utf-8');
      return JSON.parse(content);
    });
  }
}

export const fileService = new FileService();
```

### 5.5 Difficulty Prompt Templates

#### easy.txt
```
You are generating a Reddit comment that should be EASILY DETECTABLE as AI-written.

Include these obvious tells:
- Use formal language inappropriate for Reddit (e.g., "I would highly recommend")
- Include AI clichés: "game-changer", "absolutely", "definitely", "incredibly"
- Use perfect grammar and punctuation throughout
- Structure your response formulaically: statement → explanation → conclusion
- Avoid any personality, humor, or self-deprecation
- Sound like a helpful assistant rather than a real person
- Over-explain simple concepts
- Use corporate or marketing-speak

The goal is for most players to correctly identify this as AI on their first day.
```

#### medium.txt
```
You are generating a Reddit comment that requires ATTENTION TO DETAIL to detect as AI-written.

Include these subtle tells:
- Mix casual and formal language (but lean slightly formal)
- Include 1-2 AI phrases, but not excessively
- Allow some personality, but keep it generic
- Structure should be slightly too organized
- You can include ONE intentional typo or casual element
- Avoid extreme opinions or strong emotional language
- Be helpful but not overly comprehensive

The goal is for observant players to catch this with careful reading.
```

#### hard.txt
```
You are generating a Reddit comment that is DIFFICULT to detect as AI-written.

Mimic authentic Reddit voice:
- Use casual language consistently
- Include specific (but not famous) details that sound experiential
- Add personality quirks and opinions
- Use Reddit-specific language ("imo", "tbh", "this", "ngl")
- Include natural tangents or incomplete thoughts
- Express mild frustration, excitement, or other authentic emotions
- Avoid all common AI phrases and structures

The tells should be very subtle:
- Slight tonal inconsistency
- A detail that's plausible but generic
- Missing the "earned" feeling of real experience

The goal is for only experienced players to catch this.
```

#### expert.txt
```
You are generating a Reddit comment that is NEARLY INDISTINGUISHABLE from a human comment.

Deep authenticity requirements:
- Perfect casual Reddit voice
- Include subtle humor or sarcasm that lands naturally
- Reference specific but not famous things
- Include natural imperfections (but not forced ones)
- Express a genuine-feeling opinion with appropriate confidence
- Allow for slight contradictions or nuance humans naturally have

The only tells should be almost philosophical:
- A slight emotional distance despite emotive content
- Suspiciously relevant examples
- Pattern breaks that only experts would notice

The goal is to challenge even veteran players. ~40% should guess wrong.
```

### 5.6 Diversity Selection Algorithm

```typescript
// src/utils/diversitySelector.ts

interface CommentCandidate {
  id: string;
  body: string;
  author: string;
  score: number;
}

interface DiversityFactors {
  length: 'short' | 'medium' | 'long';
  tone: 'casual' | 'neutral' | 'formal';
  structure: 'simple' | 'compound' | 'complex';
  sentiment: 'positive' | 'neutral' | 'negative';
}

/**
 * Select diverse comments that vary in style and perspective
 */
export function selectDiverseComments(
  candidates: CommentCandidate[],
  count: number = 4
): CommentCandidate[] {
  // Analyze each candidate
  const analyzed = candidates.map(c => ({
    ...c,
    factors: analyzeComment(c.body)
  }));
  
  // Greedy selection for maximum diversity
  const selected: typeof analyzed = [];
  
  while (selected.length < count && analyzed.length > 0) {
    let bestIndex = 0;
    let bestScore = -1;
    
    for (let i = 0; i < analyzed.length; i++) {
      const diversityScore = calculateDiversityScore(analyzed[i], selected);
      if (diversityScore > bestScore) {
        bestScore = diversityScore;
        bestIndex = i;
      }
    }
    
    selected.push(analyzed[bestIndex]);
    analyzed.splice(bestIndex, 1);
  }
  
  return selected;
}

function analyzeComment(text: string): DiversityFactors {
  return {
    length: text.length < 80 ? 'short' : text.length < 150 ? 'medium' : 'long',
    tone: detectTone(text),
    structure: detectStructure(text),
    sentiment: detectSentiment(text)
  };
}

function detectTone(text: string): 'casual' | 'neutral' | 'formal' {
  const casualMarkers = /lol|lmao|tbh|imo|ngl|idk|gonna|wanna|kinda|y'all/i;
  const formalMarkers = /however|therefore|additionally|furthermore|regarding/i;
  
  if (casualMarkers.test(text)) return 'casual';
  if (formalMarkers.test(text)) return 'formal';
  return 'neutral';
}

function detectStructure(text: string): 'simple' | 'compound' | 'complex' {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  if (sentences.length === 1) return 'simple';
  if (sentences.length <= 2) return 'compound';
  return 'complex';
}

function detectSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const positive = /love|great|amazing|awesome|best|favorite|fantastic/i;
  const negative = /hate|worst|terrible|awful|annoying|stupid|ridiculous/i;
  
  const posCount = (text.match(positive) || []).length;
  const negCount = (text.match(negative) || []).length;
  
  if (posCount > negCount) return 'positive';
  if (negCount > posCount) return 'negative';
  return 'neutral';
}

function calculateDiversityScore(
  candidate: { factors: DiversityFactors },
  selected: { factors: DiversityFactors }[]
): number {
  if (selected.length === 0) return 1;
  
  let score = 0;
  for (const existing of selected) {
    // Add points for each different factor
    if (candidate.factors.length !== existing.factors.length) score += 1;
    if (candidate.factors.tone !== existing.factors.tone) score += 1;
    if (candidate.factors.structure !== existing.factors.structure) score += 1;
    if (candidate.factors.sentiment !== existing.factors.sentiment) score += 1;
  }
  
  return score / selected.length;
}
```

### 5.7 Puzzle Validation

```typescript
// src/utils/validators.ts

import { Puzzle, Comment } from '../types';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validatePuzzle(puzzle: Puzzle): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Required fields
  if (!puzzle.id) errors.push('Missing puzzle ID');
  if (!puzzle.dayNumber) errors.push('Missing day number');
  if (!puzzle.difficulty) errors.push('Missing difficulty');
  if (!puzzle.prompt?.text) errors.push('Missing prompt text');
  
  // Comments validation
  if (!puzzle.comments || puzzle.comments.length !== 5) {
    errors.push('Must have exactly 5 comments');
  } else {
    // Validate each comment
    puzzle.comments.forEach((comment, i) => {
      if (!comment.text || comment.text.length < 20) {
        errors.push(`Comment ${i + 1} is too short`);
      }
      if (comment.text.length > 300) {
        warnings.push(`Comment ${i + 1} is longer than recommended`);
      }
      if (!comment.username) {
        errors.push(`Comment ${i + 1} missing username`);
      }
    });
    
    // Verify exactly one AI comment
    const aiCount = puzzle.comments.filter(c => c.isAI).length;
    if (aiCount !== 1) {
      errors.push(`Must have exactly 1 AI comment (found ${aiCount})`);
    }
  }
  
  // AI tells validation
  if (!puzzle.explanation?.aiTells || puzzle.explanation.aiTells.length < 2) {
    warnings.push('Should have at least 2 AI tells documented');
  }
  
  // Date format validation
  if (puzzle.id && !/^\d{4}-\d{2}-\d{2}$/.test(puzzle.id)) {
    errors.push('Puzzle ID must be in YYYY-MM-DD format');
  }
  
  // Content safety (basic check)
  const allText = puzzle.comments.map(c => c.text).join(' ').toLowerCase();
  const flaggedTerms = ['kill', 'hate', 'slur']; // Expand as needed
  for (const term of flaggedTerms) {
    if (allText.includes(term)) {
      warnings.push(`Content contains potentially sensitive term: "${term}"`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
```

### 5.8 Tool Development Priority

For the hackathon, build the tool in this order:

```
PHASE 1: Minimum Viable Tool (4-6 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ generate command (interactive mode)
✓ Reddit comment fetching
✓ Claude AI generation
✓ File save to pending/
✓ Basic validation

PHASE 2: Efficiency Features (2-3 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ batch command
✓ review command (approve/reject)
✓ status command (inventory check)

PHASE 3: Upload Integration (2-3 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ upload command (push to Redis)
✓ Either: Admin UI in Devvit app
✓ Or: HTTP endpoint integration

TOTAL TOOL DEVELOPMENT: 8-12 hours
```

---

## 6. Scoring & Progression System

```typescript
interface UserProgress {
  oddileduserId: string;              // Reddit user ID
  
  // Streak tracking
  currentStreak: number;       // Consecutive correct days
  longestStreak: number;       // All-time best streak
  lastPlayedDate: string;      // ISO date
  lastResult: "correct" | "incorrect" | null;
  
  // Statistics
  totalPlayed: number;         // Total puzzles attempted
  totalCorrect: number;        // Total correct guesses
  accuracyRate: number;        // Percentage (0-100)
  
  // Difficulty breakdown
  easyCorrect: number;
  easyPlayed: number;
  mediumCorrect: number;
  mediumPlayed: number;
  hardCorrect: number;
  hardPlayed: number;
  expertCorrect: number;
  expertPlayed: number;
  
  // Achievements
  achievements: Achievement[];
  
  // History (last 30 days)
  recentHistory: DayResult[];
}

interface DayResult {
  puzzleId: string;
  date: string;
  guessedIndex: number;
  correctIndex: number;
  wasCorrect: boolean;
  difficulty: Difficulty;
  timeToGuess: number;         // Seconds from open to guess
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  earnedAt: string;
  icon: string;
}
```

### 5.2 Achievement System

| Achievement | Criteria | Icon |
|-------------|----------|------|
| First Blood | Complete first puzzle | 🎯 |
| Sharp Eye | 3-day streak | 👁️ |
| Pattern Recognition | 7-day streak | 🧠 |
| Human Detector | 14-day streak | 🤖 |
| Turing Champion | 30-day streak | 🏆 |
| Expert Hunter | Get 5 expert puzzles correct | 💎 |
| Speed Demon | Guess correctly in <10 seconds | ⚡ |
| Perfectionist | 100% accuracy (min 10 games) | ✨ |
| Veteran | Play 50 puzzles | 🎖️ |
| Centurion | Play 100 puzzles | 💯 |

### 5.3 Streak Rules

```typescript
function updateStreak(userProgress: UserProgress, wasCorrect: boolean, puzzleDate: string): UserProgress {
  const lastPlayed = new Date(userProgress.lastPlayedDate);
  const today = new Date(puzzleDate);
  const daysDiff = Math.floor((today.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60 * 24));
  
  let newStreak = userProgress.currentStreak;
  
  if (wasCorrect) {
    if (daysDiff === 1) {
      // Consecutive day - extend streak
      newStreak = userProgress.currentStreak + 1;
    } else if (daysDiff === 0) {
      // Same day - shouldn't happen, but keep streak
      newStreak = userProgress.currentStreak;
    } else {
      // Missed day(s) - start new streak
      newStreak = 1;
    }
  } else {
    // Wrong answer - reset streak
    newStreak = 0;
  }
  
  return {
    ...userProgress,
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, userProgress.longestStreak),
    lastPlayedDate: puzzleDate,
    lastResult: wasCorrect ? "correct" : "incorrect"
  };
}
```

---

## 7. Social & Community Features

### 6.1 Comment Section Integration

The Reddit post comments become integral to the game experience:

**Pre-Reveal Comments (Spoiler-Free):**
- "Day 47, let's gooo! 🔥"
- "I think I know which one..."
- "This one's tough!"
- "7-day streak on the line 😬"

**Post-Reveal Comments (After Playing):**
- "✅ Day 47 - Knew it was #3 immediately"
- "❌ Fell for #4, the lowercase threw me off"
- "The 'game-changer' gave it away"
- "How did 33% pick #1?? That was obviously human"

### 6.2 Spoiler Prevention System

```typescript
// Results are hidden until user has submitted their guess

interface PostState {
  puzzleId: string;
  postedAt: string;
  revealedAt: string;          // When answer becomes globally visible
  spoilerMode: "active" | "revealed";
}

// In ResultScreen.tsx
const ResultScreen = ({ userHasPlayed, stats }) => {
  if (!userHasPlayed) {
    return (
      <div className="spoiler-warning">
        <p>🔒 Play today's puzzle to see results!</p>
        <button>Start Puzzle</button>
      </div>
    );
  }
  
  // Show full results only after user has played
  return <FullResults stats={stats} />;
};
```

### 6.3 Share Card System

Non-spoiler shareable result:

```
┌─────────────────────────────┐
│  🔍 Comment Conspiracy      │
│     Day 47                  │
│                             │
│     ✅ 1/1                   │
│     🔥 5-day streak         │
│                             │
│  r/CommentConspiracy        │
└─────────────────────────────┘
```

```typescript
function generateShareText(result: DayResult, streak: number): string {
  const emoji = result.wasCorrect ? "✅" : "❌";
  const streakEmoji = streak >= 3 ? "🔥" : "";
  
  return `🔍 Comment Conspiracy Day ${result.dayNumber}

${emoji} ${result.wasCorrect ? "1/1" : "0/1"}
${streakEmoji}${streak > 0 ? ` ${streak}-day streak` : ""}

Play at r/CommentConspiracy`;
}
```

### 6.4 Daily Stats Display

After everyone has played, show community statistics:

```typescript
interface DailyStats {
  puzzleId: string;
  totalPlayers: number;
  correctPercentage: number;
  
  // Distribution of guesses
  guessDistribution: {
    [commentIndex: number]: number;  // e.g., { 0: 8, 1: 15, 2: 41, 3: 28, 4: 8 }
  };
  
  // Time stats
  averageGuessTime: number;          // Seconds
  fastestCorrectGuess: number;       // Seconds
  
  // Streak stats
  activeStreaks: {
    [streakLength: number]: number;  // e.g., { 1: 450, 2: 230, 3: 120, 7: 45 }
  };
}
```

### 6.5 User-Generated Content System (for $3K prize)

Allow players to submit puzzle suggestions:

```typescript
interface PuzzleSubmission {
  submittedBy: string;           // Reddit username
  submittedAt: string;
  
  promptSuggestion: string;      // The question/topic
  category: Category;
  
  // Optional: user can suggest real comments they found
  suggestedComments?: {
    text: string;
    sourceUrl: string;           // Reddit permalink
  }[];
  
  status: "pending" | "approved" | "rejected" | "used";
  usedOnDate?: string;           // If approved and scheduled
}
```

**Submission Flow:**
1. User clicks "Submit a Puzzle Idea" in menu
2. Form appears: prompt + category + optional comment URLs
3. Submission reviewed by curator
4. If approved, user credited in that day's puzzle
5. Submitter gets special flair: "🧩 Puzzle Creator"

---

## 8. Mobile UX Specification

### 7.1 Responsive Breakpoints

```css
/* Mobile-first design */
:root {
  --mobile-width: 100%;
  --tablet-width: 540px;
  --desktop-width: 640px;
}

/* Base: Mobile (< 640px) */
.game-container {
  width: 100%;
  padding: 12px;
}

/* Tablet (640px - 1024px) */
@media (min-width: 640px) {
  .game-container {
    max-width: 540px;
    margin: 0 auto;
    padding: 16px;
  }
}

/* Desktop (> 1024px) */
@media (min-width: 1024px) {
  .game-container {
    max-width: 640px;
    padding: 24px;
  }
}
```

### 7.2 Touch Target Specifications

All interactive elements must meet accessibility standards:

```typescript
// Minimum touch targets
const TOUCH_TARGETS = {
  button: {
    minHeight: 44,        // Apple HIG minimum
    minWidth: 44,
    padding: 12,
  },
  commentCard: {
    minHeight: 60,        // Comfortable tap area
    padding: 16,
    marginBottom: 12,
  },
  closeButton: {
    size: 44,
    hitSlop: 8,           // Extended touch area
  }
};
```

### 7.3 Mobile Interaction Patterns

```typescript
// CommentCard.tsx - Mobile-optimized interactions

const CommentCard = ({ comment, onSelect, isSelected }) => {
  const [touchStart, setTouchStart] = useState<number>(0);
  
  const handleTouchStart = () => {
    setTouchStart(Date.now());
  };
  
  const handleTouchEnd = () => {
    const touchDuration = Date.now() - touchStart;
    
    // Distinguish tap from scroll
    if (touchDuration < 200) {
      onSelect(comment.id);
    }
  };
  
  return (
    <div
      className={`
        comment-card
        ${isSelected ? 'selected' : ''}
        min-h-[60px]
        p-4
        rounded-lg
        border-2
        transition-all
        duration-150
        active:scale-[0.98]
        touch-manipulation
      `}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => onSelect(comment.id)}
    >
      <div className="username text-sm font-medium text-gray-500">
        u/{comment.username}
      </div>
      <div className="text text-base leading-relaxed">
        {comment.text}
      </div>
    </div>
  );
};
```

### 7.4 Mobile-Specific Features

| Feature | Implementation |
|---------|---------------|
| Pull-to-refresh | Native Devvit behavior |
| Haptic feedback | On guess confirmation (if available) |
| Swipe gestures | None required (tap-only) |
| Keyboard | Not needed (no text input) |
| Orientation | Portrait locked |
| Safe areas | Respect notch/home indicator |

### 7.5 Mobile Performance Targets

```typescript
const PERFORMANCE_TARGETS = {
  firstContentfulPaint: 1000,    // < 1 second
  timeToInteractive: 1500,       // < 1.5 seconds
  animationFrameRate: 60,        // Smooth animations
  touchResponseDelay: 100,       // < 100ms feedback
};

// Optimization strategies
const OPTIMIZATIONS = {
  lazyLoad: false,               // Full content needed immediately
  imageOptimization: 'N/A',      // No images
  codesSplitting: false,         // Small bundle
  prefetch: true,                // Prefetch tomorrow's puzzle
};
```

---

## 9. Judging Criteria Alignment

### 8.1 Delightful UX (Criterion #1)

**Requirement:** "Experiences should be built with exciting layouts and themes. It should be easy and fun to uncover what the app has to offer."

**How Comment Conspiracy Delivers:**

| Element | Implementation |
|---------|---------------|
| Visual Theme | Clean, mysterious aesthetic with subtle "detective" motifs |
| Onboarding | Single-screen explanation, no tutorial needed |
| Feedback | Immediate visual/motion feedback on every interaction |
| Delight Moments | Confetti on correct, streak fire emoji, achievement unlocks |
| Discoverability | All features visible without hunting |

**Specific UX Delighters:**
1. Comment cards have subtle hover/tap states
2. Correct answer triggers satisfying animation
3. Streak counter has flame animation at 3+ days
4. Share card is beautiful and non-spoilery
5. Stats reveal creates "aha" discussion moments

### 8.2 Polish (Criterion #2)

**Requirement:** "Your submission should be as close to publishable as possible and compliant with Devvit Rules."

**How Comment Conspiracy Delivers:**

| Aspect | Status |
|--------|--------|
| Error Handling | Graceful fallbacks for all failure states |
| Loading States | Skeleton screens, no blank moments |
| Edge Cases | Handles timezone, network issues, replays |
| Accessibility | WCAG 2.1 AA compliant, screen reader support |
| Performance | <1s load time, 60fps animations |
| Devvit Compliance | Follows all platform rules, no external dependencies |

**Polish Checklist:**
- [ ] No console errors
- [ ] No layout shifts
- [ ] All text readable at all sizes
- [ ] Works offline (shows cached state)
- [ ] Handles rapid taps without double-submit
- [ ] Graceful degradation on slow networks

### 8.3 Reddit-y (Criterion #3)

**Requirement:** "Reddit is all about community and embracing topics people care about. The best apps will bring a community together."

**How Comment Conspiracy Delivers:**

| Reddit Element | Implementation |
|----------------|---------------|
| Discussion Driver | Every puzzle generates debate in comments |
| Community Identity | Shared daily experience, insider knowledge |
| Reddit Culture | Fake usernames feel authentic, prompts from real subreddits |
| Voting Integration | Results stats show community consensus |
| Subreddit Fit | Works in feed, native Reddit look |

**Discussion Drivers:**
1. "Which one did you pick?" - natural comment starter
2. "I can't believe X% picked #2!" - stat-based discussion
3. "The AI tells were so obvious/subtle today" - analysis
4. "Streak check! Who's still going?" - community bonding
5. Debate over whether difficulty was fair

### 8.4 Recurring Content (Criterion #4)

**Requirement:** "Does your app create recurring content, challenges, and intrigue?"

**How Comment Conspiracy Delivers:**

| Daily Element | Implementation |
|---------------|---------------|
| Fresh Puzzle | New 5-comment puzzle every day |
| Varied Difficulty | Monday easy → Friday hard cycle |
| Themed Days | Sunday wildcards, special events |
| Streak System | Creates FOMO for missing a day |
| Progressive Challenge | Players improve over time |

**Content Freshness Strategy:**
1. **30-day runway:** Always have 30 puzzles pre-curated
2. **Category rotation:** Tech → Food → Life → Entertainment cycle
3. **Difficulty curve:** Predictable weekly pattern creates anticipation
4. **Special events:** Holidays, Reddit anniversaries, themed weeks

### 8.5 Scoring Matrix

```
JUDGING CRITERIA SCORECARD
━━━━━━━━━━━━━━━━━━━━━━━━━━

Delightful UX         ████████░░  8/10
└─ Clean, intuitive, delightful animations

Polish                █████████░  9/10
└─ Near launch-ready, comprehensive error handling

Reddit-y              ██████████  10/10
└─ Peak discussion potential, authentic Reddit feel

Recurring Content     ██████████  10/10
└─ Perfect daily mechanic with difficulty progression

TOTAL PROJECTED:      37/40
━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 10. Data Models

### 9.1 Redis Key Structure

```typescript
// Redis key naming conventions
const REDIS_KEYS = {
  // Puzzles
  puzzle: (id: string) => `puzzle:${id}`,                    // puzzle:2026-01-20
  puzzleIndex: () => `puzzle:index`,                          // List of all puzzle IDs
  currentPuzzle: () => `puzzle:current`,                      // Today's puzzle ID
  
  // User data
  userProgress: (userId: string) => `user:${userId}:progress`,
  userHistory: (userId: string) => `user:${userId}:history`,
  userAchievements: (userId: string) => `user:${userId}:achievements`,
  
  // Daily stats
  dailyStats: (puzzleId: string) => `stats:${puzzleId}`,
  dailyGuesses: (puzzleId: string) => `guesses:${puzzleId}`, // Hash: commentIndex → count
  
  // Leaderboards
  streakLeaderboard: () => `leaderboard:streaks`,             // Sorted set
  accuracyLeaderboard: () => `leaderboard:accuracy`,          // Sorted set
  
  // Submissions
  puzzleSubmissions: () => `submissions:pending`,             // List of pending submissions
  submissionById: (id: string) => `submission:${id}`,
};
```

### 9.2 Redis Data Structures

```typescript
// Puzzle storage (JSON string in Redis)
interface StoredPuzzle {
  id: string;
  dayNumber: number;
  difficulty: Difficulty;
  prompt: string;
  comments: StoredComment[];
  aiIndex: number;                    // Shuffled position
  explanation: string[];
  postedAt: string;
}

interface StoredComment {
  id: string;
  username: string;
  text: string;
  originalIndex: number;              // Pre-shuffle index
}

// User progress (JSON string in Redis)
interface StoredUserProgress {
  oddileduserId: string;
  currentStreak: number;
  longestStreak: number;
  lastPlayed: string;
  totalPlayed: number;
  totalCorrect: number;
  byDifficulty: {
    easy: [number, number];           // [correct, played]
    medium: [number, number];
    hard: [number, number];
    expert: [number, number];
  };
}

// Daily stats (Redis Hash)
// Key: stats:2026-01-20
// Fields:
//   totalPlayers: number
//   correctCount: number
//   guess_0: number (count for comment index 0)
//   guess_1: number
//   guess_2: number
//   guess_3: number
//   guess_4: number
//   avgTime: number (milliseconds)
```

### 9.3 Devvit KV Store Usage

```typescript
// For user-specific persistent data
import { Devvit } from '@devvit/public-api';

// Store user's guess for today
await context.kvStore.put(`guess:${oddileduserId}:${puzzleId}`, {
  oddiledguessedIndex: selectedIndex,
  timestamp: Date.now(),
  wasCorrect: selectedIndex === puzzle.aiIndex,
});

// Check if user has already played
const existingGuess = await context.kvStore.get(`guess:${userId}:${puzzleId}`);
if (existingGuess) {
  return { state: 'COMPLETED', result: existingGuess };
}
```

---

## 11. API Specifications

### 10.1 Internal Service Functions

```typescript
// services/puzzleService.ts

export interface PuzzleService {
  /**
   * Get today's puzzle with shuffled comments
   */
  getTodaysPuzzle(): Promise<ShuffledPuzzle>;
  
  /**
   * Get puzzle by specific date
   */
  getPuzzleByDate(date: string): Promise<ShuffledPuzzle | null>;
  
  /**
   * Submit a guess for the current puzzle
   * Returns result and updates user progress
   */
  submitGuess(userId: string, puzzleId: string, guessIndex: number): Promise<GuessResult>;
  
  /**
   * Get user's guess for a puzzle (if exists)
   */
  getUserGuess(userId: string, puzzleId: string): Promise<UserGuess | null>;
  
  /**
   * Check if user has already played today
   */
  hasUserPlayedToday(userId: string): Promise<boolean>;
}

export interface ShuffledPuzzle {
  id: string;
  dayNumber: number;
  difficulty: Difficulty;
  prompt: string;
  comments: DisplayComment[];        // Shuffled order
  // aiIndex NOT exposed until after guess
}

export interface DisplayComment {
  id: string;
  displayIndex: number;              // 0-4 shuffled position
  username: string;
  text: string;
}

export interface GuessResult {
  wasCorrect: boolean;
  correctIndex: number;              // Which comment was AI
  guessedIndex: number;              // What user picked
  explanation: string[];             // AI tells
  newStreak: number;
  stats: PuzzleStats;
}

export interface PuzzleStats {
  totalPlayers: number;
  correctPercentage: number;
  guessDistribution: number[];       // [8, 15, 41, 28, 8] = % for each
  userPercentile: number;            // "Top 23%"
}
```

### 10.2 User Service Functions

```typescript
// services/userService.ts

export interface UserService {
  /**
   * Get or create user progress record
   */
  getUserProgress(userId: string): Promise<UserProgress>;
  
  /**
   * Update progress after a guess
   */
  updateProgress(userId: string, wasCorrect: boolean, difficulty: Difficulty): Promise<UserProgress>;
  
  /**
   * Get user's recent history (last 30 days)
   */
  getHistory(userId: string, limit?: number): Promise<DayResult[]>;
  
  /**
   * Award achievement if criteria met
   */
  checkAndAwardAchievements(userId: string, progress: UserProgress): Promise<Achievement[]>;
  
  /**
   * Get leaderboard position
   */
  getLeaderboardPosition(userId: string, board: 'streak' | 'accuracy'): Promise<number>;
}
```

### 10.3 Stats Service Functions

```typescript
// services/statsService.ts

export interface StatsService {
  /**
   * Record a guess for daily statistics
   */
  recordGuess(puzzleId: string, guessIndex: number, wasCorrect: boolean, timeMs: number): Promise<void>;
  
  /**
   * Get current stats for a puzzle
   */
  getPuzzleStats(puzzleId: string): Promise<PuzzleStats>;
  
  /**
   * Get global statistics
   */
  getGlobalStats(): Promise<GlobalStats>;
}

export interface GlobalStats {
  totalPuzzles: number;
  totalPlayers: number;
  totalGuesses: number;
  averageAccuracy: number;
  longestActiveStreak: number;
  mostPopularCategory: Category;
}
```

---

## 12. UI Component Specifications

### 11.1 Component Tree

```
<App>
├── <GameStateProvider>
│   ├── <WelcomeScreen>             // First-time users
│   │   ├── <Logo />
│   │   ├── <HowToPlay />
│   │   └── <StartButton />
│   │
│   ├── <GameScreen>                // Active gameplay
│   │   ├── <PuzzleHeader>
│   │   │   ├── <DayBadge />
│   │   │   └── <DifficultyIndicator />
│   │   ├── <PromptCard />
│   │   ├── <CommentList>
│   │   │   └── <CommentCard /> x5
│   │   ├── <SelectionIndicator />
│   │   └── <ConfirmModal />
│   │
│   ├── <ResultScreen>              // Post-guess
│   │   ├── <ResultBanner />
│   │   ├── <AIExplanation />
│   │   ├── <StreakDisplay />
│   │   ├── <StatsPanel />
│   │   ├── <ShareCard />
│   │   └── <ActionButtons />
│   │
│   └── <CompletedScreen>           // Already played
│       ├── <TodayResult />
│       ├── <CommunityStats />
│       ├── <CountdownTimer />
│       └── <HistoryPreview />
│
└── <ErrorBoundary />
```

### 11.2 CommentCard Component Spec

```typescript
// components/game/CommentCard.tsx

interface CommentCardProps {
  comment: DisplayComment;
  isSelected: boolean;
  isRevealed: boolean;
  isAI?: boolean;                    // Only set after reveal
  onSelect: (id: string) => void;
  disabled?: boolean;
}

/**
 * Visual States:
 * 1. DEFAULT: Gray border, white background
 * 2. HOVER: Light blue border, slight shadow
 * 3. SELECTED: Blue border, blue tint background
 * 4. REVEALED_AI: Red border, red tint (wrong), or green (correct)
 * 5. REVEALED_HUMAN: Gray, slightly faded
 * 6. DISABLED: Opacity 0.5, no interactions
 */

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  isSelected,
  isRevealed,
  isAI,
  onSelect,
  disabled
}) => {
  const getCardStyle = () => {
    if (disabled) return 'opacity-50 cursor-not-allowed';
    if (isRevealed && isAI) return 'border-red-500 bg-red-50';
    if (isRevealed && !isAI) return 'border-gray-300 bg-gray-50 opacity-75';
    if (isSelected) return 'border-blue-500 bg-blue-50 shadow-md';
    return 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm';
  };

  return (
    <button
      onClick={() => !disabled && onSelect(comment.id)}
      disabled={disabled}
      className={`
        w-full
        p-4
        rounded-xl
        border-2
        text-left
        transition-all
        duration-200
        ${getCardStyle()}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">
          {comment.displayIndex + 1}. u/{comment.username}
        </span>
        {isSelected && !isRevealed && (
          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
            Selected
          </span>
        )}
        {isRevealed && isAI && (
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
            🤖 AI
          </span>
        )}
      </div>
      <p className="text-base text-gray-800 leading-relaxed">
        {comment.text}
      </p>
    </button>
  );
};
```

### 11.3 ResultBanner Component Spec

```typescript
// components/results/ResultBanner.tsx

interface ResultBannerProps {
  wasCorrect: boolean;
  streak: number;
  percentile: number;
}

const ResultBanner: React.FC<ResultBannerProps> = ({
  wasCorrect,
  streak,
  percentile
}) => {
  return (
    <div className={`
      text-center
      py-6
      px-4
      rounded-2xl
      ${wasCorrect ? 'bg-green-100' : 'bg-red-100'}
    `}>
      {/* Large emoji with animation */}
      <div className="text-6xl mb-3 animate-bounce">
        {wasCorrect ? '🎉' : '😅'}
      </div>
      
      {/* Main message */}
      <h2 className={`
        text-2xl
        font-bold
        mb-2
        ${wasCorrect ? 'text-green-700' : 'text-red-700'}
      `}>
        {wasCorrect ? 'Correct!' : 'Not Quite!'}
      </h2>
      
      {/* Subtext */}
      <p className="text-gray-600 mb-4">
        {wasCorrect 
          ? `You spotted the AI imposter!`
          : `The AI fooled you this time.`
        }
      </p>
      
      {/* Stats row */}
      <div className="flex justify-center gap-6 text-sm">
        {streak > 0 && (
          <div className="flex items-center gap-1">
            <span>{streak >= 3 ? '🔥' : '✨'}</span>
            <span className="font-medium">{streak}-day streak</span>
          </div>
        )}
        {wasCorrect && (
          <div className="flex items-center gap-1">
            <span>📊</span>
            <span className="font-medium">Top {percentile}%</span>
          </div>
        )}
      </div>
    </div>
  );
};
```

### 11.4 ShareCard Component Spec

```typescript
// components/results/ShareCard.tsx

interface ShareCardProps {
  dayNumber: number;
  wasCorrect: boolean;
  streak: number;
  onCopy: () => void;
  onShare: () => void;
}

const ShareCard: React.FC<ShareCardProps> = ({
  dayNumber,
  wasCorrect,
  streak,
  onCopy,
  onShare
}) => {
  const shareText = generateShareText(dayNumber, wasCorrect, streak);
  
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl">
      {/* Preview */}
      <pre className="font-mono text-sm mb-4 whitespace-pre-wrap">
        {shareText}
      </pre>
      
      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onCopy}
          className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg flex items-center justify-center gap-2"
        >
          <span>📋</span>
          <span>Copy</span>
        </button>
        <button
          onClick={onShare}
          className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-lg flex items-center justify-center gap-2"
        >
          <span>🔗</span>
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

function generateShareText(dayNumber: number, wasCorrect: boolean, streak: number): string {
  const result = wasCorrect ? '✅ 1/1' : '❌ 0/1';
  const streakText = streak > 0 ? `\n🔥 ${streak}-day streak` : '';
  
  return `🔍 Comment Conspiracy Day ${dayNumber}

${result}${streakText}

r/CommentConspiracy`;
}
```

---

## 13. Content Guidelines

### 12.1 Prompt Selection Criteria

**DO use prompts that:**
- Generate opinionated, varied responses
- Come from popular/relatable topics
- Allow both casual and thoughtful answers
- Don't require specialized knowledge
- Work across demographics

**DON'T use prompts that:**
- Are politically divisive
- Require current events knowledge
- Are offensive or controversial
- Are too niche (inside jokes, obscure references)
- Have objectively "correct" answers

**Example GOOD Prompts:**
- "What's a hill you'll die on about [everyday topic]?"
- "What's something you thought was normal until you learned it wasn't?"
- "What's the best [category] that nobody talks about?"
- "What's a minor inconvenience that really bothers you?"
- "What's your unpopular opinion about [topic]?"

**Example BAD Prompts:**
- "Who should win the election?" (political)
- "What happened in [recent news]?" (current events)
- "Rate my [appearance/work]?" (subjective/sensitive)
- "What's your [religion/race/sexuality]?" (identity-based)

### 12.2 Comment Content Guidelines

**Real Comments - Selection Criteria:**
- Length: 50-200 characters
- Karma: Positive (indicates quality)
- Standalone: Makes sense without parent context
- Clean: No slurs, harassment, or extreme content
- Authentic: Clear human voice/personality

**AI Comments - Generation Rules:**
- Match length distribution of real comments
- No harmful, offensive, or misleading content
- Must be detectable with careful analysis
- Cannot impersonate real users or public figures
- Must pass basic "could a human write this" test

### 12.3 Fake Username Guidelines

Usernames should feel Reddit-authentic:

**DO:**
- Use common Reddit patterns (adjective+noun+number)
- Mix of caps styles (camelCase, lowercase, CAPS)
- Include underscores occasionally
- Reference topic or personality type

**DON'T:**
- Use real Reddit usernames
- Use offensive terms
- Make them look fake ("User12345")
- Use obviously AI patterns ("HelpfulAssistant")

---

## 14. Edge Cases & Error Handling

### 13.1 Network Error Handling

```typescript
// hooks/useGameState.ts

const useGameState = () => {
  const [state, setState] = useState<GameState>({ status: 'loading' });
  const [error, setError] = useState<Error | null>(null);
  
  const loadPuzzle = async () => {
    try {
      setState({ status: 'loading' });
      const puzzle = await puzzleService.getTodaysPuzzle();
      setState({ status: 'playing', puzzle });
    } catch (err) {
      // Retry logic
      if (retryCount < 3) {
        setTimeout(() => loadPuzzle(), 1000 * Math.pow(2, retryCount));
        return;
      }
      
      setError(err);
      setState({ 
        status: 'error', 
        message: 'Unable to load puzzle. Please try again.' 
      });
    }
  };
  
  // ...
};
```

### 13.2 Edge Case Matrix

| Scenario | Handling |
|----------|----------|
| User loads page at 23:59 UTC | Check puzzle date before submit; if date changed, reload |
| User submits guess twice (race condition) | Idempotent submit; return existing result |
| User clears browser data mid-streak | Streak stored server-side; recovers on reload |
| Puzzle data corrupted | Fall back to previous day's puzzle with notice |
| Network offline during guess | Queue guess locally; submit when online |
| User plays on multiple devices | Server-side source of truth; sync on load |
| User changes timezone | Always use UTC for puzzle dates |
| Very slow network | Show skeleton UI; timeout after 10s with retry |

### 13.3 Error UI States

```typescript
// components/shared/ErrorState.tsx

interface ErrorStateProps {
  type: 'network' | 'puzzle' | 'submit' | 'generic';
  onRetry: () => void;
}

const ERROR_MESSAGES = {
  network: {
    title: "Connection Issue",
    message: "We couldn't reach the server. Check your internet and try again.",
    icon: "📡"
  },
  puzzle: {
    title: "Puzzle Loading Error",
    message: "Today's puzzle couldn't be loaded. We're working on it!",
    icon: "🧩"
  },
  submit: {
    title: "Submission Failed",
    message: "Your guess couldn't be recorded. Please try again.",
    icon: "❌"
  },
  generic: {
    title: "Something Went Wrong",
    message: "An unexpected error occurred. Please try again.",
    icon: "⚠️"
  }
};
```

---

## 15. Testing Strategy

### 14.1 Unit Tests

```typescript
// __tests__/services/puzzleService.test.ts

describe('PuzzleService', () => {
  describe('getTodaysPuzzle', () => {
    it('returns shuffled puzzle with correct structure', async () => {
      const puzzle = await puzzleService.getTodaysPuzzle();
      
      expect(puzzle.comments).toHaveLength(5);
      expect(puzzle.comments.every(c => c.displayIndex >= 0 && c.displayIndex <= 4)).toBe(true);
      expect(new Set(puzzle.comments.map(c => c.displayIndex)).size).toBe(5);
    });
    
    it('does not expose AI index before guess', async () => {
      const puzzle = await puzzleService.getTodaysPuzzle();
      
      expect(puzzle).not.toHaveProperty('aiIndex');
      expect(puzzle.comments.every(c => !c.hasOwnProperty('isAI'))).toBe(true);
    });
  });
  
  describe('submitGuess', () => {
    it('returns correct result for correct guess', async () => {
      const result = await puzzleService.submitGuess('user1', 'puzzle1', 2);
      
      expect(result.wasCorrect).toBe(true);
      expect(result.correctIndex).toBe(2);
    });
    
    it('prevents duplicate submissions', async () => {
      await puzzleService.submitGuess('user1', 'puzzle1', 2);
      const secondAttempt = await puzzleService.submitGuess('user1', 'puzzle1', 3);
      
      expect(secondAttempt.guessedIndex).toBe(2); // First guess preserved
    });
  });
});
```

### 14.2 Integration Tests

```typescript
// __tests__/integration/gameFlow.test.ts

describe('Full Game Flow', () => {
  it('completes full play cycle', async () => {
    // 1. Load puzzle
    const puzzle = await puzzleService.getTodaysPuzzle();
    expect(puzzle.status).toBe('playing');
    
    // 2. Submit guess
    const result = await puzzleService.submitGuess('user1', puzzle.id, 2);
    expect(result).toHaveProperty('wasCorrect');
    
    // 3. Check user progress updated
    const progress = await userService.getUserProgress('user1');
    expect(progress.totalPlayed).toBe(1);
    
    // 4. Verify stats recorded
    const stats = await statsService.getPuzzleStats(puzzle.id);
    expect(stats.totalPlayers).toBeGreaterThan(0);
  });
});
```

### 14.3 Manual Testing Checklist

```markdown
## Pre-Launch Manual Testing

### Core Gameplay
- [ ] New user sees welcome screen
- [ ] Puzzle loads within 2 seconds
- [ ] All 5 comments display correctly
- [ ] Tap selects comment with visual feedback
- [ ] Confirmation modal appears on selection
- [ ] Cancel returns to game without submitting
- [ ] Confirm submits and shows result
- [ ] Correct answer shows green/celebration
- [ ] Incorrect answer shows red/explanation
- [ ] Cannot submit second guess

### Progression
- [ ] Streak increments on consecutive days
- [ ] Streak resets on wrong answer
- [ ] Streak resets on missed day
- [ ] Longest streak persists
- [ ] Achievements unlock correctly

### Share
- [ ] Copy button works
- [ ] Share text is correctly formatted
- [ ] No spoilers in share text

### Edge Cases
- [ ] Refresh mid-game preserves state
- [ ] Closing and reopening works
- [ ] Works on slow network (3G)
- [ ] Works on fast network (WiFi)
- [ ] Handles timezone change correctly

### Mobile
- [ ] Touch targets are large enough
- [ ] No horizontal scroll
- [ ] Text readable without zoom
- [ ] Works in portrait and landscape
- [ ] No keyboard issues
```

---

## 16. Launch Checklist

### 15.1 Pre-Submission Checklist

```markdown
## Devpost Submission Requirements

### Required Elements
- [ ] App listing on developer.reddit.com
- [ ] Demo subreddit created (r/CommentConspiracy)
- [ ] At least 1 live puzzle post running
- [ ] README.md with clear description
- [ ] Video demo (recommended, not required)

### Technical Validation
- [ ] No console errors
- [ ] All features functional
- [ ] Mobile responsive
- [ ] Performance targets met
- [ ] Error handling tested

### Content Validation
- [ ] 7+ puzzles pre-loaded (1 week runway)
- [ ] Puzzles reviewed for quality
- [ ] No offensive content
- [ ] Fake usernames appropriate

### Polish Checklist
- [ ] Loading states implemented
- [ ] Empty states designed
- [ ] Error states user-friendly
- [ ] Animations smooth
- [ ] Copy/text proofread
```

### 15.2 Demo Setup

```markdown
## Demo Subreddit Setup

1. Create r/CommentConspiracy
2. Set subreddit to Public
3. Install Comment Conspiracy app
4. Configure subreddit description:
   "🔍 Can you spot the AI comment? Daily puzzle game."
5. Create pinned post: "How to Play"
6. Schedule first puzzle post
7. Install auto-join app for judges
```

### 15.3 Submission Checklist

```markdown
## Devpost Submission Form

### Basic Info
- Title: Comment Conspiracy
- Tagline: "One of these comments isn't human. Can you spot the imposter?"
- Description: [Full markdown description]
- Demo link: https://reddit.com/r/CommentConspiracy
- App link: developers.reddit.com/apps/comment-conspiracy

### Categories
- [x] Best Daily Game ($15,000)
- [x] Best Use of User Contributions ($3,000)
- [x] Best Mobile Game Play ($3,000)

### Optional
- [ ] Developer satisfaction survey completed
- [ ] Helper nomination submitted
```

---

## 17. Future Roadmap

### 16.1 Post-Hackathon Enhancements

**Phase 1: Community Features**
- Puzzle submission system live
- User flairs for achievements
- Weekly leaderboard posts
- Community-voted difficulty ratings

**Phase 2: Variety Modes**
- "Challenge Mode": 3 AIs, find them all
- "Speed Round": 30-second time limit
- "Expert Hunt": All expert-level daily
- "Themed Weeks": Movies, Food, Tech focus

**Phase 3: Social Features**
- Head-to-head challenges
- Friend leaderboards
- "Prove it" mode: Explain your reasoning before reveal
- Community tournaments

**Phase 4: Monetization (via Reddit Developer Funds)**
- Premium themes/cosmetics
- Streak protection items
- Hint system (see % distribution before guess)
- Ad-free experience

---

## 18. Implementation Roadmap

This section provides the complete build order, dependencies, and timeline for implementing Comment Conspiracy using Claude Code as the primary development method.

### 18.1 Build Order Overview

```
IMPLEMENTATION PHASES
━━━━━━━━━━━━━━━━━━━━━

┌────────────────────────────────────────────────────────────────┐
│ PHASE 1: Foundation (Days 1-3)                                 │
│ ──────────────────────────────────                             │
│ Goal: Working game loop with static data                       │
│                                                                │
│ □ Project scaffolding (Devvit app)                            │
│ □ Type definitions (puzzle, user, game state)                  │
│ □ Core components (CommentCard, GameScreen)                    │
│ □ Basic state management                                       │
│ □ Static puzzle loading (bundled JSON)                         │
│                                                                │
│ Deliverable: Can play a hardcoded puzzle                       │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ PHASE 2: Game Logic (Days 4-6)                                 │
│ ──────────────────────────────                                 │
│ Goal: Complete gameplay with persistence                       │
│                                                                │
│ □ Redis integration (puzzle storage)                           │
│ □ User progress tracking (streaks, stats)                      │
│ □ Result screen with explanations                              │
│ □ Share card generation                                        │
│ □ Already-played state handling                                │
│                                                                │
│ Deliverable: Full game cycle works with Redis                  │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ PHASE 3: Scheduler & Daily Cycle (Days 7-8)                    │
│ ───────────────────────────────────────────                    │
│ Goal: Automatic daily puzzle posting                           │
│                                                                │
│ □ Devvit scheduler configuration                               │
│ □ Daily puzzle fetching and posting                            │
│ □ Stats aggregation                                            │
│ □ Missing puzzle fallback                                      │
│                                                                │
│ Deliverable: Puzzles auto-post at midnight UTC                 │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ PHASE 4: Admin & Upload (Days 9-10)                            │
│ ─────────────────────────────────────                          │
│ Goal: Can add puzzles without code changes                     │
│                                                                │
│ □ Admin UI for moderators                                      │
│ □ Puzzle upload interface                                      │
│ □ Inventory dashboard                                          │
│ □ Validation on upload                                         │
│                                                                │
│ Deliverable: Upload puzzles via web UI                         │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ PHASE 5: Puzzle Generator Tool (Days 11-13)                    │
│ ─────────────────────────────────────────────                  │
│ Goal: Rapid puzzle creation capability                         │
│                                                                │
│ □ CLI project setup                                            │
│ □ Reddit API integration                                       │
│ □ Claude API integration                                       │
│ □ Interactive generation flow                                  │
│ □ Batch generation mode                                        │
│ □ Local file management                                        │
│                                                                │
│ Deliverable: Generate puzzle in ~10 minutes                    │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ PHASE 6: Content Creation (Days 14-17)                         │
│ ───────────────────────────────────────                        │
│ Goal: 28 puzzles ready for demo                                │
│                                                                │
│ □ Generate 7 bootstrap puzzles (varied difficulty)             │
│ □ Generate 21 additional puzzles                               │
│ □ Review and approve all puzzles                               │
│ □ Upload to Redis                                              │
│ □ Verify scheduler picks them up                               │
│                                                                │
│ Deliverable: Full month of content ready                       │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ PHASE 7: Polish & Mobile (Days 18-21)                          │
│ ─────────────────────────────────────                          │
│ Goal: Launch-ready quality                                     │
│                                                                │
│ □ Mobile responsive testing                                    │
│ □ Touch target sizing                                          │
│ □ Animation polish                                             │
│ □ Error state handling                                         │
│ □ Loading states                                               │
│ □ Edge case testing                                            │
│                                                                │
│ Deliverable: Judges can use on mobile seamlessly               │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ PHASE 8: Demo & Submission (Days 22-28)                        │
│ ──────────────────────────────────────                         │
│ Goal: Winning submission                                       │
│                                                                │
│ □ Create r/CommentConspiracy subreddit                         │
│ □ Install and configure app                                    │
│ □ Run live for several days                                    │
│ □ Monitor and fix issues                                       │
│ □ Create demo video/screenshots                                │
│ □ Write submission documentation                               │
│ □ Submit to Devpost                                            │
│                                                                │
│ Deliverable: Submitted before Feb 12, 6pm PST                  │
└────────────────────────────────────────────────────────────────┘
```

### 18.2 Detailed Task Breakdown

#### Phase 1: Foundation (Days 1-3)

| Task | Claude Code Prompt | Est. Time |
|------|-------------------|-----------|
| Create Devvit project | "Create a new Devvit web app project called comment-conspiracy with TypeScript and React" | 15 min |
| Define types | "Create TypeScript interfaces for Puzzle, Comment, UserProgress, and GameState as specified in section 4.13 of the spec" | 30 min |
| CommentCard component | "Implement the CommentCard component exactly as specified in section 12.2" | 45 min |
| CommentList component | "Create a CommentList component that renders 5 CommentCards with selection state" | 30 min |
| GameScreen component | "Create the GameScreen component with prompt header, comment list, and warning text" | 45 min |
| ConfirmModal component | "Create a confirmation modal that shows selected comment and confirm/cancel buttons" | 30 min |
| Basic state management | "Implement useGameState hook with states: loading, playing, confirming, revealed" | 45 min |
| Static puzzle loading | "Load puzzle from bundled JSON file and display in GameScreen" | 30 min |

**Phase 1 Total: ~5-6 hours**

#### Phase 2: Game Logic (Days 4-6)

| Task | Claude Code Prompt | Est. Time |
|------|-------------------|-----------|
| Redis service setup | "Create puzzleService.ts with Redis integration for storing and fetching puzzles" | 1 hr |
| User progress service | "Implement userService.ts with streak tracking, stats, and history as specified" | 1 hr |
| Submit guess logic | "Add submitGuess function that validates answer, updates stats, returns result" | 45 min |
| ResultScreen component | "Create ResultScreen with ResultBanner, AIExplanation, and StatsPanel" | 1 hr |
| ShareCard component | "Implement ShareCard with copy-to-clipboard and share functionality" | 45 min |
| CompletedScreen | "Create CompletedScreen showing today's result and countdown to next puzzle" | 45 min |
| State transitions | "Wire up all screen transitions: welcome→playing→confirming→result→completed" | 1 hr |

**Phase 2 Total: ~7-8 hours**

#### Phase 3: Scheduler & Daily Cycle (Days 7-8)

| Task | Claude Code Prompt | Est. Time |
|------|-------------------|-----------|
| Scheduler job | "Create Devvit scheduler job that runs at midnight UTC and posts daily puzzle" | 1 hr |
| Puzzle posting | "Implement createDailyPost function that creates Reddit post with puzzle" | 45 min |
| Stats aggregation | "Add statsService.ts that tracks guess distribution and accuracy per puzzle" | 45 min |
| Current puzzle pointer | "Update scheduler to set puzzle:current in Redis after posting" | 30 min |
| Missing puzzle handler | "Add fallback behavior when no puzzle exists for today" | 30 min |
| Health monitoring | "Create health check job that alerts mods if puzzle inventory is low" | 45 min |

**Phase 3 Total: ~4-5 hours**

#### Phase 4: Admin & Upload (Days 9-10)

| Task | Claude Code Prompt | Est. Time |
|------|-------------------|-----------|
| Admin permission check | "Create useAdmin hook that checks if current user is a subreddit moderator" | 30 min |
| AdminPanel component | "Create admin dashboard with navigation to upload and inventory views" | 45 min |
| PuzzleUploader | "Implement puzzle upload form with JSON validation and Redis write" | 1 hr |
| InventoryView | "Create calendar view showing which dates have puzzles loaded" | 1 hr |
| Upload validation | "Add comprehensive puzzle validation before allowing upload" | 45 min |
| Mod menu integration | "Add 'Mod Tools' menu item that opens admin panel for moderators" | 30 min |

**Phase 4 Total: ~4-5 hours**

#### Phase 5: Puzzle Generator Tool (Days 11-13)

| Task | Claude Code Prompt | Est. Time |
|------|-------------------|-----------|
| CLI project setup | "Create Node.js CLI project with commander, inquirer, chalk dependencies" | 30 min |
| Reddit service | "Implement Reddit API wrapper using snoowrap for fetching comments" | 1 hr |
| Claude service | "Create Claude API integration for generating AI comments" | 1 hr |
| Prompt templates | "Create difficulty prompt templates (easy, medium, hard, expert) for AI generation" | 45 min |
| Generate command | "Implement interactive generate command with all steps from spec section 5.4.3" | 2 hr |
| Batch command | "Add batch generation mode that creates multiple puzzles" | 1 hr |
| File management | "Implement fileService for saving to pending/approved/uploaded folders" | 45 min |
| Review command | "Create interactive review mode for approving pending puzzles" | 45 min |
| Status command | "Add status command showing puzzle inventory counts" | 30 min |

**Phase 5 Total: ~9-10 hours**

#### Phase 6: Content Creation (Days 14-17)

| Task | Who | Est. Time |
|------|-----|-----------|
| Generate 7 bootstrap puzzles | You (using tool) | 1.5 hr |
| Bundle bootstrap puzzles in code | Claude Code | 30 min |
| Generate 21 additional puzzles | You (using tool) | 4 hr |
| Review all puzzles | You | 1 hr |
| Upload via Admin UI | You | 30 min |
| Verify scheduler | You | 30 min |

**Phase 6 Total: ~8 hours**

#### Phase 7: Polish & Mobile (Days 18-21)

| Task | Claude Code Prompt | Est. Time |
|------|-------------------|-----------|
| Mobile responsive CSS | "Add responsive styles for all components following section 8 specs" | 1 hr |
| Touch targets | "Ensure all buttons and cards meet 44px minimum touch target" | 30 min |
| Animation polish | "Add smooth transitions and micro-animations for delight" | 1 hr |
| Loading states | "Add skeleton screens and loading spinners for all async operations" | 45 min |
| Error boundaries | "Implement error boundaries with user-friendly error messages" | 45 min |
| Edge case testing | "Test and fix: rapid taps, timezone edge, network failures" | 1.5 hr |
| Accessibility | "Add ARIA labels and ensure screen reader compatibility" | 1 hr |

**Phase 7 Total: ~7-8 hours**

#### Phase 8: Demo & Submission (Days 22-28)

| Task | Who | Est. Time |
|------|-----|-----------|
| Create subreddit | You | 15 min |
| Install Devvit app | You | 15 min |
| Configure settings | You | 30 min |
| Run live demo | You | 3+ days monitoring |
| Fix issues | Claude Code | varies |
| Create demo video | You | 2 hr |
| Write submission | You | 1 hr |
| Submit to Devpost | You | 30 min |

**Phase 8 Total: ~5+ hours + monitoring**

### 18.3 Total Effort Estimate

```
EFFORT SUMMARY
━━━━━━━━━━━━━━

Development (Claude Code assisted):
├── Phase 1: Foundation         5-6 hours
├── Phase 2: Game Logic         7-8 hours
├── Phase 3: Scheduler          4-5 hours
├── Phase 4: Admin/Upload       4-5 hours
├── Phase 5: Generator Tool     9-10 hours
└── Phase 7: Polish             7-8 hours
                               ─────────
    Subtotal:                  36-42 hours

Content Creation (You):
├── Phase 6: 28 puzzles         8 hours
└── Phase 8: Demo/Submit        5 hours
                               ─────────
    Subtotal:                  13 hours

TOTAL PROJECT:                 49-55 hours
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With Claude Code doing 80% of development:
• Your active coding time: ~8-10 hours
• Your review/testing time: ~15-20 hours
• Your content creation time: ~13 hours
• Total your time: ~36-43 hours

Calendar time needed: 3-4 weeks
```

### 18.4 Critical Path & Dependencies

```
DEPENDENCY GRAPH
━━━━━━━━━━━━━━━━

Types ──────────────────────────┐
                                │
CommentCard ◄───────────────────┤
    │                           │
    ▼                           │
CommentList                     │
    │                           │
    ▼                           │
GameScreen ◄────────────────────┤
    │                           │
    ▼                           │
Redis Setup ◄───────────────────┘
    │
    ├─────────────┐
    ▼             ▼
UserService   PuzzleService
    │             │
    └──────┬──────┘
           ▼
    Submit Logic
           │
           ▼
    ResultScreen
           │
           ▼
    Scheduler ◄─────────────── AdminUI
           │                      │
           ▼                      │
    [GAME WORKS]                  │
           │                      │
           ▼                      ▼
    Generator Tool ──────────► Upload Flow
           │
           ▼
    Content Creation
           │
           ▼
    [SUBMISSION READY]
```

### 18.5 Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Devvit API changes | High | Pin versions, test early |
| Reddit API rate limits | Medium | Cache comments, batch requests |
| Claude API outages | Medium | Generate puzzles with buffer |
| Scheduler doesn't fire | High | Test thoroughly, have manual backup |
| Content too hard/easy | Medium | Test puzzles before upload |
| Mobile layout breaks | High | Test on real devices early |

### 18.6 Claude Code Prompting Strategy

For optimal results with Claude Code, follow these patterns:

**1. Reference the spec:**
```
"Implement the CommentCard component exactly as specified in 
section 12.2 of comment-conspiracy-spec.md, including all 
visual states and touch handling."
```

**2. Build incrementally:**
```
"First, create the basic CommentCard that displays username 
and text. We'll add selection states in the next step."
```

**3. Provide context:**
```
"This is for a Reddit Devvit app. The component needs to 
work with Devvit's React-like framework and their CSS 
constraints (utility classes only, no external CSS)."
```

**4. Test as you go:**
```
"After implementing, show me how to test this component 
renders correctly with sample puzzle data."
```

**5. Handle errors explicitly:**
```
"Add error handling for: null puzzle data, missing comments, 
and failed Redis reads. Show user-friendly error messages."
```

---

## Appendix A: AI Detection Tells Reference

For puzzle creation reference, common AI tells by difficulty:

### Easy (Monday)
- Excessive formality ("I would recommend...")
- Perfect grammar and punctuation
- List format responses
- "Game-changer", "absolutely", "highly recommend"
- Balanced pros and cons
- Explicit structure (intro → body → conclusion)

### Medium (Wednesday)
- Overly helpful or comprehensive
- Subtle corporate speak
- Slightly too polished
- Generic enthusiasm
- Missing personal anecdotes
- Perfect spelling of difficult words

### Hard (Friday)
- Emotional distance despite emotive content
- Slightly off humor timing
- Too-perfect topical references
- Subtle pattern breaks in casual language
- Overuse of em-dashes
- Lists disguised as prose

### Expert (Saturday)
- Very subtle tonal inconsistencies
- Slightly off cultural references
- Perfect typo placement
- Almost-too-natural digressions
- Suspiciously relevant examples

---

## Appendix B: Sample Week of Puzzles

See attached `sample_puzzles_week01.json` for complete example data.

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-18 | Initial complete specification |

---

*This specification is designed to be the single source of truth for implementing Comment Conspiracy. All implementation decisions should reference this document.*
