// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   TextField,
//   Paper,
//   Box,
//   Typography,
//   InputAdornment,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Link,
//   Container,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import LockIcon from "@mui/icons-material/Lock";
// import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../../context/GlobalContext";
// import GoogleLogin from "../../components/Auth/OAuthLogin";
// import LaunchIcon from "@mui/icons-material/Launch";
// function Signup() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     age: "",
//     role: "",
//     password: "",
//     otp: "",
//   });
//   const [otpSent, setOtpSent] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [isSendingOtp, setIsSendingOtp] = useState(false);
//   const { handleSignup } = useGlobalContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     } else if (timer === 0 && otpSent) {
//       setOtpSent(false);
//       setIsSendingOtp(false);
//     }
//     return () => clearInterval(interval);
//   }, [timer, otpSent]);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const isFormValid = () => {
//     const { name, email, age, role, password } = formData;
//     return name && email && age && role && password;
//   };
//   const handleOtpRequest = async () => {
//     if (!isFormValid()) {
//       return;
//     }

//     setIsSendingOtp(true);
//     try {
//       const result = await handleSignup(formData);
//       if (result.success) {
//         setOtpSent(true);
//         setTimer(100);
//       } else {
//         setIsSendingOtp(false);
//       }
//     } catch (error) {
//       setIsSendingOtp(false);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await handleSignup(formData, true);
//       if (result.success) {
//         navigate("/login");
//       } else {
//       }
//     } catch (error) {}
//   };

//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         background: "linear-gradient(15deg, #0a0f1f, #0f1a30, #16234a)",
//         minWidth: "100%",
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           display: "flex",
//           borderRadius: 3,
//           overflow: "hidden",
//           minHeight: "90vh",
//         }}
//       >
//         <Box
//           sx={{
//             display: { xs: "none", sm: "flex" },
//             flex: 1,
//             color: "white",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 4,
//             borderRight: 1,
//             borderRightColor: "divider",
//             borderRightStyle: "solid",
//             background:
//               "linear-gradient(165deg,rgb(34, 52, 107), rgb(17, 26, 54),rgb(25, 42, 77))",
//           }}
//         >
//           <Typography
//             variant="h3"
//             fontWeight="bold"
//             gutterBottom
//             textAlign={"center"}
//             sx={{
//               fontWeight: 600,
//               color: "#FFFFFF",
//             }}
//           >
//             Star
//             <span
//               style={{
//                 color: "#FFFFFF",
//                 fontStyle: "italic",
//                 textShadow: "2px 3px 0px #3367D1",
//               }}
//             >
//               One
//             </span>{" "}
//             <span
//               style={{
//                 background: "#FFFFFF",
//                 color: "#031738",
//                 borderRadius: "50px",
//                 paddingRight: "19px",
//                 paddingLeft: "15px",
//               }}
//             >
//               CRM
//             </span>
//           </Typography>
//           <Typography
//             variant="h6"
//             textAlign="center"
//             sx={{
//               fontWeight: 600,
//             }}
//           >
//             {"Unlock endless possibilities to connect to you customers."}
//           </Typography>
//           <Typography
//             variant="h6"
//             textAlign="center"
//             marginTop={"20px"}
//             sx={{
//               fontWeight: 200,
//               fontSize: "1.2rem",
//               pinter: "cursor",
//             }}
//             onClick={() => navigate("/landing-page")}
//           >
//             <span
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               Know more <LaunchIcon />
//             </span>
//           </Typography>
//           <Typography
//             variant="h6"
//             textAlign="center"
//             marginTop={"20px"}
//             sx={{
//               fontWeight: 200,
//               fontSize: "1.2rem",
//             }}
//           >
//             <span
//               style={{
//                 borderRadius: "10px",
//                 color: "#FFFFFF",
//                 fontStyle: "",
//                 backgroundColor: "transparent",
//                 border: "0.5px solid #FFFFFF",
//                 boxShadow: "2px 3px 0px 0px #FFFFFF",
//                 paddingRight: "10px",
//                 padding: "10px",
//                 marginTop: "20px",
//               }}
//             >
//               Join us{" "}
//               <span
//                 style={{
//                   color: "#FFFFFF",
//                   fontStyle: "italic",
//                   textDecoration: "underline",
//                 }}
//               >
//                 today!
//               </span>
//             </span>
//           </Typography>
//         </Box>
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
//             Signup
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ width: "100%", maxWidth: 400 }}
//           >
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required={!otpSent}
//               disabled={otpSent}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               disabled={otpSent}
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
//               label="Age"
//               name="age"
//               type="number"
//               value={formData.age}
//               onChange={handleChange}
//               required={!otpSent}
//               disabled={otpSent}
//               margin="normal"
//             />
//             <FormControl
//               fullWidth
//               variant="outlined"
//               required={!otpSent}
//               disabled={otpSent}
//               margin="normal"
//             >
//               <InputLabel>Role</InputLabel>
//               <Select
//                 label="Role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="customer">Customer</MenuItem>
//                 <MenuItem value="employee">Employee</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               required={!otpSent}
//               disabled={otpSent}
//               margin="normal"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             {otpSent && (
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="OTP"
//                 name="otp"
//                 value={formData.otp}
//                 onChange={handleChange}
//                 required
//                 margin="normal"
//               />
//             )}
//             {!otpSent && (
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 onClick={handleOtpRequest}
//                 disabled={isSendingOtp || !isFormValid()}
//                 sx={{ mt: 2 }}
//               >
//                 {isSendingOtp ? "Sending OTP..." : "Send OTP"}
//               </Button>
//             )}
//             {otpSent && (
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 onClick={handleSubmit}
//                 sx={{ mt: 2 }}
//               >
//                 Submit OTP
//               </Button>
//             )}
//             {timer > 0 && (
//               <Typography variant="body2" color="textSecondary" mt={2}>
//                 You can resend OTP in {timer}s
//               </Typography>
//             )}
//             <GoogleLogin style={{ marginTop: "20px !important" }} />
//             <Typography
//               variant="body2"
//               sx={{ textAlign: "center", marginTop: "10px" }}
//             >
//               Already registered?
//               <Link
//                 onClick={() => navigate("/login")}
//                 sx={{
//                   cursor: "pointer",
//                   color: "#1976d2",
//                   textDecoration: "none",
//                 }}
//               >
//                 {" Go to Login"}
//               </Link>
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

// export default Signup;







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
  keyframes,
  styled,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import GoogleLogin from "../../components/Auth/OAuthLogin";
import LaunchIcon from "@mui/icons-material/Launch";

// Sample background images (replace with your actual screenshots)
const backgroundImages = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
];

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const scrollBackground = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Styled components for the multi-row scrolling background
const BackgroundContainer = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
  overflow: "hidden",
});

const ScrollingRow = styled(Box)({
  position: "absolute",
  width: "200%",
  height: "33.33%",
  display: "flex",
  animation: `${scrollBackground} 60s linear infinite`,
  opacity: 0.15,
  "&:nth-of-type(2)": {
    top: "33.33%",
    animationDirection: "reverse",
    animationDuration: "70s",
  },
  "&:nth-of-type(3)": {
    top: "66.66%",
    animationDuration: "80s",
  },
});

const BackgroundImage = styled(Box)(({ image }) => ({
  width: "50%",
  height: "100%",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "grayscale(30%) blur(1px)",
}));

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
      }
    } catch (error) {}
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0a0f1f",
        p: 0,
      }}
    >
      {/* Multi-row infinite scrolling background */}
      <BackgroundContainer>
        {[1, 2, 3].map((row) => (
          <ScrollingRow key={row}>
            {[...backgroundImages, ...backgroundImages].map((img, index) => (
              <BackgroundImage key={`${row}-${index}`} image={img} />
            ))}
          </ScrollingRow>
        ))}
      </BackgroundContainer>

      <Paper
        elevation={10}
        sx={{
          display: "flex",
          borderRadius: 3,
          overflow: "hidden",
          minHeight: "90vh",
          maxWidth: "1000px",
          width: "90%",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.3s ease",
          position: "relative",
          zIndex: 1,
          "&:hover": {
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        {/* Left Side - Branding */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flex: 1,
            color: "white",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            borderRight: "1px solid rgba(255,255,255,0.1)",
            background:
              "linear-gradient(165deg,rgb(34, 52, 107), rgb(17, 26, 54),rgb(25, 42, 77))",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
              animation: `${floatAnimation} 15s infinite linear`,
            },
            minWidth: "40%",
            backdropFilter: "blur(2px)",
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            textAlign={"center"}
            sx={{
              fontWeight: 400,
              color: "#FFFFFF",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "1px",
              position: "relative",
              zIndex: 1,
              mb: 3,
              textShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            Star
            <span
              style={{
                // background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                background: "linear-gradient(145deg, #ffffff, #FFFFFF)",
                color: "#031738",
                borderRadius: "50px",
                padding: "0 15px",
                display: "inline-block",
                transform: "rotate(0deg)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                marginLeft: "7px",
              }}
            >
              One
            </span>
          </Typography>

          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              fontWeight: 400,
              fontFamily: "'Poppins', sans-serif",
              position: "relative",
              zIndex: 1,
              mb: 2,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Customer Relationship Management
          </Typography>

          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{
              fontWeight: 300,
              mb: 4,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Unlock endless possibilities to connect with your customers.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "10px",
                backgroundColor: "transparent",
                color: "white",
                "&:hover": {
                  opacity: 0.9,
                  transform: "scale(1.05)",
                  backgroundColor: "transparent",
                  color: "white",
                },
                opacity: 0.8,
                px: 3,
                py: 1,
                transition: "transform 0.3s ease",
              }}
              onClick={() => navigate("/landing-page")}
              endIcon={<LaunchIcon fontSize="small" />}
            >
              Know More
            </Button>

            <Button
              variant="outlined"
              sx={{
                backgroundColor: "transparent",
                color: "white",
                borderRadius: "10px",
                // backgroundColor: "",
                "&:hover": {
                  // backgroundColor: "#FFFFFF",
                  // color: "black",
                  opacity: 0.8,
                  transform: "scale(1.05)",
                  backgroundColor: "transparent",
                  color: "white",
                },
                opacity: 0.7,
                transition: "transform 0.3s ease",

                px: 3,
                py: 1,
              }}
              onClick={() => navigate("/login")}
            >
              Join
            </Button>
          </Box>
        </Box>

        {/* Right Side - Signup Form */}
        <Box
          sx={{
            flex: 1,
            padding: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              background:
                "linear-gradient(90deg, #0a0f1f 0%, #0F182D 50%, #0a0f1f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Sign Up
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
              sx={{
                // mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0,0,0,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0,0,0,0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#16234a",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "rgba(0,0,0,0.5)" }} />
                  </InputAdornment>
                ),
              }}
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
              sx={{
                // mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0,0,0,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0,0,0,0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#16234a",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "rgba(0,0,0,0.5)" }} />
                  </InputAdornment>
                ),
              }}
            />
            <span style={{ display: "flex", justifyContent: "center" }}>
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
              sx={{
                // mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0,0,0,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0,0,0,0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#16234a",
                  },
                },
              }}
            />

            <FormControl
              fullWidth
              variant="outlined"
              required={!otpSent}
              disabled={otpSent}
              margin="normal"
              sx={{
                // mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0,0,0,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0,0,0,0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#16234a",
                  },
                },
              }}
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
            </span>
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
              sx={{
                // mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0,0,0,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0,0,0,0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#16234a",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "rgba(0,0,0,0.5)" }} />
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
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0,0,0,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(0,0,0,0.3)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#16234a",
                    },
                  },
                }}
              />
            )}

            {!otpSent ? (
              <Button
                variant="outlined"
                fullWidth
                onClick={handleOtpRequest}
                disabled={isSendingOtp || !isFormValid()}
                sx={{
                  mt: 1,
                  mb: 2,
                  fontSize: "1rem",
                  fontWeight: 500,
                  // background:
                  //   "linear-gradient(90deg, #16234a 0%, #0F182D 50%, #16234a 100%)",
                  // backgroundSize: "200% auto",
                  // transition: "all 0.3s ease",
                  // "&:hover": {
                    // backgroundPosition: "right center",
                    // boxShadow: "0 5px 15px rgba(22, 35, 74, 0.4)",
                  // },
                }}
              >
                {isSendingOtp ? "Sending OTP..." : "Send OTP"}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  // mt: 1,
                  // mb: 2,
                  fontSize: "1rem",
                  fontWeight: 500,
                  background:
                    "linear-gradient(90deg, #16234a 0%, #0F182D 50%, #16234a 100%)",
                  backgroundSize: "200% auto",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundPosition: "right center",
                    boxShadow: "0 5px 15px rgba(22, 35, 74, 0.4)",
                  },
                }}
              >
                Submit OTP
              </Button>
            )}

            {timer > 0 && (
              <Typography variant="body2" color="textSecondary" mt={2} align="center">
                You can resend OTP in {timer}s
              </Typography>
            )}

            <GoogleLogin />
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link
                  onClick={() => navigate("/login")}
                  sx={{
                    cursor: "pointer",
                    color: "#1976d2",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;