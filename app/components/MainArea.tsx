import React from 'react';
import ReceivedMessages from './ReceivedMessages';
import SentMessages from './SentMessages';
import MessageComponent from './MessageComponent';

interface MainAreaProps {
  messageFilterText: string;
  onMessageFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  messages: 'received' | 'sent';
}

const MainArea: React.FC<MainAreaProps> = ({ messageFilterText, messages }) => {
  return (
    <div className="main-area bg-white flex-1 p-4 overflow-y-auto">
      {messages === 'received' ? (
        <ReceivedMessages filterText={messageFilterText} />
      ) : (
        <> <MessageComponent /><SentMessages filterText={messageFilterText} /></>
      )}
    </div>
  );
};

export default MainArea;
