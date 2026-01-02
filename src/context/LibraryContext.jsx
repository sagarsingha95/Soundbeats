import { createContext, useContext, useEffect, useState } from "react";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  // 💾 Load from localStorage
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];
    setLikedSongs(savedLikes);
    setPlaylists(savedPlaylists);
  }, []);

  // 💾 Persist
  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  // ❤️ Like / Unlike
  const toggleLike = (song) => {
    setLikedSongs((prev) =>
      prev.some(s => s.trackId === song.trackId)
        ? prev.filter(s => s.trackId !== song.trackId)
        : [...prev, song]
    );
  };

  // 📀 Create playlist
  const createPlaylist = (name) => {
    setPlaylists((prev) => [
      ...prev,
      { id: Date.now(), name, songs: [] }
    ]);
  };

  // ➕ Add song to playlist
  const addToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map(pl =>
        pl.id === playlistId
          ? {
              ...pl,
              songs: pl.songs.some(s => s.trackId === song.trackId)
                ? pl.songs
                : [...pl.songs, song]
            }
          : pl
      )
    );
  };

  return (
    <LibraryContext.Provider
      value={{
        likedSongs,
        playlists,
        toggleLike,
        createPlaylist,
        addToPlaylist
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
