import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdManager.css';

const AdManager = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState({ ad: null, qr: null });
  const [formData, setFormData] = useState({
    ageGroup: '',
    gender: '',
    isActive: true
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get('http://localhost:10000/api/admin/ads');
      setAds(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch ads:', err);
      setLoading(false);
    }
  };

  const handleFileChange = (event, type) => {
    setSelectedFiles(prev => ({
      ...prev,
      [type]: event.target.files[0]
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('adImage', selectedFiles.ad);
    formDataToSend.append('qrImage', selectedFiles.qr);
    formDataToSend.append('ageGroup', formData.ageGroup);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('isActive', formData.isActive);

    try {
      await axios.post('http://localhost:10000/api/admin/ads', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchAds(); // Refresh the ads list
      // Reset form
      setSelectedFiles({ ad: null, qr: null });
      setFormData({
        ageGroup: '',
        gender: '',
        isActive: true
      });
    } catch (err) {
      console.error('Failed to upload ad:', err);
    }
  };

  const toggleAdStatus = async (adId, currentStatus) => {
    try {
      await axios.patch(`http://localhost:10000/api/admin/ads/${adId}`, {
        isActive: !currentStatus
      });
      fetchAds(); // Refresh the ads list
    } catch (err) {
      console.error('Failed to update ad status:', err);
    }
  };

  if (loading) return <div>Loading ads...</div>;

  return (
    <div className="ad-manager-container">
      <h1>Ad Manager</h1>
      
      <div className="upload-section">
        <h2>Upload New Ad</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ad Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'ad')}
              required
            />
          </div>

          <div className="form-group">
            <label>QR Code Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'qr')}
              required
            />
          </div>

          <div className="form-group">
            <label>Age Group:</label>
            <select
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Age Group</option>
              <option value="0-12">Child (0-12)</option>
              <option value="13-19">Teenager (13-19)</option>
              <option value="20-34">Young Adult (20-34)</option>
              <option value="35-49">Middle-aged Adult (35-49)</option>
              <option value="50+">Senior (50+)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              Active
            </label>
          </div>

          <button type="submit">Upload Ad</button>
        </form>
      </div>

      <div className="ads-list">
        <h2>Existing Ads</h2>
        <div className="ads-grid">
          {ads.map(ad => (
            <div key={ad.id} className="ad-card">
              <img src={`http://localhost:10000${ad.imageUrl}`} alt={`Ad ${ad.id}`} className="ad-preview" />
              <div className="ad-info">
                <p>Age Group: {ad.ageGroup}</p>
                <p>Gender: {ad.gender}</p>
                <p>Status: {ad.isActive ? 'Active' : 'Inactive'}</p>
                <button
                  onClick={() => toggleAdStatus(ad.id, ad.isActive)}
                  className={ad.isActive ? 'deactivate' : 'activate'}
                >
                  {ad.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdManager; 