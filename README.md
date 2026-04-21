# 🏥 Arogya Clinic — Dr. Deepak Kumar's Digital Practice

> A full-stack web presence for **Dr. Deepak Kumar** (MBBS, SKMCH · MD, DMCH), practicing at **Arogya Clinic, Muzaffarpur, Bihar**. Patients can learn about the doctor, explore medical services, book appointments via email, and reach the clinic directly via WhatsApp — all from one clean, modern web app.

---

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/FE-Vercel-000000?logo=vercel)
![Deployed on Render](https://img.shields.io/badge/BE-Render-46E3B7?logo=render)

---

## 🌐 Live Demo

| Layer | URL |
|-------|-----|
| **Frontend** | [doctors-profile-chi.vercel.app](https://doctors-profile-chi.vercel.app) |
| **Backend API** | Deployed on [Render](https://render.com) |
| **API Docs** | `<backend-url>/docs` |

---

## ✨ Features

- 🏠 **Home Page** — Hero section with doctor profile, services overview, and CTA
- 👨‍⚕️ **About Page** — Doctor biography, qualifications, and philosophy of care
- 🩺 **Services Page** — Detailed cards for all specializations (Diabetes, BP, Thyroid, Asthma, COPD, Abdominal diseases)
- 📅 **Appointments Page** — Patient appointment form powered by **EmailJS** (no backend required)
- 💬 **WhatsApp Button** — Floating contact button on every page, opens WhatsApp with a pre-filled appointment message
- 🔒 **Reserve/Dashboard** — Internal page for clinic staff
- 📱 Fully **responsive** layout for mobile, tablet, and desktop

---

## 🗂️ Project Structure

```
Doctors_Profile/
├── render.yaml                  # Render deployment config (Backend)
├── README.md
│
├── FE/                          # ── React + Vite Frontend ──────────────
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env                     # VITE_EMAILJS_* keys
│   ├── package.json
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── App.jsx              # Router setup (BrowserRouter + Routes)
│       ├── index.css            # Global styles
│       ├── App.css
│       ├── assets/
│       │   └── hero.png         # Doctor profile image
│       ├── components/
│       │   ├── Layout.jsx       # Shared navbar + footer + WhatsApp button
│       │   └── WhatsAppButton.jsx  # Floating WhatsApp contact button
│       └── pages/
│           ├── Home.jsx         # Landing page
│           ├── About.jsx        # Doctor bio & qualifications
│           ├── Services.jsx     # Medical services offered
│           ├── Appointments.jsx # EmailJS-powered booking form
│           └── Reserve.jsx      # Internal dashboard
│
└── BE/                          # ── FastAPI Backend ─────────────────────
    ├── main.py                  # FastAPI app entry point + CORS config
    ├── config.py                # Pydantic settings (env vars)
    ├── requirements.txt         # Python dependencies
    ├── .env                     # Backend environment secrets
    ├── .venv/                   # Python virtual environment
    ├── routers/                 # API route modules
    └── services/                # Business logic / helper services
```

---

## 🔩 Tech Stack

### Frontend (`/FE`)

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **React Router DOM 7** | Client-side routing |
| **Tailwind CSS 3** | Utility-first styling |
| **EmailJS** | Client-side email sending (appointment form) |
| **Material Symbols** | Icons (Google Fonts) |

### Backend (`/BE`)

| Technology | Purpose |
|------------|---------|
| **FastAPI** | REST API framework |
| **Uvicorn** | ASGI server (dev) |
| **Gunicorn + UvicornWorker** | Production server (Render) |
| **Pydantic-settings** | Environment variable management |
| **Python 3.12** | Runtime |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18 & npm
- Python ≥ 3.12
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/chiranjeevbitm/Doctors-Profile.git
cd Doctors-Profile
```

---

### 2. Run the Backend

```bash
cd BE

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate        # macOS/Linux
# .venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Start the development server
uvicorn main:app --reload --port 8000
```

✅ Backend running at: **http://127.0.0.1:8000**
📄 Interactive API docs: **http://127.0.0.1:8000/docs**

---

### 3. Run the Frontend

Open a **new terminal tab/window**:

```bash
cd FE

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

---

## ⚙️ Environment Variables

### Frontend (`FE/.env`)

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

> Get these from [EmailJS Dashboard](https://www.emailjs.com/)

### Backend (`BE/.env`)

```env
# Add any backend secrets here (currently minimal — appointments handled by EmailJS)
```

---

## 📬 Appointment System

Appointments are handled **100% on the frontend** using [EmailJS](https://www.emailjs.com/):

- Patient fills the form on the `/appointments` page
- EmailJS sends a formatted email directly to the clinic — **no backend call required**
- This keeps the architecture simple and cost-free for email delivery

---

## 💬 WhatsApp Integration

A floating **WhatsApp button** is embedded on every page:

```
Phone: +91 95465 19953
Pre-filled message: "Hi, I came from your website, I want to book an appointment"
```

Clicking the button opens WhatsApp directly (mobile app or web) with the message pre-filled, so the patient can immediately contact the doctor.

**Component:** `FE/src/components/WhatsAppButton.jsx`

---

## 🌍 Deployment

### Frontend → Vercel

```bash
cd FE
npm run build       # generates /dist
# Deploy /dist to Vercel
```

Vercel auto-deploys on every push to `main`.

### Backend → Render

Configured via `render.yaml`:

```yaml
services:
  - type: web
    name: arogya-clinic-be
    env: python
    rootDir: BE
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn -k uvicorn.workers.UvicornWorker main:app
```

---

## 🩺 Medical Specializations

Dr. Deepak Kumar provides expert care for:

- 🩸 **Diabetes Management** — Type 1 & 2, HbA1c monitoring
- 💉 **Hypertension (BP)** — Long-term medication & lifestyle guidance
- 🦋 **Thyroid Disorders** — Hypothyroidism, Hyperthyroidism (TSH monitoring)
- 🌬️ **Asthma & COPD** — Respiratory care and inhaler therapy
- 🩻 **Abdominal Diseases** — GI conditions, liver & digestive care
- 🏥 **General Consultation** — Routine check-ups & preventive care

---

## 📍 Clinic Location

**Arogya Clinic**
Main Road, Muzaffarpur, Bihar — 842001
📞 +91 74888 78725
🕗 Evening Clinic: **8:30 PM onwards**

---

## 👨‍💻 Developer

Built by **Chiranjeev Kumar** — AI Engineer & Full-Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-chiranjeevbitm-181717?logo=github)](https://github.com/chiranjeevbitm)

---

## 📄 License

This project is private and intended for clinical use by Dr. Deepak Kumar's practice. All rights reserved © 2024.
