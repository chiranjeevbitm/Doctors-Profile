// Single source of truth for anything that points outside this site.
// Booking goes to the Arogya Rx public booking page — the one with live slot
// availability and WhatsApp confirmation. /schedule is the doctor's own
// login-gated screen and must never be linked from here.

export const CLINIC_SLUG = 'arogya-clinic';
export const AROGYA_RX_ORIGIN = 'https://arogya-rx-dr-deepak.vercel.app';
export const BOOKING_URL = `${AROGYA_RX_ORIGIN}/book/${CLINIC_SLUG}`;

export const PHONE = '9199943818';
export const PHONE_TEL = '+919199943818';
export const WHATSAPP = '919199943818';

export const MAPS_URL =
  'https://www.google.com/maps/place/Dr+Deepak+kumar/@26.1500074,85.4007174,17z/data=!4m6!3m5!1s0x39ed110057681ebf:0xcc7a1deab9d79035!8m2!3d26.150109!4d85.400502!16s%2Fg%2F11z5t68_qr';

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// Clinic sessions, as the live booking API reports them.
export const SESSIONS = [
  { key: 'morning', from: '06:00', to: '09:00' },
  { key: 'evening', from: '17:00', to: '21:00' },
];

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
