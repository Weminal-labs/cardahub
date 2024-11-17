'use client';

import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import WalletButton from './buttons/wallet.button';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="sticky top-0 z-50 w-full bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-sm border-b border-light-secondary dark:border-dark-secondary shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-light-text dark:text-dark-text font-bold text-xl hover:opacity-80 transition-opacity"
        >
          Vent
        </Link>

        <div className="flex items-center gap-4">
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
