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
//   AppBar,
//   Toolbar,
//   Drawer,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useGlobalContext } from "../../context/GlobalContext";
// import io from "socket.io-client";
// import ChatIcon from "@mui/icons-material/Chat";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import SendIcon from "@mui/icons-material/Send";

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
//         "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net",
//         {
//           query: { token },
//         }
//       );

//       newSocket.on("connect", () => {
//         console.log("Socket connected successfully");
//         if (selectedTaskId) {
//           newSocket.emit("joinTaskRoom", selectedTaskId, token);
//           console.log(`Joined task room: ${selectedTaskId}`);
//         }
//       });

//       newSocket.on("connect_error", (error) => {
//         console.error("Socket connection failed:", error);
//       });

//       socketRef.current = newSocket;

//       return () => {
//         newSocket.close();
//         socketRef.current = null;
//         console.log("Socket disconnected");
//       };
//     };

//     connectSocket();

//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "visible") {
//         console.log("Tab is active, reconnecting socket...");
//         console.log("socketRef:", socketRef.current);
//         if (!socketRef.current) {
//           connectSocket();
//         }
//         console.log("Selected task ID:", selectedTaskIdRef.current);
//         console.log("socketRef:", socketRef.current);
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
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
//       setTaskslist(response.data.tasksAssigned);
//     } catch (error) {
//       console.error("Error fetching assigned tasks:", error);
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
//       console.log(taskId);
//       setSelectedTaskId(taskId);

//       if (socketRef.current) {
//         socketRef.current.emit("joinTaskRoom", taskId, token);
//         console.log(`Joined task room: ${taskId}`);
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAssignedTasks();
//   }, []);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         ...(!isLargeScreen && { height: "85vh" }),
//         marginTop: "0px",
//         marginLeft: "0px",
//         width: "100%",
//       }}
//     >
//       {/* Sidebar Drawer - Persistent for Large Screens */}
//       {isLargeScreen ? (
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
//         {!isLargeScreen ? (
//           <AppBar position="relative" color="primary" sx={{ mt: 2 }}>
//             <Toolbar>
//               {!isLargeScreen && (
//                 <IconButton
//                   color="inherit"
//                   edge="start"
//                   onClick={handleDrawerToggle}
//                 >
//                   <MenuIcon />
//                 </IconButton>
//               )}
//               <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                 Task Messages
//               </Typography>
//             </Toolbar>
//           </AppBar>
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
//               // display: "flex",
//               // flexDirection: "column",
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
//                 {messages.length > 0 ? (
//                   messages.map((msg, index) => {
//                     const isSentByUser = msg.sender.email === userEmail;
//                     return (
//                       <Box
//                         key={index}
//                         sx={{
//                           display: "flex",
//                           justifyContent: isSentByUser
//                             ? "flex-end"
//                             : "flex-start",
//                           my: 1,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             position: "relative",
//                             maxWidth: "70%",
//                             wordBreak: "break-word",
//                             padding: "10px 14px",
//                             borderRadius: "16px",
//                             bgcolor: isSentByUser ? "#201F2F" : "#F3F4F6",
//                             color: isSentByUser ? "white" : "black",
//                             fontSize: "14px",
//                             lineHeight: "1.4",
//                             boxShadow: 0,
//                           }}
//                         >
//                           {msg.content}
//                         </Box>
//                       </Box>
//                     );
//                   })
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
//             <Button variant="outlined" color="" onClick={sendMessage}>
//               <SendIcon />
//             </Button>
//           </Box>
//         </Box>
//       </Box>

//       {/* second */}
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
  AppBar,
  Toolbar,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useGlobalContext } from "../../context/GlobalContext";
import io from "socket.io-client";
import ChatIcon from "@mui/icons-material/Chat";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";

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
  const socketRef = useRef(null);
  const selectedTaskIdRef = useRef(selectedTaskId);

  useEffect(() => {
    selectedTaskIdRef.current = selectedTaskId;
  }, [selectedTaskId]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const connectSocket = () => {
      if (!token || socketRef.current) return;

      const newSocket = io(
        "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net",
        {
          query: { token },
        }
      );

      newSocket.on("connect", () => {
        console.log("Socket connected successfully");
        if (selectedTaskId) {
          newSocket.emit("joinTaskRoom", selectedTaskId, token);
          console.log(`Joined task room: ${selectedTaskId}`);
        }
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection failed:", error);
      });

      socketRef.current = newSocket;

      return () => {
        newSocket.close();
        socketRef.current = null;
        console.log("Socket disconnected");
      };
    };

    connectSocket();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("Tab is active, reconnecting socket...");
        console.log("socketRef:", socketRef.current);
        if (!socketRef.current) {
          connectSocket();
        }
        console.log("Selected task ID:", selectedTaskIdRef.current);
        console.log("socketRef:", socketRef.current);
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
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      setTaskslist(response.data.tasksAssigned);
    } catch (error) {
      console.error("Error fetching assigned tasks:", error);
      navigate("/");
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
      console.log(taskId);
      setSelectedTaskId(taskId);

      if (socketRef.current) {
        socketRef.current.emit("joinTaskRoom", taskId, token);
        console.log(`Joined task room: ${taskId}`);
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
        {!isSentByUser && (
          <Box
            sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "#201F2F",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          mr: 1,
            }}
          >
            {msg.sender.name.charAt(0).toUpperCase()}
          </Box>
        )}
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
          <Typography
            variant="caption"
            sx={{
          display: "block",
          textAlign: "right",
          color: isSentByUser ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
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
        ...(!isLargeScreen && { height: "85vh" }),
        marginTop: "0px",
        marginLeft: "0px",
        width: "100%",
      }}
    >
      {/* Sidebar Drawer - Persistent for Large Screens */}
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
          {/* Chat Messages */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              // display: "flex",
              // flexDirection: "column",
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

      {/* second */}
    </Box>
  );
};

export default ChatPage;