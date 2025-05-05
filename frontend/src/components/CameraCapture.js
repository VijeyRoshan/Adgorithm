import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import "../styles/camera.css";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModelsAndStartCamera = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await startCamera();
      } catch (err) {
        console.error("Error loading face-api models:", err);
      }
    };
    loadModelsAndStartCamera();
  }, []);

  const startCamera = () => {
    return navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
      });
  };

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    setLoading(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("http://127.0.0.1:10000/predict-age-gender", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Predicted:", data.age_group, data.gender);

        if (data.age_group && data.gender) {
          navigate("/ads", { state: { ageGroup: data.age_group, gender: data.gender } });
        }
      } catch (error) {
        console.error("Prediction error:", error);
        setLoading(false);
        setFaceDetected(false);
      }
    }, "image/jpeg");
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (!loading && !faceDetected) {
      interval = setInterval(async () => {
        if (videoRef.current && overlayCanvasRef.current) {
          const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          );

          const overlay = overlayCanvasRef.current;
          const displaySize = {
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight
          };
          faceapi.matchDimensions(overlay, displaySize);

          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          const ctx = overlay.getContext("2d");
          ctx.clearRect(0, 0, overlay.width, overlay.height);
          faceapi.draw.drawDetections(overlay, resizedDetections);

          if (detections.length > 0) {
            setFaceDetected(true);
            captureImage();
          }
        }
      }, 800);
    }

    return () => clearInterval(interval);
  }, [loading, faceDetected, captureImage]);

  return (
    <>
      <div className="camera-page">
      <div className="camera-left">
        <h1>
          Smart.<br /> Ethical. <br />Engaging...
        </h1>
      </div>
      <div className="camera-right">
        <div className="video-wrapper">
          <video ref={videoRef} autoPlay className="webcam-feed" />
          <canvas ref={overlayCanvasRef} className="overlay-canvas" />
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div className="spinner-wrapper" onClick={captureImage}>
          <div className="spinner"></div>
          {loading && <p className="loading-text">Analyzing and getting your ads...</p>}
        </div>
      </div>
    </div>
    <footer style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: '#f4f0fa',
      color: '#222',
      textAlign: 'center',
      padding: '10px 0',
      fontSize: '1rem',
      zIndex: 100
    }}>
      Adgorithm. All rights reserved
    </footer>
    </>
  );
};

export default CameraCapture;
