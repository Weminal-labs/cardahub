import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface NavbarProps {
  toggleSidebar: () => void;
  showReceivedMessages: () => void;
  showSentMessages: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, showReceivedMessages, showSentMessages }) => {
  return (
    <div className="navbar flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="hamburger flex flex-col cursor-pointer" onClick={toggleSidebar}>
        <div className="w-6 h-1 bg-white mb-1"></div>
        <div className="w-6 h-1 bg-white mb-1"></div>
        <div className="w-6 h-1 bg-white"></div>
      </div>
      <div className="flex items-center">
        <ConnectButton accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }} showBalance={true} chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }} />
        <button onClick={showReceivedMessages} className="bg-gray-700 p-2 rounded ml-2">Message</button>
        <button onClick={showSentMessages} className="bg-gray-700 p-2 rounded ml-2">Sent</button>
      </div>
    </div>
  );
};

export default Navbar;
