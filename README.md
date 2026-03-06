# Pomodoro

This repository contains a small Pomodoro timer application built with React and TypeScript. It helps you structure focused work sessions and breaks with a clean, distraction‑free interface.

## What the app does

The app shows a large central timer following the Pomodoro technique, with durations of 25 minutes for focus, 5 minutes for a short break, and 15 minutes for a long break in cycles of four. You can start, pause, reset, or skip the current period, see which cycle you are on, and track statistics such as completed cycles, total focus time, and total break time.

## Tech stack

- **Framework**: Vite + React with TypeScript
- **Styling**: Tailwind CSS 4 and DaisyUI components
- **State management**: Zustand for the Pomodoro timer state and statistics

## Running locally

You can use any JavaScript package manager you prefer; the examples below use Bun.

First install the dependencies:

```bash
bun install
```

Then start the development server:

```bash
bun run dev
```

By default Vite serves the app on `http://localhost:5173`. To create a production build:

```bash
bun run build
```

To preview the production build:

```bash
bun run preview
```

## URLs

In development the base URL is `http://localhost:5173`. Main route:

- `/` — Pomodoro timer interface
