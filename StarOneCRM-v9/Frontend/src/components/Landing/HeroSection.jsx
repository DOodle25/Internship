// src/components/HeroSection.jsx
import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import LogoImage from "../../assets/images/image3.png";
import { fadeInUp } from "./HeroSection.styles";

const HeroSection = () => (
  <Box sx={{ backgroundColor: "#f6f8fa", py: 8 }}>
    <Container>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <Typography variant="h2" sx={{ fontWeight: 700, color: "#031738" }}>
              Streamline Your Business with StarOne CRM
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, color: "#6c757d" }}>
              A comprehensive CRM solution built on the MERN stack.
            </Typography>
            <Box mt={4}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#031738", color: "#f6f8fa", mr: 2 }}
                onClick={() => {
                  window.location.href = "/#/login";
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "#031738", color: "#031738" }}
                onClick={() => {
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <img src={LogoImage} alt="StarOne CRM" style={{ width: "100%" }} />
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default HeroSection;
