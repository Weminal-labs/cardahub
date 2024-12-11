'use client';

import { useLucid } from '../../context/LucidProvider';

const WalletButton = () => {
    const { connectWallet } = useLucid()

    return (
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md" onClick={connectWallet}>
            Connect Wallet
        </button>
    );
};

export default WalletButton;