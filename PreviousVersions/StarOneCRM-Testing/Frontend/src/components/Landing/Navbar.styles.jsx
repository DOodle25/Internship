// src/components/Navbar.styles.jsx
import styled from "styled-components";
import { Box, Typography } from "@mui/material";

export const NavbarContainer = styled(Box)`
  background-color: #031738;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled(Typography)`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  &:hover {
    color: #f6f8fa;
  }
`;
