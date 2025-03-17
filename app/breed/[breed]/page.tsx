"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DogCard from "@/components/DogCard";
import { Grid } from "@mui/material";

async function getBreedImages(breed: string): Promise<string[]> {
  try {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await res.json();
    return Array.isArray(data.message) ? data.message.slice(0, 12) : [];
  } catch (error) {
    console.error("Error fetching breed images:", error);
    return [];
  }
}

function getRandomName(): string {
  const names = [
    "Buddy",
    "Charlie",
    "Max",
    "Bella",
    "Lucy",
    "Daisy",
    "Rocky",
    "Milo",
    "Zoe",
    "Luna",
    "Bailey",
    "Sadie",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

export default function BreedPage() {
  const { breed } = useParams();
  const breedName = Array.isArray(breed) ? breed[0] : breed;
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (breedName) {
      (async () => {
        const fetchedImages = await getBreedImages(breedName);
        setImages(fetchedImages);
      })();
    }
  }, [breedName]);

  if (!breedName) {
    return <div>No breed specified</div>;
  }

  return (
    <div>
      <h1>Breed: {breedName}</h1>
      {images.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {images.map((imgUrl: string, index: number) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <DogCard
                name={getRandomName()}
                imageUrl={imgUrl}
                attributes={["Friendly", "Loyal", "Great Companion"]}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <h2>No dogs!</h2>
      )}
    </div>
  );
}
