/**
 * ResultScreen Component
 * Shows the result after a user submits their guess
 */

import React from 'react';
import type { GuessResult, ShuffledPuzzle } from '../../types';
import { ResultBanner } from '../results/ResultBanner';
import { AIExplanation } from '../results/AIExplanation';
import { StatsPanel } from '../results/StatsPanel';

export interface ResultScreenProps {
  result: GuessResult;
  puzzle: ShuffledPuzzle;
  onViewBreakdown?: () => void;
  onJoinDiscussion?: () => void;
}

export function ResultScreen({
  result,
  puzzle,
  onViewBreakdown,
  onJoinDiscussion,
}: ResultScreenProps): React.ReactElement {
  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto px-4 py-6 overflow-y-auto">
      {/* Result Banner */}
      <ResultBanner
        wasCorrect={result.wasCorrect}
        correctIndex={result.correctIndex}
        guessedIndex={result.guessedIndex}
      />

      {/* AI Explanation */}
      <div className="mb-6">
        <AIExplanation
          explanation={result.explanation}
          wasCorrect={result.wasCorrect}
        />
      </div>

      {/* Stats Panel */}
      <div className="mb-6">
        <StatsPanel
          stats={result.stats}
          streak={result.newStreak}
          previousStreak={result.previousStreak}
          wasCorrect={result.wasCorrect}
          userPercentile={result.userPercentile}
        />
      </div>

      {/* Share Card Placeholder */}
      <div className="bg-gray-800 text-white rounded-xl p-4 mb-6 text-center">
        <div className="text-lg font-bold mb-1">
          Comment Conspiracy Day {puzzle.dayNumber}
        </div>
        <div className="text-2xl mb-2">
          {result.wasCorrect ? '✅' : '❌'} {result.wasCorrect ? '1/1' : '0/1'}
        </div>
        {result.newStreak > 0 && (
          <div className="text-sm">
            🔥 {result.newStreak}-day streak
          </div>
        )}
        <div className="flex gap-2 justify-center mt-3">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
            📋 Copy
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
            🔗 Share
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {onViewBreakdown && (
          <button
            onClick={onViewBreakdown}
            className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
          >
            View Full Breakdown
          </button>
        )}
        {onJoinDiscussion && (
          <button
            onClick={onJoinDiscussion}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>💬</span>
            <span>Join Discussion</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ResultScreen;
