import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const setTokenMethod = (newToken) => {
    // Update the state
    setToken(newToken);

    // Save to localStorage to persist the token
    localStorage.setItem("token", newToken);
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get("/status/check-status", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser({ ...response.data.status.user, token });
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.status.user)
          );
        } catch (error) {
          console.error(
            "Token expired or invalid",
            error?.response?.data?.message
          );
          localStorage.removeItem("token");
          localStorage.removeItem("user");
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
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Assuming `setToken` and `setUser` update the global state or context
      setToken(response.data.token);
      setUser({ ...response.data.user, token: response.data.token });

      return true; // Success
    } catch (error) {
      console.error("Login error:", error?.response?.data?.message);

      // Show error message via toast
      toast.error(error?.response?.data?.message || "Login failed");

      return false; // Failure
    }
  };

  const handleSignup = async (data, isOtpValidation = false) => {
    try {
      let response;
      if (!isOtpValidation) {
        // Step 1: Request OTP
        response = await axiosInstance.post("/auth/send-otp", {
          email: data.email,
        });
        return { success: true, message: response.data.message };
      } else {
        // Step 2: Validate OTP and Complete Signup
        response = await axiosInstance.post("/auth/register", data);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error("Signup error:", error?.response?.data?.message);
      return {
        success: false,
        message: error?.response?.data?.message || "An error occurred",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <GlobalContext.Provider
      value={{
        token,
        user,
        handleLogin,
        handleSignup,
        logout,
        setUserMethod,
        setTokenMethod,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
