'use client';

import React, { useState } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from 'next/image';
import { useUserStore } from '@/app/stores/useUserStore';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { DocumentDuplicateIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import toast from 'react-hot-toast';

const WalletButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { balance } = useUserStore();

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                if (!connected) {
                    return (
                        <button
                            onClick={openConnectModal}
                            className="px-4 py-2 rounded-lg bg-light-accent dark:bg-dark-accent text-white hover:opacity-90 transition-all"
                        >
                            Connect Wallet
                        </button>
                    );
                }

                return (
                    <div className="relative">
                        {/* Main Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text hover:opacity-90 transition-all"
                        >
                            <span>{account.displayName}</span>
                            {isOpen ? (
                                <ChevronUpIcon className="w-4 h-4" />
                            ) : (
                                <ChevronDownIcon className="w-4 h-4" />
                            )}
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-light-primary dark:bg-dark-primary border border-light-secondary dark:border-dark-secondary">
                                {/* Network Switcher */}
                                <button
                                    onClick={openChainModal}
                                    className="w-full flex items-center gap-2 p-3 hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
                                >
                                    {chain.hasIcon && chain.iconUrl && (
                                        <div className="relative w-5 h-5">
                                            <Image
                                                alt={chain.name ?? 'Chain icon'}
                                                src={chain.iconUrl}
                                                fill
                                                sizes="20px"
                                                className="object-contain"
                                                unoptimized
                                            />
                                        </div>
                                    )}
                                    <span>{chain.name}</span>
                                </button>

                                {/* Balance */}
                                <div className="p-3 border-t border-light-secondary dark:border-dark-secondary">
                                    <p className="text-sm text-light-text dark:text-dark-text">
                                        Balance: {balance || account.displayBalance} ETH
                                    </p>
                                </div>

                                {/* Copy Address */}
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(account.address);
                                        toast.success('Address copied to clipboard!');
                                    }}
                                    className="w-full flex items-center gap-2 p-3 hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors border-t border-light-secondary dark:border-dark-secondary"
                                >
                                    <DocumentDuplicateIcon className="w-5 h-5" />
                                    <span>Copy Address</span>
                                </button>

                                {/* Profile Link */}
                                <Link
                                    href={`/profile/${account.address}`}
                                    className="w-full flex items-center gap-2 p-3 hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors border-t border-light-secondary dark:border-dark-secondary"
                                >
                                    <UserIcon className="w-5 h-5" />
                                    <span>View Profile</span>
                                </Link>

                                {/* Disconnect */}
                                <button
                                    onClick={openAccountModal}
                                    className="w-full flex items-center gap-2 p-3 hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors text-red-500 border-t border-light-secondary dark:border-dark-secondary"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                    <span>Disconnect</span>
                                </button>
                            </div>
                        )}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default WalletButton;
