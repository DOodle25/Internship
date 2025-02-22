import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import StudentDashboard from './components/Admin/StudentDashboard';
import FillForm from './components/Auth/FillForm';
import NotVerified from './components/Auth/NotVerified';
import UpdateStudent from './components/Admin/UpdateStudent';
import Profile from './components/Profile/profile';
import UserProfile from './components/Profile/UserProfile';
import theme from './utils/theme';
import { ThemeProvider } from '@mui/material/styles';

const AppRoutes = () => {
    const { token, user, setUserMethod, logout, handleLogin, handleSignup } = useGlobalContext();

    if (!token) {
        return (
            <Routes>
                <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    if (user && !user.isFormFilled) {
        return (
            <Routes>
                <Route path="/fill-form" element={<FillForm logout={logout} token={token} setUserMethod={setUserMethod} />} />
                <Route path="*" element={<Navigate to="/fill-form" />} />
            </Routes>
        );
    }

    if (user && !user.isFormVerified) {
        return (
            <Routes>
                <Route path="/verifying" element={<NotVerified logout={logout} />} />
                <Route path="*" element={<Navigate to="/verifying" />} />
            </Routes>
        );
    }

    if (user && !user.isAdmin) {
        return (
            <Routes>
                <Route path="*" element={<UserProfile logout={logout} token={token} setUserMethod={setUserMethod} theme={theme} />} />
                {/* <Route path="/profile" element={<UserProfile logout={logout} token={token} setUserMethod={setUserMethod} />} />
                <Route path="*" element={<Navigate to={`/profile`} />} /> */}
            </Routes>
        );
    }

    if (user && user.isAdmin) {
        return (
            <Routes>
                <Route path="*" element={<StudentDashboard logout={logout} token={token} setUserMethod={setUserMethod} theme={theme} />} />
            </Routes>
        );
    }
};

const App = () => {
    return (
        <GlobalProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <AppRoutes />
                </Router>
            </ThemeProvider>
        </GlobalProvider>
    );
};

export default App;
