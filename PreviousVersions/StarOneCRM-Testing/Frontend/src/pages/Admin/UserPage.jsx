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
// import { ThemeProvider } from "@mui/material/styles";
// import ListIcon from "@mui/icons-material/List";
// import PersonIcon from "@mui/icons-material/Person";
// import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
// import UserList from "../../components/Admin/UserList";
// import Chat from "@mui/icons-material/Chat";
// import AddUser from "../Dashboard/AddUserPage";
// import UpdateUser from "../Dashboard/UpdateUserPage";
// import Profile from "../Profile/ProfilePage";
// import AssignUserToEmployee from "../Assign/UserAssignPage";
// import ChatPage from "../Chat/ChatPage";
// import { useGlobalContext } from "../../context/GlobalContext";
// import { muiTheme } from "../../utils/theme";
// import Payment from "@mui/icons-material/Payment";
// import PaymentAdminPage from "../Payment/PaymentAdminPage";
// import { useLocation } from "react-router-dom";
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

// const UserDashboard = () => {
//   const { token, setUserMethod, logout } = useGlobalContext();
//   const location = useLocation();
//   const isChatPage = location.pathname === "/chat";
//   const isAdminePanel =
//     location.pathname === "/" ||
//     location.pathname === "/assign" ||
//     location.pathname === "/payment-admin";
//   const isLargeScreen = useMediaQuery("(min-width:960px)");
//   return (
//     <ThemeProvider theme={muiTheme}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "100vh",
//         }}
//       >
//         <AppBar position="sticky">
//           <Toolbar>
//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               Star
//               <span
//                 style={{
//                   background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
//                   color: "#031738",
//                   borderRadius: "50px",
//                   padding: "0 10px",
//                   display: "inline-block",
//                   transform: "rotate(0deg)",
//                   boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//                   marginLeft: "5px",
//                 }}
//               >
//                 One
//               </span>
//             </Typography>

//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/"
//               title="User List"
//             >
//               <ListIcon />
//             </IconButton>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/chat"
//               title="Chat Bot"
//             >
//               <Chat />
//             </IconButton>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/assign"
//               title="Assign User"
//             >
//               <AssignmentIndIcon />
//             </IconButton>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/payment-admin"
//               title="Payment-admin"
//             >
//               <Payment />
//             </IconButton>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/profile"
//               title="Profile"
//             >
//               <PersonIcon />
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <Container
//           sx={{
//             // my: 4,
//             width: "100%",
//             paddingLeft: "0px !important",
//             paddingRight: "0px !important",
//             ...(isLargeScreen && {
//               maxWidth: isChatPage || isAdminePanel ? "none !important" : "lg",
//               marginTop: isChatPage || isAdminePanel ? "0px !important" : "",
//               marginBottom: isChatPage || isAdminePanel ? "0px !important" : "",
//               paddingBottom:
//                 isChatPage || isAdminePanel ? "0px !important" : "",
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
//               path="/"
//               element={
//                 <UserList
//                   logout={logout}
//                   token={token}
//                   setUserMethod={setUserMethod}
//                 />
//               }
//             />
//             <Route
//               path="/add"
//               element={
//                 <AddUser
//                   logout={logout}
//                   token={token}
//                   setUserMethod={setUserMethod}
//                 />
//               }
//             />
//             <Route
//               path="/update/:id"
//               element={
//                 <UpdateUser
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
//             <Route path="/payment-admin" element={<PaymentAdminPage />} />
//             <Route
//               path="/assign"
//               element={
//                 <AssignUserToEmployee
//                   logout={logout}
//                   token={token}
//                   setUserMethod={setUserMethod}
//                 />
//               }
//             />
//             <Route
//               path="*"
//               element={
//                 <Navigate
//                   to="/"
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

// export default UserDashboard;










import React, { useState, useEffect } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  useMediaQuery,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  Slide,
  Grow,
  Zoom,
  useScrollTrigger,
  Badge,
  Tooltip,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import UserList from "../../components/Admin/UserList";
import Chat from "@mui/icons-material/Chat";
import AddUser from "../Dashboard/AddUserPage";
import UpdateUser from "../Dashboard/UpdateUserPage";
import Profile from "../Profile/ProfilePage";
import AssignUserToEmployee from "../Assign/UserAssignPage";
import ChatPage from "../Chat/ChatPage";
import { useGlobalContext } from "../../context/GlobalContext";
import { muiTheme } from "../../utils/theme";
import Payment from "@mui/icons-material/Payment";
import PaymentAdminPage from "../Payment/PaymentAdminPage";
import { useLocation } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

const email = "emailhelper468@gmail.com";

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const Footer = () => (
  <Box
    component="footer"
    sx={{
      // bgcolor: "primary.main",
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

const UserDashboard = () => {
  const { token, setUserMethod, logout, user } = useGlobalContext();
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";
  const isAdminePanel =
    location.pathname === "/" ||
    location.pathname === "/assign" ||
    location.pathname === "/payment-admin";
  const isLargeScreen = useMediaQuery("(min-width:960px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      // anchorOrigin={{
      //   vertical: "top",
      //   horizontal: "right",
      // }}
      id={menuId}
      keepMounted
      // transformOrigin={{
      //   vertical: "top",
      //   horizontal: "right",
      // }}
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
        sx={{ minWidth: 180 }}
        
      >
        <PersonIcon sx={{ mr: 1 }} /> Profile
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>
        <SettingsIcon sx={{ mr: 1 }} /> Settings
      </MenuItem> */}
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

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      TransitionComponent={Grow}
    >
      <MenuItem component={Link} to="/" onClick={handleMobileMenuClose}>
        <ListIcon sx={{ mr: 1 }} /> Users
      </MenuItem>
      <MenuItem component={Link} to="/chat" onClick={handleMobileMenuClose}>
        <Chat sx={{ mr: 1 }} /> Chat
      </MenuItem>
      <MenuItem component={Link} to="/assign" onClick={handleMobileMenuClose}>
        <AssignmentIndIcon sx={{ mr: 1 }} /> Assign
      </MenuItem>
      <MenuItem
        component={Link}
        to="/payment-admin"
        onClick={handleMobileMenuClose}
      >
        <Payment sx={{ mr: 1 }} /> Payments
      </MenuItem>
      <Divider />
      <MenuItem component={Link} to="/profile" onClick={handleMobileMenuClose}>
        <PersonIcon sx={{ mr: 1 }} /> Profile
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
        }}
      >
        <ElevationScroll>
          <AppBar
            position="sticky"
            sx={{
              background: scrolled
                ? "rgba(3, 23, 56, 0.95)"
                : "linear-gradient(145deg, #031738, #0a2a6a)",
                // : "linear-gradient(145deg, #031738, #031738)",
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
                      background:
                        "linear-gradient(145deg, #ffffff, #e6e6e6)",
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
                    <Tooltip title="User List">
                      <IconButton
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{
                          mx: 1,
                          "&:hover": {
                            transform: "scale(1.1)",
                            transition: "transform 0.2s",
                          },
                        }}
                      >
                        <ListIcon />
                      </IconButton>
                    </Tooltip>
                  </Zoom>
                  <Zoom in={true} style={{ transitionDelay: "200ms" }}>
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
                        <Badge badgeContent={user.tasksAssigned.length} color="secondary">
                          <Chat />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </Zoom>
                  <Zoom in={true} style={{ transitionDelay: "300ms" }}>
                    <Tooltip title="Assign User">
                      <IconButton
                        color="inherit"
                        component={Link}
                        to="/assign"
                        sx={{
                          mx: 1,
                          "&:hover": {
                            transform: "scale(1.1)",
                            transition: "transform 0.2s",
                          },
                        }}
                      >
                        <AssignmentIndIcon />
                      </IconButton>
                    </Tooltip>
                  </Zoom>
                  <Zoom in={true} style={{ transitionDelay: "400ms" }}>
                    <Tooltip title="Payments">
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
                  {/* <Zoom in={true} style={{ transitionDelay: "500ms" }}>
                    <Tooltip title="Notifications">
                      <IconButton
                        color="inherit"
                        sx={{
                          mx: 1,
                          "&:hover": {
                            transform: "scale(1.1)",
                            transition: "transform 0.2s",
                          },
                        }}
                      >
                        <Badge badgeContent={3} color="error">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </Zoom> */}
                  <Zoom in={true} style={{ transitionDelay: "600ms" }}>
                    <Button
                      startIcon={
                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            bgcolor: "secondary.main",
                          }}
                        >
                          {/* {user?.name?.charAt(0) || "U"} */}
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
            width: "100%",
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
            ...(isLargeScreen && {
              maxWidth: isChatPage || isAdminePanel ? "none !important" : "lg",
              marginTop: isChatPage || isAdminePanel ? "0px !important" : "",
              marginBottom: isChatPage || isAdminePanel ? "0px !important" : "",
              paddingBottom:
                isChatPage || isAdminePanel ? "0px !important" : "",
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
              path="/"
              element={
                <UserList
                  logout={logout}
                  token={token}
                  setUserMethod={setUserMethod}
                />
              }
            />
            <Route
              path="/add"
              element={
                <AddUser
                  logout={logout}
                  token={token}
                  setUserMethod={setUserMethod}
                />
              }
            />
            <Route
              path="/update/:id"
              element={
                <UpdateUser
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
            <Route path="/payment-admin" element={<PaymentAdminPage />} />
            <Route
              path="/assign"
              element={
                <AssignUserToEmployee
                  logout={logout}
                  token={token}
                  setUserMethod={setUserMethod}
                />
              }
            />
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
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

export default UserDashboard;