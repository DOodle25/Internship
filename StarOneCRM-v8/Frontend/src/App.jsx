import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GlobalProvider, useGlobalContext } from "./context/GlobalContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import StudentDashboard from "./components/Admin/UserDashboard";
import FillForm from "./components/Auth/FillForm";
import NotVerified from "./components/Auth/NotVerified";
import UserProfile from "./components/Profile/UserProfile";
import theme from "./utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import ForgotPassword from "./components/Auth/ForgotPassword";
import LandingPage from "./components/Auth/LandingPage"
const AppRoutes = () => {
  const { token, user } = useGlobalContext();
  if (!token) {
    return (
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  if (user && !user.isFormFilled) {
    return (
      <Routes>
        <Route path="/fill-form" element={<FillForm />} />
        <Route path="*" element={<Navigate to="/fill-form" />} />
      </Routes>
    );
  }
  if (user && !user.isFormVerified) {
    return (
      <Routes>
        <Route path="/verifying" element={<NotVerified />} />
        <Route path="*" element={<Navigate to="/verifying" />} />
      </Routes>
    );
  }
  if (user && !user.isAdmin) {
    return (
      <Routes>
        <Route path="*" element={<UserProfile />} />
      </Routes>
    );
  }
  if (user && user.isAdmin) {
    return (
      <Routes>
        <Route path="*" element={<StudentDashboard />} />
      </Routes>
    );
  }
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <Router>
          <AppRoutes />
        </Router>
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default App;
