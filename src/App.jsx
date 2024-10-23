import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Clock from './pages/Clock'
import World from './pages/World'
import Stopwatch from './pages/Stopwatch'
import Timer from './pages/Timer'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Clock />} />
        <Route path="/world" element={<World />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
