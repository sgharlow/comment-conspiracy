/**
 * Message types for Devvit <-> WebView communication
 */

import type { ShuffledPuzzle, GuessResult, UserProgress } from './index';

// Messages from WebView to Devvit
export type WebViewToDevvitMessage =
  | { type: 'INIT' }
  | { type: 'SUBMIT_GUESS'; guessIndex: number };

// Messages from Devvit to WebView
export type DevvitToWebViewMessage =
  | { type: 'INIT_RESPONSE'; data: InitData }
  | { type: 'GUESS_RESPONSE'; result: GuessResult }
  | { type: 'ERROR'; error: string };

// Initial data sent to WebView on load
export interface InitData {
  userId: string;
  puzzle: ShuffledPuzzle | null;
  userProgress: UserProgress;
  previousResult: GuessResult | null; // If already played today
}
