import React, { useState } from 'react';
import { useMessageContract } from '../hooks/useMessageContract';

const MessageComponent = () => {
  const { sendMessage, getMessages } = useMessageContract();
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    await sendMessage(recipient, content);
  };

  const handleGetMessages = async () => {
    const msgs = await getMessages(recipient);
    setMessages(msgs);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send Message</button>
      <button onClick={handleGetMessages}>Get Messages</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>Sender: {msg.sender}</p>
            <p>Content: {msg.content}</p>
            <p>Timestamp: {new Date(msg.timestamp * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageComponent;
