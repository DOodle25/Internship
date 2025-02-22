// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
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
//   AppBar,
//   Toolbar,
//   Drawer,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

// const drawerWidth = 240;

// const ChatPage = () => {
//   const [taskslist, setTaskslist] = useState([]);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [open, setOpen] = useState(false);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const messageEndRef = useRef(null);
//   const userEmail = JSON.parse(localStorage.getItem("user")).email;
//   const isLargeScreen = useMediaQuery("(min-width:960px)");
//   const [expanded, setExpanded] = useState(false);

// const handleDrawerToggle = () => {
//   setOpen(!open);
// };

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const response = await axiosInstance.post(
//         `/chat/send`,
//         { taskId: selectedTaskId, content: newMessage },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessages([...messages, response.data.data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast.error("Failed to send message");
//     }
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
//       setTaskslist(response.data.tasksAssigned);
//       toast.success("Tasks fetched successfully");
//     } catch (error) {
//       console.error("Error fetching assigned tasks:", error);
//       toast.error("Failed to fetch tasks");
//       navigate("/");
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
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       toast.error("Failed to fetch messages for the task");
//     }
//   };

//   useEffect(() => {
//     fetchAssignedTasks();
//   }, []);

//   useEffect(() => {
//     if (selectedTaskId) {
//       const interval = setInterval(() => {
//         fetchMessagesForTask(selectedTaskId);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [selectedTaskId]);

//   return (
//     <Box sx={{ display: "flex", height: "70vh" }}>
//       {/* Sidebar Drawer - Persistent for Large Screens */}
//       {isLargeScreen ? (
//         <Box
//         sx={{
//           height: "100%",
//           bgcolor: "#FFFFFF", // Background color from the theme
//           transition: "width 0.3s ease-in-out, border-radius 0.3s ease-in-out",
//           width: expanded ? "250px" : "50px",
//           overflow: "hidden",
//         //   boxShadow: expanded
//         //     ? "3px 0px 10px hsla(0, 0.00%, 0.00%, 0.10)"
//         //     : "none",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           paddingTop: 2,
//           minWidth: expanded ? "250px" : "50px",
//         //   borderRadius: expanded ? "0 16px 16px 0" : "0 8px 8px 0", // Rounded corners
//         }}
//       >
//         <Button
//           onClick={() => setExpanded(!expanded)}
//           variant="outlined"
//           sx={{
//             marginBottom: 2,
//             backgroundColor: "#000000", // Color from the theme
//             color: "#FFFFFF", // Text color for contrast
//             borderRadius: "50%", // Circular button
//             minWidth: "40px",
//             minHeight: "40px",
//             "&:hover": {
//               backgroundColor: "#000000",
//               opacity: 0.9,
//             },
//           }}
//         >
//           {expanded ? "<" : ">"}
//         </Button>
//         <List sx={{ width: "100%", padding: 0 }}>
//           {taskslist.length > 0 ? (
//             taskslist.map((task) => (
//               <ListItem
//                 key={task._id}
//                 sx={{
//                   cursor: "pointer",
//                   backgroundColor:
//                     selectedTaskId === task._id ? "#000000" : "transparent", // Highlight color
//                   color: selectedTaskId === task._id ? "#FFFFFF" : "#000000", // Text color
//                   "&:hover": {
//                     backgroundColor: "#000000",
//                     color: "#FFFFFF",
//                   },
//                   transition: "padding 0.3s ease-in-out, background-color 0.3s ease-in-out",
//                   padding: expanded ? "5px" : "5px",
//                   justifyContent: expanded ? "flex-start" : "center",
//                   borderRadius: "50px", // Rounded corners for list items
//                   padding: "4px 8px",
//                 //   margin: "4px 8px", // Spacing between items
//                 }}
//                 onClick={() => {
//                   fetchMessagesForTask(task._id);
//                   setExpanded(false);
//                 }}
//               >
//                 <Typography variant="body1" fontWeight="bold">
//                   {expanded
//                     ? task.description
//                     : task.description.charAt(0).toUpperCase()}
//                 </Typography>
//               </ListItem>
//             ))
//           ) : (
//             <Typography variant="body2" sx={{ color: "#000000", textAlign: "center" }}>
//               No tasks assigned
//             </Typography>
//           )}
//         </List>
//       </Box>
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
//       )}

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
//         <AppBar position="relative"
//         // color="primary"
//         sx={{backgroundColor: "#FFFFFF", color: "#000000", boxShadow: "none"}}
//         >
//           <Toolbar>
//             {!isLargeScreen && (
//               <IconButton
//                 color="inherit"
//                 edge="start"
//                 onClick={handleDrawerToggle}
//               >
//                 <MenuIcon />
//               </IconButton>
//             )}
//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               Task Messages
//             </Typography>
//           </Toolbar>
//         </AppBar>

//         <Box
//           sx={{
//             flexGrow: 1,
//             display: "flex",
//             flexDirection: "column",
//             height: "calc(100vh - 64px)", // Adjust height based on AppBar height
//             overflow: "hidden",
//           }}
//         >
//           {/* Chat Messages */}
//           <Box
//             sx={{
//               flexGrow: 1,
//               overflowY: "auto",
//               p: 2,
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             {selectedTaskId ? (
//               <>
//                 {messages.length > 0 ? (
//                   messages.map((msg, index) => (
//                     <Box
//                       key={index}
//                       sx={{
//                         textAlign:
//                           msg.sender.email === userEmail ? "right" : "left",
//                         my: 1,
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           display: "inline-block",
//                           padding: 1,
//                           borderRadius: 1,
//                           bgcolor:
//                             msg.sender.email === userEmail
//                               ? "primary.main"
//                               : "grey.300",
//                           color:
//                             msg.sender.email === userEmail ? "white" : "black",
//                         }}
//                       >
//                         {msg.content}
//                       </Typography>
//                     </Box>
//                   ))
//                 ) : (
//                   <Typography>No messages yet</Typography>
//                 )}
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
//             <Button variant="contained" color="primary" onClick={sendMessage}>
//               Send
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ChatPage;

// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
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
//   AppBar,
//   Toolbar,
//   Drawer,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useGlobalContext } from "../../context/GlobalContext";

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
//   const [expanded, setExpanded] = useState(false);

//   const handleDrawerToggle = () => {
//     setOpen(!open);
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const response = await axiosInstance.post(
//         `/chat/send`,
//         { taskId: selectedTaskId, content: newMessage },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessages([...messages, response.data.data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast.error("Failed to send message");
//     }
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
//       setTaskslist(response.data.tasksAssigned);
//       toast.success("Tasks fetched successfully");
//     } catch (error) {
//       console.error("Error fetching assigned tasks:", error);
//       toast.error("Failed to fetch tasks");
//       navigate("/");
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
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       toast.error("Failed to fetch messages for the task");
//     }
//   };

//   useEffect(() => {
//     fetchAssignedTasks();
//   }, []);

//   useEffect(() => {
//     if (selectedTaskId) {
//       const interval = setInterval(() => {
//         fetchMessagesForTask(selectedTaskId);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [selectedTaskId]);

//   return (
//     <Box sx={{ display: "flex", height: "70vh", margin:"20px" }}>
//       {/* Sidebar Drawer - Persistent for Large Screens */}
//       {isLargeScreen ? (
//         <Box
//           sx={{
//             height: "100%",
//             bgcolor: "white",
//             transition: "width 0.3s ease-in-out",
//             width: expanded ? "250px" : "50px",
//             overflow: "hidden",
//             boxShadow: expanded
//               ? "3px 0px 10px hsla(0, 0.00%, 0.00%, 0.10)"
//               : "none",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             paddingTop: 2,
//             minWidth: expanded ? "250px" : "50px",
//           }}
//         >
//           <Button
//             onClick={() => setExpanded(!expanded)}
//             variant="outlined"
//             sx={{ marginBottom: 2 }}
//           >
//             {expanded ? "<" : ">"}
//           </Button>
//           <List sx={{ width: "100%", padding: 0 }}>
//             {taskslist.length > 0 ? (
//               taskslist.map((task) => (
//                 <ListItem
//                   key={task._id}
//                   sx={{
//                     cursor: "pointer",
//                     backgroundColor:
//                       selectedTaskId === task._id ? "#1976d2" : "transparent",
//                     color: selectedTaskId === task._id ? "white" : "inherit",
//                     "&:hover": { backgroundColor: "#1976d2", color: "white" },
//                     transition: "padding 0.3s ease-in-out",
//                     padding: expanded ? "10px" : "5px",
//                     justifyContent: expanded ? "flex-start" : "center",
//                   }}
//                   onClick={() => {
//                     fetchMessagesForTask(task._id);
//                     setExpanded(false);
//                   }}
//                 >
//                   <Typography variant="body1" fontWeight="bold">
//                     {expanded
//                       ? task.description
//                       : task.description.charAt(0).toUpperCase()}
//                   </Typography>
//                 </ListItem>
//               ))
//             ) : (
//               <Typography variant="body2">No tasks assigned</Typography>
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
//       )}

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
//         <AppBar position="relative" color="primary">
//           <Toolbar>
//             {!isLargeScreen && (
//               <IconButton
//                 color="inherit"
//                 edge="start"
//                 onClick={handleDrawerToggle}
//               >
//                 <MenuIcon />
//               </IconButton>
//             )}
//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               Task Messages
//             </Typography>
//           </Toolbar>
//         </AppBar>

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
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             {selectedTaskId ? (
//               <>
//                 {messages.length > 0 ? (
//                   messages.map((msg, index) => (
//                     <Box
//                       key={index}
//                       sx={{
//                         textAlign:
//                           msg.sender.email === userEmail ? "right" : "left",
//                         my: 1,
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           display: "inline-block",
//                           padding: 1,
//                           borderRadius: 1,
//                           bgcolor:
//                             msg.sender.email === userEmail
//                               ? "primary.main"
//                               : "grey.300",
//                           color:
//                             msg.sender.email === userEmail ? "white" : "black",
//                         }}
//                       >
//                         {msg.content}
//                       </Typography>
//                     </Box>
//                   ))
//                 ) : (
//                   <Typography>No messages yet</Typography>
//                 )}
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
//             <Button variant="contained" color="primary" onClick={sendMessage}>
//               Send
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// // export default ChatPage;
// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { io } from "socket.io-client";
// import {
//   Button,
//   Box,
//   List,
//   ListItem,
//   Typography,
//   TextField,
//   IconButton,
//   AppBar,
//   Toolbar,
//   Drawer,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useGlobalContext } from "../../context/GlobalContext";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket", "polling"],
// }); // Change to your server URL

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

//   useEffect(() => {
//     fetchAssignedTasks();
//   }, []);

//   useEffect(() => {
//     if (selectedTaskId) {
//       fetchMessagesForTask(selectedTaskId);
//     return () => {
//       socket.emit("leaveTask", selectedTaskId);
//     };
//   }}, [selectedTaskId]);

//   useEffect(() => {
//     socket.on("newMessage", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });
//     return () => {
//       socket.off("newMessage");
//     };
//   }, []);

//   const fetchAssignedTasks = async () => {
//     try {
//       const response = await axiosInstance.get("/chat/assigned-tasks/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTaskslist(response.data.tasksAssigned);
//     } catch (error) {
//       toast.error("Failed to fetch tasks");
//       navigate("/");
//     }
//   };

//   const fetchMessagesForTask = async (taskId) => {
//     try {
//       const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessages(response.data.messages);
//     } catch (error) {
//       toast.error("Failed to fetch messages for the task");
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       taskId: selectedTaskId,
//       sender: { email: userEmail },
//       content: newMessage,
//     };

//     try {
//       const response = await axiosInstance.post(
//         `/chat/send`,
//         messageData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       socket.emit("sendMessage", response.data.data);
//       setMessages([...messages, response.data.data]);
//       setNewMessage("");
//       messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast.error("Failed to send message");
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", height: "70vh", margin: "20px" }}>
//       <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
//         <List>
//           {taskslist.map((task) => (
//             <ListItem key={task._id} button onClick={() => setSelectedTaskId(task._id)}>
//               <Typography>{task.description}</Typography>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100%" }}>
//         <AppBar position="relative">
//           <Toolbar>
//             <IconButton color="inherit" edge="start" onClick={() => setOpen(true)}>
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6">Task Messages</Typography>
//           </Toolbar>
//         </AppBar>
//         <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
//           {messages.map((msg, index) => (
//             <Box key={index} sx={{ textAlign: msg.sender.email === userEmail ? "right" : "left" }}>
//               <Typography sx={{ bgcolor: msg.sender.email === userEmail ? "primary.main" : "grey.300", color: "white", p: 1 }}>{msg.content}</Typography>
//             </Box>
//           ))}
//           <div ref={messageEndRef} />
//         </Box>
//         <Box sx={{ display: "flex", p: 2 }}>
//           <TextField fullWidth value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
//           <Button onClick={sendMessage}>Send</Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ChatPage;

// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { io } from "socket.io-client";
// import {
//   Button,
//   Box,
//   List,
//   ListItem,
//   Typography,
//   TextField,
//   IconButton,
//   AppBar,
//   Toolbar,
//   Drawer,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useGlobalContext } from "../../context/GlobalContext";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket", "polling"],
// }); // Change to your server URL

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

//   // Fetch assigned tasks on component mount
//   useEffect(() => {
//     fetchAssignedTasks();
//   }, []);

//   // Fetch messages when a task is selected
//   useEffect(() => {
//     if (selectedTaskId) {
//       fetchMessagesForTask(selectedTaskId);
//       socket.emit("joinTask", selectedTaskId); // Join the selected task's chat room

//       return () => {
//         socket.emit("leaveTask", selectedTaskId);
//       };
//     }
//   }, [selectedTaskId]);

//   // Listen for incoming messages in real-time
//   useEffect(() => {
//     socket.on("newMessage", (message) => {
//       if (message.taskId === selectedTaskId) {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       }
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, [selectedTaskId]);

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const fetchAssignedTasks = async () => {
//     try {
//       const response = await axiosInstance.get("/chat/assigned-tasks/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTaskslist(response.data.tasksAssigned);
//     } catch (error) {
//       toast.error("Failed to fetch tasks");
//       navigate("/");
//     }
//   };

//   const fetchMessagesForTask = async (taskId) => {
//     try {
//       const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessages(response.data.messages);
//     } catch (error) {
//       toast.error("Failed to fetch messages for the task");
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       taskId: selectedTaskId,
//       sender: { email: userEmail },
//       content: newMessage,
//     };

//     try {
//       // const response = await axiosInstance.post(
//       //   `/chat/send`,
//       //   messageData,
//       //   {
//       //     headers: { Authorization: `Bearer ${token}` },
//       //   }
//       // );

//       // Send message to socket
//       socket.emit("sendMessage", response.data.data);

//       // Add the message instantly to UI
//       setMessages((prevMessages) => [...prevMessages, response.data.data]);

//       // Clear input field
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast.error("Failed to send message");
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", height: "70vh", margin: "20px" }}>
//       {/* Drawer for tasks */}
//       <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
//         <List>
//           {taskslist.map((task) => (
//             <ListItem
//               key={task._id}
//               button
//               onClick={() => {
//                 setSelectedTaskId(task._id);
//                 setMessages([]); // Reset messages when switching tasks
//               }}
//             >
//               <Typography>{task.description}</Typography>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100%" }}>
//         {/* Top Bar */}
//         <AppBar position="relative">
//           <Toolbar>
//             <IconButton color="inherit" edge="start" onClick={() => setOpen(true)}>
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6">Task Messages</Typography>
//           </Toolbar>
//         </AppBar>

//         {/* Chat Messages */}
//         <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto", display: "flex", flexDirection: "column" }}>
//           {messages.map((msg, index) => (
//             <Box
//               key={index}
//               sx={{
//                 display: "flex",
//                 justifyContent: msg.sender.email === userEmail ? "flex-end" : "flex-start",
//                 mb: 1,
//               }}
//             >
//               <Typography
//                 sx={{
//                   bgcolor: msg.sender.email === userEmail ? "primary.main" : "grey.300",
//                   color: "white",
//                   p: 1,
//                   borderRadius: 2,
//                   maxWidth: "70%",
//                 }}
//               >
//                 {msg.content}
//               </Typography>
//             </Box>
//           ))}
//           <div ref={messageEndRef} />
//         </Box>

//         {/* Message Input */}
//         <Box sx={{ display: "flex", p: 2 }}>
//           <TextField
//             fullWidth
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <Button onClick={sendMessage}>Send</Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ChatPage;
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  AppBar,
  Toolbar,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useGlobalContext } from "../../context/GlobalContext";
import io from "socket.io-client";
import ChatIcon from "@mui/icons-material/Chat";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SendIcon from "@mui/icons-material/Send";

const drawerWidth = 240;

const ChatPage = () => {
  const { token, user } = useGlobalContext();
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
  const [socket, setSocket] = useState(null);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const initializeSocket = () => {
    const newSocket = io(
      "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net",
      {
        query: { token },
      }
    );
    setSocket(newSocket);

    return () => newSocket.close();
  };

  useEffect(() => {
    const cleanup = initializeSocket();
    return cleanup;
  }, [token]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", ({ message, sender }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...message, sender },
        ]);
      });
    }
  }, [socket]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const handleTyping = () => {
    socket.emit("typing", { sender: userEmail, taskId: selectedTaskId });
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      taskId: selectedTaskId,
      content: newMessage,
      senderId: user._id,
    };

    socket.emit("sendMessage", messageData);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
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
      // localStorage.setItem("localselectedTaskId", taskId);
      if (socket) {
        socket.emit("joinTaskRoom", taskId, token);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages for the task");
    }
  };

  const fetchAssignedTasks = async () => {
    try {
      const response = await axiosInstance.get("/chat/assigned-tasks/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTaskslist(response.data.tasksAssigned);
      toast.success("Tasks fetched successfully");

      const localTaskId = localStorage.getItem("localselectedTaskId");
      if (localTaskId) {
        try {
            await fetchMessagesForTask(localTaskId);
        } catch (error) {
          localStorage.removeItem("localselectedTaskId");
        }
      }
    } catch (error) {
      console.error("Error fetching assigned tasks:", error);
      toast.error("Failed to fetch tasks");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchAssignedTasks();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        window.location.reload();
        initializeSocket();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        ...(!isLargeScreen && { height: "85vh" }),
        marginTop: "0px",
        marginLeft: "0px",
        width: "100%",
      }}
    >
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
      )}

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {!isLargeScreen ? (
          <AppBar position="relative" color="primary" sx={{ mt: 2 }}>
            <Toolbar>
              {!isLargeScreen && (
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Task Messages
              </Typography>
            </Toolbar>
          </AppBar>
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
                {messages.length > 0 ? (
                  messages.map((msg, index) => {
                    const isSentByUser = msg.sender.email === userEmail;
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: isSentByUser
                            ? "flex-end"
                            : "flex-start",
                          my: 1,
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            maxWidth: "70%",
                            wordBreak: "break-word",
                            padding: "10px 14px",
                            borderRadius: "16px",
                            bgcolor: isSentByUser ? "#201F2F" : "#F3F4F6",
                            color: isSentByUser ? "white" : "black",
                            fontSize: "14px",
                            lineHeight: "1.4",
                            boxShadow: 0,
                          }}
                        >
                          {msg.content}
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Typography>No messages yet</Typography>
                )}

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
              onKeyUp={handleTyping}
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
