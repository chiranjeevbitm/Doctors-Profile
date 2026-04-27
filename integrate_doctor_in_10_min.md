# "Doctor in 10 Minutes" Telemedicine Integration Plan

This document outlines the end-to-end architecture, technical implementation steps, and open-source alternatives required to fully integrate the **"Doctor in 10 Minutes"** WhatsApp-style telemedicine workflow into the existing `Doctor_Profile` React application.

---

## 1. System Architecture Overview

The system requires real-time, bi-directional communication between the **Patient Widget** and the **Doctor Dashboard**, bridged by a backend capable of handling WebSocket connections, video room creation, and payment verifications.

### High-Level Flow
1. **Patient Initiation**: Patient opens the floating WhatsApp-style widget, selects a concern, and starts the chat.
2. **Payment Collection**: Patient pays a ₹199 fee (via UPI/Razorpay) and submits proof.
3. **Doctor Approval**: Doctor receives a push notification on their PWA dashboard, reviews the case, and hits "Approve & Call".
4. **Video Consultation**: A secure video room is instantly generated. Patient is notified to join.
5. **Post-Consultation**: Call ends, doctor sends an e-prescription (PDF) to the chat, and the session is archived.

---

## 2. Frontend Implementation (React/Vite)

### A. Patient Widget
*   **Component**: `<WhatsAppWidget />` (Floating bottom-right).
*   **State Management**: `useState` and `useReducer` to handle the multi-step form logic (Chat → Payment → Waiting → Video Call).
*   **Real-time Updates**: Supabase Realtime client (`@supabase/supabase-js`) to listen for status changes (e.g., `status === 'approved'`).
*   **Styling**: Tailwind CSS (extending existing design system tokens for `--wa` green colors).

### B. Doctor Dashboard
*   **Component**: Protected route (`/doctor/dashboard`).
*   **Features**:
    *   List view of incoming requests sorted by timestamp/urgency.
    *   Approval button to trigger backend video room creation.
    *   Push notification listener (Service Worker) using the **Web Push API**.

---

## 3. Backend Implementation (Node.js/Serverless)

Since the project is already utilizing Vercel, the backend should leverage **Vercel Serverless Functions** (`/api/*`) and a robust BaaS (Backend-as-a-Service).

### Recommended Stack: Supabase (Open-Source Firebase Alternative)
Supabase provides the entire backend infrastructure needed for this feature on its free tier:
*   **Database (PostgreSQL)**: To store `Consultations` (patient info, status, symptoms, payment_proof_url).
*   **Realtime**: WebSocket API to sync the `status` column between doctor and patient instantly.
*   **Storage**: S3-compatible buckets for securely storing payment screenshots and e-prescriptions.
*   **Auth**: Secure the Doctor Dashboard route.

*Open-Source Alternative*: Appwrite (Self-hosted via Docker).

---

## 4. Video Calling Integration Options

To avoid the complexity of building WebRTC from scratch, we will embed a pre-built video conferencing platform.

### Option A: Jitsi Meet (100% Free & Open-Source)
*   **How it works**: Embed Jitsi Meet via `<iframe>` directly inside the WhatsApp widget window.
*   **Cost**: Free (if using public meet.jit.si) or ~$6/mo if self-hosted on a DigitalOcean droplet.
*   **Pros**: No limits on minutes or participants, high privacy.
*   **Cons**: Customization is slightly more rigid than dedicated SDKs.

### Option B: Daily.co / 100ms.live (Generous Free Tiers)
*   **How it works**: Install their React SDK (`@100mslive/react-sdk`) to build a completely custom video UI matching the clinic's branding.
*   **Cost**: 10,000 free participant-minutes per month.
*   **Pros**: Extremely reliable, built-in recording capabilities, easy React hooks.

---

## 5. Payment Verification Options

### Phase 1: Manual UPI (Fastest to Market)
*   **Workflow**: Show static UPI QR code in the chat. Patient scans, pays via PhonePe/GPay, and uploads a screenshot.
*   **Backend**: Screenshot saved to Supabase Storage. Doctor manually verifies the screenshot on the dashboard before hitting "Approve".
*   **Cost**: ₹0 processing fees.

### Phase 2: Razorpay Payment Links (Fully Automated)
*   **Workflow**: Backend generates a Razorpay payment link. Patient clicks and pays.
*   **Backend**: Razorpay Webhook triggers a Vercel Serverless Function, which automatically updates the Supabase record to `paid: true`.
*   **Cost**: ~2% transaction fee.

---

## 6. Step-by-Step Implementation Timeline

### Phase 1: Foundation (Days 1-3)
1.  Initialize Supabase project. Define `Consultations` table.
2.  Build the `<WhatsAppWidget />` UI in React (Steps 1 & 2: Chat and Payment info).
3.  Implement Supabase Storage upload for screenshots.

### Phase 2: Doctor Dashboard & Real-time (Days 4-6)
1.  Build the protected `/doctor/dashboard` route.
2.  Implement `supabase.channel('public:consultations').on('INSERT', ...)` to display new requests to the doctor instantly.
3.  Add "Approve" button logic to update row status.
4.  Configure the widget to listen for status updates and transition to Step 3 (Approved).

### Phase 3: Video Call & Polish (Days 7-10)
1.  Integrate Jitsi `<iframe>` or Daily.co SDK into Step 4 of the widget.
2.  Implement Web Push API to send a browser notification to the doctor when a new request arrives.
3.  Add end-call routing and a mock "Prescription generation" state.

---

## 7. Out-of-the-Box Growth Ideas (Post-Launch)
*   **AI Triage Bot**: Integrate Gemini or OpenAI API to auto-classify symptoms (Mild, Moderate, Emergency) before the doctor even reads the message.
*   **Family Health Wallet**: Allow patients to pre-purchase "5 Consultations for ₹799" via an account system.
*   **Automated WhatsApp Follow-ups**: Connect Twilio/WhatsApp Cloud API to automatically send a "How are you feeling today?" message 24 hours after the consultation.
