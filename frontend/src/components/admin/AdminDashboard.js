import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:10000/api/admin/stats');
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading statistics...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Analytics Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Views</h3>
          <p>{stats.totalViews || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Active Ads</h3>
          <p>46</p>
        </div>
        <div className="stat-card">
          <h3>Total Feedback</h3>
          <p>17</p>
        </div>
      </div>

      <div className="chart-container">
        <h2>Ad Performance Over Time</h2>
        <div className="charts-grid">
          {/* Line Chart */}
          <div className="chart-item">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.timeSeriesData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#8884d8" />
                <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Pie Chart (Gender Distribution) */}
          <div className="chart-item">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.genderDistribution ? Object.entries(stats.genderDistribution).map(([name, value]) => ({ name, value })) : []}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  <Cell key="male" fill="#8884d8" />
                  <Cell key="female" fill="#82ca9d" />
                  {/* Add more colors if you have more genders */}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Stacked Column Chart */}
          <div className="chart-item">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.timeSeriesData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" stackId="a" fill="#8884d8" />
                <Bar dataKey="engagement" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="demographic-stats">
        <h2>Demographic Distribution</h2>
        <div className="demographic-grid">
          <div className="demographic-card">
            <h3>Age Groups</h3>
            {stats.ageDistribution && Object.entries(stats.ageDistribution).map(([age, count]) => (
              <div key={age} className="stat-row">
                <span>{age}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
          <div className="demographic-card">
            <h3>Gender Distribution</h3>
            {stats.genderDistribution && Object.entries(stats.genderDistribution).map(([gender, count]) => (
              <div key={gender} className="stat-row">
                <span>{gender}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 