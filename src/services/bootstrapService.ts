/**
 * Bootstrap service for loading initial puzzle data
 * Implements lazy loading - seeds puzzles on first request if Redis is empty
 */

import type { Puzzle, PuzzleWeek } from '../types';
import type { RedisContext } from './redisKeys';
import { setPuzzle, addToPuzzleIndex, setCurrentPuzzleId, getPuzzleIndex } from './redisService';

// Import bootstrap puzzle data
// Note: In Devvit, JSON imports may need to be handled differently
// This is bundled at build time
import week01Data from '../data/bootstrap/week01.json';
import week02Data from '../data/bootstrap/week02.json';
import week03Data from '../data/bootstrap/week03.json';
import week04Data from '../data/bootstrap/week04.json';
import week05Data from '../data/bootstrap/week05.json';
import week06Data from '../data/bootstrap/week06.json';
import week07Data from '../data/bootstrap/week07.json';
import week08Data from '../data/bootstrap/week08.json';
import week09Data from '../data/bootstrap/week09.json';

// All week data combined (60 puzzles total - approximately 8.5 weeks of content)
const allWeeksData = [
  week01Data,
  week02Data,
  week03Data,
  week04Data,
  week05Data,
  week06Data,
  week07Data,
  week08Data,
  week09Data,
] as PuzzleWeek[];

/**
 * Check if puzzles have been seeded
 */
export async function isPuzzleDataSeeded(ctx: RedisContext): Promise<boolean> {
  console.log('[Bootstrap] isPuzzleDataSeeded: calling getPuzzleIndex');
  const index = await getPuzzleIndex(ctx);
  console.log('[Bootstrap] isPuzzleDataSeeded: index length =', index.length);
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

  // Collect all puzzles from all weeks
  const allPuzzles: Puzzle[] = [];
  for (const weekData of allWeeksData) {
    allPuzzles.push(...weekData.puzzles);
  }

  // Store each puzzle
  for (const puzzle of allPuzzles) {
    await setPuzzle(ctx, puzzle);
    await addToPuzzleIndex(ctx, puzzle.id);
  }

  // Set the first puzzle as current (or today's date if available)
  const today = getTodayDateId();
  const todayPuzzle = allPuzzles.find(p => p.id === today);
  const currentId = todayPuzzle ? today : allPuzzles[0].id;
  await setCurrentPuzzleId(ctx, currentId);

  return { seeded: true, count: allPuzzles.length };
}

/**
 * Ensure puzzles are loaded before accessing
 * Call this at app startup or before first puzzle request
 */
export async function ensurePuzzlesLoaded(ctx: RedisContext): Promise<void> {
  console.log('[Bootstrap] ensurePuzzlesLoaded called');
  console.log('[Bootstrap] Checking if seeded...');
  const isSeeded = await isPuzzleDataSeeded(ctx);
  console.log('[Bootstrap] isSeeded:', isSeeded);
  if (!isSeeded) {
    console.log('[Bootstrap] Seeding puzzles...');
    await seedPuzzles(ctx);
    console.log('[Bootstrap] Seeding complete');
  }
  console.log('[Bootstrap] ensurePuzzlesLoaded done');
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
  const allDates: string[] = [];
  for (const weekData of allWeeksData) {
    allDates.push(...weekData.puzzles.map(p => p.id));
  }
  return allDates;
}

/**
 * Get a specific puzzle from bootstrap data (for offline access)
 */
export function getBootstrapPuzzle(puzzleId: string): Puzzle | undefined {
  for (const weekData of allWeeksData) {
    const puzzle = weekData.puzzles.find(p => p.id === puzzleId);
    if (puzzle) return puzzle;
  }
  return undefined;
}

/**
 * Get total number of puzzles available
 */
export function getTotalPuzzleCount(): number {
  return allWeeksData.reduce((sum, week) => sum + week.puzzles.length, 0);
}
