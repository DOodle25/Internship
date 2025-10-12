// src/components/Footer.jsx
import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";
import { FooterContainer } from "./Footer.styles";

const Footer = () => (
  <FooterContainer>
    <Typography variant="h6">Developed by Dipen Patel</Typography>
    <Box mt={2}>
      <IconButton
        href="https://github.com/DOodle25"
        target="_blank"
        sx={{ color: "#f6f8fa" }}
      >
        <GitHub />
      </IconButton>
      <IconButton
        href="https://in.linkedin.com/in/dipen-patel-792296260"
        target="_blank"
        sx={{ color: "#f6f8fa" }}
      >
        <LinkedIn />
      </IconButton>
      <IconButton href="mailto:cocply135@gmail.com" sx={{ color: "#f6f8fa" }}>
        <Email />
      </IconButton>
    </Box>
  </FooterContainer>
);

export default Footer;
