import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import WalletButton from './buttons/wallet.button';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-sm border-b border-light-secondary dark:border-dark-secondary shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-light-text dark:text-dark-text font-bold text-xl">
          Vent
        </div>

        <div className="flex items-center gap-4">
          <WalletButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
