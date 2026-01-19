/**
 * Game state type definitions
 * Based on comment-conspiracy-spec-v2.md Section 2
 */

import type { Explanation, PuzzleStats, ShuffledPuzzle } from './puzzle';
import type { UserProgress } from './user';

// Game states matching the UX flow
export type GameState =
  | 'NEW_USER'          // First-time user, show welcome
  | 'PLAYING'           // Viewing puzzle, no selection
  | 'SELECTED'          // Comment selected, not confirmed
  | 'CONFIRMING'        // Confirmation modal open
  | 'SUBMITTING'        // Guess being processed
  | 'RESULT_CORRECT'    // Correct guess result screen
  | 'RESULT_INCORRECT'  // Incorrect guess result screen
  | 'COMPLETED'         // Already played today
  | 'LOADING'           // Initial load
  | 'ERROR';            // Error state

// Result of a submitted guess
export interface GuessResult {
  wasCorrect: boolean;
  correctIndex: number;      // Which comment was AI (display index)
  guessedIndex: number;      // What user picked
  explanation: Explanation;  // AI tells
  newStreak: number;
  previousStreak: number;
  stats: PuzzleStats;
  userPercentile: number;    // "Top X%"
}

// Full game context for state management
export interface GameContext {
  state: GameState;
  puzzle: ShuffledPuzzle | null;
  selectedIndex: number | null;
  result: GuessResult | null;
  userProgress: UserProgress | null;
  error: string | null;
}

// Actions for game state reducer
export type GameAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; puzzle: ShuffledPuzzle; progress: UserProgress }
  | { type: 'LOAD_ALREADY_PLAYED'; result: GuessResult; progress: UserProgress }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'SELECT_COMMENT'; index: number }
  | { type: 'OPEN_CONFIRM' }
  | { type: 'CANCEL_CONFIRM' }
  | { type: 'SUBMIT_GUESS' }
  | { type: 'GUESS_SUCCESS'; result: GuessResult }
  | { type: 'GUESS_ERROR'; error: string }
  | { type: 'START_GAME' }  // First-time user starts
  | { type: 'RESET' };

// Timer state for countdown to next puzzle
export interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// Share card data
export interface ShareData {
  dayNumber: number;
  wasCorrect: boolean;
  streak: number;
  emoji: string;  // Result emoji grid
}
