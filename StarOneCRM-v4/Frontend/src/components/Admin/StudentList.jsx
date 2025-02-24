// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import {
//   IconButton,
//   Menu,
//   MenuItem,
//   TextField,
//   Button,
//   Box,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { toast, ToastContainer } from "react-toastify";
// import { DataGrid } from "@mui/x-data-grid";
// import "react-toastify/dist/ReactToastify.css";

// const UserList = ({ token, setUserMethod, logout }) => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [filterVerified, setFilterVerified] = useState(0);
//   const [filterAdmin, setFilterAdmin] = useState(0);
//   const [filterRole, setFilterRole] = useState(0);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     console.log(selectedUsers);
//   //   }, 2000);

//   //   return () => clearInterval(interval);
//   // }, [selectedUsers]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axiosInstance.get("/admin/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(response.data.data);
//       toast.success("Users fetched successfully");
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       toast.error("Failed to fetch users");
//       setUserMethod(null);
//       logout();
//       navigate("/");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await Promise.all(
//         selectedUsers.map(async (id) => {
//           await axiosInstance.delete(
//             `/admin/${id}`,
//             {},
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//         })
//       );
//       setUsers((prevUsers) =>
//         prevUsers.filter((user) => !selectedUsers.includes(user._id))
//       );
//       setSelectedUsers([]);
//       toast.success("Selected users deleted successfully");
//     } catch (error) {
//       console.error("Error deleting users:", error);
//       toast.error("Error deleting users");
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       await Promise.all(
//         selectedUsers.map(async (id) => {
//           await axiosInstance.patch(
//             `/admin/verify/${id}`,
//             {},
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//         })
//       );
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           selectedUsers.includes(user._id)
//             ? { ...user, isFormVerified: true }
//             : user
//         )
//       );
//       setSelectedUsers([]);
//       toast.success("Selected users verified successfully");
//     } catch (error) {
//       console.error("Error verifying users:", error);
//       toast.error("Error verifying users");
//     }
//   };

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
//     // Apply Verified filter
//     if (filterVerified === 1 && !user.isFormVerified) return false;
//     if (filterVerified === 2 && user.isFormVerified) return false;

//     // Apply Admin filter
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
//     { field: "name", headerName: "Name", width: 150, sortable: true },
//     { field: "age", headerName: "Age", width: 100, sortable: true },
//     { field: "email", headerName: "Email", width: 200, sortable: true },
//     { field: "role", headerName: "Roles", width: 150, sortable: true },
//     {
//       field: "isAdmin",
//       headerName: "Admin",
//       width: 150,
//       renderCell: (params) => (
//         <span style={{ color: params.row.isAdmin ? "orange" : "blue" }}>
//           {params.row.isAdmin ? "✔ Admin" : "✖ Not Admin"}
//         </span>
//       ),
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 200,
//       renderCell: (params) => (
//         <div>
//           <span style={{ color: params.row.isFormVerified ? "green" : "red" }}>
//             {params.row.isFormVerified ? "✔ Verified" : "✖ Not Verified"}
//           </span>
//         </div>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 150,
//       renderCell: (params) => (
//         <div>
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, params.row)}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div style={{ padding: "20px", marginTop: "20px" }}>
//         <ToastContainer />
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             // marginBottom: "20px",
//           }}
//         >
//           <TextField
//             variant="outlined"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{ flex: 1, marginRight: "10px" }}
//           />
//           <IconButton
//             color="primary"
//             onClick={() => navigate("/add")}
//             aria-label="Add User"
//           >
//             <PersonAddIcon />
//           </IconButton>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginBottom: "20px",
//             flexWrap: "wrap",
//           }}
//         ></div>
//         <Button
//           variant={filterVerified !== 0 ? "contained" : "outlined"}
//           color="success"
//           onClick={() => setFilterVerified((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
//           style={{
//             // marginRight: "10px",
//             // marginTop: "10px",
//             margin: "10px",
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
//           onClick={() => setFilterAdmin((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
//           style={{
//             // marginRight: "10px",
//             // marginTop: "10px",
//             margin: "10px",
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
//           onClick={() => setFilterRole((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
//           style={{
//             // marginRight: "10px",
//             // marginTop: "10px",
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
//           disabled={selectedUsers.length === 0}
//           sx={{ margin: "10px" }}
//         >
//           Delete Selected
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleVerify}
//           disabled={selectedUsers.length === 0}
//           sx={{ margin: "10px" }}
//         >
//           Verify Selected
//         </Button>
//       </div>

//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={filteredUsers}
//           columns={columns}
//           // pageSize={5}
//           // rowsPerPageOptions={[5]}
//           // pageSizeOptions={[5, 10, 25]}
//           // paginationMode='client'
//           // paginationModel={{
//           //   pageSize: 5,
//           //   page: 0,
//           // }}
//           initialState={{
//             ...filteredUsers.initialState,
//             pagination: { paginationModel: { pageSize: 5 } },
//           }}
//           pageSizeOptions={[5, 10, 25]}
//           checkboxSelection
//           paginationMode="client"
//           rowCount={filteredUsers?.length ?? 0}
//           onRowSelectionModelChange={(newSelection) => {
//             setSelectedUsers(newSelection);
//           }}
//           rowSelectionModel={selectedUsers}
//           getRowId={(row) => row._id}
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
//             handleDelete(selectedUser._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };
// export default UserList;





import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast, ToastContainer } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const UserList = ({ token, setUserMethod, logout }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterVerified, setFilterVerified] = useState(0);
  const [filterAdmin, setFilterAdmin] = useState(0);
  const [filterRole, setFilterRole] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/admin/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.data);
      toast.success("Users fetched successfully");
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
      setUserMethod(null);
      logout();
      navigate("/");
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedUsers.map(async (id) => {
          await axiosInstance.delete(
            `/admin/${id}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        })
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => !selectedUsers.includes(user._id))
      );
      setSelectedUsers([]);
      toast.success("Selected users deleted successfully");
    } catch (error) {
      console.error("Error deleting users:", error);
      toast.error("Error deleting users");
    }
  };

  const handleVerify = async () => {
    try {
      await Promise.all(
        selectedUsers.map(async (id) => {
          await axiosInstance.patch(
            `/admin/verify/${id}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        })
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user._id)
            ? { ...user, isFormVerified: true }
            : user
        )
      );
      setSelectedUsers([]);
      toast.success("Selected users verified successfully");
    } catch (error) {
      console.error("Error verifying users:", error);
      toast.error("Error verifying users");
    }
  };

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
  //   { field: "name", headerName: "Name", width: 150, sortable: true },
  //   { field: "age", headerName: "Age", width: 100, sortable: true },
  //   { field: "email", headerName: "Email", width: 200, sortable: true },
  //   { field: "role", headerName: "Roles", width: 150, sortable: true },
  //   {
  //     field: "isAdmin",
  //     headerName: "Admin",
  //     width: 150,
  //     renderCell: (params) => (
  //       <span style={{ color: params.row.isAdmin ? "orange" : "blue" }}>
  //         {params.row.isAdmin ? "✔ Admin" : "✖ Not Admin"}
  //       </span>
  //     ),
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     width: 200,
  //     renderCell: (params) => (
  //       <div>
  //         <span style={{ color: params.row.isFormVerified ? "green" : "red" }}>
  //           {params.row.isFormVerified ? "✔ Verified" : "✖ Not Verified"}
  //         </span>
  //       </div>
  //     ),
  //   },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 150,
  //     renderCell: (params) => (
  //       <div>
  //         <IconButton
  //           aria-controls="simple-menu"
  //           aria-haspopup="true"
  //           onClick={(e) => handleMenuOpen(e, params.row)}
  //         >
  //           <MoreVertIcon />
  //         </IconButton>
  //       </div>
  //     ),
  //   },
  // ];


  // const columns = [
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     width: 200,
  //     sortable: true,
  //     renderCell: (params) => {
  //       const name = params.row.name;
  //       const firstLetter = name.charAt(0).toUpperCase();
  //       const colors = [
  //         "#FF5733", "#FFBD33", "#DBFF33", "#75FF33", "#33FF57", "#33FFBD", "#33DBFF",
  //         "#3375FF", "#5733FF", "#BD33FF", "#FF33DB", "#FF3375", "#FF3333", "#FF8C33",
  //         "#FFD633", "#D6FF33", "#8CFF33", "#33FF8C", "#33FFD6", "#33D6FF", "#338CFF",
  //         "#5733FF", "#8C33FF", "#D633FF", "#FF33D6", "#FF338C"
  //       ];
  //       const backgroundColor = colors[firstLetter.charCodeAt(0) - 65];
  //       return (
  //         <div style={{ display: "flex", alignItems: "center" }}>
  //           <div
  //             style={{
  //               width: 40,
  //               height: 40,
  //               borderRadius: "50%",
  //               backgroundColor,
  //               display: "flex",
  //               alignItems: "center",
  //               justifyContent: "center",
  //               color: "white",
  //               fontWeight: "bold",
  //               marginRight: 10,
  //             }}
  //           >
  //             {firstLetter}
  //           </div>
  //           <span>{name}</span>
  //         </div>
  //       );
  //     },
  //   },
  //   { field: "age", headerName: "Age", width: 100, sortable: true },
  //   { field: "email", headerName: "Email", width: 200, sortable: true },
  //   { field: "role", headerName: "Roles", width: 150, sortable: true },
  //   {
  //     field: "isAdmin",
  //     headerName: "Admin",
  //     width: 150,
  //     renderCell: (params) => (
  //       <span style={{ color: params.row.isAdmin ? "orange" : "blue" }}>
  //         {params.row.isAdmin ? "✔ Admin" : "✖ Not Admin"}
  //       </span>
  //     ),
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     width: 200,
  //     renderCell: (params) => (
  //       <div>
  //         <span style={{ color: params.row.isFormVerified ? "green" : "red" }}>
  //           {params.row.isFormVerified ? "✔ Verified" : "✖ Not Verified"}
  //         </span>
  //       </div>
  //     ),
  //   },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 150,
  //     renderCell: (params) => (
  //       <div>
  //         <IconButton
  //           aria-controls="simple-menu"
  //           aria-haspopup="true"
  //           onClick={(e) => handleMenuOpen(e, params.row)}
  //         >
  //           <MoreVertIcon />
  //         </IconButton>
  //       </div>
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
        const name = params.row.name;
        const firstLetter = name.charAt(0).toUpperCase();
        const colors = [
          "#FF5733", "#FFBD33", "#DBFF33", "#75FF33", "#33FF57", "#33FFBD", "#33DBFF",
          "#3375FF", "#5733FF", "#BD33FF", "#FF33DB", "#FF3375", "#FF3333", "#FF8C33",
          "#FFD633", "#D6FF33", "#8CFF33", "#33FF8C", "#33FFD6", "#33D6FF", "#338CFF",
          "#5733FF", "#8C33FF", "#D633FF", "#FF33D6", "#FF338C"
        ];
        const backgroundColor = colors[firstLetter.charCodeAt(0) - 65] || "#999";
  
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "",
                marginRight: 10,
              }}
            >
              {firstLetter}
            </div>
            <span>{name}</span>
          </div>
        );
      },
    },
    { field: "age", headerName: "Age", width: 90, sortable: true },
    { field: "email", headerName: "Email", width: 250, sortable: true },
    { field: "role", headerName: "Role", width: 140, sortable: true },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
      renderCell: (params) => (
        <span style={{ color: params.row.isAdmin ? "orange" : "blue", fontWeight: "" }}>
          {params.row.isAdmin ? "✔ Admin" : "✖ Not Admin"}
        </span>
      ),
    },
    {
      field: "isFormVerified",
      headerName: "Verified",
      width: 130,
      renderCell: (params) => (
        <span style={{ color: params.row.isFormVerified ? "green" : "red", fontWeight: "" }}>
          {params.row.isFormVerified ? "✔ Verified" : "✖ Not Verified"}
        </span>
      ),
    },
    {
      field: "isFormFilled",
      headerName: "Form Filled",
      width: 140,
      renderCell: (params) => (
        <span style={{ color: params.row.isFormFilled ? "green" : "red", fontWeight: "" }}>
          {params.row.isFormFilled ? "✔ Yes" : "✖ No"}
        </span>
      ),
    },
    {
      field: "tasksAssigned",
      headerName: "Tasks Assigned",
      width: 160,
      renderCell: (params) => (
        <span style={{ fontWeight: "" }}>
          {params.row.tasksAssigned.length} Tasks
        </span>
      ),
    },
    {
      field: "assignedPeople",
      headerName: "Assigned People",
      width: 170,
      renderCell: (params) => (
        <span style={{ fontWeight: "" }}>
          {params.row.assignedPeople.length} People
        </span>
      ),
    },
    {
      field: "loginMethod",
      headerName: "Login Method",
      width: 140,
      renderCell: (params) => (
        <span style={{ fontWeight: "" }}>
          {params.row.loginMethod === "traditional" ? "🔑 Password" : params.row.loginMethod === "google" ? "🌐 Google" : "📘 Facebook"}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      renderCell: (params) => (
        <span style={{ fontSize: "14px" }}>
          {moment(params.row.createdAt).format("DD MMM YYYY, HH:mm")}
        </span>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,
      renderCell: (params) => (
        <span style={{ fontSize: "14px" }}>
          {moment(params.row.updatedAt).format("DD MMM YYYY, HH:mm")}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="More Actions">
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuOpen(e, params.row)}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  
  return (
    <>
      <div style={{ padding: "20px", marginTop: "20px" }}>
        <ToastContainer />
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, marginRight: "10px" }}
          />
          <IconButton
            color="primary"
            onClick={() => navigate("/add")}
            aria-label="Add User"
          >
            <PersonAddIcon />
          </IconButton>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        ></div>
        <Button
          variant={filterVerified !== 0 ? "contained" : "outlined"}
          color="success"
          onClick={() => setFilterVerified((prev) => (prev + 1) % 3)}
          style={{
            margin: "10px",
            backgroundColor:
              filterVerified === 1
                ? "green"
                : filterVerified === 2
                ? "red"
                : "",
            color: filterVerified !== 0 ? "white" : "",
          }}
        >
          Verified
        </Button>
        <Button
          variant={filterAdmin !== 0 ? "contained" : "outlined"}
          color="warning"
          onClick={() => setFilterAdmin((prev) => (prev + 1) % 3)}
          style={{
            margin: "10px",
            backgroundColor:
              filterAdmin === 1
                ? "#f57c00"
                : filterAdmin === 2
                ? "#1976d2"
                : "",
            color: filterAdmin !== 0 ? "white" : "",
          }}
        >
          Admin
        </Button>
        <Button
          variant={filterRole !== 0 ? "contained" : "outlined"}
          color="warning"
          onClick={() => setFilterRole((prev) => (prev + 1) % 3)}
          style={{
            margin: "10px",
            backgroundColor:
              filterRole === 1 ? "#f57c00" : filterRole === 2 ? "#1976d2" : "",
            color: filterRole !== 0 ? "white" : "",
          }}
        >
          Role
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          disabled={selectedUsers.length === 0}
          sx={{ margin: "10px" }}
        >
          Delete Selected
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerify}
          disabled={selectedUsers.length === 0}
          sx={{ margin: "10px" }}
        >
          Verify Selected
        </Button>
      </div>

      <div style={{ height: 480, width: "100%" }}>
        {/* <DataGrid
          rows={filteredUsers}
          columns={columns}
          initialState={{
            ...filteredUsers.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          paginationMode="client"
          rowCount={filteredUsers?.length ?? 0}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedUsers(newSelection);
          }}
          rowSelectionModel={selectedUsers}
          getRowId={(row) => row._id}
        /> */}
        <DataGrid
      rows={filteredUsers}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[5, 10, 25]}
      checkboxSelection
      paginationMode="client"
      rowCount={filteredUsers?.length ?? 0}
      onRowSelectionModelChange={(newSelection) => {
        setSelectedUsers(newSelection);
      }}
      rowSelectionModel={selectedUsers}
      getRowId={(row) => row._id}
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#f5f5f5",
          fontSize: "16px",
          fontWeight: "",
        },
        "& .MuiDataGrid-row:nth-of-type(even)": {
          backgroundColor: "#f9f9f9",
        },
        "& .MuiDataGrid-cell": {
          fontSize: "14px",
        },
      }}
    />

      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            navigate(`/update/${selectedUser._id}`);
            handleMenuClose();
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(selectedUser._id);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserList;
