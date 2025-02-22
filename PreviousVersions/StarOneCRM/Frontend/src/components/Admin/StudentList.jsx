import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]); // Deselect all
    } else {
      setSelectedUsers(users.map((user) => user._id)); // Select all
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
    // Apply Verified filter
    if (filterVerified === 1 && !user.isFormVerified) return false;
    if (filterVerified === 2 && user.isFormVerified) return false;

    // Apply Admin filter
    if (filterAdmin === 1 && !user.isAdmin) return false;
    if (filterAdmin === 2 && user.isAdmin) return false;

    if (filterRole === 1 && user.role === "employee") return false;
    if (filterRole === 2 && user.role === "customer") return false;

    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns = [
    {
      name: (
        <input
          type="checkbox"
          checked={selectedUsers.length === users.length}
          onChange={handleSelectAll}
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedUsers.includes(row._id)}
          onChange={() => handleSelectUser(row._id)}
        />
      ),
      width: "5%",
    },
    {
      name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Name</span>,
      selector: (row) => (
        <span style={{ fontWeight: "400", fontSize: "14px" }}>{row.name}</span>
      ),
      sortable: true,
      sortFunction: (a, b) => a.name.localeCompare(b.name),
    },
    {
      name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Age</span>,
      selector: (row) => (
        <span style={{ fontWeight: "400", fontSize: "14px" }}>{row.age}</span>
      ),
      sortable: true,
      sortFunction: (a, b) => a.age - b.age,
    },
    {
      name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Email</span>,
      selector: (row) => (
        <span
          style={{
            fontWeight: "400",
            fontSize: "14px",
            color: "var(--email-color)",
            textDecoration: "underline",
          }}
        >
          {row.email}
        </span>
      ),
      sortable: true,
      sortFunction: (a, b) => a.email.localeCompare(b.email),
    },
    {
      name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Roles</span>,
      selector: (row) => row.role,
      sortable: true,
      sortFunction: (a, b) => a.role.localeCompare(b.role),
    },
    {
      name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Status</span>,
      selector: (row) => (
        <div>
          <span
            style={{
              color: row.isFormVerified
                ? "var(--verified-color)"
                : "var(--not-verified-color)",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {row.isFormVerified ? "✔ Verified" : "✖ Not Verified"}
          </span>
          <br />
          <span
            style={{
              color: row.isAdmin
                ? "var(--admin-color)"
                : "var(--not-admin-color)",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {row.isAdmin ? "✔ Admin" : "✖ Not Admin"}
          </span>
        </div>
      ),
      // sortable: true,
    },
    {
      name: (
        <span style={{ fontWeight: "400", fontSize: "16px" }}>Actions</span>
      ),
      cell: (row) => (
        <div>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuOpen(e, row)}
            style={{ color: "var(--icon-color)" }}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        "&:nth-of-type(odd)": {
          backgroundColor: "var(--table-backgroud-light)",
        },
        "&:nth-of-type(even)": {
          backgroundColor: "var(--table-backgroud-dark)",
        },
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer />
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
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
      >
        <Button
          variant={filterVerified !== 0 ? "contained" : "outlined"}
          color="success"
          onClick={() => setFilterVerified((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
          style={{
            marginRight: "10px",
            marginTop: "10px",
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
          onClick={() => setFilterAdmin((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
          style={{
            marginRight: "10px",
            marginTop: "10px",
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
          onClick={() => setFilterRole((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
          style={{
            marginRight: "10px",
            marginTop: "10px",
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
          style={{ marginRight: "10px" }}
          sx={{
            backgroundColor: "white",
            color: "#000000",
            marginTop: "10px",
            borderRadius: "5px",
            "&.Mui-disabled": { backgroundColor: "#EFEFE", color: "#FFFFFF" },
            "&:hover": { backgroundColor: "#FDB8DC" },
          }}
        >
          Delete Selected
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerify}
          disabled={selectedUsers.length === 0}
          sx={{
            backgroundColor: "white",
            color: "#000000",
            marginTop: "10px",
            borderRadius: "5px",
            "&.Mui-disabled": { backgroundColor: "#EFEFE", color: "#FFFFFF" },
            "&:hover": { backgroundColor: "#FDB8DC" },
          }}
        >
          Verify Selected
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        striped
        responsive
        customStyles={customStyles}
      />
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
    </div>
  );
};

export default UserList;

// import React, { useEffect, useState } from "react";
// import axiosInstance from '../../utils/axios';
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { toast, ToastContainer } from "react-toastify";
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
//           await axiosInstance.delete(`/admin/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
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
//           await axiosInstance.patch(`/admin/verify/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
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

//   const handleSelectUser = (userId) => {
//     setSelectedUsers((prevSelected) =>
//       prevSelected.includes(userId)
//         ? prevSelected.filter((id) => id !== userId)
//         : [...prevSelected, userId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedUsers.length === users.length) {
//       setSelectedUsers([]); // Deselect all
//     } else {
//       setSelectedUsers(users.map((user) => user._id)); // Select all
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
//     if (filterVerified === 1 && !user.isFormVerified) return false; // Only verified
//     if (filterVerified === 2 && user.isFormVerified) return false; // Only not verified

//     // Apply Admin filter
//     if (filterAdmin === 1 && !user.isAdmin) return false; // Only Admin
//     if (filterAdmin === 2 && user.isAdmin) return false; // Only Not Admin

//     if (filterRole === 1 && user.role === "employee") return false; // Only Admin
//     if (filterRole === 2 && user.role === "customer") return false; // Only Not Admin

//     return (
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase()) ||
//       user.role.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   const columns = [
//     {
//       name: (
//         <input
//           type="checkbox"
//           checked={selectedUsers.length === users.length}
//           onChange={handleSelectAll}
//         />
//       ),
//       cell: (row) => (
//         <input
//           type="checkbox"
//           checked={selectedUsers.includes(row._id)}
//           onChange={() => handleSelectUser(row._id)}
//         />
//       ),
//       width: "5%",
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Name</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.name}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Age</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.age}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.age - b.age,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Email</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px', color: 'var(--email-color)', textDecoration: "underline" }}>{row.email}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.email.localeCompare(b.email),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Roles</span>,
//       selector: (row) => row.role,
//       sortable: true,
//       sortFunction: (a, b) => a.role.localeCompare(b.role),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Status</span>,
//       selector: (row) => (
//         <div>
//           <span
//             style={{
//               color: row.isFormVerified ? 'var(--verified-color)' : 'var(--not-verified-color)',
//               fontWeight: '400',
//               fontSize: '14px',
//             }}
//           >
//             {row.isFormVerified ? '✔ Verified' : '✖ Not Verified'}
//           </span>
//           <br />
//           <span
//             style={{
//               color: row.isAdmin ? 'var(--admin-color)' : 'var(--not-admin-color)',
//               fontWeight: '400',
//               fontSize: '14px',
//             }}
//           >
//             {row.isAdmin ? '✔ Admin' : '✖ Not Admin'}
//           </span>
//         </div>
//       ),
//       // sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Actions</span>,
//       cell: (row) => (
//         <div>
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, row)}
//             style={{ color: 'var(--icon-color)' }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         </div>
//       ),
//     }
//   ];

//   const customStyles = {
//     rows: {
//       style: {
//         "&:nth-of-type(odd)": {
//           backgroundColor: "var(--table-backgroud-light)",
//         },
//         "&:nth-of-type(even)": {
//           backgroundColor: "var(--table-backgroud-dark)",
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ padding: "20px", backgroundColor:"#2B2A3C" }}>
//       <ToastContainer />
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ flex: 1, marginRight: "10px" }}
//           sx={{backgroundColor: "white", borderRadius:"5px"}}
//         />
//         <IconButton
//           color="primary"
//           onClick={() => navigate("/add")}
//           aria-label="Add User"
//           sx={{backgroundColor: "#FDB8DC", color:"#000000", borderRadius:"50px",padding:"15px", "&.Mui-disabled": { backgroundColor: "#373646", color: "#FFFFFF" },  "&:hover": { backgroundColor: "#FDB8DC" }}}
//         >
//           <PersonAddIcon />
//         </IconButton>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>

//         <Button
//           variant={filterVerified !== 0 ? "contained" : "outlined"}
//           color="success"
//           onClick={() => setFilterVerified((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
//           style={{
//             marginRight: "10px",
//             backgroundColor: filterVerified === 1 ? "green" : filterVerified === 2 ? "red" : "",
//             color: filterVerified !== 0 ? "white" : "",
//           }}
//           sx={{backgroundColor: "white", borderRadius:"5px"}}
//         >
//           Verified
//         </Button>
//         <Button
//           variant={filterAdmin !== 0 ? "contained" : "outlined"}
//           color="warning"
//           onClick={() => setFilterAdmin((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
//           style={{ marginRight: "10px",
//             backgroundColor: filterAdmin === 1 ? "#f57c00" : filterAdmin === 2 ? "#1976d2" : "",
//             color: filterAdmin !== 0 ? "white" : "",
//           }}
//           sx={{backgroundColor: "white", borderRadius:"5px"}}
//         >
//           Admin
//         </Button>
//         <Button
//           variant={filterRole !== 0 ? "contained" : "outlined"}
//           color="warning"
//           onClick={() => setFilterRole((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
//           style={{ marginRight: "10px",
//             backgroundColor: filterRole === 1 ? "#f57c00" : filterRole === 2 ? "#1976d2" : "",
//             color: filterRole !== 0 ? "white" : "",
//           }}
//           sx={{backgroundColor: "white", borderRadius:"5px"}}
//         >
//           Role
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleDelete}
//           disabled={selectedUsers.length === 0}
//           style={{ marginRight: "10px" }}
//           sx={{backgroundColor: "white", color:"#000000", borderRadius:"5px", "&.Mui-disabled": { backgroundColor: "#373646", color: "#FFFFFF" },  "&:hover": { backgroundColor: "#FDB8DC" }}}

//         >
//           Delete Selected
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleVerify}
//           disabled={selectedUsers.length === 0}
//           sx={{backgroundColor: "white", color:"#000000", borderRadius:"5px", "&.Mui-disabled": { backgroundColor: "#373646", color: "#FFFFFF" },  "&:hover": { backgroundColor: "#FDB8DC" }}}
//         >
//           Verify Selected
//         </Button>
//       </div>
//       <DataTable
//         columns={columns}
//         data={filteredUsers}
//         pagination
//         // highlightOnHover
//         striped
//         responsive
//         customStyles={{
//           header: {
//           style: {
//             backgroundColor: '#2B2A3C',
//             color: 'white',
//           },
//           },
//           headRow: {
//           style: {
//             backgroundColor: '#2B2A3C',
//             color: 'white',
//           },
//           },
//           headCells: {
//           style: {
//             color: 'white',
//           },
//           },
//           rows: {
//           style: {
//             backgroundColor: '#2B2A3C',
//             color: 'white',
//             '&:nth-of-type(odd)': {
//               color:"white",
//             backgroundColor: '#33324A',
//             },
//             '&:nth-of-type(even)': {
//             backgroundColor: '#2B2A3C',
//             },
//           },
//           },
//           pagination: {
//           style: {
//             backgroundColor: '#2B2A3C',
//             color: 'white',
//           },
//           },
//         }}
//       />
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
//         {/* <MenuItem
//           onClick={() => {
//             handleVerify(selectedUser._id);
//             handleMenuClose();
//           }}
//         >
//           Verify
//         </MenuItem> */}
//       </Menu>
//     </div>
//   );
// };

// export default UserList;

// import React, { useEffect, useState } from "react";
// import axiosInstance from '../../utils/axios';
// import { useNavigate } from "react-router-dom";
// import { IconButton, Menu, MenuItem, TextField, Button, Box } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { toast, ToastContainer } from "react-toastify";
// import { DataGrid } from '@mui/x-data-grid';
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

//   const fetchUsers = async () => {
//     try {
//       const response = await axiosInstance.get("/admin/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(response.data.data);
//       // toast.success("Users fetched successfully");
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       // toast.error("Failed to fetch users");
//       setUserMethod(null);
//       logout();
//       navigate("/");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await Promise.all(
//         selectedUsers.map(async (id) => {
//           await axiosInstance.delete(`/admin/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//         })
//       );
//       setUsers((prevUsers) =>
//         prevUsers.filter((user) => !selectedUsers.includes(user._id))
//       );
//       setSelectedUsers([]);
//       // toast.success("Selected users deleted successfully");
//     } catch (error) {
//       console.error("Error deleting users:", error);
//       // toast.error("Error deleting users");
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       await Promise.all(
//         selectedUsers.map(async (id) => {
//           await axiosInstance.patch(`/admin/verify/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
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
//       // toast.success("Selected users verified successfully");
//     } catch (error) {
//       console.error("Error verifying users:", error);
//       // toast.error("Error verifying users");
//     }
//   };

//   const handleSelectUser = (userId) => {
//     setSelectedUsers((prevSelected) =>
//       prevSelected.includes(userId)
//         ? prevSelected.filter((id) => id !== userId)
//         : [...prevSelected, userId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedUsers.length === users.length) {
//       setSelectedUsers([]); // Deselect all
//     } else {
//       setSelectedUsers(users.map((user) => user._id)); // Select all
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
//     if (filterVerified === 1 && !user.isFormVerified) return false;
//     if (filterVerified === 2 && user.isFormVerified) return false;
//     if (filterAdmin === 1 && !user.isAdmin) return false;
//     if (filterAdmin === 2 && user.isAdmin) return false;
//     if (filterRole === 1 && user.role === "employee") return false;
//     if (filterRole === 2 && user.role === "customer") return false;

//     return (
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase()) ||
//       user.role.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   const columns = [
//     {
//       field: 'select',
//       headerName: 'Select',
//       width: 90,
//       renderCell: (params) => (
//         <input
//           type="checkbox"
//           checked={selectedUsers.includes(params.row._id)}
//           onChange={() => handleSelectUser(params.row._id)}
//         />
//       ),
//     },
//     { field: 'name', headerName: 'Name', width: 150, sortable: true },
//     { field: 'age', headerName: 'Age', width: 100, sortable: true },
//     { field: 'email', headerName: 'Email', width: 200, sortable: true },
//     { field: 'role', headerName: 'Roles', width: 150, sortable: true },
//     { field: 'status', headerName: 'Status', width: 200, renderCell: (params) => (
//       <div>
//         <span style={{ color: params.row.isFormVerified ? 'green' : 'red' }}>
//           {params.row.isFormVerified ? '✔ Verified' : '✖ Not Verified'}
//         </span>
//         <br />
//         <span style={{ color: params.row.isAdmin ? 'orange' : 'blue' }}>
//           {params.row.isAdmin ? '✔ Admin' : '✖ Not Admin'}
//         </span>
//       </div>
//     )},
//     {
//       field: 'actions',
//       headerName: 'Actions',
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
//     <div style={{ padding: "20px" }}>
//       {/* <ToastContainer /> */}
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ flex: 1, marginRight: "10px" }}
//         />
//         <IconButton
//           color="primary"
//           onClick={() => navigate("/add")}
//           aria-label="Add User"
//         >
//           <PersonAddIcon />
//         </IconButton>
//       </div>

//       <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
//         <Button variant={filterVerified !== 0 ? "contained" : "outlined"} color="success" onClick={() => setFilterVerified((prev) => (prev + 1) % 3)}>
//           Verified
//         </Button>
//         <Button variant={filterAdmin !== 0 ? "contained" : "outlined"} color="warning" onClick={() => setFilterAdmin((prev) => (prev + 1) % 3)}>
//           Admin
//         </Button>
//         <Button variant={filterRole !== 0 ? "contained" : "outlined"} color="warning" onClick={() => setFilterRole((prev) => (prev + 1) % 3)}>
//           Role
//         </Button>
//         <Button variant="contained" color="secondary" onClick={handleDelete} disabled={selectedUsers.length === 0}>
//           Delete Selected
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleVerify} disabled={selectedUsers.length === 0}>
//           Verify Selected
//         </Button>
//       </div>

//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={filteredUsers}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5]}
//           checkboxSelection
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
//     </div>
//   );
// };

// export default UserList;
