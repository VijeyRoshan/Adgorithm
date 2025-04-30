import React, { useState, useEffect } from 'react';
import '../styles/adslideshow.css';
import { useLocation, useNavigate } from 'react-router-dom';

const getAgeRange = (ageGroup) => {
  if (ageGroup.includes("Child")) return "0-12";
  if (ageGroup.includes("Teenager")) return "13-19";
  if (ageGroup.includes("Young Adult")) return "20-34";
  if (ageGroup.includes("Middle-aged")) return "35-49";
  return "50+";
};

const validateImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

const AdSlideshow = () => {
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { ageGroup, gender } = location.state || {};
  const feedbackQRUrl = "https://adgorithmbucket-2025-new.s3.ap-south-1.amazonaws.com/form.png";

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const baseUrl = "https://adgorithmbucket-2025-new.s3.ap-south-1.amazonaws.com";
        const genderFolder = gender === "Woman" ? "Woman" : "Man";
        const ageRange = getAgeRange(ageGroup);
        const imageFormats = ['jpg', 'png', 'jpeg'];
        const urls = [];

        for (let i = 1; i <= 5; i++) {
          for (let format of imageFormats) {
            const adUrl = `${baseUrl}/${genderFolder}/${ageRange}/ad${i}.${format}`;
            const qrUrl = `${baseUrl}/${genderFolder}/qr/${ageRange}/ad${i}.png`;
            const isValidAd = await validateImage(adUrl);
            const isValidQR = await validateImage(qrUrl);

            if (isValidAd) {
              urls.push({
                src: adUrl,
                qrSrc: isValidQR ? qrUrl : null,
                link: `https://example.com/ad${i}`
              });
              break;
            }
          }
        }

        if (urls.length === 0) {
          urls.push({
            src: "https://via.placeholder.com/800x600?text=No+Ads+Available",
            qrSrc: null,
            link: "#"
          });
        }

        setAds(urls);
      } catch (err) {
        console.error(err);
        setAds([{
          src: "https://via.placeholder.com/800x600?text=Error+Loading+Ads",
          qrSrc: null,
          link: "#"
        }]);
      }
    };

    if (ageGroup && gender) {
      fetchAds();
    }
  }, [ageGroup, gender]);

  useEffect(() => {
    if (ads.length === 0 || showFeedback) return;

    const timer = setInterval(() => {
      setCurrentAdIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= ads.length) {
          setShowFeedback(true);
          clearInterval(timer);
          return prevIndex;
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [ads, showFeedback]);

  useEffect(() => {
    if (showFeedback) {
      const redirectTimer = setTimeout(() => {
        navigate('/');
      }, 10000);

      return () => clearTimeout(redirectTimer);
    }
  }, [showFeedback, navigate]);

  if (ads.length === 0) {
    return <div className="loading-text">Loading ads...</div>;
  }

  return (
    <div className="ad-wrapper" style={{ backgroundColor: "#0c1027", color: "#fff" }}>
      <div className="ad-slideshow">
        <div className="slideshow-container">
          {showFeedback ? (
            <div className="feedback-container" style={{ backgroundColor: "#1b2047", padding: "40px", borderRadius: "10px" }}>
              <img src={feedbackQRUrl} alt="Feedback QR" className="feedback-qr" style={{ width: "200px", height: "200px" }} />
              <p className="feedback-text" style={{ fontSize: "18px", marginTop: "20px" }}>
                Scan the QR code to share your thoughts!
              </p>
            </div>
          ) : (
            <>
              <a href={ads[currentAdIndex].link} target="_blank" rel="noopener noreferrer">
                <img
                  src={ads[currentAdIndex].src}
                  alt={`Ad ${currentAdIndex + 1}`}
                  className="slide-image"
                />
              </a>
              {ads[currentAdIndex].qrSrc && (
                <img
                  src={ads[currentAdIndex].qrSrc}
                  alt={`QR for Ad ${currentAdIndex + 1}`}
                  className="qr-image"
                  style={{ width: "100px", height: "100px", marginTop: "20px" }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdSlideshow;
