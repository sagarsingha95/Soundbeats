export const fetchSongs = async (searchTerm) => {
  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&media=music&limit=20`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch songs");
  }

  return res.json();
};
