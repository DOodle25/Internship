import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
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
  const {
    tasks,
    users,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    handleAssignTask,
    fetchTasks,
    fetchUsers,
  } = useGlobalContext();
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

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {}, 5000);

    return () => clearInterval(interval);
  }, [editTask]);

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCreate = async () => {
    const result = await handleCreateTask(newTask);
    handleSnackbarOpen(result.message);
    if (result.success) {
      setOpenDialog(false);
      setNewTask({ title: "", description: "", customerId: "" });
    }
  };

  const handleUpdate = async () => {
    const result = await handleUpdateTask(editTask);
    handleSnackbarOpen(result.message);
    if (result.success) {
      setOpenEditDialog(false);
      setEditTask(null);
    }
  };

  const handleDelete = async (taskId) => {
    const result = await handleDeleteTask(taskId);
    handleSnackbarOpen(result.message);
  };

  const handleAssign = async () => {
    const result = await handleAssignTask(
      selectedTask,
      selectedCustomer,
      selectedEmployee
    );
    handleSnackbarOpen(result.message);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "customerName", headerName: "Customer", width: 150 },
    {
      field: "customerEmail",
      headerName: "Customer Email",
      width: 200,
    },
    {
      field: "isEmployeeAssigned",
      headerName: "Employee Assigned",
      width: 150,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "employeeName",
      headerName: "Assigned Employee",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "updatedAt",
      headerName: "Last Updated",
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
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
              onClick={() => handleDelete(params.row.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        {/* Task List */}
        <Grid item xs={12} md={6}>
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
              sx={{
                backgroundColor: "#FFFFFF",
              }}
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
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Employee</InputLabel>
            <Select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              label="Employee"
              sx={{
                backgroundColor: "#FFFFFF",
              }}
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
      <Tooltip title="Create Task">
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAssign}
            style={{ margin: "10px", marginLeft: "0" }}
          >
            Assign Task
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            style={{ margin: "10px", marginLeft: "0" }}
          >
            Create Task
          </Button>
        </>
      </Tooltip>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={tasks.map((t) => ({
            id: t._id,
            title: t.title,
            description: t.description,
            customerName: t.customer?.name || "N/A",
            customerEmail: t.customer?.email || "N/A",
            isEmployeeAssigned: t.isEmployeeAssigned,
            employeeName: t.employee?.name || "Unassigned",
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
          }))}
          columns={columns}
          pageSize={5}
          count={tasks?.length || 0}
          paginationMode="client"
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "0px solid #DFDFDF",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#031738",
              fontSize: "16px",
              fontWeight: "",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#FFFFFF",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#FFFFFF",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "14px",
            },
          }}
        />
      </div>

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
          <Button variant="contained" onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

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
            <Button variant="contained" onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default AssignUserToEmployee;
