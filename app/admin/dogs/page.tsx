"use client";

import { useEffect, useState } from "react";
import { supabaseServer } from "../../../app/lib/supabaseClient";
import DogCard from "@/components/DogCard";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type DogRecord = {
  id: string;
  name: string;
  breed: string;
  image_url: string;
  description: string;
  created_at: string;
};

export default function AdminDogsPage() {
  const [dogs, setDogs] = useState<DogRecord[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [newDog, setNewDog] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchDogs();
  }, []);

  function capitalizeFirst(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function fetchDogs() {
    const { data, error } = await supabaseServer
      .from("Dogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching dogs:", error);
      return;
    }
    if (data) {
      setDogs(data as DogRecord[]);
    }
  }

  async function addDog(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { breed, imageUrl } = await fetchRandomBreedAndImage();

      const { data, error } = await supabaseServer.from("Dogs").insert([
        {
          name: newDog.name,
          description: newDog.description,
          breed,
          image_url: imageUrl,
        },
      ]);

      if (error) {
        console.error("Error adding dog:", error);
        console.error("Message:", error.message);
        console.error("Details:", error.details);
        console.error("Hint:", error.hint);
        console.error("Code:", error.code);
      } else {
        console.log("Inserted dog:", data);
        setNewDog({ name: "", description: "" });
        setShowForm(false);
        fetchDogs();
      }
    } catch (err) {
      console.error("Error fetching random breed/image:", err);
    }
  }

  async function removeDog(id: string) {
    const { error } = await supabaseServer.from("Dogs").delete().eq("id", id);
    if (error) {
      console.error("Error removing dog:", error);
    } else {
      fetchDogs();
    }
  }

  async function fetchRandomBreedAndImage() {
    const breedsRes = await fetch("https://dog.ceo/api/breeds/list/all");
    const breedsData = await breedsRes.json();
    if (breedsData.status !== "success") {
      throw new Error("Failed to fetch breed list");
    }

    const breedList = Object.keys(breedsData.message);
    if (breedList.length === 0) {
      throw new Error("No breeds found");
    }

    const randomBreed =
      breedList[Math.floor(Math.random() * breedList.length)];

    const imgRes = await fetch(
      `https://dog.ceo/api/breed/${randomBreed}/images/random`
    );
    const imgData = await imgRes.json();
    if (imgData.status !== "success") {
      throw new Error("Failed to fetch breed image");
    }

    return {
      breed: randomBreed,
      imageUrl: imgData.message as string,
    };
  }

  const noDogs = dogs.length === 0;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin: Manage Dogs
      </Typography>

      {!showForm && (
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => setShowForm(true)}
            sx={{ borderRadius: 5 }}
          >
            Add Dog
          </Button>
        </Box>
      )}

      {showForm && (
        <Card sx={{ maxWidth: 500, margin: "0 auto", mb: 3, position: "relative" }}>
          <IconButton
            onClick={() => setShowForm(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add a New Dog
            </Typography>
            <form onSubmit={addDog}>
              <TextField
                label="Dog Name"
                value={newDog.name}
                onChange={(e) =>
                  setNewDog((prev) => ({ ...prev, name: e.target.value }))
                }
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                value={newDog.description}
                onChange={(e) =>
                  setNewDog((prev) => ({ ...prev, description: e.target.value }))
                }
                fullWidth
                multiline
                rows={3}
                required
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: 5 }}>
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {noDogs ? (
        <Typography variant="h5" sx={{ mt: 4 }}>
          No dogs!
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {dogs.map((dog) => {
            const breedCapitalized = dog.breed
              ? capitalizeFirst(dog.breed)
              : "No Breed";
            const dateString = dog.created_at
              ? new Date(dog.created_at).toLocaleDateString()
              : "No Date";

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 2,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      p: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => removeDog(dog.id)}
                    >
                      Remove
                    </Button>
                  </Box>

                  <DogCard
                    name={dog.name}
                    imageUrl={dog.image_url}
                    attributes={[
                      `Breed: ${breedCapitalized}`,
                      `Description: ${dog.description || "No Description"}`,
                      `Date Added: ${dateString}`,
                    ]}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
