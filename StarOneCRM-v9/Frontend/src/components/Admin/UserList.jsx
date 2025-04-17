// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   IconButton,
//   Menu,
//   MenuItem,
//   TextField,
//   Button,
//   Tooltip,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { DataGrid } from "@mui/x-data-grid";
// import moment from "moment";
// import { useGlobalContext } from "../../context/GlobalContext";
// import CustomerSegmentation from "../Segmentation/CustomerSegmentation";

// const UserList = ({}) => {
//   const {
//     handleVerify,
//     handleDelete,
//     fetchUsers,
//     users,
//     selectedUsers,
//     setSelectedUsers,
//   } = useGlobalContext();
//   const [search, setSearch] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [filterVerified, setFilterVerified] = useState(0);
//   const [filterAdmin, setFilterAdmin] = useState(0);
//   const [filterRole, setFilterRole] = useState(0);
//   const navigate = useNavigate();

//   const handleMenuOpen = (event, user) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedUser(user);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedUser(null);
//   };
//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   const filteredUsers = users.filter((user) => {
//     if (filterVerified === 1 && !user.isFormVerified) return false;
//     if (filterVerified === 2 && user.isFormVerified) return false;

//     if (filterAdmin === 1 && !user.isAdmin) return false;
//     if (filterAdmin === 2 && user.isAdmin) return false;

//     if (filterRole === 1 && user.role === "employee") return false;
//     if (filterRole === 2 && user.role === "customer") return false;

//     return (
//       (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
//       (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
//       (user.role && user.role.toLowerCase().includes(search.toLowerCase()))
//     );
//   });

//   const columns = [
//     {
//       field: "name",
//       headerName: "Name",
//       width: 220,
//       sortable: true,
//       renderCell: (params) => {
//         const { name, profileImage } = params.row;
//         const firstLetter = name.charAt(0).toUpperCase();
//         const colors = [
//           "#8B0000",
//           "#8B4513",
//           "#2F4F4F",
//           "#556B2F",
//           "#8B008B",
//           "#483D8B",
//           "#2E8B57",
//           "#4B0082",
//           "#191970",
//           "#00008B",
//           "#8B0000",
//           "#8B4513",
//           "#2F4F4F",
//           "#556B2F",
//           "#8B008B",
//           "#483D8B",
//           "#2E8B57",
//           "#4B0082",
//           "#191970",
//           "#00008B",
//           "#8B0000",
//           "#8B4513",
//           "#2F4F4F",
//           "#556B2F",
//           "#8B008B",
//           "#483D8B",
//         ];

//         const backgroundColor =
//           colors[firstLetter.charCodeAt(0) - 65] || "#999";

//         return (
//           <div style={{ display: "flex", alignItems: "center" }}>
//             {profileImage ? (
//               <img
//                 src={profileImage}
//                 alt="Profile"
//                 style={{
//                   // width: 40,
//                   minWidth: 40,
//                   maxHeight: 40,
//                   minHeight: 40,
//                   maxWidth: 40,
//                   // height: 40,
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                   marginRight: 10,
//                 }}
//               />
//             ) : (
//               <div
//                 style={{
//                   minWidth: 40,
//                   maxHeight: 40,
//                   minHeight: 40,
//                   maxWidth: 40,
//                   borderRadius: "50%",
//                   backgroundColor,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: "white",
//                   marginRight: 10,
//                 }}
//               >
//                 {firstLetter}
//               </div>
//             )}
//             <span>{name}</span>
//           </div>
//         );
//       },
//     },
//     { field: "age", headerName: "Age", width: 90, sortable: true },
//     { field: "email", headerName: "Email", width: 250, sortable: true },
//     { field: "role", headerName: "Role", width: 140, sortable: true },
//     {
//       field: "isAdmin",
//       headerName: "Admin",
//       width: 120,
//       renderCell: (params) => (
//         <span
//           style={{
//             color: params.row.isAdmin ? "orange" : "blue",
//             fontWeight: "",
//           }}
//         >
//           {params.row.isAdmin ? "✔ Admin" : "✖ Not Admin"}
//         </span>
//       ),
//     },
//     {
//       field: "isFormVerified",
//       headerName: "Verified",
//       width: 130,
//       renderCell: (params) => (
//         <span
//           style={{
//             color: params.row.isFormVerified ? "green" : "red",
//             fontWeight: "",
//           }}
//         >
//           {params.row.isFormVerified ? "✔ Verified" : "✖ Not Verified"}
//         </span>
//       ),
//     },
//     {
//       field: "isFormFilled",
//       headerName: "Form Filled",
//       width: 140,
//       renderCell: (params) => (
//         <span
//           style={{
//             color: params.row.isFormFilled ? "green" : "red",
//             fontWeight: "",
//           }}
//         >
//           {params.row.isFormFilled ? "✔ Yes" : "✖ No"}
//         </span>
//       ),
//     },
//     {
//       field: "tasksAssigned",
//       headerName: "Tasks Assigned",
//       width: 160,
//       renderCell: (params) => (
//         <span style={{ fontWeight: "" }}>
//           {params.row.tasksAssigned.length} Tasks
//         </span>
//       ),
//     },
//     {
//       field: "assignedPeople",
//       headerName: "Assigned People",
//       width: 170,
//       renderCell: (params) => (
//         <span style={{ fontWeight: "" }}>
//           {params.row.assignedPeople.length} People
//         </span>
//       ),
//     },
//     {
//       field: "loginMethod",
//       headerName: "Login Method",
//       width: 140,
//       renderCell: (params) => (
//         <span style={{ fontWeight: "" }}>
//           {params.row.loginMethod === "traditional"
//             ? "🔑 Password"
//             : params.row.loginMethod === "google"
//             ? "🌐 Google"
//             : "📘 Facebook"}
//         </span>
//       ),
//     },
//     {
//       field: "createdAt",
//       headerName: "Created At",
//       width: 180,
//       renderCell: (params) => (
//         <span style={{ fontSize: "14px" }}>
//           {moment(params.row.createdAt).format("DD MMM YYYY, HH:mm")}
//         </span>
//       ),
//     },
//     {
//       field: "updatedAt",
//       headerName: "Updated At",
//       width: 180,
//       renderCell: (params) => (
//         <span style={{ fontSize: "14px" }}>
//           {moment(params.row.updatedAt).format("DD MMM YYYY, HH:mm")}
//         </span>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 120,
//       renderCell: (params) => (
//         <Tooltip title="More Actions">
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, params.row)}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         </Tooltip>
//       ),
//     },
//   ];
//   return (
//     <>
//       <div style={{ padding: "20px", marginTop: "20px" }}>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <TextField
//             variant="outlined"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{ flex: 1, marginRight: "10px" }}
//             sx={{
//               backgroundColor: "white",
//               color: "black",
//               borderRadius: "50px",
//               "& .MuiOutlinedInput-root": {
//                 backgroundColor: "white",
//                 color: "black",
//                 "& fieldset": {
//                   borderColor: "white",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "white",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "white",
//                 },
//                 "& input": {
//                   color: "black",
//                 },
//               },
//             }}
//           />
//           <IconButton
//             color="primary"
//             onClick={() => navigate("/add")}
//             aria-label="Add User"
//             sx={{
//               borderRadius: "10px !important",
//               backgroundColor: "#FFFFFF",
//               height: "50px",
//               width: "50px",
//             }}
//           >
//             <PersonAddIcon />
//           </IconButton>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         ></div>
//         <Button
//           variant={filterVerified !== 0 ? "contained" : "outlined"}
//           color="success"
//           onClick={() => setFilterVerified((prev) => (prev + 1) % 3)}
//           style={{
//             margin: "10px",
//             marginRight: "0px",
//             marginLeft: "0px",
//             backgroundColor:
//               filterVerified === 1
//                 ? "green"
//                 : filterVerified === 2
//                 ? "red"
//                 : "",
//             color: filterVerified !== 0 ? "white" : "",
//           }}
//         >
//           Verified
//         </Button>
//         <Button
//           variant={filterAdmin !== 0 ? "contained" : "outlined"}
//           color="warning"
//           onClick={() => setFilterAdmin((prev) => (prev + 1) % 3)}
//           style={{
//             margin: "10px",
//             marginRight: "0px",
//             backgroundColor:
//               filterAdmin === 1
//                 ? "#f57c00"
//                 : filterAdmin === 2
//                 ? "#1976d2"
//                 : "",
//             color: filterAdmin !== 0 ? "white" : "",
//           }}
//         >
//           Admin
//         </Button>
//         <Button
//           variant={filterRole !== 0 ? "contained" : "outlined"}
//           color="warning"
//           onClick={() => setFilterRole((prev) => (prev + 1) % 3)}
//           style={{
//             margin: "10px",
//             backgroundColor:
//               filterRole === 1 ? "#f57c00" : filterRole === 2 ? "#1976d2" : "",
//             color: filterRole !== 0 ? "white" : "",
//           }}
//         >
//           Role
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleDelete}
//           // disabled={selectedUsers.length === 0}
//           sx={{
//             marginRight: "10px",
//             "&:disabled": { bgcolor: "#FFFFFF", color: "grey.400" },
//           }}
//           disabled
//         >
//           Delete Selected
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleVerify}
//           disabled={selectedUsers.length === 0}
//           sx={{
//             margin: "10px",
//             marginLeft: "0px",
//             "&:disabled": { bgcolor: "#FFFFFF", color: "grey.400" },
//           }}
//         >
//           Verify Selected
//         </Button>
//       </div>

//       <div
//         style={{
//           height: 455,
//           width: "100%",
//           marginBottom: "20px",
//         }}
//       >
//         <DataGrid
//           rows={filteredUsers}
//           columns={columns}
//           autoPageSize
//           checkboxSelection
//           // paginationMode="client"
//           // rowCount={filteredUsers?.length ?? 0}
//           onRowSelectionModelChange={(newSelection) => {
//             setSelectedUsers(newSelection);
//           }}
//           rowSelectionModel={selectedUsers}
//           getRowId={(row) => row._id}
//           sx={{
//             marginRight: "20px",
//             marginLeft: "20px",
//             borderRadius: "30px",
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

//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem
//           onClick={() => {
//             navigate(`/update/${selectedUser._id}`);
//             handleMenuClose();
//           }}
//         >
//           View
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             // handleDelete(selectedUser._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//       </Menu>
//       <CustomerSegmentation />
//     </>
//   );
// };

// export default UserList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Tooltip,
  Box,
  Paper,
  Fade,
  Grow,
  Zoom,
  Avatar,
  Badge,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VerifiedIcon from "@mui/icons-material/Verified";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useGlobalContext } from "../../context/GlobalContext";
import CustomerSegmentation from "../Segmentation/CustomerSegmentation";
import { easeIn } from "framer-motion";

const UserList = ({}) => {
  const {
    handleVerify,
    handleDelete,
    fetchUsers,
    users,
    selectedUsers,
    setSelectedUsers,
  } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterVerified, setFilterVerified] = useState(0);
  const [filterAdmin, setFilterAdmin] = useState(0);
  const [filterRole, setFilterRole] = useState(0);
  const navigate = useNavigate();

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (filterVerified === 1 && !user.isFormVerified) return false;
    if (filterVerified === 2 && user.isFormVerified) return false;

    if (filterAdmin === 1 && !user.isAdmin) return false;
    if (filterAdmin === 2 && user.isAdmin) return false;

    if (filterRole === 1 && user.role === "employee") return false;
    if (filterRole === 2 && user.role === "customer") return false;

    return (
      (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
      (user.role && user.role.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // const columns = [
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     width: 220,
  //     sortable: true,
  //     renderCell: (params) => {
  //       const { name, profileImage } = params.row;
  //       const firstLetter = name?.charAt(0)?.toUpperCase() || "U";
  //       const colors = [
  //         "#8B0000",
  //         "#8B4513",
  //         "#2F4F4F",
  //         "#556B2F",
  //         "#8B008B",
  //         "#483D8B",
  //         "#2E8B57",
  //         "#4B0082",
  //         "#191970",
  //         "#00008B",
  //         "#8B0000",
  //         "#8B4513",
  //         "#2F4F4F",
  //         "#556B2F",
  //         "#8B008B",
  //         "#483D8B",
  //         "#2E8B57",
  //         "#4B0082",
  //         "#191970",
  //         "#00008B",
  //         "#8B0000",
  //         "#8B4513",
  //         "#2F4F4F",
  //         "#556B2F",
  //         "#8B008B",
  //         "#483D8B",
  //       ];

  //       const backgroundColor =
  //         colors[firstLetter.charCodeAt(0) - 65] || "#999";

  //       return (
  //         <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
  //           {profileImage ? (
  //             <Avatar
  //               src={profileImage}
  //               alt="Profile"
  //               sx={{
  //                 width: 40,
  //                 height: 40,
  //                 mr: 2,
  //               }}
  //             />
  //           ) : (
  //             <Avatar
  //               sx={{
  //                 width: 40,
  //                 height: 40,
  //                 mr: 2,
  //                 bgcolor: backgroundColor,
  //               }}
  //             >
  //               {firstLetter}
  //             </Avatar>
  //           )}
  //           <Typography variant="body2" noWrap>
  //             {name}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     width: 90,
  //     sortable: true,
  //     renderCell: (params) => (
  //       <Typography variant="body2" sx={{alignItems: 'center', display: "flex", height: "100%"}}>
  //         {params.row.age || "-"}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     width: 250,
  //     sortable: true,
  //     renderCell: (params) => (
  //       <Typography variant="body2" sx={{ display: "flex", alignItems: "center", height: "100%" }} noWrap>
  //         {params.row.email}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     field: "role",
  //     headerName: "Role",
  //     width: 140,
  //     sortable: true,
  //     renderCell: (params) => (
  //       <Chip
  //         label={params.row.role}
  //         size="small"
  //         // color={params.row.role === "employee" ? "primary" : "secondary"}
  //         // variant="outlined"
  //         color={params.row.role === "employee" ? "" : "secondary"}
  //         sx={{
  //           textTransform: 'capitalize',
  //           fontWeight: 500
  //         }}
  //       />
  //     ),
  //   },
  //   {
  //     field: "isAdmin",
  //     headerName: "Admin",
  //     width: 120,
  //     renderCell: (params) => (
  //       <Box sx={{ display: 'flex', alignItems: 'center', height: "100%" }}>
  //         <AdminPanelSettingsIcon
  //           sx={{
  //             mr: 1,
  //             color: params.row.isAdmin ? "orange" : "action.disabled",
  //             fontSize: '1.2rem'
  //           }}
  //         />
  //         <Typography variant="body2">
  //           {params.row.isAdmin ? "Admin" : "User"}
  //         </Typography>
  //       </Box>
  //     ),
  //   },
  //   {
  //     field: "isFormVerified",
  //     headerName: "Verified",
  //     width: 130,
  //     renderCell: (params) => (
  //       <Box sx={{ display: 'flex', alignItems: 'center', height: "100%" }}>
  //         <VerifiedIcon
  //           sx={{
  //             mr: 1,
  //             color: params.row.isFormVerified ? "green" : "action.disabled",
  //             fontSize: '1.2rem'
  //           }}
  //         />
  //         <Typography variant="body2">
  //           {params.row.isFormVerified ? "Verified" : "Pending"}
  //         </Typography>
  //       </Box>
  //     ),
  //   },
  //   {
  //     field: "isFormFilled",
  //     headerName: "Form Filled",
  //     width: 140,
  //     renderCell: (params) => (
  //       <Chip
  //         label={params.row.isFormFilled ? "Completed" : "Incomplete"}
  //         size="small"
  //         color={params.row.isFormFilled ? "success" : "error"}
  //         // variant="outlined"
  //       />
  //     ),
  //   },
  //   {
  //     field: "tasksAssigned",
  //     headerName: "Tasks",
  //     width: 120,
  //     renderCell: (params) => (
  //       <Badge
  //         badgeContent={params.row.tasksAssigned.length}
  //         color=""
  //         sx={{
  //           mr: 2,
  //           '& .MuiBadge-badge': {
  //             backgroundColor: '#E0E0E0', // Custom blue
  //             color: '#8B8B8B',
  //           }
  //         }}
  //         // sx={{ mr: 2 }}
  //       >
  //         <AssignmentIcon color="action" />
  //       </Badge>
  //     ),
  //   },
  //   {
  //     field: "assignedPeople",
  //     headerName: "Assigned",
  //     width: 130,
  //     renderCell: (params) => (
  //       <Badge
  //         badgeContent={params.row.assignedPeople.length}
  //         color="secondary"
  //         sx={{ mr: 2,
  //           '& .MuiBadge-badge': {
  //             backgroundColor: '#E0E0E0', // Custom blue
  //             color: '#8B8B8B',
  //           }
  //          }}
  //       >
  //         <GroupIcon color="action" />
  //       </Badge>
  //     ),
  //   },
  //   {
  //     field: "loginMethod",
  //     headerName: "Login Method",
  //     width: 150,
  //     renderCell: (params) => (
  //       <Chip
  //         label={
  //           params.row.loginMethod === "traditional"
  //             ? "Password"
  //             : params.row.loginMethod === "google"
  //             ? "Google"
  //             : "Facebook"
  //         }
  //         size="small"
  //         // variant="outlined"
  //         sx={{
  //           textTransform: 'capitalize',
  //           borderColor: params.row.loginMethod === "traditional"
  //             ? "primary.main"
  //             : params.row.loginMethod === "google"
  //             ? "#DB4437"
  //             : "#4267B2",
  //           color: params.row.loginMethod === "traditional"
  //             ? "primary.main"
  //             : params.row.loginMethod === "google"
  //             ? "#DB4437"
  //             : "#4267B2"
  //         }}
  //       />
  //     ),
  //   },
  //   {
  //     field: "createdAt",
  //     headerName: "Created",
  //     width: 180,
  //     renderCell: (params) => (
  //       <Typography variant="body2" sx={{ display: "flex", alignItems: "center", height: "100%" }}>
  //         {moment(params.row.createdAt).format("DD MMM YYYY")}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     field: "updatedAt",
  //     headerName: "Updated",
  //     width: 180,
  //     renderCell: (params) => (
  //       <Typography variant="body2" sx={{ display: "flex", alignItems: "center", height: "100%" }}>
  //         {moment(params.row.updatedAt).format("DD MMM YYYY")}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 100,
  //     renderCell: (params) => (
  //       <Tooltip title="More actions" arrow>
  //         <IconButton
  //           aria-controls="user-menu"
  //           aria-haspopup="true"
  //           onClick={(e) => handleMenuOpen(e, params.row)}
  //           sx={{
  //             '&:hover': {
  //               // backgroundColor: 'primary.light',
  //               transform: 'scale(1.1)',
  //               transition: 'transform 0.2s',
  //             }
  //           }}
  //         >
  //           <MoreVertIcon />
  //         </IconButton>
  //       </Tooltip>
  //     ),
  //   },
  // ];

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 220,
      sortable: true,
      renderCell: (params) => {
        const { name, profileImage } = params.row;
        const firstLetter = name?.charAt(0)?.toUpperCase() || "U";

        // Cleaner color palette
        const colors = [
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#A37AFC",
          "#FFA07A",
          "#98D8C8",
          "#F06292",
          "#7986CB",
          "#9575CD",
          "#64B5F6",
          "#4DB6AC",
          "#81C784",
          "#FFD54F",
          "#FF8A65",
          "#A1887F",
        ];

        const backgroundColor =
          colors[firstLetter.charCodeAt(0) % colors.length] || "#90A4AE";

        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            {profileImage ? (
              <Avatar
                src={profileImage}
                alt="Profile"
                sx={{
                  width: 40,
                  height: 40,
                  mr: 2,
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  mr: 2,
                  bgcolor: backgroundColor,
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                {firstLetter}
              </Avatar>
            )}
            <Typography
              variant="body2"
              noWrap
              sx={{
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              {name}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "age",
      headerName: "Age",
      width: 90,
      sortable: true,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            color: params.row.age ? "text.primary" : "text.disabled",
          }}
        >
          {params.row.age || "-"}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      sortable: true,
      renderCell: (params) => (
        <Typography
          variant="body2"
          noWrap
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            color: "text.primary",
            // fontFamily: 'monospace'
          }}
        >
          {params.row.email}
        </Typography>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 140,
      sortable: true,
      renderCell: (params) => {
        const roleColor =
          {
            admin: "error",
            manager: "warning",
            employee: "primary",
            guest: "default",
          }[params.row.role.toLowerCase()] || "default";

        return (
          // <Chip
          //   label={params.row.role}
          //   size="small"
          //   color={roleColor}
          //   variant="outlined"
          //   sx={{
          //     textTransform: 'capitalize',
          //     fontWeight: 600,
          //     borderWidth: 1.5,
          //     fontSize: '0.75rem'
          //   }}
          // />
          <Typography
            variant="body2"
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            {params.row.role}
          </Typography>
        );
      },
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <AdminPanelSettingsIcon
            sx={{
              mr: 1,
              color: params.row.isAdmin
                ? "warning.main"
                : "action.disabledBackground",
              fontSize: "1.2rem",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: params.row.isAdmin ? 600 : 400,
              color: params.row.isAdmin ? "text.primary" : "text.secondary",
            }}
          >
            {params.row.isAdmin ? "Admin" : "User"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "isFormVerified",
      headerName: "Verified",
      width: 130,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <VerifiedIcon
            sx={{
              mr: 1,
              color: params.row.isFormVerified
                ? "success.main"
                : "action.disabledBackground",
              fontSize: "1.2rem",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: params.row.isFormVerified ? 600 : 400,
              color: params.row.isFormVerified
                ? "text.primary"
                : "text.secondary",
            }}
          >
            {params.row.isFormVerified ? "Verified" : "Pending"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "isFormFilled",
      headerName: "Form Status",
      width: 140,
      renderCell: (params) => (
        // <Chip
        //   label={params.row.isFormFilled ? "Completed" : "Incomplete"}
        //   size="small"
        //   color={params.row.isFormFilled ? "success" : "error"}
        //   variant="outlined"
        //   sx={{
        //     borderWidth: 1.5,
        //     fontWeight: 600,
        //     fontSize: '0.75rem'
        //   }}
        // />
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            fontWeight: params.row.isFormFilled ? 600 : 400,
            color: params.row.isFormFilled ? "success.main" : "error.main",
          }}
        >
          {params.row.isFormFilled ? "Completed" : "Incomplete"}
        </Typography>
      ),
    },
    {
      field: "tasksAssigned",
      headerName: "Tasks",
      width: 120,
      renderCell: (params) => (
        <Badge
          badgeContent={params.row.tasksAssigned.length}
          sx={{
            mr: 2,
            "& .MuiBadge-badge": {
              backgroundColor: "background.paper",
              color: "text.primary",
              fontWeight: 600,
              border: "1px solid",
              borderColor: "divider",
              fontSize: "0.7rem",
              height: 20,
              minWidth: 20,
            },
          }}
        >
          <AssignmentIcon
            sx={{
              color:
                params.row.tasksAssigned.length > 0
                  ? "primary.main"
                  : "action.disabled",
            }}
          />
        </Badge>
      ),
    },
    // {
    //   field: "assignedPeople",
    //   headerName: "Assigned",
    //   width: 130,
    //   renderCell: (params) => (
    //     <Badge
    //       badgeContent={params.row.assignedPeople.length}
    //       sx={{
    //         mr: 2,
    //         "& .MuiBadge-badge": {
    //           backgroundColor: "background.paper",
    //           color: "text.primary",
    //           fontWeight: 600,
    //           border: "1px solid",
    //           borderColor: "divider",
    //           fontSize: "0.7rem",
    //           height: 20,
    //           minWidth: 20,
    //         },
    //       }}
    //     >
    //       <GroupIcon
    //         sx={{
    //           color:
    //             params.row.assignedPeople.length > 0
    //               ? "secondary.main"
    //               : "action.disabled",
    //         }}
    //       />
    //     </Badge>
    //   ),
    // },
    {
      field: "loginMethod",
      headerName: "Login Method",
      width: 150,
      renderCell: (params) => {
        const methodData = {
          traditional: { label: "🔑Traditional", color: "primary.main" },
          google: { label: "🌐Google", color: "#DB4437" },
          facebook: { label: "📘Facebook", color: "#4267B2" },
        }[params.row.loginMethod] || {
          label: "Unknown",
          color: "text.secondary",
        };

        return (
          // <Chip
          //   label={methodData.label}
          //   size="small"
          //   variant="outlined"
          //   sx={{
          //     fontWeight: 600,
          //     fontSize: '0.75rem',
          //     borderWidth: 1.5,
          //     borderColor: methodData.color,
          //     color: methodData.color,
          //     '& .MuiChip-label': {
          //       px: 0.5
          //     }
          //   }}
          // />
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              fontWeight: 500,
              color: methodData.color,
            }}
          >
            {methodData.label}
          </Typography>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 180,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            color: "text.secondary",
            fontFamily: "monospace",
            fontSize: "0.8rem",
          }}
        >
          {moment(params.row.createdAt).format("DD MMM YYYY")}
        </Typography>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      width: 180,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            color: "text.secondary",
            fontFamily: "monospace",
            fontSize: "0.8rem",
          }}
        >
          {moment(params.row.updatedAt).format("DD MMM YYYY")}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Tooltip title="More actions" arrow>
          <IconButton
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuOpen(e, params.row)}
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "action.hover",
                color: "primary.main",
              },
              transition: "all 0.2s ease",
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ p: 3 }}>
        <Grow in={true} timeout={600}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 4,
              // bgcolor: "#F6F8FA",
              bgcolor: 'background.paper',
              boxShadow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  flex: 1,
                  // minWidth: 250,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 50,
                    bgcolor: "background.default",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <PersonIcon sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
              />

              <Zoom in={true} style={{ transitionDelay: "100ms" }}>
                <Tooltip title="Add new user" arrow>
                  <IconButton
                    color="primary"
                    onClick={() => navigate("/add")}
                    aria-label="Add User"
                    sx={{
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "common.white",
                      height: 50,
                      width: 50,
                      "&:hover": {
                        bgcolor: "primary.dark",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <PersonAddIcon />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
              {/* <Box sx={{ gap: 1, flexWrap: 'wrap' }}> */}
              <Zoom in={true} style={{ transitionDelay: "150ms" }}>
                <Button
                  variant={filterVerified !== 0 ? "contained" : "contained"}
                  color={
                    filterVerified === 1
                      ? "success"
                      : filterVerified === 2
                      ? "error"
                      : "inherit"
                  }
                  onClick={() => setFilterVerified((prev) => (prev + 1) % 3)}
                  startIcon={<VerifiedIcon />}
                  sx={{
                    borderRadius: 50,
                    textTransform: "none",
                    px: 3,
                    boxShadow: 0,
                    backgroundColor:
                      filterVerified === 1
                        ? "success.main"
                        : filterVerified === 2
                        ? "error.main"
                        : "#FFFFFF",
                    ":hover": {
                      bgcolor:
                        filterVerified === 1
                          ? "success.main"
                          : filterVerified === 2
                          ? "error.main"
                          : "action.hover",
                      boxShadow: 0,
                    },
                  }}
                >
                  {filterVerified === 0
                    ? "All Status"
                    : filterVerified === 1
                    ? "Verified"
                    : "Pending"}
                </Button>
              </Zoom>

              <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                <Button
                  variant={filterAdmin !== 0 ? "contained" : "contained"}
                  color={
                    filterAdmin === 1
                      ? "warning"
                      : filterAdmin === 2
                      ? "info"
                      : "inherit"
                  }
                  onClick={() => setFilterAdmin((prev) => (prev + 1) % 3)}
                  startIcon={<AdminPanelSettingsIcon />}
                  sx={{
                    borderRadius: 50,
                    textTransform: "none",
                    px: 3,
                    boxShadow: 0,
                    backgroundColor:
                      filterAdmin === 1
                        ? "warning.main"
                        : filterAdmin === 2
                        ? "info.main"
                        : "#FFFFFF",
                    ":hover": {
                      boxShadow: 0,
                      bgcolor:
                        filterAdmin === 1
                          ? "warning.main"
                          : filterAdmin === 2
                          ? "info.main"
                          : "action.hover",
                    },
                  }}
                >
                  {filterAdmin === 0
                    ? "All Roles"
                    : filterAdmin === 1
                    ? "Admins"
                    : "Users"}
                </Button>
              </Zoom>

              <Zoom in={true} style={{ transitionDelay: "250ms" }}>
                <Button
                  variant={filterRole !== 0 ? "contained" : "contained"}
                  color={
                    filterRole === 1
                      ? "primary"
                      : filterRole === 2
                      ? "secondary"
                      : "inherit"
                  }
                  onClick={() => setFilterRole((prev) => (prev + 1) % 3)}
                  startIcon={<GroupIcon />}
                  sx={{
                    borderRadius: 50,
                    textTransform: "none",
                    px: 3,
                    boxShadow: 0,
                    backgroundColor:
                      filterRole === 1
                        ? "primary.main"
                        : filterRole === 2
                        ? "secondary.main"
                        : "#FFFFFF",
                    ":hover": {
                      boxShadow: 0,
                      bgcolor:
                        filterRole === 1
                          ? "primary.main"
                          : filterRole === 2
                          ? "secondary.main"
                          : "action.hover",
                    },
                  }}
                >
                  {filterRole === 0
                    ? "All Types"
                    : filterRole === 1
                    ? "Employees"
                    : "Customers"}
                </Button>
              </Zoom>
              {/* </Box> */}
              <Zoom in={true} style={{ transitionDelay: "300ms" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  disabled={selectedUsers.length === 0}
                  startIcon={<PersonIcon />}
                  sx={{
                    borderRadius: 50,
                    textTransform: "none",
                    px: 3,
                    "&:disabled": {
                      bgcolor: "action.disabledBackground",
                      color: "text.disabled",
                    },
                    ":hover": {
                      bgcolor: "error.main",
                      boxShadow: 2,
                    },
                  }}
                >
                  Delete Selected
                </Button>
              </Zoom>

              <Zoom in={true} style={{ transitionDelay: "350ms" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleVerify}
                  disabled={selectedUsers.length === 0}
                  startIcon={<VerifiedIcon />}
                  sx={{
                    borderRadius: 50,
                    textTransform: "none",
                    px: 3,
                    "&:disabled": {
                      bgcolor: "action.disabledBackground",
                      color: "text.disabled",
                    },
                    ":hover": {
                      bgcolor: "success.main",
                      boxShadow: 2,
                    },
                  }}
                >
                  Verify Selected
                </Button>
              </Zoom>
            </Box>

            <Box
              sx={{
                height: 500,
                width: "100%",
                "& .MuiDataGrid-root": {
                  border: "none",
                  borderRadius: 4,
                },
                "& .MuiDataGrid-columnHeaders": {
                  bgcolor: "primary.main",
                  color: "common.black",
                  fontSize: 14,
                  borderRadius: "16px 16px 0 0",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid",
                  borderColor: "divider",
                },
                "& .MuiDataGrid-row:hover": {
                  bgcolor: "action.hover",
                },
                "& .MuiDataGrid-virtualScroller": {
                  bgcolor: "background.paper",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  bgcolor: "background.default",
                  borderRadius: "0 0 16px 16px",
                },
              }}
            >
              <DataGrid
                rows={filteredUsers}
                columns={columns}
                autoPageSize
                checkboxSelection
                onRowSelectionModelChange={(newSelection) => {
                  setSelectedUsers(newSelection);
                }}
                rowSelectionModel={selectedUsers}
                getRowId={(row) => row._id}
                disableRowSelectionOnClick
                // sx={{
                //   marginRight: "20px",
                //   marginLeft: "20px",
                //   borderRadius: "30px",
                //   backgroundColor: "#FFFFFF",
                //   border: "0px solid #DFDFDF",
                //   "& .MuiDataGrid-columnHeaders": {
                //     backgroundColor: "#031738",
                //     fontSize: "16px",
                //     fontWeight: "",
                //   },
                //   "& .MuiDataGrid-row:nth-of-type(even)": {
                //     backgroundColor: "#FFFFFF",
                //   },
                //   "& .MuiDataGrid-row:nth-of-type(odd)": {
                //     backgroundColor: "#FFFFFF",
                //   },
                //   "& .MuiDataGrid-cell": {
                //     fontSize: "14px",
                //   },
                // }}
              />
            </Box>
          </Paper>
        </Grow>

        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          TransitionComponent={Grow}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            elevation: 8,
            sx: {
              borderRadius: 2,
              minWidth: 180,
              py: 0.5,
            },
          }}
        >
          <MenuItem
            onClick={() => {
              navigate(`/update/${selectedUser?._id}`);
              handleMenuClose();
            }}
            sx={{
              "&:hover": {
                // bgcolor: 'primary.light',
                color: "primary.main",
              },
            }}
          >
            View Details
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleMenuClose();
            }}
            sx={{
              color: "error.main",
              "&:hover": {
                // bgcolor: 'error.light',
              },
            }}
          >
            Delete User
          </MenuItem>
        </Menu>

        <CustomerSegmentation />
      </Box>
    </Fade>
  );
};

export default UserList;
