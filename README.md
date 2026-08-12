# Digilog

A split-flap departure board that tells the time. Four tools — clock, world clock, stopwatch, countdown timer — sharing one mechanical cabinet, where every value that changes physically flips.

**Live demo:** https://kevin-clock.vercel.app

---

## Why a departure board

Timekeeping already has an industrial design language: the Solari split-flap boards in railway stations. Borrowing it does real work here rather than decorating — the world clock becomes a departures list, a running stopwatch reads like a live board, and each digit change gets a mechanism instead of a fade.

The flip is CSS only: two static halves clipped from one glyph, plus two rotating leaves during the transition. No animation library, no sprite sheets.

## Features

| Tool | What it does |
|---|---|
| **Clock** | Local time to the second, with date and resolved IANA zone |
| **World** | A departures board of cities with live local times, day and UTC offset. Add or remove zones; your board persists in `localStorage` |
| **Stopwatch** | Start, stop, resume, and laps with per-lap splits |
| **Timer** | Countdown with pause and resume, and a signal lamp on completion |

## Tech stack

| Technology | Purpose |
|---|---|
| React 18 | UI |
| React Router | Routing between the four tools |
| Vite | Build tool and dev server |
| Tailwind CSS | Base layer only; the board is hand-written CSS |
| `Intl.DateTimeFormat` | All time zone maths — no date library, no network calls |

## Design

| Token | Value | Role |
|---|---|---|
| Cabinet | `#1b3a3f` | Petrol housing |
| Flap | `#ede8dc` | Bone leaf face |
| Ink | `#12171a` | Character |
| Signal | `#c2452e` | Running and alert states |
| Brass | `#b08d3f` | Fixings, focus rings |

Type is Archivo Narrow for the flaps, Space Mono for technical readouts, Archivo for UI.

Motion respects `prefers-reduced-motion`: the flip resolves instantly rather than animating.

## Running locally

```bash
git clone https://github.com/JamesKevinJones/Clock.git
cd Clock
npm install
npm run dev
```

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build
npm run lint
```

## Project structure

```
src/
  components/
    Board.jsx     # cabinet shell, wordmark, section nav
    Flap.jsx      # one split-flap character, and a run of them
  pages/
    Clock.jsx     # local time
    World.jsx     # departures board
    Stopwatch.jsx # elapsed time and laps
    Timer.jsx     # countdown
  times.js        # IANA time zone list
  index.css       # design tokens and the flap mechanism
```

## Notes

The redesign also fixed two defects in the original:

- `Clock.jsx` called `setInterval` during render with no cleanup, creating a new timer on every tick until the tab slowed to a crawl. It now runs one interval, cleared on unmount.
- The world clock fetched every lookup from an external time API, so it broke offline and on rate limits. Times are now computed locally with `Intl`.
- The timer used a blocking `alert()` on completion; it now sets a state on the board.

`vercel.json` rewrites all paths to `index.html` so deep links like `/world` survive a refresh.

## License

MIT
