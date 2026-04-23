import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import emailjs from '@emailjs/browser';

const TIME_SLOT_LABELS = {
  en: [
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (2 PM - 5 PM)' },
    { value: 'evening', label: 'Evening Clinic (8:30 PM Onwards)' },
    { value: 'teleconsult', label: 'Teleconsultation' },
  ],
  hi: [
    { value: 'morning', label: 'सुबह (9 बजे - 12 बजे)' },
    { value: 'afternoon', label: 'दोपहर (2 बजे - 5 बजे)' },
    { value: 'evening', label: 'शाम का क्लिनिक (8:30 बजे के बाद)' },
    { value: 'teleconsult', label: 'टेलीकंसल्टेशन' },
  ]
};

// ─── EmailJS config (public keys only) ────────────────────────────────────────
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const INITIAL_FORM = {
  full_name: '',
  phone: '',
  email: '',
  preferred_date: '',
  time_slot: 'evening',
  medical_concern: '',
};

export default function Appointments() {
  const { t, language } = useLanguage();
  const timeSlots = TIME_SLOT_LABELS[language] || TIME_SLOT_LABELS.en;

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

    const slotLabel = timeSlots.find((s) => s.value === form.time_slot)?.label || form.time_slot;

    // Template variables — synced with EmailJS template exactly
    const templateParams = {
      name: form.full_name,
      email: form.email || '',
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
      setErrorMsg(language === 'hi' ? 'कुछ गलत हो गया। कृपया पुनः प्रयास करें या सीधे हमें कॉल करें।' : 'Something went wrong. Please try again or call us directly.');
    }
  };

  return (
    <>
      <main className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Panel: Clinic Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h1 className="font-headline text-5xl font-extrabold text-primary leading-tight tracking-tight">{t('appointmentTitle')}</h1>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">{t('drName')} - {t('specialty')}</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-secondary-container p-3 rounded-lg text-on-secondary-container">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">{t('clinicLocation')}</p>
                  <p className="text-on-surface-variant">{t('address')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-tertiary-fixed p-3 rounded-lg text-on-tertiary-fixed">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">{t('phoneNumber')}</p>
                  <p className="text-on-surface-variant">{t('phoneValue')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-secondary-container p-3 rounded-lg text-on-secondary-container">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">{t('operatingHours')}</p>
                  <p className="text-on-surface-variant whitespace-pre-line">{t('hoursValue')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-primary-fixed p-3 rounded-lg text-on-primary-fixed">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">{t('emailAddress')}</p>
                  <p className="text-on-surface-variant">{t('emailValue')}</p>
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
                  {t('availableToday')}
                </span>
                <h2 className="font-headline text-3xl font-bold text-primary">{t('requestAppointment')}</h2>
              </div>

              {/* Success Banner */}
              {status === 'success' && (
                <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 mb-6">
                  <span className="material-symbols-outlined text-green-600 mt-0.5">check_circle</span>
                  <div>
                    <p className="font-bold">{t('appointmentRequested')}</p>
                    <p className="text-sm mt-0.5">{t('appointmentRequestedMsg')}</p>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {status === 'error' && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 mb-6">
                  <span className="material-symbols-outlined text-red-600 mt-0.5">error</span>
                  <div>
                    <p className="font-bold">{t('submissionFailed')}</p>
                    <p className="text-sm mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">{t('fullName')} *</label>
                    <input
                      name="full_name"
                      required
                      value={form.full_name}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all"
                      placeholder={t('namePlaceholder')}
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">{t('phoneNumber')} *</label>
                    <input
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all"
                      placeholder={t('phonePlaceholder')}
                      type="tel"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant px-1">{t('emailAddress')}</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all"
                    placeholder={t('emailPlaceholder')}
                    type="email"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">{t('preferredDate')}</label>
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
                    <label className="text-sm font-semibold text-on-surface-variant px-1">{t('preferredTime')}</label>
                    <select
                      name="time_slot"
                      value={form.time_slot}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant px-1">{t('medicalConcern')}</label>
                  <textarea
                    name="medical_concern"
                    value={form.medical_concern}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all resize-none"
                    placeholder={t('concernPlaceholder')}
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
                        {t('sending')}
                      </>
                    ) : t('sendRequest')}
                  </button>
                  <p className="text-center text-xs text-on-surface-variant mt-4">
                    {t('privacyPolicy')}
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
