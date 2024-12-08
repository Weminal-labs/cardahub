'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ThemeToggle } from './shares/ThemeToggle';
import WalletButton from './buttons/wallet.button';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import icon_light from '@/public/assets/Cardano-RGB_Logo-Full-Blue.png';
import icon_dark from '@/public/assets/Cardano-RGB_Logo-Full-White.png';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isHome = pathname === '/';
  const [searchAddress, setSearchAddress] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAddress.trim()) {
      router.push(`/profile/${searchAddress.trim()}`);
      setSearchAddress('');
    }
  };

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-sm border-b border-light-secondary dark:border-dark-secondary shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-[50px] h-[50px]" />
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
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-sm border-b border-light-secondary dark:border-dark-secondary shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src={theme === 'dark' ? icon_dark : icon_light}
              alt="Cardahub Logo"
              width={130}
              height={130}
              className="animate-fade-down"
            />
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
