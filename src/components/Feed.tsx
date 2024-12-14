// Feed.tsx
import { useState } from 'react';
import TweetComposer from './TweetComposer';

interface Tweet {
  id: number;
  user: string;
  content: string;
  likes: number;
}

const Feed = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const [tweets, setTweets] = useState<Tweet[]>([
    { id: 1, user: 'John Doe', content: 'This is my first tweet!', likes: 3 },
    { id: 2, user: 'Jane Doe', content: 'Hello world!', likes: 5 }
  ]);

  const handleLike = (tweetId: number) => {
    setTweets(tweets.map(tweet =>
      tweet.id === tweetId ? { ...tweet, likes: tweet.likes + 1 } : tweet
    ));
  };

  return (
    <div className="bg-cyber-bg-secondary/30 p-6 rounded-lg border border-cyber-border">
      <h1 className="text-2xl font-bold text-cyber-accent-cyan mb-4">Feed</h1>
      {tweets.map(tweet => (
        <div key={tweet.id} className="tweet-card">
          <div className="tweet-header">
            <strong>{tweet.user}</strong>
            <span>{new Date().toLocaleString()}</span>
          </div>
          <p>{tweet.content}</p>
          <div className="actions">
            <button onClick={() => handleLike(tweet.id)}>Like ({tweet.likes})</button>
            <button>Reply</button>
            <button>Retweet</button>
          </div>
        </div>
      ))}
      <button
        onClick={() => setIsComposerOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-cyan-500 hover:bg-cyan-600 
                   rounded-full flex items-center justify-center text-white text-2xl 
                   shadow-lg transition-colors duration-200 z-40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <TweetComposer
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
      />
    </div>
  );
};

export default Feed;
