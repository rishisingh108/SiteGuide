<div align="center">

# 🏗️ SiteGuide AI

### Next-Gen AI-Powered Construction Management Platform

An AI-driven construction management platform for project planning, cost estimation, and site monitoring — powered by Google Gemini.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-2496ED?style=for-the-badge&logo=vercel&logoColor=white)](https://site-guide-six.vercel.app/)
[![Backend API](https://img.shields.io/badge/Backend%20API-Live-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://siteguide.onrender.com)

</div>

---

## 🌟 Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Copilot** | Context-aware construction assistant powered by Google Gemini AI — ask about building codes, materials, or project delays and get instant, expert-level advice |
| 📊 **Interactive Dashboard** | Real-time visualization of project health, timelines, and resource allocation using dynamic charts |
| 🗺️ **Map Dashboard** | Geographical visualization of site locations with integrated data overlays for multi-site management |
| 💰 **Smart Cost Estimator** | AI-driven cost prediction and tracking to prevent budget overruns |
| 📅 **App Scheduler** | Intelligent scheduling for labor, machinery, and milestones with automated conflict detection |
| 📁 **Project Management** | Centralized hub for managing multiple construction projects and team collaboration |

---

## 🛠️ Tech Stack

**Frontend**
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white) ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)

**Backend**
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)

**AI & Deployment**
![Google Gemini](https://img.shields.io/badge/-Google%20Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white) ![Vercel](https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/-Render-46E3B7?style=flat-square&logo=render&logoColor=white)

---

## 📸 Preview

> _Add a screenshot or screen recording of the dashboard/AI Copilot here for extra impact._

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google AI (Gemini) API Key

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/ThakurRishiSingh1706/SiteGuide.git
cd SiteGuide
```

**2. Backend setup**
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

**3. Frontend setup**
```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:
```env
VITE_API_URL=http://localhost:5000
VITE_API_KEY=your_api_key
```

### Running locally

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
SiteGuide/
├── backend/                # Express API Server
│   ├── middleware/         # Custom middleware (error handling, etc.)
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints (AI, Projects, Analytics)
│   └── server.js            # Entry point
├── frontend/                # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (AI Copilot, Dashboard, etc.)
│   │   └── api/              # API service configuration
│   └── public/               # Static assets
└── README.md
```

---

## 🌐 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | [site-guide-six.vercel.app](https://site-guide-six.vercel.app/) |
| Backend | Render | [siteguide.onrender.com](https://siteguide.onrender.com) |
| Database | MongoDB Atlas | — |

> **Note:** The backend runs on Render's free tier, which spins down after inactivity — the first request after idle time may take up to 50 seconds to respond.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.

---

## 📞 Contact

**Rishi Singh**
[GitHub](https://github.com/rishisingh108) · [LinkedIn](https://www.linkedin.com/in/rishi-singh-064419333) · [rishisingh31102004@gmail.com](mailto:rishisingh31102004@gmail.com)

Project Link: [github.com/ThakurRishiSingh1706/SiteGuide](https://github.com/ThakurRishiSingh1706/SiteGuide)
