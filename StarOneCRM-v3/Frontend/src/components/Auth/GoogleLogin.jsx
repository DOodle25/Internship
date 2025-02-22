import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  CircularProgress,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Google,
  // GitHub,
  Facebook,
  // Twitter,
  // LinkedIn,
} from "@mui/icons-material";
import axiosInstance from "../../utils/axios";
import { useGlobalContext } from "../../context/GlobalContext";

const providers = [
  { id: "google", name: "Google", icon: Google, color: "#DB4437" },
  // { id: "github", name: "GitHub", icon: GitHub, color: "#333" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "#3b5998" },
  // { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2" },
  // { id: "linkedin", name: "LinkedIn", icon: LinkedIn, color: "#0077B5" },
];

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net"
    : "http://localhost:5000";

const GoogleLogin = () => {
  const { token, setTokenMethod } = useGlobalContext();
  const [loadingProvider, setLoadingProvider] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(335));

  const handleOAuthLogin = (providerId) => {
    setLoadingProvider(providerId);
    const authUrl = `${BASE_URL}/api/auth/${providerId}?prompt=select_account`;
    const newWindow = window.open(authUrl, "_blank", "width=500,height=600");

    const handleMessage = (event) => {
      if (event.origin !== BASE_URL) return;
      const { token } = event.data;
      if (token) {
        setTokenMethod(token);
        fetchUserDetails();
        newWindow?.close();
        window.location.reload();
      }
    };

    window.addEventListener("message", handleMessage);

    const checkWindow = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(checkWindow);
        window.removeEventListener("message", handleMessage);
        setLoadingProvider(null);
      }
    }, 1000);
  };

  const fetchUserDetails = async () => {
    try {
      if (!token) return;

      const response = await axiosInstance.get("/status/check-status", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setTokenMethod(response.data.token);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "0px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "column",
          justifyContent: "center",
          marginBottom: "15px",
          marginTop: "15px",
        }}
      >
        {providers.map((provider) => (
          <Button
            key={provider.id}
            color="white"
            sx={{
              borderRadius: "5px",
              textTransform: "none",
              fontWeight: "500",
              backgroundColor: provider.color,
              color: "white",
              "&:hover": {
                backgroundColor: provider.color,
              },
            }}
            onClick={() => handleOAuthLogin(provider.id)}
            style={{ margin: "2px" }}
            disabled={loadingProvider === provider.id}
            startIcon={
              loadingProvider === provider.id ? (
                <CircularProgress size={24} />
              ) : (
                <SvgIcon component={provider.icon} />
              )
            }
          >
            {!isSmallScreen && `Sign in with ${provider.name}`}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default GoogleLogin;
