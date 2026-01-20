/**
 * CompletedScreen Component
 * Shown when user has already played today
 */

import React from 'react';
import type { GuessResult, ShuffledPuzzle, UserProgress, LeaderboardRankData } from '../../types';
import { StatsPanel } from '../results/StatsPanel';
import { Timer } from '../shared/Timer';
import { LeaderboardPanel } from '../results/Leaderboard';

export interface CompletedScreenProps {
  result: GuessResult;
  puzzle: ShuffledPuzzle;
  userProgress?: UserProgress;
  streakRank?: LeaderboardRankData | null;
  accuracyRank?: LeaderboardRankData | null;
  onViewBreakdown?: () => void;
  onJoinDiscussion?: () => void;
}

export function CompletedScreen({
  result,
  puzzle,
  userProgress,
  streakRank,
  accuracyRank,
  onViewBreakdown,
  onJoinDiscussion,
}: CompletedScreenProps): React.ReactElement {
  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto px-4 py-6 overflow-y-auto">
      {/* Header Banner */}
      <div className="text-center py-6 bg-gray-100 rounded-xl mb-6">
        <div className="text-2xl mb-2">✓</div>
        <h2 className="text-xl font-bold text-gray-900">YOU'VE PLAYED TODAY</h2>
      </div>

      {/* User's Result */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Your answer:</span>
          <span className="font-bold">
            #{result.guessedIndex + 1}{' '}
            {result.wasCorrect ? (
              <span className="text-green-600">(Correct ✓)</span>
            ) : (
              <span className="text-red-600">(Incorrect ✗)</span>
            )}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Streak:</span>
          <span className="font-bold">
            {result.newStreak > 0 && result.newStreak >= 3 && '🔥 '}
            {result.newStreak} {result.newStreak === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>

      {/* Leaderboard Rankings */}
      {userProgress && (
        <div className="mb-6">
          <LeaderboardPanel
            streakRank={streakRank ?? null}
            accuracyRank={accuracyRank ?? null}
            progress={userProgress}
          />
        </div>
      )}

      {/* Community Stats */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Today's Community Stats
        </h3>
        <StatsPanel
          stats={result.stats}
          streak={result.newStreak}
          wasCorrect={result.wasCorrect}
          userPercentile={result.userPercentile}
        />
      </div>

      {/* Countdown Timer */}
      <div className="bg-gray-900 text-white rounded-xl p-6 mb-6">
        <Timer className="text-white" />
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

export default CompletedScreen;
