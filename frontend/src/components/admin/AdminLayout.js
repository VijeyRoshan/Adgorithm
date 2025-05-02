import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../styles/admin.css';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/ad-manager">Ad Manager</Link>
        </nav>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout; 