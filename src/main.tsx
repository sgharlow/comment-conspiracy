import { Devvit, useState, useWebView } from '@devvit/public-api';
import type { WebViewToDevvitMessage, DevvitToWebViewMessage, InitData, LeaderboardRankData } from './types';
import { getTodaysPuzzle, submitGuess, getPreviousResult, hasUserPlayedToday } from './services/puzzleService';
import { getUserProgress } from './services/userService';
import { getStreakRank, getAccuracyRank } from './services/redisService';
import type { RedisContext } from './services/redisKeys';
import { registerDailyPuzzleJob, scheduleDailyJob, cancelDailyJob } from './scheduler/dailyPuzzle';

// Configure Devvit capabilities
Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
});

// Register the daily puzzle scheduler job
registerDailyPuzzleJob();

// Create Redis context from Devvit context
function createRedisContext(context: Devvit.Context): RedisContext {
  return {
    redis: context.redis,
  };
}

// Main App component with WebView
const App: Devvit.CustomPostComponent = (context) => {
  const userId = context.userId ?? 'anonymous';
  const redisCtx = createRedisContext(context);

  // WebView message handler
  const webView = useWebView<WebViewToDevvitMessage, DevvitToWebViewMessage>({
    onMessage: async (message, webViewContext) => {
      try {
        switch (message.type) {
          case 'INIT': {
            // Get user progress
            const userProgress = await getUserProgress(redisCtx, userId);

            // Get leaderboard ranks
            const streakRankData = await getStreakRank(redisCtx, userId);
            const accuracyRankData = await getAccuracyRank(redisCtx, userId);

            const streakRank: LeaderboardRankData | null = streakRankData
              ? { rank: streakRankData.rank, total: streakRankData.total }
              : null;
            const accuracyRank: LeaderboardRankData | null = accuracyRankData
              ? { rank: accuracyRankData.rank, total: accuracyRankData.total }
              : null;

            // Check if already played today
            const alreadyPlayed = await hasUserPlayedToday(redisCtx, userId);

            if (alreadyPlayed) {
              // Get today's puzzle to get puzzleId
              const puzzle = await getTodaysPuzzle(redisCtx, userId);
              if (puzzle) {
                const previousResult = await getPreviousResult(redisCtx, userId, puzzle.id);
                const initData: InitData = {
                  userId,
                  puzzle,
                  userProgress,
                  previousResult,
                  streakRank,
                  accuracyRank,
                };
                webViewContext.postMessage({ type: 'INIT_RESPONSE', data: initData });
              } else {
                webViewContext.postMessage({ type: 'ERROR', error: 'No puzzle available today' });
              }
            } else {
              // Fresh play - get today's puzzle
              const puzzle = await getTodaysPuzzle(redisCtx, userId);
              const initData: InitData = {
                userId,
                puzzle,
                userProgress,
                previousResult: null,
                streakRank,
                accuracyRank,
              };
              webViewContext.postMessage({ type: 'INIT_RESPONSE', data: initData });
            }
            break;
          }

          case 'SUBMIT_GUESS': {
            // Get today's puzzle ID
            const puzzle = await getTodaysPuzzle(redisCtx, userId);
            if (!puzzle) {
              webViewContext.postMessage({ type: 'ERROR', error: 'No puzzle available' });
              return;
            }

            // Submit the guess
            const result = await submitGuess(redisCtx, userId, puzzle.id, message.guessIndex);
            webViewContext.postMessage({ type: 'GUESS_RESPONSE', result });
            break;
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        webViewContext.postMessage({ type: 'ERROR', error: errorMessage });
      }
    },
  });

  return (
    <vstack height="100%" width="100%">
      <webview
        id="comment-conspiracy"
        url="index.html"
        width="100%"
        height="100%"
        onMessage={webView.onMessage}
      />
    </vstack>
  );
};

// Register the custom post type
Devvit.addCustomPostType({
  name: 'Comment Conspiracy',
  description: 'Daily game - spot the AI-generated comment',
  height: 'tall',
  render: App,
});

// Menu item to create a new game post
Devvit.addMenuItem({
  label: 'Create Comment Conspiracy Post',
  location: 'subreddit',
  onPress: async (event, context) => {
    const subreddit = await context.reddit.getCurrentSubreddit();
    await context.reddit.submitPost({
      title: 'Comment Conspiracy - Can You Spot the AI?',
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="center middle">
          <text size="large">Loading Comment Conspiracy...</text>
        </vstack>
      ),
    });
    context.ui.showToast('Created Comment Conspiracy post!');
  },
});

// App install trigger - schedule the daily job
Devvit.addTrigger({
  event: 'AppInstall',
  onEvent: async (event, context) => {
    console.log('[CommentConspiracy] App installed, scheduling daily job');
    await scheduleDailyJob(context);
  },
});

// App upgrade trigger - re-schedule the daily job
Devvit.addTrigger({
  event: 'AppUpgrade',
  onEvent: async (event, context) => {
    console.log('[CommentConspiracy] App upgraded, re-scheduling daily job');
    await cancelDailyJob(context);
    await scheduleDailyJob(context);
  },
});

export default Devvit;
