const ChatPage = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const messageEndRef = useRef(null);
    const { token, user } = useGlobalContext();
  
    // Function to initialize socket connection with auto-reconnect
    const initializeSocket = () => {
      const newSocket = io("https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net", {
        query: { token },
        reconnection: true,          // Enable automatic reconnection
        reconnectionAttempts: 10,    // Max attempts before giving up
        reconnectionDelay: 2000,     // Time between reconnection attempts
      });
  
      newSocket.on("connect", () => {
        console.log("Socket connected");
      });
  
      newSocket.on("disconnect", (reason) => {
        console.warn("Socket disconnected:", reason);
        if (reason === "io server disconnect") {
          newSocket.connect(); // Manually reconnect if the server disconnects the client
        }
      });
  
      newSocket.on("reconnect_attempt", (attemptNumber) => {
        console.log(`Reconnecting attempt ${attemptNumber}...`);
      });
  
      newSocket.on("receiveMessage", ({ message, sender }) => {
        setMessages((prevMessages) => [...prevMessages, { ...message, sender }]);
      });
  
      setSocket(newSocket);
    };
  
    useEffect(() => {
      initializeSocket();
      return () => socket?.disconnect();
    }, [token]);
  
    useEffect(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    const sendMessage = async () => {
      if (!newMessage.trim()) return;
  
      const messageData = { taskId: selectedTaskId, content: newMessage, senderId: user._id };
  
      if (socket?.connected) {
        socket.emit("sendMessage", messageData);
      } else {
        // Fallback to API if socket is disconnected
        try {
          await axiosInstance.post(`/chat/task/${selectedTaskId}/messages`, messageData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          fetchMessagesForTask(selectedTaskId); // Fetch latest messages
        } catch (error) {
          console.error("Error sending message via API:", error);
        }
      }
  
      setNewMessage("");
    };
  
    const fetchMessagesForTask = async (taskId) => {
      try {
        const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data.messages);
        setSelectedTaskId(taskId);
        if (socket?.connected) {
          socket.emit("joinTaskRoom", taskId, token);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    return (
      <Box>
        <Box>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <Box key={index}>
                <Box>{msg.content}</Box>
              </Box>
            ))
          ) : (
            <Typography>No messages yet</Typography>
          )}
          <div ref={messageEndRef} />
        </Box>
  
        <Box>
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
        </Box>
      </Box>
    );
  };
  