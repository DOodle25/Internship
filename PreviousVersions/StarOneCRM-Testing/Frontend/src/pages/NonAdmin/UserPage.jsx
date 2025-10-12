// import React from "react";
// import { Route, Routes, Link, Navigate } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Box,
//   Container,
//   useMediaQuery,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import Chat from "@mui/icons-material/Chat";
// import Payment from "@mui/icons-material/Payment";
// import Profile from "../Profile/ProfilePage";
// import ChatPage from "../Chat/ChatPage";
// import { useGlobalContext } from "../../context/GlobalContext";
// import { useLocation } from "react-router-dom";
// import PaymentPage from "../Payment/PaymentPage";
// import PaymentAdminPage from "../Payment/PaymentAdminPage";
// import CustomerSegmentation from "../../components/Admin/CustomerSegmentation";
// import SegmentIcon from "@mui/icons-material/Segment";
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import CreateTask from "../../components/Profile/CreateTask";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import EmailIcon from "@mui/icons-material/Email";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";

// const email = "emailhelper468@gmail.com";

// const handleCopy = async () => {
//   try {
//     await navigator.clipboard.writeText(email);
//     alert("Email copied to clipboard!");
//   } catch (err) {
//     console.error("Failed to copy: ", err);
//   }
// };
// const Footer = () => (
//   <Box
//     component="footer"
//     sx={{
//       bgcolor: "primary.main",
//       color: "white",
//       pr: 2,
//       pl: 2,
//       pt: 1,
//       pb: 1,
//       textAlign: "center",
//       mt: "auto",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     }}
//   >
//     <Typography variant="body2">
//       © {new Date().getFullYear()} StarOne CRM
//     </Typography>
//     <Box sx={{ display: "flex", gap: 1, color: "white", flexWrap: "wrap" }}>
//       <a
//         href="http://github.com/DOodle25/Internship"
//         target="_blank"
//         rel="noopener noreferrer"
//         sx={{ color: "white", textDecoration: "none" }}
//       >
//         <IconButton sx={{ color: "white" }}>
//           <GitHubIcon />
//         </IconButton>
//       </a>
//       <IconButton sx={{ color: "white" }} onClick={handleCopy}>
//         <EmailIcon />
//       </IconButton>
//       <a
//         href="https://www.linkedin.com/in/dipen-patel-792296260/"
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{ color: "white", textDecoration: "none" }}
//       >
//         <IconButton sx={{ color: "white" }}>
//           <LinkedInIcon />
//         </IconButton>
//       </a>
//     </Box>
//   </Box>
// );
// const UserProfile = () => {
//   const { token, setUserMethod, user, logout } = useGlobalContext();
//   const location = useLocation();
//   const isChatPage =
//     location.pathname === "/chat" ||
//     location.pathname === "/payment" ||
//     location.pathname === "/payment-admin";
//   const isLargeScreen = useMediaQuery("(min-width:960px)");
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//       }}
//     >
//       <AppBar position="sticky">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             CRM
//           </Typography>
//           <IconButton
//             color="inherit"
//             component={Link}
//             to="/chat"
//             title="Chat Bot"
//           >
//             <Chat />
//           </IconButton>
//           {user.role == "customer" ? (
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/payment"
//               title="Payment"
//             >
//               <Payment />
//             </IconButton>
//           ) : (
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/payment-admin"
//               title="Payment-admin"
//             >
//               <Payment />
//             </IconButton>
//           )}
//           {user.role !== "customer" ? (
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/customer-segmentation"
//               title="Customer Segmentation"
//             >
//               <SegmentIcon />
//             </IconButton>
//           ) : (
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/create-task"
//               title="create task"
//             >
//               <CreateNewFolderIcon />
//             </IconButton>
//           )}
//           <IconButton
//             color="inherit"
//             component={Link}
//             to="/profile"
//             title="Profile"
//           >
//             <PersonIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Container
//         sx={{
//           ...(isLargeScreen && {
//             maxWidth: isChatPage ? "none !important" : "lg",
//             marginTop: isChatPage ? "0px !important" : "",
//             paddingLeft: isChatPage ? "0px !important" : "",
//             marginBottom: isChatPage ? "0px !important" : "",
//             paddingBottom: isChatPage ? "0px !important" : "",
//           }),
//         }}
//       >
//         <Routes>
//           <Route
//             path="/chat"
//             element={
//               <ChatPage
//                 logout={logout}
//                 token={token}
//                 setUserMethod={setUserMethod}
//               />
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <Profile
//                 logout={logout}
//                 token={token}
//                 setUserMethod={setUserMethod}
//               />
//             }
//           />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/payment-admin" element={<PaymentAdminPage />} />
//           {user.role !== "customer" ? (
//             <Route
//               path="/customer-segmentation"
//               element={<CustomerSegmentation />}
//             />
//           ) : (
//             <Route path="/create-task" element={<CreateTask />} />
//           )}
//           <Route
//             path="*"
//             element={
//               <Navigate
//                 to="/profile"
//                 logout={logout}
//                 token={token}
//                 setUserMethod={setUserMethod}
//               />
//             }
//           />
//         </Routes>
//       </Container>
//       {!isChatPage && <Footer />}
//     </Box>
//   );
// };

// export default UserProfile;

// import React from "react";
// import { Route, Routes, Link, Navigate } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Box,
//   Container,
//   useMediaQuery,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import Chat from "@mui/icons-material/Chat";
// import Payment from "@mui/icons-material/Payment";
// import Profile from "../Profile/ProfilePage";
// import ChatPage from "../Chat/ChatPage";
// import { useGlobalContext } from "../../context/GlobalContext";
// import { useLocation } from "react-router-dom";
// import PaymentPage from "../Payment/PaymentPage";
// import PaymentAdminPage from "../Payment/PaymentAdminPage";
// import CustomerSegmentation from "../../components/Segmentation/CustomerSegmentation";
// import SegmentIcon from "@mui/icons-material/Segment";
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import CreateTask from "../../components/Profile/CreateTask";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import EmailIcon from "@mui/icons-material/Email";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";

// const email = "emailhelper468@gmail.com";

// const handleCopy = async () => {
//   try {
//     await navigator.clipboard.writeText(email);
//     alert("Email copied to clipboard!");
//   } catch (err) {
//     console.error("Failed to copy: ", err);
//   }
// };
// const Footer = () => (
//   <Box
//     component="footer"
//     sx={{
//       bgcolor: "primary.main",
//       color: "white",
//       pr: 2,
//       pl: 2,
//       pt: 1,
//       pb: 1,
//       textAlign: "center",
//       mt: "auto",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     }}
//   >
//     <Typography variant="body2">
//       © {new Date().getFullYear()} StarOne CRM
//     </Typography>
//     <Box sx={{ display: "flex", gap: 1, color: "white", flexWrap: "wrap" }}>
//       <a
//         href="http://github.com/DOodle25/Internship"
//         target="_blank"
//         rel="noopener noreferrer"
//         sx={{ color: "white", textDecoration: "none" }}
//       >
//         <IconButton sx={{ color: "white" }}>
//           <GitHubIcon />
//         </IconButton>
//       </a>
//       <IconButton sx={{ color: "white" }} onClick={handleCopy}>
//         <EmailIcon />
//       </IconButton>
//       <a
//         href="https://www.linkedin.com/in/dipen-patel-792296260/"
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{ color: "white", textDecoration: "none" }}
//       >
//         <IconButton sx={{ color: "white" }}>
//           <LinkedInIcon />
//         </IconButton>
//       </a>
//     </Box>
//   </Box>
// );
// const UserProfile = () => {
//   const { token, setUserMethod, user, logout } = useGlobalContext();
//   const location = useLocation();
//   const isChatPage =
//     location.pathname === "/chat"
//     // location.pathname === "/payment" ||
//     // location.pathname === "/payment-admin"
//     ;
//   const isLargeScreen = useMediaQuery("(min-width:960px)");
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//       }}
//     >
//       <AppBar position="sticky">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             CRM
//           </Typography>
//           <IconButton
//             color="inherit"
//             component={Link}
//             to="/chat"
//             title="Chat Bot"
//           >
//             <Chat />
//           </IconButton>
//           {user.role == "customer" ? (
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/payment"
//               title="Payment"
//             >
//               <Payment />
//             </IconButton>
//           ) : (
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/payment-admin"
//               title="Payment-admin"
//             >
//               <Payment />
//             </IconButton>
//           )}
//           {user.role !== "customer" ? (
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/customer-segmentation"
//               title="Customer Segmentation"
//             >
//               <SegmentIcon />
//             </IconButton>
//           ) : (
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/create-task"
//               title="create task"
//             >
//               <CreateNewFolderIcon />
//             </IconButton>
//           )}
//           <IconButton
//             color="inherit"
//             component={Link}
//             to="/profile"
//             title="Profile"
//           >
//             <PersonIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Container
//         sx={{
//           ...(isLargeScreen && {
//             maxWidth: isChatPage ? "none !important" : "lg",
//             marginTop: isChatPage ? "0px !important" : "",
//             paddingLeft: isChatPage ? "0px !important" : "",
//             marginBottom: isChatPage ? "0px !important" : "",
//             paddingBottom: isChatPage ? "0px !important" : "",
//           }),
//         }}
//       >
//         <Routes>
//           <Route
//             path="/chat"
//             element={
//               <ChatPage
//                 logout={logout}
//                 token={token}
//                 setUserMethod={setUserMethod}
//               />
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <Profile
//                 logout={logout}
//                 token={token}
//                 setUserMethod={setUserMethod}
//               />
//             }
//           />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/payment-admin" element={<PaymentAdminPage />} />
//           {user.role !== "customer" ? (
//             <Route
//               path="/customer-segmentation"
//               element={<CustomerSegmentation />}
//             />
//           ) : (
//             <Route path="/create-task" element={<CreateTask />} />
//           )}
//           <Route
//             path="*"
//             element={
//               <Navigate
//                 to="/profile"
//                 logout={logout}
//                 token={token}
//                 setUserMethod={setUserMethod}
//               />
//             }
//           />
//         </Routes>
//       </Container>
//       {!isChatPage && <Footer />}
//     </Box>
//   );
// };

// export default UserProfile;






// import React from "react";
// import { Route, Routes, Link, Navigate } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Box,
//   Container,
//   useMediaQuery,
//   Badge,
//   Avatar,
//   Menu,
//   MenuItem,
//   Divider,
//   Button,
//   Tooltip,
//   Slide,
//   Grow,
//   Zoom,
//   useScrollTrigger,
// } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";
// import PersonIcon from "@mui/icons-material/Person";
// import Chat from "@mui/icons-material/Chat";
// import Payment from "@mui/icons-material/Payment";
// import Profile from "../Profile/ProfilePage";
// import ChatPage from "../Chat/ChatPage";
// import { useGlobalContext } from "../../context/GlobalContext";
// import { useLocation } from "react-router-dom";
// import PaymentPage from "../Payment/PaymentPage";
// import PaymentAdminPage from "../Payment/PaymentAdminPage";
// import CustomerSegmentation from "../../components/Segmentation/CustomerSegmentation";
// import SegmentIcon from "@mui/icons-material/Segment";
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import CreateTask from "../../components/Profile/CreateTask";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import EmailIcon from "@mui/icons-material/Email";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { muiTheme } from "../../utils/theme";

// const email = "emailhelper468@gmail.com";

// const handleCopy = async () => {
//   try {
//     await navigator.clipboard.writeText(email);
//     alert("Email copied to clipboard!");
//   } catch (err) {
//     console.error("Failed to copy: ", err);
//   }
// };

// function ElevationScroll(props) {
//   const { children } = props;
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }

// const Footer = () => (
//   <Box
//     component="footer"
//     sx={{
//       background: "linear-gradient(145deg, #031738, #0a2a6a)",
//       color: "white",
//       pr: 2,
//       pl: 2,
//       pt: 1,
//       pb: 1,
//       textAlign: "center",
//       mt: "auto",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     }}
//   >
//     <Typography variant="body2">
//       © {new Date().getFullYear()} StarOne 
//       {/* CRM */}
//     </Typography>
//     <Box sx={{ display: "flex", gap: 1, color: "white", flexWrap: "wrap" }}>
//       <a
//         href="http://github.com/DOodle25/Internship"
//         target="_blank"
//         rel="noopener noreferrer"
//         sx={{ color: "white", textDecoration: "none" }}
//       >
//         <IconButton sx={{ color: "white" }}>
//           <GitHubIcon />
//         </IconButton>
//       </a>
//       <IconButton sx={{ color: "white" }} onClick={handleCopy}>
//         <EmailIcon />
//       </IconButton>
//       <a
//         href="https://www.linkedin.com/in/dipen-patel-792296260/"
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{ color: "white", textDecoration: "none" }}
//       >
//         <IconButton sx={{ color: "white" }}>
//           <LinkedInIcon />
//         </IconButton>
//       </a>
//     </Box>
//   </Box>
// );

// const UserProfile = () => {
//   const { token, setUserMethod, user, logout } = useGlobalContext();
//   const location = useLocation();
//   const isChatPage = location.pathname === "/chat";
//   const isLargeScreen = useMediaQuery("(min-width:960px)");
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [scrolled, setScrolled] = React.useState(false);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   React.useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10;
//       if (isScrolled !== scrolled) {
//         // setScrolled(isScrolled);
//       }
//     };

//     document.addEventListener("scroll", handleScroll, { passive: true });
//     return () => {
//       document.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrolled]);

//   return (
//     <ThemeProvider theme={muiTheme}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "100vh",
//           backgroundColor: "#f5f7fa",
//         }}
//       >
//         <ElevationScroll>
//           <AppBar
//             position="sticky"
//             sx={{
//               background: 
//               // scrolled
//                 // ? "rgba(3, 23, 56, 0.95)"
//                 "linear-gradient(145deg, #031738, #0a2a6a)",
//               transition: "all 0.3s ease",
//               boxShadow: scrolled
//                 ? "0 4px 20px rgba(0, 0, 0, 0.15)"
//                 : "none",
//               backdropFilter: scrolled ? "blur(8px)" : "none",
//             }}
//           >
//             <Toolbar>
//               <Slide direction="right" in={true} timeout={500}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     flexGrow: 1,
//                     fontWeight: "bold",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <DashboardIcon sx={{ mr: 1, fontSize: "1.5rem" }} />
//                   Star
//                   <Box
//                     component="span"
//                     sx={{
//                       background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
//                       color: "#031738",
//                       borderRadius: "50px",
//                       padding: "0 10px",
//                       display: "inline-block",
//                       transform: "rotate(0deg)",
//                       boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//                       marginLeft: "5px",
//                       fontWeight: "bold",
//                       ml: 1,
//                     }}
//                   >
//                     One
//                   </Box>
//                 </Typography>
//               </Slide>

//               {isLargeScreen ? (
//                 <>
//                   <Zoom in={true} style={{ transitionDelay: "100ms" }}>
//                     <Tooltip title="Chat">
//                       <IconButton
//                         color="inherit"
//                         component={Link}
//                         to="/chat"
//                         sx={{
//                           mx: 1,
//                           "&:hover": {
//                             transform: "scale(1.1)",
//                             transition: "transform 0.2s",
//                           },
//                         }}
//                       >
//                         <Badge
//                           badgeContent={user.tasksAssigned?.length || 0}
//                           color="secondary"
//                         >
//                           <Chat />
//                         </Badge>
//                       </IconButton>
//                     </Tooltip>
//                   </Zoom>

//                   {user.role === "customer" ? (
//                     <Zoom in={true} style={{ transitionDelay: "200ms" }}>
//                       <Tooltip title="Payments">
//                         <IconButton
//                           color="inherit"
//                           component={Link}
//                           to="/payment"
//                           sx={{
//                             mx: 1,
//                             "&:hover": {
//                               transform: "scale(1.1)",
//                               transition: "transform 0.2s",
//                             },
//                           }}
//                         >
//                           <Payment />
//                         </IconButton>
//                       </Tooltip>
//                     </Zoom>
//                   ) : (
//                     <Zoom in={true} style={{ transitionDelay: "200ms" }}>
//                       <Tooltip title="Admin Payments">
//                         <IconButton
//                           color="inherit"
//                           component={Link}
//                           to="/payment-admin"
//                           sx={{
//                             mx: 1,
//                             "&:hover": {
//                               transform: "scale(1.1)",
//                               transition: "transform 0.2s",
//                             },
//                           }}
//                         >
//                           <Payment />
//                         </IconButton>
//                       </Tooltip>
//                     </Zoom>
//                   )}

//                   {user.role !== "customer" ? (
//                     <Zoom in={true} style={{ transitionDelay: "300ms" }}>
//                       <Tooltip title="Customer Segmentation">
//                         <IconButton
//                           color="inherit"
//                           component={Link}
//                           to="/customer-segmentation"
//                           sx={{
//                             mx: 1,
//                             "&:hover": {
//                               transform: "scale(1.1)",
//                               transition: "transform 0.2s",
//                             },
//                           }}
//                         >
//                           <SegmentIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Zoom>
//                   ) : (
//                     <Zoom in={true} style={{ transitionDelay: "300ms" }}>
//                       <Tooltip title="Create Task">
//                         <IconButton
//                           color="inherit"
//                           component={Link}
//                           to="/create-task"
//                           sx={{
//                             mx: 1,
//                             "&:hover": {
//                               transform: "scale(1.1)",
//                               transition: "transform 0.2s",
//                             },
//                           }}
//                         >
//                           <CreateNewFolderIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Zoom>
//                   )}

//                   <Zoom in={true} style={{ transitionDelay: "400ms" }}>
//                     <Button
//                       startIcon={
//                         <Avatar
//                           sx={{
//                             width: 30,
//                             height: 30,
//                             bgcolor: "secondary.main",
//                           }}
//                         >
//                           {user?.name?.charAt(0) || "U"}
//                         </Avatar>
//                       }
//                       color="inherit"
//                       onClick={handleClick}
//                       sx={{
//                         ml: 1,
//                         textTransform: "none",
//                         "&:hover": {
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                         },
//                       }}
//                     >
//                       {user?.name || "User"}
//                     </Button>
//                   </Zoom>

//                   <Menu
//                     anchorEl={anchorEl}
//                     open={open}
//                     onClose={handleClose}
//                     onClick={handleClose}
//                     PaperProps={{
//                       elevation: 4,
//                       sx: {
//                         overflow: "visible",
//                         filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                         mt: 1.5,
//                         "& .MuiAvatar-root": {
//                           width: 32,
//                           height: 32,
//                           ml: -0.5,
//                           mr: 1,
//                         },
//                         "&:before": {
//                           content: '""',
//                           display: "block",
//                           position: "absolute",
//                           top: 0,
//                           right: 14,
//                           width: 10,
//                           height: 10,
//                           bgcolor: "background.paper",
//                           transform: "translateY(-50%) rotate(45deg)",
//                           zIndex: 0,
//                         },
//                       },
//                     }}
//                     transformOrigin={{ horizontal: "right", vertical: "top" }}
//                     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//                   >
//                     <MenuItem
//                       component={Link}
//                       to="/profile"
//                       onClick={handleClose}
//                     >
//                       <PersonIcon sx={{ mr: 1 }} /> Profile
//                     </MenuItem>
//                     <Divider />
//                     <MenuItem
//                       onClick={() => {
//                         handleClose();
//                         logout();
//                       }}
//                     >
//                       <LogoutIcon sx={{ mr: 1 }} /> Logout
//                     </MenuItem>
//                   </Menu>
//                 </>
//               ) : (
//                 <>
//                   <IconButton
//                     color="inherit"
//                     component={Link}
//                     to="/chat"
//                     sx={{
//                       "&:hover": {
//                         transform: "scale(1.1)",
//                         transition: "transform 0.2s",
//                       },
//                     }}
//                   >
//                     <Badge
//                       badgeContent={user.tasksAssigned?.length || 0}
//                       color="secondary"
//                     >
//                       <Chat />
//                     </Badge>
//                   </IconButton>
//                   <IconButton
//                     color="inherit"
//                     component={Link}
//                     to="/profile"
//                     sx={{
//                       "&:hover": {
//                         transform: "scale(1.1)",
//                         transition: "transform 0.2s",
//                       },
//                     }}
//                   >
//                     <PersonIcon />
//                   </IconButton>
//                 </>
//               )}
//             </Toolbar>
//           </AppBar>
//         </ElevationScroll>

//         <Container
//           sx={{
//             flex: 1,
//             // py: 4,
//             ...(isLargeScreen && {
//               maxWidth: isChatPage ? "none !important" : "lg",
//               marginTop: isChatPage ? "0px !important" : "",
//               paddingLeft: isChatPage ? "0px !important" : "",
//               marginBottom: isChatPage ? "0px !important" : "",
//               paddingBottom: isChatPage ? "0px !important" : "",
//             }),
//           }}
//         >
//           <Routes>
//             <Route
//               path="/chat"
//               element={
//                 <ChatPage
//                   logout={logout}
//                   token={token}
//                   setUserMethod={setUserMethod}
//                 />
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <Profile
//                   logout={logout}
//                   token={token}
//                   setUserMethod={setUserMethod}
//                 />
//               }
//             />
//             <Route path="/payment" element={<PaymentPage />} />
//             <Route path="/payment-admin" element={<PaymentAdminPage />} />
//             {user.role !== "customer" ? (
//               <Route
//                 path="/customer-segmentation"
//                 element={<CustomerSegmentation />}
//               />
//             ) : (
//               <Route path="/create-task" element={<CreateTask />} />
//             )}
//             <Route
//               path="*"
//               element={
//                 <Navigate
//                   to="/profile"
//                   logout={logout}
//                   token={token}
//                   setUserMethod={setUserMethod}
//                 />
//               }
//             />
//           </Routes>
//         </Container>
//         {!isChatPage && <Footer />}
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserProfile;






import React from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  useMediaQuery,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
  Tooltip,
  Slide,
  Grow,
  Zoom,
  useScrollTrigger,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import Chat from "@mui/icons-material/Chat";
import Payment from "@mui/icons-material/Payment";
import Profile from "../Profile/ProfilePage";
import ChatPage from "../Chat/ChatPage";
import { useGlobalContext } from "../../context/GlobalContext";
import { useLocation } from "react-router-dom";
import PaymentPage from "../Payment/PaymentPage";
import PaymentAdminPage from "../Payment/PaymentAdminPage";
import CustomerSegmentation from "../../components/Segmentation/CustomerSegmentation";
import SegmentIcon from "@mui/icons-material/Segment";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import CreateTask from "../../components/Profile/CreateTask";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { muiTheme } from "../../utils/theme";

const email = "emailhelper468@gmail.com";

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Footer = () => (
  <Box
    component="footer"
    sx={{
      background: "linear-gradient(145deg, #031738, #0a2a6a)",
      color: "white",
      pr: 2,
      pl: 2,
      pt: 1,
      pb: 1,
      textAlign: "center",
      mt: "auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Typography variant="body2">
      © {new Date().getFullYear()} StarOne 
    </Typography>
    <Box sx={{ display: "flex", gap: 1, color: "white", flexWrap: "wrap" }}>
      <a
        href="http://github.com/DOodle25/Internship"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: "white", textDecoration: "none" }}
      >
        <IconButton sx={{ color: "white" }}>
          <GitHubIcon />
        </IconButton>
      </a>
      <IconButton sx={{ color: "white" }} onClick={handleCopy}>
        <EmailIcon />
      </IconButton>
      <a
        href="https://www.linkedin.com/in/dipen-patel-792296260/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "white", textDecoration: "none" }}
      >
        <IconButton sx={{ color: "white" }}>
          <LinkedInIcon />
        </IconButton>
      </a>
    </Box>
  </Box>
);

const UserProfile = () => {
  const { token, setUserMethod, user, logout } = useGlobalContext();
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";
  const isLargeScreen = useMediaQuery("(min-width:960px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        // setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      TransitionComponent={Grow}
    >
      <MenuItem component={Link} to="/chat" onClick={handleMobileMenuClose}>
        <Chat sx={{ mr: 1 }} /> Chat
        <Badge
          badgeContent={user.tasksAssigned?.length || 0}
          color="secondary"
          sx={{ ml: 1 }}
        />
      </MenuItem>

      {user.role === "customer" ? (
        <MenuItem component={Link} to="/payment" onClick={handleMobileMenuClose}>
          <Payment sx={{ mr: 1 }} /> Payments
        </MenuItem>
      ) : (
        <MenuItem component={Link} to="/payment-admin" onClick={handleMobileMenuClose}>
          <Payment sx={{ mr: 1 }} /> Admin Payments
        </MenuItem>
      )}

      {user.role !== "customer" ? (
        <MenuItem 
          component={Link} 
          to="/customer-segmentation" 
          onClick={handleMobileMenuClose}
        >
          <SegmentIcon sx={{ mr: 1 }} /> Customer Segmentation
        </MenuItem>
      ) : (
        <MenuItem 
          component={Link} 
          to="/create-task" 
          onClick={handleMobileMenuClose}
        >
          <CreateNewFolderIcon sx={{ mr: 1 }} /> Create Task
        </MenuItem>
      )}

      <Divider />
      <MenuItem component={Link} to="/profile" onClick={handleMobileMenuClose}>
        <PersonIcon sx={{ mr: 1 }} /> Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMobileMenuClose();
          logout();
        }}
      >
        <LogoutIcon sx={{ mr: 1 }} /> Logout
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="primary-search-account-menu"
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      TransitionComponent={Grow}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        component={Link}
        to="/profile"
        onClick={handleMenuClose}
      >
        <PersonIcon sx={{ mr: 1 }} /> Profile
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logout();
        }}
      >
        <LogoutIcon sx={{ mr: 1 }} /> Logout
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f5f7fa",
        }}
      >
        <ElevationScroll>
          <AppBar
            position="sticky"
            sx={{
              background: 
                "linear-gradient(145deg, #031738, #0a2a6a)",
              transition: "all 0.3s ease",
              boxShadow: scrolled
                ? "0 4px 20px rgba(0, 0, 0, 0.15)"
                : "none",
              backdropFilter: scrolled ? "blur(8px)" : "none",
            }}
          >
            <Toolbar>
              <Slide direction="right" in={true} timeout={500}>
                <Typography
                  variant="h6"
                  sx={{
                    flexGrow: 1,
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <DashboardIcon sx={{ mr: 1, fontSize: "1.5rem" }} />
                  Star
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                      color: "#031738",
                      borderRadius: "50px",
                      padding: "0 10px",
                      display: "inline-block",
                      transform: "rotate(0deg)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      marginLeft: "5px",
                      fontWeight: "bold",
                      ml: 1,
                    }}
                  >
                    One
                  </Box>
                </Typography>
              </Slide>

              {isLargeScreen ? (
                <>
                  <Zoom in={true} style={{ transitionDelay: "100ms" }}>
                    <Tooltip title="Chat">
                      <IconButton
                        color="inherit"
                        component={Link}
                        to="/chat"
                        sx={{
                          mx: 1,
                          "&:hover": {
                            transform: "scale(1.1)",
                            transition: "transform 0.2s",
                          },
                        }}
                      >
                        <Badge
                          badgeContent={user.tasksAssigned?.length || 0}
                          color="secondary"
                        >
                          <Chat />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </Zoom>

                  {user.role === "customer" ? (
                    <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                      <Tooltip title="Payments">
                        <IconButton
                          color="inherit"
                          component={Link}
                          to="/payment"
                          sx={{
                            mx: 1,
                            "&:hover": {
                              transform: "scale(1.1)",
                              transition: "transform 0.2s",
                            },
                          }}
                        >
                          <Payment />
                        </IconButton>
                      </Tooltip>
                    </Zoom>
                  ) : (
                    <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                      <Tooltip title="Admin Payments">
                        <IconButton
                          color="inherit"
                          component={Link}
                          to="/payment-admin"
                          sx={{
                            mx: 1,
                            "&:hover": {
                              transform: "scale(1.1)",
                              transition: "transform 0.2s",
                            },
                          }}
                        >
                          <Payment />
                        </IconButton>
                      </Tooltip>
                    </Zoom>
                  )}

                  {user.role !== "customer" ? (
                    <Zoom in={true} style={{ transitionDelay: "300ms" }}>
                      <Tooltip title="Customer Segmentation">
                        <IconButton
                          color="inherit"
                          component={Link}
                          to="/customer-segmentation"
                          sx={{
                            mx: 1,
                            "&:hover": {
                              transform: "scale(1.1)",
                              transition: "transform 0.2s",
                            },
                          }}
                        >
                          <SegmentIcon />
                        </IconButton>
                      </Tooltip>
                    </Zoom>
                  ) : (
                    <Zoom in={true} style={{ transitionDelay: "300ms" }}>
                      <Tooltip title="Create Task">
                        <IconButton
                          color="inherit"
                          component={Link}
                          to="/create-task"
                          sx={{
                            mx: 1,
                            "&:hover": {
                              transform: "scale(1.1)",
                              transition: "transform 0.2s",
                            },
                          }}
                        >
                          <CreateNewFolderIcon />
                        </IconButton>
                      </Tooltip>
                    </Zoom>
                  )}

                  <Zoom in={true} style={{ transitionDelay: "400ms" }}>
                    <Button
                      startIcon={
                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            bgcolor: "secondary.main",
                          }}
                        >
                          {user?.name?.charAt(0) || "U"}
                        </Avatar>
                      }
                      color="inherit"
                      onClick={handleProfileMenuOpen}
                      sx={{
                        ml: 1,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      {user?.name || "User"}
                    </Button>
                  </Zoom>
                </>
              ) : (
                <>
                  <IconButton
                    color="inherit"
                    onClick={handleMobileMenuOpen}
                    sx={{
                      "&:hover": {
                        transform: "scale(1.1)",
                        transition: "transform 0.2s",
                      },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </>
              )}
            </Toolbar>
          </AppBar>
        </ElevationScroll>

        {renderMobileMenu}
        {renderMenu}

        <Container
          sx={{
            flex: 1,
            ...(isLargeScreen && {
              maxWidth: isChatPage ? "none !important" : "lg",
              marginTop: isChatPage ? "0px !important" : "",
              paddingLeft: isChatPage ? "0px !important" : "",
              marginBottom: isChatPage ? "0px !important" : "",
              paddingBottom: isChatPage ? "0px !important" : "",
            }),
          }}
        >
          <Routes>
            <Route
              path="/chat"
              element={
                <ChatPage
                  logout={logout}
                  token={token}
                  setUserMethod={setUserMethod}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  logout={logout}
                  token={token}
                  setUserMethod={setUserMethod}
                />
              }
            />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-admin" element={<PaymentAdminPage />} />
            {user.role !== "customer" ? (
              <Route
                path="/customer-segmentation"
                element={<CustomerSegmentation />}
              />
            ) : (
              <Route path="/create-task" element={<CreateTask />} />
            )}
            <Route
              path="*"
              element={
                <Navigate
                  to="/profile"
                  logout={logout}
                  token={token}
                  setUserMethod={setUserMethod}
                />
              }
            />
          </Routes>
        </Container>
        {!isChatPage && <Footer />}
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;