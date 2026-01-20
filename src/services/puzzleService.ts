/**
 * Puzzle Service
 * Main interface for puzzle operations - fetching, shuffling, and submitting guesses
 */

import type {
  Puzzle,
  ShuffledPuzzle,
  DisplayComment,
  GuessResult,
  PuzzleStats,
  Difficulty,
} from '../types';
import type { RedisContext } from './redisKeys';
import {
  getPuzzle,
  getCurrentPuzzleId,
  setCurrentPuzzleId,
  getUserGuess as getStoredUserGuess,
  setUserGuess,
  getUserProgress,
  setUserProgress,
  recordGuess,
  getPuzzleStats,
  updateStreakLeaderboard,
  updateAccuracyLeaderboard,
} from './redisService';
import { ensurePuzzlesLoaded } from './bootstrapService';
import { checkAndAwardAchievements } from './achievementService';
import type { UserGuess } from '../types/user';

/**
 * Simple hash function for deterministic shuffling
 * Creates a seed from userId + puzzleId
 */
function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Seeded random number generator (mulberry32)
 */
function seededRandom(seed: number): () => number {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates shuffle with seeded random
 */
function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  const random = seededRandom(seed);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Get today's date in puzzle ID format (YYYY-MM-DD)
 */
function getTodayDateId(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Check if two dates are the same day (UTC)
 */
function isSameDay(date1: string, date2: string): boolean {
  return date1 === date2;
}

/**
 * Check if dates are consecutive (UTC)
 */
function areConsecutiveDays(earlier: string, later: string): boolean {
  const d1 = new Date(earlier + 'T00:00:00Z');
  const d2 = new Date(later + 'T00:00:00Z');
  const diffMs = d2.getTime() - d1.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays === 1;
}

/**
 * Convert a Puzzle to ShuffledPuzzle for a specific user
 * Comments are shuffled deterministically based on userId + puzzleId
 */
function shufflePuzzleForUser(puzzle: Puzzle, userId: string): ShuffledPuzzle {
  const seed = hashSeed(`${userId}:${puzzle.id}`);

  // Create indexed comments before shuffling
  const indexedComments = puzzle.comments.map((comment, originalIndex) => ({
    ...comment,
    originalIndex,
  }));

  // Shuffle the comments
  const shuffledComments = shuffleArray(indexedComments, seed);

  // Convert to DisplayComment format
  const displayComments: DisplayComment[] = shuffledComments.map((comment, displayIndex) => ({
    id: comment.id,
    displayIndex,
    username: comment.username,
    text: comment.text,
  }));

  return {
    id: puzzle.id,
    dayNumber: puzzle.dayNumber,
    difficulty: puzzle.difficulty,
    dayOfWeek: puzzle.dayOfWeek,
    category: puzzle.category,
    prompt: puzzle.prompt,
    comments: displayComments,
  };
}

/**
 * Get the shuffled AI index for a user's view of the puzzle
 */
function getShuffledAIIndex(puzzle: Puzzle, userId: string): number {
  const seed = hashSeed(`${userId}:${puzzle.id}`);

  const indexedComments = puzzle.comments.map((comment, originalIndex) => ({
    originalIndex,
  }));

  const shuffledComments = shuffleArray(indexedComments, seed);

  // Find where the AI comment ended up after shuffling
  return shuffledComments.findIndex(c => c.originalIndex === puzzle.aiCommentIndex);
}

/**
 * Get today's puzzle for a user
 * Ensures puzzles are loaded, returns shuffled puzzle
 */
export async function getTodaysPuzzle(
  ctx: RedisContext,
  userId: string
): Promise<ShuffledPuzzle | null> {
  // Ensure puzzles are seeded
  await ensurePuzzlesLoaded(ctx);

  // Get current puzzle ID
  const puzzleId = await getCurrentPuzzleId(ctx);
  if (!puzzleId) {
    return null;
  }

  // Get the puzzle
  const puzzle = await getPuzzle(ctx, puzzleId);
  if (!puzzle) {
    return null;
  }

  // Shuffle for this user
  return shufflePuzzleForUser(puzzle, userId);
}

/**
 * Get puzzle by date for a user
 */
export async function getPuzzleByDate(
  ctx: RedisContext,
  date: string,
  userId: string
): Promise<ShuffledPuzzle | null> {
  await ensurePuzzlesLoaded(ctx);

  const puzzle = await getPuzzle(ctx, date);
  if (!puzzle) {
    return null;
  }

  return shufflePuzzleForUser(puzzle, userId);
}

/**
 * Get user's existing guess for a puzzle
 */
export async function getUserGuess(
  ctx: RedisContext,
  userId: string,
  puzzleId: string
): Promise<UserGuess | null> {
  return await getStoredUserGuess(ctx, userId, puzzleId);
}

/**
 * Check if user has already played today
 */
export async function hasUserPlayedToday(
  ctx: RedisContext,
  userId: string
): Promise<boolean> {
  await ensurePuzzlesLoaded(ctx);

  const puzzleId = await getCurrentPuzzleId(ctx);
  if (!puzzleId) {
    return false;
  }

  const guess = await getStoredUserGuess(ctx, userId, puzzleId);
  return guess !== null;
}

/**
 * Calculate user's percentile based on their result
 */
function calculatePercentile(
  wasCorrect: boolean,
  stats: PuzzleStats
): number {
  if (stats.totalPlayers === 0) {
    return wasCorrect ? 1 : 100;
  }

  if (wasCorrect) {
    // Percentile of people who got it correct (lower is better)
    // If 30% got it right, correct guessers are in top 30%
    return Math.max(1, Math.round(stats.correctPercentage));
  } else {
    // Incorrect guessers are in the remaining percentage
    return Math.max(1, Math.round(100 - stats.correctPercentage + 1));
  }
}

/**
 * Submit a guess for a puzzle
 * Returns full result including stats and streak info
 * Idempotent - second call returns cached result
 */
export async function submitGuess(
  ctx: RedisContext,
  userId: string,
  puzzleId: string,
  guessIndex: number
): Promise<GuessResult> {
  // Check for existing guess (idempotent)
  const existingGuess = await getStoredUserGuess(ctx, userId, puzzleId);
  if (existingGuess) {
    // Return reconstructed result from stored guess
    const puzzle = await getPuzzle(ctx, puzzleId);
    if (!puzzle) {
      throw new Error(`Puzzle not found: ${puzzleId}`);
    }

    const shuffledAIIndex = getShuffledAIIndex(puzzle, userId);
    const stats = await getPuzzleStats(ctx, puzzleId);
    const progress = await getUserProgress(ctx, userId);

    return {
      wasCorrect: existingGuess.wasCorrect,
      correctIndex: shuffledAIIndex,
      guessedIndex: existingGuess.guessedIndex,
      explanation: puzzle.explanation,
      newStreak: progress.currentStreak,
      previousStreak: progress.currentStreak, // Same since already recorded
      stats,
      userPercentile: calculatePercentile(existingGuess.wasCorrect, stats),
      newlyUnlockedAchievements: [], // Already recorded, no new achievements
    };
  }

  // Get puzzle data
  const puzzle = await getPuzzle(ctx, puzzleId);
  if (!puzzle) {
    throw new Error(`Puzzle not found: ${puzzleId}`);
  }

  // Get shuffled AI index for this user
  const shuffledAIIndex = getShuffledAIIndex(puzzle, userId);
  const wasCorrect = guessIndex === shuffledAIIndex;

  // Get current user progress
  const progress = await getUserProgress(ctx, userId);
  const previousStreak = progress.currentStreak;
  const todayDate = getTodayDateId();

  // Calculate new streak
  let newStreak: number;
  if (wasCorrect) {
    // Check if continuing streak or starting new one
    if (progress.lastPlayed && areConsecutiveDays(progress.lastPlayed, todayDate)) {
      newStreak = previousStreak + 1;
    } else if (progress.lastPlayed && isSameDay(progress.lastPlayed, todayDate)) {
      // Same day - shouldn't happen but handle gracefully
      newStreak = previousStreak;
    } else {
      // Start new streak
      newStreak = 1;
    }
  } else {
    // Wrong answer breaks streak
    newStreak = 0;
  }

  // Update user progress
  const updatedProgress = {
    ...progress,
    currentStreak: newStreak,
    longestStreak: Math.max(progress.longestStreak, newStreak),
    lastPlayed: todayDate,
    totalPlayed: progress.totalPlayed + 1,
    totalCorrect: progress.totalCorrect + (wasCorrect ? 1 : 0),
    byDifficulty: {
      ...progress.byDifficulty,
      [puzzle.difficulty]: [
        progress.byDifficulty[puzzle.difficulty][0] + (wasCorrect ? 1 : 0),
        progress.byDifficulty[puzzle.difficulty][1] + 1,
      ] as [number, number],
    },
  };

  // Store guess
  const userGuess: UserGuess = {
    puzzleId,
    guessedIndex: guessIndex,
    wasCorrect,
    timestamp: Date.now(),
  };

  // Persist all updates
  await setUserGuess(ctx, userId, userGuess);
  await setUserProgress(ctx, updatedProgress);
  await recordGuess(ctx, puzzleId, guessIndex, wasCorrect);
  await updateStreakLeaderboard(ctx, userId, newStreak);
  await updateAccuracyLeaderboard(ctx, userId, updatedProgress.totalCorrect, updatedProgress.totalPlayed);

  // Check and award achievements
  const newlyUnlockedAchievements = await checkAndAwardAchievements(
    ctx,
    userId,
    updatedProgress,
    wasCorrect,
    puzzle.difficulty
  );

  // Get updated stats
  const stats = await getPuzzleStats(ctx, puzzleId);

  return {
    wasCorrect,
    correctIndex: shuffledAIIndex,
    guessedIndex: guessIndex,
    explanation: puzzle.explanation,
    newStreak,
    previousStreak,
    stats,
    userPercentile: calculatePercentile(wasCorrect, stats),
    newlyUnlockedAchievements,
  };
}

/**
 * Get user's previous result for a puzzle (if they've played)
 * Used for returning users who already played today
 */
export async function getPreviousResult(
  ctx: RedisContext,
  userId: string,
  puzzleId: string
): Promise<GuessResult | null> {
  const existingGuess = await getStoredUserGuess(ctx, userId, puzzleId);
  if (!existingGuess) {
    return null;
  }

  const puzzle = await getPuzzle(ctx, puzzleId);
  if (!puzzle) {
    return null;
  }

  const shuffledAIIndex = getShuffledAIIndex(puzzle, userId);
  const stats = await getPuzzleStats(ctx, puzzleId);
  const progress = await getUserProgress(ctx, userId);

  return {
    wasCorrect: existingGuess.wasCorrect,
    correctIndex: shuffledAIIndex,
    guessedIndex: existingGuess.guessedIndex,
    explanation: puzzle.explanation,
    newStreak: progress.currentStreak,
    previousStreak: progress.currentStreak,
    stats,
    userPercentile: calculatePercentile(existingGuess.wasCorrect, stats),
    newlyUnlockedAchievements: [], // Previously played, no new achievements
  };
}

/**
 * Set today's puzzle (used by scheduler)
 */
export async function setTodaysPuzzle(
  ctx: RedisContext,
  puzzleId: string
): Promise<void> {
  await setCurrentPuzzleId(ctx, puzzleId);
}
