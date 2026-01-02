import { FaPlay, FaPause } from "react-icons/fa";
import { FaVolumeHigh, FaShuffle, FaRepeat } from "react-icons/fa6";
import { usePlayer } from "../context/PlayerContext";

const formatTime = (time = 0) => {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

const Player = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    progress,
    duration,
    seek,
    volume,
    changeVolume,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-stone-900 border-t border-white/10 z-50 px-3 py-2 md:px-6 md:py-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 relative">

        {/* 🎵 SONG INFO */}
        <div className="flex-1 w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-2 truncate mb-2 md:mb-0">
          <div className="truncate">
            <h3 className="font-bold text-gray-500 text-xs md:text-sm">Now Playing</h3>
            <p className="text-sm font-semibold truncate">{currentSong.trackName}</p>
            <p className="text-xs text-gray-400 truncate">{currentSong.artistName}</p>
          </div>
        </div>

        {/* ▶️ CONTROLS + PROGRESS */}
        <div className="flex flex-col items-center justify-center w-full md:absolute md:left-1/2 md:transform md:-translate-x-1/2">

          {/* Buttons: Shuffle, Play/Pause, Repeat */}
          <div className="flex items-center gap-4 mb-1">
            <button onClick={() => setShuffle(s => !s)}>
              <FaShuffle className={`text-lg md:text-xl ${shuffle ? "text-green-500" : "text-gray-400"}`} />
            </button>

            <button
              onClick={togglePlay}
              className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button onClick={() => setRepeat(r => !r)}>
              <FaRepeat className={`text-lg md:text-xl ${repeat ? "text-green-500" : "text-gray-400"}`} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full max-w-[400px] text-xs text-gray-400">
            <span className="w-8 text-right">{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              className="flex-1 accent-green-500 cursor-pointer"
            />
            <span className="w-8 text-left">{formatTime(duration)}</span>
          </div>
        </div>

        {/* 🔊 VOLUME (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-2">
          <FaVolumeHigh />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="w-24 accent-green-500 cursor-pointer"
          />
        </div>

      </div>
    </div>
  );
};

export default Player;
