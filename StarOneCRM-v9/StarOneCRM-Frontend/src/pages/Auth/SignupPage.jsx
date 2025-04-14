import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Paper,
  Box,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Link,
  Container,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import GoogleLogin from "../../components/Auth/OAuthLogin";
import LaunchIcon from "@mui/icons-material/Launch";
function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    role: "",
    password: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const { handleSignup } = useGlobalContext();
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
  const isFormValid = () => {
    const { name, email, age, role, password } = formData;
    return name && email && age && role && password;
  };
  const handleOtpRequest = async () => {
    if (!isFormValid()) {
      return;
    }

    setIsSendingOtp(true);
    try {
      const result = await handleSignup(formData);
      if (result.success) {
        setOtpSent(true);
        setTimer(100);
      } else {
        setIsSendingOtp(false);
      }
    } catch (error) {
      setIsSendingOtp(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await handleSignup(formData, true);
      if (result.success) {
        navigate("/login");
      } else {
      }
    } catch (error) {}
  };

  return (
    <Container
      maxWidth="md"
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
          display: "flex",
          borderRadius: 3,
          overflow: "hidden",
          minHeight: "90vh",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flex: 1,
            color: "white",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            borderRight: 1,
            borderRightColor: "divider",
            borderRightStyle: "solid",
            background:
              "linear-gradient(165deg,rgb(34, 52, 107), rgb(17, 26, 54),rgb(25, 42, 77))",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            textAlign={"center"}
            sx={{
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Star
            <span
              style={{
                color: "#FFFFFF",
                fontStyle: "italic",
                textShadow: "2px 3px 0px #3367D1",
              }}
            >
              One
            </span>{" "}
            <span
              style={{
                background: "#FFFFFF",
                color: "#031738",
                borderRadius: "50px",
                paddingRight: "19px",
                paddingLeft: "15px",
              }}
            >
              CRM
            </span>
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{
              fontWeight: 600,
            }}
          >
            {"Unlock endless possibilities to connect to you customers."}
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            marginTop={"20px"}
            sx={{
              fontWeight: 200,
              fontSize: "1.2rem",
              pinter: "cursor",
            }}
            onClick={() => navigate("/landing-page")}
          >
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Know more <LaunchIcon />
            </span>
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            marginTop={"20px"}
            sx={{
              fontWeight: 200,
              fontSize: "1.2rem",
            }}
          >
            <span
              style={{
                borderRadius: "10px",
                color: "#FFFFFF",
                fontStyle: "",
                backgroundColor: "transparent",
                border: "0.5px solid #FFFFFF",
                boxShadow: "2px 3px 0px 0px #FFFFFF",
                paddingRight: "10px",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              Join us{" "}
              <span
                style={{
                  color: "#FFFFFF",
                  fontStyle: "italic",
                  textDecoration: "underline",
                }}
              >
                today!
              </span>
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Signup
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", maxWidth: 400 }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={!otpSent}
              disabled={otpSent}
              margin="normal"
            />
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
            <TextField
              fullWidth
              variant="outlined"
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required={!otpSent}
              disabled={otpSent}
              margin="normal"
            />
            <FormControl
              fullWidth
              variant="outlined"
              required={!otpSent}
              disabled={otpSent}
              margin="normal"
            >
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required={!otpSent}
              disabled={otpSent}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            {otpSent && (
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
            )}
            {!otpSent && (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleOtpRequest}
                disabled={isSendingOtp || !isFormValid()}
                sx={{ mt: 2 }}
              >
                {isSendingOtp ? "Sending OTP..." : "Send OTP"}
              </Button>
            )}
            {otpSent && (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{ mt: 2 }}
              >
                Submit OTP
              </Button>
            )}
            {timer > 0 && (
              <Typography variant="body2" color="textSecondary" mt={2}>
                You can resend OTP in {timer}s
              </Typography>
            )}
            <GoogleLogin style={{ marginTop: "20px !important" }} />
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginTop: "10px" }}
            >
              Already registered?
              <Link
                onClick={() => navigate("/login")}
                sx={{
                  cursor: "pointer",
                  color: "#1976d2",
                  textDecoration: "none",
                }}
              >
                {" Go to Login"}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
