import React from 'react';
import { Button, VStack, Text, Box } from '@chakra-ui/react';
import { FaPhone, FaVideo } from 'react-icons/fa';
import ActionButton from './ActionButton';

interface CallModalProps {
  status: string;
  callFrom: string;
  startCall: (isVideo: boolean, callFrom: string, config: { audio: boolean; video: boolean }) => void;
  rejectCall: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ status, callFrom, startCall, rejectCall }) => {
  const acceptWithVideo = (video: boolean) => {
    const config = { audio: true, video };
    return () => startCall(video, callFrom, config);
  };

  return (
    <Box
      className={`call-modal ${status}`}
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      borderWidth={1}
      borderRadius="md"
    >
      <Text fontSize="lg" fontWeight="bold">
        <span className="caller">{`${callFrom} is calling`}</span>
      </Text>

      <VStack spacing={4} mt={4}>
        <ActionButton
          icon={FaVideo}
          onClick={acceptWithVideo(true)}
        />
        <ActionButton
          icon={FaPhone}
          onClick={acceptWithVideo(false)}
        />
        <ActionButton
          className="hangup"
          icon={FaPhone}
          onClick={rejectCall}
        />
      </VStack>
    </Box>
  );
};

export default CallModal;
