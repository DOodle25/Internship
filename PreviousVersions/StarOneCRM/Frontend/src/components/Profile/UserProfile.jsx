import React from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Chat from "@mui/icons-material/Chat";
import Profile from "./profile";
import ChatPage from "./chat";
import { useGlobalContext } from "../../context/GlobalContext";

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
      <Container>
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
      <Footer />
    </Box>
  );
};

export default UserProfile;
