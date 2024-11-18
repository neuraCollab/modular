import React, { useState } from 'react';
import { Chat, ChatMessage, Message } from 'react-chat-module';
import 'react-chat-module/dist/index.css';

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      createdAt: new Date(),
      messageId: '1',
      senderId: '1',
      profilePicture: 'https://via.placeholder.com/150',
      type: 'text',
      text: 'Hello, how are you?',
      name: 'John Doe',
    },
    {
      createdAt: new Date(Date.now() + 2000),
      messageId: '2',
      senderId: '2',
      profilePicture: 'https://via.placeholder.com/150',
      type: 'text',
      text: "I'm fine, and you?",
    },
  ]);

  const handleSend = (message: Message) => {
    const newMessage: ChatMessage = {
      ...message,
      messageId: (messages.length + 1).toString(),
      senderId: '1',
      profilePicture: 'https://via.placeholder.com/150',
      read: false,
    };
    setMessages([...messages, newMessage]);
  };

  return <Chat userId="1" messages={messages} onSend={handleSend} />;
};

export default ChatComponent;
