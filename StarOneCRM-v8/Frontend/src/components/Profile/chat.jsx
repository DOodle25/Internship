// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Box,
//   List,
//   ListItem,
//   Typography,
//   ListItemButton,
//   ListItemText,
//   TextField,
//   IconButton,
//   Drawer,
//   useMediaQuery,
//   Avatar,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useGlobalContext } from "../../context/GlobalContext";
// import io from "socket.io-client";
// import ChatIcon from "@mui/icons-material/Chat";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import SendIcon from "@mui/icons-material/Send";
// import dayjs from "dayjs";
// import imageCompression from "browser-image-compression";
// import VideoCall from "./VideoCall";
// import VideoCallIcon from "@mui/icons-material/VideoCall";
// const base64ToFile = (base64String, fileName = "image.png") => {
//   const arr = base64String.split(",");
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], fileName, { type: mime });
// };

// const fileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// };

// const compressImage = async (base64String) => {

//   const file = base64ToFile(base64String);

//   const options = {
//     maxSizeMB: 0.2,
//     maxWidthOrHeight: 100,
//     useWebWorker: true,
//   };

//   try {
//     const compressedFile = await imageCompression(file, options);

//     const compressedBase64 = await fileToBase64(compressedFile);
//     return compressedBase64;
//   } catch (error) {
//     console.error("Image compression error:", error);
//     return base64String;
//   }
// };

// const drawerWidth = 240;

// const ChatPage = () => {
//   const { token, user } = useGlobalContext();
//   const [taskslist, setTaskslist] = useState([]);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const messageEndRef = useRef(null);
//   const userEmail = user.email;
//   const isLargeScreen = useMediaQuery("(min-width:960px)");
//   const [expanded, setExpanded] = useState(true);
//   const socketRef = useRef(null);
//   const selectedTaskIdRef = useRef(selectedTaskId);
//   const [avatarUrl, setAvatarUrl] = useState(null);
//  const [videoCallUser, setVideoCallUser] = useState(null);
//  const handleVideoCall = (otherUserId) => {
//    setVideoCallUser(otherUserId);
//    console.log("Video call initiated with user ID:", otherUserId);
//   };
//   const oncloseuser = () => {
//     console.log("Video call ended");
//     setVideoCallUser(null);
//   };

//   const colors = [
//     "#8B0000",
//     "#8B4513",
//     "#2F4F4F",
//     "#556B2F",
//     "#8B008B",
//     "#483D8B",
//     "#2E8B57",
//     "#4B0082",
//     "#191970",
//     "#00008B",
//     "#8B0000",
//     "#8B4513",
//     "#2F4F4F",
//     "#556B2F",
//     "#8B008B",
//     "#483D8B",
//     "#2E8B57",
//     "#4B0082",
//     "#191970",
//     "#00008B",
//     "#8B0000",
//     "#8B4513",
//     "#2F4F4F",
//     "#556B2F",
//     "#8B008B",
//     "#483D8B",
//   ];
//   const getColorForLetter = (letter) => {
//     const index = letter.charCodeAt(0) % colors.length;
//     return colors[index];
//   };

//   useEffect(() => {
//     selectedTaskIdRef.current = selectedTaskId;
//   }, [selectedTaskId]);

//   const handleDrawerToggle = () => {
//     setOpen(!open);
//   };

//   useEffect(() => {
//     const connectSocket = () => {
//       if (!token || socketRef.current) return;

//       const newSocket = io(
//         "http://localhost:5000",
//         {
//           query: { token },
//         }
//       );

//       newSocket.on("connect", () => {
//         if (selectedTaskId) {
//           newSocket.emit("joinTaskRoom", selectedTaskId, token);
//         }
//       });

//       newSocket.on("connect_error", (error) => {
//         console.error("Socket connection failed:", error);
//       });

//       socketRef.current = newSocket;

//       return () => {
//         newSocket.close();
//         socketRef.current = null;
//       };
//     };

//     connectSocket();

//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "visible") {
//         if (!socketRef.current) {
//           connectSocket();
//         }
//         if (socketRef.current.disconnect) {
//           fetchMessagesForTask(selectedTaskIdRef.current);
//         }
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       if (socketRef.current) {
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//     };
//   }, [token]);

//   useEffect(() => {
//     if (socketRef.current) {
//       const handleMessage = ({ message, sender }) => {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { ...message, sender },
//         ]);
//       };

//       socketRef.current.off("receiveMessage");
//       socketRef.current.on("receiveMessage", handleMessage);
//     }
//   }, [socketRef.current]);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "instant" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       taskId: selectedTaskId,
//       content: newMessage,
//       senderId: user._id,
//     };

//     socketRef.current?.emit("sendMessage", messageData);
//     setNewMessage("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendMessage();
//     }
//   };

//   const fetchAssignedTasks = async () => {
//     try {
//       const response = await axiosInstance.get("/chat/assigned-tasks/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!Array.isArray(response.data.tasksAssigned)) {
//         console.error("tasksAssigned is not an array:", response.data.tasksAssigned);
//         return;
//       }

//       setTaskslist(response.data.tasksAssigned);
//       if (response.data.tasksAssigned.length > 0) {
//         setSelectedTaskId(response.data.tasksAssigned[0]._id);
//         fetchMessagesForTask(response.data.tasksAssigned[0]._id);
//       };
//       const task = response.data.tasksAssigned.find(
//         (task) =>
//           (task.customer?._id === user._id && task.employee?.profileImage) ||
//           (task.employee?._id === user._id && task.customer?.profileImage)
//       );

//       if (task) {
//         const profileImage =
//           task.customer?._id === user._id
//             ? task.employee?.profileImage
//             : task.customer?.profileImage;

//         if (profileImage) {
//           const compressedFile = await compressImage(profileImage);
//           setAvatarUrl(compressedFile);
//         } else {
//           console.warn("Profile image not found for the assigned task.");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching assigned tasks:", error);
//     }
//   };

//   const fetchMessagesForTask = async (taskId) => {
//     try {
//       const response = await axiosInstance.get(
//         `/chat/task/${taskId}/messages`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessages(response.data.messages);
//       setSelectedTaskId(taskId);

//       if (socketRef.current) {
//         socketRef.current.emit("joinTaskRoom", taskId, token);
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAssignedTasks();
//   }, []);

//   const renderMessagesWithTimestamps = () => {
//     let lastDate = null;

//     return messages.map((msg, index) => {
//       const isSentByUser = msg.sender.email === userEmail;
//       const messageDate = dayjs(msg.createdAt).format("MMMM D, YYYY");

//       const showDateDivider = messageDate !== lastDate;
//       lastDate = messageDate;

//       return (
//         <React.Fragment key={index}>
//           {showDateDivider && (
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 my: 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   flexGrow: 1,
//                   height: "1px",
//                   backgroundColor: "#e0e0e0",
//                 }}
//               />
//               <Typography
//                 variant="caption"
//                 sx={{
//                   mx: 2,
//                   color: "#888",
//                   backgroundColor: "#fff",
//                   padding: "0 10px",
//                 }}
//               >
//                 {messageDate}
//               </Typography>
//               <Box
//                 sx={{
//                   flexGrow: 1,
//                   height: "1px",
//                   backgroundColor: "#e0e0e0",
//                 }}
//               />
//             </Box>
//           )}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: isSentByUser ? "flex-end" : "flex-start",
//               my: 1,
//             }}
//           >
//             {!isSentByUser ? (
//               avatarUrl ? (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     width: 40,
//                     height: 40,
//                     borderRadius: "50%",
//                     backgroundColor: "#f0f0f0",
//                     mr: 1,
//                   }}
//                 >
//                   <Avatar src={avatarUrl} />
//                 </Box>
//               ) : (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     width: 40,
//                     height: 40,
//                     borderRadius: "50%",
//                     color: "white",
//                     mr: 1,
//                     backgroundColor: getColorForLetter(
//                       msg.sender.name.charAt(0).toUpperCase()
//                     ),
//                   }}
//                 >
//                   <Typography variant="body1">
//                     {msg.sender.name.charAt(0).toUpperCase()}
//                   </Typography>
//                 </Box>
//               )
//             ) : null}
//             <Box
//               sx={{
//                 position: "relative",
//                 maxWidth: "70%",
//                 wordBreak: "break-word",
//                 padding: "10px 14px",
//                 borderRadius: "16px",
//                 bgcolor: isSentByUser ? "#031738" : "#FFFFFF",
//                 boxShadow: "2px 2px 20px 0px #DFDFDF",
//                 color: isSentByUser ? "white" : "black",
//                 fontSize: "14px",
//                 lineHeight: "1.4",
//               }}
//             >
//               {msg.content}
//               <Typography
//                 variant="caption"
//                 sx={{
//                   display: "block",
//                   textAlign: "right",
//                   color: isSentByUser
//                     ? "rgba(255, 255, 255, 0.7)"
//                     : "rgba(0, 0, 0, 0.7)",
//                   mt: 1,
//                 }}
//               >
//                 {dayjs(msg.createdAt).format("h:mm A")}
//               </Typography>
//             </Box>
//           </Box>
//         </React.Fragment>
//       );
//     });
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         ...(!isLargeScreen && { height: "92vh" }),
//         marginTop: "0px",
//         marginLeft: "0px",
//         width: "100%",
//       }}
//     >
//       {/* Sidebar Drawer - Persistent for Large Screens */}
//       {/* {isLargeScreen ? (
//         <Box
//           sx={{
//             bgcolor: "white",
//             transition: "width 0.3s ease-in-out, box-shadow 0.2s ease-in-out",
//             width: expanded ? "260px" : "60px",
//             overflow: "hidden",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             paddingTop: 2,
//             minWidth: expanded ? "260px" : "60px",
//             borderRight: "1px solid #e0e0e0",
//             height: "calc(100vh - 80px) !important",
//             overflowY: "scroll",
//             "&::-webkit-scrollbar": {
//               display: "none",
//             },
//             "-ms-overflow-style": "none",
//             "scrollbar-width": "none",
//           }}
//         >
//           <Button
//             onClick={() => setExpanded(!expanded)}
//             sx={{
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//               alignSelf: expanded ? "flex-end" : "center",
//               marginRight: expanded ? "5px" : "0px",
//               marginBottom: 2,
//               minWidth: "40px",
//               height: "40px",
//               borderRadius: "50%",
//               boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
//               backgroundColor: "#FFFFFF",
//               color: "#201F2F",
//               "&:hover": {
//                 backgroundColor: "#FFFFFF",
//                 color: "#201F2F",
//                 transition: "all 0.2s ease-in-out",
//               },
//             }}
//           >
//             {expanded ? <ChevronLeftIcon /> : <ChatIcon />}
//           </Button>
//           <List sx={{ width: "100%", padding: 0 }}>
//             {taskslist.length > 0 ? (
//               taskslist.map((task) => (
//                 <ListItem
//                   key={task._id}
//                   sx={{
//                     cursor: "pointer",
//                     backgroundColor:
//                       selectedTaskId === task._id ? "#F3F4F6" : "#FFFFFF",
//                     borderRadius:
//                       selectedTaskId === task._id ? "10px" : "#FFFFFF",
//                     color: selectedTaskId === task._id ? "#201F2F" : "#000000",
//                     "&:hover": {
//                       backgroundColor: "#F3F4F6",
//                       color: "#201F2F",
//                       borderRadius: "10px",
//                       transition: "all 0.2s ease-in-out",
//                     },
//                     transition: "padding 0.3s ease-in-out",
//                     justifyContent: expanded ? "flex-start" : "center",
//                     marginTop: "4px",
//                     marginBottom: "4px",
//                   }}
//                   onClick={() => {
//                     fetchMessagesForTask(task._id);
//                   }}
//                 >
//                   {expanded ? (
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         padding: "5px",
//                         fontSize: "14px",
//                         fontWeight: "300",
//                       }}
//                     >
//                       {task.description}
//                     </Typography>
//                   ) : (
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: "100%",
//                       }}
//                     >
//                       <Typography
//                         variant="body1"
//                         sx={{ fontSize: "14px", fontWeight: "300" }}
//                       >
//                         {task.description.charAt(0).toUpperCase()}
//                       </Typography>
//                     </Box>
//                   )}
//                   <IconButton
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       const otherUserId =
//                         user.role === "customer"
//                           ? task.employee._id
//                           : task.customer._id;
//                       navigate(`/videocall/${otherUserId}`);
//                     }}
//                     sx={{ marginLeft: "auto" }}
//                   >
//                     <VideoCallIcon />
//                   </IconButton>
//                 </ListItem>
//               ))
//             ) : (
//               <Typography
//                 variant="body2"
//                 sx={{
//                   textAlign: "center",
//                   padding: "10px",
//                   color: "#888",
//                   fontStyle: "italic",
//                 }}
//               >
//                 No tasks assigned
//               </Typography>
//             )}
//           </List>
//         </Box>
//       ) : (
//         <Drawer
//           anchor="left"
//           open={open}
//           onClose={handleDrawerToggle}
//           sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
//         >
//           <List>
//             {taskslist.length > 0 ? (
//               taskslist.map((task) => (
//                 <ListItem key={task._id} disablePadding>
//                   <ListItemButton
//                     onClick={() => fetchMessagesForTask(task._id)}
//                   >
//                     <ListItemText primary={task.description} />
//                     <IconButton
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         const otherUserId =
//                           user.role === "customer"
//                             ? task.employee._id
//                             : task.customer._id;
//                         navigate(`/videocall/${otherUserId}`);
//                       }}
//                     >
//                       <VideoCallIcon />
//                     </IconButton>
//                   </ListItemButton>
//                 </ListItem>
//               ))
//             ) : (
//               <Typography variant="body2" sx={{ padding: 2 }}>
//                 No tasks assigned
//               </Typography>
//             )}
//           </List>
//         </Drawer>
//       )} */}
//                   {isLargeScreen ? (
//                 <Box
//                     sx={{
//                         bgcolor: "white",
//                         transition: "width 0.3s ease-in-out, box-shadow 0.2s ease-in-out",
//                         width: expanded ? "260px" : "60px",
//                         overflow: "hidden",
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         paddingTop: 2,
//                         minWidth: expanded ? "260px" : "60px",
//                         borderRight: "1px solid #e0e0e0",
//                         height: "calc(100vh - 80px) !important",
//                         overflowY: "scroll",
//                         "&::-webkit-scrollbar": { display: "none" },
//                         "-ms-overflow-style": "none",
//                         "scrollbar-width": "none",
//                     }}
//                 >
//                     <Button onClick={() => setExpanded(!expanded)} sx={{ marginBottom: 2 }}>Toggle</Button>
//                     <List sx={{ width: "100%", padding: 0 }}>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem key={task._id} onClick={() => fetchMessagesForTask(task._id)}>
//                                     <Typography variant="body1">{task.description}</Typography>
//                                     <IconButton onClick={(e) => {
//                                         e.stopPropagation();
//                                         const otherUserId = user.role === "customer" ? task.employee._id : task.customer._id;
//                                         handleVideoCall(otherUserId);
//                                     }}>
//                                         <VideoCallIcon />
//                                     </IconButton>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Box>
//             ) : (
//                 <Drawer anchor="left" open={open} onClose={handleDrawerToggle}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem key={task._id} disablePadding>
//                                     <Button onClick={() => fetchMessagesForTask(task._id)}>{task.description}</Button>
//                                     <IconButton onClick={(e) => {
//                                         e.stopPropagation();
//                                         const otherUserId = user.role === "customer" ? task.employee._id : task.customer._id;
//                                         handleVideoCall(otherUserId);
//                                     }}>
//                                         <VideoCallIcon />
//                                     </IconButton>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Drawer>
//             )}
//             {videoCallUser && <VideoCall otherUserId={videoCallUser} oncloseuser={oncloseuser} />}

//       {/* Main Content */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           display: "flex",
//           flexDirection: "column",
//           height: "100%",
//         }}
//       >
//         {/* AppBar */}
//         {!isLargeScreen ? (
//           <Box
//             sx={{
//               position: "fixed",
//               top: "10%",
//               right: "1.5rem",
//               display: "flex",
//               flexDirection: "column",
//               gap: "1rem",
//               zIndex: 1300,
//             }}
//           >
//             <IconButton
//               onClick={handleDrawerToggle}
//               sx={{
//                 width: 50,
//                 height: 50,
//                 backgroundColor: "rgba(0,0,0,0.7)",
//                 color: "white",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "rgba(0,0,0,0.9)",
//                   transform: "scale(1.1)",
//                 },
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//           </Box>
//         ) : (
//           <></>
//         )}

//         <Box
//           sx={{
//             flexGrow: 1,
//             display: "flex",
//             flexDirection: "column",
//             height: "calc(100vh - 64px)",
//             overflow: "hidden",
//           }}
//         >
//           {/* Chat Messages */}
//           <Box
//             sx={{
//               flexGrow: 1,
//               overflowY: "auto",
//               p: 2,
//             }}
//             style={{
//               "&::-webkit-scrollbar": {
//                 display: "none",
//               },
//               "-ms-overflow-style": "none",
//               "scrollbar-width": "none",
//             }}
//           >
//             {selectedTaskId ? (
//               <>
//                 {renderMessagesWithTimestamps()}
//                 <div ref={messageEndRef} />
//               </>
//             ) : (
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "100%",
//                 }}
//               >
//                 <Typography variant="h5" color="textSecondary">
//                   Select a task to view messages
//                 </Typography>
//               </Box>
//             )}
//           </Box>

//           {/* Input Area */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               p: 2,
//               borderTop: "1px solid #e0e0e0",
//               backgroundColor: "background.paper",
//             }}
//           >
//             <TextField
//               fullWidth
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type a message..."
//               variant="outlined"
//               size="small"
//               onKeyDown={handleKeyPress}
//             />
//             <Button variant="outlined" color="" onClick={sendMessage}>
//               <SendIcon />
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ChatPage;

import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  List,
  ListItem,
  Typography,
  ListItemButton,
  ListItemText,
  TextField,
  IconButton,
  Drawer,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useGlobalContext } from "../../context/GlobalContext";
import io from "socket.io-client";
import ChatIcon from "@mui/icons-material/Chat";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import imageCompression from "browser-image-compression";
import VideoCall from "./VideoCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
const base64ToFile = (base64String, fileName = "image.png") => {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const compressImage = async (base64String) => {
  const file = base64ToFile(base64String);

  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 100,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);

    const compressedBase64 = await fileToBase64(compressedFile);
    return compressedBase64;
  } catch (error) {
    console.error("Image compression error:", error);
    return base64String;
  }
};

const drawerWidth = 240;

const ChatPage = () => {
  const { token, user, handleVideoCall } = useGlobalContext();
  const [taskslist, setTaskslist] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const messageEndRef = useRef(null);
  const userEmail = user.email;
  const isLargeScreen = useMediaQuery("(min-width:960px)");
  const [expanded, setExpanded] = useState(true);
  const socketRef = useRef(null);
  const selectedTaskIdRef = useRef(selectedTaskId);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const colors = [
    "#8B0000",
    "#8B4513",
    "#2F4F4F",
    "#556B2F",
    "#8B008B",
    "#483D8B",
    "#2E8B57",
    "#4B0082",
    "#191970",
    "#00008B",
    "#8B0000",
    "#8B4513",
    "#2F4F4F",
    "#556B2F",
    "#8B008B",
    "#483D8B",
    "#2E8B57",
    "#4B0082",
    "#191970",
    "#00008B",
    "#8B0000",
    "#8B4513",
    "#2F4F4F",
    "#556B2F",
    "#8B008B",
    "#483D8B",
  ];
  const getColorForLetter = (letter) => {
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  useEffect(() => {
    selectedTaskIdRef.current = selectedTaskId;
  }, [selectedTaskId]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const connectSocket = () => {
      if (!token || socketRef.current) return;

      // const newSocket = io("http://localhost:5000", {
      const newSocket = io("https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net", {
        query: { token },
      });

      newSocket.on("connect", () => {
        if (selectedTaskId) {
          newSocket.emit("joinTaskRoom", selectedTaskId, token);
        }
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection failed:", error);
      });

      socketRef.current = newSocket;

      return () => {
        newSocket.close();
        socketRef.current = null;
      };
    };

    connectSocket();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (!socketRef.current) {
          connectSocket();
        }
        if (socketRef.current.disconnect) {
          fetchMessagesForTask(selectedTaskIdRef.current);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [token]);

  useEffect(() => {
    if (socketRef.current) {
      const handleMessage = ({ message, sender }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...message, sender },
        ]);
      };

      socketRef.current.off("receiveMessage");
      socketRef.current.on("receiveMessage", handleMessage);
    }
  }, [socketRef.current]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      taskId: selectedTaskId,
      content: newMessage,
      senderId: user._id,
    };

    socketRef.current?.emit("sendMessage", messageData);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const fetchAssignedTasks = async () => {
    try {
      const response = await axiosInstance.get("/chat/assigned-tasks/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!Array.isArray(response.data.tasksAssigned)) {
        console.error(
          "tasksAssigned is not an array:",
          response.data.tasksAssigned
        );
        return;
      }

      setTaskslist(response.data.tasksAssigned);
      if (response.data.tasksAssigned.length > 0) {
        setSelectedTaskId(response.data.tasksAssigned[0]._id);
        fetchMessagesForTask(response.data.tasksAssigned[0]._id);
      }
      const task = response.data.tasksAssigned.find(
        (task) =>
          (task.customer?._id === user._id && task.employee?.profileImage) ||
          (task.employee?._id === user._id && task.customer?.profileImage)
      );

      if (task) {
        const profileImage =
          task.customer?._id === user._id
            ? task.employee?.profileImage
            : task.customer?.profileImage;

        if (profileImage) {
          const compressedFile = await compressImage(profileImage);
          setAvatarUrl(compressedFile);
        } else {
          console.warn("Profile image not found for the assigned task.");
        }
      }
    } catch (error) {
      console.error("Error fetching assigned tasks:", error);
    }
  };

  const fetchMessagesForTask = async (taskId) => {
    try {
      const response = await axiosInstance.get(
        `/chat/task/${taskId}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data.messages);
      setSelectedTaskId(taskId);

      if (socketRef.current) {
        socketRef.current.emit("joinTaskRoom", taskId, token);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchAssignedTasks();
  }, []);

  const renderMessagesWithTimestamps = () => {
    let lastDate = null;

    return messages.map((msg, index) => {
      const isSentByUser = msg.sender.email === userEmail;
      const messageDate = dayjs(msg.createdAt).format("MMMM D, YYYY");

      const showDateDivider = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <React.Fragment key={index}>
          {showDateDivider && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                my: 2,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  height: "1px",
                  backgroundColor: "#e0e0e0",
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  mx: 2,
                  color: "#888",
                  backgroundColor: "#fff",
                  padding: "0 10px",
                }}
              >
                {messageDate}
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  height: "1px",
                  backgroundColor: "#e0e0e0",
                }}
              />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: isSentByUser ? "flex-end" : "flex-start",
              my: 1,
            }}
          >
            {!isSentByUser ? (
              avatarUrl ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#f0f0f0",
                    mr: 1,
                  }}
                >
                  <Avatar src={avatarUrl} />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    color: "white",
                    mr: 1,
                    backgroundColor: getColorForLetter(
                      msg.sender.name.charAt(0).toUpperCase()
                    ),
                  }}
                >
                  <Typography variant="body1">
                    {msg.sender.name.charAt(0).toUpperCase()}
                  </Typography>
                </Box>
              )
            ) : null}
            <Box
              sx={{
                position: "relative",
                maxWidth: "70%",
                wordBreak: "break-word",
                padding: "10px 14px",
                borderRadius: "16px",
                bgcolor: isSentByUser ? "#031738" : "#FFFFFF",
                boxShadow: "2px 2px 20px 0px #DFDFDF",
                color: isSentByUser ? "white" : "black",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              {msg.content}
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "right",
                  color: isSentByUser
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.7)",
                  mt: 1,
                }}
              >
                {dayjs(msg.createdAt).format("h:mm A")}
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      );
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        ...(!isLargeScreen && { height: "92vh" }),
        marginTop: "0px",
        marginLeft: "0px",
        width: "100%",
      }}
    >
      {/* Sidebar Drawer - Persistent for Large Screens */}
      {/* {isLargeScreen ? (
        <Box
          sx={{
            bgcolor: "white",
            transition: "width 0.3s ease-in-out, box-shadow 0.2s ease-in-out",
            width: expanded ? "260px" : "60px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 2,
            minWidth: expanded ? "260px" : "60px",
            borderRight: "1px solid #e0e0e0",
            height: "calc(100vh - 80px) !important",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          <Button
            onClick={() => setExpanded(!expanded)}
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              alignSelf: expanded ? "flex-end" : "center",
              marginRight: expanded ? "5px" : "0px",
              marginBottom: 2,
              minWidth: "40px",
              height: "40px",
              borderRadius: "50%",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              backgroundColor: "#FFFFFF",
              color: "#201F2F",
              "&:hover": {
                backgroundColor: "#FFFFFF",
                color: "#201F2F",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            {expanded ? <ChevronLeftIcon /> : <ChatIcon />}
          </Button>
          <List sx={{ width: "100%", padding: 0 }}>
            {taskslist.length > 0 ? (
              taskslist.map((task) => (
                <ListItem
                  key={task._id}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedTaskId === task._id ? "#F3F4F6" : "#FFFFFF",
                    borderRadius:
                      selectedTaskId === task._id ? "10px" : "#FFFFFF",
                    color: selectedTaskId === task._id ? "#201F2F" : "#000000",
                    "&:hover": {
                      backgroundColor: "#F3F4F6",
                      color: "#201F2F",
                      borderRadius: "10px",
                      transition: "all 0.2s ease-in-out",
                    },
                    transition: "padding 0.3s ease-in-out",
                    justifyContent: expanded ? "flex-start" : "center",
                    marginTop: "4px",
                    marginBottom: "4px",
                  }}
                  onClick={() => {
                    fetchMessagesForTask(task._id);
                  }}
                >
                  {expanded ? (
                    <Typography
                      variant="body1"
                      sx={{
                        padding: "5px",
                        fontSize: "14px",
                        fontWeight: "300",
                      }}
                    >
                      {task.description}
                    </Typography>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "14px", fontWeight: "300" }}
                      >
                        {task.description.charAt(0).toUpperCase()}
                      </Typography>
                    </Box>
                  )}
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      const otherUserId =
                        user.role === "customer"
                          ? task.employee._id
                          : task.customer._id;
                      navigate(`/videocall/${otherUserId}`);
                    }}
                    sx={{ marginLeft: "auto" }}
                  >
                    <VideoCallIcon />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  padding: "10px",
                  color: "#888",
                  fontStyle: "italic",
                }}
              >
                No tasks assigned
              </Typography>
            )}
          </List>
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={open}
          onClose={handleDrawerToggle}
          sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
        >
          <List>
            {taskslist.length > 0 ? (
              taskslist.map((task) => (
                <ListItem key={task._id} disablePadding>
                  <ListItemButton
                    onClick={() => fetchMessagesForTask(task._id)}
                  >
                    <ListItemText primary={task.description} />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        const otherUserId =
                          user.role === "customer"
                            ? task.employee._id
                            : task.customer._id;
                        navigate(`/videocall/${otherUserId}`);
                      }}
                    >
                      <VideoCallIcon />
                    </IconButton>
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" sx={{ padding: 2 }}>
                No tasks assigned
              </Typography>
            )}
          </List>
        </Drawer>
      )} */}
      {isLargeScreen ? (
        <Box
          sx={{
            bgcolor: "white",
            transition: "width 0.3s ease-in-out, box-shadow 0.2s ease-in-out",
            width: expanded ? "260px" : "60px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 2,
            minWidth: expanded ? "260px" : "60px",
            borderRight: "1px solid #e0e0e0",
            height: "calc(100vh - 80px) !important",
            overflowY: "scroll",
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          <Button
            onClick={() => setExpanded(!expanded)}
            sx={{ marginBottom: 2 }}
          >
            Toggle
          </Button>
          <List sx={{ width: "100%", padding: 0 }}>
            {taskslist.length > 0 ? (
              taskslist.map((task) => (
                <ListItem
                  key={task._id}
                  onClick={() => fetchMessagesForTask(task._id)}
                >
                  <Typography variant="body1">{task.description}</Typography>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      const otherUserId =
                        user.role === "customer"
                          ? task.employee._id
                          : task.customer._id;
                      handleVideoCall(otherUserId);
                    }}
                  >
                    <VideoCallIcon />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2">No tasks assigned</Typography>
            )}
          </List>
        </Box>
      ) : (
        <Drawer anchor="left" open={open} onClose={handleDrawerToggle}>
          <List>
            {taskslist.length > 0 ? (
              taskslist.map((task) => (
                <ListItem key={task._id} disablePadding>
                  <Button onClick={() => fetchMessagesForTask(task._id)}>
                    {task.description}
                  </Button>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      const otherUserId =
                        user.role === "customer"
                          ? task.employee._id
                          : task.customer._id;
                      handleVideoCall(otherUserId);
                    }}
                  >
                    <VideoCallIcon />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2">No tasks assigned</Typography>
            )}
          </List>
        </Drawer>
      )}
      {/* {videoCallUser && (
        <VideoCall otherUserId={videoCallUser} oncloseuser={oncloseuser} />
      )} */}

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* AppBar */}
        {!isLargeScreen ? (
          <Box
            sx={{
              position: "fixed",
              top: "10%",
              right: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              zIndex: 1300,
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                width: 50,
                height: 50,
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.9)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        ) : (
          <></>
        )}

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 64px)",
            overflow: "hidden",
          }}
        >
          {/* Chat Messages */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
            }}
            style={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            {selectedTaskId ? (
              <>
                {renderMessagesWithTimestamps()}
                <div ref={messageEndRef} />
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h5" color="textSecondary">
                  Select a task to view messages
                </Typography>
              </Box>
            )}
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 2,
              borderTop: "1px solid #e0e0e0",
              backgroundColor: "background.paper",
            }}
          >
            <TextField
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              variant="outlined"
              size="small"
              onKeyDown={handleKeyPress}
            />
            <Button variant="outlined" color="" onClick={sendMessage}>
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
