import { useEffect, useRef, useState } from 'react'
import Board from '../components/Board'
import { FlapText } from '../components/Flap'

const pad = (n, width = 2) => String(n).padStart(width, '0')

export default function Stopwatch() {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [laps, setLaps] = useState([])
  const startedAt = useRef(0)

  useEffect(() => {
    if (!running) return
    startedAt.current = Date.now() - elapsed
    const id = setInterval(() => setElapsed(Date.now() - startedAt.current), 40)
    return () => clearInterval(id)
    // elapsed is intentionally omitted: including it would restart the
    // interval on every tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const format = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms / 1000) % 60)
    const hundredths = Math.floor((ms % 1000) / 10)
    return `${pad(minutes)}:${pad(seconds)}.${pad(hundredths)}`
  }

  const reset = () => {
    setRunning(false)
    setElapsed(0)
    setLaps([])
  }

  return (
    <Board eyebrow="Elapsed">
      <FlapText value={format(elapsed)} size="xl" label={`Elapsed ${format(elapsed)}`} />

      <p className="readout">
        <span className="lamp" data-on={String(running)} />
        {running ? 'Running' : elapsed ? 'Stopped' : 'Ready'}
        {laps.length > 0 && ` · ${laps.length} lap${laps.length > 1 ? 's' : ''}`}
      </p>

      <div className="controls">
        <button className="btn btn--primary" onClick={() => setRunning((r) => !r)}>
          {running ? 'Stop' : elapsed ? 'Resume' : 'Start'}
        </button>
        <button
          className="btn"
          onClick={() => setLaps((l) => [elapsed, ...l])}
          disabled={!running}
        >
          Lap
        </button>
        <button className="btn btn--danger" onClick={reset} disabled={!elapsed}>
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="departures">
          {laps.map((lap, i) => (
            <div className="dep-row" key={`${lap}-${i}`}>
              <div className="dep-city">Lap {laps.length - i}</div>
              <FlapText value={format(lap)} size="sm" />
              <span className="dep-offset">
                {i === laps.length - 1 ? '—' : `+${format(lap - laps[i + 1])}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </Board>
  )
}
