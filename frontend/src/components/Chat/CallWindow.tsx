import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, VStack } from '@chakra-ui/react';
import { FaPhone, FaVideo } from 'react-icons/fa';
import ActionButton from './ActionButton';

interface CallWindowProps {
  status: string;
  localSrc: MediaStream | null;
  peerSrc: MediaStream | null;
  config: { audio: boolean; video: boolean };
  mediaDevice: { toggle: (deviceType: 'Audio' | 'Video', enabled?: boolean) => void };
  endCall: (hangup: boolean) => void;
}

const CallWindow: React.FC<CallWindowProps> = ({ peerSrc, localSrc, config, mediaDevice, status, endCall }) => {
  const peerVideo = useRef<HTMLVideoElement | null>(null);
  const localVideo = useRef<HTMLVideoElement | null>(null);
  const [video, setVideo] = useState(config.video);
  const [audio, setAudio] = useState(config.audio);

  useEffect(() => {
    if (peerVideo.current && peerSrc) peerVideo.current.srcObject = peerSrc;
    if (localVideo.current && localSrc) localVideo.current.srcObject = localSrc;
  }, [peerSrc, localSrc]);

  useEffect(() => {
    if (mediaDevice) {
      mediaDevice.toggle('Video', video);
      mediaDevice.toggle('Audio', audio);
    }
  }, [video, audio, mediaDevice]);

  const toggleMediaDevice = (deviceType: 'Audio' | 'Video') => {
    if (deviceType === 'Video') {
      setVideo(!video);
    }
    if (deviceType === 'Audio') {
      setAudio(!audio);
    }
    mediaDevice.toggle(deviceType);
  };

  return (
    <Box
      className={`call-window ${status}`}
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      borderWidth={1}
      borderRadius="md"
    >
      <video ref={peerVideo} autoPlay />
      <video ref={localVideo} autoPlay muted />

      <VStack spacing={4} mt={4}>
        <ActionButton
          icon={FaVideo}
          disabled={!video}
          onClick={() => toggleMediaDevice('Video')}
        />
        <ActionButton
          icon={FaPhone}
          disabled={!audio}
          onClick={() => toggleMediaDevice('Audio')}
        />
        <ActionButton
          className="hangup"
          icon={FaPhone}
          onClick={() => endCall(true)}
        />
      </VStack>
    </Box>
  );
};

export default CallWindow;
