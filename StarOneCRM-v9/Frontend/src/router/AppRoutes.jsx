import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

// Auth
// import LandingPage from "../components/Auth/LandingPage";
import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/LoginPage";
import Signup from "../pages/Auth/SignupPage";
import ForgotPassword from "../pages/Auth/ForgotPasswordPage";
import FillForm from "../pages/RegistrationForm/RegistrationFormPage";
import NotVerified from "../pages/Verification/NotVerifiedPage";

// App
import UserProfile from "../pages/NonAdmin/UserPage";
import UserDashboard from "../pages/Admin/UserPage";

const AppRoutes = () => {
  const { token, user } = useGlobalContext();

  if (!token) {
    return (
      <Router>
        <Routes>
          {/* done */}
          <Route path="/landing-page" element={<LandingPage />} />
          {/* wnp */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  if (user && !user.isFormFilled) {
    return (
      <Router>
        <Routes>
          <Route path="/fill-form" element={<FillForm />} />
          <Route path="*" element={<Navigate to="/fill-form" />} />
        </Routes>
      </Router>
    );
  }

  if (user && !user.isFormVerified) {
    return (
      <Router>
        <Routes>
          <Route path="/verifying" element={<NotVerified />} />
          <Route path="*" element={<Navigate to="/verifying" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        {user.isAdmin ? (
          <Route path="*" element={<UserDashboard />} />
        ) : (
          <Route path="*" element={<UserProfile />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
