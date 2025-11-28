import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Simulator from './pages/Simulator'
import RequestCredit from './pages/RequestCredit'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/request" element={<RequestCredit />} />
      </Routes>
    </>
  )
}

export default App