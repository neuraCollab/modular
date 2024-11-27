import { useEffect, useState } from 'react';
import MediaDevice from './MediaDevice';
import Emitter from './Emitter';
import socket from './socket';

const PC_CONFIG = { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] };

interface PeerConnectionProps {
  friendID: string;
}

const usePeerConnection = ({ friendID }: PeerConnectionProps) => {
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const [mediaDevice, setMediaDevice] = useState<MediaDevice | null>(null);

  useEffect(() => {
    const peerConnection = new RTCPeerConnection(PC_CONFIG);
    peerConnection.onicecandidate = (event) =>
      socket.emit('call', {
        to: friendID,
        candidate: event.candidate,
      });
    peerConnection.ontrack = (event) => emit('peerStream', event.streams[0]);

    const device = new MediaDevice();
    setPc(peerConnection);
    setMediaDevice(device);

    return () => {
      peerConnection.close();
      device.stop();
    };
  }, [friendID]);

  const startCall = (isCaller: boolean) => {
    mediaDevice?.on('stream', (stream) => {
      stream.getTracks().forEach((track) => {
        pc?.addTrack(track, stream);
      });
      emit('localStream', stream);
      if (isCaller) socket.emit('request', { to: friendID });
      else createOffer();
    });
    mediaDevice?.start();
  };

  const stopCall = (isStarter: boolean) => {
    if (isStarter) {
      socket.emit('end', { to: friendID });
    }
    mediaDevice?.stop();
    pc?.close();
    setPc(null);
    setMediaDevice(null);
    return;
  };

  const createOffer = () => {
    pc?.createOffer().then(getDescription).catch((err) => console.error(err));
  };

  const createAnswer = () => {
    pc?.createAnswer().then(getDescription).catch((err) => console.error(err));
  };

  const getDescription = (desc: RTCLocalSessionDescriptionInit) => {
    if (pc) {
      pc.setLocalDescription(desc);
      socket.emit('call', { to: friendID, sdp: desc });
    }
  };

  const setRemoteDescription = (sdp: RTCSessionDescriptionInit) => {
    const rtcSdp = new RTCSessionDescription(sdp);
    pc?.setRemoteDescription(rtcSdp);
  };

  const addIceCandidate = (candidate: RTCIceCandidateInit | null) => {
    if (candidate && pc) {
      const iceCandidate = new RTCIceCandidate(candidate);
      pc.addIceCandidate(iceCandidate);
    }
  };

  return {
    startCall,
    stopCall,
    createOffer,
    createAnswer,
    setRemoteDescription,
    addIceCandidate,
  };
};

export default usePeerConnection;
