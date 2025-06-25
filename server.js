require("dotenv").config();
const express = require("express");
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 8080;

// Serve static files from the public folder
app.use(express.static("public"));

// API route to get a random photo from Unsplash
app.get("/api/photo", async (req, res) => {
  const endpoint = `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    console.log("Unsplash response data:", data); // For debugging

    if (!data.urls || !data.urls.regular) {
      // If expected data missing, send error with data for debugging
      return res
        .status(500)
        .json({ error: "No photo URL found in API response", data });
    }

    res.json({ url: data.urls.regular });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch photo" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
