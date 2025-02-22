// GlobalContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    useEffect(() => {
        const checkTokenValidity = async () => {
            if (token) {
                try {
                    const response = await axiosInstance.get('/check-status', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser({ ...response.data.status.user, token });
                    localStorage.setItem('user', JSON.stringify(response.data.status.user));
                } catch (error) {
                    console.error("Token expired or invalid", error?.response?.data?.message);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setToken(null);
                    setUser(null);
                }
            }
        };

        checkTokenValidity();
    }, [token]);

    const setUserMethod = (newUser) => {
        // Update the state
        setUser(newUser);
      
        // Save to localStorage to persist the user data
        localStorage.setItem('user', JSON.stringify(newUser));
      };
    // Handle Login
    const handleLogin = async (credentials) => {
        try {
          const response = await axiosInstance.post('/login', credentials);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Assuming `setToken` and `setUser` update the global state or context
          setToken(response.data.token);
          setUser({ ...response.data.user, token: response.data.token });
      
          return true; // Success
        } catch (error) {
          console.error("Login error:", error?.response?.data?.message);
          
          // Show error message via toast
          toast.error(error?.response?.data?.message || 'Login failed');
          
          return false; // Failure
        }
      };
    //   const handleLogin = async (credentials) => {
    //     try {
    //         const response = await axiosInstance.post('/login', credentials);
    //         localStorage.setItem('token', response.data.token);
    //         localStorage.setItem('user', JSON.stringify(response.data.user));
    //         setToken(response.data.token);
    //         setUser({ ...response.data.user, token: response.data.token });
    //     } catch (error) {
    //         console.error("Login error:", error?.response?.data?.message);
    //     }
    // };

    // Handle Signup
    const handleSignup = async (data, isOtpValidation = false) => {
        try {
            let response;
            if (!isOtpValidation) {
                // Step 1: Request OTP
                response = await axiosInstance.post('/send-otp', { email: data.email });
                return { success: true, message: response.data.message };
            } else {
                // Step 2: Validate OTP and Complete Signup
                response = await axiosInstance.post('/register', data);
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            console.error("Signup error:", error?.response?.data?.message);
            return { success: false, message: error?.response?.data?.message || 'An error occurred' };
        }
    };
    

    // Handle Logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <GlobalContext.Provider value={{ token, user, handleLogin, handleSignup, logout, setUserMethod }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);