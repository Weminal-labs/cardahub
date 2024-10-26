import React from 'react';

interface SentMessagesProps {
  filterText: string;
}

const SentMessages: React.FC<SentMessagesProps> = ({ filterText }) => {
  const sentMessages = [
    { username: 'User A', content: 'Nội dung tin nhắn gửi đến User A' },
    { username: 'User B', content: 'Nội dung tin nhắn gửi đến User B' },
    { username: 'User C', content: 'Nội dung tin nhắn gửi đến User C' },
  ];

  return (
    <div>
      <h2 className="text-gray-800 mb-4">Sent</h2>
      {sentMessages
        .filter(message => message.username.toLowerCase().includes(filterText))
        .map((message, index) => (
          <div key={index} className="message bg-gray-200 p-2 mb-2 rounded">
            <div className="username font-bold text-gray-800 mb-1">{message.username}</div>
            <div>{message.content}</div>
          </div>
        ))}
    </div>
  );
};

export default SentMessages;
