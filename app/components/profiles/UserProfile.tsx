'use client';

import React, { useState, useContext } from 'react';
import { UserContext } from '@/app/providers/UserProvider';
import { DocumentDuplicateIcon, UserIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Lightbox } from '../shares/Lightbox';
import CreateUserForm from '../forms/CreateUserForm';

const UserProfile: React.FC = () => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const { userState } = useContext(UserContext);

    const { addr, isConnected, avatar, name, bio, jointTime } = userState;
    console.log('profile userState', userState);
    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <p className="text-light-text dark:text-dark-text">
                    Please connect your wallet to view profile
                </p>
            </div>
        );
    }

    if (!jointTime) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <p className="text-light-text dark:text-dark-text mb-4">
                    Your wallet is not connected to a profile yet
                </p>

                <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="px-6 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:opacity-90 transition-all"
                >
                    Create Profile
                </button>

                {isLightboxOpen && (
                    <CreateUserForm onClose={() => setIsLightboxOpen(false)} />
                )}
            </div>
        );
    }
    return (
        <div className="max-w-2xl mx-auto p-6 bg-light-primary dark:bg-dark-primary rounded-lg shadow-lg">
            {/* Profile Header with Avatar */}
            <div className="flex items-center gap-6 mb-8">
                {/* Avatar Circle */}
                <div
                    className={`relative w-24 h-24 rounded-full overflow-hidden bg-light-secondary dark:bg-dark-secondary flex items-center justify-center border-2 border-light-accent dark:border-dark-accent ${avatar ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
                        }`}
                    onClick={() => avatar && setIsLightboxOpen(true)}
                >
                    {avatar ? (
                        <Image
                            src={avatar}
                            alt="User Avatar"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <UserIcon className="w-12 h-12 text-light-text/50 dark:text-dark-text/50" />
                    )}
                </div>

                {/* User Info Header */}
                <div>
                    <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
                        {name || 'User Profile'}
                    </h1>
                    <p className="text-sm text-light-text/70 dark:text-dark-text/70">
                        {bio || 'No bio'}
                    </p>
                </div>
            </div>

            {/* Address Section */}
            <div className="space-y-6">
                <div className="bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-sm text-light-text/70 dark:text-dark-text/70">
                                Wallet Address
                            </label>
                            <p className="text-light-text dark:text-dark-text font-mono">
                                {addr}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                // navigator.clipboard.writeText(addr);
                                toast.success('Address copied to clipboard!');
                            }}
                            className="p-2 hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 rounded-full transition-colors"
                        >
                            <DocumentDuplicateIcon className="w-5 h-5 text-light-accent dark:text-dark-accent" />
                        </button>
                    </div>
                </div>

                {/* Balance Section */}
                <div className="bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg">
                    <label className="text-sm text-light-text/70 dark:text-dark-text/70">
                        Balance
                    </label>
                    <p className="text-light-text dark:text-dark-text">
                        {userState.balance || '0'}
                    </p>
                </div>
            </div>

            {/* Lightbox */}
            {isLightboxOpen && avatar && (
                <Lightbox
                    imageUrl={avatar}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </div>
    );
};

export default UserProfile;
