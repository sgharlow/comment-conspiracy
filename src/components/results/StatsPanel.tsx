/**
 * StatsPanel Component
 * Shows statistics about the puzzle and user performance
 */

import React from 'react';
import type { PuzzleStats } from '../../types';

export interface StatsPanelProps {
  stats: PuzzleStats;
  streak: number;
  previousStreak?: number;
  wasCorrect: boolean;
  userPercentile?: number;
}

export function StatsPanel({
  stats,
  streak,
  previousStreak,
  wasCorrect,
  userPercentile,
}: StatsPanelProps): React.ReactElement {
  const streakDisplay = wasCorrect && streak >= 3;
  const streakReset = !wasCorrect && (previousStreak ?? 0) > 0;

  return (
    <div className="bg-gray-100 rounded-xl p-4 space-y-4">
      {/* Streak Display */}
      <div className="flex items-center justify-between">
        <span className="text-gray-600 font-medium">Streak:</span>
        <span className="font-bold text-lg">
          {streakDisplay && <span className="mr-1">🔥</span>}
          {streak} {streak === 1 ? 'day' : 'days'}
          {streakReset && (
            <span className="text-red-500 text-sm ml-2">
              (reset from {previousStreak})
            </span>
          )}
        </span>
      </div>

      {/* Percentile */}
      {userPercentile !== undefined && wasCorrect && (
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Your ranking:</span>
          <span className="font-bold text-green-600">
            Top {Math.round(userPercentile)}%
          </span>
        </div>
      )}

      {/* Community Stats */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Today's Stats
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Players:</span>
          <span className="font-medium">{stats.totalPlayers.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Got it right:</span>
          <span className="font-medium text-green-600">
            {stats.correctPercentage.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Guess Distribution */}
      {stats.guessDistribution.some(count => count > 0) && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Guess Distribution
          </h4>
          <div className="space-y-1">
            {stats.guessDistribution.map((count, index) => {
              const total = stats.totalPlayers || 1;
              const percentage = (count / total) * 100;
              return (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-6 text-sm text-gray-500">#{index + 1}</span>
                  <div className="flex-1 h-4 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm text-gray-600 text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;
