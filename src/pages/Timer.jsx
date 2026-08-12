import { useEffect, useRef, useState } from 'react'
import Board from '../components/Board'
import { FlapText } from '../components/Flap'

const pad = (n) => String(n).padStart(2, '0')
const clamp = (value, max) => Math.min(max, Math.max(0, Number(value) || 0))

export default function Timer() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [remaining, setRemaining] = useState(0)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const armed = useRef(false)

  const configured = hours * 3600 + minutes * 60 + seconds

  useEffect(() => {
    if (!running) return

    const id = setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setRunning(false)
          setFinished(true)
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [running])

  const start = () => {
    if (configured === 0) return
    if (!armed.current || remaining === 0) {
      setRemaining(configured)
      armed.current = true
    }
    setFinished(false)
    setRunning(true)
  }

  const reset = () => {
    setRunning(false)
    setFinished(false)
    setRemaining(0)
    armed.current = false
  }

  const display = running || remaining > 0 || finished ? remaining : configured
  const label = `${pad(Math.floor(display / 3600))}:${pad(Math.floor((display % 3600) / 60))}:${pad(display % 60)}`

  return (
    <Board eyebrow="Countdown">
      <FlapText value={label} size="xl" label={`Remaining ${label}`} />

      <p className="readout">
        <span className="lamp" data-on={String(running || finished)} />
        {finished ? "Time's up" : running ? 'Counting down' : 'Set a duration'}
      </p>

      {!running && (
        <div className="field-row">
          {[
            ['Hours', hours, (v) => setHours(clamp(v, 99)), 99],
            ['Minutes', minutes, (v) => setMinutes(clamp(v, 59)), 59],
            ['Seconds', seconds, (v) => setSeconds(clamp(v, 59)), 59],
          ].map(([name, value, onChange, max]) => (
            <div className="field-group" key={name}>
              <label className="field-label" htmlFor={name}>{name}</label>
              <input
                id={name}
                className="field"
                type="number"
                min="0"
                max={max}
                value={value}
                onChange={(e) => { onChange(e.target.value); armed.current = false }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="controls">
        {running ? (
          <button className="btn btn--primary" onClick={() => setRunning(false)}>
            Pause
          </button>
        ) : (
          <button className="btn btn--primary" onClick={start} disabled={configured === 0 && remaining === 0}>
            {remaining > 0 ? 'Resume' : 'Start'}
          </button>
        )}
        <button className="btn btn--danger" onClick={reset} disabled={!running && remaining === 0 && !finished}>
          Reset
        </button>
      </div>
    </Board>
  )
}
