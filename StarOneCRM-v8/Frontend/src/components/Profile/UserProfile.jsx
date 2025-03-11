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
import Payment from "@mui/icons-material/Payment";
import Profile from "./profile";
import ChatPage from "./chat";
import { useGlobalContext } from "../../context/GlobalContext";
import { useLocation } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import PaymentAdminPage from "../Admin/PaymentAdminPage";
import CustomerSegmentation from "../Admin/CustomerSegmentation";
import SegmentIcon from "@mui/icons-material/Segment";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import CreateTask from "./createtask"
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
  const { token, setUserMethod, user, logout } = useGlobalContext();
  const location = useLocation();
  const isChatPage = location.pathname === "/chat" || location.pathname === "/payment" || location.pathname === "/payment-admin";
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
      <AppBar position="sticky">
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
          {user.role == "customer" ? (
            <IconButton
              color="inherit"
              component={Link}
              to="/payment"
              title="Payment"
            >
              <Payment />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              component={Link}
              to="/payment-admin"
              title="Payment-admin"
            >
              <Payment />
            </IconButton>
          )}
          {user.role !== "customer" ? (
            <IconButton
              color="inherit"
              component={Link}
              to="/customer-segmentation"
              title="Customer Segmentation"
            >
              <SegmentIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              component={Link}
              to="/create-task"
              title="create task"
            >
              <CreateNewFolderIcon />
            </IconButton>
          )}
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

      {/* Footer */}
      {!isChatPage && <Footer />}
    </Box>
  );
};

export default UserProfile;
