/**
 * WelcomeScreen Component
 * Shown to first-time users before they start playing
 */

import React from 'react';

export interface WelcomeScreenProps {
  onStartGame: () => void;
}

export function WelcomeScreen({ onStartGame }: WelcomeScreenProps): React.ReactElement {
  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto px-4 py-8 justify-center">
      {/* Logo / Title */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Comment Conspiracy
        </h1>
        <p className="text-lg text-gray-600">
          One of these comments isn't human.
        </p>
      </div>

      {/* How to Play */}
      <div className="bg-gray-100 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Play</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <p className="text-gray-700">
                Read all 5 comments carefully
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <p className="text-gray-700">
                Spot the one that was written by AI
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <p className="text-gray-700">
                Build your streak with daily puzzles
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="text-center text-sm text-gray-500 mb-8">
        <p>One guess per day • New puzzle at midnight UTC</p>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartGame}
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition-colors shadow-lg"
      >
        Start Playing
      </button>
    </div>
  );
}

export default WelcomeScreen;
