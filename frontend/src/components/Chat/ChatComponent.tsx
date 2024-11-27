import React, { useState } from 'react';
import { Box, Flex, Text, Input, VStack } from '@chakra-ui/react';
import { MessageList, ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

export default function ChatComponent() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([
    {
      position: 'left',
      type: 'text',
      title: 'Kursat',
      text: 'Give me a message list example!',
    },
    {
      position: 'right',
      type: 'text',
      title: 'Emre',
      text: "That's all.",
    },
  ]);

  const chats = [
    {
      id: '12345',
      avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      alt: 'kursat_avatar',
      title: 'Kursat',
      subtitle: "Why don't we go to the No Way Home movie this weekend?",
      date: new Date(),
      unread: 3,
    },
    {
      id: '67890',
      avatar: 'https://avatars.githubusercontent.com/u/41473129?v=4',
      alt: 'emre_avatar',
      title: 'Emre',
      subtitle: 'Can you send me the document?',
      date: new Date(),
      unread: 0,
    },
  ];

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Mock: Load messages for the selected chat
    setMessages([
      {
        position: 'left',
        type: 'text',
        title: chat.title,
        text: `This is a message from ${chat.title}.`,
      },
      {
        position: 'right',
        type: 'text',
        title: 'You',
        text: 'Replying to the message.',
      },
    ]);
  };

  return (
    <Flex h="100%" gap={4} p={4}>
      {/* Chat List */}
      <Box
        flex="2"
        borderWidth={1}
        borderRadius="md"
        p={4}
        bg="gray.50"
        overflow="auto"
        h="100%"
      >
        <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
          Chat List
        </Text>
        <ChatList
          className="chat-list"
          dataSource={chats}
          onClick={(chat) => handleChatSelect(chat)}
        />
      </Box>

      {/* Message List */}
      <Box
        flex="6"
        borderWidth={1}
        borderRadius="md"
        p={4}
        bg="white"
        shadow="md"
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        {selectedChat ? (
          <>
            <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
              Chat with {selectedChat.title}
            </Text>
            <VStack flex="1" spacing={4} overflowY="auto" mb={4} alignItems={"normal"}>
              <MessageList
                className="message-list"
                lockable={true}
                toBottomHeight="100%"
                dataSource={messages}
              />
            </VStack>
            <Input
              placeholder="Type your message..."
              multiline={true}
              bg="gray.50"
              borderColor="gray.300"
              resize="none"
            />
          </>
        ) : (
          <Text color="gray.500" align="center" mt="auto">
            Select a chat to start messaging.
          </Text>
        )}
      </Box>
    </Flex>
  );
}
