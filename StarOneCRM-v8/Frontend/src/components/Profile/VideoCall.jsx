import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import {
  Close,
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  ScreenShare,
  StopScreenShare,
} from "@mui/icons-material";
import { useGlobalContext } from "../../context/GlobalContext";
import "./VideoCall.css"; // Import the CSS file
import LaunchIcon from '@mui/icons-material/Launch';
import CallEndIcon from '@mui/icons-material/CallEnd';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
const VideoCall = ({ otherUserId, oncloseuser, videoCallUser }) => {
  const {
    user,
    socket,
    myId,
    setMyId,
    callRequest,
    setCallRequest,
    localStream,
    setLocalStream,
    remoteStream,
    setRemoteStream,
    cameras,
    setCameras,
    selectedCamera,
    setSelectedCamera,
    otherUserPeerId,
    setOtherUserPeerId,
    isVideoOn,
    setIsVideoOn,
    isAudioOn,
    setIsAudioOn,
    isScreenSharing,
    setIsScreenSharing,
    callDuration,
    setCallDuration,
    myVideoRef,
    remoteVideoRef,
    peerInstance,
    setVideoCallUser,
  } = useGlobalContext();

  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const floatingWindowRef = useRef(null);

  const startLocalStream = async (deviceId) => {
    const constraints = {
      video: { deviceId: deviceId ? { exact: deviceId } : undefined },
      audio: true,
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    setLocalStream(stream);
    myVideoRef.current.srcObject = stream;
    return stream;
  };

  const handleCameraChange = async (event) => {
    const deviceId = event.target.value;
    setSelectedCamera(deviceId);
    await startLocalStream(deviceId);
  };

  const startCall = async () => {
    socket.emit("check-user-registered", { to: otherUserId });

    socket.on("user-registered", (data) => {
      if (data.registered) {
        setOtherUserPeerId(data.peerId);
        initiateCall(data.peerId);
      } else {
        alert("User is offline");
      }
    });
  };

  const initiateCall = async (peerId) => {
    const stream = await startLocalStream(selectedCamera);
    const call = peerInstance.current.call(peerId, stream);

    call.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream);
      remoteVideoRef.current.srcObject = remoteStream;
    });

    // setCallRequest({ call });
  };

  const acceptCall = async (call) => {
    const stream = await startLocalStream(selectedCamera);
    call.answer(stream);
    call.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream);
      remoteVideoRef.current.srcObject = remoteStream;
    });

    socket.emit("call-accepted", { to: call.peer });
    await setVideoCallUser(true);
    setCallRequest(null);
  };

  const rejectCall = () => {
    socket.emit("call-rejected", { to: callRequest.from });
    setCallRequest(null);
  };

  const toggleVideo = () => {
    const videoTracks = localStream.getVideoTracks();
    videoTracks.forEach((track) => (track.enabled = !track.enabled));
    setIsVideoOn(!isVideoOn);
    socket.emit("video-toggle", { to: otherUserPeerId, isVideoOn: !isVideoOn });
  };

  const toggleAudio = () => {
    const audioTracks = localStream.getAudioTracks();
    audioTracks.forEach((track) => (track.enabled = !track.enabled));
    setIsAudioOn(!isAudioOn);
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const call = peerInstance.current.call(otherUserPeerId, stream);
      call.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
        remoteVideoRef.current.srcObject = remoteStream;
      });
      setIsScreenSharing(true);
    } else {
      const stream = await startLocalStream(selectedCamera);
      const call = peerInstance.current.call(otherUserPeerId, stream);
      call.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
        remoteVideoRef.current.srcObject = remoteStream;
      });
      setIsScreenSharing(false);
    }
  };

  const endCall = () => {
    console.log("Ending call...");

    if (localStream) {
      console.log("Stopping local stream...");
      localStream.getTracks().forEach((track) => {
        console.log(`Stopping track: ${track.kind}`);
        track.stop();
      });
      myVideoRef.current.srcObject = null; // Remove video source
    }

    if (remoteStream) {
      console.log("Stopping remote stream...");
      remoteStream.getTracks().forEach((track) => {
        console.log(`Stopping track: ${track.kind}`);
        track.stop();
      });
      remoteVideoRef.current.srcObject = null; // Remove video source
    }
    useEffect(() => {
      socket.on("call-ended", () => {
        endCall();
      });

      return () => {
        socket.off("call-ended");
      };
    }, []);
    // Reset state
    setLocalStream(null);
    setRemoteStream(null);
    setCallRequest(null);

    // Close Peer Connection
    if (peerInstance.current) {
      console.log("Closing peer connection...");
      peerInstance.current.destroy();
    }

    // Inform other user
    if (socket && otherUserPeerId) {
      console.log("Emitting end-call event...");
      socket.emit("end-call", { to: otherUserPeerId });
    }
  };

  const handleMouseDown = (e) => {
    const floatingWindow = floatingWindowRef.current;
    if (!floatingWindow) return;
  
    // Check if the event target is the header or its children
    const header = floatingWindow.querySelector('.floating-header');
    if (!header.contains(e.target)) return;
  
    const isTouch = e.type.startsWith("touch");
    const event = isTouch ? e.touches[0] : e;
  
    const rect = floatingWindow.getBoundingClientRect();
    const resizeCornerSize = 20; // Adjust based on UI
    const isResizing =
      event.clientX >= rect.right - resizeCornerSize &&
      event.clientY >= rect.bottom - resizeCornerSize;
  
    if (isResizing) {
      handleResize(e, isTouch);
    } else {
      handleDrag(e, isTouch);
    }
  };
  
  const handleDrag = (e, isTouch) => {
    const floatingWindow = floatingWindowRef.current;
    if (!floatingWindow) return;
  
    const event = isTouch ? e.touches[0] : e;
    const rect = floatingWindow.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
  
    const handleMove = (e) => {
      const event = isTouch ? e.touches[0] : e;
      floatingWindow.style.left = `${event.clientX - offsetX}px`;
      floatingWindow.style.top = `${event.clientY - offsetY}px`;
    };
  
    const handleEnd = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleEnd);
  };
  
  const handleResize = (e, isTouch) => {
    const floatingWindow = floatingWindowRef.current;
    if (!floatingWindow) return;
  
    const event = isTouch ? e.touches[0] : e;
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = floatingWindow.offsetWidth;
    const startHeight = floatingWindow.offsetHeight;
  
    const handleMove = (e) => {
      const event = isTouch ? e.touches[0] : e;
      const newWidth = startWidth + (event.clientX - startX);
      const newHeight = startHeight + (event.clientY - startY);
  
      floatingWindow.style.width = `${newWidth}px`;
      floatingWindow.style.height = `${newHeight}px`;
    };
  
    const handleEnd = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleEnd);
  };
  
  // Attach both mouse and touch event listeners
  floatingWindowRef.current?.addEventListener("mousedown", handleMouseDown);
  floatingWindowRef.current?.addEventListener("touchstart", handleMouseDown);
  return (
    <div
      className="floating-window"
      ref={floatingWindowRef}
      style={{
        left: position.x,
        top: position.y,
        display: videoCallUser || callRequest ? "block" : "none",
        height: "fit-content",
        paddingBottom: "30px",
      }}
    >
      <div
        className="floating-header"
        onMouseDown={handleMouseDown}
        style={{
          display: "flex",
          // justifyContent: "space-between",
          justifyContent: "right",
          alignItems: "center",
          backgroundColor: "#031738", // Slightly lighter blue
          color: "#F6F8FA",
          padding: "10px",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          height: "12px",
        }}
      >
        {/* <Typography variant="h6">Video Call</Typography> */}
        <IconButton
          onClick={() => {
            oncloseuser();
            endCall();
          }}
          sx={{
            color: "#F6F8FA",
          }}
        >
          <Close />
        </IconButton>
      </div>
      <div className="floating-content">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <video
            ref={myVideoRef}
            autoPlay
            muted
            className="floating-video"
            style={{ maxWidth: "clamp(250px, 40vw, 300px)", backgroundColor: "#F6F8FA"}}
          />
          <video
            ref={remoteVideoRef}
            autoPlay
            className="floating-video"
            style={{ maxWidth: "clamp(250px, 40vw, 300px)", backgroundColor: "#F6F8FA"}}
          />
        </Box>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          {/* <InputLabel>Select Camera</InputLabel>
          <Select value={selectedCamera} onChange={handleCameraChange}>
            {cameras.map((camera) => (
              <MenuItem key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
              </MenuItem>
            ))}
          </Select> */}
        </FormControl>
        <div
          className="floating-controls"
        >
          <Button
          variant="contained"
          color="primary"
          onClick={startCall}
        >
          {/* Launch */}
          <LaunchIcon />
        </Button>
          <IconButton
            color={isVideoOn ? "primary" : "secondary"}
            onClick={toggleVideo}
          >
            {isVideoOn ? <Videocam /> : <VideocamOff />}
          </IconButton>
          <IconButton
            color={isAudioOn ? "primary" : "secondary"}
            onClick={toggleAudio}
          >
            {isAudioOn ? <Mic /> : <MicOff />}
          </IconButton>
          <IconButton
            color={isScreenSharing ? "primary" : "secondary"}
            onClick={toggleScreenShare}
          >
            {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
          </IconButton>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              oncloseuser();
              endCall();
            }}
          >
            <CallEndIcon />
          </Button>
        </div>
      </div>
      <Dialog
        open={!!callRequest && callRequest.from !== myId}
        onClose={rejectCall}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Incoming Call</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Incoming call from {callRequest?.from}
          </Typography>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel>Select Camera</InputLabel>
            <Select value={selectedCamera} onChange={handleCameraChange}>
              {cameras.map((camera) => (
                <MenuItem key={camera.deviceId} value={camera.deviceId}>
                  {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => acceptCall(callRequest.call)}
          >
            Join Meeting
          </Button>
          <Button variant="contained" color="secondary" onClick={rejectCall}>
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VideoCall;
