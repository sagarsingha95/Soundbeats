import React, { useState } from "react";
import { usePlaylist } from "../context/PlaylistContext";
import { usePlayer } from "../context/PlayerContext";
import { FaPlay, FaPause, FaTrash, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const formatTime = (time = 0) => {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

const PlaylistPage = () => {
  const { playlists, createPlaylist, removeFromPlaylist } = usePlaylist();
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(
    playlists[0]?.id || null
  );
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const selectedPlaylist = playlists.find(
    (pl) => pl.id === selectedPlaylistId
  );

  const handlePlaySong = (song) => {
    if (currentSong?.trackId === song.trackId) {
      togglePlay();
    } else {
      playSong(song, selectedPlaylist.songs);
    }
  };

  // Drag & drop reorder
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(selectedPlaylist.songs);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    // Update playlist with reordered songs
    selectedPlaylist.songs = items; // directly mutate here for simplicity
    setSelectedPlaylistId(selectedPlaylist.id); // force re-render
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  };

  if (playlists.length === 0) {
    return (
      <div className="min-h-screen bg-black text-gray-400 p-6 w-full">
        No playlists yet. Create one to start adding songs!
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="New Playlist Name"
            className="p-2 rounded bg-zinc-800 text-white flex-1"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button
            onClick={handleCreatePlaylist}
            className="bg-green-500 p-2 rounded"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col md:flex-row gap-6 w-full">
      {/* Sidebar: Playlists */}
      <div className="w-full md:w-1/4 bg-zinc-900 rounded-lg p-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold mb-2">Playlists</h2>
        {playlists.map((pl) => (
          <button
            key={pl.id}
            onClick={() => setSelectedPlaylistId(pl.id)}
            className={`text-left p-2 rounded 
              ${selectedPlaylistId === pl.id ? "bg-green-500 text-black" : "hover:bg-zinc-800"}`}
          >
            {pl.name} ({pl.songs.length})
          </button>
        ))}

        {/* Create New Playlist */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="New Playlist Name"
            className="p-2 rounded bg-zinc-800 text-white flex-1"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button
            onClick={handleCreatePlaylist}
            className="bg-green-500 p-2 rounded"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Main Area: Songs Table with Drag & Drop */}
      <div className="flex-1 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">
          {selectedPlaylist?.name || "Select a playlist"}
        </h2>

        {!selectedPlaylist || selectedPlaylist.songs.length === 0 ? (
          <p className="text-gray-400">No songs in this playlist yet.</p>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="songs">
              {(provided) => (
                <table
                  className="w-full border-collapse"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <thead>
                    <tr className="text-gray-400 text-sm border-b border-white/10">
                      <th className="text-left py-3 px-2">#</th>
                      <th className="text-left py-3 px-2">Title</th>
                      <th className="text-left py-3 px-2 hidden md:table-cell">Album</th>
                      <th className="text-left py-3 px-2 hidden sm:table-cell">Artist</th>
                      <th className="text-left py-3 px-2 hidden sm:table-cell">Duration</th>
                      <th className="text-right py-3 px-2">▶ / ❌ </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPlaylist.songs.map((song, index) => {
                      const isCurrent = currentSong?.trackId === song.trackId;
                      return (
                        <Draggable
                          key={song.trackId}
                          draggableId={song.trackId.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`group border-b border-white/5 transition cursor-pointer ${
                                isCurrent ? "bg-zinc-800" : "hover:bg-zinc-900"
                              }`}
                            >
                              <td className="py-3 px-2 text-gray-400">{index + 1}</td>
                              <td className="py-3 px-2 truncate" onClick={() => handlePlaySong(song)}>
                                {song.trackName}
                              </td>
                              <td className="py-3 px-2 truncate hidden md:table-cell text-gray-400">
                                {song.collectionName || "—"}
                              </td>
                              <td className="py-3 px-2 truncate hidden sm:table-cell text-gray-400">
                                {song.artistName}
                              </td>
                              <td className="py-3 px-2 truncate hidden sm:table-cell text-gray-400">
                                {formatTime(Math.floor(song.trackTimeMillis / 1000))}
                              </td>
                              <td className="py-3 px-2 text-right flex justify-end gap-2 items-center">
                                <button
                                  onClick={() => handlePlaySong(song)}
                                  className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
                                >
                                  {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
                                </button>
                                <button
                                  onClick={() => removeFromPlaylist(selectedPlaylist.id, song.trackId)}
                                  className="text-red-500 hover:text-red-400"
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
