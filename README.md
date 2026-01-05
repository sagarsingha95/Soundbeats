# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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
