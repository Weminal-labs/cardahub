import React, { useEffect, useState } from 'react';
import { SendMessage } from '../hooks/writeContract'; // Import the SendMessage function

interface SentMessagesProps {
  filterText: string;
}

const SentMessages: React.FC<SentMessagesProps> = ({ filterText }) => {
  const { send } = SendMessage(); // Destructure the send function
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await send(recipient as `0x${string}`, content);
    setContent('');
  };
  const [sentMessages, setSentMessages] = useState<{ sender: string; content: string; timestamp: string }[]>([]);
 /*  useEffect(() => {
    const fetchSentMessages = async () => {
      try {
        const messages = await getSentMessages();
        setSentMessages(messages);
      } catch (error) {
        console.error("Error fetching sent messages:", error);
      }
    };
    fetchSentMessages();
  }, []); */

  return (
    <div>
      <h2 className="text-gray-800 mb-4">Sent</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <textarea
          placeholder="Message Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
      <h2 className="text-gray-800 mb-4">Sent Messages</h2>
      {sentMessages.length > 0 ? (
        sentMessages
          .filter(message => message.content.toLowerCase().includes(filterText))
          .map((message, index) => (
            <div key={index} className="message bg-gray-200 p-2 mb-2 rounded">
              <div className="username font-bold text-gray-800 mb-1">{message.sender}</div>
              <div>{message.content}</div>
              <div className="text-gray-600 text-sm">{message.timestamp}</div>
            </div>
          ))
      ) : (
        <p>No sent messages found.</p>
      )}
    </div>
  );
};

export default SentMessages;
