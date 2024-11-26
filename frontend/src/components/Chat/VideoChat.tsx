import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Text,  VStack } from '@chakra-ui/react';
import io, { Socket } from 'socket.io-client';

interface UserListUpdate {
  userIds: string[];
}

interface MediaOffer {
  offer: RTCSessionDescriptionInit;
  from: string;
}

interface MediaAnswer {
  answer: RTCSessionDescriptionInit;
  from: string;
}

interface IceCandidate {
  candidate: RTCIceCandidateInit;
  to: string;
}

const VideoChat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>(["miki"]);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<RTCPeerConnection>(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org',
        },
      ],
    })
  );

  useEffect(() => {
    const socketInstance = io({ path: '/ws/socket.io' });
    setSocket(socketInstance);

    socketInstance.on('connect', handleSocketConnected);
    socketInstance.on('update-user-list', onUpdateUserList);
    socketInstance.on('mediaOffer', handleMediaOffer);
    socketInstance.on('mediaAnswer', handleMediaAnswer);
    socketInstance.on('remotePeerIceCandidate', handleRemoteIceCandidate);

    peerRef.current.onicecandidate = handleIceCandidate;
    peerRef.current.addEventListener('track', handleTrackEvent);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSocketConnected = async () => {
    await startLocalStream();
    socket?.emit('requestUserList');
  };

  const startLocalStream = async () => {
    const constraints = { audio: true, video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    stream.getTracks().forEach((track) => peerRef.current.addTrack(track, stream));
  };

  const handleCall = async () => {
    const localPeerOffer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(localPeerOffer);

    sendMediaOffer(localPeerOffer);
  };

  const handleMediaOffer = async (data: MediaOffer) => {
    await peerRef.current.setRemoteDescription(
      new RTCSessionDescription(data.offer)
    );
    const peerAnswer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(peerAnswer);

    sendMediaAnswer(peerAnswer, data.from);
  };

  const handleMediaAnswer = async (data: MediaAnswer) => {
    await peerRef.current.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );
  };

  const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate && selectedUser) {
      sendIceCandidate(event.candidate);
    }
  };

  const handleRemoteIceCandidate = async (data: IceCandidate) => {
    try {
      const candidate = new RTCIceCandidate(data.candidate);
      await peerRef.current.addIceCandidate(candidate);
    } catch (error) {
      console.error('Error adding received ICE candidate', error);
    }
  };

  const handleTrackEvent = (event: RTCTrackEvent) => {
    const [stream] = event.streams;
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
    }
  };

  const onUpdateUserList = (data: UserListUpdate) => {
    setUsers(data.userIds.filter((id) => id !== socket?.id));
  };

  const sendMediaOffer = (localPeerOffer: RTCSessionDescriptionInit) => {
    socket?.emit('mediaOffer', {
      offer: localPeerOffer,
      from: socket.id,
      to: selectedUser,
    });
  };

  const sendMediaAnswer = (peerAnswer: RTCSessionDescriptionInit, to: string) => {
    socket?.emit('mediaAnswer', {
      answer: peerAnswer,
      from: socket?.id,
      to,
    });
  };

  const sendIceCandidate = (candidate: RTCIceCandidateInit) => {
    socket?.emit('iceCandidate', {
      to: selectedUser,
      candidate,
    });
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Flex justifyContent="space-between">
        <Box>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', borderRadius: '8px', background: "blue" }}
          />
        </Box>
        <Box>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: '100%', borderRadius: '8px', background: "red"}}
          />
        </Box>
      </Flex>
      <Button onClick={handleCall} colorScheme="blue">
        Call
      </Button>
      <Box>
        {users.map((user) => (
          <Flex
            key={user}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            alignItems="center"
            justifyContent="space-between"
            bg={user === selectedUser ? 'blue.100' : 'white'}
            cursor="pointer"
            onClick={() => setSelectedUser(user)}
          >
            <Text>{user}</Text>
          </Flex>
        ))}
      </Box>
    </VStack>
  );
};

export default VideoChat;
