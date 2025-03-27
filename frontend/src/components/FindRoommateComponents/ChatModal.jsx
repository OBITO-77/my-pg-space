// ChatModal.js
import { useState, useEffect, useRef } from 'react';
import '../../styles/FindRoommateStyles/style.css'

const ChatModal = ({ contact, onClose, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        timestamp: new Date().toISOString(),
        sender: 'user'
      };
      setMessages(prev => [...prev, newMessage]);
      onSendMessage(newMessage);
      setMessage('');
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="chat-modal">
        <div className="chat-header">
          <h3>Chat with {contact.name}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="chat-body">
          <div className="message-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatModal;