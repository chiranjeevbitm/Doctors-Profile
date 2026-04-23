import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// ─── EmailJS config (public keys only) ────────────────────────────────────────
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const TIME_SLOTS = [
  { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (2 PM - 5 PM)' },
  { value: 'evening', label: 'Evening Clinic (8:30 PM Onwards)' },
  { value: 'teleconsult', label: 'Teleconsultation' },
];

const INITIAL_FORM = {
  full_name: '',
  phone: '',
  email: '',
  preferred_date: '',
  time_slot: 'evening',
  medical_concern: '',
};

export default function Appointments() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const slotLabel = TIME_SLOTS.find((t) => t.value === form.time_slot)?.label || form.time_slot;

    // Template variables — synced with EmailJS template exactly
    const templateParams = {
      // Required by EmailJS template "From Name" and intro text
      name: form.full_name,
      // Required by EmailJS template "Reply To" field
      email: form.email || '',

      // Content variables
      patient_name: form.full_name,
      phone: form.phone,
      patient_email: form.email || 'Not provided',
      preferred_date: form.preferred_date || 'Not specified',
      time_slot: slotLabel,
      concern: form.medical_concern || 'Not specified',
      submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey,
      );
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or call us directly.');
    }
  };

  return (
    <>
      <main className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Panel: Clinic Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h1 className="font-headline text-5xl font-extrabold text-primary leading-tight tracking-tight">Let's prioritize your health.</h1>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">Schedule a consultation with Dr. Deepak Kumar at Arogya Clinic in Muzaffarpur. We're committed to providing you with the highest standard of care.</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-secondary-container p-3 rounded-lg text-on-secondary-container">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Clinic Location</p>
                  <p className="text-on-surface-variant">Saktidharamkata Bada Jagganath, near God Father Public School, 842004</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-tertiary-fixed p-3 rounded-lg text-on-tertiary-fixed">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Phone Number</p>
                  <p className="text-on-surface-variant">919994381893</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-secondary-container p-3 rounded-lg text-on-secondary-container">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Operating Hours</p>
                  <p className="text-on-surface-variant">Morning visit timinig 6:30am to 9am<br />Evening vsit timing 3pm to 6pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-primary-fixed p-3 rounded-lg text-on-primary-fixed">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Email Address</p>
                  <p className="text-on-surface-variant">deepakkumar21121995@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm h-64 relative group">
              <img className="w-full h-full object-cover" alt="Map of Muzaffarpur clinic location" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbhfOZE7-iStuQMCwWuo6V8DTUc24azDU9tv8jRn_AVdTcCQrh3clQoNipvckFb0SeTSm--BJxfQSNipegv0WR7IsuyLEEExh8qNm_EWkU4xwEM4CVxMiIDg34rci0TMu0zcsZGPH6EE7h9wQdzRoohI-tXvy1BFHJNseOrHseUh1q9l2htL-04kxLGEBzEloLIEPgc-P8MUuPGToOWsXm_VEAYrGCHN5-qfY4FcrOXYt1S1c62n6x_n-p-MXsNkVuNmHuUM98sJY" />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-sm border border-outline-variant/10">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-sm font-bold mb-4">
                  Available Today
                </span>
                <h2 className="font-headline text-3xl font-bold text-primary">Request an Appointment</h2>
              </div>

              {/* Success Banner */}
              {status === 'success' && (
                <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 mb-6">
                  <span className="material-symbols-outlined text-green-600 mt-0.5">check_circle</span>
                  <div>
                    <p className="font-bold">Appointment Requested!</p>
                    <p className="text-sm mt-0.5">We've received your request and will contact you shortly to confirm your appointment.</p>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {status === 'error' && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 mb-6">
                  <span className="material-symbols-outlined text-red-600 mt-0.5">error</span>
                  <div>
                    <p className="font-bold">Submission Failed</p>
                    <p className="text-sm mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Full Name *</label>
                    <input
                      name="full_name"
                      required
                      value={form.full_name}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all"
                      placeholder="e.g. Ramesh Kumar"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Phone Number *</label>
                    <input
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all"
                      placeholder="91 00000 00000"
                      type="tel"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant px-1">Email Address</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all"
                    placeholder="your@email.com"
                    type="email"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Preferred Date</label>
                    <input
                      name="preferred_date"
                      value={form.preferred_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all"
                      type="date"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Preferred Time Slot</label>
                    <select
                      name="time_slot"
                      value={form.time_slot}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant px-1">Medical Concern</label>
                  <textarea
                    name="medical_concern"
                    value={form.medical_concern}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all resize-none"
                    placeholder="Briefly describe your health concern..."
                    rows="4"
                  ></textarea>
                </div>
                <div className="pt-4">
                  <button
                    className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold text-lg shadow-md hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    type="submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Request'}
                  </button>
                  <p className="text-center text-xs text-on-surface-variant mt-4">
                    By submitting this form, you agree to our <a className="underline" href="#">Privacy Policy</a>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
