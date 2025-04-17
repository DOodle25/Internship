// src/components/FeatureTabs.jsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { features } from "./Features";
import {
  ChromeWindow,
  ChromeTabs,
  ChromeTab,
  ChromeContent,
  ChromeButtons,
  ChromeButton,
} from "./FeatureTabs.styles";

const FeatureTabs = () => {
  const [activeTab, setActiveTab] = React.useState("chat");

  return (
    <Box
      component="section"
      id="features"
      sx={{ py: 8, backgroundColor: "#f6f8fa" }}
    >
      <Container>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: 700, color: "#031738", mb: 4 }}
        >
          Features
        </Typography>
        <ChromeWindow>
          <ChromeTabs>
            {features.map((feature) => (
              <ChromeTab
                key={feature.id}
                active={activeTab === feature.id}
                onClick={() => setActiveTab(feature.id)}
              >
                {feature.title}
              </ChromeTab>
            ))}
            <ChromeButtons>
              <ChromeButton
                color="#ff5f56"
                onClick={() => console.log("Close clicked")}
              />
              <ChromeButton
                color="#ffbd2e"
                onClick={() => console.log("Minimize clicked")}
              />
              <ChromeButton
                color="#28c940"
                onClick={() => console.log("Maximize clicked")}
              />
            </ChromeButtons>
          </ChromeTabs>
          <ChromeContent>
            {features.find((feature) => feature.id === activeTab)?.content}
          </ChromeContent>
        </ChromeWindow>
      </Container>
    </Box>
  );
};

export default FeatureTabs;
