require("dotenv").config();
console.log("Using CLIENT_ID:", process.env.CLIENT_ID); // Debug: Should print your key

const cors = require("cors");
const express = require("express");
const path = require("path");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: `http://localhost:${port}`,
};
app.use(cors(corsOptions));
app.use(express.static("public"));

async function getRandomImage() {
  const endpoint = `https://api.unsplash.com/photos/random/?client_id=${process.env.CLIENT_ID}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    console.log("Unsplash response data:", data); // Optional for debug

    if (!data.urls || !data.urls.regular) {
      throw new Error("No photo URL found in Unsplash response");
    }

    return data.urls.regular;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

// Assignment route
app.use("/api/v1/getRandomImage", async (request, response) => {
  const photoUrl = await getRandomImage();
  if (p