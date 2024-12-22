const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: [
    "https://mustafafolio.onrender.com", // Replace with your frontend Render URL
    "http://localhost:3000", // For local development
    "http://localhost:10000", // For local development
    "https://localhost:10000", // For local development
    "localhost:10000", // For local development
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?limit=7";

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

let accessToken = null;

async function refreshAccessToken() {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: REFRESH_TOKEN,
  });

  const response = await axios.post(TOKEN_ENDPOINT, params, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  accessToken = response.data.access_token;
}

async function getSpotifyData(endpoint) {
  if (!accessToken) {
    await refreshAccessToken();
  }

  const response = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

app.get("/now-playing", async (req, res) => {
  try {
    const data = await getSpotifyData(NOW_PLAYING_ENDPOINT);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/top-artists", async (req, res) => {
  try {
    const data = await getSpotifyData(TOP_ARTISTS_ENDPOINT);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve React static files
const frontendPath = path.join(__dirname, "../app/dist");
app.use(express.static(frontendPath));

// Fallback route for React
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
