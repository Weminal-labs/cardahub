'use client';

import React from 'react';

const WalletButton: React.FC = () => {

    return (
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md">
            Connect Wallet
        </button>
    );
};

export default WalletButton;
