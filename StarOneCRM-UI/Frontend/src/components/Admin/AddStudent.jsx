import React, { useState } from "react";
import axiosInstance from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, Paper, Box, InputAdornment } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";

const AddStudent = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(`/admin/`, {
        ...formData,
        age: Number(formData.age),
      });

      const { message, data } = response.data;

      if (data) {
        toast.success(`${message}, you will be redirected shortly`);
        setTimeout(() => {
          window.location.href = "/";
        }, 5000);
      }
    } catch (error) {
      console.error("Error adding user:", error);

      if (error.response && error.response.data) {
        const { error: backendError, message } = error.response.data;

        if (backendError && backendError.includes("duplicate key error")) {
          const emailMatch = backendError.match(/email: "(.*?)"/);
          const duplicateEmail = emailMatch ? emailMatch[1] : "this email";
          toast.error(
            `The email ${duplicateEmail} is already associated with another user.`
          );
        } else {
          toast.error(
            message || backendError || "An unexpected error occurred."
          );
        }
      } else {
        toast.error("Failed to add user. Please try again later.");
      }
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "30px",
        margin: "20px auto",
        maxWidth: "500px",
        textAlign: "center",
      }}
    >
      <ToastContainer />
      <form onSubmit={handleSubmit}>
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

export default AddStudent;
