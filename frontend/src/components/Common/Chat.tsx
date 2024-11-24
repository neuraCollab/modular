import React, { useState, useEffect, useRef } from "react";
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
  const [clientId, setClienId] = useState(
    Math.floor(new Date().getTime() / 1000)
  );

  const [chatHistory, setChatHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [websckt, setWebsckt] = useState<any>();

  const [message, setMessage] = useState([]);
  

  useEffect(() => {
    const url = "ws://0.0.0.0:8000/ws/" + clientId;
    const ws = new WebSocket(url);

    ws.onopen = event => {
      ws.send("Connect");
    };

    // recieve message every start page
    ws.onmessage = e => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    };

    setWebsckt(ws);
    //clean up function when we close page
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    websckt.send(message);
    // recieve message every send message
    websckt.onmessage = e => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    };
    setMessage([]);
  };


  return <Chat userId={String(clientId)} messages={messages} onSend={sendMessage} />;
};

export default ChatComponent;
