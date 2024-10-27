import React, { useState } from 'react';
import { useMessageContract } from '../hooks/useMessageContract';
import { Message } from '../types/message';

const MessageComponent = () => {
  const { send} = useMessageContract();
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [messages] = useState<Message[]>([]);

  const handleSendMessage = async () => {
    // console.log('Sending message to', recipient);
    await send(recipient, content);
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
