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
import week10Data from '../data/bootstrap/week10.json';
import week11Data from '../data/bootstrap/week11.json';
import week12Data from '../data/bootstrap/week12.json';
import week13Data from '../data/bootstrap/week13.json';
import week14Data from '../data/bootstrap/week14.json';
import week15Data from '../data/bootstrap/week15.json';
import week16Data from '../data/bootstrap/week16.json';
import week17Data from '../data/bootstrap/week17.json';
import week18Data from '../data/bootstrap/week18.json';
import week19Data from '../data/bootstrap/week19.json';

// All week data combined (126 puzzles total - 19 weeks covering Jan 19 - May 24, 2026)
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
  week10Data,
  week11Data,
  week12Data,
  week13Data,
  week14Data,
  week15Data,
  week16Data,
  week17Data,
  week18Data,
  week19Data,
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
  } else {
    // Check for new puzzles that need to be added incrementally
    console.log('[Bootstrap] Checking for new puzzles to add...');
    await seedNewPuzzles(ctx);
  }
  console.log('[Bootstrap] ensurePuzzlesLoaded done');
}

/**
 * Seed only NEW puzzles that aren't already in Redis
 * This handles incremental updates when new week files are added
 */
export async function seedNewPuzzles(ctx: RedisContext): Promise<{ added: number }> {
  const existingIndex = await getPuzzleIndex(ctx);
  const existingSet = new Set(existingIndex);

  // Collect all puzzles from bootstrap data
  const allPuzzles: Puzzle[] = [];
  for (const weekData of allWeeksData) {
    allPuzzles.push(...weekData.puzzles);
  }

  // Find puzzles that aren't in Redis yet
  const newPuzzles = allPuzzles.filter(p => !existingSet.has(p.id));

  if (newPuzzles.length === 0) {
    console.log('[Bootstrap] No new puzzles to add');
    return { added: 0 };
  }

  console.log(`[Bootstrap] Adding ${newPuzzles.length} new puzzles...`);

  // Add new puzzles to Redis
  for (const puzzle of newPuzzles) {
    await setPuzzle(ctx, puzzle);
    await addToPuzzleIndex(ctx, puzzle.id);
  }

  console.log(`[Bootstrap] Added ${newPuzzles.length} new puzzles`);
  return { added: newPuzzles.length };
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
