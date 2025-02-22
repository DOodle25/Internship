import React, { useState } from "react";
import { Button, TextField, Paper, Box, Typography } from "@mui/material";
import axiosInstance from "../../utils/axios";
import { useGlobalContext } from "../../context/GlobalContext";

function FillForm() {
  const { token, setUserMethod, logout, user } = useGlobalContext();
  const loginMethod = user.loginMethod;
  const [formData, setFormData] = useState({
    Taskassigned: "",
    age: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginMethod !== "traditional") {
      if (formData.password !== formData.confirmPassword) {
        return;
      }
    }

    try {
      const response = await axiosInstance.post("/status/fill-form", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response) {
        storedUser = user
        storedUser.isFormFilled = true;
        setUserMethod(storedUser);
      }
      setUserMethod(response.data.user);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
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
      <Typography variant="h4" gutterBottom>
        Complete Your Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Task"
            name="Taskassigned"
            value={formData.Taskassigned}
            onChange={handleChange}
            required
            multiline
            rows={4}
          />
        </Box>
        {loginMethod !== "traditional" && (
          <>
            <Box mb={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
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
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Box>
          </>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>

      {/* Logout button */}
      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth onClick={logout}>
          Logout
        </Button>
      </Box>
    </Paper>
  );
}

export default FillForm;
