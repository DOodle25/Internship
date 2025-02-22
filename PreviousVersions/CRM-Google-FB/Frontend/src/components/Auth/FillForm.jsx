import React, { useState } from 'react';
import { Button, TextField, Paper, Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axios';

function FillForm({ token, setUserMethod, logout }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const loginMethod = user.loginMethod;
  const [formData, setFormData] = useState({
    Taskassigned: '',
    age: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginMethod !== 'traditional') {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
    }

    try {
      const response = await axiosInstance.post('/fill-form', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response) {
        // Update user form status in localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        storedUser.isFormFilled = true;
        localStorage.setItem('user', JSON.stringify(storedUser));
      }
      setUserMethod(response.data.user);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error('Failed to submit the form');
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: '30px',
        margin: '20px auto',
        maxWidth: '500px',
        textAlign: 'center',
      }}
    >
      <ToastContainer />
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
        {loginMethod !== 'traditional' && (
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>

      {/* Logout button */}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Paper>
  );
}

export default FillForm;
