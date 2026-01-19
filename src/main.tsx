import { Devvit, useState } from '@devvit/public-api';

// Configure Devvit capabilities
Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
});

// Main App component - placeholder until full implementation
const App: Devvit.CustomPostComponent = (context) => {
  const [screen, setScreen] = useState<'welcome' | 'game' | 'result' | 'completed'>('welcome');

  return (
    <vstack height="100%" width="100%" alignment="center middle" padding="medium">
      <text size="xlarge" weight="bold">Comment Conspiracy</text>
      <spacer size="medium" />
      <text size="medium">One of these comments isn't human.</text>
      <text size="medium">Can you spot the imposter?</text>
      <spacer size="large" />
      <text size="small" color="neutral-content-weak">
        Coming soon...
      </text>
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

export default Devvit;
