'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import WalletButton from './buttons/wallet.button';
import icon_dark from '../assets/Cardano-RGB_Logo-Full-White.png';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [searchAddress, setSearchAddress] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search logic here
  };

  const navContent = (
    <nav className="sticky top-0 z-50 w-full bg-cyber-gradient from-cyber-bg-primary/90 to-cyber-bg-secondary/90 backdrop-blur-sm border-b border-cyber-border shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:opacity-80 transition-all duration-200">
            <img
              src={icon_dark}
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
              className="px-4 py-2 rounded-lg 
                       bg-cyber-bg-secondary/50 hover:bg-cyber-bg-tertiary/50 
                       border border-cyber-border 
                       text-cyber-text-secondary placeholder-cyber-text-muted 
                       focus:outline-none focus:ring-2 focus:ring-cyber-accent-cyan/50 
                       transition-all duration-200"
            />
          </form>

          {!isHome && (
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-cyber-gradient from-cyber-accent-cyan/80 to-cyber-accent-indigo/80
                       hover:from-cyber-accent-cyan-light hover:to-cyber-accent-indigo-light
                       text-cyber-text-primary border border-cyber-border
                       transition-all duration-200 shadow-md"
            >
              <HomeIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}

          <WalletButton />
        </div>
      </div>
    </nav>
  );

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full bg-cyber-bg-primary/90 backdrop-blur-sm border-b border-cyber-border shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <div className="w-[50px] h-[50px]" />
          </div>
        </div>
      </nav>
    );
  }

  return navContent;
};

export default Navbar;