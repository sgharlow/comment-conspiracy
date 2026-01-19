/**
 * CommentCard Component
 * Displays a single comment with username and visual state feedback
 */

import React from 'react';
import type { DisplayComment } from '../../types';

export interface CommentCardProps {
  comment: DisplayComment;
  isSelected: boolean;
  isRevealed: boolean;
  isAI?: boolean;           // Only set after reveal
  isCorrectGuess?: boolean; // User's guess was this card and it was correct
  onSelect: (id: string) => void;
  disabled?: boolean;
}

/**
 * Visual state calculation
 */
type VisualState = 'default' | 'selected' | 'revealed_ai' | 'revealed_human' | 'disabled';

function getVisualState(props: CommentCardProps): VisualState {
  if (props.disabled) return 'disabled';
  if (props.isRevealed) {
    return props.isAI ? 'revealed_ai' : 'revealed_human';
  }
  if (props.isSelected) return 'selected';
  return 'default';
}

/**
 * Style classes for each visual state (Tailwind-compatible)
 */
const stateStyles: Record<VisualState, string> = {
  default: 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-sm cursor-pointer',
  selected: 'border-blue-500 bg-blue-50 shadow-md cursor-pointer',
  revealed_ai: 'border-red-500 bg-red-50',
  revealed_human: 'border-gray-200 bg-gray-50 opacity-75',
  disabled: 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed',
};

/**
 * CommentCard component
 */
export function CommentCard({
  comment,
  isSelected,
  isRevealed,
  isAI,
  isCorrectGuess,
  onSelect,
  disabled = false,
}: CommentCardProps): React.ReactElement {
  const visualState = getVisualState({ comment, isSelected, isRevealed, isAI, onSelect, disabled });
  const baseClasses = 'relative p-4 rounded-lg border-2 transition-all duration-200 min-h-[88px]';
  const stateClasses = stateStyles[visualState];

  const handleClick = () => {
    if (!disabled && !isRevealed) {
      onSelect(comment.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled || isRevealed ? -1 : 0}
      className={`${baseClasses} ${stateClasses}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-pressed={isSelected}
      aria-disabled={disabled}
      aria-label={`Comment ${comment.displayIndex + 1} by ${comment.username}`}
    >
      {/* Comment number badge */}
      <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gray-700 text-white text-sm font-bold flex items-center justify-center">
        {comment.displayIndex + 1}
      </div>

      {/* AI badge (shown after reveal) */}
      {isRevealed && isAI && (
        <div className="absolute -top-3 -right-3 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center gap-1">
          <span>🤖</span>
          <span>AI</span>
        </div>
      )}

      {/* Correct guess indicator */}
      {isRevealed && isCorrectGuess && (
        <div className="absolute -top-3 right-8 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
          ✓ Your guess
        </div>
      )}

      {/* Username */}
      <div className="text-sm font-medium text-gray-500 mb-2">
        u/{comment.username}
      </div>

      {/* Comment text */}
      <div className="text-base text-gray-900 leading-relaxed">
        {comment.text}
      </div>

      {/* Selection indicator */}
      {isSelected && !isRevealed && (
        <div className="absolute bottom-2 right-2 text-blue-500 text-sm font-medium">
          Selected ✓
        </div>
      )}
    </div>
  );
}

export default CommentCard;
