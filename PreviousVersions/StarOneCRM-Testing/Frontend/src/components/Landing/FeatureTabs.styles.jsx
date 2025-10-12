// src/components/FeatureTabs.styles.jsx
import styled from "styled-components";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export const ChromeWindow = styled(motion.div)`
  background-color: #f6f8fa;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
`;

export const ChromeTabs = styled(Box)`
  display: flex;
  gap: 0.5rem;
  background-color: #f6f8fa;
  border-radius: 8px 8px 0 0;
  position: relative;
`;

export const ChromeTab = styled(Box)`
  background-color: ${({ active }) => (active ? "#f6f8fa" : "#d1d3d4")};
  padding: 0.5rem 1rem;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${({ active }) => (active ? "#031738" : "#6c757d")};
  &:hover {
    background-color: #f6f8fa;
  }
`;

export const ChromeContent = styled(Box)`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0 0 8px 8px;
  min-height: 300px;
`;

export const ChromeButtons = styled(Box)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const ChromeButton = styled(Box)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
