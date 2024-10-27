import React, { useEffect, useState } from 'react';
import { useMessageContract } from '../hooks/useMessageContract';
import { useAccount } from 'wagmi';
import { Message } from '../types/message';


interface ReceivedMessagesProps {
  filterText: string;
}

const ReceivedMessages: React.FC<ReceivedMessagesProps> = ({ filterText }) => {
  const { fetchMessages } = useMessageContract();
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const { address } = useAccount(); // Get the current wallet address

  useEffect(() => {
    const loadMessages = async () => {
      if (address) {
        const messages = await fetchMessages(address) as Message[] || []; // Ensure messages is an array
        setReceivedMessages(messages);
      }
    };

    loadMessages();
  }, [fetchMessages, address]);

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
