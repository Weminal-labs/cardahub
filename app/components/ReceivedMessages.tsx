import React, { useEffect, useState } from 'react';
// import { useAccount } from 'wagmi';
import { Message } from '../types/message';
import { GetReceivedMessage } from '../hooks/getReceivedMessage'; // Import the ReadContract hook


interface ReceivedMessagesProps {
  filterText: string;
}

const ReceivedMessages: React.FC<ReceivedMessagesProps> = ({ filterText }) => {
  //const { address } = useAccount(); // Get the current wallet address
  const messages = GetReceivedMessage(); // Use the ReadContract hook to get messages

  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (Array.isArray(messages)) {
      setReceivedMessages(messages);
    }
  }, [messages]);

  return (
    <div>
      <h2 className="text-gray-800 mb-4">Received</h2>
      {receivedMessages.length > 0 ? (
        receivedMessages
          .filter(message => message.sender.toLowerCase().includes(filterText))
          .map((message, index) => (
            <div key={index} className="message bg-gray-200 p-2 mb-2 rounded">
              <div className="username font-bold text-gray-800 mb-1">{message.sender}</div>
              <div>{message.content}</div>
            </div>
          ))
      ) : (
        <p>No messages found for this address.</p>
      )}
    </div>
  );
};

export default ReceivedMessages;
