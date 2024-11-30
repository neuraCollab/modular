import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000'; // Replace with your actual server URL
export const socket: Socket = io(SERVER_URL);

// Interfaces for emitted and received data
interface InitData {
  id: string;
}

interface CallData {
  to: string;
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
}

interface RequestData {
  to: string;
}

interface EndData {
  to: string;
}

// Socket emitters
export const emitInit = () => socket.emit('init');
export const emitRequest = (data: RequestData) => socket.emit('request', data);
export const emitCall = (data: CallData) => socket.emit('call', data);
export const emitEnd = (data: EndData) => socket.emit('end', data);

// Socket listeners
export const onInit = (callback: (data: InitData) => void) =>
  socket.on('init', callback);

export const onRequest = (callback: (data: { from: string }) => void) =>
  socket.on('request', callback);

export const onCall = (callback: (data: CallData) => void) =>
  socket.on('call', callback);

export const onEnd = (callback: (data: { from: string }) => void) =>
  socket.on('end', callback);

// Utility for cleanup
export const disconnectSocket = () => {
  socket.disconnect();
};
