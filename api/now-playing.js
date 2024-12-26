// api/now-playing.js
const { getSpotifyData } = require("./spotify");

const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Method not allowed. Only GET is supported.");
  }

  try {
    const data = await getSpotifyData(NOW_PLAYING_ENDPOINT);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
