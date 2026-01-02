🎵 Sound Beats - Music Player App

Sound Beats is a modern, responsive music streaming application inspired by Spotify. It allows users to search for songs via the Apple iTunes API, play/pause tracks, like songs, create and manage playlists, and enjoy playback features like shuffle, repeat, volume control, and a draggable progress bar. The UI adapts to both desktop and mobile screens, with a persistent player and interactive components.

Features

🎧 Search songs with real-time debouncing

▶️ Play, pause, skip, shuffle, and repeat tracks

❤️ Like songs and add them to “Liked Songs”

📀 Create and manage playlists with drag-and-drop reordering

🔊 Volume control and interactive progress bar

🖥 Responsive design: sidebar for desktop, top nav for mobile

🎨 Modern, Spotify-inspired interface

⚡ Smooth performance using React Context and TanStack Query

Tech Stack

Frontend: React, React Router

State Management: React Context (PlayerContext, LibraryContext, PlaylistContext, SearchContext)

Data Fetching: TanStack Query (for iTunes API)

Styling: Tailwind CSS

Icons: React Icons

Utilities: Custom hooks (useDebounce, usePlayer, etc.)
