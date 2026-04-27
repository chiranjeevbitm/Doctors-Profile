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
- 💬 **Telemedicine Widget** — "Doctor in 10 Minutes" floating widget for instant WhatsApp video consultations.
- 🔒 **Reserve/Dashboard** — Internal page for clinic staff
- 📱 Fully **responsive** layout for mobile, tablet, and desktop

---

## 🗂️ Project Structure

```
Doctors_Profile/
├── .DS_Store                              # macOS metadata (gitignored)
├── .git/                                  # Git version control
├── README.md                              # ← You are here
├── render.yaml                            # Render.com deployment config (Backend)
├── clinic.png                             # Clinic image asset
├── 1983119_eDiploma.pdf                   # Doctor's educational diploma (PDF)
├── 16f3100c-...zuA07I1z3Y3y....webp      # OG / social preview image
│
├── FE/                                    # ── React + Vite Frontend ──────────────
│   ├── .browserslistrc                    # Browser compatibility targets
│   ├── .env                               # 🔐 VITE_EMAILJS_* secrets (not committed)
│   ├── .gitignore                         # FE gitignore rules
│   ├── README.md                          # Vite default readme
│   ├── index.html                         # HTML shell / Vite entry point
│   ├── vite.config.js                     # Vite build & plugin configuration
│   ├── tailwind.config.js                 # Tailwind theme, colors & design tokens
│   ├── postcss.config.js                  # PostCSS (Tailwind + Autoprefixer)
│   ├── eslint.config.js                   # ESLint flat config (React rules)
│   ├── package.json                       # npm scripts & dependencies
│   ├── package-lock.json                  # Exact dependency lockfile
│   │
│   ├── public/                            # Static files served as-is
│   │   ├── favicon.svg                    # Browser tab icon
│   │   └── icons.svg                      # Reusable SVG icon sprite
│   │
│   ├── dist/                              # ⚙️ Production build output (auto-generated)
│   │
│   └── src/
│       ├── main.jsx                       # React DOM render entry point
│       ├── App.jsx                        # BrowserRouter + Routes definition
│       ├── index.css                      # Global styles + Tailwind directives
│       ├── App.css                        # App-level scoped styles
│       │
│       ├── assets/                        # Images & media imported by components
│       │   ├── hero.png                   # Doctor portrait — hero section (primary)
│       │   ├── hero1.png                  # Alternate hero image
│       │   ├── arogya_clinic_front.jpeg   # Clinic exterior photo
│       │   ├── dr_deepak_kumar_card.jpeg  # Doctor visiting card scan
│       │   ├── services_banner.jpeg       # Services page banner image
│       │   ├── react.svg                  # Vite boilerplate asset
│       │   └── vite.svg                   # Vite boilerplate asset
│       │
│       ├── components/                    # Shared / reusable UI components
│       │   ├── Layout.jsx                 # Global shell: Navbar + Footer + WhatsApp
│       │   └── WhatsAppButton.jsx         # 💬 Floating WhatsApp contact button
│       │
│       └── pages/                         # Route-level page components
│           ├── Home.jsx                   # Landing page (hero, services CTA)
│           ├── About.jsx                  # Doctor bio, qualifications & philosophy
│           ├── Services.jsx               # Detailed medical services cards
│           ├── Appointments.jsx           # EmailJS-powered patient booking form
│           └── Reserve.jsx                # Internal clinic dashboard (staff only)
│
├── BE/                                    # ── FastAPI Backend ──────────────────────
│   ├── .env                               # 🔐 Backend secrets (not committed)
│   ├── .gitignore                         # BE gitignore rules
│   ├── main.py                            # FastAPI app entry + CORS middleware config
│   ├── config.py                          # Pydantic BaseSettings (loads .env vars)
│   ├── requirements.txt                   # Python package dependencies
│   │
│   ├── .venv/                             # Python virtual environment (not committed)
│   │
│   ├── routers/                           # FastAPI APIRouter modules
│   │   ├── __init__.py                    # Package init
│   │   └── appointments.py                # POST /appointments route (legacy SMTP)
│   │
│   ├── services/                          # Business logic & helper services
│   │   ├── __init__.py                    # Package init
│   │   └── email_service.py               # Gmail SMTP email sender (legacy logic)
│   │
│   └── __pycache__/                       # Python bytecode cache (auto-generated)
│
└── stitch/                                # ── Stitch AI Design Exports ─────────────
    ├── home_page/
    │   ├── code.html                      # AI-generated HTML mockup for Home
    │   └── screen.png                     # Design preview screenshot
    ├── about_dr._kumar/
    │   ├── code.html                      # AI-generated HTML mockup for About
    │   └── screen.png                     # Design preview screenshot
    ├── medical_services/
    │   ├── code.html                      # AI-generated HTML mockup for Services
    │   └── screen.png                     # Design preview screenshot
    ├── book_appointment/
    │   ├── code.html                      # AI-generated HTML mockup for Appointments
    │   └── screen.png                     # Design preview screenshot
    └── kumar_clinical_reserve/
        └── DESIGN.md                      # Design spec & notes for Reserve dashboard
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
| **Material Symbols** | Icons (Google Fonts CDN) |

### Backend (`/BE`)

| Technology | Purpose |
|------------|---------|
| **FastAPI** | REST API framework |
| **Uvicorn** | ASGI server (development) |
| **Gunicorn + UvicornWorker** | Production server (Render.com) |
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

> **Legacy:** The BE still contains `routers/appointments.py` and `services/email_service.py` from the original Gmail SMTP implementation, preserved for reference.

---

## 💬 WhatsApp Integration & Telemedicine

The application features a deeply integrated **"Doctor in 10 Minutes"** telemedicine widget (`DoctorIn10Widget.jsx`) floating on every page:

1. **Instant Chat**: Patients can select their symptoms (e.g., Fever, Stomach Pain).
2. **Payment Handoff**: Displays a ₹199 consultation fee with the clinic's UPI ID.
3. **Deep Linking**: Clicking the "Send Screenshot" button redirects the patient directly to the Doctor's native WhatsApp app (`wa.me`) with a pre-filled message detailing their symptoms.
4. **Video Call**: The doctor verifies the UPI screenshot on WhatsApp and initiates a native WhatsApp video call, removing the need for complex external video SDKs.

**Component:** `FE/src/components/DoctorIn10Widget.jsx`

---

## 🌍 Deployment

### Frontend → Vercel

```bash
cd FE
npm run build       # generates /dist
# Push to GitHub → Vercel auto-deploys
```

Vercel auto-deploys on every push to `main`.

### Backend → Render

Configured via `render.yaml` at the project root:

```yaml
services:
  - type: web
    name: arogya-clinic-be
    env: python
    rootDir: BE
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn -k uvicorn.workers.UvicornWorker main:app
    envVars:
      - key: PYTHON_VERSION
        value: "3.12.0"
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
