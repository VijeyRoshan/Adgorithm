import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CameraCapture from './components/CameraCapture';
import AdSlideshow from './components/AdSlideshow';
import Navbar from './components/Navbar';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<CameraCapture />} />
        <Route path="/ads" element={<AdSlideshow />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
