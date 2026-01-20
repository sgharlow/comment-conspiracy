# Comment Conspiracy Playtest Guide

This guide walks you through manually testing the Comment Conspiracy app on your Devvit playtest subreddit.

## Prerequisites

- You must be logged into Reddit with the account that uploaded the app
- App deployed to: https://developers.reddit.com/apps/comment-conspire
- Playtest subreddit: https://www.reddit.com/r/comment_conspire_dev

---

## Step 1: Access the Playtest Subreddit

1. Open https://www.reddit.com/r/comment_conspire_dev in your browser
2. Make sure you're logged in with your Reddit account (the one used for `devvit upload`)
3. You should see an empty subreddit (no posts yet)

---

## Step 2: Create a Game Post

### Option A: Using the Subreddit Menu
1. On the subreddit page, click the **three dots menu** (⋯) in the subreddit header
2. Look for **"Create Comment Conspiracy Post"** in the menu
3. Click it to create a new game post

### Option B: Using Devvit CLI
Run in your terminal:
```bash
cd ~/CascadeProjects/comment-conspiracy
devvit playtest comment_conspire_dev
```
This opens an interactive session where you can create posts.

### Option C: Using Reddit's Post Creation
1. Click "Create Post" on the subreddit
2. Select the "Comment Conspiracy" post type (if available)

---

## Step 3: Test the Game Flow

Once a post is created, click on it to load the game. Test each state:

### 3.1 First-Time User (Welcome Screen)
**What you should see:**
- "COMMENT CONSPIRACY" header
- "One of these comments was written by AI. Can you spot the imposter?"
- How to Play instructions
- "START TODAY'S PUZZLE" button
- Current streak: 0 days

**Test:** Click "START TODAY'S PUZZLE" to proceed

### 3.2 Game Screen (Playing State)
**What you should see:**
- Day number, difficulty level, day of week
- The prompt question
- 5 comment cards with usernames and text
- Warning: "Choose carefully - you only get one guess!"

**Test actions:**
1. Tap different comments to select them (should highlight in blue)
2. Tap selected comment again to deselect
3. Tap "LOCK IN GUESS" button (should only appear when comment selected)

### 3.3 Confirmation Modal
**What you should see:**
- "Final Answer?" header
- Preview of your selected comment
- "CANCEL" and "CONFIRM GUESS" buttons

**Test actions:**
1. Click "CANCEL" - should return to game screen with selection intact
2. Click "CONFIRM GUESS" - should show loading then result

### 3.4 Result Screen (Correct)
**What you should see:**
- "CORRECT!" banner with confetti
- "Comment #X was the AI imposter!"
- AI TELLS section with detection hints
- Your streak and percentile
- Achievement badges (if any unlocked)
- Share card with copy/share buttons

**Test actions:**
1. Click "COPY" - should copy result to clipboard
2. Click "SHARE" - should open native share dialog (on mobile)
3. Check for "First Blood" achievement (first correct guess)

### 3.5 Result Screen (Incorrect)
**What you should see:**
- "NOT QUITE" banner
- Which comment you picked vs which was AI
- AI TELLS section explaining why it was AI
- HUMAN TELLS section explaining why yours was human
- Streak reset notification
- Share card

### 3.6 Completed Screen (Already Played)
**What you should see:**
- "YOU'VE PLAYED TODAY" header
- Your answer and whether it was correct
- Your streak
- Leaderboard rankings (Streak and Accuracy)
- Community stats (total players, correct %, guess distribution)
- Countdown timer to next puzzle
- "View Full Breakdown" and "Join Discussion" buttons

---

## Step 4: Test Edge Cases

### 4.1 Refresh After Playing
1. Play a puzzle to completion
2. Refresh the page
3. **Expected:** Should show Completed Screen (not restart game)

### 4.2 Multiple Guess Attempts
1. Try submitting a guess
2. Before result loads, try submitting again
3. **Expected:** Should be idempotent (same result, no double-counting)

### 4.3 Network Error Handling
1. Disable network (airplane mode or disconnect)
2. Try to load the game
3. **Expected:** Should show error state with "Try Again" button

---

## Step 5: Test Achievements

Play multiple games to test achievement unlocks:

| Achievement | How to Trigger |
|-------------|----------------|
| First Blood | Get your first correct answer |
| Sharp Eye | Achieve 3-day streak |
| Pattern Recognition | Achieve 7-day streak |
| Expert Hunter | Get an expert (Saturday) puzzle correct |
| Veteran | Play 30 puzzles |
| Perfectionist | 80%+ accuracy over 20+ games |

**Note:** For testing streaks, you may need to manually adjust dates in the puzzle data or wait multiple days.

---

## Step 6: Test Leaderboards

1. Play 10+ games to qualify for accuracy leaderboard
2. On Completed Screen, check "Your Rankings" section
3. **Should show:**
   - Streak rank with current streak
   - Accuracy rank with percentage (after 10 games)
   - Progress bar if under 10 games

---

## Step 7: Mobile Testing

Test on mobile device or browser dev tools mobile emulation:

1. Open Chrome DevTools (F12)
2. Click device toolbar icon or press Ctrl+Shift+M
3. Select a mobile device (iPhone 12, Pixel 5, etc.)
4. Reload the page

**Check:**
- [ ] Touch targets are at least 44x44px
- [ ] Text is readable without zooming
- [ ] Buttons are easily tappable
- [ ] No horizontal scrolling
- [ ] Comment cards don't overflow
- [ ] Modal is centered and usable
- [ ] Share functionality works

---

## Step 8: Test Daily Scheduler (Optional)

The daily puzzle scheduler runs at midnight UTC. To test manually:

1. Check current puzzle ID in Redis (via Devvit dashboard)
2. Wait for midnight UTC
3. Verify new post is created automatically
4. Check that puzzle ID updated

**Or manually trigger:**
```bash
# In devvit playtest session
# The scheduler job can be triggered manually from the Devvit dashboard
```

---

## Troubleshooting

### Game doesn't load
- Check browser console for errors (F12 → Console)
- Verify app is installed on subreddit
- Try hard refresh (Ctrl+Shift+R)

### Puzzle shows "No puzzle available"
- Puzzles are date-based (2026-01-19 to 2026-02-15)
- If current date doesn't match, first puzzle (2026-01-19) is used as fallback

### Achievements don't unlock
- Check browser console for errors
- Verify Redis is storing data correctly
- Achievement criteria might not be met yet

### Leaderboard shows "--"
- Streak: Need at least 1 game played
- Accuracy: Need at least 10 games played

---

## Test Checklist

Copy this checklist to track your testing:

```
## Core Flow
- [ ] Welcome screen displays correctly
- [ ] Can start puzzle
- [ ] Comment selection works
- [ ] Confirmation modal appears
- [ ] Can cancel confirmation
- [ ] Guess submission works
- [ ] Correct result displays properly
- [ ] Incorrect result displays properly
- [ ] Already-played state works after refresh

## Features
- [ ] Share copy button works
- [ ] Achievement toast appears on unlock
- [ ] Achievements display in result
- [ ] Leaderboard shows ranks
- [ ] Stats panel shows community data
- [ ] Countdown timer works

## Mobile
- [ ] Responsive layout
- [ ] Touch interactions work
- [ ] No overflow issues

## Error Handling
- [ ] Loading spinner appears
- [ ] Error state with retry works
```

---

## Reporting Issues

If you find bugs during testing:

1. Note the exact steps to reproduce
2. Screenshot any error messages
3. Check browser console (F12 → Console) for errors
4. Note device/browser information

Good luck with your playtest!
