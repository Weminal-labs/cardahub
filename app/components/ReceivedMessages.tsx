import React, { useEffect, useState } from 'react';
import { useMessageContract } from '../hooks/useMessageContract';
import { useAccount } from 'wagmi';

interface ReceivedMessagesProps {
  filterText: string;
}

const ReceivedMessages: React.FC<ReceivedMessagesProps> = ({ filterText }) => {
  const { getMessages } = useMessageContract();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const { address } = useAccount(); // Get the current wallet address

  useEffect(() => {
    const fetchMessages = async () => {
      if (address) {
        const messages = await getMessages(address); // Use the current wallet address
        setReceivedMessages(messages);
      }
    };

    fetchMessages();
  }, [getMessages, address]);

  return (
    <div>
      <h2 className="text-gray-800 mb-4">Received</h2>
      {receivedMessages
        .filter(message => message.sender.toLowerCase().includes(filterText))
        .map((message, index) => (
          <div key={index} className="message bg-gray-200 p-2 mb-2 rounded">
            <div className="username font-bold text-gray-800 mb-1">{message.sender}</div>
            <div>{message.content}</div>
          </div>
        ))}
    </div>
  );
};

export default ReceivedMessages;
