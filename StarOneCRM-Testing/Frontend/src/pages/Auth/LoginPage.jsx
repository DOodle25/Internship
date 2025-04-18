// import React, { useState } from "react";
// import {
//   Button,
//   TextField,
//   Paper,
//   Box,
//   Typography,
//   InputAdornment,
//   Link,
//   Container,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import LockIcon from "@mui/icons-material/Lock";
// import { useNavigate } from "react-router-dom";
// import GoogleLogin from "../../components/Auth/OAuthLogin";
// import { useGlobalContext } from "../../context/GlobalContext";
// import LaunchIcon from "@mui/icons-material/Launch";

// function Login() {
//   const { handleLogin } = useGlobalContext();
//   const [email, setEmail] = useState("cocply135@gmail.com");
//   const [password, setPassword] = useState("admin123");
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await handleLogin({ email, password });
//     if (success) navigate("/fill-form");
//   };
//   const handleForgotPassword = () => {
//     navigate("/forgot-password");
//   };

//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "#FFFFFF",
//         minWidth: "100%",
//         background: "linear-gradient(15deg, #0a0f1f, #0f1a30, #16234a)",
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
//             Login
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ width: "100%", maxWidth: 400 }}
//           >
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
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{ mt: 2 }}
//             >
//               Login
//             </Button>
//           </Box>
//           <GoogleLogin />
//           <Typography variant="body2" sx={{ mt: 2 }}>
//             Don't have an account?{" "}
//             <Link
//               onClick={() => navigate("/signup")}
//               sx={{
//                 cursor: "pointer",
//                 color: "#1976d2",
//                 textDecoration: "none",
//               }}
//             >
//               Sign Up
//             </Link>
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 2 }}>
//             Forgot your password?{" "}
//             <Link
//               onClick={handleForgotPassword}
//               sx={{
//                 cursor: "pointer",
//                 color: "#1976d2",
//                 textDecoration: "none",
//               }}
//             >
//               Reset Password
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
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
//   Container,
//   keyframes,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import LockIcon from "@mui/icons-material/Lock";
// import { useNavigate } from "react-router-dom";
// import GoogleLogin from "../../components/Auth/OAuthLogin";
// import { useGlobalContext } from "../../context/GlobalContext";
// import LaunchIcon from "@mui/icons-material/Launch";

// // Animation keyframes
// const floatAnimation = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-10px); }
//   100% { transform: translateY(0px); }
// `;

// const pulseAnimation = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// const gradientBackground = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// function Login() {
//   const { handleLogin } = useGlobalContext();
//   const [email, setEmail] = useState("cocply135@gmail.com");
//   const [password, setPassword] = useState("admin123");
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await handleLogin({ email, password });
//     if (success) navigate("/fill-form");
//   };
//   const handleForgotPassword = () => {
//     navigate("/forgot-password");
//   };

//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "#FFFFFF",
//         minWidth: "100%",
//         background: "linear-gradient(45deg, #0a0f1f, #0f1a30, #16234a)",
//         backgroundSize: "300% 300%",
//         animation: `${gradientBackground} 15s ease infinite`,
//       }}
//     >
//       <Paper
//         elevation={10}
//         sx={{
//           display: "flex",
//           borderRadius: 3,
//           overflow: "hidden",
//           minHeight: "90vh",
//           boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
//           transition: "transform 0.3s ease",
//           // "&:hover": {
//           //   transform: "translateY(-5px)",
//           // },
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
//             position: "relative",
//             overflow: "hidden",
//             "&::before": {
//               content: '""',
//               position: "absolute",
//               top: "-50%",
//               left: "-50%",
//               width: "200%",
//               height: "200%",
//               background:
//                 "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
//               animation: `${floatAnimation} 15s infinite linear`,
//             },
//             minWidth: "40%",
//           }}
//         >
//           <Typography
//             variant="h2"
//             fontWeight="bold"
//             gutterBottom
//             textAlign={"center"}
//             sx={{
//               fontWeight: 400,
//               color: "#FFFFFF",
//               fontFamily: "'Poppins', sans-serif",
//               // textTransform: "uppercase",
//               letterSpacing: "1px",
//               position: "relative",
//               zIndex: 1,
//               mb: 3,
//               textShadow: "0 5px 15px rgba(0,0,0,0.3)",
//             }}
//           >
//             Star
//             <span
//               style={{
//                 // color: "#FFFFFF",
//                 // fontStyle: "italic",
//                 // // textShadow: "3px 4px 0px #3367D1",
//                 background: "#FFFFFF",
//                 color: "#031738",
//                 borderRadius: "50px",
//                 padding: "0 15px",
//                 display: "inline-block",
//                 transform: "rotate(5deg)",
//                 boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//                 marginLeft: "7px",
//               }}
//             >
//               One
//             </span>{" "}
//             {/* <span
//               style={{
//                 // background: "#FFFFFF",
//                 // color: "#031738",
//                 // borderRadius: "50px",
//                 // padding: "0 15px",
//                 // display: "inline-block",
//                 // transform: "rotate(-5deg)",
//                 // boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//               }}
//             >
//               CRM
//             </span> */}
//           </Typography>
//           <Typography
//             variant="h5"
//             textAlign="center"
//             sx={{
//               fontWeight: "400 !important",
//               fontFamily: "'Poppins', sans-serif",
//               position: "relative",
//               zIndex: 1,
//               mb: 2,
//               lineHeight: 1.6,
//             }}
//           >
//             {"Customer Relationship Management"}
//           </Typography>
//           <Typography
//             variant="h8"
//             textAlign="center"
//             sx={{
//               fontWeight: "100 !important",
//             }}
//           >

//             {"Unlock endless possibilities to connect to you customers."}
//           </Typography>
//           {/* <Typography
//             variant="h6"
//             textAlign="center"
//             // marginTop={"20px"}
//             sx={{
//               fontWeight: 300,
//               fontSize: "1.2rem",
//               cursor: "pointer",
//               fontFamily: "'Poppins', sans-serif",
//               position: "relative",
//               zIndex: 1,
//               transition: "all 0.3s ease",
//               border: "1px solid rgba(255,255,255,0.3)",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 color: "#3367D1",
//               },
//             }}
//             onClick={() => navigate("/landing-page")}
//           >
//             <span
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             >
//               Know more <LaunchIcon fontSize="small" />
//             </span>
//           </Typography> */}
//                     <Typography
//             variant="h6"
//             textAlign="center"
//             // marginTop={"40px"}
//             sx={{
//               fontWeight: 300,
//               fontSize: "1.2rem",
//               fontFamily: "'Poppins', sans-serif",
//               position: "relative",
//               zIndex: 1,
//               transition: "all 0.3s ease",
//               cursor: "pointer",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 color: "#3367D1",
//               },
//             }}
//             onClick={() => navigate("/landing-page")}
//           >
//             <span
//               style={{
//                 borderRadius: "10px",
//                 color: "#FFFFFF",
//                 backgroundColor: "transparent",
//                 border: "1px solid rgba(255,255,255,0.3)",
//                 boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//                 padding: "12px 24px",
//                 marginTop: "20px",
//                 display: "inline-block",
//                 transition: "all 0.3s ease",
//                 backdropFilter: "blur(5px)",
//                 "&:hover": {
//                   transform: "translateY(-3px)",
//                   boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
//                 },
//               }}
//             >
//               Know More
//               {/* <LaunchIcon fontSize="small" /> */}
//             </span>
//           </Typography>
//           <Typography
//             variant="h6"
//             textAlign="center"
//             // marginTop={"40px"}
//             sx={{
//               fontWeight: 300,
//               fontSize: "1.2rem",
//               fontFamily: "'Poppins', sans-serif",
//               position: "relative",
//               zIndex: 1,
//               transition: "all 0.3s ease",
//               cursor: "pointer",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 color: "#3367D1",
//               },
//             }}
//             onClick={() => navigate("/landing-page")}
//           >
//             <span
//               style={{
//                 borderRadius: "10px",
//                 color: "#FFFFFF",
//                 backgroundColor: "transparent",
//                 border: "1px solid rgba(255,255,255,0.3)",
//                 boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//                 padding: "12px 24px",
//                 marginTop: "20px",
//                 display: "inline-block",
//                 transition: "all 0.3s ease",
//                 backdropFilter: "blur(5px)",
//                 "&:hover": {
//                   transform: "translateY(-3px)",
//                   boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
//                 },
//               }}
//             >
//               Join us{" "}
//               <span
//                 style={{
//                   color: "#FFFFFF",
//                   fontStyle: "italic",
//                   textDecoration: "underline",
//                   fontWeight: 500,
//                   // marginRight: "",
//                 }}
//               >
//                 today!
//                 {/* <LaunchIcon fontSize="small" /> */}
//               </span>
//             </span>
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             flex: 1,
//             padding: { xs: 4, md: 4 },
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             background: "rgba(255,255,255,0.95)",
//           }}
//         >
//           <Typography
//             variant="h4"
//             fontWeight="bold"
//             gutterBottom
//             sx={{
//               fontFamily: "'Poppins', sans-serif",
//               fontWeight: 400,
//               mb: 0,
//               background:
//                 "linear-gradient(90deg, #0a0f1f 0%, #0F182D 50%, #0a0f1f 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               animation: `${pulseAnimation} 3s ease infinite`,
//             }}
//           >
//             Login
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ width: "100%", maxWidth: 400 }}
//           >
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               margin="normal"
//               // sx={{
//               //   "& .MuiOutlinedInput-root": {
//               //     "& fieldset": {
//               //       borderColor: "#000000",
//               //     },
//               //     "&:hover fieldset": {
//               //       borderColor: "#000000",
//               //       boxShadow: "0 0 0 2px rgba(51, 103, 209, 0.2)",
//               //     },
//               //     "&.Mui-focused fieldset": {
//               //       borderColor: "#000000",
//               //       boxShadow: "0 0 0 2px rgba(51, 103, 209, 0.2)",
//               //     },
//               //   },
//               //   "& .MuiInputLabel-root.Mui-focused": {
//               //     color: "#000000",
//               //   },
//               // }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PersonIcon sx={{ color: "EFEFEF" }} />
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
//               // sx={{
//               //   "& .MuiOutlinedInput-root": {
//               //     "& fieldset": {
//               //       borderColor: "#3367D1",
//               //     },
//               //     "&:hover fieldset": {
//               //       borderColor: "#3367D1",
//               //       boxShadow: "0 0 0 2px rgba(51, 103, 209, 0.2)",
//               //     },
//               //     "&.Mui-focused fieldset": {
//               //       borderColor: "#3367D1",
//               //       boxShadow: "0 0 0 2px rgba(51, 103, 209, 0.2)",
//               //     },
//               //   },
//               //   "& .MuiInputLabel-root.Mui-focused": {
//               //     color: "#3367D1",
//               //   },
//               // }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockIcon sx={{ color: "EFEFEF" }} />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{
//                 mt: 2,
//                 // mb: 2,
//                 // py: 1.5,
//                 fontSize: "1rem",
//                 fontWeight: 400,
//                 background:
//                   "linear-gradient(90deg, #16234a 0%, #0F182D 50%, #16234a 100%)",
//                 backgroundSize: "200% auto",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundPosition: "right center",
//                   // transform: "translateY(-2px)",
//                   // boxShadow: "0 5px 15px rgba(51, 103, 209, 0.4)",
//                 },
//               }}
//             >
//               Login
//             </Button>
//             <GoogleLogin />
//           </Box>
//           <Typography
//             variant="body1"
//             sx={{ mt: 3, fontFamily: "'Poppins', sans-serif" }}
//           >
//             Don't have an account?{" "}
//             <Link
//               onClick={() => navigate("/signup")}
//               sx={{
//                 cursor: "pointer",
//                 color: "#3367D1",
//                 textDecoration: "none",
//                 fontWeight: 600,
//                 "&:hover": {
//                   textDecoration: "underline",
//                 },
//               }}
//             >
//               Sign Up
//             </Link>
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ mt: 2, fontFamily: "'Poppins', sans-serif" }}
//           >
//             Forgot your password?{" "}
//             <Link
//               onClick={handleForgotPassword}
//               sx={{
//                 cursor: "pointer",
//                 color: "#3367D1",
//                 textDecoration: "none",
//                 fontWeight: 600,
//                 "&:hover": {
//                   textDecoration: "underline",
//                 },
//               }}
//             >
//               Reset Password
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

// export default Login;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   TextField,
//   Paper,
//   Box,
//   Typography,
//   InputAdornment,
//   Link,
//   Container,
//   keyframes,
//   styled,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import LockIcon from "@mui/icons-material/Lock";
// import { useNavigate } from "react-router-dom";
// import GoogleLogin from "../../components/Auth/OAuthLogin";
// import { useGlobalContext } from "../../context/GlobalContext";
// import LaunchIcon from "@mui/icons-material/Launch";

// // Sample background images (replace with your actual screenshots)
// const backgroundImages = [
//   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//   "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//   "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//   "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//   "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
// ];

// // Animation keyframes
// const floatAnimation = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-10px); }
//   100% { transform: translateY(0px); }
// `;

// const pulseAnimation = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// const gradientBackground = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const scrollBackground = keyframes`
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-50%); }
// `;

// // Styled component for the scrolling background
// const ScrollingBackground = styled(Box)({
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "200%",
//   height: "100%",
//   display: "flex",
//   animation: `${scrollBackground} 60s linear infinite`,
//   zIndex: 0,
//   opacity: 0.15,
// });

// const BackgroundImage = styled(Box)(({ image }) => ({
//   width: "50%",
//   height: "100%",
//   backgroundImage: `url(${image})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   filter: "grayscale(30%)",
// }));

// function Login() {
//   const { handleLogin } = useGlobalContext();
//   const [email, setEmail] = useState("cocply135@gmail.com");
//   const [password, setPassword] = useState("admin123");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await handleLogin({ email, password });
//     if (success) navigate("/fill-form");
//   };

//   const handleForgotPassword = () => {
//     navigate("/forgot-password");
//   };

//   return (
//     <Container
//       maxWidth={false}
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         position: "relative",
//         overflow: "hidden",
//         backgroundColor: "#0a0f1f",
//         p: 0,
//       }}
//     >
//       {/* Infinite scrolling background */}
//       <ScrollingBackground>
//         {[...backgroundImages, ...backgroundImages].map((img, index) => (
//           <BackgroundImage key={index} image={img} />
//         ))}
//       </ScrollingBackground>

//       <Paper
//         elevation={10}
//         sx={{
//           display: "flex",
//           borderRadius: 3,
//           overflow: "hidden",
//           minHeight: "90vh",
//           maxWidth: "1000px",
//           width: "90%",
//           boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
//           transition: "transform 0.3s ease",
//           position: "relative",
//           zIndex: 1,
//           "&:hover": {
//             boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
//           },
//         }}
//       >
//         {/* Left Side - Branding */}
//         <Box
//           sx={{
//             display: { xs: "none", sm: "flex" },
//             flex: 1,
//             color: "white",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 4,
//             borderRight: "1px solid rgba(255,255,255,0.1)",
//             background:
//               "linear-gradient(165deg, rgba(34,52,107,0.9), rgba(17,26,54,0.9), rgba(25,42,77,0.9))",
//             position: "relative",
//             overflow: "hidden",
//             "&::before": {
//               content: '""',
//               position: "absolute",
//               top: "-50%",
//               left: "-50%",
//               width: "200%",
//               height: "200%",
//               background:
//                 "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
//               animation: `${floatAnimation} 15s infinite linear`,
//             },
//             minWidth: "40%",
//             backdropFilter: "blur(2px)",
//           }}
//         >
//           <Typography
//             variant="h2"
//             fontWeight="bold"
//             gutterBottom
//             textAlign={"center"}
//             sx={{
//               fontWeight: 400,
//               color: "#FFFFFF",
//               fontFamily: "'Poppins', sans-serif",
//               letterSpacing: "1px",
//               position: "relative",
//               zIndex: 1,
//               mb: 3,
//               textShadow: "0 5px 15px rgba(0,0,0,0.3)",
//             }}
//           >
//             Star
//             <span
//               style={{
//                 background: "#FFFFFF",
//                 color: "#031738",
//                 borderRadius: "50px",
//                 padding: "0 15px",
//                 display: "inline-block",
//                 transform: "rotate(5deg)",
//                 boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//                 marginLeft: "7px",
//               }}
//             >
//               One
//             </span>
//           </Typography>

//           <Typography
//             variant="h5"
//             textAlign="center"
//             sx={{
//               fontWeight: 400,
//               fontFamily: "'Poppins', sans-serif",
//               position: "relative",
//               zIndex: 1,
//               mb: 2,
//               lineHeight: 1.6,
//             }}
//           >
//             Customer Relationship Management
//           </Typography>

//           <Typography
//             variant="subtitle1"
//             textAlign="center"
//             sx={{
//               fontWeight: 300,
//               mb: 4,
//               opacity: 0.8,
//             }}
//           >
//             Unlock endless possibilities to connect with your customers.
//           </Typography>

//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <Button
//               variant="outlined"
//               color="secondary"
//               sx={{
//                 borderRadius: "10px",
//                 // color: "#FFFFFF",
//                 borderColor: "rgba(255,255,255,0.3)",
//                 "&:hover": {
//                   borderColor: "#FFFFFF",
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                 },
//                 px: 3,
//                 py: 1,
//               }}
//               onClick={() => navigate("/landing-page")}
//               endIcon={<LaunchIcon fontSize="small" />}
//             >
//               Know More
//             </Button>

//             <Button
//               variant="contained"
//               sx={{
//                 borderRadius: "10px",
//                 backgroundColor: "rgba(255,255,255,0.2)",
//                 "&:hover": {
//                   backgroundColor: "rgba(255,255,255,0.3)",
//                 },
//                 px: 3,
//                 py: 1,
//               }}
//               onClick={() => navigate("/signup")}
//             >
//               Join Today
//             </Button>
//           </Box>
//         </Box>

//         {/* Right Side - Login Form */}
//         <Box
//           sx={{
//             flex: 1,
//             padding: { xs: 4, md: 6 },
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "rgba(255,255,255,0.97)",
//             backdropFilter: "blur(5px)",
//           }}
//         >
//           <Typography
//             variant="h3"
//             fontWeight="bold"
//             gutterBottom
//             sx={{
//               fontFamily: "'Poppins', sans-serif",
//               fontWeight: 500,
//               mb: 4,
//               background:
//                 "linear-gradient(90deg, #0a0f1f 0%, #0F182D 50%, #0a0f1f 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               animation: `${pulseAnimation} 3s ease infinite`,
//             }}
//           >
//             Welcome Back
//           </Typography>

//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ width: "100%", maxWidth: 400 }}
//           >
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               margin="normal"
//               sx={{
//                 mb: 2,
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "rgba(0,0,0,0.1)",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "rgba(0,0,0,0.3)",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "#16234a",
//                   },
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PersonIcon sx={{ color: "rgba(0,0,0,0.5)" }} />
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
//               sx={{
//                 mb: 3,
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "rgba(0,0,0,0.1)",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "rgba(0,0,0,0.3)",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "#16234a",
//                   },
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockIcon sx={{ color: "rgba(0,0,0,0.5)" }} />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 mt: 1,
//                 mb: 2,
//                 py: 1.5,
//                 fontSize: "1rem",
//                 fontWeight: 500,
//                 background:
//                   "linear-gradient(90deg, #16234a 0%, #0F182D 50%, #16234a 100%)",
//                 backgroundSize: "200% auto",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundPosition: "right center",
//                   boxShadow: "0 5px 15px rgba(22, 35, 74, 0.4)",
//                 },
//               }}
//             >
//               Login
//             </Button>

//             <GoogleLogin />

//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//               <Link
//                 onClick={() => navigate("/signup")}
//                 sx={{
//                   cursor: "pointer",
//                   color: "#16234a",
//                   textDecoration: "none",
//                   fontWeight: 500,
//                   "&:hover": {
//                     textDecoration: "underline",
//                   },
//                 }}
//               >
//                 Create Account
//               </Link>

//               <Link
//                 onClick={handleForgotPassword}
//                 sx={{
//                   cursor: "pointer",
//                   color: "#16234a",
//                   textDecoration: "none",
//                   fontWeight: 500,
//                   "&:hover": {
//                     textDecoration: "underline",
//                   },
//                 }}
//               >
//                 Forgot Password?
//               </Link>
//             </Box>
//           </Box>
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
  Container,
  keyframes,
  styled,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Auth/OAuthLogin";
import { useGlobalContext } from "../../context/GlobalContext";
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

function Login() {
  const { handleLogin } = useGlobalContext();
  // const [email, setEmail] = useState("cocply135@gmail.com");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("admin123");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
    if (success) navigate("/fill-form");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
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
            // "linear-gradient(165deg, rgba(34,52,107,0.9), rgba(17,26,54,0.9), rgba(25,42,77,0.9))",
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
                // boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
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
                // color: "#FFFFFF",
                // borderColor: "rgba(255,255,255,0.3)",
                "&:hover": {
                  // borderColor: "#FFFFFF",
                  // backgroundColor: "rgba(255,255,255,0.1)",
                  // opacity: 0.9,
                  transform: "scale(1.05)",
                  backgroundColor: "transparent",
                  color: "white"
                },
                px: 3,
                py: 1,
                opacity: 0.8,
                transition: "transform 0.3s ease",
                backgroundColor: "transparent",
                color: "white",
              }}
              onClick={() => navigate("/landing-page")}
              endIcon={<LaunchIcon fontSize="small" />}
            >
              Know More
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderRadius: "10px",
                // backgroundColor: "",
                backgroundColor: "transparent",
                color: "white",
                "&:hover": {
                  // backgroundColor: "#FFFFFF",
                  // color: "black",
                  opacity: 0.8,
                  transform: "scale(1.05)",
                  backgroundColor: "transparent",
                  color: "white",
                },
                transition: "transform 0.3s ease",
                px: 3,
                py: 1,
                opacity: 0.7,
              }}
              onClick={() => navigate("/signup")}
            >
              Join
            </Button>
          </Box>
        </Box>

        {/* Right Side - Login Form */}
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
              // mb: 4,
              background:
                "linear-gradient(90deg, #0a0f1f 0%, #0F182D 50%, #0a0f1f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              // animation: `${pulseAnimation} 3s ease infinite`,
            }}
          >
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
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              sx={{
                mb: 3,
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                mb: 2,
                // py: 1.5,
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
              Login
            </Button>

            <GoogleLogin />
            <Box sx={{ textAlign: "center", mt: 3 }}>
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
              <Typography variant="body2" sx={{ mt: 2 }}>
                Forgot your password?{" "}
                <Link
                  onClick={handleForgotPassword}
                  sx={{
                    cursor: "pointer",
                    color: "#1976d2",
                    textDecoration: "none",
                  }}
                >
                  Reset Password
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
