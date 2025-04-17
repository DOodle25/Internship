// import { useState, useEffect } from "react";
// import {
//   Container,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { format } from "date-fns";

// const PaymentAdminPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");

//   useEffect(() => {
//     const fetchadminPayments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/payment-admin",
//           {
//             method: "GET",
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const data = await response.json();
//         setPayments(data.payments);

//         const uniqueUsers = [
//           ...new Map(
//             data.payments.map((payment) => [payment.userId._id, payment.userId])
//           ).values(),
//         ];
//         setUsers(uniqueUsers);
//       } catch (error) {
//         console.error("Error fetching payments:", error);
//       }
//     };
//     fetchadminPayments();
//   }, []);
//   const filteredPayments = selectedUser
//     ? payments.filter((payment) => payment.userId._id === selectedUser)
//     : payments;
//   const columns = [
//     { field: "userName", headerName: "User Name", width: 200 },
//     {
//       field: "amount",
//       headerName: "Amount",
//       width: 150,
//       renderCell: (params) => `$${(params.value / 100).toFixed(2)}`,
//     },
//     { field: "currency", headerName: "Currency", width: 100 },
//     { field: "paymentMethod", headerName: "Payment Method", width: 150 },
//     {
//       field: "paymentStatus",
//       headerName: "Status",
//       width: 120,
//       renderCell: (params) => (
//         <span
//           style={{ color: params.value === "completed" ? "green" : "orange" }}
//         >
//           {params.value.toUpperCase()}
//         </span>
//       ),
//     },
//     {
//       field: "createdAt",
//       headerName: "Created At",
//       width: 200,
//       renderCell: (params) => format(new Date(params.value), "PPpp"),
//     },
//     {
//       field: "updatedAt",
//       headerName: "Updated At",
//       width: 200,
//       renderCell: (params) => format(new Date(params.value), "PPpp"),
//     },
//   ];
//   const rows = filteredPayments.map((payment) => ({
//     id: payment._id,
//     userName: payment.userId.name,
//     amount: payment.amount,
//     currency: payment.currency.toUpperCase(),
//     paymentMethod: payment.paymentMethod.toUpperCase(),
//     paymentStatus: payment.paymentStatus,
//     createdAt: payment.createdAt,
//     updatedAt: payment.updatedAt,
//   }));

//   return (
//     <Container
//       maxWidth="none"
//       style={{ marginTop: "2rem", paddingBottom: "2rem" }}
//     >
//       <FormControl
//         fullWidth
//         variant="outlined"
//         margin="normal"
//         style={{ backgroundColor: "white" }}
//       >
//         <InputLabel>Select User</InputLabel>
//         <Select
//           value={selectedUser}
//           onChange={(e) => setSelectedUser(e.target.value)}
//           label="Select User"
//         >
//           <MenuItem value="">
//             <>All Users</>
//           </MenuItem>
//           {users.map((user) => (
//             <MenuItem key={user._id} value={user._id}>
//               {user.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid
//           sx={{
//             backgroundColor: "white",
//             border: "none",
//             boxShadow: "none",
//             borderRadius: "30px",
//           }}
//           rows={rows}
//           columns={columns}
//           autoPageSize
//           checkboxSelection
//           disableSelectionOnClick
//         />
//       </div>
//     </Container>
//   );
// };

// export default PaymentAdminPage;






// import { useState, useEffect } from "react";
// import {
//   Container,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Box,
//   Typography,
//   Paper,
//   Avatar,
//   Chip,
//   Tooltip,
//   IconButton,
//   TextField,
//   Button,
//   Divider,
//   Fade,
//   Grow,
//   Zoom,
//   Snackbar,
//   styled,
//   Badge,
//   Grid,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { format } from "date-fns";
// import {
//   Payment as PaymentIcon,
//   Person as PersonIcon,
//   FilterAlt as FilterIcon,
//   Clear as ClearIcon,
//   Search as SearchIcon,
//   CheckCircle,
//   Error,
//   AttachMoney,
//   Info,
//   Download,
//   Refresh,
// } from "@mui/icons-material";

// // Styled components
// const AdminContainer = styled(Container)(({ theme }) => ({
//   padding: theme.spacing(4),
//   transition: "all 0.3s ease",
// }));

// const FilterCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: 16,
//   marginBottom: theme.spacing(3),
//   boxShadow: theme.shadows[2],
//   backgroundColor: theme.palette.background.paper,
//   transition: "all 0.3s ease",
// }));

// const SummaryCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: 16,
//   marginBottom: theme.spacing(3),
//   boxShadow: theme.shadows[1],
//   backgroundColor: theme.palette.grey[100],
//   transition: "all 0.3s ease",
//   "&:hover": {
//     boxShadow: theme.shadows[3],
//   },
// }));

// const PaymentAdminPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [dateRange, setDateRange] = useState({
//     start: null,
//     end: null,
//   });
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);

//   useEffect(() => {
//     fetchAdminPayments();
//   }, []);

//   const fetchAdminPayments = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/payment-admin",
//         {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await response.json();
//       setPayments(data.payments);

//       const uniqueUsers = [
//         ...new Map(
//           data.payments.map((payment) => [payment.userId._id, payment.userId])
//         ).values(),
//       ];
//       setUsers(uniqueUsers);
//     } catch (error) {
//       console.error("Error fetching payments:", error);
//       showSnackbar("Failed to load payments", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showSnackbar = (message, severity = "success") => {
//     setSnackbarMessage(message);
//     setSnackbarOpen(true);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleClearFilters = () => {
//     setSelectedUser("");
//     setSearchTerm("");
//     setStatusFilter("all");
//     setDateRange({ start: null, end: null });
//   };

//   const handleExport = () => {
//     // In a real app, this would export the filtered data
//     showSnackbar("Export functionality would be implemented here");
//   };

//   const filteredPayments = payments.filter((payment) => {
//     // User filter
//     const userMatch = selectedUser
//       ? payment.userId._id === selectedUser
//       : true;

//     // Search term filter (name or email)
//     const searchMatch =
//       searchTerm === "" ||
//       payment.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (payment.userId.email &&
//         payment.userId.email.toLowerCase().includes(searchTerm.toLowerCase()));

//     // Status filter
//     const statusMatch =
//       statusFilter === "all" || payment.paymentStatus === statusFilter;

//     // Date range filter
//     const dateMatch =
//       !dateRange.start ||
//       !dateRange.end ||
//       (new Date(payment.createdAt) >= new Date(dateRange.start) &&
//         new Date(payment.createdAt) <= new Date(dateRange.end));

//     return userMatch && searchMatch && statusMatch && dateMatch;
//   });

//   // Calculate summary statistics
//   const totalPayments = filteredPayments.length;
//   const totalAmount = filteredPayments.reduce(
//     (sum, payment) => sum + payment.amount,
//     0
//   );
//   const completedPayments = filteredPayments.filter(
//     (payment) => payment.paymentStatus === "completed"
//   ).length;

//   const columns = [
//     {
//       field: "user",
//       headerName: "User",
//       width: 250,
//       renderCell: (params) => (
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Avatar
//             sx={{ width: 32, height: 32, mr: 2, bgcolor: "primary.main" }}
//             src={params.row.userAvatar}
//           >
//             {params.row.userName.charAt(0)}
//           </Avatar>
//           <Box>
//             <Typography variant="body1" sx={{ fontWeight: 500 }}>
//               {params.row.userName}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               {params.row.userEmail}
//             </Typography>
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       field: "amount",
//       headerName: "Amount",
//       width: 150,
//       renderCell: (params) => (
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <AttachMoney fontSize="small" color="success" sx={{ mr: 0.5 }} />
//           <Typography>{(params.value / 100).toFixed(2)}</Typography>
//         </Box>
//       ),
//     },
//     {
//       field: "currency",
//       headerName: "Currency",
//       width: 100,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           size="small"
//           variant="outlined"
//           color="info"
//         />
//       ),
//     },
//     {
//       field: "paymentMethod",
//       headerName: "Method",
//       width: 150,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           size="small"
//           variant="outlined"
//           color="secondary"
//         />
//       ),
//     },
//     {
//       field: "paymentStatus",
//       headerName: "Status",
//       width: 150,
//       renderCell: (params) => (
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           {params.value === "completed" ? (
//             <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
//           ) : (
//             <Error fontSize="small" color="warning" sx={{ mr: 1 }} />
//           )}
//           <Typography
//             sx={{
//               color:
//                 params.value === "completed"
//                   ? "success.main"
//                   : "warning.main",
//               fontWeight: 500,
//             }}
//           >
//             {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
//           </Typography>
//         </Box>
//       ),
//     },
//     {
//       field: "createdAt",
//       headerName: "Created",
//       width: 180,
//       renderCell: (params) => (
//         <Tooltip title={format(new Date(params.value), "PPpp")} arrow>
//           <Typography variant="body2">
//             {format(new Date(params.value), "MMM d, yyyy")}
//           </Typography>
//         </Tooltip>
//       ),
//     },
//     {
//       field: "details",
//       headerName: "Details",
//       width: 100,
//       renderCell: (params) => (
//         <Tooltip title="View details" arrow>
//           <IconButton size="small">
//             <Info fontSize="small" />
//           </IconButton>
//         </Tooltip>
//       ),
//     },
//   ];

//   const rows = filteredPayments.map((payment) => ({
//     id: payment._id,
//     user: payment.userId.name,
//     userName: payment.userId.name,
//     userEmail: payment.userId.email,
//     userAvatar: payment.userId.profileImage,
//     amount: payment.amount,
//     currency: payment.currency.toUpperCase(),
//     paymentMethod: payment.paymentMethod.toUpperCase(),
//     paymentStatus: payment.paymentStatus,
//     createdAt: payment.createdAt,
//     updatedAt: payment.updatedAt,
//   }));

//   return (
//     <Fade in={true} timeout={500}>
//       <AdminContainer maxWidth="xl">
//         <Grow in={true} timeout={600}>
//           <Box>
//             <Typography
//               variant="h4"
//               gutterBottom
//               sx={{ fontWeight: 600, mb: 3, color: "primary.main" }}
//             >
//               Payment Administration
//             </Typography>

//             {/* Summary Cards */}
//             <Zoom in={true} style={{ transitionDelay: "100ms" }}>
//               <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
//                 <SummaryCard>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Total Payments
//                   </Typography>
//                   <Typography variant="h4" sx={{ fontWeight: 600 }}>
//                     {totalPayments}
//                   </Typography>
//                 </SummaryCard>
//                 <SummaryCard>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Total Amount
//                   </Typography>
//                   <Typography variant="h4" sx={{ fontWeight: 600 }}>
//                     ${(totalAmount / 100).toFixed(2)}
//                   </Typography>
//                 </SummaryCard>
//                 <SummaryCard>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Completed Payments
//                   </Typography>
//                   <Typography variant="h4" sx={{ fontWeight: 600 }}>
//                     {completedPayments}
//                   </Typography>
//                 </SummaryCard>
//               </Box>
//             </Zoom>

//             {/* Filter Card */}
//             <Zoom in={true} style={{ transitionDelay: "200ms" }}>
//               <FilterCard elevation={3}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 2,
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                     <FilterIcon sx={{ mr: 1, color: "primary.main" }} />
//                     Filters
//                   </Typography>
//                   <Button
//                     onClick={handleClearFilters}
//                     startIcon={<ClearIcon />}
//                     size="small"
//                     color="secondary"
//                   >
//                     Clear All
//                   </Button>
//                 </Box>

//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                       fullWidth
//                       label="Search Users"
//                       variant="outlined"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       InputProps={{
//                         startAdornment: (
//                           <SearchIcon
//                             sx={{ color: "action.active", mr: 1 }}
//                           />
//                         ),
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <FormControl fullWidth>
//                       <InputLabel>Select User</InputLabel>
//                       <Select
//                         value={selectedUser}
//                         onChange={(e) => setSelectedUser(e.target.value)}
//                         label="Select User"
//                       >
//                         <MenuItem value="">All Users</MenuItem>
//                         {users.map((user) => (
//                           <MenuItem key={user._id} value={user._id}>
//                             <Box
//                               sx={{ display: "flex", alignItems: "center" }}
//                             >
//                               <PersonIcon sx={{ mr: 1 }} />
//                               {user.name}
//                             </Box>
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <FormControl fullWidth>
//                       <InputLabel>Payment Status</InputLabel>
//                       <Select
//                         value={statusFilter}
//                         onChange={(e) => setStatusFilter(e.target.value)}
//                         label="Payment Status"
//                       >
//                         <MenuItem value="all">All Statuses</MenuItem>
//                         <MenuItem value="completed">Completed</MenuItem>
//                         <MenuItem value="pending">Pending</MenuItem>
//                         <MenuItem value="failed">Failed</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <Box sx={{ display: "flex", gap: 1 }}>
//                       <TextField
//                         fullWidth
//                         label="Start Date"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         value={dateRange.start || ""}
//                         onChange={(e) =>
//                           setDateRange({ ...dateRange, start: e.target.value })
//                         }
//                       />
//                       <TextField
//                         fullWidth
//                         label="End Date"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         value={dateRange.end || ""}
//                         onChange={(e) =>
//                           setDateRange({ ...dateRange, end: e.target.value })
//                         }
//                       />
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </FilterCard>
//             </Zoom>

//             {/* Data Grid */}
//             <Zoom in={true} style={{ transitionDelay: "300ms" }}>
//               <Paper
//                 sx={{
//                   height: 600,
//                   width: "100%",
//                   borderRadius: 3,
//                   overflow: "hidden",
//                   boxShadow: 2,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     p: 2,
//                     backgroundColor: "background.paper",
//                     borderBottom: "1px solid",
//                     borderColor: "divider",
//                   }}
//                 >
//                   <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                     Payment Records
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     <Button
//                       onClick={fetchAdminPayments}
//                       startIcon={<Refresh />}
//                       variant="outlined"
//                       size="small"
//                       disabled={loading}
//                     >
//                       Refresh
//                     </Button>
//                     <Button
//                       onClick={handleExport}
//                       startIcon={<Download />}
//                       variant="contained"
//                       size="small"
//                       color="primary"
//                     >
//                       Export
//                     </Button>
//                   </Box>
//                 </Box>
//                 <DataGrid
//                   rows={rows}
//                   columns={columns}
//                   loading={loading}
//                   pageSize={10}
//                   rowsPerPageOptions={[10, 25, 50]}
//                   checkboxSelection
//                   onSelectionModelChange={(newSelection) => {
//                     setSelectedRows(newSelection);
//                   }}
//                   sx={{
//                     "& .MuiDataGrid-columnHeaders": {
//                       backgroundColor: "background.default",
//                     },
//                     "& .MuiDataGrid-cell": {
//                       borderBottom: "none",
//                     },
//                     "& .MuiDataGrid-row": {
//                       "&:hover": {
//                         backgroundColor: "action.hover",
//                       },
//                       "&.Mui-selected": {
//                         backgroundColor: "primary.light",
//                       },
//                     },
//                   }}
//                 />
//               </Paper>
//             </Zoom>
//           </Box>
//         </Grow>

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={handleSnackbarClose}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         >
//           <Box
//             sx={{
//               backgroundColor: "success.main",
//               color: "white",
//               px: 3,
//               py: 2,
//               borderRadius: 1,
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <CheckCircle sx={{ mr: 1 }} />
//             <Typography>{snackbarMessage}</Typography>
//           </Box>
//         </Snackbar>
//       </AdminContainer>
//     </Fade>
//   );
// };

// export default PaymentAdminPage;








import { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Tooltip,
  IconButton,
  TextField,
  Button,
  Divider,
  Fade,
  Grow,
  Zoom,
  Snackbar,
  styled,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import {
  Payment as PaymentIcon,
  Person as PersonIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
  CheckCircle,
  Error,
  AttachMoney,
  Info,
  Download,
  Refresh,
} from "@mui/icons-material";

// Styled components
const AdminContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  transition: "all 0.3s ease",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const FilterCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[0],
  backgroundColor: theme.palette.background.paper,
  transition: "all 0.3s ease",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  // marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[0],
  backgroundColor: theme.palette.white,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[0],
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ExportButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#388e3c',
    boxShadow: theme.shadows[0],
  },
  transition: 'all 0.3s ease',
  borderRadius: '8px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 600,
}));

const ClearButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f44336',
  color: 'white',
  '&:hover': {
    backgroundColor: '#d32f2f',
    boxShadow: theme.shadows[0],
  },
  transition: 'all 0.3s ease',
  borderRadius: '8px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 600,
}));

const PaymentAdminPage = () => {
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchAdminPayments();
  }, []);

  const fetchAdminPayments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/payment-admin",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setPayments(data.payments);

      const uniqueUsers = [
        ...new Map(
          data.payments.map((payment) => [payment.userId._id, payment.userId])
        ).values(),
      ];
      setUsers(uniqueUsers);
    } catch (error) {
      console.error("Error fetching payments:", error);
      showSnackbar("Failed to load payments", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedUser("");
    setSearchTerm("");
    setStatusFilter("all");
    setDateRange({ start: null, end: null });
    showSnackbar("All filters cleared");
  };

  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredPayments.map(payment => ({
      'User Name': payment.userId.name,
      'User Email': payment.userId.email || 'N/A',
      'Amount': `$${(payment.amount / 100).toFixed(2)}`,
      'Currency': payment.currency.toUpperCase(),
      'Payment Method': payment.paymentMethod.toUpperCase(),
      'Status': payment.paymentStatus.charAt(0).toUpperCase() + payment.paymentStatus.slice(1),
      'Created At': format(new Date(payment.createdAt), "PPpp"),
      'Updated At': format(new Date(payment.updatedAt), "PPpp"),
    }));

    // Convert to CSV
    const headers = Object.keys(exportData[0]);
    const csvContent = [
      headers.join(','),
      ...exportData.map(row => 
        headers.map(fieldName => 
          `"${row[fieldName].toString().replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `payments_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSnackbar("Export completed successfully");
  };

  const filteredPayments = payments.filter((payment) => {
    // User filter
    const userMatch = selectedUser
      ? payment.userId._id === selectedUser
      : true;

    // Search term filter (name or email)
    const searchMatch =
      searchTerm === "" ||
      payment.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.userId.email &&
        payment.userId.email.toLowerCase().includes(searchTerm.toLowerCase()));

    // Status filter
    const statusMatch =
      statusFilter === "all" || payment.paymentStatus === statusFilter;

    // Date range filter
    const dateMatch =
      !dateRange.start ||
      !dateRange.end ||
      (new Date(payment.createdAt) >= new Date(dateRange.start) &&
        new Date(payment.createdAt) <= new Date(dateRange.end));

    return userMatch && searchMatch && statusMatch && dateMatch;
  });

  // Calculate summary statistics
  const totalPayments = filteredPayments.length;
  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const completedPayments = filteredPayments.filter(
    (payment) => payment.paymentStatus === "completed"
  ).length;

  const columns = [
    {
      field: "user",
      headerName: "User",
      width: isMobile ? 150 : 250,
      height: "100%",
      display: "flex",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ width: 32, height: 32, mr: 2, bgcolor: "primary.main" }}
            src={params.row.userAvatar}
          >
            {params.row.userName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {params.row.userName}
            </Typography>
            {!isMobile && (
              <Typography variant="caption" color="text.secondary">
                {params.row.userEmail}
              </Typography>
            )}
          </Box>
        </Box>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: isMobile ? 100 : 150,
      height: "100%",
      display: "flex",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AttachMoney fontSize="small" color="success" sx={{ mr: 0.5 }} />
          <Typography>{(params.value / 100).toFixed(2)}</Typography>
        </Box>
      ),
    },
    {
      field: "currency",
      headerName: "Currency",
      width: isMobile ? 80 : 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          color="info"
        />
      ),
    },
    {
      field: "paymentMethod",
      headerName: isMobile ? "Method" : "Payment Method",
      width: isMobile ? 100 : 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          color="secondary"
        />
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Status",
      width: isMobile ? 100 : 150,
      height: "100%",
      display: "flex",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {params.value === "completed" ? (
            <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
          ) : (
            <Error fontSize="small" color="warning" sx={{ mr: 1 }} />
          )}
          <Typography
            sx={{
              color:
                params.value === "completed"
                  ? "success.main"
                  : "warning.main",
              fontWeight: 500,
              fontSize: isMobile ? '0.75rem' : 'inherit',
            }}
          >
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </Typography>
        </Box>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: isMobile ? 120 : 180,
      height: "100%",
      display: "flex",
      renderCell: (params) => (
        <Tooltip title={format(new Date(params.value), "PPpp")} arrow>
          <Typography variant="body2" sx={{ fontSize: isMobile ? '0.75rem' : 'inherit' }}>
            {format(new Date(params.value), isMobile ? "MMM d" : "MMM d, yyyy")}
          </Typography>
        </Tooltip>
      ),
    },
    // {
    //   field: "details",
    //   headerName: "Details",
    //   width: 80,
    //   renderCell: (params) => (
    //     <Tooltip title="View details" arrow>
    //       <IconButton size="small">
    //         <Info fontSize="small" />
    //       </IconButton>
    //     </Tooltip>
    //   ),
    // },
  ];

  const rows = filteredPayments.map((payment) => ({
    id: payment._id,
    user: payment.userId.name,
    userName: payment.userId.name,
    userEmail: payment.userId.email,
    userAvatar: payment.userId.profileImage,
    amount: payment.amount,
    currency: payment.currency.toUpperCase(),
    paymentMethod: payment.paymentMethod.toUpperCase(),
    paymentStatus: payment.paymentStatus,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  }));

  return (
    <Fade in={true} timeout={500}>
      <AdminContainer maxWidth="xl">
        <Grow in={true} timeout={600}>
          <Box>
            {/* <Typography
              variant={isMobile ? "h5" : "h4"}
              gutterBottom
              sx={{ fontWeight: 600, mb: 3, color: "primary.main" }}
            >
              Payment Administration
            </Typography> */}

            {/* Summary Cards */}
            <Zoom in={true} style={{ transitionDelay: "100ms" }}>
              <Box sx={{ 
                display: "flex", 
                gap: 3, 
                mb: 3,
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <SummaryCard sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Payments
                  </Typography>
                  <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 400 }}>
                    {totalPayments}
                  </Typography>
                </SummaryCard>
                <SummaryCard sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Amount
                  </Typography>
                  <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 400 }}>
                    ${(totalAmount / 100).toFixed(2)}
                  </Typography>
                </SummaryCard>
                <SummaryCard sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Completed Payments
                  </Typography>
                  <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 400 }}>
                    {completedPayments}
                  </Typography>
                </SummaryCard>
              </Box>
            </Zoom>

            {/* Filter Card */}
            <Zoom in={true} style={{ transitionDelay: "200ms" }}>
              <FilterCard elevation={0}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 2 : 0,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    <FilterIcon sx={{ mr: 1, color: "primary.main" }} />
                    Filters
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1,
                    width: isMobile ? '100%' : 'auto'
                  }}>
                    <ClearButton
                      onClick={handleClearFilters}
                      startIcon={<ClearIcon />}
                      size={isMobile ? "small" : "medium"}
                      fullWidth={isMobile}
                    >
                      {isMobile ? 'Clear' : 'Clear All'}
                    </ClearButton>
                    <ExportButton
                      onClick={handleExport}
                      startIcon={<Download />}
                      size={isMobile ? "small" : "medium"}
                      fullWidth={isMobile}
                    >
                      {isMobile ? 'Export' : 'Export Data'}
                    </ExportButton>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Search Users"
                      variant="outlined"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <SearchIcon
                            sx={{ color: "action.active", mr: 1 }}
                          />
                        ),
                      }}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                      <InputLabel>Select User</InputLabel>
                      <Select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        label="Select User"
                      >
                        <MenuItem value="">All Users</MenuItem>
                        {users.map((user) => (
                          <MenuItem key={user._id} value={user._id}>
                            <Box
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <PersonIcon sx={{ mr: 1 }} />
                              <Typography noWrap>
                                {user.name}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                      <InputLabel>Payment Status</InputLabel>
                      <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        label="Payment Status"
                      >
                        <MenuItem value="all">All Statuses</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        {/* <MenuItem value="failed">Failed</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <TextField
                        fullWidth
                        label="Start Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={dateRange.start || ""}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, start: e.target.value })
                        }
                        size={isMobile ? "small" : "medium"}
                      />
                      <TextField
                        fullWidth
                        label="End Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={dateRange.end || ""}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, end: e.target.value })
                        }
                        size={isMobile ? "small" : "medium"}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </FilterCard>
            </Zoom>

            {/* Data Grid */}
            <Zoom in={true} style={{ transitionDelay: "300ms" }}>
              <Paper
                sx={{
                  height: isMobile ? 500 : 500,
                  width: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    backgroundColor: "background.paper",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 2 : 0,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Payment Records
                  </Typography>
                  <Box sx={{ 
                    display: "flex", 
                    gap: 1,
                    width: isMobile ? '100%' : 'auto'
                  }}>
                    <Button
                      onClick={fetchAdminPayments}
                      startIcon={<Refresh />}
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      disabled={loading}
                      fullWidth={isMobile}
                    >
                      Refresh
                    </Button>
                  </Box>
                </Box>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  loading={loading}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  checkboxSelection
                  onSelectionModelChange={(newSelection) => {
                    setSelectedRows(newSelection);
                  }}
                  // sx={{
                  //   "& .MuiDataGrid-columnHeaders": {
                  //     backgroundColor: "background.default",
                  //   },
                  //   "& .MuiDataGrid-cell": {
                  //     borderBottom: "none",
                  //   },
                  //   "& .MuiDataGrid-row": {
                  //     "&:hover": {
                  //       backgroundColor: "action.hover",
                  //     },
                  //     "&.Mui-selected": {
                  //       backgroundColor: "primary.light",
                  //     },
                  //   },
                  // }}
                />
              </Paper>
            </Zoom>
          </Box>
        </Grow>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Box
            sx={{
              backgroundColor: "success.main",
              color: "white",
              px: 3,
              py: 2,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CheckCircle sx={{ mr: 1 }} />
            <Typography>{snackbarMessage}</Typography>
          </Box>
        </Snackbar>
      </AdminContainer>
    </Fade>
  );
};

export default PaymentAdminPage;