import React, { ReactNode } from 'react';
// import { useAccount } from 'wagmi';
import { GetReceivedMessage } from '../hooks/getReceivedMessage';

interface ReceivedMessagesProps {
  filterText: string;
}

const ReceivedMessages: React.FC<ReceivedMessagesProps> = ({ filterText }) => {
  // const { address } = useAccount();
  const { data, error, isPending } = GetReceivedMessage();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading messages</div>;
  if (!data) return <div>No messages found</div>;

  const [senders, contents, timestamps] = data;

  return (
    <div>
      <h2 className="text-gray-800 mb-4">Received Messages</h2>
      {senders.length > 0 ? (
        senders
          .map((sender: string, index: number) => ({
            sender,
            content: contents[index],
            timestamp: new Date(Number(timestamps[index]) * 1000).toLocaleString(),
          }))
          .filter((message: { sender: string }) => message.sender.toLowerCase().includes(filterText.toLowerCase()))
          .map((message: {
            content: ReactNode; sender: string; timestamp: string 
}, index: number) => (
            <div key={index} className="message bg-gray-200 p-2 mb-2 rounded">
              <div className="username font-bold text-gray-800 mb-1">
                From: {message.sender}
              </div>
              <div className="content mb-1">{message.content}</div>
              <div className="text-sm text-gray-600">{message.timestamp}</div>
            </div>
          ))
      ) : (
        <p>No messages found for this address.</p>
      )}
    </div>
  );
};

export default ReceivedMessages;
