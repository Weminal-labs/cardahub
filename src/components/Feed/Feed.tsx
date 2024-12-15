// Feed.tsx
import { useState } from 'react';
import TweetComposer from '../TweetComposer';
import FeedCard from './FeedCard';

const mockFeeds = [
  {
    id: '1',
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    content: 'Just deployed my first smart contract on Ethereum! 🚀 The future of Web3 is here!',
  },
  {
    id: '2',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    content: `Working on a new DeFi protocol. Who's interested in being an early tester? 💎`
  },
  {
    id: '3',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    content: 'NFT marketplace launch coming soon! Get ready for something revolutionary in the digital art space 🎨',
    timestamp: '1 day ago'
  },
  {
    id: '4',
    address: '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
    content: 'Just minted my first NFT collection. Check out these awesome cyberpunk designs!',
  },
  {
    id: '5',
    address: '0x6E0d01A76C3Cf4288372a29124A26D4353EE51BE',
    content: 'Exploring new consensus mechanisms for better scalability. Thoughts on PoS vs PoW? 🤔',
  }
];

const Feed = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <div className="bg-cyber-bg-secondary/30 p-6 rounded-lg border border-cyber-border">
      <h1 className="text-2xl font-bold text-cyber-accent-cyan mb-4">Feed</h1>
      <div className="space-y-4">
        {mockFeeds.map((feed) => (
          <FeedCard
            key={feed.id}
            address={feed.address}
            content={feed.content}
          />
        ))}
      </div>
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
