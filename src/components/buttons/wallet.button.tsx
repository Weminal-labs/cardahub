'use client';

import { useEffect, useState } from 'react';
import { useLucid } from '../../context/LucidProvider';
import { toast } from 'react-hot-toast';

const WalletButton = () => {
    const { connectWallet, lucid, address } = useLucid()
    const [isConnected, setIsConnected] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [walletAddress, setWalletAddress] = useState("")

    useEffect(() => {
        const getAddress = async () => {
            if (address) {
                setWalletAddress(`${address.slice(0, 8)}...${address.slice(-8)}`)
                setIsConnected(true)
            } else {
                setIsConnected(false)
                setWalletAddress("")
            }
        }
        getAddress()
    }, [address, lucid])

    return (
        <div className="relative">
            {!isConnected ? (
                <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md" 
                    onClick={connectWallet}
                >
                    Connect Wallet
                </button>
            ) : (
                <>
                    <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md flex items-center space-x-2"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span>Connected</span>
                        <svg 
                            className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
                            <button 
                                onClick={async () => {
                                    const addr = await lucid?.wallet.address()
                                    if (addr) {
                                        await navigator.clipboard.writeText(addr)
                                        toast.success('Wallet address copied to clipboard!', {
                                            duration: 2000,
                                            position: 'top-right',
                                        });
                                    }
                                }}
                                className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                            >
                                <span>{walletAddress}</span>
                                <svg 
                                    className="w-4 h-4 ml-2" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
                                    />
                                </svg>
                            </button>
                            <button 
                                onClick={() => window.location.href = '/profile'}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Profile
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default WalletButton;