import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Camera, CameraOff } from "lucide-react";
import io from "socket.io-client";

const VideoCallPage = () => {
  const [socket, setSocket] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  const roomId = "BuildNest-room";

  const createPeerConnection = () => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    const pc = new RTCPeerConnection(configuration);
    pc.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          room: roomId,
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setIsConnected(true);
      }
    };

    return pc;
  };

  const getLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      return stream;
    } catch (error) {
      setError("Error accessing the camera or microphone.");
      return null;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const stream = await getLocalStream();
      if (!stream) return;

      const pc = createPeerConnection();
      peerConnectionRef.current = pc;
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    };

    initialize();
  }, []);

  const toggleMute = () => {
    if (!localStreamRef.current) return;

    const audioTracks = localStreamRef.current.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    if (!localStreamRef.current) return;

    const videoTracks = localStreamRef.current.getVideoTracks();
    videoTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsVideoOff(!isVideoOff);
  };

  const endCall = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="w-full bg-white shadow-lg border-b-4 border-orange-400">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Video Room</h1>
                <p className="text-sm text-gray-600">Room : {roomId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
            <div className="flex items-center">
              <PhoneOff className="w-5 h-5 mr-3" />
              {error}
            </div>
          </div>
        )}

        {/* Video Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Local Video */}
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-orange-100">
            <div className="aspect-video bg-gray-100 relative">
              <video 
                ref={localVideoRef} 
                autoPlay 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
              {isVideoOff && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <CameraOff className="w-16 h-16 mx-auto mb-4 opacity-60" />
                      <p className="text-lg">The camera has been turned off</p>
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                You
              </div>
              <div className="absolute top-4 right-4">
                <div className={`w-3 h-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}></div>
              </div>
            </div>
          </div>

          {/* Remote Video */}
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-orange-100">
            <div className="aspect-video bg-gray-100 relative">
              <video 
                ref={remoteVideoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              {!isConnected && (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Camera className="w-10 h-10 text-orange-600" />
                    </div>
                    <p className="text-lg text-gray-700 mb-2">Waiting for the other user to connect...</p>
                    <div className="flex justify-center space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              {isConnected && (
                <div className="absolute top-4 left-4 bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Other user
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-orange-100">
            <div className="flex items-center space-x-4">
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 ${
                  isMuted
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title={isMuted ? "Unmute microphone" : "Mute microphone"}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              {/* Video Button */}
              <button
                onClick={toggleVideo}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 ${
                  isVideoOff
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title={isVideoOff ? "Turn on camera" : "Turn off camera"}
              >
                {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </button>

              {/* End Call Button */}
              <button
                onClick={endCall}
                className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg"
                title="End call"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>

            {/* Control Labels */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <span>{isMuted ? "Unmute microphone" : "Mute microphone"}</span>
              <span>{isVideoOff ? "Turn on camera" : "Turn off camera"}</span>
              <span>End call</span>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-orange-800">Secure and encrypted video call</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallPage;
