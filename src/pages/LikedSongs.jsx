import { FaPlay, FaPause } from "react-icons/fa";
import { useLibrary } from "../context/LibraryContext";
import { usePlayer } from "../context/PlayerContext";
import Player from "../components/Player";

const LikedSongs = () => {
  const { likedSongs } = useLibrary();
  const {
    playSong,
    togglePlay,
    currentSong,
    isPlaying
  } = usePlayer();

  const handlePlay = (song) => {
    if (currentSong?.trackId === song.trackId) {
      togglePlay();
    } else {
      playSong(song, likedSongs);
    }
  };

  if (likedSongs.length === 0) {
    return (
      <div className="min-h-screen bg-black text-gray-400 p-6 w-full flex items-center justify-center">
        No liked songs yet ❤️
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">❤️ Liked Songs</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* TABLE HEADER */}
          <thead>
            <tr className="text-gray-400 text-sm border-b border-white/10">
              <th className="text-left py-3 px-2">#</th>
              <th className="text-left py-3 px-2">Title</th>
              <th className="text-left py-3 px-2 hidden md:table-cell">
                Album
              </th>
              <th className="text-left py-3 px-2 hidden sm:table-cell">
                Artist
              </th>
              <th className="text-right py-3 px-2">
                ▶
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {likedSongs.map((song, index) => {
              const isCurrent =
                currentSong?.trackId === song.trackId;

              return (
                <tr
                  key={song.trackId}
                  className={`group border-b border-white/5 
                    transition cursor-pointer
                    ${isCurrent ? "bg-zinc-800" : "hover:bg-zinc-900"}`}
                >
                  {/* Index */}
                  <td className="py-3 px-2 text-gray-400">
                    {index + 1}
                  </td>

                  {/* Title */}
                  <td
                    className="py-3 px-2"
                    onClick={() => handlePlay(song)}
                  >
                    <p className="font-medium truncate">
                      {song.trackName}
                    </p>
                  </td>

                  {/* Album */}
                  <td className="py-3 px-2 hidden md:table-cell text-gray-400 truncate">
                    {song.collectionName || "—"}
                  </td>

                  {/* Artist */}
                  <td className="py-3 px-2 hidden sm:table-cell text-gray-400 truncate">
                    {song.artistName}
                  </td>

                  {/* Play Button */}
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => handlePlay(song)}
                      className="opacity-0 group-hover:opacity-100 
                                 transition bg-white text-black 
                                 rounded-full w-8 h-8 
                                 inline-flex items-center justify-center"
                    >
                      {isCurrent && isPlaying ? (
                        <FaPause />
                      ) : (
                        <FaPlay />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Player />
    </div>
  );
};

export default LikedSongs;
