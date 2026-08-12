import { NavLink } from 'react-router-dom'

const SECTIONS = [
  { name: 'Clock', to: '/' },
  { name: 'World', to: '/world' },
  { name: 'Stopwatch', to: '/stopwatch' },
  { name: 'Timer', to: '/timer' },
]

/**
 * The cabinet every screen lives inside. The board is the product — pages
 * change what is displayed on it, not the frame around it.
 */
export default function Board({ eyebrow, children }) {
  return (
    <div className="shell">
      <div className="cabinet">
        <header className="board-head">
          <h1 className="wordmark">Digi<span>·</span>log</h1>
          <p className="head-meta">Split-flap time board</p>
        </header>

        <nav className="nav" aria-label="Sections">
          {SECTIONS.map((section) => (
            <NavLink key={section.to} to={section.to} end={section.to === '/'}>
              {section.name}
            </NavLink>
          ))}
        </nav>

        <main className="stage">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {children}
        </main>
      </div>
    </div>
  )
}
