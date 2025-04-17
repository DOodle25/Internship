// src/pages/LandingPage.jsx
import React from "react";
import { Box } from "@mui/material";
import Navbar from "../../components/Landing/Navbar";
import HeroSection from "../../components/Landing/HeroSection";
import FeatureTabs from "../../components/Landing/FeatureTabs";
import ContributionSection from "../../components/Landing/ContributionSection";
import Footer from "../../components/Landing/Footer";

const LandingPage = () => (
  <Box>
    <Navbar />
    <HeroSection />
    <FeatureTabs />
    <ContributionSection />
    <Footer />
  </Box>
);

export default LandingPage;
