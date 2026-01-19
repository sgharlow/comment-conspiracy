/**
 * AIExplanation Component
 * Shows why the AI comment was detectable and why human comments were authentic
 */

import React from 'react';
import type { Explanation } from '../../types';

export interface AIExplanationProps {
  explanation: Explanation;
  wasCorrect: boolean;
}

export function AIExplanation({
  explanation,
  wasCorrect,
}: AIExplanationProps): React.ReactElement {
  return (
    <div className="space-y-4">
      {/* AI Tells */}
      <div className={`rounded-xl p-4 ${wasCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🤖</span>
          <h3 className="font-bold text-gray-900">
            {wasCorrect ? 'AI TELLS:' : 'WHY IT WAS AI:'}
          </h3>
        </div>
        <ul className="space-y-2">
          {explanation.aiTells.map((tell, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span className="text-gray-400">•</span>
              <span>{tell}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Human Tells (shown when incorrect to explain why user's pick was human) */}
      {!wasCorrect && explanation.humanTells.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">👤</span>
            <h3 className="font-bold text-gray-900">WHY YOUR PICK WAS HUMAN:</h3>
          </div>
          <ul className="space-y-2">
            {explanation.humanTells.map((tell, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-gray-400">•</span>
                <span>{tell}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Difficulty Note */}
      {explanation.difficulty_note && (
        <p className="text-sm text-gray-500 italic text-center">
          {explanation.difficulty_note}
        </p>
      )}
    </div>
  );
}

export default AIExplanation;
