import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import History from './components/History'
import ScanWaste from './components/ScanWaste'
import Result from './components/Result'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/scan-waste" element={<ScanWaste />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  )
}

export default App
