# Plan

## Current Phase
Phase 1: Foundation & Setup

## Phases

### Phase 1: Foundation & Setup
- [ ] Initialize Devvit project structure
- [ ] Configure TypeScript and build system
- [ ] Create core type definitions (Puzzle, UserProgress, GameState)
- [ ] Set up Redis key schemas and service layer
- [ ] Load bootstrap puzzles from JSON

### Phase 2: Core Game UI
- [ ] Build game state machine (NEW_USER → PLAYING → CONFIRMING → RESULT → COMPLETED)
- [ ] Create CommentCard component
- [ ] Create GameScreen with puzzle display
- [ ] Create ConfirmModal for guess submission
- [ ] Create ResultScreen (correct/incorrect variants)
- [ ] Create CompletedScreen (already played today)

### Phase 3: Backend Services
- [ ] Implement puzzleService (fetch today's puzzle, submit guess)
- [ ] Implement userService (get/update progress, streaks)
- [ ] Implement statsService (record guesses, aggregate stats)
- [ ] Wire up Redis persistence for all services

### Phase 4: Scheduler & Daily Posting
- [ ] Create scheduler job for daily puzzle posting
- [ ] Implement puzzle rotation logic
- [ ] Test midnight UTC posting
- [ ] Add health check for missing puzzles

### Phase 5: Polish & Mobile UX
- [ ] Mobile-responsive styling with Tailwind
- [ ] Touch-friendly tap targets (44px minimum)
- [ ] Share card generation
- [ ] Loading states and error handling
- [ ] Final UI polish pass

### Phase 6: Deploy & Demo
- [ ] Deploy to r/CommentConspiracy
- [ ] Verify live puzzle posting
- [ ] Create demo content and screenshots
- [ ] Prepare Devpost submission

## Notes
- Hackathon deadline: Feb 12, 2026 at 6:00 PM PST
- Minimum 7 puzzles needed for demo period
- Focus on judge experience: smooth, polished, demonstrable
- Keep scope tight — better to have excellent core than mediocre extras
