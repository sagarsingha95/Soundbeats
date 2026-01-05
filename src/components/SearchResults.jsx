import React, { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import { useLibrary } from "../context/LibraryContext";
import { usePlaylist } from "../context/PlaylistContext";


const fetchSongs = async (query) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=10`,
      { signal: controller.signal }
    );

    if (!res.ok) throw new Error("Failed to fetch songs");
    return res.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

const SearchResults = () => {
  const { query } = useContext(SearchContext);
  const debouncedQuery = useDebounce(query, 400);

  const { playSong } = usePlayer();
  const { likedSongs, toggleLike } = useLibrary();
  const { playlists, addToPlaylist } = usePlaylist();
  const [dropdownOpen, setDropdownOpen] = useState(null); // track song id for open dropdown

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchSongs(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
  });

  if (!debouncedQuery) return null;

  return (
    <div className="mt-6 h-full">
      {isLoading && (
        <p className="text-gray-400 text-sm">Searching songs...</p>
      )}
      {isError && (
        <p className="text-red-400 text-sm">Failed to load songs</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pl-5">
        {data?.results?.map((song) => {
          const isLiked = likedSongs.some(
            (s) => s.trackId === song.trackId
          );

          return (
            <div
              key={song.trackId}
              className="group bg-zinc-900 rounded-lg p-2 hover:bg-zinc-800 transition cursor-pointer relative"
            >
              {/* Album Art */}
              <div className="relative">
                <img
                  src={song.artworkUrl100}
                  alt={song.trackName}
                  loading="lazy"
                  onError={(e)=>{
                    e.currentTarget.src ='../../public/ChatGPT Image Jan 2, 2026, 11_22_49 PM.png'
                  }}
                  className="rounded-md w-full aspect-square object-cover"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-md transition">
                  <button
                    onClick={() => playSong(song, data.results)}
                    className="bg-green-500 text-black rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <FaPlay />
                  </button>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song);
                  }}
                  className="absolute top-2 right-2"
                >
                  {isLiked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-white/70" />
                  )}
                </button>

                {/* Add to Playlist Dropdown */}
                <div className="absolute top-2 left-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(dropdownOpen === song.trackId ? null : song.trackId);
                    }}
                    className="bg-gray-700 p-1 rounded text-xs"
                  >
                    Add to Playlist
                  </button>

                  {dropdownOpen === song.trackId && playlists.length > 0 && (
                    <div className="absolute mt-1 bg-zinc-800 rounded shadow-lg w-40 z-50">
                      {playlists.map((pl) => (
                        <div
                          key={pl.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToPlaylist(pl.id, song);
                            setDropdownOpen(null);
                          }}
                          className="p-2 hover:bg-green-500 hover:text-black cursor-pointer truncate"
                        >
                          {pl.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Song Info */}
              <div className="mt-2">
                <p className="text-sm font-medium truncate">{song.trackName}</p>
                <p className="text-xs text-gray-400 truncate">{song.artistName}</p>
              </div>
            </div>
          );
        })}
      </div>

      {data?.results?.length === 0 && !isLoading && (
        <p className="text-gray-400 text-sm mt-4">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
