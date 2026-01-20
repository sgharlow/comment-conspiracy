/**
 * ResultScreen Component
 * Shows the result after a user submits their guess
 */

import React from 'react';
import type { GuessResult, ShuffledPuzzle } from '../../types';
import { ResultBanner } from '../results/ResultBanner';
import { AIExplanation } from '../results/AIExplanation';
import { StatsPanel } from '../results/StatsPanel';
import { ShareCard } from '../results/ShareCard';
import { AchievementList } from '../results/AchievementToast';

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

      {/* Achievements Unlocked */}
      {result.newlyUnlockedAchievements && result.newlyUnlockedAchievements.length > 0 && (
        <div className="mb-6">
          <AchievementList achievements={result.newlyUnlockedAchievements} />
        </div>
      )}

      {/* Share Card */}
      <div className="mb-6">
        <ShareCard
          dayNumber={puzzle.dayNumber}
          wasCorrect={result.wasCorrect}
          streak={result.newStreak}
        />
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
