import { useEffect, useRef, useState } from 'react'

const FLIP_MS = 220

/**
 * One split-flap character.
 *
 * The resting layer always shows the current character in full, so the value
 * is readable at every moment. The two leaves are transient and sit on top:
 * the outgoing character's upper half falls, then the incoming character's
 * lower half swings up. If the animation is interrupted or skipped, the face
 * underneath is still correct.
 */
export function Flap({ char }) {
  const [outgoing, setOutgoing] = useState(char)
  const [flipping, setFlipping] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (char === outgoing) return

    setFlipping(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setOutgoing(char)
      setFlipping(false)
    }, FLIP_MS)

    return () => clearTimeout(timer.current)
  }, [char, outgoing])

  return (
    <span className="flap" aria-hidden="true">
      <span className="flap__face">{char}</span>
      <span className="flap__fold" />

      {flipping && (
        <>
          <span className="flap__leaf flap__leaf--top">
            <i className="flap__glyph">{outgoing}</i>
          </span>
          <span className="flap__leaf flap__leaf--bottom">
            <i className="flap__glyph">{char}</i>
          </span>
        </>
      )}
    </span>
  )
}

/**
 * A run of flaps for a string like "09:41:23".
 * Separators are rendered static — only values that change flip.
 */
export function FlapText({ value, size = 'lg', label }) {
  const chars = String(value).split('')

  return (
    <div className={`flaps flaps--${size}`} role="text" aria-label={label ?? value}>
      {chars.map((char, i) => {
        if (/[0-9A-Za-z]/.test(char)) return <Flap key={i} char={char} />
        if (char === ' ') return <span key={i} className="flap-space" aria-hidden="true" />
        return <span key={i} className="flap-sep" aria-hidden="true">{char}</span>
      })}
    </div>
  )
}

export default FlapText
