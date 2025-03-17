import React from "react";
import HeroBanner from "@/components/HeroBanner";
import { Box, Typography, Grid } from "@mui/material";
import DogCard from "@/components/DogCard";
import { supabaseServer } from "../app/lib/supabaseClient";

interface DogRecord {
  id: string;
  name: string;
  breed: string;
  image_url: string;
  description: string;
  created_at: string;
}

export const revalidate = 0; 

export default async function Home() {

  const { data, error } = await supabaseServer
    .from("Dogs")
    .select("*");

  if (error) {
    console.error("Error fetching dogs:", error);
    return (
      <div style={{ color: "red", textAlign: "center" }}>
        <p>Error fetching dogs!</p>
      </div>
    );
  }

  let allDogs = data || [];
  allDogs = shuffleArray(allDogs);

  let selectedDogs = allDogs;
  if (allDogs.length > 8) {
    selectedDogs = allDogs.slice(0, 8);
  }

  return (
    <>
      <HeroBanner />
      <Box sx={{ backgroundColor: "black", py: 5, px: 3 }}>
        <Typography
          variant="h4"
          align="center"
          color="white"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Check out our current dogs up for adoption!
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {selectedDogs.map((dog) => (
            <Grid item key={dog.id} xs={12} sm={6} md={4} lg={3}>
              <DogCard
                name={dog.name}
                imageUrl={dog.image_url}
                attributes={getDogAttributes(dog)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

function shuffleArray(array: DogRecord[]): DogRecord[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getDogAttributes(dog: DogRecord): string[] {
  const breedInfo = dog.breed
    ? `Breed: ${dog.breed}`
    : "Breed: Unknown";
  const descriptionInfo = dog.description
    ? `Description: ${dog.description}`
    : "No Description";
  const dateAdded = dog.created_at
    ? `Date Added: ${new Date(dog.created_at).toLocaleDateString()}`
    : "Date Added: Unknown";

  return [breedInfo, descriptionInfo, dateAdded];
}
