'use client';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainArea from './components/MainArea';

const SocialPage = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [messageFilterText, setMessageFilterText] = useState('');
  const [messages, setMessages] = useState<'received' | 'sent'>('received');

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const showReceivedMessages = () => {
    setMessages('received');
  };

  const showSentMessages = () => {
    setMessages('sent');
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        toggleSidebar={toggleSidebar}
        showReceivedMessages={showReceivedMessages}
        showSentMessages={showSentMessages}
      />
      <div className="container flex flex-1 overflow-hidden">
        <Sidebar
          isActive={isSidebarActive}
          filterText={filterText}
          onFilterChange={(e) => setFilterText(e.target.value.toLowerCase())}
        />
        <MainArea
          messageFilterText={messageFilterText}
          onMessageFilterChange={(e) => setMessageFilterText(e.target.value.toLowerCase())}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default SocialPage;
