import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import LikedSongs from "./pages/LikedSongs";
import Playlist from "./pages/Playlist";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="likedsongs" element={<LikedSongs />} />
        <Route path="playlist" element={<Playlist />} />
      </Route>
    </Routes>
  );
};

export default App;
