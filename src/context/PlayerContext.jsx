import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const currentSong = queue[currentIndex];

  // ▶️ PLAY SONG
  const playSong = (song, list = []) => {
    if (list.length) {
      setQueue(list);
      setCurrentIndex(list.findIndex(s => s.trackId === song.trackId));
    } else {
      setQueue([song]);
      setCurrentIndex(0);
    }

    audioRef.current.src = song.previewUrl;
    audioRef.current.volume = volume;
    audioRef.current.play();

    setIsPlaying(true);
  };

  // ⏯ TOGGLE PLAY
  const togglePlay = () => {
    if (!currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // ⏱ SEEK
  const seek = (value) => {
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  // 🔊 VOLUME
  const changeVolume = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  // ⏭ AUTO NEXT
  const playNext = () => {
    if (shuffle) {
      const random = Math.floor(Math.random() * queue.length);
      setCurrentIndex(random);
      audioRef.current.src = queue[random].previewUrl;
    } else if (currentIndex < queue.length - 1) {
      setCurrentIndex(i => i + 1);
      audioRef.current.src = queue[currentIndex + 1].previewUrl;
    } else if (repeat) {
      setCurrentIndex(0);
      audioRef.current.src = queue[0].previewUrl;
    } else {
      setIsPlaying(false);
      return;
    }
    audioRef.current.play();
  };

  // 🎧 AUDIO EVENTS
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => setProgress(audio.currentTime);
    const setMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setMeta);
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setMeta);
      audio.removeEventListener("ended", playNext);
    };
  }, [currentIndex, shuffle, repeat]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        duration,
        volume,
        shuffle,
        repeat,
        playSong,
        togglePlay,
        seek,
        changeVolume,
        setShuffle,
        setRepeat
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
