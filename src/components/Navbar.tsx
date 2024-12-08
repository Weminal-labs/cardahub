'use client';

import React from 'react';
import { ThemeToggle } from './shares/ThemeToggle';
import WalletButton from './buttons/wallet.button';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import icon from '@/public/icon.svg';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [searchAddress, setSearchAddress] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAddress.trim()) {
      router.push(`/profile/${searchAddress.trim()}`);
      setSearchAddress('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-sm border-b border-light-secondary dark:border-dark-secondary shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={icon}
            alt="Cardahub Logo"
            width={50}
            height={50}
            className="animate-fade-down"
          />
          <Link
            href="/"
            className="text-light-text dark:text-dark-text font-bold text-xl hover:opacity-80 transition-opacity"
          >
            Cardahub
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden sm:block">
            <input
              type="text"
              placeholder="Search wallet address..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="px-4 py-2 rounded-lg bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>

          {!isHome && (
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text hover:opacity-90 transition-all"
            >
              <HomeIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}

          <WalletButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
