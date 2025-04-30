import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ad.css";

const Advertisement = ({ ageGroup, gender }) => {
  const navigate = useNavigate();
  let adMessage = "Welcome!";

  if (ageGroup.includes("Child")) {
    adMessage = gender === "Woman" ? "🌈 Toys for Girls!" : "🚗 Remote Cars & Superheroes!";
  } else if (ageGroup.includes("Teenager")) {
    adMessage = gender === "Woman" ? "👜 Trendy fashion just for teens!" : "🎮 Hot gaming gear is here!";
  } else if (ageGroup.includes("Young Adult")) {
    adMessage = gender === "Woman" ? "💄 Beauty and skincare offers!" : "👔 Stylish outfits for him!";
  } else if (ageGroup.includes("Middle-aged")) {
    adMessage = "🛋️ Home decor, gadgets & more!";
  } else if (ageGroup.includes("Senior")) {
    adMessage = "💊 Health & wellness products for you.";
  }

  const handleClick = () => {
    navigate('/ads', { state: { ageGroup, gender } });
  };

  return (
    <div className="ad-box" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>📢 Targeted Advertisement</h3>
      <p>{adMessage}</p>
      <p className="click-text">Click to view personalized ads →</p>
    </div>
  );
};

export default Advertisement;
