import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useGlobalContext } from "../../context/GlobalContext";

const AssignUserToEmployee = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    customerId: "",
  });
  const [editTask, setEditTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { token } = useGlobalContext();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/chat/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      handleSnackbarOpen("Failed to fetch tasks");
      setTasks([]);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.data);
      } catch (error) {
        handleSnackbarOpen("Failed to fetch users");
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateTask = async () => {
    try {
      const response = await axiosInstance.post("/chat/task", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleSnackbarOpen("Task created successfully!");
      setTasks([...tasks, response.data.task]);
      setOpenDialog(false);
      setNewTask({ title: "", description: "", customerId: "" });
    } catch (error) {
      handleSnackbarOpen("Failed to create task");
    }
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axiosInstance.put(
        `/chat/task/${editTask._id}`,
        editTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleSnackbarOpen("Task updated successfully!");
      setTasks(
        tasks.map((task) =>
          task._id === editTask._id ? response.data.task : task
        )
      );
      setOpenEditDialog(false);
      setEditTask(null);
    } catch (error) {
      handleSnackbarOpen("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInstance.delete(`/chat/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleSnackbarOpen("Task deleted successfully!");
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      handleSnackbarOpen("Failed to delete task");
    }
  };

  const handleAssign = async () => {
    if (!selectedTask || !selectedCustomer || !selectedEmployee) {
      handleSnackbarOpen("Please select task, customer, and employee.");
      return;
    }
    try {
      await axiosInstance.post(
        "/chat/assign",
        {
          taskId: selectedTask,
          customerId: selectedCustomer,
          employeeId: selectedEmployee,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleSnackbarOpen("Task assigned to employee successfully!");
      fetchTasks();
    } catch (error) {
      handleSnackbarOpen("Failed to assign task.");
    }
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "customerName", headerName: "Customer", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => {
                setEditTask(params.row);
                setOpenEditDialog(true);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="secondary"
              onClick={() => handleDeleteTask(params.row.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Assign Task to Employee
      </Typography>
      <Grid container spacing={3}>
        {/* Task List */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Task</InputLabel>
            <Select
              value={selectedTask}
              onChange={(e) => {
                const task = tasks.find((t) => t._id === e.target.value);
                setSelectedTask(e.target.value);
                setSelectedCustomer(task ? task.customer._id : "");
              }}
              label="Task"
            >
              {tasks
                .filter((task) => task.isEmployeeAssigned === false)
                .map((task) => (
                  <MenuItem key={task._id} value={task._id}>
                    {task.title} - {task.description}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Employee List */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Employee</InputLabel>
            <Select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              label="Employee"
            >
              {users
                .filter((user) => user.role === "employee")
                .map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Assign Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAssign}
        style={{ marginTop: "20px" }}
      >
        Assign Task
      </Button>
      {/* <Paper sx={{ padding: 3, margin: 3 }}> */}
      <Typography variant="h4" mt={4} gutterBottom>
        Manage Tasks
      </Typography>

      <Tooltip title="Create Task">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Create Task
        </Button>
      </Tooltip>

      <div style={{ height: 400, width: "100%", marginTop: 20 }}>
        <DataGrid
          rows={tasks.map((t) => ({
            id: t._id,
            ...t,
            customerName: t.customer?.name || "N/A",
          }))}
          columns={columns}
          pageSize={5}
        />
      </div>

      {/* Create Task Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Customer</InputLabel>
            <Select
              value={newTask.customerId}
              onChange={(e) =>
                setNewTask({ ...newTask, customerId: e.target.value })
              }
            >
              {users
                .filter((user) => user.role === "customer")
                .map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateTask}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Dialog */}
      {editTask && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />
            <TextField
              label="Description"
              fullWidth
              margin="dense"
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => setOpenEditDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdateTask}
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      {/* </Paper> */}
    </>
  );
};

export default AssignUserToEmployee;
