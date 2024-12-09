// TweetComposer.tsx
import { useState, ChangeEvent } from 'react';

const TweetComposer = () => {
  const [content, setContent] = useState<string>("");

  const handlePost = () => {
    console.log("Posting tweet: ", content);
    setContent("");
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="tweet-composer">
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="What's happening?"
      />
      <button onClick={handlePost}>Tweet</button>
    </div>
  );
};

export default TweetComposer;
