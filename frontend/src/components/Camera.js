import React, { useState, useRef, useEffect } from 'react';
import '../styles/camera.css';

const Camera = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsStreaming(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <div className="camera-page">
      <div className="camera-left">
        <h1>Smart. Ethical. Engaging.</h1>
      </div>
      <div className="camera-right">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="video-element"
          />
          {!isStreaming && (
            <button className="start-button" onClick={startCamera}>
              Start Camera
            </button>
          )}
          {isStreaming && (
            <button className="stop-button" onClick={stopCamera}>
              Stop Camera
            </button>
          )}
        </div>
      </div>
      <div className="footer">
        Adgorithm. All rights reserved.
      </div>
    </div>
  );
};

export default Camera; 