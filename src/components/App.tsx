/**
 * Root App Component
 * Main entry point for the Comment Conspiracy React app
 * Manages game state and renders appropriate screens
 */

import React, { useEffect, useCallback, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import type { DevvitToWebViewMessage, WebViewToDevvitMessage, InitData, Achievement } from '../types';

// Screen components
import { WelcomeScreen } from './screens/WelcomeScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultScreen } from './screens/ResultScreen';
import { CompletedScreen } from './screens/CompletedScreen';
import { ConfirmModal } from './game/ConfirmModal';
import { FullPageSpinner } from './shared/LoadingSpinner';
import { FullPageError, getErrorMessage } from './shared/ErrorState';
import { AchievementToast } from './results/AchievementToast';

/**
 * Send a message to the Devvit host
 */
function sendToDevvit(message: WebViewToDevvitMessage): void {
  window.parent.postMessage(message, '*');
}


/**
 * Main App component
 */
export function App(): React.ReactElement {
  const {
    state,
    puzzle,
    selectedIndex,
    result,
    userProgress,
    error,
    loadSuccess,
    loadAlreadyPlayed,
    loadError,
    startGame,
    selectComment,
    openConfirm,
    cancelConfirm,
    submitGuess,
    guessSuccess,
    guessError,
    reset,
  } = useGameState();

  // Track achievements to show in toast
  const [achievementsToShow, setAchievementsToShow] = useState<Achievement[]>([]);

  // Handle messages from Devvit
  const handleDevvitMessage = useCallback(
    (event: MessageEvent<DevvitToWebViewMessage>) => {
      const message = event.data;
      if (!message || typeof message !== 'object' || !('type' in message)) {
        return;
      }

      switch (message.type) {
        case 'INIT_RESPONSE': {
          const data = message.data as InitData;
          if (data.previousResult) {
            // User already played today
            loadAlreadyPlayed(data.previousResult, data.userProgress);
          } else if (data.puzzle) {
            // Ready to play
            loadSuccess(data.puzzle, data.userProgress);
          } else {
            loadError('No puzzle available');
          }
          break;
        }
        case 'GUESS_RESPONSE': {
          guessSuccess(message.result);
          // Show achievement toast if any were unlocked
          if (message.result.newlyUnlockedAchievements?.length > 0) {
            setAchievementsToShow(message.result.newlyUnlockedAchievements);
          }
          break;
        }
        case 'ERROR': {
          if (state === 'SUBMITTING') {
            guessError(message.error);
          } else {
            loadError(message.error);
          }
          break;
        }
      }
    },
    [loadSuccess, loadAlreadyPlayed, loadError, guessSuccess, guessError, state]
  );

  // Set up message listener
  useEffect(() => {
    window.addEventListener('message', handleDevvitMessage);

    // Request initial data
    sendToDevvit({ type: 'INIT' });

    return () => {
      window.removeEventListener('message', handleDevvitMessage);
    };
  }, [handleDevvitMessage]);

  // Handle guess submission
  const handleConfirmGuess = useCallback(() => {
    if (selectedIndex === null) return;
    submitGuess();
    sendToDevvit({ type: 'SUBMIT_GUESS', guessIndex: selectedIndex });
  }, [selectedIndex, submitGuess]);

  // Handle retry after error
  const handleRetry = useCallback(() => {
    reset();
    sendToDevvit({ type: 'INIT' });
  }, [reset]);

  // Render based on state
  const renderContent = (): React.ReactElement => {
    switch (state) {
      case 'LOADING':
        return <FullPageSpinner message="Loading puzzle..." />;

      case 'ERROR':
        return (
          <FullPageError
            title="Something went wrong"
            message={getErrorMessage(error || 'Unknown error')}
            onRetry={handleRetry}
          />
        );

      case 'NEW_USER':
        return <WelcomeScreen onStartGame={startGame} />;

      case 'PLAYING':
      case 'SELECTED':
      case 'CONFIRMING':
      case 'SUBMITTING':
        if (!puzzle) return <FullPageSpinner />;
        return (
          <GameScreen
            puzzle={puzzle}
            selectedIndex={selectedIndex}
            onSelectComment={selectComment}
            onConfirmGuess={openConfirm}
            disabled={state === 'SUBMITTING'}
          />
        );

      case 'RESULT_CORRECT':
      case 'RESULT_INCORRECT':
        if (!result || !puzzle) return <FullPageSpinner />;
        return (
          <ResultScreen
            result={result}
            puzzle={puzzle}
            onViewBreakdown={() => {
              // Could navigate to a detailed breakdown
              console.log('View breakdown');
            }}
            onJoinDiscussion={() => {
              // Could open Reddit comments
              console.log('Join discussion');
            }}
          />
        );

      case 'COMPLETED':
        if (!result || !puzzle) return <FullPageSpinner />;
        return (
          <CompletedScreen
            result={result}
            puzzle={puzzle}
            onViewBreakdown={() => {
              console.log('View breakdown');
            }}
            onJoinDiscussion={() => {
              console.log('Join discussion');
            }}
          />
        );

      default:
        return <FullPageSpinner />;
    }
  };

  return (
    <div className="min-h-screen bg-white safe-area-inset">
      {renderContent()}

      {/* Confirmation Modal */}
      {state === 'CONFIRMING' && puzzle && selectedIndex !== null && (
        <ConfirmModal
          isOpen={true}
          selectedComment={puzzle.comments[selectedIndex]}
          onConfirm={handleConfirmGuess}
          onCancel={cancelConfirm}
        />
      )}

      {/* Submitting Overlay */}
      {state === 'SUBMITTING' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-3xl mb-3 animate-spin">🔍</div>
            <div className="text-gray-700 font-medium">Checking your guess...</div>
          </div>
        </div>
      )}

      {/* Achievement Toast */}
      {achievementsToShow.length > 0 && (
        <AchievementToast
          achievements={achievementsToShow}
          onDismiss={() => setAchievementsToShow([])}
        />
      )}
    </div>
  );
}

export default App;
