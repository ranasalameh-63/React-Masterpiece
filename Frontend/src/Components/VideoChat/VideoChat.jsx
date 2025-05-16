import React, { useState, useEffect } from 'react';

const VideoChat = () => {
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const socket = new WebSocket('ws://localhost:8080'); 

  useEffect(() => {
    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        document.getElementById('localVideo').srcObject = stream;
      } catch (err) {
        console.error('Error accessing webcam: ', err);
      }
    };

    startLocalStream();

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'offer') {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.send(JSON.stringify({ type: 'answer', answer }));
      } else if (message.type === 'answer') {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(message.answer));
      } else if (message.type === 'candidate') {
        const candidate = new RTCIceCandidate(message.candidate);
        await peerConnection.addIceCandidate(candidate);
      }
    };

    return () => socket.close();
  }, []);

  const createPeerConnection = () => {
    const config = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    };
    const pc = new RTCPeerConnection(config);

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      document.getElementById('remoteVideo').srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
      }
    };

    setPeerConnection(pc);
  };

  const startCall = async () => {
    createPeerConnection();
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.send(JSON.stringify({ type: 'offer', offer }));
  };

  return (
    <div>
      <video id="localVideo" autoPlay muted></video>
      <video id="remoteVideo" autoPlay></video>
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default VideoChat;
