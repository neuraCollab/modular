import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router"
import Feature from "../../components/Index/Feature"
import Multistep from "../../components/Index/Multistep"
import useAuth from "../../hooks/useAuth"
import React, { useEffect, useRef, useState } from 'react'
import FindPerson from "../../components/FindPerson/FindPerson"
import Pagination from "../../components/Profile/Pagination"
import Card from "../../components/Profile/Card"
import ChatComponent from "../../components/Chat/ChatComponent"
import VideoChat from "../../components/Chat/VideoChat"
import CallModal from "../../components/Chat/CallModal"
import CallWindow from "../../components/Chat/CallWindow"
import {socket} from "../../utils/socket"
import PeerConnection from "../../utils/PeerConnection" 

export const Route = createFileRoute("/_layout/profile")({
  loader: ({ params }) => console.log(params),
  component: Profile,
})

interface AppState {
  callWindow: string;
  callModal: string;
  callFrom: string;
  localSrc: MediaStream | null;
  peerSrc: MediaStream | null;
}

function Profile() {
  const { user: currentUser } = useAuth();
  const [state, setState] = useState<AppState>({
    callWindow: "",
    callModal: "",
    callFrom: "",
    localSrc: null,
    peerSrc: null,
  });


  const pcRef = useRef<typeof PeerConnection | null>(null);
  const configRef = useRef<MediaStreamConstraints | null>(null);

  useEffect(() => {
    const handleRequest = ({ from: callFrom }: { from: string }) => {
      setState((prev) => ({ ...prev, callModal: "active", callFrom }));
    };

    const handleCall = (data: { sdp?: RTCSessionDescriptionInit; candidate?: RTCIceCandidateInit }) => {
      if (data.sdp) {
        pcRef.current?.setRemoteDescription(data.sdp);
        if (data.sdp.type === "offer") {
          pcRef.current?.createAnswer();
        }
      } else if (data.candidate) {
        pcRef.current?.addIceCandidate(data.candidate);
      }
    };

    const handleEnd = () => endCall(false);

    socket
      .on("request", handleRequest)
      .on("call", handleCall)
      .on("end", handleEnd)
      .emit("init");

    return () => {
      socket.off("request", handleRequest);
      socket.off("call", handleCall);
      socket.off("end", handleEnd);
    };
  }, []);

  const startCall = (isCaller: boolean, friendID: string, config: MediaStreamConstraints) => {
    configRef.current = config;
    pcRef.current = new PeerConnection(friendID)
      .on("localStream", (src) => {
        setState((prev) => ({
          ...prev,
          callWindow: "active",
          localSrc: src,
          ...(isCaller ? {} : { callModal: "" }),
        }));
      })
      .on("peerStream", (src) => setState((prev) => ({ ...prev, peerSrc: src })))
      .start(isCaller);
  };

  const rejectCall = () => {
    socket.emit("end", { to: state.callFrom });
    setState((prev) => ({ ...prev, callModal: "" }));
  };

  const endCall = (isStarter: boolean) => {
    pcRef.current?.stop(isStarter);
    pcRef.current = null;
    configRef.current = null;
    setState({
      callWindow: "",
      callModal: "",
      callFrom: "",
      localSrc: null,
      peerSrc: null,
    });
  };

  const { callFrom, callModal, callWindow, localSrc, peerSrc } = state;

  return (
    <>
     {configRef?.current && <CallWindow
        status={callWindow}
        localSrc={localSrc}
        peerSrc={peerSrc}
        config={configRef?.current ?? {}}
        mediaDevice={pcRef.current?.mediaDevice}
        endCall={endCall}
      /> }
      
      <CallModal
        status={callModal}
        startCall={startCall}
        rejectCall={rejectCall}
        callFrom={callFrom}
      />
      <Outlet />
    </>
  );
}

// export default Profile;