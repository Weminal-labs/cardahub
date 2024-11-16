'use client';

import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from 'next/image';
import { useUserStore } from '@/app/stores/useUserStore';

const WalletButton: React.FC = () => {
    const { isConnected: balance } = useUserStore();

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

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
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
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={openChainModal}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text hover:opacity-90 transition-all"
                                    >
                                        {chain.hasIcon && (
                                            <div className="relative w-5 h-5">
                                                {chain.iconUrl && (
                                                    <Image
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        fill
                                                        sizes="20px"
                                                        className="object-contain"
                                                        unoptimized
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </button>

                                    <button
                                        onClick={openAccountModal}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text hover:opacity-90 transition-all"
                                    >
                                        <span>{account.displayName}</span>
                                        <span>({balance || account.displayBalance} ETH)</span>
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default WalletButton;
