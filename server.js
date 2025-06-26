require("dotenv").config();
console.log("Using CLIENT_ID:", process.env.CLIENT_ID);

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

// Serve static assets
app.use(express.static("public"));

// Serve main page explicitly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function getRandomImage() {
  const endpoint = `https://api.unsplash.com/photos/random/?client_id=${process.env.CLIENT_ID}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    console.log("Unsplash response data:", data);

    if (!data.urls || !data.urls.regular) {
      throw new Error("No photo URL found in Unsplash response");
    }

    return data.urls.regular;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

app.get("/api/v1/getRandomImage", async (req, res) => {
  const photoUrl = await getRandomImage();
  if (photoUrl) {
    res.status(200).json({
      status: 200,
      data: photoUrl,
    });
  } else {
    res.status(500).json({
      status: 500,
      error: "Failed to fetch image from Unsplash",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
