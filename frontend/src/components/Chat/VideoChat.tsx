import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { FiPhone, FiVideo } from 'react-icons/fi';
import { socket } from '../communication';

function useClientID() {
  const [clientID, setClientID] = useState('');

  useEffect(() => {
    socket.on('init', ({ id }) => {
      document.title = `${id} - VideoCall`;
      setClientID(id);
    });
  }, []);

  return clientID;
}

export default function MainWindow({ startCall }) {
  const clientID = useClientID();
  const { register, handleSubmit } = useForm();
  const [friendID, setFriendID] = useState('');

  const callWithVideo = (video) => {
    const config = { audio: true, video };
    if (friendID) {
      startCall(true, friendID, config);
    }
  };

  const onSubmit = ({ friendID }) => {
    setFriendID(friendID);
  };

  return (
    <Flex direction="column" align="center" justify="center" p={6} bg="gray.50" borderRadius="md" boxShadow="lg">
      <Box mb={6} textAlign="center">
        <Heading as="h3" size="lg" mb={2}>
          Hi, your ID is
        </Heading>
        <Input
          value={clientID}
          isReadOnly
          textAlign="center"
          borderColor="gray.300"
          size="lg"
          variant="filled"
        />
        <Text mt={4} fontSize="md">
          Get started by calling a friend below
        </Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Flex direction="column" align="center" gap={4}>
          <Input
            placeholder="Your friend ID"
            size="lg"
            {...register('friendID', { required: true })}
            borderColor="gray.300"
            focusBorderColor="blue.500"
          />
          <Flex justify="space-around" gap={4} w="100%">
            <Button
              leftIcon={<FiVideo />}
              colorScheme="blue"
              onClick={() => callWithVideo(true)}
            >
              Video Call
            </Button>
            <Button
              leftIcon={<FiPhone />}
              colorScheme="green"
              onClick={() => callWithVideo(false)}
            >
              Audio Call
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}
