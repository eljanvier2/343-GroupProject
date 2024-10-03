import { useState } from 'react';
import Image from 'next/image';
import chatbotimage from '@/public/images/chatbot.png';
import styles from './.module.css';

//components
export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) 
            return;

        //create new message
        const newMessages = [...messages, { role: 'user', content: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setLoading(true);

        //request to OpenAI
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });
            const data = await response.json();
            setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            console.error('API Error:', error);
            alert("Something went wrong! Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Open chatbot */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.chatButton}>
                <Image src={chatbotimage} alt="Chatbot" style={{ width: '40px', height: '40px' }} />
            </button>

            {/* Chatbot */}
            {isOpen && (
                <div className={styles.chatbotContainer}>
                    {/* Header */}
                    <div className={styles.chatHeader}>
                        <div>Online</div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className={styles.chatHeaderButton}
                        >×</button>
                    </div>

                    {/* messages */}
                    <div className={styles.messagesContainer}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={styles.message}
                            >
                                
                                {/* Avatars */}
                                <div className={`${styles.avatar} ${msg.role === 'user' ? styles.userAvatar : ''}`}>
                                    {msg.role === 'user' ? '👤' : '🤖'}
                                </div>

                                {/* message bubble */}
                                <div className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userBubble : styles.assistantBubble}`}>
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
                            onChange={(e) => setUserInput(e.target.value)}
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

