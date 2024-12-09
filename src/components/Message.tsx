// Messages.tsx
import { useState, ChangeEvent } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState<string[]>(["Hello!", "How are you?"]);
  const [messageInput, setMessageInput] = useState<string>("");

  const sendMessage = () => {
    setMessages([...messages, messageInput]);
    setMessageInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  return (
    <div className="messages">
      <div className="chat">
        {messages.map((message, index) => (
          <div key={index} className="chat-bubble">{message}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={messageInput}
          onChange={handleInputChange}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
