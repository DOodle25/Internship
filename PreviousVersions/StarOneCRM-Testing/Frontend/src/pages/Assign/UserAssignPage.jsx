// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Grid,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Tooltip,
//   IconButton,
//   Snackbar,
// } from "@mui/material";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useGlobalContext } from "../../context/GlobalContext";

// const AssignUserToEmployee = () => {
//   const {
//     tasks,
//     users,
//     handleCreateTask,
//     handleUpdateTask,
//     handleDeleteTask,
//     handleAssignTask,
//     fetchTasks,
//     fetchUsers,
//   } = useGlobalContext();
//   const [selectedTask, setSelectedTask] = useState("");
//   const [selectedCustomer, setSelectedCustomer] = useState("");
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     customerId: "",
//   });
//   const [editTask, setEditTask] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   useEffect(() => {
//     const interval = setInterval(() => {}, 5000);

//     return () => clearInterval(interval);
//   }, [editTask]);
//   const handleSnackbarOpen = (message) => {
//     setSnackbarMessage(message);
//     setSnackbarOpen(true);
//   };
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };
//   const handleCreate = async () => {
//     const result = await handleCreateTask(newTask);
//     handleSnackbarOpen(result.message);
//     if (result.success) {
//       setOpenDialog(false);
//       setNewTask({ title: "", description: "", customerId: "" });
//     }
//   };
//   const handleUpdate = async () => {
//     const result = await handleUpdateTask(editTask);
//     handleSnackbarOpen(result.message);
//     if (result.success) {
//       setOpenEditDialog(false);
//       setEditTask(null);
//     }
//   };
//   const handleDelete = async (taskId) => {
//     const result = await handleDeleteTask(taskId);
//     handleSnackbarOpen(result.message);
//   };
//   const handleAssign = async () => {
//     const result = await handleAssignTask(
//       selectedTask,
//       selectedCustomer,
//       selectedEmployee
//     );
//     handleSnackbarOpen(result.message);
//   };
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const columns = [
//     { field: "title", headerName: "Title", width: 150 },
//     { field: "description", headerName: "Description", width: 300 },
//     { field: "customerName", headerName: "Customer", width: 150 },
//     {
//       field: "customerEmail",
//       headerName: "Customer Email",
//       width: 200,
//     },
//     {
//       field: "isEmployeeAssigned",
//       headerName: "Employee Assigned",
//       width: 150,
//       renderCell: (params) => (params.value ? "Yes" : "No"),
//     },
//     {
//       field: "employeeName",
//       headerName: "Assigned Employee",
//       width: 150,
//     },
//     {
//       field: "createdAt",
//       headerName: "Created At",
//       width: 200,
//       renderCell: (params) => new Date(params.value).toLocaleString(),
//     },
//     {
//       field: "updatedAt",
//       headerName: "Last Updated",
//       width: 200,
//       renderCell: (params) => new Date(params.value).toLocaleString(),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 150,
//       renderCell: (params) => (
//         <>
//           <Tooltip title="Edit">
//             <IconButton
//               color="primary"
//               onClick={() => {
//                 setEditTask(params.row);
//                 setOpenEditDialog(true);
//               }}
//             >
//               <Edit />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <IconButton
//               color="secondary"
//               // onClick={() => handleDelete(params.row.id)}
//               disabled
//             >
//               <Delete />
//             </IconButton>
//           </Tooltip>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "20px" }}>
//       <Grid container spacing={3}>
//         {/* Task List */}
//         <Grid item xs={12} md={6}>
//           <FormControl fullWidth>
//             <InputLabel>Task</InputLabel>
//             <Select
//               value={selectedTask}
//               onChange={(e) => {
//                 const task = tasks.find((t) => t._id === e.target.value);
//                 setSelectedTask(e.target.value);
//                 setSelectedCustomer(task ? task.customer._id : "");
//               }}
//               label="Task"
//               sx={{
//                 backgroundColor: "#FFFFFF",
//               }}
//             >
//               {tasks
//                 .filter((task) => task.isEmployeeAssigned === false)
//                 .map((task) => (
//                   <MenuItem key={task._id} value={task._id}>
//                     {task.title} - {task.description}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <FormControl fullWidth>
//             <InputLabel>Employee</InputLabel>
//             <Select
//               value={selectedEmployee}
//               onChange={(e) => setSelectedEmployee(e.target.value)}
//               label="Employee"
//               sx={{
//                 backgroundColor: "#FFFFFF",
//               }}
//             >
//               {users
//                 .filter((user) => user.role === "employee")
//                 .map((user) => (
//                   <MenuItem key={user._id} value={user._id}>
//                     {user.name}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>
//       <Tooltip title="Create Task">
//         <>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAssign}
//             style={{ margin: "10px", marginLeft: "0" }}
//           >
//             Assign Task
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<Add />}
//             onClick={() => setOpenDialog(true)}
//             style={{ margin: "10px", marginLeft: "0" }}
//           >
//             Create Task
//           </Button>
//         </>
//       </Tooltip>
//       <div style={{ height: 500, width: "100%" }}>
//         <DataGrid
//           rows={tasks.map((t) => ({
//             id: t._id,
//             title: t.title,
//             description: t.description,
//             customerName: t.customer?.name || "N/A",
//             customerEmail: t.customer?.email || "N/A",
//             isEmployeeAssigned: t.isEmployeeAssigned,
//             employeeName: t.employee?.name || "Unassigned",
//             createdAt: t.createdAt,
//             updatedAt: t.updatedAt,
//           }))}
//           columns={columns}
//           count={tasks?.length || 0}
//           // paginationMode="client"
//           initialState={{
//             pagination: { paginationModel: { pageSize: 10 } },
//           }}
//           autoPageSize
//           sx={{
//             backgroundColor: "#FFFFFF",
//             border: "0px solid #DFDFDF",
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: "#031738",
//               fontSize: "16px",
//               fontWeight: "",
//             },
//             "& .MuiDataGrid-row:nth-of-type(even)": {
//               backgroundColor: "#FFFFFF",
//             },
//             "& .MuiDataGrid-row:nth-of-type(odd)": {
//               backgroundColor: "#FFFFFF",
//             },
//             "& .MuiDataGrid-cell": {
//               fontSize: "14px",
//             },
//           }}
//         />
//       </div>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Create Task</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             fullWidth
//             margin="dense"
//             value={newTask.title}
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           />
//           <TextField
//             label="Description"
//             fullWidth
//             margin="dense"
//             value={newTask.description}
//             onChange={(e) =>
//               setNewTask({ ...newTask, description: e.target.value })
//             }
//           />
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Customer</InputLabel>
//             <Select
//               value={newTask.customerId}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, customerId: e.target.value })
//               }
//             >
//               {users
//                 .filter((user) => user.role === "customer")
//                 .map((user) => (
//                   <MenuItem key={user._id} value={user._id}>
//                     {user.name}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" onClick={() => setOpenDialog(false)}>
//             Cancel
//           </Button>
//           <Button variant="contained" onClick={handleCreate} color="primary">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {editTask && (
//         <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
//           <DialogTitle>Edit Task</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Title"
//               fullWidth
//               margin="dense"
//               value={editTask.title}
//               onChange={(e) =>
//                 setEditTask({ ...editTask, title: e.target.value })
//               }
//             />
//             <TextField
//               label="Description"
//               fullWidth
//               margin="dense"
//               value={editTask.description}
//               onChange={(e) =>
//                 setEditTask({ ...editTask, description: e.target.value })
//               }
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button
//               variant="contained"
//               onClick={() => setOpenEditDialog(false)}
//             >
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={handleUpdate} color="primary">
//               Update
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//       />
//     </div>
//   );
// };

// export default AssignUserToEmployee;

// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Grid,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Tooltip,
//   IconButton,
//   Snackbar,
//   Paper,
//   Box,
//   Typography,
//   Avatar,
//   Chip,
//   Fade,
//   Grow,
//   Zoom,
//   Slide,
//   Badge,
//   Divider,
// } from "@mui/material";
// import { Edit, Delete, Add, Assignment, Person, Email, CheckCircle, Cancel } from "@mui/icons-material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useGlobalContext } from "../../context/GlobalContext";
// import { styled } from "@mui/material/styles";
// import moment from "moment";

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.common.white,
//     borderRadius: '16px 16px 0 0',
//   },
//   '& .MuiDataGrid-root': {
//     border: 'none',
//     borderRadius: 16,
//   },
//   '& .MuiDataGrid-cell': {
//     borderBottom: `1px solid ${theme.palette.divider}`,
//   },
//   '& .MuiDataGrid-row:hover': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '& .MuiDataGrid-virtualScroller': {
//     backgroundColor: theme.palette.background.paper,
//   },
//   '& .MuiDataGrid-footerContainer': {
//     borderTop: 'none',
//     backgroundColor: theme.palette.background.default,
//     borderRadius: '0 0 16px 16px',
//   },
// }));

// const AssignUserToEmployee = () => {
//   const {
//     tasks,
//     users,
//     handleCreateTask,
//     handleUpdateTask,
//     handleDeleteTask,
//     handleAssignTask,
//     fetchTasks,
//     fetchUsers,
//   } = useGlobalContext();
//   const [selectedTask, setSelectedTask] = useState("");
//   const [selectedCustomer, setSelectedCustomer] = useState("");
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     customerId: "",
//   });
//   const [editTask, setEditTask] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   useEffect(() => {
//     fetchUsers();
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {}, 5000);
//     return () => clearInterval(interval);
//   }, [editTask]);

//   const handleSnackbarOpen = (message) => {
//     setSnackbarMessage(message);
//     setSnackbarOpen(true);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleCreate = async () => {
//     const result = await handleCreateTask(newTask);
//     handleSnackbarOpen(result.message);
//     if (result.success) {
//       setOpenDialog(false);
//       setNewTask({ title: "", description: "", customerId: "" });
//     }
//   };

//   const handleUpdate = async () => {
//     const result = await handleUpdateTask(editTask);
//     handleSnackbarOpen(result.message);
//     if (result.success) {
//       setOpenEditDialog(false);
//       setEditTask(null);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     const result = await handleDeleteTask(taskId);
//     handleSnackbarOpen(result.message);
//   };

//   const handleAssign = async () => {
//     const result = await handleAssignTask(
//       selectedTask,
//       selectedCustomer,
//       selectedEmployee
//     );
//     handleSnackbarOpen(result.message);
//   };

//   const columns = [
//     {
//       field: "title",
//       headerName: "Title",
//       width: 180,
//       renderCell: (params) => (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Assignment color="action" sx={{ mr: 1 }} />
//           <Typography variant="body2">{params.value}</Typography>
//         </Box>
//       )
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       width: 250,
//       renderCell: (params) => (
//         <Typography variant="body2" noWrap>
//           {params.value}
//         </Typography>
//       )
//     },
//     {
//       field: "customerName",
//       headerName: "Customer",
//       width: 180,
//       renderCell: (params) => (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Person color="action" sx={{ mr: 1 }} />
//           <Typography variant="body2">{params.value}</Typography>
//         </Box>
//       )
//     },
//     {
//       field: "customerEmail",
//       headerName: "Customer Email",
//       width: 220,
//       renderCell: (params) => (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Email color="action" sx={{ mr: 1 }} />
//           <Typography variant="body2">{params.value}</Typography>
//         </Box>
//       )
//     },
//     {
//       field: "isEmployeeAssigned",
//       headerName: "Status",
//       width: 150,
//       renderCell: (params) => (
//         <Chip
//           icon={params.value ? <CheckCircle /> : <Cancel />}
//           label={params.value ? "Assigned" : "Unassigned"}
//           size="small"
//           color={params.value ? "success" : "error"}
//           variant="outlined"
//         />
//       ),
//     },
//     {
//       field: "employeeName",
//       headerName: "Assigned To",
//       width: 180,
//       renderCell: (params) => (
//         params.value !== "Unassigned" ? (
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Avatar
//               sx={{
//                 width: 24,
//                 height: 24,
//                 mr: 1,
//                 bgcolor: 'primary.main',
//                 fontSize: '0.8rem'
//               }}
//             >
//               {params.value?.charAt(0)}
//             </Avatar>
//             <Typography variant="body2">{params.value}</Typography>
//           </Box>
//         ) : (
//           <Typography variant="body2" color="text.secondary">
//             {params.value}
//           </Typography>
//         )
//       ),
//     },
//     {
//       field: "createdAt",
//       headerName: "Created",
//       width: 180,
//       renderCell: (params) => (
//         <Typography variant="body2">
//           {moment(params.value).format("DD MMM YYYY")}
//         </Typography>
//       ),
//     },
//     {
//       field: "updatedAt",
//       headerName: "Updated",
//       width: 180,
//       renderCell: (params) => (
//         <Typography variant="body2">
//           {moment(params.value).fromNow()}
//         </Typography>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 120,
//       renderCell: (params) => (
//         <Box sx={{ display: 'flex' }}>
//           <Tooltip title="Edit" arrow>
//             <IconButton
//               color="primary"
//               onClick={() => {
//                 setEditTask(params.row);
//                 setOpenEditDialog(true);
//               }}
//               sx={{
//                 '&:hover': {
//                   backgroundColor: 'primary.light',
//                   transform: 'scale(1.1)',
//                   transition: 'transform 0.2s',
//                 }
//               }}
//             >
//               <Edit fontSize="small" />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete" arrow>
//             <IconButton
//               color="error"
//               disabled
//               sx={{
//                 '&:hover': {
//                   backgroundColor: 'error.light',
//                   transform: 'scale(1.1)',
//                   transition: 'transform 0.2s',
//                 }
//               }}
//             >
//               <Delete fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Fade in={true} timeout={500}>
//       <Box sx={{ p: 3 }}>
//         <Grow in={true} timeout={600}>
//           <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 4 }}>
//             {/* <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
//               Task Assignment
//             </Typography>
//              */}
//             <Grid container spacing={3} sx={{ mb: 3 }}>
//               <Grid item xs={12} md={4}>
//                 <FormControl fullWidth>
//                   <InputLabel>Select Task</InputLabel>
//                   <Select
//                     value={selectedTask}
//                     onChange={(e) => {
//                       const task = tasks.find((t) => t._id === e.target.value);
//                       setSelectedTask(e.target.value);
//                       setSelectedCustomer(task ? task.customer._id : "");
//                     }}
//                     label="Select Task"
//                   >
//                     {tasks
//                       .filter((task) => task.isEmployeeAssigned === false)
//                       .map((task) => (
//                         <MenuItem key={task._id} value={task._id}>
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <Assignment sx={{ mr: 1, fontSize: '1rem' }} />
//                             <Box>
//                               <Typography>{task.title}</Typography>
//                               <Typography variant="caption" color="text.secondary">
//                                 {task.description.substring(0, 30)}...
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </MenuItem>
//                       ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <FormControl fullWidth>
//                   <InputLabel>Select Employee</InputLabel>
//                   <Select
//                     value={selectedEmployee}
//                     onChange={(e) => setSelectedEmployee(e.target.value)}
//                     label="Select Employee"
//                   >
//                     {users
//                       .filter((user) => user.role === "employee")
//                       .map((user) => (
//                         <MenuItem key={user._id} value={user._id}>
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <Avatar
//                               sx={{
//                                 width: 24,
//                                 height: 24,
//                                 mr: 2,
//                                 bgcolor: 'primary.main',
//                                 fontSize: '0.8rem'
//                               }}
//                             >
//                               {user.name.charAt(0)}
//                             </Avatar>
//                             <Typography>{user.name}</Typography>
//                           </Box>
//                         </MenuItem>
//                       ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Zoom in={true} style={{ transitionDelay: '200ms' }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleAssign}
//                     fullWidth
//                     sx={{ height: 56 }}
//                   >
//                     Assign Task
//                   </Button>
//                 </Zoom>
//               </Grid>
//             </Grid>

//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                 Task Management
//               </Typography>
//               <Zoom in={true} style={{ transitionDelay: '250ms' }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<Add />}
//                   onClick={() => setOpenDialog(true)}
//                 >
//                   Create Task
//                 </Button>
//               </Zoom>
//             </Box>

//             <Box sx={{ height: 600, width: "100%" }}>
//               <StyledDataGrid
//                 rows={tasks.map((t) => ({
//                   id: t._id,
//                   title: t.title,
//                   description: t.description,
//                   customerName: t.customer?.name || "N/A",
//                   customerEmail: t.customer?.email || "N/A",
//                   isEmployeeAssigned: t.isEmployeeAssigned,
//                   employeeName: t.employee?.name || "Unassigned",
//                   createdAt: t.createdAt,
//                   updatedAt: t.updatedAt,
//                 }))}
//                 columns={columns}
//                 initialState={{
//                   pagination: { paginationModel: { pageSize: 10 } },
//                 }}
//                 pageSizeOptions={[5, 10, 25]}
//                 disableRowSelectionOnClick
//               />
//             </Box>
//           </Paper>
//         </Grow>

//         {/* Create Task Dialog */}
//         <Dialog
//           open={openDialog}
//           onClose={() => setOpenDialog(false)}
//           PaperProps={{
//             sx: {
//               borderRadius: 4,
//               minWidth: 500
//             }
//           }}
//         >
//           <DialogTitle sx={{ fontWeight: 600 }}>Create New Task</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Title"
//               fullWidth
//               margin="normal"
//               value={newTask.title}
//               onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               label="Description"
//               fullWidth
//               margin="normal"
//               multiline
//               rows={3}
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//               sx={{ mb: 2 }}
//             />
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Customer</InputLabel>
//               <Select
//                 value={newTask.customerId}
//                 onChange={(e) =>
//                   setNewTask({ ...newTask, customerId: e.target.value })
//                 }
//               >
//                 {users
//                   .filter((user) => user.role === "customer")
//                   .map((user) => (
//                     <MenuItem key={user._id} value={user._id}>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Person sx={{ mr: 1 }} />
//                         <Typography>{user.name}</Typography>
//                       </Box>
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions sx={{ p: 3 }}>
//             <Button
//               onClick={() => setOpenDialog(false)}
//               variant="outlined"
//               sx={{ borderRadius: 2, px: 3 }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleCreate}
//               variant="contained"
//               sx={{ borderRadius: 2, px: 3 }}
//             >
//               Create Task
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Edit Task Dialog */}
//         {editTask && (
//           <Dialog
//             open={openEditDialog}
//             onClose={() => setOpenEditDialog(false)}
//             PaperProps={{
//               sx: {
//                 borderRadius: 4,
//                 minWidth: 500
//               }
//             }}
//           >
//             <DialogTitle sx={{ fontWeight: 600 }}>Edit Task</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Title"
//                 fullWidth
//                 margin="normal"
//                 value={editTask.title}
//                 onChange={(e) =>
//                   setEditTask({ ...editTask, title: e.target.value })
//                 }
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 label="Description"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={3}
//                 value={editTask.description}
//                 onChange={(e) =>
//                   setEditTask({ ...editTask, description: e.target.value })
//                 }
//                 sx={{ mb: 2 }}
//               />
//             </DialogContent>
//             <DialogActions sx={{ p: 3 }}>
//               <Button
//                 onClick={() => setOpenEditDialog(false)}
//                 variant="outlined"
//                 sx={{ borderRadius: 2, px: 3 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleUpdate}
//                 variant="contained"
//                 sx={{ borderRadius: 2, px: 3 }}
//               >
//                 Update Task
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={handleSnackbarClose}
//           message={snackbarMessage}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         />
//       </Box>
//     </Fade>
//   );
// };

// export default AssignUserToEmployee;

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Tooltip,
//   IconButton,
//   Snackbar,
//   Paper,
//   Box,
//   Typography,
//   Avatar,
//   Chip,
//   Fade,
//   Grow,
//   Zoom,
//   Divider,
//   CircularProgress,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { Edit, Delete, Add, Assignment, Person, Email, CheckCircle, Cancel, Search, Clear } from "@mui/icons-material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import { styled } from "@mui/material/styles";
// import moment from "moment";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const Container = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: 16,
//   backgroundColor: theme.palette.background.paper,
//   boxShadow: theme.shadows[3],
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     boxShadow: theme.shadows[6],
//   },
// }));

// const TaskList = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderRadius: 12,
//   backgroundColor: theme.palette.grey[100],
//   minHeight: 400,
//   transition: 'all 0.3s ease',
// }));

// const EmployeeList = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderRadius: 12,
//   backgroundColor: theme.palette.grey[100],
//   minHeight: 400,
//   transition: 'all 0.3s ease',
// }));

// const TaskItem = styled(Paper)(({ theme, isdragging }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(1),
//   borderRadius: 8,
//   backgroundColor: isdragging === 'true' ? theme.palette.primary.light : theme.palette.common.white,
//   boxShadow: theme.shadows[1],
//   cursor: 'grab',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     backgroundColor: theme.palette.action.hover,
//     transform: 'translateY(-2px)',
//     boxShadow: theme.shadows[2],
//   },
// }));

// const EmployeeItem = styled(Paper)(({ theme, isdragging }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(1),
//   borderRadius: 8,
//   backgroundColor: isdragging === 'true' ? theme.palette.secondary.light : theme.palette.common.white,
//   boxShadow: theme.shadows[1],
//   cursor: 'grab',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     backgroundColor: theme.palette.action.hover,
//     transform: 'translateY(-2px)',
//     boxShadow: theme.shadows[2],
//   },
// }));

// const AssignUserToEmployee = () => {
//   const {
//     tasks,
//     users,
//     handleCreateTask,
//     handleUpdateTask,
//     handleDeleteTask,
//     handleAssignTask,
//     // handleBatchAssignTasks,
//     fetchTasks,
//     fetchUsers,
//   } = useGlobalContext();

//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     customerId: "",
//   });
//   const [editTask, setEditTask] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [taskSearch, setTaskSearch] = useState("");
//   const [employeeSearch, setEmployeeSearch] = useState("");
//   const [assignments, setAssignments] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Initialize assignments
//   useEffect(() => {
//     const initialAssignments = {};
//     tasks.forEach(task => {
//       if (task.employee?._id) {
//         initialAssignments[task._id] = task.employee._id;
//       }
//     });
//     setAssignments(initialAssignments);
//   }, [tasks]);

//   const handleSnackbarOpen = (message) => {
//     setSnackbarMessage(message);
//     setSnackbarOpen(true);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleCreate = async () => {
//     const result = await handleCreateTask(newTask);
//     handleSnackbarOpen(result.message);
//     if (result.success) {
//       setOpenDialog(false);
//       setNewTask({ title: "", description: "", customerId: "" });
//     }
//   };

//   const handleUpdate = async () => {
//     console.log("Edit Task:", editTask);
//     const result = await handleUpdateTask(editTask);
//     handleSnackbarOpen(result.message);
//     if (result.success) {
//       setOpenEditDialog(false);
//       setEditTask(null);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     const result = await handleDeleteTask(taskId);
//     handleSnackbarOpen(result.message);
//   };

//   const filteredTasks = tasks.filter(task => {
//     const matchesSearch = task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
//                          task.description.toLowerCase().includes(taskSearch.toLowerCase());
//     const isUnassigned = !task.isEmployeeAssigned;
//     return matchesSearch && isUnassigned;
//   });

//   const filteredEmployees = users.filter(user => {
//     return user.role === "employee" &&
//            user.name.toLowerCase().includes(employeeSearch.toLowerCase());
//   });

//   const onDragEnd = useCallback((result) => {
//     const { source, destination, draggableId } = result;

//     // Dropped outside the list
//     if (!destination) {
//       return;
//     }

//     // If dropped in the same place
//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     // If task is dropped on an employee
//     if (source.droppableId === 'tasks' && destination.droppableId.startsWith('employee-')) {
//       const employeeId = destination.droppableId.replace('employee-', '');
//       setAssignments(prev => ({
//         ...prev,
//         [draggableId]: employeeId
//       }));
//     }

//     // If assignment is removed (dropped back to tasks)
//     if (source.droppableId.startsWith('employee-') && destination.droppableId === 'tasks') {
//       setAssignments(prev => {
//         const newAssignments = { ...prev };
//         delete newAssignments[draggableId];
//         return newAssignments;
//       });
//     }
//   }, []);

//   // const saveAssignments = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const assignmentArray = Object.entries(assignments).map(([taskId, employeeId]) => ({
//   //       taskId,
//   //       employeeId
//   //     }));

//   //     // Batch assign if more than one, otherwise single assign
//   //     let result;
//   //     if (assignmentArray.length > 1) {
//   //       result = await handleBatchAssignTasks(assignmentArray);
//   //     } else if (assignmentArray.length === 1) {
//   //       const assignment = assignmentArray[0];
//   //       result = await handleAssignTask(assignment.taskId, null, assignment.employeeId);
//   //     } else {
//   //       handleSnackbarOpen("No assignments to save");
//   //       return;
//   //     }

//   //     handleSnackbarOpen(result.message || "Assignments saved successfully");
//   //     fetchTasks(); // Refresh tasks
//   //   } catch (error) {
//   //     handleSnackbarOpen("Error saving assignments");
//   //     console.error("Error saving assignments:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const saveAssignments = async () => {
//   //   setLoading(true);
//   //   try {
//   //     // Filter out any invalid assignments first
//   //     const validAssignments = Object.entries(assignments)
//   //       .filter(([taskId, employeeId]) =>
//   //         taskId && employeeId && isValidObjectId(taskId) && isValidObjectId(employeeId)
//   //       )
//   //       .map(([taskId, employeeId]) => ({
//   //         taskId,
//   //         employeeId
//   //       }));

//   //     if (validAssignments.length === 0) {
//   //       handleSnackbarOpen("No valid assignments to save");
//   //       return;
//   //     }

//   //     let result;
//   //     if (validAssignments.length > 1) {
//   //       result = await handleBatchAssignTasks(validAssignments);
//   //     } else {
//   //       const assignment = validAssignments[0];
//   //       result = await handleAssignTask(assignment.taskId, null, assignment.employeeId);
//   //     }

//   //     handleSnackbarOpen(result.message || "Assignments saved successfully");
//   //     fetchTasks(); // Refresh tasks
//   //   } catch (error) {
//   //     console.error("Error saving assignments:", error);
//   //     handleSnackbarOpen(error.response?.data?.message || "Error saving assignments");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const saveAssignments = async () => {
//     setLoading(true);
//     try {
//       // Filter out any invalid assignments first
//       const validAssignments = Object.entries(assignments)
//         .filter(([taskId, employeeId]) =>
//           taskId && employeeId && isValidObjectId(taskId) && isValidObjectId(employeeId)
//         );

//       if (validAssignments.length === 0) {
//         handleSnackbarOpen("No valid assignments to save");
//         return;
//       }

//       // Process assignments sequentially
//       const results = [];
//       for (const [taskId, employeeId] of validAssignments) {
//         try {
//           const result = await handleAssignTask(taskId, null, employeeId);
//           results.push({ taskId, success: true, message: result.message });
//         } catch (error) {
//           results.push({
//             taskId,
//             success: false,
//             message: error.response?.data?.message || `Failed to assign task ${taskId}`
//           });
//         }
//       }

//       // Check if all assignments succeeded
//       const allSuccess = results.every(r => r.success);
//       const successCount = results.filter(r => r.success).length;

//       if (allSuccess) {
//         handleSnackbarOpen(`All ${successCount} assignments saved successfully`);
//       } else {
//         handleSnackbarOpen(
//           `${successCount} of ${validAssignments.length} assignments saved. ` +
//           `${validAssignments.length - successCount} failed.`
//         );
//       }

//       fetchTasks(); // Refresh tasks regardless of individual successes/failures
//     } catch (error) {
//       console.error("Error in assignment process:", error);
//       handleSnackbarOpen("Error during assignment process");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add this helper function (or use mongoose.Types.ObjectId.isValid if you have access to mongoose)
//   function isValidObjectId(id) {
//     return /^[0-9a-fA-F]{24}$/.test(id);
//   }

//   const clearAssignments = () => {
//     setAssignments({});
//   };

//   const getAssignedTasksForEmployee = (employeeId) => {
//     return tasks.filter(task => assignments[task._id] === employeeId);
//   };

//   return (
//     <Fade in={true} timeout={500}>
//       <Box sx={{ p: 3 }}>
//         <Grow in={true} timeout={600}>
//           <Container elevation={3}>
//             <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
//               Task Assignment Board
//             </Typography>

//             {/* Search and Filter Section */}
//             <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//               <TextField
//                 label="Search Tasks"
//                 variant="outlined"
//                 fullWidth
//                 value={taskSearch}
//                 onChange={(e) => setTaskSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
//                   endAdornment: taskSearch && (
//                     <IconButton onClick={() => setTaskSearch("")}>
//                       <Clear fontSize="small" />
//                     </IconButton>
//                   ),
//                 }}
//               />
//               <TextField
//                 label="Search Employees"
//                 variant="outlined"
//                 fullWidth
//                 value={employeeSearch}
//                 onChange={(e) => setEmployeeSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
//                   endAdornment: employeeSearch && (
//                     <IconButton onClick={() => setEmployeeSearch("")}>
//                       <Clear fontSize="small" />
//                     </IconButton>
//                   ),
//                 }}
//               />
//             </Box>

//             {/* Action Buttons */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <Zoom in={true} style={{ transitionDelay: '100ms' }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<Add />}
//                     onClick={() => setOpenDialog(true)}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Create Task
//                   </Button>
//                 </Zoom>
//                 <Zoom in={true} style={{ transitionDelay: '150ms' }}>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={clearAssignments}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Clear Assignments
//                   </Button>
//                 </Zoom>
//               </Box>
//               <Zoom in={true} style={{ transitionDelay: '200ms' }}>
//                 <Button
//                   variant="contained"
//                   color="success"
//                   onClick={saveAssignments}
//                   disabled={loading || Object.keys(assignments).length === 0}
//                   startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
//                   sx={{ borderRadius: 2 }}
//                 >
//                   {loading ? 'Saving...' : 'Save Assignments'}
//                 </Button>
//               </Zoom>
//             </Box>

//             {/* Drag and Drop Board */}
//             <DragDropContext onDragEnd={onDragEnd}>
//               <Grid container spacing={3}>
//                 {/* Tasks Column */}
//                 <Grid item xs={12} md={4}>
//                   <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//                     Available Tasks ({filteredTasks.length})
//                   </Typography>
//                   <Droppable droppableId="tasks">
//                     {(provided) => (
//                       <TaskList ref={provided.innerRef} {...provided.droppableProps}>
//                         {filteredTasks.length === 0 ? (
//                           <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
//                             No tasks available
//                           </Typography>
//                         ) : (
//                           filteredTasks.map((task, index) => (
//                             <Draggable key={task._id} draggableId={task._id} index={index}>
//                               {(provided, snapshot) => (
//                                 <TaskItem
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   isdragging={snapshot.isDragging.toString()}
//                                   elevation={snapshot.isDragging ? 3 : 1}
//                                 >
//                                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <Box>
//                                       <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//                                         {task.title}
//                                       </Typography>
//                                       <Typography variant="body2" color="text.secondary">
//                                         {task.description.substring(0, 60)}...
//                                       </Typography>
//                                       <Typography variant="caption" display="block">
//                                         Created: {moment(task.createdAt).format("MMM D, YYYY")}
//                                       </Typography>
//                                     </Box>
//                                     <Box sx={{ display: 'flex', gap: 1 }}>
//                                       <Tooltip title="Edit" arrow>
//                                         <IconButton
//                                           size="small"
//                                           onClick={() => {
//                                             setEditTask(task);
//                                             setOpenEditDialog(true);
//                                           }}
//                                         >
//                                           <Edit fontSize="small" />
//                                         </IconButton>
//                                       </Tooltip>
//                                       <Tooltip title="Delete" arrow>
//                                         <IconButton size="small" disabled>
//                                           <Delete fontSize="small" />
//                                         </IconButton>
//                                       </Tooltip>
//                                     </Box>
//                                   </Box>
//                                 </TaskItem>
//                               )}
//                             </Draggable>
//                           ))
//                         )}
//                         {provided.placeholder}
//                       </TaskList>
//                     )}
//                   </Droppable>
//                 </Grid>

//                 {/* Employees Columns */}
//                 {filteredEmployees.map((employee) => (
//                   <Grid item xs={12} md={4} key={employee._id}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                       <Avatar
//                         sx={{
//                           width: 32,
//                           height: 32,
//                           mr: 2,
//                           bgcolor: 'primary.main',
//                         }}
//                         src={employee.profileImage}
//                       >
//                         {employee.name.charAt(0)}
//                       </Avatar>
//                       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                         {employee.name}
//                       </Typography>
//                     </Box>
//                     <Droppable droppableId={`employee-${employee._id}`}>
//                       {(provided) => (
//                         <EmployeeList ref={provided.innerRef} {...provided.droppableProps}>
//                           {getAssignedTasksForEmployee(employee._id).map((task, index) => (
//                             <Draggable key={task._id} draggableId={task._id} index={index}>
//                               {(provided, snapshot) => (
//                                 <EmployeeItem
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   isdragging={snapshot.isDragging.toString()}
//                                   elevation={snapshot.isDragging ? 3 : 1}
//                                 >
//                                   <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//                                     {task.title}
//                                   </Typography>
//                                   <Typography variant="body2" color="text.secondary">
//                                     {task.description.substring(0, 60)}...
//                                   </Typography>
//                                   <Chip
//                                     label="Assigned"
//                                     size="small"
//                                     color="success"
//                                     variant="outlined"
//                                     sx={{ mt: 1 }}
//                                   />
//                                 </EmployeeItem>
//                               )}
//                             </Draggable>
//                           ))}
//                           {provided.placeholder}
//                         </EmployeeList>
//                       )}
//                     </Droppable>
//                   </Grid>
//                 ))}
//               </Grid>
//             </DragDropContext>
//           </Container>
//         </Grow>

//         {/* Create Task Dialog */}
//         <Dialog
//           open={openDialog}
//           onClose={() => setOpenDialog(false)}
//           PaperProps={{
//             sx: {
//               borderRadius: 4,
//               minWidth: 500
//             }
//           }}
//         >
//           <DialogTitle sx={{ fontWeight: 600 }}>Create New Task</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Title"
//               fullWidth
//               margin="normal"
//               value={newTask.title}
//               onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               label="Description"
//               fullWidth
//               margin="normal"
//               multiline
//               rows={3}
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//               sx={{ mb: 2 }}
//             />
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Customer</InputLabel>
//               <Select
//                 value={newTask.customerId}
//                 onChange={(e) =>
//                   setNewTask({ ...newTask, customerId: e.target.value })
//                 }
//               >
//                 {users
//                   .filter((user) => user.role === "customer")
//                   .map((user) => (
//                     <MenuItem key={user._id} value={user._id}>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Person sx={{ mr: 1 }} />
//                         <Typography>{user.name}</Typography>
//                       </Box>
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions sx={{ p: 3 }}>
//             <Button
//               onClick={() => setOpenDialog(false)}
//               variant="outlined"
//               sx={{ borderRadius: 2, px: 3 }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleCreate}
//               variant="contained"
//               sx={{ borderRadius: 2, px: 3 }}
//             >
//               Create Task
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Edit Task Dialog */}
//         {editTask && (
//           <Dialog
//             open={openEditDialog}
//             onClose={() => setOpenEditDialog(false)}
//             PaperProps={{
//               sx: {
//                 borderRadius: 4,
//                 minWidth: 500
//               }
//             }}
//           >
//             <DialogTitle sx={{ fontWeight: 600 }}>Edit Task</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Title"
//                 fullWidth
//                 margin="normal"
//                 value={editTask.title}
//                 onChange={(e) =>
//                   setEditTask({ ...editTask, title: e.target.value })
//                 }
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 label="Description"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={3}
//                 value={editTask.description}
//                 onChange={(e) =>
//                   setEditTask({ ...editTask, description: e.target.value })
//                 }
//                 sx={{ mb: 2 }}
//               />
//             </DialogContent>
//             <DialogActions sx={{ p: 3 }}>
//               <Button
//                 onClick={() => setOpenEditDialog(false)}
//                 variant="outlined"
//                 sx={{ borderRadius: 2, px: 3 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleUpdate}
//                 variant="contained"
//                 sx={{ borderRadius: 2, px: 3 }}
//               >
//                 Update Task
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={handleSnackbarClose}
//           message={snackbarMessage}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         />
//       </Box>
//     </Fade>
//   );
// };

// export default AssignUserToEmployee;

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Tooltip,
//   IconButton,
//   Snackbar,
//   Paper,
//   Box,
//   Typography,
//   Avatar,
//   Chip,
//   Fade,
//   Grow,
//   Zoom,
//   Divider,
//   CircularProgress,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//   Edit,
//   Delete,
//   Add,
//   Assignment,
//   Person,
//   Email,
//   CheckCircle,
//   Cancel,
//   Search,
//   Clear,
// } from "@mui/icons-material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import { styled } from "@mui/material/styles";
// import moment from "moment";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // Styled components
// const Container = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: 16,
//   backgroundColor: theme.palette.background.paper,
//   boxShadow: theme.shadows[3],
//   transition: "all 0.3s ease",
//   "&:hover": {
//     boxShadow: theme.shadows[6],
//   },
// }));

// const TaskList = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderRadius: 12,
//   backgroundColor: theme.palette.grey[100],
//   minHeight: 400,
//   transition: "all 0.3s ease",
// }));

// const EmployeeList = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderRadius: 12,
//   backgroundColor: theme.palette.grey[100],
//   minHeight: 400,
//   transition: "all 0.3s ease",
// }));

// const TaskItem = styled(Paper)(({ theme, isdragging }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(1),
//   borderRadius: 8,
//   backgroundColor:
//     isdragging === "true"
//       ? theme.palette.primary.light
//       : theme.palette.common.white,
//   boxShadow: theme.shadows[1],
//   cursor: "grab",
//   transition: "all 0.2s ease",
//   "&:hover": {
//     backgroundColor: theme.palette.action.hover,
//     transform: "translateY(-2px)",
//     boxShadow: theme.shadows[2],
//   },
// }));

// const EmployeeItem = styled(Paper)(({ theme, isdragging }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(1),
//   borderRadius: 8,
//   backgroundColor:
//     isdragging === "true"
//       ? theme.palette.secondary.light
//       : theme.palette.common.white,
//   boxShadow: theme.shadows[1],
//   cursor: "grab",
//   transition: "all 0.2s ease",
//   "&:hover": {
//     backgroundColor: theme.palette.action.hover,
//     transform: "translateY(-2px)",
//     boxShadow: theme.shadows[2],
//   },
// }));

// const AssignUserToEmployee = () => {
//   const {
//     tasks,
//     users,
//     handleCreateTask,
//     handleUpdateTask,
//     handleDeleteTask,
//     handleAssignTask,
//     fetchTasks,
//     fetchUsers,
//   } = useGlobalContext();

//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     customerId: "",
//   });
//   const [editTask, setEditTask] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [taskSearch, setTaskSearch] = useState("");
//   const [employeeSearch, setEmployeeSearch] = useState("");
//   const [assignments, setAssignments] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [changes, setChanges] = useState({});

//   // Initialize data and assignments
//   useEffect(() => {
//     fetchUsers();
//     fetchTasks();
//   }, []);

//   // Initialize assignments when tasks load
//   useEffect(() => {
//     const initialAssignments = {};
//     tasks.forEach((task) => {
//       if (task.employee?._id) {
//         initialAssignments[task._id] = task.employee._id;
//       }
//     });
//     setAssignments(initialAssignments);
//   }, [tasks]);

//   const handleSnackbarOpen = (message) => {
//     setSnackbarMessage(message);
//     setSnackbarOpen(true);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleCreate = async () => {
//     const result = await handleCreateTask(newTask);
//     handleSnackbarOpen(result.message);
//     if (result.success) {
//       setOpenDialog(false);
//       setNewTask({ title: "", description: "", customerId: "" });
//       fetchTasks(); // Refresh tasks
//     }
//   };

//   // const handleUpdate = async () => {
//   //   if (!editTask || !editTask._id) {
//   //     handleSnackbarOpen("Invalid task data");
//   //     return;
//   //   }

//   //   try {
//   //     const result = await handleUpdateTask(editTask);
//   //     handleSnackbarOpen(result.message);
//   //     if (result.success) {
//   //       setOpenEditDialog(false);
//   //       setEditTask(null);
//   //       fetchTasks(); // Refresh tasks
//   //     }
//   //   } catch (error) {
//   //     console.error("Error updating task:", error);
//   //     handleSnackbarOpen(
//   //       error.response?.data?.message || "Error updating task"
//   //     );
//   //   }
//   // };

//   const handleUpdate = async () => {
//     if (!editTask || !editTask._id) {
//       // Make sure we're checking _id, not id
//       handleSnackbarOpen("Invalid task data");
//       return;
//     }

//     try {
//       const result = await handleUpdateTask({
//         ...editTask,
//         id: editTask._id, // Make sure the ID is included as 'id' for the API call
//       });
//       handleSnackbarOpen(result.message);
//       if (result.success) {
//         setOpenEditDialog(false);
//         setEditTask(null);
//         fetchTasks();
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//       handleSnackbarOpen(
//         error.response?.data?.message || "Error updating task"
//       );
//     }
//   };

//   const handleDelete = async (taskId) => {
//     const result = await handleDeleteTask(taskId);
//     handleSnackbarOpen(result.message);
//     if (result.success) {
//       fetchTasks(); // Refresh tasks
//     }
//   };

//   // Filter tasks based on search and assignment status
//   // const filteredTasks = tasks.filter(task => {
//   //   const matchesSearch = task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
//   //                        task.description.toLowerCase().includes(taskSearch.toLowerCase());
//   //   const isUnassigned = !task.isEmployeeAssigned;
//   //   return matchesSearch && isUnassigned;
//   // });
//   // const filteredTasks = tasks.filter(task => {
//   //   const matchesSearch = task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
//   //                        task.description.toLowerCase().includes(taskSearch.toLowerCase());
//   //   const isUnassigned = !task.employee?._id && !assignments[task._id]; // Also check assignments
//   //   return matchesSearch && isUnassigned;
//   // });

//   // Filter tasks - only show truly unassigned tasks (no assignment in server or pending changes)
//   const filteredTasks = tasks.filter((task) => {
//     const matchesSearch =
//       task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
//       task.description.toLowerCase().includes(taskSearch.toLowerCase());

//     // Task is unassigned in server state AND not assigned in pending changes
//     const isUnassigned =
//       !task.employee?._id && !Object.values(assignments).includes(task._id);

//     return matchesSearch && isUnassigned;
//   });
//   // Filter employees based on search
//   const filteredEmployees = users.filter((user) => {
//     return (
//       user.role === "employee" &&
//       user.name.toLowerCase().includes(employeeSearch.toLowerCase())
//     );
//   });

//   // Handle drag and drop events
//   // const onDragEnd = useCallback((result) => {
//   //   const { source, destination, draggableId } = result;

//   //   // Dropped outside the list
//   //   if (!destination) {
//   //     return;
//   //   }

//   //   // If dropped in the same place
//   //   if (
//   //     destination.droppableId === source.droppableId &&
//   //     destination.index === source.index
//   //   ) {
//   //     return;
//   //   }

//   //   // Track changes
//   //   setChanges((prev) => {
//   //     const newChanges = { ...prev };

//   //     // If task is dropped on an employee
//   //     if (
//   //       source.droppableId === "tasks" &&
//   //       destination.droppableId.startsWith("employee-")
//   //     ) {
//   //       const employeeId = destination.droppableId.replace("employee-", "");
//   //       newChanges[draggableId] = employeeId;
//   //     }

//   //     // If assignment is removed (dropped back to tasks)
//   //     if (
//   //       source.droppableId.startsWith("employee-") &&
//   //       destination.droppableId === "tasks"
//   //     ) {
//   //       newChanges[draggableId] = null; // Mark for unassignment
//   //     }

//   //     return newChanges;
//   //   });

//   //   // Update UI immediately
//   //   setAssignments((prev) => {
//   //     const newAssignments = { ...prev };

//   //     // Assign to employee
//   //     if (
//   //       source.droppableId === "tasks" &&
//   //       destination.droppableId.startsWith("employee-")
//   //     ) {
//   //       const employeeId = destination.droppableId.replace("employee-", "");
//   //       newAssignments[draggableId] = employeeId;
//   //     }

//   //     // Unassign
//   //     if (
//   //       source.droppableId.startsWith("employee-") &&
//   //       destination.droppableId === "tasks"
//   //     ) {
//   //       delete newAssignments[draggableId];
//   //     }

//   //     return newAssignments;
//   //   });
//   // }, []);

//   const onDragEnd = useCallback((result) => {
//     const { source, destination, draggableId } = result;

//     // Dropped outside the list
//     if (!destination) {
//       return;
//     }

//     // If dropped in the same place
//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     // Track changes
//     setChanges((prev) => {
//       const newChanges = { ...prev };

//       // If task is dropped on an employee
//       if (destination.droppableId.startsWith("employee-")) {
//         const employeeId = destination.droppableId.replace("employee-", "");
//         newChanges[draggableId] = employeeId;
//       }

//       // If assignment is removed (dropped back to tasks)
//       if (destination.droppableId === "tasks") {
//         newChanges[draggableId] = null; // Mark for unassignment
//       }

//       return newChanges;
//     });

//     // Update UI assignments state
//     setAssignments((prev) => {
//       const newAssignments = { ...prev };

//       // Assign to employee
//       if (destination.droppableId.startsWith("employee-")) {
//         const employeeId = destination.droppableId.replace("employee-", "");
//         newAssignments[draggableId] = employeeId;
//       }

//       // Unassign
//       if (destination.droppableId === "tasks") {
//         delete newAssignments[draggableId];
//       }

//       return newAssignments;
//     });
//   }, []);

//   // Save all assignment changes
//   const saveAssignments = async () => {
//     if (Object.keys(changes).length === 0) {
//       handleSnackbarOpen("No changes to save");
//       return;
//     }

//     setLoading(true);
//     try {
//       const results = [];

//       // Process each change
//       for (const [taskId, employeeId] of Object.entries(changes)) {
//         try {
//           // Skip if taskId is invalid
//           if (!taskId || !isValidObjectId(taskId)) {
//             console.error(`Invalid task ID: ${taskId}`);
//             continue;
//           }

//           // Find the task to get customerId
//           const task = tasks.find((t) => t._id === taskId);
//           if (!task) {
//             console.error(`Task not found: ${taskId}`);
//             continue;
//           }

//           // Make API call
//           const result = await handleAssignTask(
//             taskId,
//             task.customer?._id || null,
//             employeeId // can be null for unassignment
//           );

//           results.push({
//             taskId,
//             success: true,
//             message: result.message,
//           });
//         } catch (error) {
//           console.error(`Error assigning task ${taskId}:`, error);
//           results.push({
//             taskId,
//             success: false,
//             message:
//               error.response?.data?.message ||
//               `Failed to assign task ${taskId}`,
//           });
//         }
//       }

//       // Check results
//       const successCount = results.filter((r) => r.success).length;
//       const totalChanges = Object.keys(changes).length;

//       if (successCount === totalChanges) {
//         handleSnackbarOpen(
//           `All ${successCount} assignments saved successfully`
//         );
//       } else {
//         handleSnackbarOpen(
//           `${successCount} of ${totalChanges} changes saved. ` +
//             `${totalChanges - successCount} failed.`
//         );
//       }

//       // Refresh data and reset changes
//       fetchTasks();
//       setChanges({});
//     } catch (error) {
//       console.error("Error in assignment process:", error);
//       handleSnackbarOpen("Error during assignment process");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to validate MongoDB ObjectId
//   const isValidObjectId = (id) => {
//     return /^[0-9a-fA-F]{24}$/.test(id);
//   };

//   // const clearAssignments = () => {
//   //   setChanges({});
//   //   // Reset UI to original assignments
//   //   const initialAssignments = {};
//   //   tasks.forEach(task => {
//   //     if (task.employee?._id) {
//   //       initialAssignments[task._id] = task.employee._id;
//   //     }
//   //   });
//   //   setAssignments(initialAssignments);
//   // };

//   const clearAssignments = () => {
//     setChanges({});
//     // Reset by fetching all tasks again
//     fetchTasks().then(() => {
//       // After fetch, reset assignments to only include saved assignments
//       const initialAssignments = {};
//       tasks.forEach((task) => {
//         if (task.employee?._id) {
//           initialAssignments[task._id] = task.employee._id;
//         }
//       });
//       setAssignments(initialAssignments);
//     });
//   };

//   // Get tasks assigned to a specific employee
//   // const getAssignedTasksForEmployee = (employeeId) => {
//   //   return tasks
//   //     .filter((task) => assignments[task._id] === employeeId)
//   //     .sort((a, b) => {
//   //       // Sort by whether the task was recently changed
//   //       const aChanged = changes[a._id] !== undefined;
//   //       const bChanged = changes[b._id] !== undefined;
//   //       return bChanged - aChanged;
//   //     });
//   // };

//   const getAssignedTasksForEmployee = (employeeId) => {
//     return tasks
//       .filter((task) => {
//         // Original assignment from server
//         const originalAssignment = task.employee?._id === employeeId;

//         // Pending assignment in changes
//         const pendingAssignment = assignments[task._id] === employeeId;

//         // Task is either originally assigned or pending assignment to this employee
//         // AND not pending assignment to someone else (unless it's this employee)
//         return (
//           (originalAssignment || pendingAssignment) &&
//           (!assignments[task._id] || assignments[task._id] === employeeId)
//         );
//       })
//       .sort((a, b) => {
//         // Sort by whether the task was recently changed
//         const aChanged = changes[a._id] !== undefined;
//         const bChanged = changes[b._id] !== undefined;
//         return bChanged - aChanged;
//       });
//   };

//   return (
//     <Fade in={true} timeout={500}>
//       <Box sx={{ p: 3 }}>
//         <Grow in={true} timeout={600}>
//           <Container elevation={3}>
//             <Typography
//               variant="h4"
//               gutterBottom
//               sx={{ fontWeight: 600, mb: 3 }}
//             >
//               Task Assignment Board
//             </Typography>

//             {/* Search and Filter Section */}
//             <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//               <TextField
//                 label="Search Tasks"
//                 variant="outlined"
//                 fullWidth
//                 value={taskSearch}
//                 onChange={(e) => setTaskSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <Search sx={{ color: "action.active", mr: 1 }} />
//                   ),
//                   endAdornment: taskSearch && (
//                     <IconButton onClick={() => setTaskSearch("")}>
//                       <Clear fontSize="small" />
//                     </IconButton>
//                   ),
//                 }}
//               />
//               <TextField
//                 label="Search Employees"
//                 variant="outlined"
//                 fullWidth
//                 value={employeeSearch}
//                 onChange={(e) => setEmployeeSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <Search sx={{ color: "action.active", mr: 1 }} />
//                   ),
//                   endAdornment: employeeSearch && (
//                     <IconButton onClick={() => setEmployeeSearch("")}>
//                       <Clear fontSize="small" />
//                     </IconButton>
//                   ),
//                 }}
//               />
//             </Box>

//             {/* Action Buttons */}
//             <Box
//               sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
//             >
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <Zoom in={true} style={{ transitionDelay: "100ms" }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<Add />}
//                     onClick={() => setOpenDialog(true)}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Create Task
//                   </Button>
//                 </Zoom>
//                 <Zoom in={true} style={{ transitionDelay: "150ms" }}>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={clearAssignments}
//                     disabled={Object.keys(changes).length === 0}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Discard Changes
//                   </Button>
//                 </Zoom>
//               </Box>
//               <Zoom in={true} style={{ transitionDelay: "200ms" }}>
//                 <Button
//                   variant="contained"
//                   color="success"
//                   onClick={saveAssignments}
//                   disabled={loading || Object.keys(changes).length === 0}
//                   startIcon={
//                     loading ? (
//                       <CircularProgress size={20} color="inherit" />
//                     ) : (
//                       <CheckCircle />
//                     )
//                   }
//                   sx={{ borderRadius: 2 }}
//                 >
//                   {loading ? "Saving..." : "Save Changes"}
//                 </Button>
//               </Zoom>
//             </Box>

//             {/* Drag and Drop Board */}
//             <DragDropContext onDragEnd={onDragEnd}>
//               <Grid container spacing={3}>
//                 {/* Tasks Column */}
//                 <Grid item xs={12} md={4}>
//                   <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//                     Available Tasks ({filteredTasks.length})
//                   </Typography>
//                   <Droppable droppableId="tasks">
//                     {(provided) => (
//                       <TaskList
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                       >
//                         {filteredTasks.length === 0 ? (
//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                             sx={{ textAlign: "center", mt: 2 }}
//                           >
//                             No tasks available
//                           </Typography>
//                         ) : (
//                           filteredTasks.map((task, index) => (
//                             <Draggable
//                               key={task._id}
//                               draggableId={task._id}
//                               index={index}
//                             >
//                               {(provided, snapshot) => (
//                                 <TaskItem
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   isdragging={snapshot.isDragging.toString()}
//                                   elevation={snapshot.isDragging ? 3 : 1}
//                                 >
//                                   <Box
//                                     sx={{
//                                       display: "flex",
//                                       justifyContent: "space-between",
//                                     }}
//                                   >
//                                     <Box>
//                                       <Typography
//                                         variant="subtitle1"
//                                         sx={{ fontWeight: 500 }}
//                                       >
//                                         {task.title}
//                                       </Typography>
//                                       <Typography
//                                         variant="body2"
//                                         color="text.secondary"
//                                       >
//                                         {task.description.substring(0, 60)}...
//                                       </Typography>
//                                       <Typography
//                                         variant="caption"
//                                         display="block"
//                                       >
//                                         Created:{" "}
//                                         {moment(task.createdAt).format(
//                                           "MMM D, YYYY"
//                                         )}
//                                       </Typography>
//                                     </Box>
//                                     <Box sx={{ display: "flex", gap: 1 }}>
//                                       <Tooltip title="Edit" arrow>
//                                         <IconButton
//                                           size="small"
//                                           onClick={() => {
//                                             setEditTask(task);
//                                             setOpenEditDialog(true);
//                                           }}
//                                         >
//                                           <Edit fontSize="small" />
//                                         </IconButton>
//                                       </Tooltip>
//                                       <Tooltip title="Delete" arrow>
//                                         <IconButton
//                                           size="small"
//                                           onClick={() => handleDelete(task._id)}
//                                         >
//                                           <Delete fontSize="small" />
//                                         </IconButton>
//                                       </Tooltip>
//                                     </Box>
//                                   </Box>
//                                 </TaskItem>
//                               )}
//                             </Draggable>
//                           ))
//                         )}
//                         {provided.placeholder}
//                       </TaskList>
//                     )}
//                   </Droppable>
//                 </Grid>

//                 {/* Employees Columns */}
//                 {filteredEmployees.map((employee) => (
//                   <Grid item xs={12} md={4} key={employee._id}>
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                       <Avatar
//                         sx={{
//                           width: 32,
//                           height: 32,
//                           mr: 2,
//                           bgcolor: "primary.main",
//                         }}
//                         src={employee.profileImage}
//                       >
//                         {employee.name.charAt(0)}
//                       </Avatar>
//                       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                         {employee.name}
//                       </Typography>
//                     </Box>
//                     <Droppable droppableId={`employee-${employee._id}`}>
//                       {(provided) => (
//                         <EmployeeList
//                           ref={provided.innerRef}
//                           {...provided.droppableProps}
//                         >
//                           {getAssignedTasksForEmployee(employee._id).map(
//                             (task, index) => (
//                               <Draggable
//                                 key={task._id}
//                                 draggableId={task._id}
//                                 index={index}
//                               >
//                                 {(provided, snapshot) => {
//                                   const isChanged =
//                                     changes[task._id] !== undefined;
//                                   return (
//                                     <EmployeeItem
//                                       ref={provided.innerRef}
//                                       {...provided.draggableProps}
//                                       {...provided.dragHandleProps}
//                                       isdragging={snapshot.isDragging.toString()}
//                                       elevation={snapshot.isDragging ? 3 : 1}
//                                       sx={{
//                                         borderLeft: isChanged
//                                           ? "4px solid"
//                                           : "none",
//                                         borderColor: isChanged
//                                           ? "primary.main"
//                                           : "transparent",
//                                       }}
//                                     >
//                                       <Typography
//                                         variant="subtitle1"
//                                         sx={{ fontWeight: 500 }}
//                                       >
//                                         {task.title}
//                                       </Typography>
//                                       <Typography
//                                         variant="body2"
//                                         color="text.secondary"
//                                       >
//                                         {task.description.substring(0, 60)}...
//                                       </Typography>
//                                       <Box
//                                         sx={{
//                                           display: "flex",
//                                           alignItems: "center",
//                                           mt: 1,
//                                         }}
//                                       >
//                                         <Chip
//                                           label={
//                                             isChanged
//                                               ? "Pending Save"
//                                               : "Assigned"
//                                           }
//                                           size="small"
//                                           color={
//                                             isChanged ? "primary" : "success"
//                                           }
//                                           variant="outlined"
//                                         />
//                                         {isChanged && (
//                                           <Typography
//                                             variant="caption"
//                                             color="primary"
//                                             sx={{ ml: 1 }}
//                                           >
//                                             (Changed)
//                                           </Typography>
//                                         )}
//                                       </Box>
//                                     </EmployeeItem>
//                                   );
//                                 }}
//                               </Draggable>
//                             )
//                           )}
//                           {provided.placeholder}
//                         </EmployeeList>
//                       )}
//                     </Droppable>
//                   </Grid>
//                 ))}
//               </Grid>
//             </DragDropContext>
//           </Container>
//         </Grow>

//         {/* Create Task Dialog */}
//         {/* <Dialog
//           open={openDialog}
//           onClose={() => setOpenDialog(false)}
//           PaperProps={{
//             sx: {
//               borderRadius: 4,
//               minWidth: 500,
//             },
//           }}
//         >
//           <DialogTitle sx={{ fontWeight: 600 }}>Create New Task</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Title"
//               fullWidth
//               margin="normal"
//               value={newTask.title}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, title: e.target.value })
//               }
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               label="Description"
//               fullWidth
//               margin="normal"
//               multiline
//               rows={3}
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//               sx={{ mb: 2 }}
//             />
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Customer</InputLabel>
//               <Select
//                 value={newTask.customerId}
//                 onChange={(e) =>
//                   setNewTask({ ...newTask, customerId: e.target.value })
//                 }
//               >
//                 {users
//                   .filter((user) => user.role === "customer")
//                   .map((user) => (
//                     <MenuItem key={user._id} value={user._id}>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Person sx={{ mr: 1 }} />
//                         <Typography>{user.name}</Typography>
//                       </Box>
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions sx={{ p: 3 }}>
//             <Button
//               onClick={() => setOpenDialog(false)}
//               variant="outlined"
//               sx={{ borderRadius: 2, px: 3 }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleCreate}
//               variant="contained"
//               sx={{ borderRadius: 2, px: 3 }}
//             >
//               Create Task
//             </Button>
//           </DialogActions>
//         </Dialog> */}
//         <Dialog
//           open={openDialog}
//           onClose={() => setOpenDialog(false)}
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               width: { xs: "90%", sm: "80%", md: "600px" },
//               maxWidth: "100%",
//               mx: "auto",
//               boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//             },
//           }}
//         >
//           <DialogTitle
//             sx={{
//               fontWeight: 700,
//               fontSize: "1.5rem",
//               color: "primary.main",
//               pt: 3,
//               pb: 1,
//               borderBottom: "1px solid",
//               borderColor: "divider",
//             }}
//           >
//             Create New Task
//           </DialogTitle>

//           <DialogContent sx={{ py: 3 }}>
//             <TextField
//               label="Title"
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               value={newTask.title}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, title: e.target.value })
//               }
//               sx={{
//                 mb: 2,
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 2,
//                 },
//               }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />

//             <TextField
//               label="Description"
//               fullWidth
//               margin="normal"
//               multiline
//               rows={4}
//               variant="outlined"
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//               sx={{
//                 mb: 2,
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 2,
//                 },
//               }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />

//             <FormControl
//               fullWidth
//               margin="normal"
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 2,
//                 },
//               }}
//             >
//               <InputLabel shrink>Customer</InputLabel>
//               <Select
//                 value={newTask.customerId}
//                 onChange={(e) =>
//                   setNewTask({ ...newTask, customerId: e.target.value })
//                 }
//                 variant="outlined"
//                 label="Customer"
//                 sx={{
//                   "& .MuiSelect-select": {
//                     display: "flex",
//                     alignItems: "center",
//                     py: 1.5,
//                   },
//                 }}
//               >
//                 {users
//                   .filter((user) => user.role === "customer")
//                   .map((user) => (
//                     <MenuItem key={user._id} value={user._id}>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Person sx={{ mr: 1, color: "action.active" }} />
//                         <Typography variant="body1">{user.name}</Typography>
//                       </Box>
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </DialogContent>

//           <DialogActions
//             sx={{
//               px: 3,
//               py: 2,
//               borderTop: "1px solid",
//               borderColor: "divider",
//             }}
//           >
//             <Button
//               onClick={() => setOpenDialog(false)}
//               variant="outlined"
//               color="secondary"
//               sx={{
//                 borderRadius: 2,
//                 px: 3,
//                 py: 1,
//                 textTransform: "none",
//                 fontSize: "0.875rem",
//                 fontWeight: 500,
//                 "&:hover": {
//                   backgroundColor: "action.hover",
//                 },
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               onClick={handleCreate}
//               variant="contained"
//               color="primary"
//               sx={{
//                 borderRadius: 2,
//                 px: 3,
//                 py: 1,
//                 textTransform: "none",
//                 fontSize: "0.875rem",
//                 fontWeight: 500,
//                 boxShadow: "none",
//                 "&:hover": {
//                   boxShadow: "none",
//                   backgroundColor: "primary.dark",
//                 },
//               }}
//             >
//               Create Task
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Edit Task Dialog */}
//         {/* {editTask && (
//           <Dialog
//             open={openEditDialog}
//             onClose={() => setOpenEditDialog(false)}
//             PaperProps={{
//               sx: {
//                 borderRadius: 4,
//                 minWidth: 500,
//               },
//             }}
//           >
//             <DialogTitle sx={{ fontWeight: 600 }}>Edit Task</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Title"
//                 fullWidth
//                 margin="normal"
//                 value={editTask.title}
//                 onChange={(e) =>
//                   setEditTask({ ...editTask, title: e.target.value })
//                 }
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 label="Description"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={3}
//                 value={editTask.description}
//                 onChange={(e) =>
//                   setEditTask({ ...editTask, description: e.target.value })
//                 }
//                 sx={{ mb: 2 }}
//               />
//             </DialogContent>
//             <DialogActions sx={{ p: 3 }}>
//               <Button
//                 onClick={() => setOpenEditDialog(false)}
//                 variant="outlined"
//                 sx={{ borderRadius: 2, px: 3 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleUpdate}
//                 variant="contained"
//                 sx={{ borderRadius: 2, px: 3 }}
//               >
//                 Update Task
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )} */}

//         {editTask && (
//           <Dialog
//             open={openEditDialog}
//             onClose={() => setOpenEditDialog(false)}
//             PaperProps={{
//               sx: {
//                 borderRadius: 3,
//                 width: { xs: "90%", sm: "80%", md: "600px" },
//                 maxWidth: "100%",
//                 mx: "auto",
//                 boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//               },
//             }}
//           >
//             <DialogTitle
//               sx={{
//                 fontWeight: 700,
//                 fontSize: "1.5rem",
//                 color: "primary.main",
//                 pt: 3,
//                 pb: 1,
//                 borderBottom: "1px solid",
//                 borderColor: "divider",
//               }}
//             >
//               Edit Task
//             </DialogTitle>

//             <DialogContent sx={{ py: 3 }}>
//               <TextField
//                 label="Title"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 value={editTask.title}
//                 onChange={(e) =>
//                   setEditTask({ ...editTask, title: e.target.value })
//                 }
//                 sx={{
//                   mb: 2,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />

//               <TextField
//                 label="Description"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={4}
//                 variant="outlined"
//                 value={editTask.description}
//                 onChange={(e) =>
//                   setEditTask({ ...editTask, description: e.target.value })
//                 }
//                 sx={{
//                   mb: 1,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//             </DialogContent>

//             <DialogActions
//               sx={{
//                 px: 3,
//                 py: 2,
//                 borderTop: "1px solid",
//                 borderColor: "divider",
//               }}
//             >
//               <Button
//                 onClick={() => setOpenEditDialog(false)}
//                 variant="outlined"
//                 color="secondary"
//                 sx={{
//                   borderRadius: 2,
//                   px: 3,
//                   py: 1,
//                   textTransform: "none",
//                   fontSize: "0.875rem",
//                   fontWeight: 500,
//                   "&:hover": {
//                     backgroundColor: "action.hover",
//                   },
//                 }}
//               >
//                 Cancel
//               </Button>

//               <Button
//                 onClick={handleUpdate}
//                 variant="contained"
//                 color="primary"
//                 sx={{
//                   borderRadius: 2,
//                   px: 3,
//                   py: 1,
//                   textTransform: "none",
//                   fontSize: "0.875rem",
//                   fontWeight: 500,
//                   boxShadow: "none",
//                   "&:hover": {
//                     boxShadow: "none",
//                     backgroundColor: "primary.dark",
//                   },
//                 }}
//               >
//                 Update Task
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={handleSnackbarClose}
//           message={snackbarMessage}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         />
//       </Box>
//     </Fade>
//   );
// };

// export default AssignUserToEmployee;

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Tooltip,
//   IconButton,
//   Snackbar,
//   Paper,
//   Box,
//   Typography,
//   Avatar,
//   Chip,
//   Fade,
//   Grow,
//   Zoom,
//   Divider,
//   CircularProgress,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//   Edit,
//   Delete,
//   Add,
//   Assignment,
//   Person,
//   Email,
//   CheckCircle,
//   Cancel,
//   Search,
//   Clear,
// } from "@mui/icons-material";
// import { useGlobalContext } from "../../context/GlobalContext";
// import { styled } from "@mui/material/styles";
// import moment from "moment";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // Styled components
// const Container = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: 16,
//   backgroundColor: theme.palette.background.paper,
//   boxShadow: theme.shadows[3],
//   transition: "all 0.3s ease",
//   "&:hover": {
//     boxShadow: theme.shadows[6],
//   },
// }));

// const TaskList = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderRadius: 12,
//   backgroundColor: theme.palette.grey[100],
//   minHeight: 400,
//   transition: "all 0.3s ease",
// }));

// const EmployeeList = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderRadius: 12,
//   backgroundColor: theme.palette.grey[100],
//   minHeight: 400,
//   transition: "all 0.3s ease",
// }));

// const TaskItem = styled(Paper)(({ theme, isdragging }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(1),
//   borderRadius: 8,
//   backgroundColor:
//     isdragging === "true"
//       ? theme.palette.primary.light
//       : theme.palette.common.white,
//   boxShadow: theme.shadows[1],
//   cursor: "grab",
//   transition: "all 0.2s ease",
//   "&:hover": {
//     backgroundColor: theme.palette.action.hover,
//     transform: "translateY(-2px)",
//     boxShadow: theme.shadows[2],
//   },
// }));

// const EmployeeItem = styled(Paper)(({ theme, isdragging }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(1),
//   borderRadius: 8,
//   backgroundColor:
//     isdragging === "true"
//       ? theme.palette.secondary.light
//       : theme.palette.common.white,
//   boxShadow: theme.shadows[1],
//   cursor: "grab",
//   transition: "all 0.2s ease",
//   "&:hover": {
//     backgroundColor: theme.palette.action.hover,
//     transform: "translateY(-2px)",
//     boxShadow: theme.shadows[2],
//   },
// }));

// const AssignUserToEmployee = () => {
//   const {
//     tasks,
//     users,
//     handleCreateTask,
//     handleUpdateTask,
//     handleDeleteTask,
//     handleAssignTask,
//     fetchTasks,
//     fetchUsers,
//   } = useGlobalContext();

//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     customerId: "",
//   });
//   const [editTask, setEditTask] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [taskSearch, setTaskSearch] = useState("");
//   const [employeeSearch, setEmployeeSearch] = useState("");
//   const [assignments, setAssignments] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [changes, setChanges] = useState({});

//   useEffect(() => {
//     fetchUsers();
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     const initialAssignments = {};
//     tasks.forEach((task) => {
//       if (task.employee?._id) {
//         initialAssignments[task._id] = task.employee._id;
//       }
//     });
//     setAssignments(initialAssignments);
//   }, [tasks]);

//   const handleSnackbarOpen = (message) => {
//     setSnackbarMessage(message);
//     setSnackbarOpen(true);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleCreate = async () => {
//     const result = await handleCreateTask(newTask);
//     handleSnackbarOpen(result.message);
//     if (result.success) {
//       setOpenDialog(false);
//       setNewTask({ title: "", description: "", customerId: "" });
//       fetchTasks();
//     }
//   };

//   const handleUpdate = async () => {
//     if (!editTask || !editTask._id) {
//       handleSnackbarOpen("Invalid task data");
//       return;
//     }

//     try {
//       const result = await handleUpdateTask({
//         ...editTask,
//         id: editTask._id,
//       });
//       handleSnackbarOpen(result.message);
//       if (result.success) {
//         setOpenEditDialog(false);
//         setEditTask(null);
//         fetchTasks();
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//       handleSnackbarOpen(
//         error.response?.data?.message || "Error updating task"
//       );
//     }
//   };

//   const handleDelete = async (taskId) => {
//     const result = await handleDeleteTask(taskId);
//     handleSnackbarOpen(result.message);
//     if (result.success) {
//       fetchTasks();
//     }
//   };

//   const filteredTasks = tasks.filter((task) => {
//     const matchesSearch =
//       task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
//       task.description.toLowerCase().includes(taskSearch.toLowerCase());
//     const isUnassigned =
//       !task.employee?._id && !Object.values(assignments).includes(task._id);

//     return matchesSearch && isUnassigned;
//   });

//   const filteredEmployees = users.filter((user) => {
//     return (
//       user.role === "employee" &&
//       user.name.toLowerCase().includes(employeeSearch.toLowerCase())
//     );
//   });

//   const onDragEnd = useCallback((result) => {
//     const { source, destination, draggableId } = result;
//     if (!destination) {
//       return;
//     }
//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }
//     setChanges((prev) => {
//       const newChanges = { ...prev };
//       if (destination.droppableId.startsWith("employee-")) {
//         const employeeId = destination.droppableId.replace("employee-", "");
//         newChanges[draggableId] = employeeId;
//       }
//       if (destination.droppableId === "tasks") {
//         newChanges[draggableId] = null;
//       }

//       return newChanges;
//     });
//     setAssignments((prev) => {
//       const newAssignments = { ...prev };
//       if (destination.droppableId.startsWith("employee-")) {
//         const employeeId = destination.droppableId.replace("employee-", "");
//         newAssignments[draggableId] = employeeId;
//       }
//       if (destination.droppableId === "tasks") {
//         delete newAssignments[draggableId];
//       }

//       return newAssignments;
//     });
//   }, []);
//   const saveAssignments = async () => {
//     if (Object.keys(changes).length === 0) {
//       handleSnackbarOpen("No changes to save");
//       return;
//     }

//     setLoading(true);
//     try {
//       const results = [];
//       for (const [taskId, employeeId] of Object.entries(changes)) {
//         try {
//           if (!taskId || !isValidObjectId(taskId)) {
//             console.error(`Invalid task ID: ${taskId}`);
//             continue;
//           }
//           const task = tasks.find((t) => t._id === taskId);
//           if (!task) {
//             console.error(`Task not found: ${taskId}`);
//             continue;
//           }
//           const result = await handleAssignTask(
//             taskId,
//             task.customer?._id || null,
//             employeeId
//           );

//           results.push({
//             taskId,
//             success: true,
//             message: result.message,
//           });
//         } catch (error) {
//           console.error(`Error assigning task ${taskId}:`, error);
//           results.push({
//             taskId,
//             success: false,
//             message:
//               error.response?.data?.message ||
//               `Failed to assign task ${taskId}`,
//           });
//         }
//       }
//       const successCount = results.filter((r) => r.success).length;
//       const totalChanges = Object.keys(changes).length;

//       if (successCount === totalChanges) {
//         handleSnackbarOpen(
//           `All ${successCount} assignments saved successfully`
//         );
//       } else {
//         handleSnackbarOpen(
//           `${successCount} of ${totalChanges} changes saved. ` +
//             `${totalChanges - successCount} failed.`
//         );
//       }
//       fetchTasks();
//       setChanges({});
//     } catch (error) {
//       console.error("Error in assignment process:", error);
//       handleSnackbarOpen("Error during assignment process");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const isValidObjectId = (id) => {
//     return /^[0-9a-fA-F]{24}$/.test(id);
//   };

//   const clearAssignments = () => {
//     setChanges({});
//     fetchTasks().then(() => {
//       const initialAssignments = {};
//       tasks.forEach((task) => {
//         if (task.employee?._id) {
//           initialAssignments[task._id] = task.employee._id;
//         }
//       });
//       setAssignments(initialAssignments);
//     });
//   };

//   const getAssignedTasksForEmployee = (employeeId) => {
//     return tasks
//       .filter((task) => {
//         const originalAssignment = task.employee?._id === employeeId;
//         const pendingAssignment = assignments[task._id] === employeeId;
//         return (
//           (originalAssignment || pendingAssignment) &&
//           (!assignments[task._id] || assignments[task._id] === employeeId)
//         );
//       })
//       .sort((a, b) => {
//         const aChanged = changes[a._id] !== undefined;
//         const bChanged = changes[b._id] !== undefined;
//         return bChanged - aChanged;
//       });
//   };

//   return (
//     <Fade in={true} timeout={500}>
//       <Box sx={{ p: 3 }}>
//         <Grow in={true} timeout={600}>
//           <Container elevation={3}>
//             <Typography
//               variant="h4"
//               gutterBottom
//               sx={{ fontWeight: 600, mb: 3 }}
//             >
//               Task Assignment Board
//             </Typography>

//             {/* Search and Filter Section */}
//             <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//               <TextField
//                 label="Search Tasks"
//                 variant="outlined"
//                 fullWidth
//                 value={taskSearch}
//                 onChange={(e) => setTaskSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <Search sx={{ color: "action.active", mr: 1 }} />
//                   ),
//                   endAdornment: taskSearch && (
//                     <IconButton onClick={() => setTaskSearch("")}>
//                       <Clear fontSize="small" />
//                     </IconButton>
//                   ),
//                 }}
//               />
//               <TextField
//                 label="Search Employees"
//                 variant="outlined"
//                 fullWidth
//                 value={employeeSearch}
//                 onChange={(e) => setEmployeeSearch(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <Search sx={{ color: "action.active", mr: 1 }} />
//                   ),
//                   endAdornment: employeeSearch && (
//                     <IconButton onClick={() => setEmployeeSearch("")}>
//                       <Clear fontSize="small" />
//                     </IconButton>
//                   ),
//                 }}
//               />
//             </Box>

//             {/* Action Buttons */}
//             <Box
//               sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
//             >
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <Zoom in={true} style={{ transitionDelay: "100ms" }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<Add />}
//                     onClick={() => setOpenDialog(true)}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Create Task
//                   </Button>
//                 </Zoom>
//                 <Zoom in={true} style={{ transitionDelay: "150ms" }}>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={clearAssignments}
//                     disabled={Object.keys(changes).length === 0}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Discard Changes
//                   </Button>
//                 </Zoom>
//               </Box>
//               <Zoom in={true} style={{ transitionDelay: "200ms" }}>
//                 <Button
//                   variant="contained"
//                   color="success"
//                   onClick={saveAssignments}
//                   disabled={loading || Object.keys(changes).length === 0}
//                   startIcon={
//                     loading ? (
//                       <CircularProgress size={20} color="inherit" />
//                     ) : (
//                       <CheckCircle />
//                     )
//                   }
//                   sx={{ borderRadius: 2 }}
//                 >
//                   {loading ? "Saving..." : "Save Changes"}
//                 </Button>
//               </Zoom>
//             </Box>

//             {/* Drag and Drop Board */}
//             <DragDropContext onDragEnd={onDragEnd}>
//               <Grid container spacing={3}>
//                 {/* Tasks Column */}
//                 <Grid item xs={12} md={4}>
//                   <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//                     Available Tasks ({filteredTasks.length})
//                   </Typography>
//                   <Droppable droppableId="tasks">
//                     {(provided) => (
//                       <TaskList
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                       >
//                         {filteredTasks.length === 0 ? (
//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                             sx={{ textAlign: "center", mt: 2 }}
//                           >
//                             No tasks available
//                           </Typography>
//                         ) : (
//                           filteredTasks.map((task, index) => (
//                             <Draggable
//                               key={task._id}
//                               draggableId={task._id}
//                               index={index}
//                             >
//                               {(provided, snapshot) => (
//                                 <TaskItem
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   isdragging={snapshot.isDragging.toString()}
//                                   elevation={snapshot.isDragging ? 3 : 1}
//                                 >
//                                   <Box
//                                     sx={{
//                                       display: "flex",
//                                       justifyContent: "space-between",
//                                     }}
//                                   >
//                                     <Box>
//                                       <Typography
//                                         variant="subtitle1"
//                                         sx={{ fontWeight: 500 }}
//                                       >
//                                         {task.title}
//                                       </Typography>
//                                       <Typography
//                                         variant="body2"
//                                         color="text.secondary"
//                                       >
//                                         {task.description.substring(0, 60)}...
//                                       </Typography>
//                                       <Typography
//                                         variant="caption"
//                                         display="block"
//                                       >
//                                         Created:{" "}
//                                         {moment(task.createdAt).format(
//                                           "MMM D, YYYY"
//                                         )}
//                                       </Typography>
//                                     </Box>
//                                     <Box sx={{ display: "flex", gap: 1 }}>
//                                       <Tooltip title="Edit" arrow>
//                                         <IconButton
//                                           size="small"
//                                           onClick={() => {
//                                             setEditTask(task);
//                                             setOpenEditDialog(true);
//                                           }}
//                                         >
//                                           <Edit fontSize="small" />
//                                         </IconButton>
//                                       </Tooltip>
//                                       <Tooltip title="Delete" arrow>
//                                         <IconButton
//                                           size="small"
//                                           onClick={() => handleDelete(task._id)}
//                                         >
//                                           <Delete fontSize="small" />
//                                         </IconButton>
//                                       </Tooltip>
//                                     </Box>
//                                   </Box>
//                                 </TaskItem>
//                               )}
//                             </Draggable>
//                           ))
//                         )}
//                         {provided.placeholder}
//                       </TaskList>
//                     )}
//                   </Droppable>
//                 </Grid>

//                 {/* Employees Columns */}
//                 {filteredEmployees.map((employee) => (
//                   <Grid item xs={12} md={4} key={employee._id}>
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                       <Avatar
//                         sx={{
//                           width: 32,
//                           height: 32,
//                           mr: 2,
//                           bgcolor: "primary.main",
//                         }}
//                         src={employee.profileImage}
//                       >
//                         {employee.name.charAt(0)}
//                       </Avatar>
//                       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                         {employee.name}
//                       </Typography>
//                     </Box>
//                     <Droppable droppableId={`employee-${employee._id}`}>
//                       {(provided) => (
//                         <EmployeeList
//                           ref={provided.innerRef}
//                           {...provided.droppableProps}
//                         >
//                           {getAssignedTasksForEmployee(employee._id).map(
//                             (task, index) => (
//                               <Draggable
//                                 key={task._id}
//                                 draggableId={task._id}
//                                 index={index}
//                               >
//                                 {(provided, snapshot) => {
//                                   const isChanged =
//                                     changes[task._id] !== undefined;
//                                   return (
//                                     <EmployeeItem
//                                       ref={provided.innerRef}
//                                       {...provided.draggableProps}
//                                       {...provided.dragHandleProps}
//                                       isdragging={snapshot.isDragging.toString()}
//                                       elevation={snapshot.isDragging ? 3 : 1}
//                                       sx={{
//                                         borderLeft: isChanged
//                                           ? "4px solid"
//                                           : "none",
//                                         borderColor: isChanged
//                                           ? "primary.main"
//                                           : "transparent",
//                                       }}
//                                     >
//                                       <Typography
//                                         variant="subtitle1"
//                                         sx={{ fontWeight: 500 }}
//                                       >
//                                         {task.title}
//                                       </Typography>
//                                       <Typography
//                                         variant="body2"
//                                         color="text.secondary"
//                                       >
//                                         {task.description.substring(0, 60)}...
//                                       </Typography>
//                                       <Box
//                                         sx={{
//                                           display: "flex",
//                                           alignItems: "center",
//                                           mt: 1,
//                                         }}
//                                       >
//                                         <Chip
//                                           label={
//                                             isChanged
//                                               ? "Pending Save"
//                                               : "Assigned"
//                                           }
//                                           size="small"
//                                           color={
//                                             isChanged ? "primary" : "success"
//                                           }
//                                           variant="outlined"
//                                         />
//                                         {isChanged && (
//                                           <Typography
//                                             variant="caption"
//                                             color="primary"
//                                             sx={{ ml: 1 }}
//                                           >
//                                             (Changed)
//                                           </Typography>
//                                         )}
//                                       </Box>
//                                     </EmployeeItem>
//                                   );
//                                 }}
//                               </Draggable>
//                             )
//                           )}
//                           {provided.placeholder}
//                         </EmployeeList>
//                       )}
//                     </Droppable>
//                   </Grid>
//                 ))}
//               </Grid>
//             </DragDropContext>
//           </Container>
//         </Grow>
//         <Dialog
//           open={openDialog}
//           onClose={() => setOpenDialog(false)}
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               width: { xs: "90%", sm: "80%", md: "600px" },
//               maxWidth: "100%",
//               mx: "auto",
//               boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//             },
//           }}
//         >
//           <DialogTitle
//             sx={{
//               fontWeight: 700,
//               fontSize: "1.5rem",
//               color: "primary.main",
//               pt: 3,
//               pb: 1,
//               borderBottom: "1px solid",
//               borderColor: "divider",
//             }}
//           >
//             Create New Task
//           </DialogTitle>

//           <DialogContent sx={{ py: 3 }}>
//             <TextField
//               label="Title"
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               value={newTask.title}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, title: e.target.value })
//               }
//               sx={{
//                 mb: 2,
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 2,
//                 },
//               }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />

//             <TextField
//               label="Description"
//               fullWidth
//               margin="normal"
//               multiline
//               rows={4}
//               variant="outlined"
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//               sx={{
//                 mb: 2,
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 2,
//                 },
//               }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />

//             <FormControl
//               fullWidth
//               margin="normal"
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 2,
//                 },
//               }}
//             >
//               <InputLabel shrink>Customer</InputLabel>
//               <Select
//                 value={newTask.customerId}
//                 onChange={(e) =>
//                   setNewTask({ ...newTask, customerId: e.target.value })
//                 }
//                 variant="outlined"
//                 label="Customer"
//                 sx={{
//                   "& .MuiSelect-select": {
//                     display: "flex",
//                     alignItems: "center",
//                     py: 1.5,
//                   },
//                 }}
//               >
//                 {users
//                   .filter((user) => user.role === "customer")
//                   .map((user) => (
//                     <MenuItem key={user._id} value={user._id}>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Person sx={{ mr: 1, color: "action.active" }} />
//                         <Typography variant="body1">{user.name}</Typography>
//                       </Box>
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </DialogContent>

//           <DialogActions
//             sx={{
//               px: 3,
//               py: 2,
//               borderTop: "1px solid",
//               borderColor: "divider",
//             }}
//           >
//             <Button
//               onClick={() => setOpenDialog(false)}
//               variant="outlined"
//               color="secondary"
//               sx={{
//                 borderRadius: 2,
//                 px: 3,
//                 py: 1,
//                 textTransform: "none",
//                 fontSize: "0.875rem",
//                 fontWeight: 500,
//                 "&:hover": {
//                   backgroundColor: "action.hover",
//                 },
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               onClick={handleCreate}
//               variant="contained"
//               color="primary"
//               sx={{
//                 borderRadius: 2,
//                 px: 3,
//                 py: 1,
//                 textTransform: "none",
//                 fontSize: "0.875rem",
//                 fontWeight: 500,
//                 boxShadow: "none",
//                 "&:hover": {
//                   boxShadow: "none",
//                   backgroundColor: "primary.dark",
//                 },
//               }}
//             >
//               Create Task
//             </Button>
//           </DialogActions>
//         </Dialog>
//         {editTask && (
//           <Dialog
//             open={openEditDialog}
//             onClose={() => setOpenEditDialog(false)}
//             PaperProps={{
//               sx: {
//                 borderRadius: 3,
//                 width: { xs: "90%", sm: "80%", md: "600px" },
//                 maxWidth: "100%",
//                 mx: "auto",
//                 boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//               },
//             }}
//           >
//             <DialogTitle
//               sx={{
//                 fontWeight: 700,
//                 fontSize: "1.5rem",
//                 color: "primary.main",
//                 pt: 3,
//                 pb: 1,
//                 borderBottom: "1px solid",
//                 borderColor: "divider",
//               }}
//             >
//               Edit Task
//             </DialogTitle>

//             <DialogContent sx={{ py: 3 }}>
//               <TextField
//                 label="Title"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 value={editTask.title}
//                 onChange={(e) =>
//                   setEditTask({ ...editTask, title: e.target.value })
//                 }
//                 sx={{
//                   mb: 2,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />

//               <TextField
//                 label="Description"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={4}
//                 variant="outlined"
//                 value={editTask.description}
//                 onChange={(e) =>
//                   setEditTask({ ...editTask, description: e.target.value })
//                 }
//                 sx={{
//                   mb: 1,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//             </DialogContent>

//             <DialogActions
//               sx={{
//                 px: 3,
//                 py: 2,
//                 borderTop: "1px solid",
//                 borderColor: "divider",
//               }}
//             >
//               <Button
//                 onClick={() => setOpenEditDialog(false)}
//                 variant="outlined"
//                 color="secondary"
//                 sx={{
//                   borderRadius: 2,
//                   px: 3,
//                   py: 1,
//                   textTransform: "none",
//                   fontSize: "0.875rem",
//                   fontWeight: 500,
//                   "&:hover": {
//                     backgroundColor: "action.hover",
//                   },
//                 }}
//               >
//                 Cancel
//               </Button>

//               <Button
//                 onClick={handleUpdate}
//                 variant="contained"
//                 color="primary"
//                 sx={{
//                   borderRadius: 2,
//                   px: 3,
//                   py: 1,
//                   textTransform: "none",
//                   fontSize: "0.875rem",
//                   fontWeight: 500,
//                   boxShadow: "none",
//                   "&:hover": {
//                     boxShadow: "none",
//                     backgroundColor: "primary.dark",
//                   },
//                 }}
//               >
//                 Update Task
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={handleSnackbarClose}
//           message={snackbarMessage}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         />
//       </Box>
//     </Fade>
//   );
// };

// export default AssignUserToEmployee;

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
} from "@mui/icons-material";
import { useGlobalContext } from "../../context/GlobalContext";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Styled components
const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[0],
  transition: "all 0.3s ease",
  // "&:hover": {
  //   boxShadow: theme.shadows[6],
  // },
}));

const TaskList = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.grey[100],
  minHeight: 400,
  transition: "all 0.3s ease",
}));

const EmployeeList = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.grey[100],
  minHeight: 400,
  transition: "all 0.3s ease",
}));

const TaskItem = styled(Paper)(({ theme, isdragging }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: 8,
  backgroundColor:
    isdragging === "true"
      ? theme.palette.primary.light
      : theme.palette.common.white,
  boxShadow: theme.shadows[1],
  cursor: "grab",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[2],
  },
}));

const EmployeeItem = styled(Paper)(({ theme, isdragging }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: 8,
  backgroundColor:
    isdragging === "true"
      ? theme.palette.secondary.light
      : theme.palette.common.white,
  boxShadow: theme.shadows[1],
  cursor: "grab",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[2],
  },
}));

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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
      task.description.toLowerCase().includes(taskSearch.toLowerCase());
    const isUnassigned =
      !task.employee?._id && !Object.values(assignments).includes(task._id);

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

  const clearAssignments = () => {
    setChanges({});
    fetchTasks().then(() => {
      const initialAssignments = {};
      tasks.forEach((task) => {
        if (task.employee?._id) {
          initialAssignments[task._id] = task.employee._id;
        }
      });
      setAssignments(initialAssignments);
    });
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
      <Box 
      sx={{ p: 3 }}
      >
        <Grow in={true} timeout={600}>
          <Container elevation={3}>
            {/* <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Task Assignment Board
            </Typography> */}

            {/* Search and Filter Section */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
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
              />
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3, flexWrap: "wrap", }}
            >
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Zoom in={true} style={{ transitionDelay: "100ms" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => setOpenDialog(true)}
                    sx={{ borderRadius: 2 }}
                  >
                    Create 
                    {/* Task */}
                  </Button>
                </Zoom>
                <Zoom in={true} style={{ transitionDelay: "150ms" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={clearAssignments}
                    disabled={Object.keys(changes).length === 0}
                    sx={{ borderRadius: 2 }}
                  >
                    Discard 
                    {/* Changes */}
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
                  sx={{ borderRadius: 2, mt: { xs: 2, md: 0 } }}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </Zoom>
            </Box>

            {/* Drag and Drop Board */}
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid container spacing={3}>
                {/* Tasks Column */}
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Available Tasks ({filteredTasks.length})
                  </Typography>
                  <Droppable droppableId="tasks">
                    {(provided) => (
                      <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {filteredTasks.length === 0 ? (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textAlign: "center", mt: 2 }}
                          >
                            No tasks available
                          </Typography>
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
                                  elevation={snapshot.isDragging ? 3 : 1}
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
                                        sx={{ fontWeight: 500 }}
                                      >
                                        {task.title}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        {task.description.substring(0, 60)}...
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                      >
                                        Created:{" "}
                                        {moment(task.createdAt).format(
                                          "MMM D, YYYY"
                                        )}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", gap: 1, flexDirection: {xs:"column", md:"row"} }}>
                                      <Tooltip title="View Details" arrow>
                                        <IconButton
                                          size="small"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleViewTask(task);
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
                {filteredEmployees.map((employee) => (
                  <Grid item xs={12} md={4} key={employee._id}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          mr: 2,
                          bgcolor: "primary.main",
                        }}
                        src={employee.profileImage}
                      >
                        {employee.name.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {employee.name}
                      </Typography>
                    </Box>
                    <Droppable droppableId={`employee-${employee._id}`}>
                      {(provided) => (
                        <EmployeeList
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {getAssignedTasksForEmployee(employee._id).map(
                            (task, index) => (
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
                                      elevation={snapshot.isDragging ? 3 : 1}
                                      sx={{
                                        borderLeft: isChanged
                                          ? "4px solid"
                                          : "none",
                                        borderColor: isChanged
                                          ? "primary.main"
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
                                            sx={{ fontWeight: 500 }}
                                          >
                                            {task.title}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
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
                                                  ? "primary"
                                                  : "success"
                                              }
                                              variant="outlined"
                                            />
                                            {isChanged && (
                                              <Typography
                                                variant="caption"
                                                color="primary"
                                                sx={{ ml: 1 }}
                                              >
                                                (Changed)
                                              </Typography>
                                            )}
                                          </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", gap: 1, flexDirection: {xs:"column", md:"row"} }}>
                                          <Tooltip title="View Details" arrow>
                                            <IconButton
                                              size="small"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewTask(task);
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
                            )
                          )}
                          {provided.placeholder}
                        </EmployeeList>
                      )}
                    </Droppable>
                  </Grid>
                ))}
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
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "primary.main",
              pt: 3,
              pb: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            Create New Task
          </DialogTitle>

          <DialogContent sx={{ py: 3 }}>
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
                fontWeight: 500,
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
                fontWeight: 500,
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
              },
            }}
          >
            <DialogTitle
              sx={{
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "primary.main",
                pt: 3,
                pb: 1,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              Edit Task
            </DialogTitle>

            <DialogContent sx={{ py: 3 }}>
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
                  fontWeight: 500,
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
                  fontWeight: 500,
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
                color: "primary.main",
                pt: 3,
                pb: 1,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              Task Details
              <IconButton
                onClick={() => setOpenViewDialog(false)}
                sx={{ color: "text.secondary" }}
              >
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ py: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 1, color: "primary.main" }}
                >
                  {viewTask.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {viewTask.description}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Task Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Created Date:
                    </Typography>
                    <Typography variant="body1">
                      {moment(viewTask.createdAt).format("MMM D, YYYY h:mm A")}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Last Updated:
                    </Typography>
                    <Typography variant="body1">
                      {moment(viewTask.updatedAt).format("MMM D, YYYY h:mm A")}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Assignment Information
                </Typography>
                {viewTask.employee ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Assigned To:
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Avatar
                          src={viewTask.employee.profileImage}
                          sx={{
                            width: 32,
                            height: 32,
                            mr: 1,
                            bgcolor: "primary.main",
                          }}
                        >
                          {viewTask.employee.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body1">
                          {viewTask.employee.name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Customer:
                      </Typography>
                      {viewTask.customer ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <Person sx={{ mr: 1, color: "action.active" }} />
                          <Typography variant="body1">
                            {viewTask.customer.name}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body1" color="text.secondary">
                          Not assigned
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    This task is not assigned to any employee.
                  </Typography>
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
                sx={{ borderRadius: 2 }}
              >
                Edit Task
              </Button>
              <Button
                onClick={() => setOpenViewDialog(false)}
                variant="contained"
                color="primary"
                sx={{ borderRadius: 2 }}
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
        />
      </Box>
    </Fade>
  );
};

export default AssignUserToEmployee;
