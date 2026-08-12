import { useEffect, useMemo, useState } from 'react'
import Board from '../components/Board'
import { FlapText } from '../components/Flap'
import times from '../times.js'

const STORE_KEY = 'digilog.zones'

const DEFAULT_ZONES = [
  'Asia/Kolkata',
  'Europe/London',
  'America/New_York',
  'Asia/Tokyo',
]

const cityOf = (zone) => zone.split('/').pop().replace(/_/g, ' ')

const timeIn = (zone) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: zone, hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(new Date())

const offsetOf = (zone) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: zone, timeZoneName: 'shortOffset',
  }).formatToParts(new Date())
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? ''
}

const dayOf = (zone) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: zone, weekday: 'short' })
    .format(new Date())
    .toUpperCase()

export default function World() {
  const [zones, setZones] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY))
      return Array.isArray(saved) && saved.length ? saved : DEFAULT_ZONES
    } catch {
      return DEFAULT_ZONES
    }
  })
  const [, setTick] = useState(0)

  // Times are computed locally with Intl, so the board keeps working offline.
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(zones))
  }, [zones])

  const available = useMemo(
    () => times.filter((zone) => !zones.includes(zone)),
    [zones],
  )

  const addZone = (event) => {
    const zone = event.target.value
    if (zone) setZones((current) => [...current, zone])
    event.target.value = ''
  }

  const removeZone = (zone) =>
    setZones((current) => current.filter((z) => z !== zone))

  return (
    <Board eyebrow="Departures">
      <div className="field-group" style={{ alignItems: 'center' }}>
        <label className="field-label" htmlFor="add-zone">Add a city</label>
        <select id="add-zone" className="field" defaultValue="" onChange={addZone}>
          <option value="">Select a time zone…</option>
          {available.map((zone) => (
            <option key={zone} value={zone}>{zone.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      <div className="departures">
        {zones.length === 0 && (
          <p className="empty-note">No cities on the board. Add one above.</p>
        )}

        {zones.map((zone) => (
          <div className="dep-row" key={zone}>
            <div>
              <div className="dep-city">{cityOf(zone)}</div>
              <div className="dep-zone">{zone}</div>
            </div>

            <FlapText
              value={timeIn(zone)}
              size="sm"
              label={`${cityOf(zone)} ${timeIn(zone)}`}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="dep-offset">{dayOf(zone)} · {offsetOf(zone)}</span>
              <button
                className="icon-btn"
                onClick={() => removeZone(zone)}
                aria-label={`Remove ${cityOf(zone)}`}
                title={`Remove ${cityOf(zone)}`}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </Board>
  )
}
