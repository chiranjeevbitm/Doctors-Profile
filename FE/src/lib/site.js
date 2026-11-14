// Single source of truth for anything that points outside this site, and for
// the clinic's name, address, phone and hours (NAP). Every page, the JSON-LD,
// sitemap and llms.txt read from here, so the details can never drift apart.
// No imports: the build-time prerender script loads this file in plain Node.
//
// Booking goes to the Arogya Rx public booking page — the one with live slot
// availability and WhatsApp confirmation. /schedule is the doctor's own
// login-gated screen and must never be linked from here.

export const SITE_URL = 'https://doctors-profile-chi.vercel.app';

export const CLINIC_SLUG = 'arogya-clinic';
export const AROGYA_RX_ORIGIN = 'https://arogya-rx-dr-deepak.vercel.app';
export const BOOKING_URL = `${AROGYA_RX_ORIGIN}/book/${CLINIC_SLUG}`;

export const PHONE = '9199943818';
export const PHONE_TEL = '+919199943818';
export const WHATSAPP = '919199943818';

// One name for the doctor-and-clinic listing, everywhere. Google's format for a
// solo practitioner who shares a listing with the practice is
// "[practice]: [practitioner]". Use exactly this on Google Business Profile,
// Justdial, Practo, Medindia and the JSON-LD.
export const LISTING_NAME = 'Arogya Clinic: Dr. Deepak Kumar';
export const DOCTOR_NAME = 'Dr. Deepak Kumar';
export const DOCTOR_NAME_HI = 'डॉ. दीपक कुमार';
export const CLINIC_NAME = 'Arogya Clinic';
export const CLINIC_NAME_HI = 'आरोग्य क्लिनिक';
export const QUALIFICATIONS = 'MBBS (SKMCH Muzaffarpur), MD General Medicine (DMCH Darbhanga)';
export const REG_NO = 'BCMR50223';

// Spelled exactly as the live Arogya Rx clinic settings spell it.
export const ADDRESS = {
  street: 'Bada Jagarnath, Shakti Dharmkanta, Ahiyapur',
  locality: 'Muzaffarpur',
  region: 'Bihar',
  postalCode: '842001',
  country: 'IN',
};
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`;
export const ADDRESS_HI = 'बड़ा जगरनाथ, शक्ति धर्मकांटा, अहियापुर, मुज़फ़्फ़रपुर, बिहार 842001';
export const GEO = { lat: 26.150109, lng: 85.400502 };

// The Google Business Profile, addressed by its permanent CID. This is the
// "real" Maps link for structured data: it never expires, unlike share links.
export const GOOGLE_PROFILE_URL = 'https://maps.google.com/?cid=14734122024873463861';
export const MAPS_URL = GOOGLE_PROFILE_URL;

// Profiles that are definitely this doctor/clinic. Only verified URLs go here;
// empty strings are skipped. Fill these in once confirmed.
export const SAME_AS = [
  GOOGLE_PROFILE_URL,
  '', // LinkedIn profile URL
  '', // Facebook page URL
].filter(Boolean);

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// Clinic sessions, as the live booking API reports them. Open every day.
export const SESSIONS = [
  { key: 'morning', from: '06:00', to: '09:00', en: '6:00–9:00 am', hi: 'सुबह 6–9 बजे' },
  { key: 'evening', from: '17:00', to: '21:00', en: '5:00–9:00 pm', hi: 'शाम 5–9 बजे' },
];
export const HOURS_EN = `Every day, morning ${SESSIONS[0].en} and evening ${SESSIONS[1].en}`;
export const HOURS_HI = `रोज़, ${SESSIONS[0].hi} और ${SESSIONS[1].hi}`;

// True while the clinic is open, in IST, regardless of the visitor's timezone.
export function clinicOpenNow(now = new Date()) {
  const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const mins = ist.getHours() * 60 + ist.getMinutes();
  return SESSIONS.some(({ from, to }) => {
    const [fh, fm] = from.split(':').map(Number);
    const [th, tm] = to.split(':').map(Number);
    return mins >= fh * 60 + fm && mins < th * 60 + tm;
  });
}
