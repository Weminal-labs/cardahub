import React from 'react';
import ReceivedMessages from './ReceivedMessages';
import SentMessages from './SentMessages';
import MessageComponent from './MessageComponent';

interface MainAreaProps {
  messageFilterText: string;
  onMessageFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  messages: 'received' | 'sent';
}

const MainArea: React.FC<MainAreaProps> = ({ messageFilterText, onMessageFilterChange, messages }) => {
  return (
    <div className="main-area bg-white flex-1 p-4 overflow-y-auto">
      <input
        type="text"
        className="message-search w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Tìm kiếm tin nhắn..."
        value={messageFilterText}
        onChange={onMessageFilterChange}
      />
      {messages === 'received' ? (
        <ReceivedMessages filterText={messageFilterText} />
      ) : (
        <> <MessageComponent /><SentMessages filterText={messageFilterText} /></>
      )}
    </div>
  );
};

export default MainArea;
