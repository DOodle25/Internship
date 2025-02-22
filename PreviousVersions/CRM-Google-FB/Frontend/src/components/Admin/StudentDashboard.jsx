import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"; // New icon for Assign User
import StudentList from "./StudentList";
import Chat from "@mui/icons-material/Chat";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import Profile from "../Profile/profile";
import AssignUserToEmployee from "./assign";
import ChatPage from "../Profile/chat";
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

const StudentDashboard = ({ token, setUserMethod, logout, theme }) => {
  return (
    <ThemeProvider theme={theme}>
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
              <span
                style={{
                  color: "#FFFFFF",
                }}
              >
                Star
              </span>
              <span
                style={{
                  color: "#FDB8DC",
                  fontStyle: "italic",
                  textShadow: "0.2px 0.3px 0px #FFFFFF",
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
            <IconButton
              color="inherit"
              component={Link}
              to="/"
              title="User List"
            >
              <ListIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/chat"
              title="Chat Bot"
            >
              <Chat /> {/* Chat Bot Icon */}
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/assign"
              title="Assign User"
            >
              <AssignmentIndIcon /> {/* Assign User Icon */}
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/add"
              title="Add User"
            >
              <PersonAddIcon />
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
        <Container sx={{ my: 4 }}>
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
                <StudentList
                  logout={logout}
                  token={token}
                  setUserMethod={setUserMethod}
                />
              }
            />
            <Route
              path="/add"
              element={
                <AddStudent
                  logout={logout}
                  token={token}
                  setUserMethod={setUserMethod}
                />
              }
            />
            <Route
              path="/update/:id"
              element={
                <UpdateStudent
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

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default StudentDashboard;
