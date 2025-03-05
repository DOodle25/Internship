import React, { useEffect, useState } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useGlobalContext } from "../../context/GlobalContext";
import CustomerSegmentation from "./CustomerSegmentation";

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

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 220,
      sortable: true,
      renderCell: (params) => {
        const { name, profileImage } = params.row;
        const firstLetter = name.charAt(0).toUpperCase();
        const colors = [
          "#8B0000",
          "#8B4513",
          "#2F4F4F",
          "#556B2F",
          "#8B008B",
          "#483D8B",
          "#2E8B57",
          "#4B0082",
          "#191970",
          "#00008B",
          "#8B0000",
          "#8B4513",
          "#2F4F4F",
          "#556B2F",
          "#8B008B",
          "#483D8B",
          "#2E8B57",
          "#4B0082",
          "#191970",
          "#00008B",
          "#8B0000",
          "#8B4513",
          "#2F4F4F",
          "#556B2F",
          "#8B008B",
          "#483D8B",
        ];

        const backgroundColor =
          colors[firstLetter.charCodeAt(0) - 65] || "#999";

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  // width: 40,
                  minWidth: 40,
                  maxHeight: 40,
                  minHeight: 40,
                  maxWidth: 40,
                  // height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: 10,
                }}
              />
            ) : (
              <div
                style={{
                  // width: 40,
                  // height: 40,
                  minWidth: 40,
                  maxHeight: 40,
                  minHeight: 40,
                  maxWidth: 40,
                  borderRadius: "50%",
                  backgroundColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  marginRight: 10,
                }}
              >
                {firstLetter}
              </div>
            )}
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
        <span
          style={{
            color: params.row.isAdmin ? "orange" : "blue",
            fontWeight: "",
          }}
        >
          {params.row.isAdmin ? "✔ Admin" : "✖ Not Admin"}
        </span>
      ),
    },
    {
      field: "isFormVerified",
      headerName: "Verified",
      width: 130,
      renderCell: (params) => (
        <span
          style={{
            color: params.row.isFormVerified ? "green" : "red",
            fontWeight: "",
          }}
        >
          {params.row.isFormVerified ? "✔ Verified" : "✖ Not Verified"}
        </span>
      ),
    },
    {
      field: "isFormFilled",
      headerName: "Form Filled",
      width: 140,
      renderCell: (params) => (
        <span
          style={{
            color: params.row.isFormFilled ? "green" : "red",
            fontWeight: "",
          }}
        >
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
          {params.row.loginMethod === "traditional"
            ? "🔑 Password"
            : params.row.loginMethod === "google"
            ? "🌐 Google"
            : "📘 Facebook"}
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
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "50px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                color: "black",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
                "& input": {
                  color: "black",
                },
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={() => navigate("/add")}
            aria-label="Add User"
            sx={{
              borderRadius: "10px !important",
              backgroundColor: "#FFFFFF",
              height: "50px",
              width: "50px",
            }}
          >
            <PersonAddIcon />
          </IconButton>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        ></div>
        <Button
          variant={filterVerified !== 0 ? "contained" : "outlined"}
          color="success"
          onClick={() => setFilterVerified((prev) => (prev + 1) % 3)}
          style={{
            margin: "10px",
            marginRight: "0px",
            marginLeft: "0px",
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
            marginRight: "0px",
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
          sx={{
            marginRight: "10px",
            "&:disabled": { bgcolor: "#FFFFFF", color: "grey.400" },
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
            margin: "10px",
            marginLeft: "0px",
            "&:disabled": { bgcolor: "#FFFFFF", color: "grey.400" },
          }}
        >
          Verify Selected
        </Button>
      </div>

      <div
        style={{
          height: 480,
          width: "100%",
          marginBottom: "20px",
        }}
      >
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
            marginRight: "20px",
            marginLeft: "20px",
            borderRadius: "30px",
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
      <CustomerSegmentation filteredUsers={filteredUsers} />
    </>
  );
};

export default UserList;
