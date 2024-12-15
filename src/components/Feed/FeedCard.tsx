// src/components/Feed/FeedCard.tsx
import React from 'react';

interface FeedCardProps {
    address: string;
    content: string;
}

const FeedCard: React.FC<FeedCardProps> = ({ address, content }) => {
    return (
        <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6 mb-4 
                        hover:border-cyan-400 transition-all duration-300 
                        backdrop-blur-sm shadow-[0_0_15px_rgba(0,200,255,0.07)]">
            {/* Header with address */}
            <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 
                              rounded-full w-10 h-10 flex items-center justify-center 
                              shadow-[0_0_10px_rgba(0,200,255,0.3)]">
                    <span className="text-gray-900 font-bold text-sm">
                        {address.slice(0, 2)}
                    </span>
                </div>
                <div className="ml-3">
                    <p className="text-cyan-400 font-mono tracking-wide">
                        {`${address.slice(0, 6)}...${address.slice(-4)}`}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="text-gray-300 font-light">
                <p className="leading-relaxed">
                    {content}
                </p>
            </div>
        </div>
    );
};

export default FeedCard;