"use client";

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
} from "@mui/material";

interface DogCardProps {
  name: string;
  imageUrl: string;
  attributes: string[];
}

const DogCard: React.FC<DogCardProps> = ({ name, imageUrl, attributes }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        maxWidth: 300,
        overflow: "hidden",
        boxShadow: 6,
        transition: "0.3s ease-in-out",
        "&:hover": {
          boxShadow: 10,
          transform: "scale(1.02)",
        },
      }}
    >
      <CardMedia
        sx={{ height: 300, width: "100%" }}
        component="img"
        image={imageUrl}
        alt={name}
      />

      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>

        <List
          sx={{
            display: "inline-block",
            textAlign: "left",
            paddingLeft: 2,
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          {attributes.map((attribute, index) => (
            <ListItem
              key={index}
              sx={{
                display: "list-item",
                listStyleType: "disc",
                paddingLeft: "0.2rem",
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              {attribute}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default DogCard;
