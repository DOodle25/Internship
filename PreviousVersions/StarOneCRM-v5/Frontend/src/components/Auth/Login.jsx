import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Box,
  Typography,
  InputAdornment,
  Link,
  Grid,
  Container,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
// import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../../context/GlobalContext";

function Login() {
  const { handleLogin } = useGlobalContext();
  const [email, setEmail] = useState("cocply135@gmail.com");
  const [password, setPassword] = useState("admin123");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
    if (success) navigate("/fill-form");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        minWidth: "100%",
        background: "linear-gradient(15deg, #0a0f1f, #0f1a30, #16234a)",
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
        {/* Left Branding Section */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flex: 1,
            // backgroundColor: "#201F2F",
            color: "white",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            borderRight: 1,
            borderRightColor: "divider",
            borderRightStyle: "solid",
            // background: "linear-gradient(to bottom,rgb(17, 26, 54),rgb(25, 42, 77),rgb(34, 52, 107))",
            background: "linear-gradient(165deg,rgb(34, 52, 107), rgb(17, 26, 54),rgb(25, 42, 77))",
            // background: "linear-gradient(155deg,rgb(34, 52, 107), rgb(17, 26, 54),rgb(25, 42, 77))",
            
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
                // background: "#3367D1",
                // color: "#FFFFFF",
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
              // opacity: 0.5,
              // fontWeight: 600,
              fontSize: "1.2rem",
              // boxShadow: "0px 10px 0px 0px #FFFFFF",
            }}
          >
            <span
              style={{
                borderRadius: "10px",
                color: "#FFFFFF",
                fontStyle: "",
                // backgroundColor: "#FDB8DC",
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

        {/* Right Login Section */}
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", maxWidth: 400 }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </Box>
          <GoogleLogin />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link
              onClick={() => navigate("/signup")}
              sx={{
                cursor: "pointer",
                color: "#1976d2",
                textDecoration: "none",
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
