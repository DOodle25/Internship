import React, { useEffect } from "react";
import {
  Button,
  Container,
  CircularProgress,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { useGlobalContext } from "../../context/GlobalContext";

const providers = [
  { id: "google", name: "Google", icon: Google, color: "#DB4437" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "#3b5998" },
];

const GoogleLogin = () => {
  const { handleOAuthLogin, fetchUserDetails, loginloadingProvider } =
    useGlobalContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(335));
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
            disabled={loginloadingProvider === provider.id}
            startIcon={
              loginloadingProvider === provider.id ? (
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
