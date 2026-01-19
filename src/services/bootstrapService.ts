/**
 * Bootstrap service for loading initial puzzle data
 * Implements lazy loading - seeds puzzles on first request if Redis is empty
 */

import type { Puzzle, PuzzleWeek } from '../types';
import { REDIS_KEYS, type RedisContext } from './redisKeys';
import { setPuzzle, addToPuzzleIndex, setCurrentPuzzleId, getPuzzleIndex } from './redisService';

// Import bootstrap puzzle data
// Note: In Devvit, JSON imports may need to be handled differently
// This is bundled at build time
import week01Data from '../data/bootstrap/week01.json';

/**
 * Check if puzzles have been seeded
 */
export async function isPuzzleDataSeeded(ctx: RedisContext): Promise<boolean> {
  const index = await getPuzzleIndex(ctx);
  return index.length > 0;
}

/**
 * Seed all bootstrap puzzles into Redis
 * Only runs if puzzle:index is empty
 */
export async function seedPuzzles(ctx: RedisContext): Promise<{ seeded: boolean; count: number }> {
  // Check if already seeded
  const alreadySeeded = await isPuzzleDataSeeded(ctx);
  if (alreadySeeded) {
    return { seeded: false, count: 0 };
  }

  const weekData = week01Data as PuzzleWeek;
  const puzzles = weekData.puzzles;

  // Store each puzzle
  for (const puzzle of puzzles) {
    await setPuzzle(ctx, puzzle);
    await addToPuzzleIndex(ctx, puzzle.id);
  }

  // Set the first puzzle as current (or today's date if available)
  const today = getTodayDateId();
  const todayPuzzle = puzzles.find(p => p.id === today);
  const currentId = todayPuzzle ? today : puzzles[0].id;
  await setCurrentPuzzleId(ctx, currentId);

  return { seeded: true, count: puzzles.length };
}

/**
 * Ensure puzzles are loaded before accessing
 * Call this at app startup or before first puzzle request
 */
export async function ensurePuzzlesLoaded(ctx: RedisContext): Promise<void> {
  const isSeeded = await isPuzzleDataSeeded(ctx);
  if (!isSeeded) {
    await seedPuzzles(ctx);
  }
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
 * Get list of all available puzzle dates from bootstrap data
 */
export function getBootstrapPuzzleDates(): string[] {
  const weekData = week01Data as PuzzleWeek;
  return weekData.puzzles.map(p => p.id);
}

/**
 * Get a specific puzzle from bootstrap data (for offline access)
 */
export function getBootstrapPuzzle(puzzleId: string): Puzzle | undefined {
  const weekData = week01Data as PuzzleWeek;
  return weekData.puzzles.find(p => p.id === puzzleId);
}
