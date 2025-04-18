// src/components/Navbar.jsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavbarContainer, Logo } from "./Navbar.styles";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <NavbarContainer>
      <Logo onClick={() => navigate("/")}>StarOne CRM</Logo>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#f6f8fa",
          color: "#031738",
          ":hover": {
            backgroundColor: "#f6f8fa",
          },
        }}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </NavbarContainer>
  );
};

export default Navbar;
