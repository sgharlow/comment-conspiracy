/**
 * GameScreen Component
 * Main game screen showing the daily puzzle with comments to choose from
 */

import React from 'react';
import type { ShuffledPuzzle, DisplayComment } from '../../types';
import { CommentCard } from '../game/CommentCard';

export interface GameScreenProps {
  puzzle: ShuffledPuzzle;
  selectedIndex: number | null;
  onSelectComment: (index: number) => void;
  onConfirmGuess: () => void;
  disabled?: boolean;
}

/**
 * Format difficulty for display
 */
function formatDifficulty(difficulty: string): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

/**
 * Format day of week for display
 */
function formatDayOfWeek(day: string): string {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

/**
 * GameScreen component
 */
export function GameScreen({
  puzzle,
  selectedIndex,
  onSelectComment,
  onConfirmGuess,
  disabled = false,
}: GameScreenProps): React.ReactElement {
  const handleSelectComment = (id: string) => {
    const index = puzzle.comments.findIndex(c => c.id === id);
    if (index !== -1) {
      onSelectComment(index);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Day {puzzle.dayNumber} • {formatDayOfWeek(puzzle.dayOfWeek)} • {formatDifficulty(puzzle.difficulty)}
        </div>
        <div className="mt-1 h-1 w-20 sm:w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
      </div>

      {/* Prompt Card */}
      <div className="bg-gray-100 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {puzzle.prompt.source}
        </div>
        <div className="text-base sm:text-lg font-medium text-gray-900">
          "{puzzle.prompt.text}"
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 space-y-3 sm:space-y-4 mb-4 sm:mb-6 overflow-y-auto -mx-1 px-1">
        {puzzle.comments.map((comment: DisplayComment, index: number) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isSelected={selectedIndex === index}
            isRevealed={false}
            onSelect={handleSelectComment}
            disabled={disabled}
          />
        ))}
      </div>

      {/* Warning Text */}
      <div className="text-center text-xs sm:text-sm text-amber-600 font-medium mb-3 sm:mb-4">
        Choose carefully - you only get one guess!
      </div>

      {/* Confirm Button (shows when comment is selected) */}
      {selectedIndex !== null && (
        <button
          onClick={onConfirmGuess}
          disabled={disabled}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 text-white text-base sm:text-lg font-bold rounded-xl transition-colors duration-200 shadow-lg touch-manipulation"
        >
          Lock In Your Answer
        </button>
      )}
    </div>
  );
}

export default GameScreen;
