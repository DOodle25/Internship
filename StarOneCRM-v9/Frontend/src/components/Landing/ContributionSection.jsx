// src/components/ContributionSection.jsx
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import styled from "styled-components";
import { GitHub } from "@mui/icons-material";
import { ContributionSectionContainer } from "./ContributionSection.styles";


const ContributionSection = () => (
  <ContributionSectionContainer>
    <Container>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#031738", mb: 4 }}
      >
        How to Contribute
      </Typography>
      <Typography variant="h6" sx={{ color: "#6c757d", mb: 4 }}>
        StarOneCRM is an open-source project. Join us on GitHub to contribute
        and improve the platform.
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#031738", color: "#f6f8fa" }}
        startIcon={<GitHub />}
        href="https://github.com/DOodle25/Internship"
        target="_blank"
      >
        Contribute on GitHub
      </Button>
    </Container>
  </ContributionSectionContainer>
);

export default ContributionSection;
