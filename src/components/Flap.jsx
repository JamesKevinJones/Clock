import { useEffect, useRef, useState } from 'react'

const FLIP_MS = 300

/**
 * One split-flap character.
 *
 * The top half shows the incoming value immediately and the bottom half holds
 * the outgoing one, exactly as a mechanical board does: the leaf falls to
 * reveal what is already set behind it.
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
      <span className="flap__half flap__half--top">
        <i className="flap__glyph">{char}</i>
      </span>
      <span className="flap__half flap__half--bottom">
        <i className="flap__glyph">{outgoing}</i>
      </span>

      {flipping && (
        <>
          <span className="flap__anim flap__anim--front">
            <i className="flap__glyph">{outgoing}</i>
          </span>
          <span className="flap__anim flap__anim--back">
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
