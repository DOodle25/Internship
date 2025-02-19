// // Main application entry point
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connection = require("./db");
// const adminRoutes = require("./routes/admin.routes");
// const authRoutes = require("./routes/auth.routes");
// const statusRoutes = require("./routes/status.routes");
// const profileRoutes = require("./routes/profile.routes");
// const chatRoutes = require("./routes/chat.routes");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Database connection
// connection();

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

// // Root endpoint
// app.get("/", (req, res) => {
//   res.send(
//     "Welcome to the API! Use the /api/cruds endpoint to interact with CRUD operations."
//   );
// });

// // Routes
// app.use("/api/admin", adminRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/status", statusRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/chat", chatRoutes);
// // Start server
// app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

// Main application entry point
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const statusRoutes = require("./routes/status.routes");
const profileRoutes = require("./routes/profile.routes");
const chatRoutes = require("./routes/chat.routes");


const jwt = require("jsonwebtoken");
const Message = require("./models/message.model");
const User = require("./models/user.model").User;
const Task = require("./models/task.model");
const PORT = process.env.PORT || 5000;

const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    // origin: "http://localhost:5173",
    origin: "https://polite-field-09918cc00.4.azurestaticapps.net",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
global.io = io;
// Database connection
connection();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Root endpoint
app.get("/", (req, res) => {
  res.send(
    "Welcome to the API! Use the /api/cruds endpoint to interact with CRUD operations."
  );
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/chat", chatRoutes);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinTaskRoom", (taskId, token) => {
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token invalid" });
    });
    socket.join(taskId);
    console.log(`User joined task room: ${taskId}`);
  });
  // socket.on("sendMessage", async ({ taskId, content, senderId }) => {
  //   try {
  //     if (!content || !taskId) {
  //       throw new Error("Message content and task ID are required");
  //     }

  //     const sender = await User.findById(senderId);
  //     const task = await Task.findById(taskId).populate("customer employee");

  //     if (!task) {
  //       throw new Error("Task not found");
  //     }

  //     if (![task.customer._id.toString(), task.employee._id.toString()].includes(senderId.toString())) {
  //       throw new Error("You are not authorized to send messages for this task");
  //     }

  //     await task.save();

  //     io.to(taskId).emit("receiveMessage", { message, sender });
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // });



  socket.on("sendMessage", async ({ taskId, content, senderId }) => {
    try {
      if (!content || !taskId) {
        throw new Error("Message content and task ID are required");
      }

      const sender = await User.findById(senderId);
      const task = await Task.findById(taskId).populate("customer employee");

      if (!task) {
        throw new Error("Task not found");
      }

      if (![task.customer._id.toString(), task.employee._id.toString()].includes(senderId.toString())) {
        throw new Error("You are not authorized to send messages for this task");
      }

      const message = await Message.create({
        sender: senderId,
        task: taskId,
        content,
      });

      task.messages.push(message._id);
      await task.save();

      io.to(taskId).emit("receiveMessage", { message, sender });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });


  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start server
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
