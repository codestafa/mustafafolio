import React, { useEffect, useState } from "react";

interface Track {
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

interface Artist {
  name: string;
  imageUrl: string;
  spotifyUrl: string;
}

const API_BASE_URL = "https://mustafafolio.onrender.com"; // Replace with your actual backend URL
const STORAGE_KEY_TRACK = "lastPlayedTrack";
const STORAGE_KEY_ARTISTS = "topArtists";
// Cache duration set to 24 hours (in milliseconds)
const ARTIST_CACHE_DURATION = 24 * 60 * 60 * 1000;

// Define the default track
const DEFAULT_TRACK: Track = {
  albumImageUrl: "https://i.scdn.co/image/ab67616d0000b27359f6085759932516409713b2",
  artist: "Bladee, Yung Lean",
  isPlaying: false, // Default to not playing
  songUrl: "https://open.spotify.com/track/6Lmz74wEY6YdAb8cTAH8EK",
  title: "Gotham City",
};

const SpotifyNowPlaying: React.FC = () => {
  // State to manage the currently displayed track
  const [track, setTrack] = useState<Track | null>(() => {
    const cachedTrack = localStorage.getItem(STORAGE_KEY_TRACK);
    return cachedTrack ? JSON.parse(cachedTrack) : null;
  });

  // State to manage top artists
  const [artists, setArtists] = useState<Artist[]>(() => {
    const cachedArtists = localStorage.getItem(STORAGE_KEY_ARTISTS);
    const cacheTimestamp = localStorage.getItem(`${STORAGE_KEY_ARTISTS}_timestamp`);
    if (cachedArtists && cacheTimestamp) {
      const isCacheValid = Date.now() - parseInt(cacheTimestamp, 10) < ARTIST_CACHE_DURATION;
      if (isCacheValid) {
        return JSON.parse(cachedArtists);
      }
    }
    return [];
  });

  useEffect(() => {
    // Function to fetch the currently playing track
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/now-playing`);
        if (!response.ok) {
          console.error(`Failed to fetch now playing. Status: ${response.status}`);
          // If no track is stored, store DEFAULT_TRACK and set track to null
          if (!localStorage.getItem(STORAGE_KEY_TRACK)) {
            localStorage.setItem(STORAGE_KEY_TRACK, JSON.stringify(DEFAULT_TRACK));
            setTrack(null); // Display "Currently offline"
          }
          return;
        }

        const nowPlaying = await response.json();

        if (nowPlaying && nowPlaying.item) {
          const mappedTrack: Track = {
            albumImageUrl: nowPlaying.item.album.images[0]?.url || "",
            artist: nowPlaying.item.artists.map((artist: any) => artist.name).join(", "),
            isPlaying: nowPlaying.is_playing,
            songUrl: nowPlaying.item.external_urls.spotify,
            title: nowPlaying.item.name,
          };

          // Store the fetched track in localStorage and update state
          localStorage.setItem(STORAGE_KEY_TRACK, JSON.stringify(mappedTrack));
          setTrack(mappedTrack);
        } else {
          // No track is currently playing
          if (!localStorage.getItem(STORAGE_KEY_TRACK)) {
            localStorage.setItem(STORAGE_KEY_TRACK, JSON.stringify(DEFAULT_TRACK));
            setTrack(null); // Display "Currently offline"
          }
        }
      } catch (error) {
        console.error("Failed to fetch now playing:", error);
        // On fetch failure, if no track is stored, store DEFAULT_TRACK and set track to null
        if (!localStorage.getItem(STORAGE_KEY_TRACK)) {
          localStorage.setItem(STORAGE_KEY_TRACK, JSON.stringify(DEFAULT_TRACK));
          setTrack(null); // Display "Currently offline"
        }
      }
    };

    // Function to fetch top artists
    const fetchTopArtists = async () => {
      try {
        const cachedArtists = localStorage.getItem(STORAGE_KEY_ARTISTS);
        const cacheTimestamp = localStorage.getItem(`${STORAGE_KEY_ARTISTS}_timestamp`);

        let shouldFetch = true;

        if (cachedArtists && cacheTimestamp) {
          const isCacheValid = Date.now() - parseInt(cacheTimestamp, 10) < ARTIST_CACHE_DURATION;
          if (isCacheValid) {
            setArtists(JSON.parse(cachedArtists));
            shouldFetch = false;
          }
        }

        if (shouldFetch) {
          const response = await fetch(`${API_BASE_URL}/top-artists`);
          if (!response.ok) {
            console.error(`Failed to fetch top artists. Status: ${response.status}`);
            return;
          }

          const topArtists = await response.json();

          // Adjust based on response structure
          let artistsArray: any[] = [];

          if (Array.isArray(topArtists)) {
            artistsArray = topArtists;
          } else if (topArtists && Array.isArray(topArtists.items)) {
            artistsArray = topArtists.items;
          } else {
            console.error("Unexpected structure of topArtists:", topArtists);
            return;
          }

          if (artistsArray && Array.isArray(artistsArray)) {
            const mappedArtists: Artist[] = artistsArray.map((artist: any) => ({
              name: artist.name,
              imageUrl: artist.images[0]?.url || "",
              spotifyUrl: artist.external_urls.spotify,
            }));

            // Store the fetched artists in localStorage and update state
            localStorage.setItem(STORAGE_KEY_ARTISTS, JSON.stringify(mappedArtists));
            localStorage.setItem(`${STORAGE_KEY_ARTISTS}_timestamp`, Date.now().toString());

            setArtists(mappedArtists);
          } else {
            console.error("artistsArray is not an array:", artistsArray);
          }
        }
      } catch (error) {
        console.error("Failed to fetch top artists:", error);
      }
    };

    // Function to initialize data on component mount
    const fetchData = async () => {
      // If no track is stored, attempt to fetch now playing
      if (!localStorage.getItem(STORAGE_KEY_TRACK)) {
        await fetchNowPlaying();
      } else {
        const storedTrack = localStorage.getItem(STORAGE_KEY_TRACK);
        if (storedTrack) {
          setTrack(JSON.parse(storedTrack));
          await fetchNowPlaying(); // Attempt to update the track
        }
      }

      // Fetch top artists
      await fetchTopArtists();
    };

    // Initialize data
    fetchData();

    // Set interval to fetch now playing every 20 seconds
    const interval = setInterval(fetchNowPlaying, 20000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 shadow-lg">
      {/* Now Playing Section */}
      {track ? (
        <div
          className="bg-gray-900 p-4 rounded-md w-full max-w-sm border border-gray-700"
          style={{ height: "150px", width: "336px" }}
        >
          <div className="flex items-center mb-4 space-x-2">
            {/* Indicator */}
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                <path
                  fill="#fff"
                  d="M10 0C4.478 0 0 4.478 0 10c0 5.52 4.478 10 10 10s10-4.48 10-10C20 4.478 15.522 0 10 0zm4.6 14.4c-.2.3-.6.4-.9.2-2.3-1.4-5.3-1.8-8.8-1-.3.1-.7-.1-.7-.5s.1-.7.5-.7c3.8-.9 7.1-.5 9.7 1.1.3.2.4.6.2.9zm1.2-2.7c-.2.4-.7.5-1.1.3-2.7-1.7-6.7-2.2-9.9-1.2-.4.1-.8-.1-1-.5-.1-.4.1-.8.5-.1 3.6-1.1 8.1-.6 11.2 1.3.4.2.5.7.3 1.1zM15.9 8.9C12.7 7 7.4 6.8 4.3 7.7c-.5.1-1-.1-1.2-.6s.1-1 .6-1.2c3.5-1.1 9.4-.9 13.1 1.3.4.3.6.8.3 1.3-.3.4-.8.6-1.2.4z"
                />
              </svg>
            </div>
            {/* Status Text */}
            <span className="text-white font-semibold">
              {track.title === DEFAULT_TRACK.title
                ? "Last played"
                : track.isPlaying
                ? "Now playing"
                : "Last played"}
            </span>
          </div>
          {/* Track Details */}
          <div className="flex items-center space-x-4 bg-gray-800 p-3 rounded-md">
            <img
              src={track.albumImageUrl}
              alt={`${track.title} album art`}
              className="w-12 h-12 rounded-sm"
            />
            <div className="flex-1 min-w-0">
              <div className="truncate text-white font-medium" title={track.title}>
                {track.title}
              </div>
              <div className="truncate text-gray-400 text-sm" title={track.artist}>
                {track.artist}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Display "Currently offline" if track is null
        <div
          className="h-24 bg-gray-900 text-gray-400 flex items-center justify-center rounded-md w-full max-w-sm border border-gray-700"
          style={{ height: "150px", width: "336px" }}
        >
          Currently offline
        </div>
      )}

      {/* Top Artists Section */}
      {artists.length > 0 ? (
        <div className="bg-gray-100 p-4 rounded-md w-full max-w-sm border border-gray-300">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Artists</h2>
          <ul className="space-y-4">
            {artists.map((artist, idx) => (
              <li key={idx} className="flex items-center space-x-4">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full shadow"
                />
                <a
                  href={artist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-indigo-600 hover:underline truncate"
                  title={artist.name}
                >
                  {artist.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Handle case when no artists are available
        <div className="bg-gray-100 p-4 rounded-md w-full max-w-sm border border-gray-300">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Artists</h2>
          <p className="text-gray-700">No artists available.</p>
        </div>
      )}
    </div>
  );
};

export default SpotifyNowPlaying;
