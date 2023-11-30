import React from "react";
import { Spotify } from "react-spotify-embed";

export default function SpotifyWidget() {
  // You can play the song in its entirety ONLY IF the user is already logged in to spotify through their browser
  return (
    <Spotify
      wide
      link="https://open.spotify.com/track/4qNijbGeHqlcFWrGrATFOX?si=4472348a63dd4f83"
    />
  );
}
