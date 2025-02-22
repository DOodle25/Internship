// import React, { useState } from 'react';
// import { Button, TextField, Paper, Box, Typography, InputAdornment, Link } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import LockIcon from '@mui/icons-material/Lock';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import GoogleLogin from './GoogleLogin'; // Import Google Login Component

// function Login({ handleLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState(''); // New state for password
//   const navigate = useNavigate(); // Hook to navigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await handleLogin({ email, password }); // Pass both email and password

//     if (success) {
//       // Navigate to a new page after successful login
//       navigate('/fill-form');
//     } else {
//       // Error handling is done in the handleLogin function, so nothing extra here
//     }
//   };

//   const handleSwitchToSignUp = () => {
//     navigate('/signup'); // Navigate to the signup page
//   };

//   return (
//     <Paper
//       elevation={2}
//       style={{
//         padding: '30px',
//         margin: '20px auto',
//         maxWidth: '350px',
//         textAlign: 'center',
//       }}
//     >
//       <ToastContainer />
//       <Typography variant="h4" gutterBottom>
//         Login
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         <Box mb={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <PersonIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//         <Box mb={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)} // Update password
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LockIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//         <Button
//           type="submit"
//           variant="outlined"
//           color="primary"
//           fullWidth
//           disableElevation
//         >
//           Login
//         </Button>
//       </form>

//       <GoogleLogin />

//       <Typography
//         variant="body2"
//         style={{ textAlign: 'center', marginTop: '0px' }}
//       >
//         Don't have an account?
//         <Link
//           onClick={() => navigate('/signup')}
//           style={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'none' }}
//         >
//           {" Sign Up"}
//         </Link>
//       </Typography>
//     </Paper>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import {
//   Button,
//   TextField,
//   Paper,
//   Box,
//   Typography,
//   InputAdornment,
//   Link,
//   Grid,
//   Container,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import LockIcon from "@mui/icons-material/Lock";
// import { useNavigate } from "react-router-dom";
// import GoogleLogin from "./GoogleLogin";
// import "react-toastify/dist/ReactToastify.css";

// function Login({ handleLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await handleLogin({ email, password });
//     if (success) navigate("/fill-form");
//   };

//   return (
//     <Container maxWidth="lg">
//       <Paper
//         elevation={4}
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           borderRadius: 3,
//           overflow: "hidden",
//           minHeight: "90vh",
//         }}
//       >
//         {/* Left Branding Section */}
//         <Box
//           sx={{
//             flex: 1,
//             bgcolor: "#1976d2",
//             color: "white",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 4,
//           }}
//         >
//           <Typography variant="h3" fontWeight="bold" gutterBottom>
//             Welcome to Our Platform
//           </Typography>
//           <Typography variant="h6" textAlign="center">
//             Unlock endless possibilities with our innovative solutions. Join us
//             today!
//           </Typography>
//         </Box>

//         {/* Right Login Section */}
//         <Box
//           sx={{
//             flex: 1,
//             padding: { xs: 4, md: 6 },
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Login
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 400 }}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               margin="normal"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PersonIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               margin="normal"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//               Login
//             </Button>
//           </Box>
//           <GoogleLogin />
//           <Typography variant="body2" sx={{ mt: 2 }}>
//             Don't have an account?{' '}
//             <Link
//               onClick={() => navigate("/signup")}
//               sx={{ cursor: "pointer", color: "#1976d2", textDecoration: "none" }}
//             >
//               Sign Up
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

// export default Login;

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
import "react-toastify/dist/ReactToastify.css";
import side2 from "../../logos/side2.png";
import bg3 from "../../logos/bg3.png";
import bg2 from "../../logos/bg2.png";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        // backgroundImage: `url(${bg2})`,
        backgroundColor: "#FFFFFF",
        // backgroundSize:"",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        minWidth: "100%",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          // flexDirection: { xs: "column", sm: "row" },
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
            // backgroundImage: `url(${bg3})`,
            backgroundColor: "#201F2F",
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            color: "white",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            textAlign={"center"}
            sx={{
              // fontFamily: "Anton",
              fontWeight: 600,
              color: "#FFFFFF",
              // textShadow: "3px 5px 0px #425889",
              // fontStyle: "normal",
            }}
          >
            Star
            <span
              style={{
                color: "#FDB8DC",
                fontStyle: "italic",
                textShadow: "2px 3px 0px #FFFFFF",
              }}
            >
              One
            </span>{" "}
            <span
              style={{
                background: "#FDB8DC",
                color: "#201F2F",
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
              // fontFamily: "Anton",
              fontWeight: 600,
              // fontStyle: "normal",
              // textShadow: "1px 2px 0px #425889",
            }}
          >
            {"Unlock endless possibilities to connect to you customers."}
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            marginTop={"20px"}
            sx={{
              // fontFamily: "Anton",
              fontWeight: 600,
              // fontStyle: "normal",
              // textShadow: "1px 2px 0px #425889",
            }}
          >
            <span
              style={{
                borderRadius: "10px",
                color: "#201F2F",
                fontStyle: "",
                backgroundColor: "#FDB8DC",
                paddingRight: "10px",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              Join us{" "}
              <span
                style={{
                  color: "#201F2F",
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
