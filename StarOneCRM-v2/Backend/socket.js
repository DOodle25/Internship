const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // When a user joins a task room
    socket.on("joinTask", (taskId) => {
      socket.join(taskId);
      console.log(`User joined task room: ${taskId}`);
    });

    // When a user sends a message
    socket.on("sendMessage", (message) => {
      console.log("New message received:", message);
      io.to(message.taskId).emit("newMessage", message); // Send to all in room
    });

    // When a user leaves the task room
    socket.on("leaveTask", (taskId) => {
      socket.leave(taskId);
      console.log(`User left task room: ${taskId}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
