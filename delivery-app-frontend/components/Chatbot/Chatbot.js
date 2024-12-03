import { useState } from 'react';
import Image from 'next/image';
import chatbotimage from '@/public/images/chatbot.png';
import styles from './.module.css';

// Get the API base URL dynamically from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) {
      return;
    }

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Add the assistant's response to the messages
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.content || 'Sorry, something went wrong.' },
      ]);
    } catch (error) {
      console.error('API Error:', error);
      alert('Something went wrong! Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Open chatbot */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={styles.chatButton}
      >
        <Image
          src={chatbotimage}
          alt="Chatbot"
          style={{ width: '40px', height: '40px' }}
        />
      </button>

      {/* Chatbot */}
      {isOpen && (
        <div className={styles.chatbotContainer}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div>Online</div>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className={styles.chatHeaderButton}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div key={index} className={styles.message}>
                {/* Avatars */}
                <div
                  className={`${styles.avatar} ${
                    msg.role === 'user' ? styles.userAvatar : ''
                  }`}
                >
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>

                {/* Message bubble */}
                <div
                  className={`${styles.messageBubble} ${
                    msg.role === 'user'
                      ? styles.userBubble
                      : styles.assistantBubble
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className={styles.chatForm}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              placeholder="Type your message..."
              className={styles.chatInput}
            />

            {/* Send */}
            <button
              type="submit"
              disabled={loading}
              className={styles.chatButtonSend}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
