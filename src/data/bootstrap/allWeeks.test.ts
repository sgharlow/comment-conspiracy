/**
 * Full-inventory validation across ALL week*.json bootstrap files.
 * Complements puzzleData.test.ts (which only imports weeks 1-4) by validating
 * every shipped puzzle — including weeks added after launch.
 * Reads files from disk so it auto-covers new weeks with no edits.
 */
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const DOW = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const weekdayOf = (id: string): string => DOW[new Date(id + 'T00:00:00Z').getUTCDay()];

const files = fs.readdirSync(dir).filter((f) => /^week\d+\.json$/.test(f)).sort();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const weeks: any[] = files.map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const puzzles: any[] = weeks.flatMap((w) => w.puzzles);

describe('All weeks — full puzzle inventory', () => {
  it('loads at least the launch weeks', () => {
    expect(files.length).toBeGreaterThanOrEqual(19);
    expect(puzzles.length).toBeGreaterThanOrEqual(126);
  });

  it('has continuous dayNumbers 1..N (no gaps, no dupes)', () => {
    const dns = puzzles.map((p) => p.dayNumber).sort((a: number, b: number) => a - b);
    dns.forEach((n: number, i: number) => expect(n).toBe(i + 1));
  });

  it('has unique puzzle ids', () => {
    const ids = puzzles.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has sequential week numbers 1..N', () => {
    const ws = weeks.map((w) => w.week).sort((a: number, b: number) => a - b);
    ws.forEach((w: number, i: number) => expect(w).toBe(i + 1));
  });

  puzzles.forEach((p) => {
    describe(`puzzle ${p.id}`, () => {
      it('id is YYYY-MM-DD', () => expect(p.id).toMatch(/^\d{4}-\d{2}-\d{2}$/));
      it('dayOfWeek matches the calendar date', () => expect(p.dayOfWeek).toBe(weekdayOf(p.id)));
      it('contains no leftover placeholders', () => expect(JSON.stringify(p)).not.toContain('__TODO'));
      it('saturday puzzles are expert', () => {
        if (p.dayOfWeek === 'saturday') expect(p.difficulty).toBe('expert');
      });
      it('monday/tuesday are easy or medium', () => {
        if (p.dayOfWeek === 'monday' || p.dayOfWeek === 'tuesday') {
          expect(['easy', 'medium']).toContain(p.difficulty);
        }
      });
      it('metadata.reviewed is true', () => expect(p.metadata.reviewed).toBe(true));
      it('has exactly 5 comments with exactly 1 AI and a matching aiCommentIndex', () => {
        expect(p.comments.length).toBe(5);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(p.comments.filter((c: any) => c.isAI).length).toBe(1);
        expect(p.comments[p.aiCommentIndex].isAI).toBe(true);
        expect(new Set(p.comments.map((c: { id: string }) => c.id)).size).toBe(5);
      });
      it('prompt.source is a subreddit', () => expect(p.prompt.source).toMatch(/^r\//));
    });
  });
});
