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

    socket.on("joinTask", (taskId) => {
      socket.join(taskId);
      console.log(`User joined task room: ${taskId}`);
    });

    socket.on("sendMessage", (message) => {
      console.log("New message received:", message);
      io.to(message.taskId).emit("newMessage", message);
    });

    socket.on("leaveTask", (taskId) => {
      socket.leave(taskId);
      console.log(`User left task room: ${taskId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
