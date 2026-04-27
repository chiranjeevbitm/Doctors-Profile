# 📋 Doctor in 10 Minutes — Implementation Plan

## 1. Design Mockup Analysis

The Stitch mockup (`doctor_10_mins.png`) shows a **clean, light-mode landing page** for a heatwave-season telemedicine campaign. Key sections identified:

| Section | Description |
|---|---|
| **Neon Header** | "DOCTOR IN 10 MINUTES" neon-glow headline bar |
| **Hero (2-col)** | Left: Community alert badge, large headline, subtext, CTA button + price tag; Right: Phone/smartphone photo with a "15 min response" overlay card |
| **Features Grid** | "Care That Reaches You" — 2-column cards: WhatsApp-First Approach (light) + 42°C Warning (dark navy) |
| **Pricing + Testimonial** | Left: ₹199 transparent fee card with bullet list; Right: Patient testimonial quote card |
| **How to Consult** | Numbered 3-step flow: 1. Send WhatsApp, 2. Secure UPI Payment, 3. Doctor Interaction |
| **Emergency Support** | Amber/grey box with ambulance number 102/108 |
| **Footer** | Dr. Deepak Kumar, Patient Resources links, Contact |

---

## 2. Additional Ideas (Beyond Mockup)

These sections will be added on top of the mockup design:

| # | New Section | Rationale |
|---|---|---|
| A | **Animated countdown / availability timer** | "Dr. Kumar responds in ⏱ 10 min" live timer widget in the hero, increases urgency |
| B | **Specialties we handle remotely** | Icon-chip grid (Fever, Heatstroke, Stomach, BP, Thyroid, Cold/Cough) — sets patient expectations |
| C | **Video vs WhatsApp toggle** | Two modes: "Chat consultation" vs "Video call" — shown as pill tabs inside the CTA area |
| D | **Comparison table** | "Physical Clinic vs. Doctor in 10 Min" — reinforces value proposition |
| E | **Reviews Carousel** | 3 rotating testimonials (Ramesh, Sunita, Rajesh from Muzaffarpur) instead of one static quote |
| F | **FAQ Accordion** | 5 common questions patients will have — reduces drop-off |
| G | **Trust badges row** | IMA Registered · MCI Certified · Secure UPI · 100% Confidential — above the footer |

---

## 3. File Structure Changes

```
FE/src/
├── pages/
│   └── DoctorIn10Mins.jsx         ← NEW PAGE (main file)
├── context/
│   └── LanguageContext.jsx         ← ADD ~40 translation keys (en + hi)
├── App.jsx                         ← ADD route: /doctor-in-10-mins
└── components/
    └── Layout.jsx                  ← ADD nav link for new page
```

---

## 4. Route & Navigation

- **URL**: `/doctor-in-10-mins`
- **Nav label**: `"Doctor in 10 Min"` / `"10 मिनट में डॉक्टर"` (added to both navbar and footer)
- **CTA from Services page**: The "Teleconsultation" service card will link to this new page

---

## 5. Page Sections Breakdown (in order)

### S1 — Hero Section
- **Badge**: "🔴 Muzaffarpur Community Alert" / "मुजफ्फरपुर सामुदायिक अलर्ट"
- **H1**: "Your health can't wait for the weather to cool down." / "आपका स्वास्थ्य मौसम के ठंडा होने का इंतजार नहीं कर सकता।"
- **Sub**: "During this severe heatwave, traveling to a clinic can be dangerous..." / Hindi
- **Primary CTA**: "Start Consultation via WhatsApp →" (opens DrDeeepakWidget) + "₹199 Flat Fee"
- **Right column**: Phone image from assets / generated image + response time card
- **Timer chip**: "⏱ ~10 min avg response"

### S2 — Specialties We Handle
- 6 icon chips: 🌡️ Fever | ☀️ Heatstroke | 🤢 Stomach | ❤️ BP | 🦋 Thyroid | 🤧 Cold/Cough
- Label: "Care That Reaches You Remotely" / "दूर से देखभाल जो आप तक पहुँचे"

### S3 — Feature Cards (from mockup)
- **Card 1** (light): WhatsApp-First Approach
- **Card 2** (dark navy): 42°C+ Warning

### S4 — Consultation Mode Toggle
- Two pill tabs: "💬 WhatsApp Chat" | "📹 Video Call"
- Shows fee, description, and Start button for each

### S5 — Pricing + Testimonial Row
- Left: ₹199 card with 3 bullet checkmarks + "Valid for 3 follow-up days"
- Right: Testimonial carousel (3 quotes, auto-rotating)

### S6 — How to Consult (3 Steps)
- Numbered 1→2→3 vertical flow
- Step 1: Send WhatsApp "Heatwave Care" to number
- Step 2: Secure UPI Payment (GPay/PhonePe/Paytm)
- Step 3: Doctor Interaction — callback or chat review

### S7 — Comparison Table
| Feature | Physical Clinic | Doctor in 10 Min |
|---|---|---|
| Travel required | ✅ Yes | ❌ No |
| Wait time | 30-60 min | ~10 min |
| Fee | ₹300-500 | ₹199 |
| Prescription | Paper | Digital PDF |
| Safe in heatwave | ⚠️ Risk | ✅ Safe |

### S8 — FAQ Accordion
5 questions covering payment, prescription validity, who can use, privacy, follow-ups.

### S9 — Trust Badges
Row of 4 badges: IMA Member · MCI Certified · Secure UPI · HIPAA-style Privacy

### S10 — Emergency Support Box
Red/amber warning box: "If you experience severe chest pain or unconsciousness, go to hospital immediately." + "🚑 Local Ambulance: 102 / 108"

---

## 6. Translation Keys to Add

### English
```
doctorIn10Title, doctorIn10Subtitle, doctorIn10Badge,
heroHeadline, heroSubtext, startConsultation, flatFee,
avgResponse, careReachesYou, careReachesSubtext,
whatsappFirst, whatsappFirstDesc, warningTemp, warningTempDesc,
chatMode, videoMode, transparentFee, feeValidDays,
generalFever, heatstroke, stomachPain, bloodPressure, thyroidCare, coldCough,
howToConsult, step1Title, step1Desc, step2Title, step2Desc, step3Title, step3Desc,
faqTitle, faq1Q, faq1A, faq2Q, faq2A, faq3Q, faq3A, faq4Q, faq4A, faq5Q, faq5A,
trustBadge1, trustBadge2, trustBadge3, trustBadge4,
emergencyTitle, emergencyDesc, ambulanceNumber,
comparisonTitle, physicalClinic, doctorIn10Min,
testimonial1, testimonial1Author, testimonial2, testimonial2Author, testimonial3, testimonial3Author
```

### Hindi (same keys, Hindi values)

---

## 7. Styling Approach

The existing site uses **TailwindCSS** (confirmed by `tailwind.config.js`). The "Doctor in 10 Minutes" page will use:

- **Color palette**: Mix of the existing site's `primary` (blue-900) and new warm/urgency accent (`amber-500` for heatwave elements, `green-500` for WhatsApp CTA)
- **Typography**: Site's existing Tailwind classes + `font-extrabold` headings
- **Animations**: `animate-pulse` for urgency elements, CSS `@keyframes` for timer, smooth transitions on FAQ accordion
- **Mobile-first**: All sections responsive with `md:` breakpoints

---

## 8. Component Architecture

```jsx
// DoctorIn10Mins.jsx
export default function DoctorIn10Mins() {
  // State: activeMode ('chat'|'video'), activeFaq (number), activeTestimonial (0-2)
  // Uses: useLanguage(), DrDeeepakWidget (already mounted in Layout)
  
  return (
    <>
      <HeroSection />         {/* S1 */}
      <SpecialtiesSection />  {/* S2 */}
      <FeatureCards />        {/* S3 */}
      <ModeToggle />          {/* S4 */}
      <PricingTestimonial />  {/* S5 */}
      <HowToConsult />        {/* S6 */}
      <ComparisonTable />     {/* S7 */}
      <FAQSection />          {/* S8 */}
      <TrustBadges />         {/* S9 */}
      <EmergencyBox />        {/* S10 */}
    </>
  );
}
```

---

## 9. Implementation Steps

1. ✅ **Step 1**: Add ~45 translation keys to `LanguageContext.jsx` (en + hi)
2. ✅ **Step 2**: Create `FE/src/pages/DoctorIn10Mins.jsx` with all sections
3. ✅ **Step 3**: Register route in `App.jsx` (`/doctor-in-10-mins`)
4. ✅ **Step 4**: Add nav link in `Layout.jsx` navbar + footer
5. ✅ **Step 5**: Generate hero phone image if needed

---

## 10. Key Design Decisions

- **Light mode** (matches mockup) — the existing site is also light-mode
- **WhatsApp green (#25D366)** used for primary CTA to match brand
- **Heatwave urgency**: Amber/orange accents for warning elements
- **Navy dark card** for the 42°C warning (matches mockup's dark card)
- **Floating DrDeeepakWidget** already mounted globally in Layout — CTA button will call `toggleWA()` or dispatch a custom event to open it
- The widget is already bilingual (Hindi/English in DrDeeepakWidget.jsx)
