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
import { ThemeProvider } from "@mui/material/styles";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import StudentList from "./StudentList";
import Chat from "@mui/icons-material/Chat";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import Profile from "../Profile/profile";
import AssignUserToEmployee from "./assign";
import ChatPage from "../Profile/chat";
import { useGlobalContext } from "../../context/GlobalContext";
import theme from "../../utils/theme";
import Payment from "@mui/icons-material/Payment";
import PaymentAdminPage from "./PaymentAdminPage";
import { useLocation } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
      bgcolor: "primary.main",
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
      © {new Date().getFullYear()} StarOne CRM
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

const StudentDashboard = () => {
  const { token, setUserMethod, logout } = useGlobalContext();
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";
  const isAdminePanel =
    location.pathname === "/" ||
    location.pathname === "/assign" ||
    location.pathname === "/payment-admin";
  const isLargeScreen = useMediaQuery("(min-width:960px)");
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <AppBar position="sticky">
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
                  color: "#FFFFFF",
                  fontStyle: "italic",
                  textShadow: "1.2px 1.3px 0px #3367D1",
                }}
              >
                One
              </span>{" "}
              <span
                style={{
                  background: "#FFFFFF",
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
              <Chat />
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/assign"
              title="Assign User"
            >
              <AssignmentIndIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/payment-admin"
              title="Payment-admin"
            >
              <Payment />
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
        <Container
          sx={{
            // my: 4,
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

export default StudentDashboard;
