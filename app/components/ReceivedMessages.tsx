import React from 'react';

interface ReceivedMessagesProps {
  filterText: string;
}

const ReceivedMessages: React.FC<ReceivedMessagesProps> = ({ filterText }) => {
  const receivedMessages = [
    { username: 'User X', content: 'Nội dung tin nhắn từ User X' },
    { username: 'User Y', content: 'Nội dung tin nhắn từ User Y' },
    { username: 'User Z', content: 'Nội dung tin nhắn từ User Z' },
  ];

  return (
    <div>
      <h2 className="text-gray-800 mb-4">Received</h2>
      {receivedMessages
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

export default ReceivedMessages;
