import { useEffect, useState } from 'react'
import Board from '../components/Board'
import { FlapText } from '../components/Flap'

const pad = (n) => String(n).padStart(2, '0')

export default function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    // One interval, cleaned up on unmount. The previous version called
    // setInterval during render, which created a new timer on every tick.
    const id = setInterval(() => setNow(new Date()), 200)
    return () => clearInterval(id)
  }, [])

  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const date = now
    .toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })
    .toUpperCase()
    .replace(/,/g, '')
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <Board eyebrow="Local time">
      <FlapText value={time} size="xl" label={`Current time ${time}`} />

      <FlapText value={date} size="sm" label={date} />

      <p className="readout">
        <span className="lamp" data-on="true" />
        {zone} · 24 hour
      </p>
    </Board>
  )
}
