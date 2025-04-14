import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Paper,
  Box,
  Typography,
  InputAdornment,
  Container,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setOtpSent(false);
      setIsSendingOtp(false);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOtpRequest = async () => {
    setIsSendingOtp(true);
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email: formData.email,
      });
      setMessage({ text: response.data.message, type: "success" });

      if (response.data.message === "OTP sent to email") {
        setOtpSent(true);
        setTimer(100);
      } else {
        setIsSendingOtp(false);
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Something went wrong",
        type: "error",
      });
      setIsSendingOtp(false);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
      setMessage({ text: response.data.message, type: "success" });

      if (response.data.message === "Password reset successful") {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Failed to reset password",
        type: "error",
      });
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(15deg, #0a0f1f, #0f1a30, #16234a)",
        minWidth: "100%",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Forgot Password
        </Typography>

        {message.text && (
          <Alert severity={message.type} sx={{ width: "100%", mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleResetPassword}
          sx={{ width: "100%" }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={otpSent}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          {otpSent && (
            <>
              <TextField
                fullWidth
                variant="outlined"
                label="OTP"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                variant="outlined"
                label="New Password"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOtpRequest}
            disabled={isSendingOtp || !formData.email || timer > 0}
            sx={{ mt: 2, opacity: isSendingOtp || timer > 0 ? 0.6 : 1 }}
          >
            {isSendingOtp
              ? "Sending OTP..."
              : timer > 0
              ? `Resend OTP in ${timer}s`
              : "Send OTP"}
          </Button>

          {otpSent && (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Reset Password
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
