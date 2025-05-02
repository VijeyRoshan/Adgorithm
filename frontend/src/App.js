import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CameraCapture from './components/CameraCapture';
import AdSlideshow from './components/AdSlideshow';
import Navbar from './components/Navbar';
import AdminDashboard from './components/admin/AdminDashboard';
import AdManager from './components/admin/AdManager';
import AdminLayout from './components/admin/AdminLayout';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<CameraCapture />} />
        <Route path="/ads" element={<AdSlideshow />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="ad-manager" element={<AdManager />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
