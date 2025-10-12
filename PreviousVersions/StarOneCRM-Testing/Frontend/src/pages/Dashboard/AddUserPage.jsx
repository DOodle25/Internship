import React, { useState } from "react";
import { TextField, Button, Paper, Box, InputAdornment } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";
import { useGlobalContext } from "../../context/GlobalContext";

const AddUser = () => {
  const { handleAddUserSubmit } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    role: "",
    password: "",
    loginMethod: "traditional",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    handleAddUserSubmit(formData, () => (window.location.href = "/"));
  };

  return (
    <Paper
      elevation={0}
      style={{
        padding: "30px",
        margin: "20px auto",
        maxWidth: "500px",
        textAlign: "center",
      }}
    >
      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          fullWidth
        >
          Add User
        </Button>
      </form>
    </Paper>
  );
};

export default AddUser;
