import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar: React.FC = () => {
  return (
    <div className="navbar flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <ConnectButton accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }} showBalance={true} chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }} />
      </div>
    </div>
  );
};

export default Navbar;
