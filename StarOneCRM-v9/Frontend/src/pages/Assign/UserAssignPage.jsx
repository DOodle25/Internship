import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
  Snackbar,
  Paper,
  Box,
  Typography,
  Avatar,
  Chip,
  Fade,
  Grow,
  Zoom,
  Divider,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContentText,
  Collapse,
  Badge,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  Assignment,
  Person,
  Email,
  CheckCircle,
  Cancel,
  Search,
  Clear,
  Info,
  Close,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useGlobalContext } from "../../context/GlobalContext";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Styled components with enhanced styling
const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[0],
  transition: "all 0.3s ease",
  margin: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

const TaskList = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.grey[50],
  minHeight: 400,
  maxHeight: 'calc(100vh - 300px)',
  overflowY: 'auto',
  transition: "all 0.3s ease",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    minHeight: 200,
    maxHeight: 300,
  },
}));

const EmployeeList = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.grey[50],
  minHeight: 400,
  maxHeight: 'calc(100vh - 300px)',
  overflowY: 'auto',
  transition: "all 0.3s ease",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    minHeight: 200,
    maxHeight: 300,
  },
}));

const TaskItem = styled(Paper)(({ theme, isdragging }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: 8,
  backgroundColor:
    isdragging === "true"
      ? theme.palette.grey[100]
      : theme.palette.common.white,
  boxShadow: theme.shadows[1],
  cursor: "grab",
  transition: "all 0.2s ease",
  "&:hover": {
    // backgroundColor: theme.palette.action.hover,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[3],
  },
  // borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

const EmployeeItem = styled(Paper)(({ theme, isdragging }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: 8,
  backgroundColor:
    isdragging === "true"
      // ? theme.palette.secondary.light
      ? theme.palette.grey[100]
      : theme.palette.common.white,
  boxShadow: theme.shadows[1],
  cursor: "grab",
  transition: "all 0.2s ease",
  "&:hover": {
    // backgroundColor: theme.palette.action.hover,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[3],
  },
  borderLeft: `4px solid ${theme.palette.secondary.main}`,
}));

const MAX_VISIBLE_TASKS = 5; // Maximum tasks to show before collapsing

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
  const [taskSearch, setTaskSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [assignments, setAssignments] = useState({});
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState({});
  const [viewTask, setViewTask] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [expandedEmployees, setExpandedEmployees] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  useEffect(() => {
    const initialAssignments = {};
    tasks.forEach((task) => {
      if (task.employee?._id) {
        initialAssignments[task._id] = task.employee._id;
      }
    });
    setAssignments(initialAssignments);
  }, [tasks]);

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
      fetchTasks();
    }
  };

  const handleUpdate = async () => {
    if (!editTask || !editTask._id) {
      handleSnackbarOpen("Invalid task data");
      return;
    }

    try {
      const result = await handleUpdateTask({
        ...editTask,
        id: editTask._id,
      });
      handleSnackbarOpen(result.message);
      if (result.success) {
        setOpenEditDialog(false);
        setEditTask(null);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
      handleSnackbarOpen(
        error.response?.data?.message || "Error updating task"
      );
    }
  };

  const handleDelete = async (taskId) => {
    const result = await handleDeleteTask(taskId);
    handleSnackbarOpen(result.message);
    if (result.success) {
      fetchTasks();
    }
  };

  const handleViewTask = (task) => {
    setViewTask(task);
    setOpenViewDialog(true);
  };

  const toggleEmployeeExpand = (employeeId) => {
    setExpandedEmployees(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }));
  };

  // const filteredTasks = tasks.filter((task) => {
  //   const matchesSearch =
  //     task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
  //     task.description.toLowerCase().includes(taskSearch.toLowerCase());
  //   const isUnassigned =
  //     !task.employee?._id && !Object.values(assignments).includes(task._id);

  //   return matchesSearch && isUnassigned;
  // });

  const filteredTasks = tasks.filter((task) => {
  const matchesSearch =
    task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
    task.description.toLowerCase().includes(taskSearch.toLowerCase());
  
  // Include tasks that are either:
  // 1. Originally unassigned, or
  // 2. Have been moved back to unassigned (null in assignments)
  const isUnassigned = 
    (!task.employee?._id && !assignments[task._id]) || 
    assignments[task._id] === null;

  return matchesSearch && isUnassigned;
});

  const filteredEmployees = users.filter((user) => {
    return (
      user.role === "employee" &&
      user.name.toLowerCase().includes(employeeSearch.toLowerCase())
    );
  });

  const onDragEnd = useCallback((result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    setChanges((prev) => {
      const newChanges = { ...prev };
      if (destination.droppableId.startsWith("employee-")) {
        const employeeId = destination.droppableId.replace("employee-", "");
        newChanges[draggableId] = employeeId;
      }
      if (destination.droppableId === "tasks") {
        newChanges[draggableId] = null;
      }

      return newChanges;
    });
    setAssignments((prev) => {
      const newAssignments = { ...prev };
      if (destination.droppableId.startsWith("employee-")) {
        const employeeId = destination.droppableId.replace("employee-", "");
        newAssignments[draggableId] = employeeId;
      }
      if (destination.droppableId === "tasks") {
        delete newAssignments[draggableId];
      }

      return newAssignments;
    });
  }, []);

  const saveAssignments = async () => {
    if (Object.keys(changes).length === 0) {
      handleSnackbarOpen("No changes to save");
      return;
    }

    setLoading(true);
    try {
      const results = [];
      for (const [taskId, employeeId] of Object.entries(changes)) {
        try {
          if (!taskId || !isValidObjectId(taskId)) {
            console.error(`Invalid task ID: ${taskId}`);
            continue;
          }
          const task = tasks.find((t) => t._id === taskId);
          if (!task) {
            console.error(`Task not found: ${taskId}`);
            continue;
          }
          const result = await handleAssignTask(
            taskId,
            task.customer?._id || null,
            employeeId
          );

          results.push({
            taskId,
            success: true,
            message: result.message,
          });
        } catch (error) {
          console.error(`Error assigning task ${taskId}:`, error);
          results.push({
            taskId,
            success: false,
            message:
              error.response?.data?.message ||
              `Failed to assign task ${taskId}`,
          });
        }
      }
      const successCount = results.filter((r) => r.success).length;
      const totalChanges = Object.keys(changes).length;

      if (successCount === totalChanges) {
        handleSnackbarOpen(
          `All ${successCount} assignments saved successfully`
        );
      } else {
        handleSnackbarOpen(
          `${successCount} of ${totalChanges} changes saved. ` +
            `${totalChanges - successCount} failed.`
        );
      }
      fetchTasks();
      setChanges({});
    } catch (error) {
      console.error("Error in assignment process:", error);
      handleSnackbarOpen("Error during assignment process");
    } finally {
      setLoading(false);
    }
  };

  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  // const clearAssignments = () => {
  //   setChanges({});
  //   fetchTasks().then(() => {
  //     const initialAssignments = {};
  //     tasks.forEach((task) => {
  //       if (task.employee?._id) {
  //         initialAssignments[task._id] = task.employee._id;
  //       }
  //     });
  //     setAssignments(initialAssignments);

  //   });
  // };

  const clearAssignments = () => {
  setChanges({});
  const initialAssignments = {};
  tasks.forEach((task) => {
    if (task.employee?._id) {
      initialAssignments[task._id] = task.employee._id;
    }
  });
  setAssignments(initialAssignments);
};

  const getAssignedTasksForEmployee = (employeeId) => {
    return tasks
      .filter((task) => {
        const originalAssignment = task.employee?._id === employeeId;
        const pendingAssignment = assignments[task._id] === employeeId;
        return (
          (originalAssignment || pendingAssignment) &&
          (!assignments[task._id] || assignments[task._id] === employeeId)
        );
      })
      .sort((a, b) => {
        const aChanged = changes[a._id] !== undefined;
        const bChanged = changes[b._id] !== undefined;
        return bChanged - aChanged;
      });
  };

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ p: isMobile ? 1 : 1 }}>
        <Grow in={true} timeout={600}>
          <Container elevation={0}>
            {/* <Typography
              variant="h4"
              gutterBottom
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: theme.palette.primary.dark,
                textAlign: 'center',
                fontSize: isMobile ? '1.8rem' : '2.4rem'
              }}
            >
              Task Assignment Board
            </Typography> */}

            {/* Search and Filter Section */}
            <Box sx={{ 
              display: "flex", 
              gap: 2, 
              mb: 3,
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <TextField
                label="Search Tasks"
                variant="outlined"
                fullWidth
                value={taskSearch}
                onChange={(e) => setTaskSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Search sx={{ color: "action.active", mr: 1 }} />
                  ),
                  endAdornment: taskSearch && (
                    <IconButton onClick={() => setTaskSearch("")}>
                      <Clear fontSize="small" />
                    </IconButton>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
              <TextField
                label="Search Employees"
                variant="outlined"
                fullWidth
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Search sx={{ color: "action.active", mr: 1 }} />
                  ),
                  endAdornment: employeeSearch && (
                    <IconButton onClick={() => setEmployeeSearch("")}>
                      <Clear fontSize="small" />
                    </IconButton>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                mb: 3, 
                flexWrap: "wrap",
                gap: 2
              }}
            >
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Zoom in={true} style={{ transitionDelay: "100ms" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => setOpenDialog(true)}
                    sx={{ 
                      borderRadius: '12px',
                      px: 3,
                      py: 1,
                      textTransform: 'capitalize',
                      fontWeight: 600
                    }}
                  >
                    Create Task
                  </Button>
                </Zoom>
                <Zoom in={true} style={{ transitionDelay: "150ms" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={clearAssignments}
                    disabled={Object.keys(changes).length === 0}
                    sx={{ 
                      borderRadius: '12px',
                      px: 3,
                      py: 1,
                      textTransform: 'capitalize',
                      fontWeight: 600
                    }}
                  >
                    Discard Changes
                  </Button>
                </Zoom>
              </Box>
              <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={saveAssignments}
                  disabled={loading || Object.keys(changes).length === 0}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <CheckCircle />
                    )
                  }
                  sx={{ 
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    mt: { xs: 0, sm: 0 }
                  }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </Zoom>
            </Box>

            {/* Drag and Drop Board */}
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid container spacing={3}>
                {/* Tasks Column */}
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Assignment sx={{ mr: 1 }} />
                    Available Tasks ({filteredTasks.length})
                  </Typography>
                  <Droppable droppableId="tasks">
                    {(provided) => (
                      <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {filteredTasks.length === 0 ? (
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            height: '100%',
                            textAlign: 'center',
                            p: 2
                          }}>
                            <Info sx={{ 
                              fontSize: 48, 
                              color: theme.palette.text.disabled,
                              mb: 1
                            }} />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              No tasks available. Create a new task to get started.
                            </Typography>
                          </Box>
                        ) : (
                          filteredTasks.map((task, index) => (
                            <Draggable
                              key={task._id}
                              draggableId={task._id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <TaskItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  isdragging={snapshot.isDragging.toString()}
                                  elevation={snapshot.isDragging ? 6 : 2}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box sx={{ flex: 1 }}>
                                      <Typography
                                        variant="subtitle1"
                                        sx={{ 
                                          fontWeight: 600,
                                          color: theme.palette.primary.dark
                                        }}
                                      >
                                        {task.title}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 0.5 }}
                                      >
                                        {task.description.substring(0, 60)}...
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        sx={{ 
                                          mt: 1,
                                          color: theme.palette.text.secondary,
                                          fontSize: '0.7rem'
                                        }}
                                      >
                                        Created:{" "}
                                        {moment(task.createdAt).format(
                                          "MMM D, YYYY"
                                        )}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ 
                                      display: "flex", 
                                      gap: 1, 
                                      flexDirection: isMobile ? "column" : "row",
                                      alignItems: 'flex-start'
                                    }}>
                                      <Tooltip title="View Details" arrow>
                                        <IconButton
                                          size="small"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleViewTask(task);
                                          }}
                                          sx={{
                                            backgroundColor: theme.palette.grey[100],
                                            '&:hover': {
                                              backgroundColor: theme.palette.grey[300],
                                            }
                                          }}
                                        >
                                          <Info fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Edit" arrow>
                                        <IconButton
                                          size="small"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setEditTask(task);
                                            setOpenEditDialog(true);
                                          }}
                                          sx={{
                                            backgroundColor: theme.palette.grey[100],
                                            '&:hover': {
                                              backgroundColor: theme.palette.grey[300],
                                            }
                                          }}
                                        >
                                          <Edit fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Delete" arrow>
                                        <IconButton
                                          size="small"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(task._id);
                                          }}
                                          sx={{
                                            backgroundColor: theme.palette.error.light,
                                            color: theme.palette.error.contrastText,
                                            '&:hover': {
                                              backgroundColor: theme.palette.error.main,
                                            }
                                          }}
                                        >
                                          <Delete fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>
                                </TaskItem>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </TaskList>
                    )}
                  </Droppable>
                </Grid>

                {/* Employees Columns */}
                {filteredEmployees.map((employee) => {
                  const assignedTasks = getAssignedTasksForEmployee(employee._id);
                  const taskCount = assignedTasks.length;
                  const isExpanded = expandedEmployees[employee._id] || false;
                  const showExpandButton = taskCount > MAX_VISIBLE_TASKS;
                  const visibleTasks = isExpanded 
                    ? assignedTasks 
                    : assignedTasks.slice(0, MAX_VISIBLE_TASKS);

                  return (
                    <Grid item xs={12} md={4} key={employee._id}>
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: 'space-between',
                        mb: 2
                      }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <Box sx={{
                                backgroundColor: taskCount > 5 ? "#000000" : "#0A2968",
                                color: theme.palette.common.white,
                                borderRadius: '50%',
                                width: 24,
                                height: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 600
                              }}>
                                {taskCount}
                              </Box>
                            }
                          >
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                mr: 2,
                                bgcolor: "primary.main",
                                boxShadow: theme.shadows[2]
                              }}
                              src={employee.profileImage}
                            >
                              {employee.name.charAt(0)}
                            </Avatar>
                          </Badge>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {employee.name}
                          </Typography>
                        </Box>
                        {showExpandButton && (
                          <IconButton 
                            size="small" 
                            onClick={() => toggleEmployeeExpand(employee._id)}
                            sx={{
                              ml: 1,
                              backgroundColor: theme.palette.grey[200],
                              '&:hover': {
                                backgroundColor: theme.palette.grey[300],
                              }
                            }}
                          >
                            {isExpanded ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        )}
                      </Box>
                      <Droppable droppableId={`employee-${employee._id}`}>
                        {(provided) => (
                          <EmployeeList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {taskCount === 0 ? (
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                height: '100px',
                                textAlign: 'center'
                              }}>
                                <Person sx={{ 
                                  fontSize: 48, 
                                  color: theme.palette.text.disabled,
                                  mb: 1
                                }} />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  No tasks assigned. Drag tasks here.
                                </Typography>
                              </Box>
                            ) : (
                              <>
                                {visibleTasks.map((task, index) => (
                                  <Draggable
                                    key={task._id}
                                    draggableId={task._id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      const isChanged =
                                        changes[task._id] !== undefined;
                                      return (
                                        <EmployeeItem
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          isdragging={snapshot.isDragging.toString()}
                                          elevation={snapshot.isDragging ? 6 : 2}
                                          sx={{
                                            borderLeft: isChanged
                                              ? "4px solid"
                                              : "none",
                                            borderColor: isChanged
                                              // ? theme.palette.warning.main
                                              ? theme.palette.warning.main
                                              : "transparent",
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <Box sx={{ flex: 1 }}>
                                              <Typography
                                                variant="subtitle1"
                                                sx={{ 
                                                  fontWeight: 600,
                                                  color: theme.palette.secondary.dark
                                                }}
                                              >
                                                {task.title}
                                              </Typography>
                                              <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mt: 0.5 }}
                                              >
                                                {task.description.substring(0, 60)}
                                                ...
                                              </Typography>
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  mt: 1,
                                                }}
                                              >
                                                <Chip
                                                  label={
                                                    isChanged
                                                      ? "Pending Save"
                                                      : "Assigned"
                                                  }
                                                  size="small"
                                                  color={
                                                    isChanged
                                                      ? "warning"
                                                      : "success"
                                                  }
                                                  variant="outlined"
                                                  sx={{
                                                    fontWeight: 500,
                                                    fontSize: '0.7rem'
                                                  }}
                                                />
                                                {isChanged && (
                                                  <Typography
                                                    variant="caption"
                                                    color="warning.main"
                                                    sx={{ ml: 1, fontWeight: 500 }}
                                                  >
                                                    (Changed)
                                                  </Typography>
                                                )}
                                              </Box>
                                            </Box>
                                            <Box sx={{ 
                                              display: "flex", 
                                              gap: 1, 
                                              flexDirection: isMobile ? "column" : "row",
                                              alignItems: 'flex-start'
                                            }}>
                                              <Tooltip title="View Details" arrow>
                                                <IconButton
                                                  size="small"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewTask(task);
                                                  }}
                                                  sx={{
                                                    backgroundColor: theme.palette.grey[100],
                                                    '&:hover': {
                                                      backgroundColor: theme.palette.grey[300],
                                                    }
                                                  }}
                                                >
                                                  <Info fontSize="small" />
                                                </IconButton>
                                              </Tooltip>
                                              <Tooltip title="Edit" arrow>
                                                <IconButton
                                                  size="small"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditTask(task);
                                                    setOpenEditDialog(true);
                                                  }}
                                                  sx={{
                                                    backgroundColor: theme.palette.grey[100],
                                                    '&:hover': {
                                                      backgroundColor: theme.palette.grey[300],
                                                    }
                                                  }}
                                                >
                                                  <Edit fontSize="small" />
                                                </IconButton>
                                              </Tooltip>
                                              <Tooltip title="Delete" arrow>
                                                <IconButton
                                                  size="small"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(task._id);
                                                  }}
                                                  sx={{
                                                    // backgroundColor: theme.palette.error.light,
                                                    backgroundColor: theme.palette.grey[100],
                                                    // color: theme.palette.error.contrastText,
                                                    color: theme.palette.black,
                                                    '&:hover': {
                                                      backgroundColor: theme.palette.error.main,
                                                      color: theme.palette.error.contrastText,
                                                    }
                                                  }}
                                                >
                                                  <Delete fontSize="small" />
                                                </IconButton>
                                              </Tooltip>
                                            </Box>
                                          </Box>
                                        </EmployeeItem>
                                      );
                                    }}
                                  </Draggable>
                                ))}
                                {showExpandButton && (
                                  <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    mt: 1
                                  }}>
                                    <Button
                                      size="small"
                                      onClick={() => toggleEmployeeExpand(employee._id)}
                                      endIcon={isExpanded ? <ExpandLess /> : <ExpandMore />}
                                      sx={{
                                        textTransform: 'none',
                                        color: theme.palette.text.secondary
                                      }}
                                    >
                                      {isExpanded ? 'Show Less' : `Show All (${taskCount})`}
                                    </Button>
                                  </Box>
                                )}
                              </>
                            )}
                            {provided.placeholder}
                          </EmployeeList>
                        )}
                      </Droppable>
                    </Grid>
                  );
                })}
              </Grid>
            </DragDropContext>
          </Container>
        </Grow>

        {/* Create Task Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              width: { xs: "90%", sm: "80%", md: "600px" },
              maxWidth: "100%",
              mx: "auto",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              backgroundImage: 'none',
              border: `1px solid ${theme.palette.divider}`
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
              // color: "primary.main",
              pt: 3,
              pb: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            }}
          >
            Create New Task
            <Typography variant="body2" sx={{ 
              fontWeight: 400,
              fontSize: '0.9rem',
              color: theme.palette.primary.contrastText,
              opacity: 0.8,
              mt: 0.5
            }}>
              Fill in the details to create a new task
            </Typography>
          </DialogTitle>

          <DialogContent sx={{ py: 3, px: 3 }}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              variant="outlined"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              <InputLabel shrink>Customer</InputLabel>
              <Select
                value={newTask.customerId}
                onChange={(e) =>
                  setNewTask({ ...newTask, customerId: e.target.value })
                }
                variant="outlined"
                label="Customer"
                sx={{
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    py: 1.5,
                  },
                }}
              >
                {users
                  .filter((user) => user.role === "customer")
                  .map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Person sx={{ mr: 1, color: "action.active" }} />
                        <Typography variant="body1">{user.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Button
              onClick={() => setOpenDialog(false)}
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleCreate}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Create Task
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Task Dialog */}
        {editTask && (
          <Dialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
            PaperProps={{
              sx: {
                borderRadius: 3,
                width: { xs: "90%", sm: "80%", md: "600px" },
                maxWidth: "100%",
                mx: "auto",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                backgroundImage: 'none',
                border: `1px solid ${theme.palette.divider}`
              },
            }}
          >
            <DialogTitle
              sx={{
                fontWeight: 700,
                fontSize: "1.5rem",
                // color: "primary.main",
                pt: 3,
                pb: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
              }}
            >
              Edit Task
              <Typography variant="body2" sx={{ 
                fontWeight: 400,
                fontSize: '0.9rem',
                color: theme.palette.primary.contrastText,
                opacity: 0.8,
                mt: 0.5
              }}>
                Update the task details
              </Typography>
            </DialogTitle>

            <DialogContent sx={{ py: 3, px: 3 }}>
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                variant="outlined"
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                variant="outlined"
                value={editTask.description}
                onChange={(e) =>
                  setEditTask({ ...editTask, description: e.target.value })
                }
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>

            <DialogActions
              sx={{
                px: 3,
                py: 2,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Button
                onClick={() => setOpenEditDialog(false)}
                variant="outlined"
                color="secondary"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                Cancel
            </Button>

            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Update Task
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* View Task Details Dialog */}
      {viewTask && (
        <Dialog
          open={openViewDialog}
          onClose={() => setOpenViewDialog(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              backgroundImage: 'none',
              border: `1px solid ${theme.palette.divider}`
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: 700,
              fontSize: "1.5rem",
              // color: "primary.main",
              pt: 3,
              pb: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            }}
          >
            Task Details
            <IconButton
              onClick={() => setOpenViewDialog(false)}
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ py: 3, px: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: 600, 
                  mb: 1, 
                  color: "primary.main",
                  fontSize: '1.2rem'
                }}
              >
                {viewTask.title}
              </Typography>
              <Box sx={{ 
                backgroundColor: theme.palette.grey[50],
                p: 2,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`
              }}>
                <Typography variant="body1">
                  {viewTask.description}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 600, 
                mb: 1,
                color: theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center'
              }}>
                <Info sx={{ mr: 1, fontSize: '1.2rem' }} />
                Task Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ 
                    backgroundColor: theme.palette.grey[50],
                    p: 2,
                    borderRadius: 2,
                    height: '100%'
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      Created Date:
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {moment(viewTask.createdAt).format("MMM D, YYYY h:mm A")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ 
                    backgroundColor: theme.palette.grey[50],
                    p: 2,
                    borderRadius: 2,
                    height: '100%'
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      Last Updated:
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {moment(viewTask.updatedAt).format("MMM D, YYYY h:mm A")}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 600, 
                mb: 1,
                color: theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center'
              }}>
                <Person sx={{ mr: 1, fontSize: '1.2rem' }} />
                Assignment Information
              </Typography>
              {viewTask.employee ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ 
                      backgroundColor: theme.palette.grey[50],
                      p: 2,
                      borderRadius: 2,
                      height: '100%'
                    }}>
                      <Typography variant="body2" color="text.secondary">
                        Assigned To:
                      </Typography>
                      <Box
                        sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          mt: 1 
                        }}
                      >
                        <Avatar
                          src={viewTask.employee.profileImage}
                          sx={{
                            width: 40,
                            height: 40,
                            mr: 2,
                            bgcolor: "primary.main",
                            boxShadow: theme.shadows[1]
                          }}
                        >
                          {viewTask.employee.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {viewTask.employee.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {viewTask.employee.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ 
                      backgroundColor: theme.palette.grey[50],
                      p: 2,
                      borderRadius: 2,
                      height: '100%'
                    }}>
                      <Typography variant="body2" color="text.secondary">
                        Customer:
                      </Typography>
                      {viewTask.customer ? (
                        <Box
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            mt: 1 
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              mr: 2,
                              bgcolor: "secondary.main",
                              boxShadow: theme.shadows[1]
                            }}
                          >
                            {viewTask.customer.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {viewTask.customer.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {viewTask.customer.email}
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                          Not assigned to any customer
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Box sx={{ 
                  backgroundColor: theme.palette.grey[50],
                  p: 2,
                  borderRadius: 2,
                  textAlign: 'center'
                }}>
                  <Typography variant="body1" color="text.secondary">
                    This task is not assigned to any employee.
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Button
              onClick={() => {
                setEditTask(viewTask);
                setOpenViewDialog(false);
                setOpenEditDialog(true);
              }}
              variant="outlined"
              color="primary"
              startIcon={<Edit />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Edit Task
            </Button>
            <Button
              onClick={() => setOpenViewDialog(false)}
              variant="contained"
              color="primary"
              sx={{ 
                borderRadius: 2,
                px: 3,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        ContentProps={{
          sx: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white,
            borderRadius: '12px',
            fontWeight: 500
          }
        }}
      />
    </Box>
  </Fade>
  );
};

export default AssignUserToEmployee;