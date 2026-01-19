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
4. [Daily Content Pipeline](#4-daily-content-pipeline)
5. [Scoring & Progression System](#5-scoring--progression-system)
6. [Social & Community Features](#6-social--community-features)
7. [Mobile UX Specification](#7-mobile-ux-specification)
8. [Judging Criteria Alignment](#8-judging-criteria-alignment)
9. [Data Models](#9-data-models)
10. [API Specifications](#10-api-specifications)
11. [UI Component Specifications](#11-ui-component-specifications)
12. [Content Guidelines](#12-content-guidelines)
13. [Edge Cases & Error Handling](#13-edge-cases--error-handling)
14. [Testing Strategy](#14-testing-strategy)
15. [Launch Checklist](#15-launch-checklist)
16. [Future Roadmap](#16-future-roadmap)

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
│   │   └── shared/
│   │       ├── Button.tsx        # Reusable button
│   │       ├── ProgressBar.tsx   # Streak indicator
│   │       ├── Timer.tsx         # Countdown to next
│   │       └── LoadingSpinner.tsx
│   ├── hooks/
│   │   ├── useGameState.ts       # Current game state
│   │   ├── useUserProgress.ts    # Streak, history
│   │   ├── usePuzzle.ts          # Today's puzzle data
│   │   └── useStats.ts           # Community statistics
│   ├── services/
│   │   ├── puzzleService.ts      # Fetch/manage puzzles
│   │   ├── userService.ts        # User data operations
│   │   ├── statsService.ts       # Aggregate statistics
│   │   └── schedulerService.ts   # Daily posting logic
│   ├── utils/
│   │   ├── dateUtils.ts          # Timezone handling
│   │   ├── shuffleUtils.ts       # Comment randomization
│   │   └── shareUtils.ts         # Share text generation
│   └── data/
│       └── puzzles/
│           ├── week01.json       # Pre-generated puzzles
│           ├── week02.json
│           └── ...
├── assets/
│   └── (empty - text only game)
└── README.md                      # Documentation
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

## 4. Daily Content Pipeline

### 4.1 Puzzle Generation Process

Each puzzle requires careful curation to ensure quality and appropriate difficulty.

```
PUZZLE GENERATION WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━

1. SELECT PROMPT (Manual)
   │
   ├── Source: Popular AskReddit threads
   ├── Criteria: 
   │   • Generates opinionated responses
   │   • Not too niche or technical
   │   • Allows varied writing styles
   │
   ▼
2. COLLECT REAL COMMENTS (Semi-automated)
   │
   ├── Source: Reddit API (historical posts)
   ├── Filter criteria:
   │   • 50-200 characters
   │   • Positive karma
   │   • No links/media
   │   • Standalone (no reply context needed)
   │
   ├── Select 4 diverse comments:
   │   • Different writing styles
   │   • Different perspectives
   │   • Mix of casual/formal
   │
   ▼
3. GENERATE AI COMMENT (Claude API - Offline)
   │
   ├── Prompt template:
   │   "Write a Reddit comment responding to: [PROMPT]
   │    Match these characteristics:
   │    - Length: Similar to other comments (~100 chars)
   │    - Tone: [DIFFICULTY-BASED INSTRUCTIONS]
   │    - Include [DIFFICULTY-BASED TELLS]"
   │
   ├── Generate 3 variations
   ├── Select best fit for difficulty target
   │
   ▼
4. CURATE & VALIDATE (Manual)
   │
   ├── Review AI comment for:
   │   • Appropriate difficulty
   │   • No offensive content
   │   • Believable but detectable
   │
   ├── Create "AI tells" explanation
   │
   ▼
5. ASSIGN METADATA
   │
   ├── Day of week (difficulty)
   ├── Category tag
   ├── Fake username generation
   │
   ▼
6. ADD TO PUZZLE BANK (JSON)
```

### 4.2 Puzzle JSON Schema

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

## 5. Scoring & Progression System

### 5.1 Scoring Model

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

## 6. Social & Community Features

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

## 7. Mobile UX Specification

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

## 8. Judging Criteria Alignment

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

## 9. Data Models

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

## 10. API Specifications

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

## 11. UI Component Specifications

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

## 12. Content Guidelines

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

## 13. Edge Cases & Error Handling

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

## 14. Testing Strategy

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

## 15. Launch Checklist

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

## 16. Future Roadmap

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
