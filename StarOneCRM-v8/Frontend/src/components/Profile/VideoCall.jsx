// // // import React, { useEffect, useRef, useState } from "react";
// // // import { Button, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// // // import Peer from "peerjs";
// // // import io from "socket.io-client";
// // // import { useGlobalContext } from "../../context/GlobalContext";
// // // const socket = io("http://localhost:5000");

// // // const VideoCall = ({ userId, otherUserId }) => {
// // //     const [myId, setMyId] = useState("");
// // //     const [callRequest, setCallRequest] = useState(null);
// // //     const [localStream, setLocalStream] = useState(null);
// // //     const [remoteStream, setRemoteStream] = useState(null);
// // //     const [cameras, setCameras] = useState([]);
// // //     const [selectedCamera, setSelectedCamera] = useState("");
// // //     const myVideoRef = useRef();
// // //     const remoteVideoRef = useRef();
// // //     const peerInstance = useRef();
// // //     const { user } = useGlobalContext();
// // //     useEffect(() => {
// // //         // Initialize PeerJS
// // //         const peer = new Peer();
// // //         peer.on("open", (id) => {
// // //             setMyId(id);
// // //             socket.emit("register-user", id);
// // //         });

// // //         peer.on("call", (call) => {
// // //             // Show camera selection when receiving a call
// // //             listCameras().then(() => {
// // //                 setCallRequest({ ...callRequest, call });
// // //             });
// // //         });

// // //         peerInstance.current = peer;

// // //         // Socket.io listeners
// // //         socket.on("call-request", (data) => {
// // //             setCallRequest(data);
// // //         });

// // //         socket.on("call-accepted", (data) => {
// // //             const { answer } = data;
// // //             const call = peerInstance.current.call(callRequest.from, answer);
// // //             call.on("stream", (remoteStream) => {
// // //                 setRemoteStream(remoteStream);
// // //                 remoteVideoRef.current.srcObject = remoteStream;
// // //             });
// // //         });

// // //         socket.on("call-rejected", () => {
// // //             alert("Call rejected");
// // //             setCallRequest(null);
// // //         });
// // //     }, []);

// // //     // List available cameras
// // //     const listCameras = async () => {
// // //         const devices = await navigator.mediaDevices.enumerateDevices();
// // //         const videoDevices = devices.filter((device) => device.kind === "videoinput");
// // //         setCameras(videoDevices);
// // //         if (videoDevices.length > 0) {
// // //             setSelectedCamera(videoDevices[0].deviceId);
// // //         }
// // //     };

// // //     // Start local stream with selected camera
// // //     const startLocalStream = async (deviceId) => {
// // //         const constraints = {
// // //             video: { deviceId: deviceId ? { exact: deviceId } : undefined },
// // //             audio: true,
// // //         };
// // //         const stream = await navigator.mediaDevices.getUserMedia(constraints);
// // //         setLocalStream(stream);
// // //         myVideoRef.current.srcObject = stream;
// // //         return stream;
// // //     };

// // //     // Handle camera change
// // //     const handleCameraChange = async (event) => {
// // //         const deviceId = event.target.value;
// // //         setSelectedCamera(deviceId);
// // //         await startLocalStream(deviceId);
// // //     };

// // //     // Start a call
// // //     const startCall = async () => {
// // //         const stream = await startLocalStream(selectedCamera);
// // //         const call = peerInstance.current.call(otherUserId, stream);
// // //         call.on("stream", (remoteStream) => {
// // //             setRemoteStream(remoteStream);
// // //             remoteVideoRef.current.srcObject = remoteStream;
// // //         });

// // //         socket.emit("call-user", { to: otherUserId, offer: call.offer });
// // //     };

// // //     // Accept a call
// // //     const acceptCall = async () => {
// // //         const stream = await startLocalStream(selectedCamera);
// // //         callRequest.call.answer(stream);
// // //         callRequest.call.on("stream", (remoteStream) => {
// // //             setRemoteStream(remoteStream);
// // //             remoteVideoRef.current.srcObject = remoteStream;
// // //         });

// // //         socket.emit("call-accepted", { to: callRequest.from });
// // //         setCallRequest(null);
// // //     };

// // //     // Reject a call
// // //     const rejectCall = () => {
// // //         socket.emit("call-rejected", { to: callRequest.from });
// // //         setCallRequest(null);
// // //     };

// // //     return (
// // //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
// // //             <Typography variant="h4" sx={{ marginBottom: 2 }}>My ID: {myId}</Typography>
// // //             <Grid container spacing={2} sx={{ marginBottom: 2 }}>
// // //                 <Grid item xs={6}>
// // //                     <video ref={myVideoRef} autoPlay muted style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
// // //                 </Grid>
// // //                 <Grid item xs={6}>
// // //                     <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
// // //                 </Grid>
// // //             </Grid>

// // //             {/* Camera Selection */}
// // //             <FormControl fullWidth sx={{ marginBottom: 2 }}>
// // //                 <InputLabel>Select Camera</InputLabel>
// // //                 <Select value={selectedCamera} onChange={handleCameraChange}>
// // //                     {cameras.map((camera) => (
// // //                         <MenuItem key={camera.deviceId} value={camera.deviceId}>
// // //                             {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
// // //                         </MenuItem>
// // //                     ))}
// // //                 </Select>
// // //             </FormControl>

// // //             {/* Call Button */}
// // //             <Button variant="contained" color="primary" onClick={startCall} sx={{ marginBottom: 2 }}>Call</Button>

// // //             {/* Incoming Call */}
// // //             {callRequest && (
// // //                 <div style={{ textAlign: 'center', marginTop: '16px' }}>
// // //                     <Typography variant="h6">Incoming call from {callRequest.from}</Typography>
// // //                     <Button variant="contained" color="primary" onClick={acceptCall} sx={{ marginRight: 2 }}>Accept</Button>
// // //                     <Button variant="contained" color="secondary" onClick={rejectCall}>Reject</Button>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default VideoCall;

// // // import React, { useEffect, useRef, useState } from "react";
// // // import { Button, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// // // import io from "socket.io-client";
// // // import { useGlobalContext } from "../../context/GlobalContext";

// // // const socket = io("http://localhost:5000");

// // // const VideoCall = ({ userId, otherUserId }) => {
// // //     const [myId, setMyId] = useState("");
// // //     const [callRequest, setCallRequest] = useState(null);
// // //     const [localStream, setLocalStream] = useState(null);
// // //     const [remoteStream, setRemoteStream] = useState(null);
// // //     const [cameras, setCameras] = useState([]);
// // //     const [selectedCamera, setSelectedCamera] = useState("");
// // //     const myVideoRef = useRef();
// // //     const remoteVideoRef = useRef();

// // //     const { peer } = useGlobalContext(); // Get peer instance from context

// // //     useEffect(() => {
// // //         if (!peer) return; // Wait until peer is initialized

// // //         peer.on("open", (id) => {
// // //             setMyId(id);
// // //             socket.emit("register-user", id);
// // //         });

// // //         peer.on("call", (call) => {
// // //             listCameras().then(() => {
// // //                 setCallRequest({ ...callRequest, call });
// // //             });
// // //         });

// // //         // Socket listeners
// // //         socket.on("call-request", (data) => {
// // //             setCallRequest(data);
// // //         });

// // //         socket.on("call-accepted", (data) => {
// // //             const { answer } = data;
// // //             const call = peer.call(callRequest.from, answer);
// // //             call.on("stream", (remoteStream) => {
// // //                 setRemoteStream(remoteStream);
// // //                 remoteVideoRef.current.srcObject = remoteStream;
// // //             });
// // //         });

// // //         socket.on("call-rejected", () => {
// // //             alert("Call rejected");
// // //             setCallRequest(null);
// // //         });

// // //     }, [peer]);

// // //     const listCameras = async () => {
// // //         const devices = await navigator.mediaDevices.enumerateDevices();
// // //         const videoDevices = devices.filter((device) => device.kind === "videoinput");
// // //         setCameras(videoDevices);
// // //         if (videoDevices.length > 0) {
// // //             setSelectedCamera(videoDevices[0].deviceId);
// // //         }
// // //     };

// // //     const startLocalStream = async (deviceId) => {
// // //         const constraints = {
// // //             video: { deviceId: deviceId ? { exact: deviceId } : undefined },
// // //             audio: true,
// // //         };
// // //         const stream = await navigator.mediaDevices.getUserMedia(constraints);
// // //         setLocalStream(stream);
// // //         myVideoRef.current.srcObject = stream;
// // //         return stream;
// // //     };

// // //     const handleCameraChange = async (event) => {
// // //         const deviceId = event.target.value;
// // //         setSelectedCamera(deviceId);
// // //         await startLocalStream(deviceId);
// // //     };

// // //     const startCall = async () => {
// // //         if (!peer) return;
// // //         const stream = await startLocalStream(selectedCamera);
// // //         const call = peer.call(otherUserId, stream);
// // //         call.on("stream", (remoteStream) => {
// // //             setRemoteStream(remoteStream);
// // //             remoteVideoRef.current.srcObject = remoteStream;
// // //         });

// // //         socket.emit("call-user", { to: otherUserId, offer: call.offer });
// // //     };

// // //     const acceptCall = async () => {
// // //         if (!callRequest || !peer) return;
// // //         const stream = await startLocalStream(selectedCamera);
// // //         callRequest.call.answer(stream);
// // //         callRequest.call.on("stream", (remoteStream) => {
// // //             setRemoteStream(remoteStream);
// // //             remoteVideoRef.current.srcObject = remoteStream;
// // //         });

// // //         socket.emit("call-accepted", { to: callRequest.from });
// // //         setCallRequest(null);
// // //     };

// // //     const rejectCall = () => {
// // //         socket.emit("call-rejected", { to: callRequest.from });
// // //         setCallRequest(null);
// // //     };

// // //     return (
// // //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
// // //             <Typography variant="h4" sx={{ marginBottom: 2 }}>My ID: {myId}</Typography>
// // //             <Grid container spacing={2} sx={{ marginBottom: 2 }}>
// // //                 <Grid item xs={6}>
// // //                     <video ref={myVideoRef} autoPlay muted style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
// // //                 </Grid>
// // //                 <Grid item xs={6}>
// // //                     <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
// // //                 </Grid>
// // //             </Grid>

// // //             <FormControl fullWidth sx={{ marginBottom: 2 }}>
// // //                 <InputLabel>Select Camera</InputLabel>
// // //                 <Select value={selectedCamera} onChange={handleCameraChange}>
// // //                     {cameras.map((camera) => (
// // //                         <MenuItem key={camera.deviceId} value={camera.deviceId}>
// // //                             {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
// // //                         </MenuItem>
// // //                     ))}
// // //                 </Select>
// // //             </FormControl>

// // //             <Button variant="contained" color="primary" onClick={startCall} sx={{ marginBottom: 2 }}>Call</Button>

// // //             {callRequest && (
// // //                 <div style={{ textAlign: 'center', marginTop: '16px' }}>
// // //                     <Typography variant="h6">Incoming call from {callRequest.from}</Typography>
// // //                     <Button variant="contained" color="primary" onClick={acceptCall} sx={{ marginRight: 2 }}>Accept</Button>
// // //                     <Button variant="contained" color="secondary" onClick={rejectCall}>Reject</Button>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default VideoCall;

// // import React, { useEffect, useRef, useState } from "react";
// // import { Button, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// // import io from "socket.io-client";
// // import { useGlobalContext } from "../../context/GlobalContext";

// // // const socket = io("http://localhost:5000");

// // const VideoCall = ({ otherUserId }) => {
// //     const [callRequest, setCallRequest] = useState(null);
// //     const [localStream, setLocalStream] = useState(null);
// //     const [remoteStream, setRemoteStream] = useState(null);
// //     const [cameras, setCameras] = useState([]);
// //     const [selectedCamera, setSelectedCamera] = useState("");
// //     const myVideoRef = useRef();
// //     const remoteVideoRef = useRef();

// //     const { peer, peerId, socket } = useGlobalContext(); // 🔹 Use peer from global context

// //     useEffect(() => {
// //         if (!peer) return;

// //         peer.on("call", (call) => {
// //             listCameras().then(() => {
// //                 setCallRequest({ call });
// //             });
// //         });

// //         socket.on("call-request", (data) => {
// //             setCallRequest(data);
// //         });

// //         socket.on("call-accepted", (data) => {
// //             const { answer } = data;
// //             const call = peer.call(callRequest.from, answer);
// //             call.on("stream", (remoteStream) => {
// //                 setRemoteStream(remoteStream);
// //                 remoteVideoRef.current.srcObject = remoteStream;
// //             });
// //         });

// //         socket.on("call-rejected", () => {
// //             alert("Call rejected");
// //             setCallRequest(null);
// //         });
// //     }, [peer]);

// //     const listCameras = async () => {
// //         const devices = await navigator.mediaDevices.enumerateDevices();
// //         const videoDevices = devices.filter((device) => device.kind === "videoinput");
// //         setCameras(videoDevices);
// //         if (videoDevices.length > 0) {
// //             setSelectedCamera(videoDevices[0].deviceId);
// //         }
// //     };

// //     const startLocalStream = async (deviceId) => {
// //         const constraints = { video: { deviceId: deviceId ? { exact: deviceId } : undefined }, audio: true };
// //         const stream = await navigator.mediaDevices.getUserMedia(constraints);
// //         setLocalStream(stream);
// //         myVideoRef.current.srcObject = stream;
// //         return stream;
// //     };

// //     const handleCameraChange = async (event) => {
// //         const deviceId = event.target.value;
// //         setSelectedCamera(deviceId);
// //         await startLocalStream(deviceId);
// //     };

// //     const startCall = async () => {
// //         if (!peer) return;
// //         const stream = await startLocalStream(selectedCamera);
// //         const call = peer.call(otherUserId, stream);
// //         call.on("stream", (remoteStream) => {
// //             setRemoteStream(remoteStream);
// //             remoteVideoRef.current.srcObject = remoteStream;
// //         });

// //         socket.emit("call-user", { to: otherUserId, offer: call.offer });
// //     };

// //     const acceptCall = async () => {
// //         if (!callRequest || !peer) return;
// //         const stream = await startLocalStream(selectedCamera);
// //         callRequest.call.answer(stream);
// //         callRequest.call.on("stream", (remoteStream) => {
// //             setRemoteStream(remoteStream);
// //             remoteVideoRef.current.srcObject = remoteStream;
// //         });

// //         socket.emit("call-accepted", { to: callRequest.from });
// //         setCallRequest(null);
// //     };

// //     const rejectCall = () => {
// //         socket.emit("call-rejected", { to: callRequest.from });
// //         setCallRequest(null);
// //     };

// //     return (
// //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
// //             <Typography variant="h4" sx={{ marginBottom: 2 }}>My ID: {peerId}</Typography>
// //             <Grid container spacing={2} sx={{ marginBottom: 2 }}>
// //                 <Grid item xs={6}>
// //                     <video ref={myVideoRef} autoPlay muted style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
// //                 </Grid>
// //                 <Grid item xs={6}>
// //                     <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
// //                 </Grid>
// //             </Grid>

// //             <FormControl fullWidth sx={{ marginBottom: 2 }}>
// //                 <InputLabel>Select Camera</InputLabel>
// //                 <Select value={selectedCamera} onChange={handleCameraChange}>
// //                     {cameras.map((camera) => (
// //                         <MenuItem key={camera.deviceId} value={camera.deviceId}>
// //                             {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
// //                         </MenuItem>
// //                     ))}
// //                 </Select>
// //             </FormControl>

// //             <Button variant="contained" color="primary" onClick={startCall} sx={{ marginBottom: 2 }}>Call</Button>

// //             {callRequest && (
// //                 <div style={{ textAlign: 'center', marginTop: '16px' }}>
// //                     <Typography variant="h6">Incoming call from {callRequest.from}</Typography>
// //                     <Button variant="contained" color="primary" onClick={acceptCall} sx={{ marginRight: 2 }}>Accept</Button>
// //                     <Button variant="contained" color="secondary" onClick={rejectCall}>Reject</Button>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default VideoCall;

// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   Button,
// //   Typography,
// //   Grid,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// // } from "@mui/material";
// // import { useGlobalContext } from "../../context/GlobalContext";

// // const VideoCall = ({ otherUserId }) => {
// //   const [callRequest, setCallRequest] = useState(null);
// //   const [localStream, setLocalStream] = useState(null);
// //   const [remoteStream, setRemoteStream] = useState(null);
// //   const [cameras, setCameras] = useState([]);
// //   const [selectedCamera, setSelectedCamera] = useState("");
// //   const myVideoRef = useRef();
// //   const remoteVideoRef = useRef();

// //   const { peer, peerId, socket } = useGlobalContext();
// //   useEffect(() => {
// //     listCameras(); // Call the function to fetch cameras when component mounts
// //   }, []);

// //   useEffect(() => {
// //     if (!peer || !socket) return;

// //     // Handle incoming calls
// //     peer.on("call", (call) => {
// //       listCameras().then(() => {
// //         setCallRequest({ call });
// //       });
// //     });

// //     // Handle call requests
// //     socket.on("call-request", (data) => {
// //       setCallRequest(data);
// //     });

// //     // Handle call acceptance
// //     socket.on("call-accepted", (data) => {
// //       const { answer } = data;
// //       const call = peer.call(callRequest.from, answer);
// //       call.on("stream", (remoteStream) => {
// //         setRemoteStream(remoteStream);
// //         remoteVideoRef.current.srcObject = remoteStream;
// //       });
// //     });

// //     // Handle call rejection
// //     socket.on("call-rejected", () => {
// //       alert("Call rejected");
// //       setCallRequest(null);
// //     });
// //   }, [peer, socket]);

// //   const listCameras = async () => {
// //     const devices = await navigator.mediaDevices.enumerateDevices();
// //     const videoDevices = devices.filter(
// //       (device) => device.kind === "videoinput"
// //     );
// //     setCameras(videoDevices);
// //     if (videoDevices.length > 0) {
// //       setSelectedCamera(videoDevices[0].deviceId);
// //     }
// //   };

// //   const startLocalStream = async (deviceId) => {
// //     const constraints = {
// //       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
// //     //   audio: true,
// //     };
// //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
// //     setLocalStream(stream);
// //     myVideoRef.current.srcObject = stream;
// //     return stream;
// //   };

// //   const handleCameraChange = async (event) => {
// //     const deviceId = event.target.value;
// //     setSelectedCamera(deviceId);
// //     await startLocalStream(deviceId);
// //   };

// //   const startCall = async () => {
// //     if (!peer) return;
// //     const stream = await startLocalStream(selectedCamera);
// //     const call = peer.call(otherUserId, stream);
// //     call.on("stream", (remoteStream) => {
// //       setRemoteStream(remoteStream);
// //       remoteVideoRef.current.srcObject = remoteStream;
// //     });

// //     socket.emit("call-user", { to: otherUserId, offer: call.offer });
// //   };

// //   const acceptCall = async () => {
// //     if (!callRequest || !peer) return;
// //     const stream = await startLocalStream(selectedCamera);
// //     callRequest.call.answer(stream);
// //     callRequest.call.on("stream", (remoteStream) => {
// //       setRemoteStream(remoteStream);
// //       remoteVideoRef.current.srcObject = remoteStream;
// //     });

// //     socket.emit("call-accepted", { to: callRequest.from });
// //     setCallRequest(null);
// //   };

// //   const rejectCall = () => {
// //     socket.emit("call-rejected", { to: callRequest.from });
// //     setCallRequest(null);
// //   };

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         padding: 2,
// //       }}
// //     >
// //       <Typography variant="h4" sx={{ marginBottom: 2 }}>
// //         My ID: {peerId}
// //       </Typography>
// //       <Grid container spacing={2} sx={{ marginBottom: 2 }}>
// //         <Grid item xs={6}>
// //           <video
// //             ref={myVideoRef}
// //             autoPlay
// //             muted
// //             style={{
// //               width: "100%",
// //               height: "300px",
// //               borderRadius: "8px",
// //               backgroundColor: "#000",
// //             }}
// //           />
// //         </Grid>
// //         <Grid item xs={6}>
// //           <video
// //             ref={remoteVideoRef}
// //             autoPlay
// //             style={{
// //               width: "100%",
// //               height: "300px",
// //               borderRadius: "8px",
// //               backgroundColor: "#000",
// //             }}
// //           />
// //         </Grid>
// //       </Grid>

// //       <FormControl fullWidth sx={{ marginBottom: 2 }}>
// //         <InputLabel>Select Camera</InputLabel>
// //         <Select value={selectedCamera} onChange={handleCameraChange}>
// //           {cameras.map((camera) => (
// //             <MenuItem key={camera.deviceId} value={camera.deviceId}>
// //               {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <Button
// //         variant="contained"
// //         color="primary"
// //         onClick={startCall}
// //         sx={{ marginBottom: 2 }}
// //       >
// //         Call
// //       </Button>

// //       {callRequest && (
// //         <div style={{ textAlign: "center", marginTop: "16px" }}>
// //           <Typography variant="h6">
// //             Incoming call from {callRequest.from}
// //           </Typography>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             onClick={acceptCall}
// //             sx={{ marginRight: 2 }}
// //           >
// //             Accept
// //           </Button>
// //           <Button variant="contained" color="secondary" onClick={rejectCall}>
// //             Reject
// //           </Button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default VideoCall;

// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   Button,
// //   Typography,
// //   Grid,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// // } from "@mui/material";
// // import { useGlobalContext } from "../../context/GlobalContext";

// // const VideoCall = ({ otherUserId }) => {
// //   const [callRequest, setCallRequest] = useState(null);
// //   const [localStream, setLocalStream] = useState(null);
// //   const [remoteStream, setRemoteStream] = useState(null);
// //   const [cameras, setCameras] = useState([]);
// //   const [selectedCamera, setSelectedCamera] = useState("");
// //   const myVideoRef = useRef();
// //   const remoteVideoRef = useRef();

// //   const { peer, peerId, socket } = useGlobalContext();
// // //   useEffect(() => {
// // //     listCameras(); // Call the function to fetch cameras when component mounts
// // //   }, []);

// //   useEffect(() => {
// //     // if (!peer || !socket) return;
// //     if (!peer) console.log("No peer instance");
// //     if (!socket) console.log("No socket instance");
// //     console.log(peer);
// //     console.log(socket);
// //     // Handle incoming calls
// //     // peer.on("call", (call) => {
// //     //   listCameras().then(() => {
// //     //     console.log(call);
// //     //     setCallRequest({ call });
// //     //   });
// //     // });
// //     peer.on("call", (call) => {
// //         // Show camera selection when receiving a call
// //         console.log("setting list")
// //         listCameras().then(() => {
// //             setCallRequest({ ...callRequest, call });
// //         });
// //     });

// //     // Handle call requests
// //     socket.on("call-request", (data) => {
// //         console.log("call-received")
// //         console.log(data);
// //         console.log(peer);
// //         peer.on("call", (call) => {
// //             // Show camera selection when receiving a call
// //             console.log("setting list")
// //             listCameras().then(() => {
// //                 setCallRequest({ ...callRequest, call });
// //             });
// //         });
// //       setCallRequest(data);
// //     });
// //     // socket.on("call-request", (data) => {
// //     //     console.log("Received call request:", data);

// //     //     // Ensure `peer.on("call")` handles the actual call object
// //     //     peer.on("call", (call) => {
// //     //       setCallRequest({ call, from: data.from });
// //     //     });
// //     //   });

// //     // Handle call acceptance
// //     socket.on("call-accepted", (data) => {
// //       const { answer } = data;
// //       const call = peer.call(callRequest.from, answer);
// //       call.on("stream", (remoteStream) => {
// //         setRemoteStream(remoteStream);
// //         remoteVideoRef.current.srcObject = remoteStream;
// //       });
// //     });

// //     // Handle call rejection
// //     socket.on("call-rejected", () => {
// //       alert("Call rejected");
// //     //   setCallRequest(null);
// //     });
// //   }, []);

// // //   const listCameras = async () => {
// // //     const devices = await navigator.mediaDevices.enumerateDevices();
// // //     const videoDevices = devices.filter(
// // //       (device) => device.kind === "videoinput"
// // //     );
// // //     setCameras(videoDevices);
// // //     if (videoDevices.length > 0) {
// // //       setSelectedCamera(videoDevices[0].deviceId);
// // //     }
// // //   };
// // const listCameras = async () => {
// //     const devices = await navigator.mediaDevices.enumerateDevices();
// //     const videoDevices = devices.filter((device) => device.kind === "videoinput");
// //     setCameras(videoDevices);
// //     if (videoDevices.length > 0) {
// //         setSelectedCamera(videoDevices[0].deviceId);
// //     }
// // };
// //   const startLocalStream = async (deviceId) => {
// //     const constraints = {
// //       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
// //     //   audio: true,
// //     };
// //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
// //     setLocalStream(stream);
// //     myVideoRef.current.srcObject = stream;
// //     return stream;
// //   };

// //   const handleCameraChange = async (event) => {
// //     const deviceId = event.target.value;
// //     setSelectedCamera(deviceId);
// //     await startLocalStream(deviceId);
// //   };

// //   const startCall = async () => {
// //     if (!peer) return;
// //     const stream = await startLocalStream(selectedCamera);
// //     const call = peer.call(otherUserId, stream);
// //     call.on("stream", (remoteStream) => {
// //       setRemoteStream(remoteStream);
// //       remoteVideoRef.current.srcObject = remoteStream;
// //     });

// //     socket.emit("call-user", { to: otherUserId, offer: call.offer });
// //   };

// // //   const acceptCall = async () => {
// // //     if (!callRequest || !peer) return;
// // //     const stream = await startLocalStream(selectedCamera);
// // //     callRequest.call.answer(stream);
// // //     callRequest.call.on("stream", (remoteStream) => {
// // //       setRemoteStream(remoteStream);
// // //       remoteVideoRef.current.srcObject = remoteStream;
// // //     });

// // //     socket.emit("call-accepted", { to: callRequest.from });
// // //     setCallRequest(null);
// // //   };

// //   const rejectCall = () => {
// //     socket.emit("call-rejected", { to: callRequest.from });
// //     // setCallRequest(null);
// //   };

// //   const acceptCall = async () => {
// //     const stream = await startLocalStream(selectedCamera);
// //     console.log(callRequest);
// //     console.log(callRequest.call);
// //     console.log(callRequest.call.answer);
// //     callRequest.call.answer(stream);
// //     callRequest.call.on("stream", (remoteStream) => {
// //         setRemoteStream(remoteStream);
// //         remoteVideoRef.current.srcObject = remoteStream;
// //     });

// //     socket.emit("call-accepted", { to: callRequest.from });
// //     // setCallRequest(null);
// // };
// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         padding: 2,
// //       }}
// //     >
// //       <Typography variant="h4" sx={{ marginBottom: 2 }}>
// //         My ID: {peerId}
// //       </Typography>
// //       <Grid container spacing={2} sx={{ marginBottom: 2 }}>
// //         <Grid item xs={6}>
// //           <video
// //             ref={myVideoRef}
// //             autoPlay
// //             muted
// //             style={{
// //               width: "100%",
// //               height: "300px",
// //               borderRadius: "8px",
// //               backgroundColor: "#000",
// //             }}
// //           />
// //         </Grid>
// //         <Grid item xs={6}>
// //           <video
// //             ref={remoteVideoRef}
// //             autoPlay
// //             style={{
// //               width: "100%",
// //               height: "300px",
// //               borderRadius: "8px",
// //               backgroundColor: "#000",
// //             }}
// //           />
// //         </Grid>
// //       </Grid>

// //       <FormControl fullWidth sx={{ marginBottom: 2 }}>
// //         <InputLabel>Select Camera</InputLabel>
// //         <Select value={selectedCamera} onChange={handleCameraChange}>
// //           {cameras.map((camera) => (
// //             <MenuItem key={camera.deviceId} value={camera.deviceId}>
// //               {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <Button
// //         variant="contained"
// //         color="primary"
// //         onClick={startCall}
// //         sx={{ marginBottom: 2 }}
// //       >
// //         Call
// //       </Button>

// //       {callRequest && (
// //         <div style={{ textAlign: "center", marginTop: "16px" }}>
// //           <Typography variant="h6">
// //             Incoming call from {callRequest.from}
// //           </Typography>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             onClick={acceptCall}
// //             sx={{ marginRight: 2 }}
// //           >
// //             Accept
// //           </Button>
// //           <Button variant="contained" color="secondary" onClick={rejectCall}>
// //             Reject
// //           </Button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default VideoCall;

// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   Button,
// //   Typography,
// //   Grid,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Container,
// // } from "@mui/material";
// // import { useGlobalContext } from "../../context/GlobalContext";
// // import Peer from "peerjs";
// // import io from "socket.io-client";
// // import { use } from "react";
// // const socket = io("http://localhost:5000");

// // const VideoCall = ({ otherUserId }) => {
// //     useEffect(() => {
// //         console.log(otherUserId)
// //     }), [otherUserId]
// //     const [myId, setMyId] = useState("");
// //     // const [callId, setCallId] = useState("");
// //     const [callRequest, setCallRequest] = useState(null);
// //     const [localStream, setLocalStream] = useState(null);
// //     const [remoteStream, setRemoteStream] = useState(null);
// //     const [cameras, setCameras] = useState([]);
// //     const [selectedCamera, setSelectedCamera] = useState("");
// //     const myVideoRef = useRef();
// //     const remoteVideoRef = useRef();
// //     const peerInstance = useRef();
// //     const {user} = useGlobalContext();
// //     // useEffect(() => {
// //     //     listCameras(); // Call the function to fetch cameras when component mounts
// //     // }, []);
// //     useEffect(() => {
// //         // Initialize PeerJS
// //         const peer = new Peer();
// //         // peer.on("open", (id) => {
// //         //     // setMyId(id);
// //         //     // socket.emit("register-user", id);
// //         //     setMyId(user._id);
// //         //     socket.emit("register-user", user._id);
// //         // });

// //         // peer.on("call", (call) => {
// //         //     // Show camera selection when receiving a call
// //         //     listCameras().then(() => {
// //         //         setCallRequest({ ...callRequest, call });
// //         //     });
// //         // });
// //         peer.on("open", (id) => {
// //             setMyId(user._id);
// //             socket.emit("register-user", user._id);

// //             peer.on("call", (call) => {
// //                 console.log("Incoming call detected:", call);
// //                 listCameras().then(() => {
// //                     setCallRequest((prev) => ({ ...prev, call }));
// //                 });
// //             });
// //         });

// //         peerInstance.current = peer;

// //         // Socket.io listeners
// //         socket.on("call-request", (data) => {
// //             setCallRequest(data);
// //         });

// //         socket.on("call-accepted", (data) => {
// //             const { answer } = data;
// //             const call = peerInstance.current.call(callRequest.from, answer);
// //             call.on("stream", (remoteStream) => {
// //                 setRemoteStream(remoteStream);
// //                 remoteVideoRef.current.srcObject = remoteStream;
// //             });
// //             console.log(`Call accepted by ${from}, sending to ${to}`);
// //         });

// //         socket.on("call-rejected", () => {
// //             alert("Call rejected");
// //             setCallRequest(null);
// //         });
// //     }, []);

// //     // List available cameras
// //     const listCameras = async () => {
// //         const devices = await navigator.mediaDevices.enumerateDevices();
// //         const videoDevices = devices.filter((device) => device.kind === "videoinput");
// //         setCameras(videoDevices);
// //         if (videoDevices.length > 0) {
// //             setSelectedCamera(videoDevices[0].deviceId);
// //         }
// //     };

// //     // Start local stream with selected camera
// //     const startLocalStream = async (deviceId) => {
// //         const constraints = {
// //             video: { deviceId: deviceId ? { exact: deviceId } : undefined },
// //             // audio: true,
// //         };
// //         const stream = await navigator.mediaDevices.getUserMedia(constraints);
// //         setLocalStream(stream);
// //         myVideoRef.current.srcObject = stream;
// //         return stream;
// //     };

// //     // Handle camera change
// //     const handleCameraChange = async (event) => {
// //         const deviceId = event.target.value;
// //         setSelectedCamera(deviceId);
// //         await startLocalStream(deviceId);
// //     };

// //     // Start a call
// //     // const startCall = async () => {
// //     //     if (!peerInstance.current) return;
// //     //     const stream = await startLocalStream(selectedCamera);
// //     //     const call = peerInstance.current.call(otherUserId, stream);
// //     //     call.on("stream", (remoteStream) => {
// //     //     setRemoteStream(remoteStream);
// //     //     remoteVideoRef.current.srcObject = remoteStream;
// //     //     });

// //     //     socket.emit("call-user", { to: otherUserId, offer: call.offer });
// //     // };
// //     const startCall = async () => {
// //         const stream = await startLocalStream(selectedCamera);
// //         const call = peerInstance.current.call(otherUserId, stream);
// //         call.on("stream", (remoteStream) => {
// //             setRemoteStream(remoteStream);
// //             remoteVideoRef.current.srcObject = remoteStream;
// //         });

// //         socket.emit("call-user", { to: otherUserId, offer: call.offer });
// //     };
// //     // Accept a call
// //     const acceptCall = async () => {
// //         const stream = await startLocalStream(selectedCamera);
// //         callRequest.call.answer(stream);
// //         callRequest.call.on("stream", (remoteStream) => {
// //             setRemoteStream(remoteStream);
// //             remoteVideoRef.current.srcObject = remoteStream;
// //         });

// //         socket.emit("call-accepted", { to: callRequest.from });
// //         setCallRequest(null);
// //     };

// //     // Reject a call
// //     const rejectCall = () => {
// //         socket.emit("call-rejected", { to: callRequest.from });
// //         setCallRequest(null);
// //     };

// //   return (
// //     <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
// //     <Typography variant="h4" sx={{ marginBottom: 2 }}>My ID: {myId}</Typography>
// //     <Grid container spacing={2} sx={{ marginBottom: 2 }}>
// //         <Grid item xs={6}>
// //             <video ref={myVideoRef} autoPlay muted style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
// //         </Grid>
// //         <Grid item xs={6}>
// //             <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
// //         </Grid>
// //     </Grid>

// //     {/* Camera Selection */}
// //     <FormControl fullWidth sx={{ marginBottom: 2 }}>
// //         <InputLabel>Select Camera</InputLabel>
// //         <Select value={selectedCamera} onChange={handleCameraChange}>
// //             {cameras.map((camera) => (
// //                 <MenuItem key={camera.deviceId} value={camera.deviceId}>
// //                     {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
// //                 </MenuItem>
// //             ))}
// //         </Select>
// //     </FormControl>

// //     {/* Call Input */}
// //     {/* <input
// //         type="text"
// //         value={callId}
// //         onChange={(e) => setCallId(e.target.value)}
// //         placeholder="Enter ID to call"
// //         style={{ marginBottom: '16px', padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
// //     /> */}
// //     <Button variant="contained" color="primary" onClick={startCall} sx={{ marginBottom: 2 }}>Call</Button>

// //     {/* Incoming Call */}
// //     {callRequest && (
// //         <div style={{ textAlign: 'center', marginTop: '16px' }}>
// //             <Typography variant="h6">Incoming call from {callRequest.from}</Typography>
// //             <Button variant="contained" color="primary" onClick={acceptCall} sx={{ marginRight: 2 }}>Accept</Button>
// //             <Button variant="contained" color="secondary" onClick={rejectCall}>Reject</Button>
// //         </div>
// //     )}
// // </Container>
// //   );
// // };

// // export default VideoCall;

// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   Button,
// //   Typography,
// //   Grid,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Container,
// // } from "@mui/material";
// // import { useGlobalContext } from "../../context/GlobalContext";
// // import Peer from "peerjs";
// // import io from "socket.io-client";
// // // import { set } from "mongoose";
// // const socket = io("http://localhost:5000");

// // const VideoCall = ({ otherUserId }) => {
// //   const [myId, setMyId] = useState("");
// //   const [callRequest, setCallRequest] = useState(null);
// //   const [localStream, setLocalStream] = useState(null);
// //   const [remoteStream, setRemoteStream] = useState(null);
// //   const [cameras, setCameras] = useState([]);
// //   const [selectedCamera, setSelectedCamera] = useState("");
// //   const myVideoRef = useRef();
// //   const remoteVideoRef = useRef();
// //   const peerInstance = useRef();
// //   const { user } = useGlobalContext();
// //  const [peer, setPeer] = useState(null);
// //   useEffect(() => {
// //     const peer = new Peer();

// //     peer.on("open", (id) => {
// //       console.log("PeerJS ID:", id);
// //       setMyId(id);
// //       // Register user with both user._id and peerId
// //       socket.emit("register-user", { userId: user._id, peerId: id });
// //     });

// //     peer.on("call", (call) => {
// //       console.log("Incoming call detected:", call);
// //       listCameras().then(() => {
// //         setCallRequest((prev) => ({ ...prev, call }));
// //       });
// //     });

// //     peerInstance.current = peer;

// //     // Socket.io listeners
// //     socket.on("call-request", (data) => {
// //       setCallRequest(data);
// //     });

// //     socket.on("call-accepted", (data) => {
// //       const { answer } = data;
// //       const call = peerInstance.current.call(callRequest.from, answer);
// //       call.on("stream", (remoteStream) => {
// //         setRemoteStream(remoteStream);
// //         remoteVideoRef.current.srcObject = remoteStream;
// //       });
// //       console.log(`Call accepted by ${data.from}, sending to ${data.to}`);
// //     });

// //     socket.on("call-rejected", () => {
// //       alert("Call rejected");
// //       setCallRequest(null);
// //     });
// //     socket.on("other-peer-id", (data) => {
// //         setPeer(data.peerId);
// //     }
// //     );

// //     return () => {
// //       peer.destroy();
// //     };
// //   }, [user._id]);

// //   const listCameras = async () => {
// //     const devices = await navigator.mediaDevices.enumerateDevices();
// //     const videoDevices = devices.filter((device) => device.kind === "videoinput");
// //     setCameras(videoDevices);
// //     if (videoDevices.length > 0) {
// //       setSelectedCamera(videoDevices[0].deviceId);
// //     }
// //   };

// //   const startLocalStream = async (deviceId) => {
// //     const constraints = {
// //       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
// //     };
// //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
// //     setLocalStream(stream);
// //     myVideoRef.current.srcObject = stream;
// //     return stream;
// //   };

// //   const handleCameraChange = async (event) => {
// //     const deviceId = event.target.value;
// //     setSelectedCamera(deviceId);
// //     await startLocalStream(deviceId);
// //   };

// //   const startCall = async () => {
// //     socket.emit("call-user", { to: otherUserId, offer: call.offer });
// //     const stream = await startLocalStream(selectedCamera);
// //     const call = await peerInstance.current.call(peer, stream);

// //     // console.log(call);
// //     setCallRequest({ call });
// //     call.on("stream", (remoteStream) => {
// //       setRemoteStream(remoteStream);
// //       remoteVideoRef.current.srcObject = remoteStream;
// //     });

// //   };

// //   const acceptCall = async () => {
// //     const stream = await startLocalStream(selectedCamera);
// //     callRequest.call.answer(stream);
// //     callRequest.call.on("stream", (remoteStream) => {
// //       setRemoteStream(remoteStream);
// //       remoteVideoRef.current.srcObject = remoteStream;
// //     });

// //     socket.emit("call-accepted", { to: callRequest.from });
// //     setCallRequest(null);
// //   };

// //   const rejectCall = () => {
// //     socket.emit("call-rejected", { to: callRequest.from });
// //     setCallRequest(null);
// //   };

// //   return (
// //     <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
// //       <Typography variant="h4" sx={{ marginBottom: 2 }}>My ID: {myId}</Typography>
// //       <Grid container spacing={2} sx={{ marginBottom: 2 }}>
// //         <Grid item xs={6}>
// //           <video ref={myVideoRef} autoPlay muted style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
// //         </Grid>
// //         <Grid item xs={6}>
// //           <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
// //         </Grid>
// //       </Grid>

// //       <FormControl fullWidth sx={{ marginBottom: 2 }}>
// //         <InputLabel>Select Camera</InputLabel>
// //         <Select value={selectedCamera} onChange={handleCameraChange}>
// //           {cameras.map((camera) => (
// //             <MenuItem key={camera.deviceId} value={camera.deviceId}>
// //               {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <Button variant="contained" color="primary" onClick={startCall} sx={{ marginBottom: 2 }}>Call</Button>

// //       {callRequest && (
// //         <div style={{ textAlign: 'center', marginTop: '16px' }}>
// //           <Typography variant="h6">Incoming call from {callRequest.from}</Typography>
// //           <Button variant="contained" color="primary" onClick={acceptCall} sx={{ marginRight: 2 }}>Accept</Button>
// //           <Button variant="contained" color="secondary" onClick={rejectCall}>Reject</Button>
// //         </div>
// //       )}
// //     </Container>
// //   );
// // };

// // export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Container,
// } from "@mui/material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import Peer from "peerjs";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// const VideoCall = ({ otherUserId }) => {
//   const [myId, setMyId] = useState("");
//   const [callRequest, setCallRequest] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [cameras, setCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState("");
//   const myVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerInstance = useRef();
//   const { user } = useGlobalContext();
//   const [peer, setPeer] = useState(null);

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on("open", (id) => {
//       console.log("PeerJS ID:", id);
//       setMyId(id);
//       socket.emit("register-user", { userId: user._id, peerId: id });
//     });

//     peer.on("call", (call) => {
//       console.log("Incoming call detected:", call);
//       listCameras().then(() => {
//         setCallRequest((prev) => ({ ...prev, call }));
//       });
//     });
//     console.log(peer);
//     peerInstance.current = peer;
//     console.log("peer ref set");
//     console.log(peerInstance.current);
//     socket.on("call-request", (data) => {
//       setCallRequest(data);
//     });

//     socket.on("call-accepted", (data) => {
//       const { answer } = data;
//       const call = peerInstance.current.call(callRequest.from, answer);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       console.log(`Call accepted by ${data.from}, sending to ${data.to}`);
//     });

//     socket.on("call-rejected", () => {
//       alert("Call rejected");
//       setCallRequest(null);
//     });

//     socket.on("other-peer-id", (data) => {
//       setPeer(data.peerId);
//     });

//     return () => {
//       peer.destroy();
//     };
//   }, [user._id]);

//   const listCameras = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter((device) => device.kind === "videoinput");
//     setCameras(videoDevices);
//     if (videoDevices.length > 0) {
//       setSelectedCamera(videoDevices[0].deviceId);
//     }
//   };

// //   const startLocalStream = async (deviceId) => {
// //     const constraints = {
// //       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
// //     };
// //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
// //     setLocalStream(stream);
// //     myVideoRef.current.srcObject = stream;
// //     return stream;
// //   };
// const startLocalStream = async (deviceId) => {
//     const constraints = {
//         video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//         // audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
// };
//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };
//  useEffect(() => {
//      console.log(peerInstance.current)
//  }, [peerInstance.current])
//   const startCall = async () => {
//     // First, check if the other user is registered and get their peerId
//     socket.emit("get-peer-id", { userId: otherUserId });

//     socket.once("other-peer-id", (data) => {
//       if (data.peerId) {
//         setPeer(data.peerId);
//         // Now that we have the peerId, initiate the call
//         const stream = startLocalStream(selectedCamera);
//         console.log("test")
//         console.log(peerInstance.current);
//         console.log(peerInstance.current.call);
//         const call = peerInstance.current.call(data.peerId, stream);
//         console.log("Call initiated");
//         console.log(call);
//         setCallRequest({ call });
//         console.log("Call initiated");
//         console.log(data.peerId);
//         call.on("stream", (remoteStream) => {
//           setRemoteStream(remoteStream);
//           remoteVideoRef.current.srcObject = remoteStream;
//         });
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const acceptCall = async () => {
//     const stream = await startLocalStream(selectedCamera);
//     callRequest.call.answer(stream);
//     callRequest.call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   return (
//     <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
//       <Typography variant="h4" sx={{ marginBottom: 2 }}>My ID: {myId}</Typography>
//       <Grid container spacing={2} sx={{ marginBottom: 2 }}>
//         <Grid item xs={6}>
//           <video ref={myVideoRef} autoPlay muted style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
//         </Grid>
//         <Grid item xs={6}>
//           <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
//         </Grid>
//       </Grid>

//       <FormControl fullWidth sx={{ marginBottom: 2 }}>
//         <InputLabel>Select Camera</InputLabel>
//         <Select value={selectedCamera} onChange={handleCameraChange}>
//           {cameras.map((camera) => (
//             <MenuItem key={camera.deviceId} value={camera.deviceId}>
//               {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button variant="contained" color="primary" onClick={startCall} sx={{ marginBottom: 2 }}>Call</Button>

//       {callRequest && (
//         <div style={{ textAlign: 'center', marginTop: '16px' }}>
//           <Typography variant="h6">Incoming call from {callRequest.from}</Typography>
//           <Button variant="contained" color="primary" onClick={acceptCall} sx={{ marginRight: 2 }}>Accept</Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>Reject</Button>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Container,
// } from "@mui/material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import Peer from "peerjs";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// const VideoCall = ({ otherUserId }) => {
//   const [myId, setMyId] = useState("");
//   const [callRequest, setCallRequest] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [cameras, setCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState("");
//   const [otherUserPeerId, setOtherUserPeerId] = useState(null);
//   const myVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerInstance = useRef();
//   const { user } = useGlobalContext();

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on("open", (id) => {
//       console.log("PeerJS ID:", id);
//       setMyId(id);
//       socket.emit("register-user", { userId: user._id, peerId: id });
//     });

//     peer.on("call", (call) => {
//       console.log("Incoming call detected:", call);
//       listCameras().then(() => {
//         setCallRequest((prev) => ({ ...prev, call }));
//       });
//     });

//     peerInstance.current = peer;

//     socket.on("call-request", (data) => {
//       setCallRequest(data);
//     });

//     socket.on("call-accepted", (data) => {
//       const { answer } = data;
//       const call = peerInstance.current.call(callRequest.from, answer);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       console.log(`Call accepted by ${data.from}, sending to ${data.to}`);
//     });

//     socket.on("call-rejected", () => {
//       alert("Call rejected");
//       setCallRequest(null);
//     });

//     socket.on("other-peer-id", (data) => {
//       setOtherUserPeerId(data.peerId);
//     });

//     return () => {
//       peer.destroy();
//     };
//   }, [user._id]);

//   const listCameras = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter((device) => device.kind === "videoinput");
//     setCameras(videoDevices);
//     if (videoDevices.length > 0) {
//       setSelectedCamera(videoDevices[0].deviceId);
//     }
//   };

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     // Check if the other user is registered
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         // Now initiate the call with the peerId
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async () => {
//     const stream = await startLocalStream(selectedCamera);
//     callRequest.call.answer(stream);
//     callRequest.call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   return (
//     <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
//       <Typography variant="h4" sx={{ marginBottom: 2 }}>My ID: {myId}</Typography>
//       <Grid container spacing={2} sx={{ marginBottom: 2 }}>
//         <Grid item xs={6}>
//           <video ref={myVideoRef} autoPlay muted style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
//         </Grid>
//         <Grid item xs={6}>
//           <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
//         </Grid>
//       </Grid>

//       <FormControl fullWidth sx={{ marginBottom: 2 }}>
//         <InputLabel>Select Camera</InputLabel>
//         <Select value={selectedCamera} onChange={handleCameraChange}>
//           {cameras.map((camera) => (
//             <MenuItem key={camera.deviceId} value={camera.deviceId}>
//               {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button variant="contained" color="primary" onClick={startCall} sx={{ marginBottom: 2 }}>Call</Button>

//       {callRequest && (
//         <div style={{ textAlign: 'center', marginTop: '16px' }}>
//           <Typography variant="h6">Incoming call from {callRequest.from}</Typography>
//           <Button variant="contained" color="primary" onClick={acceptCall} sx={{ marginRight: 2 }}>Accept</Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>Reject</Button>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Container,
// } from "@mui/material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import Peer from "peerjs";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// const VideoCall = ({ otherUserId }) => {
//   const [myId, setMyId] = useState("");
//   const [callRequest, setCallRequest] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [cameras, setCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState("");
//   const [otherUserPeerId, setOtherUserPeerId] = useState(null);
//   const myVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerInstance = useRef();
//   const { user } = useGlobalContext();

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on("open", (id) => {
//       console.log("PeerJS ID:", id);
//       setMyId(id);
//       socket.emit("register-user", { userId: user._id, peerId: id });
//     });

//     peer.on("call", (call) => {
//       console.log("Incoming call detected:", call);
//       listCameras().then(() => {
//         setCallRequest((prev) => ({ ...prev, call }));
//       });
//     });

//     peerInstance.current = peer;

//     socket.on("call-request", (data) => {
//       setCallRequest(data);
//     });

//     socket.on("call-accepted", (data) => {
//       const { answer } = data;
//       const call = peerInstance.current.call(callRequest.from, answer);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       console.log(`Call accepted by ${data.from}, sending to ${data.to}`);
//     });

//     socket.on("call-rejected", () => {
//       alert("Call rejected");
//       setCallRequest(null);
//     });

//     socket.on("other-peer-id", (data) => {
//       setOtherUserPeerId(data.peerId);
//     });

//     return () => {
//       peer.destroy();
//     };
//   }, [user._id]);

//   const listCameras = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter((device) => device.kind === "videoinput");
//     setCameras(videoDevices);
//     if (videoDevices.length > 0) {
//       setSelectedCamera(videoDevices[0].deviceId);
//     }
//   };

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     // Check if the other user is registered
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         // Now initiate the call with the peerId
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async () => {
//     const stream = await startLocalStream(selectedCamera);
//     callRequest.call.answer(stream);
//     callRequest.call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   return (
//     <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
//       <Typography variant="h4" sx={{ marginBottom: 2 }}>My ID: {myId}</Typography>
//       <Grid container spacing={2} sx={{ marginBottom: 2 }}>
//         <Grid item xs={6}>
//           <video ref={myVideoRef} autoPlay muted style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
//         </Grid>
//         <Grid item xs={6}>
//           <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '300px', borderRadius: '8px', backgroundColor: '#000' }} />
//         </Grid>
//       </Grid>

//       <FormControl fullWidth sx={{ marginBottom: 2 }}>
//         <InputLabel>Select Camera</InputLabel>
//         <Select value={selectedCamera} onChange={handleCameraChange}>
//           {cameras.map((camera) => (
//             <MenuItem key={camera.deviceId} value={camera.deviceId}>
//               {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button variant="contained" color="primary" onClick={startCall} sx={{ marginBottom: 2 }}>Call</Button>

//       {callRequest && (
//         <div style={{ textAlign: 'center', marginTop: '16px' }}>
//           <Typography variant="h6">Incoming call from {callRequest.from}</Typography>
//           <Button variant="contained" color="primary" onClick={acceptCall} sx={{ marginRight: 2 }}>Accept</Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>Reject</Button>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Container,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
// } from "@mui/material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import Peer from "peerjs";
// import io from "socket.io-client";
// import { Close, Videocam, VideocamOff, Mic, MicOff } from "@mui/icons-material";

// const socket = io("http://localhost:5000");

// const VideoCall = ({ otherUserId }) => {
//   const [myId, setMyId] = useState("");
//   const [callRequest, setCallRequest] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [cameras, setCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState("");
//   const [otherUserPeerId, setOtherUserPeerId] = useState(null);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isAudioOn, setIsAudioOn] = useState(true);
//   const myVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerInstance = useRef();
//   const { user } = useGlobalContext();

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on("open", (id) => {
//       console.log("PeerJS ID:", id);
//       setMyId(id);
//       socket.emit("register-user", { userId: user._id, peerId: id });
//     });

//     peer.on("call", (call) => {
//       console.log("Incoming call detected:", call);
//       listCameras().then(() => {
//         setCallRequest((prev) => ({ ...prev, call }));
//       });
//     });

//     peerInstance.current = peer;

//     socket.on("call-request", (data) => {
//       setCallRequest(data);
//     });

//     socket.on("call-accepted", (data) => {
//       const { answer } = data;
//       const call = peerInstance.current.call(callRequest.from, answer);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       console.log(`Call accepted by ${data.from}, sending to ${data.to}`);
//     });

//     socket.on("call-rejected", () => {
//       alert("Call rejected");
//       setCallRequest(null);
//     });

//     socket.on("other-peer-id", (data) => {
//       setOtherUserPeerId(data.peerId);
//     });

//     return () => {
//       peer.destroy();
//     };
//   }, [user._id]);

//   const listCameras = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     setCameras(videoDevices);
//     if (videoDevices.length > 0) {
//       setSelectedCamera(videoDevices[0].deviceId);
//     }
//   };

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async () => {
//     const stream = await startLocalStream(selectedCamera);
//     callRequest.call.answer(stream);
//     callRequest.call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   return (
//     // <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
//     <Container
//       sx={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: 2,
//         backgroundColor: "#fff",
//         zIndex: 1000,
//         borderRadius: "8px",
//         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       {/* <Typography variant="h4" sx={{ marginBottom: 2 }}>
//         My ID: {myId}
//       </Typography> */}
//       <Grid container spacing={2} sx={{ marginBottom: 2 }}>
//         <Grid item xs={6}>
//           <video
//             ref={myVideoRef}
//             autoPlay
//             muted
//             style={{
//               width: "100%",
//               height: "300px",
//               borderRadius: "8px",
//               backgroundColor: "#000",
//             }}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             style={{
//               width: "100%",
//               height: "300px",
//               borderRadius: "8px",
//               backgroundColor: "#000",
//             }}
//           />
//         </Grid>
//       </Grid>

//       <FormControl fullWidth sx={{ marginBottom: 2 }}>
//         <InputLabel>Select Camera</InputLabel>
//         <Select value={selectedCamera} onChange={handleCameraChange}>
//           {cameras.map((camera) => (
//             <MenuItem key={camera.deviceId} value={camera.deviceId}>
//               {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={startCall}
//         sx={{ marginBottom: 2 }}
//       >
//         Call
//       </Button>

//       <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
//         <IconButton
//           color={isVideoOn ? "primary" : "secondary"}
//           onClick={toggleVideo}
//         >
//           {isVideoOn ? <Videocam /> : <VideocamOff />}
//         </IconButton>
//         <IconButton
//           color={isAudioOn ? "primary" : "secondary"}
//           onClick={toggleAudio}
//         >
//           {isAudioOn ? <Mic /> : <MicOff />}
//         </IconButton>
//       </div>

//       <Dialog open={!!callRequest} onClose={rejectCall} maxWidth="sm" fullWidth>
//         <DialogTitle>Incoming Call</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">
//             Incoming call from {callRequest?.from}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="primary" onClick={acceptCall}>
//             Accept
//           </Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Container,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
// } from "@mui/material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import Peer from "peerjs";
// import io from "socket.io-client";
// import { Close, Videocam, VideocamOff, Mic, MicOff } from "@mui/icons-material";

// const socket = io("http://localhost:5000");

// const VideoCall = ({ otherUserId }) => {
//   const [myId, setMyId] = useState("");
//   const [callRequest, setCallRequest] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [cameras, setCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState("");
//   const [otherUserPeerId, setOtherUserPeerId] = useState(null);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isAudioOn, setIsAudioOn] = useState(true);
//   const myVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerInstance = useRef();
//   const { user } = useGlobalContext();

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on("open", (id) => {
//       console.log("PeerJS ID:", id);
//       setMyId(id);
//       socket.emit("register-user", { userId: user._id, peerId: id });
//     });

//     peer.on("call", (call) => {
//       console.log("Incoming call detected:", call);
//       listCameras().then(() => {
//         setCallRequest((prev) => ({ ...prev, call }));
//       });
//     });

//     peerInstance.current = peer;

//     socket.on("call-request", (data) => {
//       setCallRequest(data);
//     });

//     socket.on("call-accepted", (data) => {
//       const { answer } = data;
//       const call = peerInstance.current.call(callRequest.from, answer);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       console.log(`Call accepted by ${data.from}, sending to ${data.to}`);
//     });

//     socket.on("call-rejected", () => {
//       alert("Call rejected");
//       setCallRequest(null);
//     });

//     socket.on("other-peer-id", (data) => {
//       setOtherUserPeerId(data.peerId);
//     });

//     return () => {
//       peer.destroy();
//     };
//   }, [user._id]);

//   const listCameras = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     setCameras(videoDevices);
//     if (videoDevices.length > 0) {
//       setSelectedCamera(videoDevices[0].deviceId);
//     }
//   };

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async () => {
//     const stream = await startLocalStream(selectedCamera);
//     callRequest.call.answer(stream);
//     callRequest.call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   return (
//     <Container
//       sx={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: 2,
//         backgroundColor: "#fff",
//         zIndex: 1000,
//         borderRadius: "8px",
//         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       <Grid container spacing={2} sx={{ marginBottom: 2 }}>
//         <Grid item xs={6}>
//           <video
//             ref={myVideoRef}
//             autoPlay
//             muted
//             style={{
//               width: "100%",
//               height: "300px",
//               borderRadius: "8px",
//               backgroundColor: "#000",
//             }}
//           />
//         <Grid item xs={6}>
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             style={{
//               width: "100%",
//               height: "300px",
//               borderRadius: "8px",
//               backgroundColor: "#000",
//             }}
//           />
//         </Grid>
//       </Grid>
//       </Grid>
//       <FormControl fullWidth sx={{ marginBottom: 2 }}>
//         <InputLabel>Select Camera</InputLabel>
//         <Select value={selectedCamera} onChange={handleCameraChange}>
//           {cameras.map((camera) => (
//             <MenuItem key={camera.deviceId} value={camera.deviceId}>
//               {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={startCall}
//         sx={{ marginBottom: 2 }}
//       >
//         Call
//       </Button>

//       <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
//         <IconButton
//           color={isVideoOn ? "primary" : "secondary"}
//           onClick={toggleVideo}
//         >
//           {isVideoOn ? <Videocam /> : <VideocamOff />}
//         </IconButton>
//         <IconButton
//           color={isAudioOn ? "primary" : "secondary"}
//           onClick={toggleAudio}
//         >
//           {isAudioOn ? <Mic /> : <MicOff />}
//         </IconButton>
//       </div>

//       <Dialog open={!!callRequest && callRequest.from !== myId} onClose={rejectCall} maxWidth="sm" fullWidth>
//         <DialogTitle>Incoming Call</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">
//             Incoming call from {callRequest?.from}
//           </Typography>
//           <FormControl fullWidth sx={{ marginTop: 2 }}>
//             <InputLabel>Select Camera</InputLabel>
//             <Select value={selectedCamera} onChange={handleCameraChange}>
//               {cameras.map((camera) => (
//                 <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                   {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="primary" onClick={acceptCall}>
//             Accept
//           </Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Container,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
// } from "@mui/material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import Peer from "peerjs";
// import io from "socket.io-client";
// import { Close, Videocam, VideocamOff, Mic, MicOff } from "@mui/icons-material";

// const socket = io("http://localhost:5000");

// const VideoCall = ({ otherUserId }) => {
//   const [myId, setMyId] = useState("");
//   const [callRequest, setCallRequest] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [cameras, setCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState("");
//   const [otherUserPeerId, setOtherUserPeerId] = useState(null);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isAudioOn, setIsAudioOn] = useState(true);
//   const myVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerInstance = useRef();
//   const { user } = useGlobalContext();

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on("open", (id) => {
//       console.log("PeerJS ID:", id);
//       setMyId(id);
//       socket.emit("register-user", { userId: user._id, peerId: id });
//     });

//     peer.on("call", (call) => {
//       console.log("Incoming call detected:", call);
//       listCameras().then(() => {
//         setCallRequest((prev) => ({ ...prev, call }));
//         acceptCall(call); // Automatically accept the call
//       });
//     });

//     peerInstance.current = peer;

//     socket.on("call-request", (data) => {
//       setCallRequest(data);
//     });

//     socket.on("call-accepted", (data) => {
//       const { answer } = data;
//       const call = peerInstance.current.call(callRequest.from, answer);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       console.log(`Call accepted by ${data.from}, sending to ${data.to}`);
//     });

//     socket.on("call-rejected", () => {
//       alert("Call rejected");
//       setCallRequest(null);
//     });

//     socket.on("other-peer-id", (data) => {
//       setOtherUserPeerId(data.peerId);
//     });

//     return () => {
//       peer.destroy();
//     };
//   }, [user._id]);

//   const listCameras = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     setCameras(videoDevices);
//     if (videoDevices.length > 0) {
//       setSelectedCamera(videoDevices[0].deviceId);
//     }
//   };

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async (call) => {
//     const stream = await startLocalStream(selectedCamera);
//     call.answer(stream);
//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: call.peer });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   return (
//     <Container
//       sx={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: 2,
//         backgroundColor: "#fff",
//         zIndex: 1000,
//         borderRadius: "8px",
//         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       <Grid container spacing={2} sx={{ marginBottom: 2 }}>
//         <Grid item xs={6}>
//           <video
//             ref={myVideoRef}
//             autoPlay
//             muted
//             style={{
//               width: "100%",
//               height: "300px",
//               borderRadius: "8px",
//               backgroundColor: "#000",
//             }}
//           />
//         <Grid item xs={6}>
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             style={{
//               width: "100%",
//               height: "300px",
//               borderRadius: "8px",
//               backgroundColor: "#000",
//             }}
//           />
//         </Grid>
//       </Grid>
//       </Grid>
//       <FormControl fullWidth sx={{ marginBottom: 2 }}>
//         <InputLabel>Select Camera</InputLabel>
//         <Select value={selectedCamera} onChange={handleCameraChange}>
//           {cameras.map((camera) => (
//             <MenuItem key={camera.deviceId} value={camera.deviceId}>
//               {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={startCall}
//         sx={{ marginBottom: 2 }}
//       >
//         Create a Meeting
//       </Button>

//       <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
//         <IconButton
//           color={isVideoOn ? "primary" : "secondary"}
//           onClick={toggleVideo}
//         >
//           {isVideoOn ? <Videocam /> : <VideocamOff />}
//         </IconButton>
//         <IconButton
//           color={isAudioOn ? "primary" : "secondary"}
//           onClick={toggleAudio}
//         >
//           {isAudioOn ? <Mic /> : <MicOff />}
//         </IconButton>
//       </div>

//       <Dialog open={!!callRequest && callRequest.from !== myId} onClose={rejectCall} maxWidth="sm" fullWidth>
//         <DialogTitle>Incoming Call</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">
//             Incoming call from {callRequest?.from}
//           </Typography>
//           <FormControl fullWidth sx={{ marginTop: 2 }}>
//             <InputLabel>Select Camera</InputLabel>
//             <Select value={selectedCamera} onChange={handleCameraChange}>
//               {cameras.map((camera) => (
//                 <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                   {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="primary" onClick={() => acceptCall(callRequest.call)}>
//             Join the Meeting
//           </Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default VideoCall;

// // best

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Container,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
// } from "@mui/material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import Peer from "peerjs";
// import io from "socket.io-client";
// import { Close, Videocam, VideocamOff, Mic, MicOff, ScreenShare, StopScreenShare } from "@mui/icons-material";

// const socket = io("http://localhost:5000");

// const VideoCall = ({ otherUserId }) => {
//   const [myId, setMyId] = useState("");
//   const [callRequest, setCallRequest] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [cameras, setCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState("");
//   const [otherUserPeerId, setOtherUserPeerId] = useState(null);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isAudioOn, setIsAudioOn] = useState(true);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const [callDuration, setCallDuration] = useState(0);
//   const myVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerInstance = useRef();
//   const { user } = useGlobalContext();

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on("open", (id) => {
//       console.log("PeerJS ID:", id);
//       setMyId(id);
//       socket.emit("register-user", { userId: user._id, peerId: id });
//     });

//     peer.on("call", (call) => {
//       console.log("Incoming call detected:", call);
//       listCameras().then(() => {
//         setCallRequest((prev) => ({ ...prev, call }));
//       });
//     });

//     peerInstance.current = peer;

//     socket.on("call-request", (data) => {
//       setCallRequest(data);
//     });

//     socket.on("call-accepted", (data) => {
//       const { answer } = data;
//       const call = peerInstance.current.call(callRequest.from, answer);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       console.log(`Call accepted by ${data.from}, sending to ${data.to}`);
//     });

//     socket.on("call-rejected", () => {
//       alert("Call rejected");
//       setCallRequest(null);
//     });

//     socket.on("other-peer-id", (data) => {
//       setOtherUserPeerId(data.peerId);
//     });

//     return () => {
//       peer.destroy();
//     };
//   }, [user._id]);

//   const listCameras = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     setCameras(videoDevices);
//     if (videoDevices.length > 0) {
//       setSelectedCamera(videoDevices[0].deviceId);
//     }
//   };

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async (call) => {
//     const stream = await startLocalStream(selectedCamera);
//     call.answer(stream);
//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: call.peer });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   const toggleScreenShare = async () => {
//     if (!isScreenSharing) {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(true);
//     } else {
//       const stream = await startLocalStream(selectedCamera);
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(false);
//     }
//   };

//   const endCall = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//     }
//     if (remoteStream) {
//       remoteStream.getTracks().forEach(track => track.stop());
//     }
//     setLocalStream(null);
//     setRemoteStream(null);
//     setCallRequest(null);
//   };

//   return (
//     <Container
//       sx={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: 2,
//         backgroundColor: "#fff",
//         zIndex: 1000,
//         borderRadius: "8px",
//         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       <Grid container spacing={2} sx={{ marginBottom: 2 }}>
//         <Grid item xs={6}>
//           <video
//             ref={myVideoRef}
//             autoPlay
//             muted
//             style={{
//               width: "100%",
//               height: "300px",
//               borderRadius: "8px",
//               backgroundColor: "#000",
//             }}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             style={{
//               width: "100%",
//               height: "300px",
//               borderRadius: "8px",
//               backgroundColor: "#000",
//             }}
//           />
//         </Grid>
//       </Grid>
//       <FormControl fullWidth sx={{ marginBottom: 2 }}>
//         <InputLabel>Select Camera</InputLabel>
//         <Select value={selectedCamera} onChange={handleCameraChange}>
//           {cameras.map((camera) => (
//             <MenuItem key={camera.deviceId} value={camera.deviceId}>
//               {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={startCall}
//         sx={{ marginBottom: 2 }}
//       >
//         Create a Meeting
//       </Button>

//       <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
//         <IconButton
//           color={isVideoOn ? "primary" : "secondary"}
//           onClick={toggleVideo}
//         >
//           {isVideoOn ? <Videocam /> : <VideocamOff />}
//         </IconButton>
//         <IconButton
//           color={isAudioOn ? "primary" : "secondary"}
//           onClick={toggleAudio}
//         >
//           {isAudioOn ? <Mic /> : <MicOff />}
//         </IconButton>
//         <IconButton
//           color={isScreenSharing ? "primary" : "secondary"}
//           onClick={toggleScreenShare}
//         >
//           {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
//         </IconButton>
//         <Button variant="contained" color="secondary" onClick={endCall}>
//           End Call
//         </Button>
//       </div>

//       <Dialog open={!!callRequest && callRequest.from !== myId} onClose={rejectCall} maxWidth="sm" fullWidth>
//         <DialogTitle>Incoming Call</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">
//             Incoming call from {callRequest?.from}
//           </Typography>
//           <FormControl fullWidth sx={{ marginTop: 2 }}>
//             <InputLabel>Select Camera</InputLabel>
//             <Select value={selectedCamera} onChange={handleCameraChange}>
//               {cameras.map((camera) => (
//                 <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                   {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="primary" onClick={() => acceptCall(callRequest.call)}>
//             Join the Meeting
//           </Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   Container,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Grid2,
//   Select,
//   MenuItem,
// } from "@mui/material";
// // import Grid2 from "@mui/material/Unstable_Grid2"; // Updated Grid2 import
// import { useGlobalContext } from "../../context/GlobalContext";
// import Peer from "peerjs";
// import io from "socket.io-client";
// import {
//   Close,
//   Videocam,
//   VideocamOff,
//   Mic,
//   MicOff,
//   ScreenShare,
//   StopScreenShare,
// } from "@mui/icons-material";

// const socket = io("http://localhost:5000");

// const VideoCall = ({ otherUserId, oncloseuser }) => {
//   const [myId, setMyId] = useState("");
//   const [callRequest, setCallRequest] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [cameras, setCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState("");
//   const [otherUserPeerId, setOtherUserPeerId] = useState(null);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isAudioOn, setIsAudioOn] = useState(true);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const [callDuration, setCallDuration] = useState(0);
//   const myVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerInstance = useRef();
//   const { user } = useGlobalContext();

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on("open", (id) => {
//       console.log("PeerJS ID:", id);
//       setMyId(id);
//       socket.emit("register-user", { userId: user._id, peerId: id });
//     });

//     peer.on("call", (call) => {
//       console.log("Incoming call detected:", call);
//       listCameras().then(() => {
//         setCallRequest((prev) => ({ ...prev, call }));
//       });
//     });

//     peerInstance.current = peer;

//     socket.on("call-request", (data) => {
//       setCallRequest(data);
//     });

//     socket.on("call-accepted", (data) => {
//       const { answer } = data;
//       const call = peerInstance.current.call(callRequest.from, answer);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       console.log(`Call accepted by ${data.from}, sending to ${data.to}`);
//     });

//     socket.on("call-rejected", () => {
//       alert("Call rejected");
//       setCallRequest(null);
//     });

//     socket.on("other-peer-id", (data) => {
//       setOtherUserPeerId(data.peerId);
//     });

//     socket.on("user-left", () => {
//       setRemoteStream(null); // Stop video when the other user leaves
//     });

//     return () => {
//       peer.destroy();
//     };
//   }, [user._id]);

//   const listCameras = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     setCameras(videoDevices);
//     if (videoDevices.length > 0) {
//       setSelectedCamera(videoDevices[0].deviceId);
//     }
//   };

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async (call) => {
//     const stream = await startLocalStream(selectedCamera);
//     call.answer(stream);
//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: call.peer });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//     socket.emit("video-toggle", { to: otherUserPeerId, isVideoOn: !isVideoOn });
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   const toggleScreenShare = async () => {
//     if (!isScreenSharing) {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(true);
//     } else {
//       const stream = await startLocalStream(selectedCamera);
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(false);
//     }
//   };

//   const endCall = () => {
//     if (localStream) {
//       localStream.getTracks().forEach((track) => track.stop());
//     }
//     if (remoteStream) {
//       remoteStream.getTracks().forEach((track) => track.stop());
//     }
//     setLocalStream(null);
//     setRemoteStream(null);
//     setCallRequest(null);
//     socket.emit("end-call", { to: otherUserPeerId });
//     oncloseuser(); // Close the VideoCall component
//   };

//   return (
//     <Dialog open={true} onclose={oncloseuser} maxWidth="md" fullWidth>
//       <DialogTitle>
//         Video Call
//         <IconButton
//           onClick={oncloseuser}
//           sx={{ position: "absolute", right: 8, top: 8 }}
//         >
//           <Close />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Grid2 container spacing={2} sx={{ marginBottom: 2 }}>
//           <Grid2 xs={6}>
//             <video
//               ref={myVideoRef}
//               autoPlay
//               muted
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 borderRadius: "8px",
//                 backgroundColor: "#000",
//               }}
//             />
//           </Grid2>
//           <Grid2 xs={6}>
//             <video
//               ref={remoteVideoRef}
//               autoPlay
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 borderRadius: "8px",
//                 backgroundColor: "#000",
//               }}
//             />
//           </Grid2>
//         </Grid2>
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <InputLabel>Select Camera</InputLabel>
//           <Select value={selectedCamera} onChange={handleCameraChange}>
//             {cameras.map((camera) => (
//               <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                 {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={startCall}
//           sx={{ marginBottom: 2 }}
//         >
//           Start Meeting
//         </Button>

//         <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
//           <IconButton
//             color={isVideoOn ? "primary" : "secondary"}
//             onClick={toggleVideo}
//           >
//             {isVideoOn ? <Videocam /> : <VideocamOff />}
//           </IconButton>
//           <IconButton
//             color={isAudioOn ? "primary" : "secondary"}
//             onClick={toggleAudio}
//           >
//             {isAudioOn ? <Mic /> : <MicOff />}
//           </IconButton>
//           <IconButton
//             color={isScreenSharing ? "primary" : "secondary"}
//             onClick={toggleScreenShare}
//           >
//             {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
//           </IconButton>
//           <Button variant="contained" color="secondary" onClick={endCall}>
//             End Call
//           </Button>
//         </div>
//       </DialogContent>
//       <Dialog open={!!callRequest && callRequest.from !== myId} onClose={rejectCall} maxWidth="sm" fullWidth>
//         <DialogTitle>Incoming Call</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">
//             Incoming call from {callRequest?.from}
//           </Typography>
//           <FormControl fullWidth sx={{ marginTop: 2 }}>
//             <InputLabel>Select Camera</InputLabel>
//             <Select value={selectedCamera} onChange={handleCameraChange}>
//               {cameras.map((camera) => (
//                 <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                   {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="primary" onClick={() => acceptCall(callRequest.call)}>
//             Join Meeting
//           </Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Dialog>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   Container,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Grid2,
//   Select,
//   MenuItem,
// } from "@mui/material";
// // import Grid2 from "@mui/material/Unstable_Grid2"; // Updated Grid2 import
// import { useGlobalContext } from "../../context/GlobalContext";
// import Peer from "peerjs";
// import io from "socket.io-client";
// import {
//   Close,
//   Videocam,
//   VideocamOff,
//   Mic,
//   MicOff,
//   ScreenShare,
//   StopScreenShare,
// } from "@mui/icons-material";

// const socket = io("http://localhost:5000");

// const VideoCall = ({ otherUserId, oncloseuser }) => {
//   const [myId, setMyId] = useState("");
//   const [callRequest, setCallRequest] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [cameras, setCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState("");
//   const [otherUserPeerId, setOtherUserPeerId] = useState(null);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isAudioOn, setIsAudioOn] = useState(true);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const [callDuration, setCallDuration] = useState(0);
//   const myVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerInstance = useRef();
//   const { user } = useGlobalContext();

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on("open", (id) => {
//       console.log("PeerJS ID:", id);
//       setMyId(id);
//       socket.emit("register-user", { userId: user._id, peerId: id });
//     });

//     peer.on("call", (call) => {
//       console.log("Incoming call detected:", call);
//       listCameras().then(() => {
//         setCallRequest((prev) => ({ ...prev, call }));
//       });
//     });

//     peerInstance.current = peer;

//     socket.on("call-request", (data) => {
//       setCallRequest(data);
//     });

//     socket.on("call-accepted", (data) => {
//       const { answer } = data;
//       const call = peerInstance.current.call(callRequest.from, answer);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       console.log(`Call accepted by ${data.from}, sending to ${data.to}`);
//     });

//     socket.on("call-rejected", () => {
//       alert("Call rejected");
//       setCallRequest(null);
//     });

//     socket.on("other-peer-id", (data) => {
//       setOtherUserPeerId(data.peerId);
//     });

//     socket.on("user-left", () => {
//       setRemoteStream(null); // Stop video when the other user leaves
//     });

//     return () => {
//       if (peerInstance.current) {
//         console.log("Destroying PeerJS instance...");
//         peerInstance.current.destroy();
//       }
//     };

//   }, [user._id]);

//   const listCameras = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     setCameras(videoDevices);
//     if (videoDevices.length > 0) {
//       setSelectedCamera(videoDevices[0].deviceId);
//     }
//   };

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async (call) => {
//     const stream = await startLocalStream(selectedCamera);
//     call.answer(stream);
//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: call.peer });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//     socket.emit("video-toggle", { to: otherUserPeerId, isVideoOn: !isVideoOn });
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   const toggleScreenShare = async () => {
//     if (!isScreenSharing) {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(true);
//     } else {
//       const stream = await startLocalStream(selectedCamera);
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(false);
//     }
//   };

//   const endCall = () => {
//     console.log("Ending call...");

//     if (localStream) {
//       console.log("Stopping local stream...");
//       localStream.getTracks().forEach((track) => {
//         console.log(`Stopping track: ${track.kind}`);
//         track.stop();
//       });
//       myVideoRef.current.srcObject = null; // Remove video source
//     }

//     if (remoteStream) {
//       console.log("Stopping remote stream...");
//       remoteStream.getTracks().forEach((track) => {
//         console.log(`Stopping track: ${track.kind}`);
//         track.stop();
//       });
//       remoteVideoRef.current.srcObject = null; // Remove video source
//     }

//     // Reset state
//     setLocalStream(null);
//     setRemoteStream(null);
//     setCallRequest(null);

//     // Close Peer Connection
//     if (peerInstance.current) {
//       console.log("Closing peer connection...");
//       peerInstance.current.destroy();
//     }

//     // Inform other user
//     if (socket && otherUserPeerId) {
//       console.log("Emitting end-call event...");
//       socket.emit("end-call", { to: otherUserPeerId });
//     }

//     // Close the UI
//     if (typeof oncloseuser === "function") {
//       console.log("Closing video call component...");
//       oncloseuser();
//     }
//   };

//   return (
//     <Dialog open={true} onclose={oncloseuser} maxWidth="md" fullWidth>
//       <DialogTitle>
//         Video Call
//         <IconButton
//           onClick={oncloseuser}
//           sx={{ position: "absolute", right: 8, top: 8 }}
//         >
//           <Close />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Grid2 container spacing={2} sx={{ marginBottom: 2 }}>
//           <Grid2 xs={6}>
//             <video
//               ref={myVideoRef}
//               autoPlay
//               muted
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 borderRadius: "8px",
//                 backgroundColor: "#000",
//               }}
//             />
//           </Grid2>
//           <Grid2 xs={6}>
//             <video
//               ref={remoteVideoRef}
//               autoPlay
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 borderRadius: "8px",
//                 backgroundColor: "#000",
//               }}
//             />
//           </Grid2>
//         </Grid2>
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <InputLabel>Select Camera</InputLabel>
//           <Select value={selectedCamera} onChange={handleCameraChange}>
//             {cameras.map((camera) => (
//               <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                 {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={startCall}
//           sx={{ marginBottom: 2 }}
//         >
//           Start Meeting
//         </Button>

//         <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
//           <IconButton
//             color={isVideoOn ? "primary" : "secondary"}
//             onClick={toggleVideo}
//           >
//             {isVideoOn ? <Videocam /> : <VideocamOff />}
//           </IconButton>
//           <IconButton
//             color={isAudioOn ? "primary" : "secondary"}
//             onClick={toggleAudio}
//           >
//             {isAudioOn ? <Mic /> : <MicOff />}
//           </IconButton>
//           <IconButton
//             color={isScreenSharing ? "primary" : "secondary"}
//             onClick={toggleScreenShare}
//           >
//             {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
//           </IconButton>
//           <Button variant="contained" color="secondary" onClick={endCall}>
//             End Call
//           </Button>
//         </div>
//       </DialogContent>
//       <Dialog open={!!callRequest && callRequest.from !== myId} onClose={rejectCall} maxWidth="sm" fullWidth>
//         <DialogTitle>Incoming Call</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">
//             Incoming call from {callRequest?.from}
//           </Typography>
//           <FormControl fullWidth sx={{ marginTop: 2 }}>
//             <InputLabel>Select Camera</InputLabel>
//             <Select value={selectedCamera} onChange={handleCameraChange}>
//               {cameras.map((camera) => (
//                 <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                   {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="primary" onClick={() => acceptCall(callRequest.call)}>
//             Join Meeting
//           </Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Dialog>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   Container,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Grid2,
//   Select,
//   MenuItem,
// } from "@mui/material";
// // import Grid2 from "@mui/material/Unstable_Grid2"; // Updated Grid2 import
// import { useGlobalContext } from "../../context/GlobalContext";
// import {
//   Close,
//   Videocam,
//   VideocamOff,
//   Mic,
//   MicOff,
//   ScreenShare,
//   StopScreenShare,
// } from "@mui/icons-material";

// const VideoCall = ({ otherUserId, oncloseuser }) => {
//   const { user,socket, myId, setMyId, callRequest, setCallRequest, localStream, setLocalStream, remoteStream, setRemoteStream, cameras, setCameras, selectedCamera, setSelectedCamera, otherUserPeerId, setOtherUserPeerId, isVideoOn, setIsVideoOn, isAudioOn, setIsAudioOn, isScreenSharing, setIsScreenSharing, callDuration, setCallDuration, myVideoRef, remoteVideoRef, peerInstance } = useGlobalContext();

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async (call) => {
//     const stream = await startLocalStream(selectedCamera);
//     call.answer(stream);
//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: call.peer });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//     socket.emit("video-toggle", { to: otherUserPeerId, isVideoOn: !isVideoOn });
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   const toggleScreenShare = async () => {
//     if (!isScreenSharing) {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(true);
//     } else {
//       const stream = await startLocalStream(selectedCamera);
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(false);
//     }
//   };

//   const endCall = () => {
//     console.log("Ending call...");

//     if (localStream) {
//       console.log("Stopping local stream...");
//       localStream.getTracks().forEach((track) => {
//         console.log(`Stopping track: ${track.kind}`);
//         track.stop();
//       });
//       myVideoRef.current.srcObject = null; // Remove video source
//     }

//     if (remoteStream) {
//       console.log("Stopping remote stream...");
//       remoteStream.getTracks().forEach((track) => {
//         console.log(`Stopping track: ${track.kind}`);
//         track.stop();
//       });
//       remoteVideoRef.current.srcObject = null; // Remove video source
//     }

//     // Reset state
//     setLocalStream(null);
//     setRemoteStream(null);
//     setCallRequest(null);

//     // Close Peer Connection
//     if (peerInstance.current) {
//       console.log("Closing peer connection...");
//       peerInstance.current.destroy();
//     }

//     // Inform other user
//     if (socket && otherUserPeerId) {
//       console.log("Emitting end-call event...");
//       socket.emit("end-call", { to: otherUserPeerId });
//     }

//     // Close the UI
//     // if (typeof oncloseuser === "function") {
//     //   console.log("Closing video call component...");
//     //   oncloseuser();
//     // }
//   };

//   return (
//     <Dialog open={true} onclose={()=>{oncloseuser();endCall();}} maxWidth="md" fullWidth>
//       <DialogTitle>
//         Video Call
//         <IconButton
//           onClick={()=>{oncloseuser();endCall();}}
//           sx={{ position: "absolute", right: 8, top: 8 }}
//         >
//           <Close />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Grid2 container spacing={2} sx={{ marginBottom: 2 }}>
//           <Grid2 xs={6}>
//             <video
//               ref={myVideoRef}
//               autoPlay
//               muted
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 borderRadius: "8px",
//                 backgroundColor: "#000",
//               }}
//             />
//           </Grid2>
//           <Grid2 xs={6}>
//             <video
//               ref={remoteVideoRef}
//               autoPlay
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 borderRadius: "8px",
//                 backgroundColor: "#000",
//               }}
//             />
//           </Grid2>
//         </Grid2>
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <InputLabel>Select Camera</InputLabel>
//           <Select value={selectedCamera} onChange={handleCameraChange}>
//             {cameras.map((camera) => (
//               <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                 {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={startCall}
//           sx={{ marginBottom: 2 }}
//         >
//           Start Meeting
//         </Button>

//         <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
//           <IconButton
//             color={isVideoOn ? "primary" : "secondary"}
//             onClick={toggleVideo}
//           >
//             {isVideoOn ? <Videocam /> : <VideocamOff />}
//           </IconButton>
//           <IconButton
//             color={isAudioOn ? "primary" : "secondary"}
//             onClick={toggleAudio}
//           >
//             {isAudioOn ? <Mic /> : <MicOff />}
//           </IconButton>
//           <IconButton
//             color={isScreenSharing ? "primary" : "secondary"}
//             onClick={toggleScreenShare}
//           >
//             {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
//           </IconButton>
//           <Button variant="contained" color="secondary" onClick={()=>{oncloseuser();endCall();}}>
//             End Call
//           </Button>
//         </div>
//       </DialogContent>
//       <Dialog open={!!callRequest && callRequest.from !== myId} onClose={rejectCall} maxWidth="sm" fullWidth>
//         <DialogTitle>Incoming Call</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">
//             Incoming call from {callRequest?.from}
//           </Typography>
//           <FormControl fullWidth sx={{ marginTop: 2 }}>
//             <InputLabel>Select Camera</InputLabel>
//             <Select value={selectedCamera} onChange={handleCameraChange}>
//               {cameras.map((camera) => (
//                 <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                   {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="primary" onClick={() => acceptCall(callRequest.call)}>
//             Join Meeting
//           </Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Dialog>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   Container,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Grid2,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//   Close,
//   Videocam,
//   VideocamOff,
//   Mic,
//   MicOff,
//   ScreenShare,
//   StopScreenShare,
// } from "@mui/icons-material";
// import { useGlobalContext } from "../../context/GlobalContext";

// const VideoCall = ({ otherUserId, oncloseuser }) => {
//   const {
//     user,
//     socket,
//     myId,
//     setMyId,
//     callRequest,
//     setCallRequest,
//     localStream,
//     setLocalStream,
//     remoteStream,
//     setRemoteStream,
//     cameras,
//     setCameras,
//     selectedCamera,
//     setSelectedCamera,
//     otherUserPeerId,
//     setOtherUserPeerId,
//     isVideoOn,
//     setIsVideoOn,
//     isAudioOn,
//     setIsAudioOn,
//     isScreenSharing,
//     setIsScreenSharing,
//     callDuration,
//     setCallDuration,
//     myVideoRef,
//     remoteVideoRef,
//     peerInstance,
//   } = useGlobalContext();

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async (call) => {
//     const stream = await startLocalStream(selectedCamera);
//     call.answer(stream);
//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: call.peer });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//     socket.emit("video-toggle", { to: otherUserPeerId, isVideoOn: !isVideoOn });
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   const toggleScreenShare = async () => {
//     if (!isScreenSharing) {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(true);
//     } else {
//       const stream = await startLocalStream(selectedCamera);
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(false);
//     }
//   };

//   // const endCall = () => {
//   //   console.log("Ending call...");

//   //   if (localStream) {
//   //     console.log("Stopping local stream...");
//   //     localStream.getTracks().forEach((track) => {
//   //       console.log(`Stopping track: ${track.kind}`);
//   //       track.stop();
//   //     });
//   //     myVideoRef.current.srcObject = null; // Remove video source
//   //   }

//   //   if (remoteStream) {
//   //     console.log("Stopping remote stream...");
//   //     remoteStream.getTracks().forEach((track) => {
//   //       console.log(`Stopping track: ${track.kind}`);
//   //       track.stop();
//   //     });
//   //     remoteVideoRef.current.srcObject = null; // Remove video source
//   //   }
//   //   useEffect(() => {
//   //     socket.on("call-ended", () => {
//   //       endCall();
//   //     });

//   //     return () => {
//   //       socket.off("call-ended");
//   //     };
//   //   }, []);
//   //   // Reset state
//   //   setLocalStream(null);
//   //   setRemoteStream(null);
//   //   setCallRequest(null);

//   //   // Close Peer Connection
//   //   if (peerInstance.current) {
//   //     console.log("Closing peer connection...");
//   //     peerInstance.current.destroy();
//   //   }

//   //   // Inform other user
//   //   if (socket && otherUserPeerId) {
//   //     console.log("Emitting end-call event...");
//   //     socket.emit("end-call", { to: otherUserPeerId });
//   //   }

//   //   // Close the UI
//   //   // if (typeof oncloseuser === "function") {
//   //   //   console.log("Closing video call component...");
//   //   //   oncloseuser();
//   //   // }
//   // };

//   const endCall = () => {
//     window.location.reload();
//   }
//   useEffect(() => {
//     return () => {
//       endCall();
//     };
//   }, []);

//   return (
//     <Dialog open={true} onClose={() => { oncloseuser(); endCall(); }} maxWidth="md" fullWidth>
//       <DialogTitle>
//         Video Call
//         <IconButton
//           onClick={() => { oncloseuser(); endCall(); }}
//           sx={{ position: "absolute", right: 8, top: 8 }}
//         >
//           <Close />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Grid2 container spacing={2} sx={{ marginBottom: 2 }}>
//           <Grid2 xs={6}>
//             <video
//               ref={myVideoRef}
//               autoPlay
//               muted
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 borderRadius: "8px",
//                 backgroundColor: "#000",
//               }}
//             />
//           </Grid2>
//           <Grid2 xs={6}>
//             <video
//               ref={remoteVideoRef}
//               autoPlay
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 borderRadius: "8px",
//                 backgroundColor: "#000",
//               }}
//             />
//           </Grid2>
//         </Grid2>
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <InputLabel>Select Camera</InputLabel>
//           <Select value={selectedCamera} onChange={handleCameraChange}>
//             {cameras.map((camera) => (
//               <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                 {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={startCall}
//           sx={{ marginBottom: 2 }}
//         >
//           Launch
//         </Button>

//         <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
//           <IconButton
//             color={isVideoOn ? "primary" : "secondary"}
//             onClick={toggleVideo}
//           >
//             {isVideoOn ? <Videocam /> : <VideocamOff />}
//           </IconButton>
//           <IconButton
//             color={isAudioOn ? "primary" : "secondary"}
//             onClick={toggleAudio}
//           >
//             {isAudioOn ? <Mic /> : <MicOff />}
//           </IconButton>
//           <IconButton
//             color={isScreenSharing ? "primary" : "secondary"}
//             onClick={toggleScreenShare}
//           >
//             {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
//           </IconButton>
//           <Button variant="contained" color="secondary" onClick={() => { oncloseuser(); endCall(); }}>
//             End Call
//           </Button>
//         </div>
//       </DialogContent>
//       <Dialog open={!!callRequest && callRequest.from !== myId} onClose={rejectCall} maxWidth="sm" fullWidth>
//         <DialogTitle>Incoming Call</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">
//             Incoming call from {callRequest?.from}
//           </Typography>
//           <FormControl fullWidth sx={{ marginTop: 2 }}>
//             <InputLabel>Select Camera</InputLabel>
//             <Select value={selectedCamera} onChange={handleCameraChange}>
//               {cameras.map((camera) => (
//                 <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                   {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" color="primary" onClick={() => acceptCall(callRequest.call)}>
//             Join Meeting
//           </Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Dialog>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   IconButton,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//   Close,
//   Videocam,
//   VideocamOff,
//   Mic,
//   MicOff,
//   ScreenShare,
//   StopScreenShare,
// } from "@mui/icons-material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import "./VideoCall.css"; // Import the CSS file

// const VideoCall = ({ otherUserId, oncloseuser }) => {
//   const {
//     user,
//     socket,
//     myId,
//     setMyId,
//     callRequest,
//     setCallRequest,
//     localStream,
//     setLocalStream,
//     remoteStream,
//     setRemoteStream,
//     cameras,
//     setCameras,
//     selectedCamera,
//     setSelectedCamera,
//     otherUserPeerId,
//     setOtherUserPeerId,
//     isVideoOn,
//     setIsVideoOn,
//     isAudioOn,
//     setIsAudioOn,
//     isScreenSharing,
//     setIsScreenSharing,
//     callDuration,
//     setCallDuration,
//     myVideoRef,
//     remoteVideoRef,
//     peerInstance,
//   } = useGlobalContext();

//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [isDragging, setIsDragging] = useState(false);
//   const floatingWindowRef = useRef(null);

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async (call) => {
//     const stream = await startLocalStream(selectedCamera);
//     call.answer(stream);
//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: call.peer });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//     socket.emit("video-toggle", { to: otherUserPeerId, isVideoOn: !isVideoOn });
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   const toggleScreenShare = async () => {
//     if (!isScreenSharing) {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(true);
//     } else {
//       const stream = await startLocalStream(selectedCamera);
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(false);
//     }
//   };

//   const endCall = () => {
//     window.location.reload();
//   };

//   useEffect(() => {
//     return () => {
//       endCall();
//     };
//   }, []);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     const offsetX = e.clientX - position.x;
//     const offsetY = e.clientY - position.y;

//     const handleMouseMove = (e) => {
//       if (isDragging) {
//         setPosition({
//           x: e.clientX - offsetX,
//           y: e.clientY - offsetY,
//         });
//       }
//     };

//     const handleMouseUp = () => {
//       setIsDragging(false);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <div
//       className="floating-window"
//       ref={floatingWindowRef}
//       style={{ left: position.x, top: position.y }}
//     >
//       <div className="floating-header" onMouseDown={handleMouseDown}>
//         <Typography variant="h6">Video Call</Typography>
//         <IconButton onClick={() => { oncloseuser(); endCall(); }}>
//           <Close />
//         </IconButton>
//       </div>
//       <div className="floating-content">
//         <video
//           ref={myVideoRef}
//           autoPlay
//           muted
//           className="floating-video"
//         />
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           className="floating-video"
//         />
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <InputLabel>Select Camera</InputLabel>
//           <Select value={selectedCamera} onChange={handleCameraChange}>
//             {cameras.map((camera) => (
//               <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                 {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={startCall}
//           sx={{ marginBottom: 2 }}
//         >
//           Launch
//         </Button>
//         <div className="floating-controls">
//           <IconButton
//             color={isVideoOn ? "primary" : "secondary"}
//             onClick={toggleVideo}
//           >
//             {isVideoOn ? <Videocam /> : <VideocamOff />}
//           </IconButton>
//           <IconButton
//             color={isAudioOn ? "primary" : "secondary"}
//             onClick={toggleAudio}
//           >
//             {isAudioOn ? <Mic /> : <MicOff />}
//           </IconButton>
//           <IconButton
//             color={isScreenSharing ? "primary" : "secondary"}
//             onClick={toggleScreenShare}
//           >
//             {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
//           </IconButton>
//           <Button variant="contained" color="secondary" onClick={() => { oncloseuser(); endCall(); }}>
//             End Call
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   IconButton,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//   Close,
//   Videocam,
//   VideocamOff,
//   Mic,
//   MicOff,
//   ScreenShare,
//   StopScreenShare,
// } from "@mui/icons-material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import "./VideoCall.css"; // Import the CSS file

// const VideoCall = ({ otherUserId, oncloseuser }) => {
//   const {
//     user,
//     socket,
//     myId,
//     setMyId,
//     callRequest,
//     setCallRequest,
//     localStream,
//     setLocalStream,
//     remoteStream,
//     setRemoteStream,
//     cameras,
//     setCameras,
//     selectedCamera,
//     setSelectedCamera,
//     otherUserPeerId,
//     setOtherUserPeerId,
//     isVideoOn,
//     setIsVideoOn,
//     isAudioOn,
//     setIsAudioOn,
//     isScreenSharing,
//     setIsScreenSharing,
//     callDuration,
//     setCallDuration,
//     myVideoRef,
//     remoteVideoRef,
//     peerInstance,
//   } = useGlobalContext();

//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [isDragging, setIsDragging] = useState(false);
//   const floatingWindowRef = useRef(null);

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async (call) => {
//     const stream = await startLocalStream(selectedCamera);
//     call.answer(stream);
//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: call.peer });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//     socket.emit("video-toggle", { to: otherUserPeerId, isVideoOn: !isVideoOn });
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   const toggleScreenShare = async () => {
//     if (!isScreenSharing) {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(true);
//     } else {
//       const stream = await startLocalStream(selectedCamera);
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(false);
//     }
//   };

//   const endCall = () => {
//     window.location.reload();
//   };

//   useEffect(() => {
//     return () => {
//       endCall();
//     };
//   }, []);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     const offsetX = e.clientX - position.x;
//     const offsetY = e.clientY - position.y;

//     const handleMouseMove = (e) => {
//       if (isDragging) {
//         setPosition({
//           x: e.clientX - offsetX,
//           y: e.clientY - offsetY,
//         });
//       }
//     };

//     const handleMouseUp = () => {
//       setIsDragging(false);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <div
//       className="floating-window"
//       ref={floatingWindowRef}
//       style={{ left: position.x, top: position.y }}
//     >
//       <div className="floating-header" onMouseDown={handleMouseDown}>
//         <Typography variant="h6">Video Call</Typography>
//         <IconButton onClick={() => { oncloseuser(); endCall(); }}>
//           <Close />
//         </IconButton>
//       </div>
//       <div className="floating-content">
//         <video
//           ref={myVideoRef}
//           autoPlay
//           muted
//           className="floating-video"
//         />
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           className="floating-video"
//         />
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <InputLabel>Select Camera</InputLabel>
//           <Select value={selectedCamera} onChange={handleCameraChange}>
//             {cameras.map((camera) => (
//               <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                 {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={startCall}
//           sx={{ marginBottom: 2 }}
//         >
//           Launch
//         </Button>
//         <div className="floating-controls">
//           <IconButton
//             color={isVideoOn ? "primary" : "secondary"}
//             onClick={toggleVideo}
//           >
//             {isVideoOn ? <Videocam /> : <VideocamOff />}
//           </IconButton>
//           <IconButton
//             color={isAudioOn ? "primary" : "secondary"}
//             onClick={toggleAudio}
//           >
//             {isAudioOn ? <Mic /> : <MicOff />}
//           </IconButton>
//           <IconButton
//             color={isScreenSharing ? "primary" : "secondary"}
//             onClick={toggleScreenShare}
//           >
//             {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
//           </IconButton>
//           <Button variant="contained" color="secondary" onClick={() => { oncloseuser(); endCall(); }}>
//             End Call
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   IconButton,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   Close,
//   Videocam,
//   VideocamOff,
//   Mic,
//   MicOff,
//   ScreenShare,
//   StopScreenShare,
// } from "@mui/icons-material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import "./VideoCall.css"; // Import the CSS file

// const VideoCall = ({ otherUserId, oncloseuser }) => {
//   const {
//     user,
//     socket,
//     myId,
//     setMyId,
//     callRequest,
//     setCallRequest,
//     localStream,
//     setLocalStream,
//     remoteStream,
//     setRemoteStream,
//     cameras,
//     setCameras,
//     selectedCamera,
//     setSelectedCamera,
//     otherUserPeerId,
//     setOtherUserPeerId,
//     isVideoOn,
//     setIsVideoOn,
//     isAudioOn,
//     setIsAudioOn,
//     isScreenSharing,
//     setIsScreenSharing,
//     callDuration,
//     setCallDuration,
//     myVideoRef,
//     remoteVideoRef,
//     peerInstance,
//   } = useGlobalContext();

//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [isDragging, setIsDragging] = useState(false);
//   const floatingWindowRef = useRef(null);

//   const startLocalStream = async (deviceId) => {
//     const constraints = {
//       video: { deviceId: deviceId ? { exact: deviceId } : undefined },
//       audio: true,
//     };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     setLocalStream(stream);
//     myVideoRef.current.srcObject = stream;
//     return stream;
//   };

//   const handleCameraChange = async (event) => {
//     const deviceId = event.target.value;
//     setSelectedCamera(deviceId);
//     await startLocalStream(deviceId);
//   };

//   const startCall = async () => {
//     socket.emit("check-user-registered", { to: otherUserId });

//     socket.on("user-registered", (data) => {
//       if (data.registered) {
//         setOtherUserPeerId(data.peerId);
//         initiateCall(data.peerId);
//       } else {
//         alert("User is offline");
//       }
//     });
//   };

//   const initiateCall = async (peerId) => {
//     const stream = await startLocalStream(selectedCamera);
//     const call = peerInstance.current.call(peerId, stream);

//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     setCallRequest({ call });
//   };

//   const acceptCall = async (call) => {
//     const stream = await startLocalStream(selectedCamera);
//     call.answer(stream);
//     call.on("stream", (remoteStream) => {
//       setRemoteStream(remoteStream);
//       remoteVideoRef.current.srcObject = remoteStream;
//     });

//     socket.emit("call-accepted", { to: call.peer });
//     setCallRequest(null);
//   };

//   const rejectCall = () => {
//     socket.emit("call-rejected", { to: callRequest.from });
//     setCallRequest(null);
//   };

//   const toggleVideo = () => {
//     const videoTracks = localStream.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsVideoOn(!isVideoOn);
//     socket.emit("video-toggle", { to: otherUserPeerId, isVideoOn: !isVideoOn });
//   };

//   const toggleAudio = () => {
//     const audioTracks = localStream.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsAudioOn(!isAudioOn);
//   };

//   const toggleScreenShare = async () => {
//     if (!isScreenSharing) {
//       const stream = await navigator.mediaDevices.getDisplayMedia({
//         video: true,
//       });
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(true);
//     } else {
//       const stream = await startLocalStream(selectedCamera);
//       const call = peerInstance.current.call(otherUserPeerId, stream);
//       call.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//         remoteVideoRef.current.srcObject = remoteStream;
//       });
//       setIsScreenSharing(false);
//     }
//   };

//   // const endCall = () => {
//   //   console.log("Ending call...");

//   //   if (localStream) {
//   //     console.log("Stopping local stream...");
//   //     localStream.getTracks().forEach((track) => {
//   //       console.log(`Stopping track: ${track.kind}`);
//   //       track.stop();
//   //     });
//   //     myVideoRef.current.srcObject = null; // Remove video source
//   //   }

//   //   if (remoteStream) {
//   //     console.log("Stopping remote stream...");
//   //     remoteStream.getTracks().forEach((track) => {
//   //       console.log(`Stopping track: ${track.kind}`);
//   //       track.stop();
//   //     });
//   //     remoteVideoRef.current.srcObject = null; // Remove video source
//   //   }
//   //   useEffect(() => {
//   //     socket.on("call-ended", () => {
//   //       endCall();
//   //     });

//   //     return () => {
//   //       socket.off("call-ended");
//   //     };
//   //   }, []);
//   //   // Reset state
//   //   setLocalStream(null);
//   //   setRemoteStream(null);
//   //   setCallRequest(null);

//   //   // Close Peer Connection
//   //   if (peerInstance.current) {
//   //     console.log("Closing peer connection...");
//   //     peerInstance.current.destroy();
//   //   }

//   //   // Inform other user
//   //   if (socket && otherUserPeerId) {
//   //     console.log("Emitting end-call event...");
//   //     socket.emit("end-call", { to: otherUserPeerId });
//   //   }

//   //   // Close the UI
//   //   // if (typeof oncloseuser === "function") {
//   //   //   console.log("Closing video call component...");
//   //   //   oncloseuser();
//   //   // }
//   // };

//   const endCall = () => {
//     window.location.reload();
//   };
//   useEffect(() => {
//     return () => {
//       endCall();
//     };
//   }, []);

//   // reset
//   // const handleMouseDown = (e) => {
//   //   setIsDragging(true);
//   //   const offsetX = e.clientX - position.x;
//   //   const offsetY = e.clientY - position.y;

//   //   const handleMouseMove = (e) => {
//   //     if (isDragging) {
//   //       setPosition({
//   //         x: e.clientX - offsetX,
//   //         y: e.clientY - offsetY,
//   //       });
//   //     }
//   //   };

//   //   const handleMouseUp = () => {
//   //     setIsDragging(false);
//   //     window.removeEventListener("mousemove", handleMouseMove);
//   //     window.removeEventListener("mouseup", handleMouseUp);
//   //   };

//   //   window.addEventListener("mousemove", handleMouseMove);
//   //   window.addEventListener("mouseup", handleMouseUp);
//   // };

//   const handleMouseDown = (e) => {
//     const floatingWindow = floatingWindowRef.current;
//     if (!floatingWindow) return;

//     const rect = floatingWindow.getBoundingClientRect();
//     const offsetX = e.clientX - rect.left;
//     const offsetY = e.clientY - rect.top;

//     const handleMouseMove = (e) => {
//       floatingWindow.style.left = `${e.clientX - offsetX}px`;
//       floatingWindow.style.top = `${e.clientY - offsetY}px`;
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <div
//       className="floating-window"
//       ref={floatingWindowRef}
//       style={{ left: position.x, top: position.y}}
//     >
//       <div className="floating-header" onMouseDown={handleMouseDown}>
//         <Typography variant="h6">Video Call</Typography>
//         <IconButton
//           onClick={() => {
//             oncloseuser();
//             endCall();
//           }}
//         >
//           <Close />
//         </IconButton>
//       </div>
//       <div className="floating-content">
//         <video ref={myVideoRef} autoPlay muted className="floating-video" />
//         <video ref={remoteVideoRef} autoPlay className="floating-video" />
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <InputLabel>Select Camera</InputLabel>
//           <Select value={selectedCamera} onChange={handleCameraChange}>
//             {cameras.map((camera) => (
//               <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                 {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={startCall}
//           sx={{ marginBottom: 2 }}
//         >
//           Launch
//         </Button>
//         <div className="floating-controls">
//           <IconButton
//             color={isVideoOn ? "primary" : "secondary"}
//             onClick={toggleVideo}
//           >
//             {isVideoOn ? <Videocam /> : <VideocamOff />}
//           </IconButton>
//           <IconButton
//             color={isAudioOn ? "primary" : "secondary"}
//             onClick={toggleAudio}
//           >
//             {isAudioOn ? <Mic /> : <MicOff />}
//           </IconButton>
//           <IconButton
//             color={isScreenSharing ? "primary" : "secondary"}
//             onClick={toggleScreenShare}
//           >
//             {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
//           </IconButton>
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={() => {
//               oncloseuser();
//               endCall();
//             }}
//           >
//             End Call
//           </Button>
//         </div>
//       </div>
//       <Dialog
//         open={!!callRequest && callRequest.from !== myId}
//         onClose={rejectCall}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle >Incoming Call</DialogTitle>
//         <DialogContent >
//           <Typography variant="h6">
//             Incoming call from {callRequest?.from}
//           </Typography>
//           <FormControl fullWidth sx={{ marginTop: 2 }}>
//             <InputLabel>Select Camera</InputLabel>
//             <Select
//               value={selectedCamera}
//               onChange={handleCameraChange}

//             >
//               {cameras.map((camera) => (
//                 <MenuItem key={camera.deviceId} value={camera.deviceId}>
//                   {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => acceptCall(callRequest.call)}
//           >
//             Join Meeting
//           </Button>
//           <Button variant="contained" color="secondary" onClick={rejectCall}>
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default VideoCall;

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

    setCallRequest({ call });
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

  // const endCall = () => {
  //   console.log("Ending call...");

  //   if (localStream) {
  //     console.log("Stopping local stream...");
  //     localStream.getTracks().forEach((track) => {
  //       console.log(`Stopping track: ${track.kind}`);
  //       track.stop();
  //     });
  //     myVideoRef.current.srcObject = null; // Remove video source
  //   }

  //   if (remoteStream) {
  //     console.log("Stopping remote stream...");
  //     remoteStream.getTracks().forEach((track) => {
  //       console.log(`Stopping track: ${track.kind}`);
  //       track.stop();
  //     });
  //     remoteVideoRef.current.srcObject = null; // Remove video source
  //   }
  //   useEffect(() => {
  //     socket.on("call-ended", () => {
  //       endCall();
  //     });

  //     return () => {
  //       socket.off("call-ended");
  //     };
  //   }, []);
  //   // Reset state
  //   setLocalStream(null);
  //   setRemoteStream(null);
  //   setCallRequest(null);

  //   // Close Peer Connection
  //   if (peerInstance.current) {
  //     console.log("Closing peer connection...");
  //     peerInstance.current.destroy();
  //   }

  //   // Inform other user
  //   if (socket && otherUserPeerId) {
  //     console.log("Emitting end-call event...");
  //     socket.emit("end-call", { to: otherUserPeerId });
  //   }

  //   // Close the UI
  //   // if (typeof oncloseuser === "function") {
  //   //   console.log("Closing video call component...");
  //   //   oncloseuser();
  //   // }
  // };

  const endCall = () => {
    // window.location.reload();
  };
  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  // reset
  // const handleMouseDown = (e) => {
  //   setIsDragging(true);
  //   const offsetX = e.clientX - position.x;
  //   const offsetY = e.clientY - position.y;

  //   const handleMouseMove = (e) => {
  //     if (isDragging) {
  //       setPosition({
  //         x: e.clientX - offsetX,
  //         y: e.clientY - offsetY,
  //       });
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     setIsDragging(false);
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   window.addEventListener("mouseup", handleMouseUp);
  // };

  const handleMouseDown = (e) => {
    const floatingWindow = floatingWindowRef.current;
    if (!floatingWindow) return;

    const rect = floatingWindow.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      floatingWindow.style.left = `${e.clientX - offsetX}px`;
      floatingWindow.style.top = `${e.clientY - offsetY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="floating-window"
      ref={floatingWindowRef}
      style={{ left: position.x, top: position.y,
        display: (videoCallUser || callRequest) ? "block" : "none"
       }}
    >
      <div className="floating-header" onMouseDown={handleMouseDown}>
        <Typography variant="h6">Video Call</Typography>
        <IconButton
          onClick={() => {
            oncloseuser();
            endCall();
          }}
        >
          <Close />
        </IconButton>
      </div>
      <div className="floating-content">
        <video ref={myVideoRef} autoPlay muted className="floating-video" />
        <video ref={remoteVideoRef} autoPlay className="floating-video" />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Select Camera</InputLabel>
          <Select value={selectedCamera} onChange={handleCameraChange}>
            {cameras.map((camera) => (
              <MenuItem key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={startCall}
          sx={{ marginBottom: 2 }}
        >
          Launch
        </Button>
        <div className="floating-controls">
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
            End Call
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
