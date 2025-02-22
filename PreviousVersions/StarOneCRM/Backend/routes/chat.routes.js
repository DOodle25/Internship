const express = require("express");
const router = express.Router();
const {
  getAssignedPeople,
  assignCustomerToEmployee,
  unassignCustomerFromEmployee,
  sendMessage,
  getMessagesByTask,
  getAssignedTasks,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/chat.controller");
const { verifyJWT, isAdmin } = require("../utils/middleware");

// Task routes
router.get("/tasks", verifyJWT, getAllTasks);
router.get("/task/:taskId", verifyJWT, getTaskById);
router.post("/task", verifyJWT, isAdmin, createTask);
router.put("/task/:taskId", verifyJWT, isAdmin, updateTask);
router.delete("/task/:taskId", verifyJWT, isAdmin, deleteTask);

// Assignment routes
router.get("/assigned-people", verifyJWT, getAssignedPeople);
router.get("/assigned-tasks", verifyJWT, getAssignedTasks);
router.post("/assign", verifyJWT, isAdmin, assignCustomerToEmployee);
router.post("/unassign", verifyJWT, isAdmin, unassignCustomerFromEmployee);

// Message routes

router.post("/send", verifyJWT, sendMessage); // Send a message
router.get("/task/:taskId/messages", verifyJWT, getMessagesByTask); // Get messag

module.exports = router;
