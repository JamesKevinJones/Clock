import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Clock from './pages/Clock'
import World from './pages/World'
import Stopwatch from './pages/Stopwatch'
import Timer from './pages/Timer'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Clock />} />
      <Route path="/world" element={<World />} />
      <Route path="/stopwatch" element={<Stopwatch />} />
      <Route path="/timer" element={<Timer />} />
      {/* Anything else lands on the clock rather than a blank cabinet. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

export default App
