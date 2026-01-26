# Comment Conspiracy - Devpost Submission

> **Hackathon:** Reddit Games and Puzzles Hackathon
> **Deadline:** February 12, 2026, 6:00 PM PST
> **Status:** Ready to submit

---

## Basic Information

**Title:** Comment Conspiracy

**Tagline:** One of these comments isn't human. Can you spot the imposter?

**Categories:**
- Best Daily Game
- Best Use of User Contributions
- Best Mobile Game Play

---

## Links

| Link Type | URL |
|-----------|-----|
| **Demo Subreddit** | https://reddit.com/r/CommentConspiracy |
| **Devvit App** | https://developers.reddit.com/apps/comment-conspire |
| **GitHub Repo** | https://github.com/sgharlow/comment-conspiracy |

---

## Description

Comment Conspiracy is a daily puzzle game where players must identify which of 5 comments was written by AI. Each day at midnight UTC, a new puzzle is posted featuring 4 real Reddit comments and 1 AI-generated imposter.

### How It Works
1. Players read 5 comments responding to a Reddit-style prompt
2. They identify which comment was written by AI
3. After guessing, they see detailed "AI tells" explaining the giveaways
4. Streaks, achievements, and leaderboards track progress

### Key Features
- **Daily Puzzles:** New puzzle every day at midnight UTC
- **One Guess Rule:** Choose carefully - you only get one shot
- **AI Detection Training:** Learn to spot AI writing patterns
- **Streak Tracking:** Build consecutive correct day streaks
- **8 Achievements:** From "First Blood" to "30-day Streak"
- **Leaderboards:** Compete on streak and accuracy rankings
- **User Contributions:** Submit your own AI comment ideas
- **Community Stats:** See how your guess compares to others

### Technical Highlights
- Built on Reddit Devvit platform
- React 18 + TypeScript frontend via Devvit WebView
- Redis persistence for user progress and stats
- Automated daily posting via Devvit Scheduler
- 66 curated puzzles (60+ days of content)

---

## Screenshots

Upload these files from the `screenshots/` folder:

| # | Filename | Description |
|---|----------|-------------|
| 1 | `01-welcome-screen.png` | First-time user welcome with How to Play |
| 2 | `02-game-screen.png` | Active puzzle showing 5 comment cards |
| 3 | `03-comment-selected.png` | Comment selection with visual feedback |
| 4 | `04-confirmation-modal.png` | "Final Answer?" confirmation dialog |
| 5 | `05-correct-result.png` | Correct result with AI tells explanation |

---

## Video Demo (Optional)

If creating a video demo, cover:
1. Discovering the game post on r/CommentConspiracy
2. Reading the 5 comments
3. Selecting a comment and confirming guess
4. Seeing the result with AI tells
5. Checking streak and achievements
6. Sharing results

Suggested length: 1-2 minutes

---

## Team

Solo project by u/Primary-Subject-8639

---

## Built With

- Reddit Devvit Platform
- React 18
- TypeScript 5.x
- Tailwind CSS
- Devvit Redis
- Devvit Scheduler

---

## Try It

Visit https://reddit.com/r/CommentConspiracy and look for the latest "Comment Conspiracy - Can You Spot the AI?" post.

---

## Prize Categories Alignment

### Best Daily Game ($15K)
- New puzzle every day at midnight UTC
- One guess per day creates anticipation
- Streak system encourages daily return
- Community stats show daily participation

### Best Use of User Contributions ($3K)
- "Contribute AI Comments" feature lets users submit ideas
- Voting system for community curation
- Top contributors leaderboard
- User-generated content pipeline for future puzzles

### Best Mobile Game Play ($3K)
- Touch-optimized card selection
- Large tap targets (44x44px minimum)
- Responsive layout for all screen sizes
- Share functionality with native sharing
