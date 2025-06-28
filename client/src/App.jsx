import ScanImage from './pages/ScanImage'
import WebcamCapture from './pages/WebcamCapture'
import { Route, Routes } from 'react-router-dom'
import ScanResult from './pages/Result'
import Home from './pages/Home'
import ScanResult from './pages/ScanResult'

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/scan-image" element={<ScanImage />} />
          <Route path="/webcam" element={<WebcamCapture />} />
          <Route path="/result" element={<ScanResult/>} />
        </Routes>
      </div>
    </>
  )
}
export default App
