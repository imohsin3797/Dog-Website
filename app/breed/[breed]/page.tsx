import DogCard from "@/components/DogCard";
import { Grid } from "@mui/material";

async function getBreedImages(breed: string) {
  try {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await res.json();
    return Array.isArray(data.message) ? data.message.slice(0, 12) : [];
  } catch (error) {
    console.error("Error fetching breed images:", error);
    return [];
  }
}

function getRandomName() {
  const names = ["Buddy", "Charlie", "Max", "Bella", "Lucy", "Daisy", "Rocky", "Milo", "Zoe", "Luna", "Bailey", "Sadie"];
  return names[Math.floor(Math.random() * names.length)];
}

export default async function BreedPage({
  params,
}: {
  params: { breed: string };
}) {
  const images = await getBreedImages(params.breed);

  return (
    <div>
      <h1>Breed: {params.breed}</h1>
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
