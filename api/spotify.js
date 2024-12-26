// api/spotify.js
const axios = require("axios");

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

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
  console.log("Access token refreshed successfully.");
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
      console.warn("Access token expired. Refreshing...");
      await refreshAccessToken();
      return getSpotifyData(endpoint);
    }
    console.error("Error fetching Spotify data:", error.message);
    throw error;
  }
}

module.exports = { getSpotifyData };
