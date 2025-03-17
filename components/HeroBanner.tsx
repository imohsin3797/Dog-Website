"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import Image from "next/image";
import dogImage from "../app/assets/HappyDog.jpg";
import CurvyDivider from "./CurvyDivider";

const popUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroBanner: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",    
        overflow: "hidden",
        margin: 0,
        padding: 0,
        
      }}
    >
      <Image
        src={dogImage}
        alt="Happy Dog"
        fill
        style={{ objectFit: "cover"}}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h2"
          color="white"
          sx={{
            px: 2,
            animation: `${popUp} 0.8s ease-out forwards`,
          }}
        >
          Adopt a Furry Friend Today!
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        <CurvyDivider
          fillColor="black"
          strokeColor="white"
          strokeWidth={0}
        />
      </Box>
    </Box>
  );
};

export default HeroBanner;
