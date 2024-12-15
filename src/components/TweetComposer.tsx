// TweetComposer.tsx
import { useState, ChangeEvent } from 'react';

interface TweetComposerProps {
  isOpen: boolean;
  onClose: () => void;
}

const TweetComposer: React.FC<TweetComposerProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState<string>("");

  const handlePost = () => {
    console.log("Posting tweet: ", content);
    setContent("");
    onClose();
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0B0E14] border border-[#30363d] rounded-lg w-[90%] max-w-[500px] p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-4">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="What's happening?"
            className="w-full min-h-[120px] bg-[#1C1E26] border border-[#30363d] rounded-lg p-3 text-gray-200 
                     placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            autoFocus
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handlePost}
              disabled={!content.trim()}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 disabled:cursor-not-allowed
                       text-white rounded-full font-medium transition-colors duration-200"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetComposer;