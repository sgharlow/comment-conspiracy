/**
 * ResultBanner Component
 * Shows correct/incorrect result with celebratory or consoling messaging
 */

import React from 'react';

export interface ResultBannerProps {
  wasCorrect: boolean;
  correctIndex: number;
  guessedIndex?: number;
}

export function ResultBanner({
  wasCorrect,
  correctIndex,
  guessedIndex,
}: ResultBannerProps): React.ReactElement {
  if (wasCorrect) {
    return (
      <div className="text-center py-6">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-green-600">CORRECT!</h2>
        <p className="text-gray-600 mt-2">
          Comment #{correctIndex + 1} was the AI imposter!
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-3">❌</div>
      <h2 className="text-2xl font-bold text-red-600">NOT QUITE</h2>
      <p className="text-gray-600 mt-2">
        You guessed #{(guessedIndex ?? 0) + 1}, but the AI was #{correctIndex + 1}
      </p>
    </div>
  );
}

export default ResultBanner;
