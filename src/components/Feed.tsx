// Feed.tsx
import { useState } from 'react';

interface Tweet {
  id: number;
  user: string;
  content: string;
  likes: number;
}

const Feed = () => {
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
    <div className="feed">
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
    </div>
  );
};

export default Feed;
