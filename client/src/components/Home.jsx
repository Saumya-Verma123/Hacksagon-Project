import React, { useState } from 'react';
import './Home.css';

import Navbar from './Navbar';
import History from './History';
import ScanWaste from './ScanWaste';
import Result from './Result';

import Group48 from '../assets/Group48.svg';
import Group3 from '../assets/Group3.svg';
import RecycleLogo from '../assets/react.svg';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('Home');
  const [scanResult, setScanResult] = useState(null);

  return (
    <div className="app-container flex">
      <Navbar selected={selectedMenu} onSelect={setSelectedMenu} />

      {selectedMenu === 'History' ? (
        <History />
     
      ) : selectedMenu === 'Scan Waste' ? (
        <ScanWaste onResult={setScanResult} />
      ) : selectedMenu === 'Result' ? (
        <Result result={scanResult} />
     
      ) : (
        <div className="landing-page">
          {/* Background Image */}
          <div className="background-skyline">
            <img src={Group48} alt="Skyline Background" className="background-skyline-img" />
          </div>

          {/* Header */}
          <header className="header">
            <img src={RecycleLogo} alt="Recycle Logo" className="logo" />
            <span className="brand-name">RECYCLENS</span>
          </header>

          {/* Hero Section */}
          <main className="main-content">
            <section className="text-section">
              <h1>
                SCAN THE WASTE <br />
                <strong>SAVE THE PLANET</strong>
              </h1>
              <p>Turn Trash into Impact – Detect, Sort & Act</p>
              <div className="buttons">
                <button className="btn upload-btn" onClick={() => setSelectedMenu('Scan Waste')}>
                  Upload Image
                </button>
                <button className="btn know-more-btn">Know More</button>
              </div>
            </section>

            <section className="illustration-section">
              <img src={Group3} alt="Illustration" className="illustration-img" />
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
