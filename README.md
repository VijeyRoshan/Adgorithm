# Adgorithm 🎯

**AI-Powered Age-Based Advertisement Display System**

## 📌 Overview

**Adgorithm** is a smart advertisement platform that personalizes ad content in real time based on the detected age and gender of the viewer. The system uses deep learning for face analysis and delivers the most relevant advertisements from a curated library.

Whether it’s a kid, a teen, an adult, or a senior – Adgorithm ensures your message reaches the right audience at the right time.

---

## 🧠 Core Features

* 🎥 **Real-time Face Detection** using OpenCV
* 🎂 **Age & Gender Prediction** via a pretrained deep learning model (UTKFace-based)
* 📺 **Dynamic Ad Display** tailored to viewer profile
* ☁️ **Ad Storage on AWS S3** for scalable and reliable delivery
* 🧑‍💼 **Admin Panel** to manage ads, track performance, and view demographics
* 🔒 **Local Data Processing** — No images are stored to ensure privacy

---

## 🧑‍💼 Admin Panel Highlights


* 📊 **Analytics Dashboard**: View total ad views, engagement, demographics, and feedback
* 📂 **Ad Manager**: Upload new ads with age & gender targeting
* 📈 **Performance Charts**: Track ad performance over time
* ✅ **S3 Integration**: Uploaded ads are stored securely on AWS S3

## ⚙️ Tech Stack

* **Frontend**: React.js, Tailwind CSS, Recharts
* **Backend**: Python, Flask
* **ML Model**: TensorFlow/Keras (CNN for Age & Gender prediction)
* **Computer Vision**: OpenCV
* **Storage**: AWS S3 (Ad content)
* **Deployment**: Localhost / AWS EC2 (customizable)

---

## 🗂️ Project Structure

```
Adgorithm/
│
├── frontend/                   # React Admin Panel
│   ├── pages/
│   ├── components/
│   └── ...
│
├── backend/
│   ├── app.py                 # Flask backend
│   ├── model/                 # Age-Gender prediction model
│   ├── ads/                   # Ad routing logic
│   └── utils.py
│
├── requirements.txt
└── README.md
```

---

## 🚀 How It Works

1. Camera captures live video feed.
2. OpenCV detects faces and extracts ROIs.
3. The ML model predicts age & gender.
4. An ad matched to the predicted profile is fetched from AWS S3.
5. Data is processed locally; no images are stored.

---

## 🧪 Dataset Used

* **UTKFace Dataset**
  Pretrained CNN model trained to detect age and gender from facial images.

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/VijeyRoshan/Adgorithm.git
cd adgorithm

# Install backend dependencies
pip install -r requirements.txt

# Start backend (Flask)
python backend/app.py

# Start frontend (React)
cd frontend
npm install
npm start
```

---

## 🔒 Data Privacy

> ✅ No images are saved or uploaded.
> ✅ All face data is processed locally.
> ✅ Only ad metadata is stored remotely (on AWS S3).

---

## 📈 Future Enhancements

* Multi-face support with simultaneous ad queuing
* Emotion-aware ad targeting
* Cloud-based analytics dashboard
* Feedback-based ad optimization engine

---

## 🙌 Team

* Vijey Roshan
* Sriram
* Madhesh Kanna
* Jaishree