import React from "react";
import { Box } from "@mui/material";

interface CurvyDividerProps {
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

const CurvyDivider: React.FC<CurvyDividerProps> = ({
  fillColor = "transparent",
  strokeColor = "white",
  strokeWidth = 0,
}) => {
  return (
    <Box sx={{ width: "100%", overflow: "hidden", lineHeight: 0 }}>
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "150px" }}
      >
        <path
          d="M0.00,49.98 C150.00,150.00 349.74,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
          style={{
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth: strokeWidth,
          }}
        />
      </svg>
    </Box>
  );
};

export default CurvyDivider;
