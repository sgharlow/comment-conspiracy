/**
 * Puzzle-related type definitions
 * Based on comment-conspiracy-spec-v2.md Section 10
 */

// Difficulty levels matching day-of-week progression
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

// Day of week for puzzle scheduling
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// Content categories
export type Category = 'life' | 'entertainment' | 'tech' | 'food' | 'hobbies' | 'relationships' | 'work' | 'misc';

// Prompt shown to players
export interface Prompt {
  text: string;
  source: string;  // e.g., "r/AskReddit"
}

// Comment as stored in puzzle JSON (with isAI flag)
export interface Comment {
  id: string;
  username: string;
  text: string;
  isAI: boolean;
}

// AI explanation details
export interface Explanation {
  aiTells: string[];      // Why the AI comment is detectable
  humanTells: string[];   // Why the human comments are authentic
  difficulty_note?: string;
}

// Puzzle metadata
export interface PuzzleMetadata {
  createdAt: string;
  createdBy: string;
  reviewed: boolean;
}

// Full puzzle as stored in JSON/Redis
export interface Puzzle {
  id: string;              // Date format: "2026-01-20"
  dayNumber: number;
  difficulty: Difficulty;
  dayOfWeek: DayOfWeek;
  category: Category;
  prompt: Prompt;
  comments: Comment[];     // Always 5 comments
  aiCommentIndex: number;  // Index of AI comment (0-4)
  explanation: Explanation;
  metadata: PuzzleMetadata;
}

// Comment as displayed to user (no isAI flag exposed)
export interface DisplayComment {
  id: string;
  displayIndex: number;    // 0-4 shuffled position shown to user
  username: string;
  text: string;
}

// Puzzle as sent to client (AI index hidden until guess)
export interface ShuffledPuzzle {
  id: string;
  dayNumber: number;
  difficulty: Difficulty;
  dayOfWeek: DayOfWeek;
  category: Category;
  prompt: Prompt;
  comments: DisplayComment[];  // Shuffled order, no isAI exposed
}

// Puzzle with reveal info (after guess)
export interface RevealedPuzzle extends ShuffledPuzzle {
  aiCommentIndex: number;      // Which comment was AI
  explanation: Explanation;
}

// Stats for a single puzzle
export interface PuzzleStats {
  totalPlayers: number;
  correctCount: number;
  correctPercentage: number;
  guessDistribution: number[];  // Count for each comment index [0-4]
  averageTimeMs?: number;
}

// Week of puzzles (bootstrap data format)
export interface PuzzleWeek {
  week: number;
  startDate: string;
  puzzles: Puzzle[];
}
