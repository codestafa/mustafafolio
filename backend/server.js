const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: [
    "https://mustafafolio-backend.vercel.app/",
    "https://codestafa.vercel.app/", // Frontend Render URL
    "http://localhost:3000", // Local development
    "http://localhost:10000", // Local development
    "localhost", // General localhost development
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(
  cors({
    credentials: true, // This is important.
    origin: 'https://codestafa.vercel.app/'
  }),
);

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?limit=7";

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

let accessToken = null;

async function refreshAccessToken() {
  try {
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
    console.log("Access token refreshed successfully.");
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
    throw new Error("Failed to refresh access token.");
  }
}

async function getSpotifyData(endpoint) {
  try {
    if (!accessToken) {
      await refreshAccessToken();
    }

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // If unauthorized, refresh the token and retry
      console.warn("Access token expired. Refreshing...");
      await refreshAccessToken();
      return getSpotifyData(endpoint);
    }
    console.error("Error fetching Spotify data:", error.message);
    throw error;
  }
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
app.get(/^\/(?!now-playing|top-artists).*$/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
