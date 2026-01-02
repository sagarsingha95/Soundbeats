import React, { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();

export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);

  // Create a new playlist
  const createPlaylist = (name) => {
    setPlaylists((prev) => [
      ...prev,
      { id: Date.now(), name, songs: [] }
    ]);
  };

  // Add song to a playlist
  const addToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, songs: [...pl.songs, song] }
          : pl
      )
    );
  };

  // Remove song from a playlist
  const removeFromPlaylist = (playlistId, trackId) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, songs: pl.songs.filter((s) => s.trackId !== trackId) }
          : pl
      )
    );
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
