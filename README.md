# Clock

Four time tools in one app — a live clock, a stopwatch, a countdown timer, and a world clock across time zones.

**Live demo:** https://kevin-clock.vercel.app

---

## Features

| Tool | What it does |
|---|---|
| **Clock** | Live local time, updating every second |
| **Stopwatch** | Start, stop and reset with elapsed-time display |
| **Timer** | Set a countdown and get notified when it reaches zero |
| **World** | Current time across multiple time zones side by side |

Each tool is a separate route, so the browser back button and deep links both work.

## Tech stack

| Technology | Purpose |
|---|---|
| React 19 | UI |
| Vite | Build tool and dev server |
| Tailwind CSS | Styling |
| Client-side routing | Navigation between the four tools |

Time zone data is handled with the built-in `Intl.DateTimeFormat` API rather than a date library, keeping the bundle small.

## Running locally

```bash
git clone https://github.com/JamesKevinJones/Clock.git
cd Clock
npm install
npm run dev
```

The dev server prints a local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  pages/
    Clock.jsx       # live local time
    Stopwatch.jsx   # start / stop / reset
    Timer.jsx       # countdown
    World.jsx       # multi-zone display
  components/
    Navbar.jsx      # navigation between tools
  times.js          # time zone definitions
```

## Deployment

Deployed on Vercel as a static build. Any push to `master` can be redeployed with:

```bash
vercel deploy --prod
```

## License

MIT
