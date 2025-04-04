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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Chat from "@mui/icons-material/Chat";
import Profile from "./profile";
import ChatPage from "./chat";
import { useGlobalContext } from "../../context/GlobalContext";
import { useLocation } from "react-router-dom";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: "primary.main",
      color: "white",
      p: 2,
      textAlign: "center",
      mt: "auto",
    }}
  >
    <Typography variant="body2">© {new Date().getFullYear()} CRM.</Typography>
  </Box>
);

const UserProfile = () => {
  const { token, setUserMethod, logout } = useGlobalContext();
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";
  const isLargeScreen = useMediaQuery("(min-width:960px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CRM
          </Typography>
          <IconButton
            color="inherit"
            component={Link}
            to="/chat"
            title="Chat Bot"
          >
            <Chat />
          </IconButton>
          <IconButton
            color="inherit"
            component={Link}
            to="/profile"
            title="Profile"
          >
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        sx={{
          ...(isLargeScreen && {
            maxWidth: isChatPage ? "none !important" : "lg",
            marginTop: isChatPage ? "0px !important" : "",
            paddingLeft: isChatPage ? "0px !important" : "",
            marginBottom: isChatPage ? "0px !important" : "",
            paddingBottom: isChatPage ? "0px !important" : "",
          })
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

      {/* Footer */}
      {!isChatPage && <Footer />}
    </Box>
  );
};

export default UserProfile;
