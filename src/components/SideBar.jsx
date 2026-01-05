import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaMusic } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { MdOutlinePlaylistPlay } from "react-icons/md";

const menuItems = [
  { name: "Home", icon: <FaHome size={30}/>, path: "/" ,id:1},
  { name: "Liked Songs", icon: <AiFillLike size={30}/>, path: "/likedsongs",id:2 },
  { name: "Playlist", icon: <MdOutlinePlaylistPlay size={30}/>, path: "/playlist",id:3 },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex  top-0 left-0 h-screen w-60 bg-[#121212] text-white flex-col p-5 gap-8 overflow-y-auto z-50">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-[20px] font-bold flex items-center gap-2  bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
            <FaMusic color="green"/> Sound Beats
          </h1> 
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-4 px-3 py-2 rounded hover:bg-white/10 transition
                  ${isActive ? "bg-white/10" : ""}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto text-gray-500 text-xs text-center">
          © 2026 Sound Beats
        </div>
      </div>

      {/* Mobile Top Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#121212] text-white flex justify-around p-2 z-50 border-b border-white/10">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-green-500" : "text-white/70"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SideBar;
