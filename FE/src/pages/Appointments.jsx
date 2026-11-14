import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useLanguage } from '../context/LanguageContext';
import { useReveal, useOpenNow } from '../lib/motion';
import Faq from '../components/Faq';
import { FAQ_BOOKING } from '../lib/seo';
import emailjs from '@emailjs/browser';
import BookButton from '../components/BookButton';
import { PHONE, PHONE_TEL, MAPS_URL, BOOKING_URL, ADDRESS, ADDRESS_LINE } from '../lib/site';

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const TIME_SLOTS = {
  en: [
    { value: 'morning', label: 'Morning session (6:00 – 9:00 am)' },
    { value: 'evening', label: 'Evening session (5:00 – 9:00 pm)' },
    { value: 'teleconsult', label: 'Teleconsultation' },
  ],
  hi: [
    { value: 'morning', label: 'सुबह का सत्र (6:00 – 9:00)' },
    { value: 'evening', label: 'शाम का सत्र (5:00 – 9:00)' },
    { value: 'teleconsult', label: 'टेलीकंसल्टेशन' },
  ],
};

const INITIAL = { full_name: '', phone: '', email: '', preferred_date: '', time_slot: 'morning', medical_concern: '' };

export default function Appointments() {
  const { t, language } = useLanguage();
  const root = useReveal([language]);
  const hi = language === 'hi';
  const slots = TIME_SLOTS[language] || TIME_SLOTS.en;
  const openNow = useOpenNow();

  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const slotLabel = slots.find((s) => s.value === form.time_slot)?.label || form.time_slot;
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: form.full_name,
          email: form.email || '',
          patient_name: form.full_name,
          phone: form.phone,
          patient_email: form.email || 'Not provided',
          preferred_date: form.preferred_date || 'Not specified',
          time_slot: slotLabel,
          concern: form.medical_concern || 'Not specified',
          submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        },
        EMAILJS_CONFIG.publicKey
      );
      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      setStatus('error');
      setErrorMsg(hi ? 'कुछ गलत हो गया। कृपया सीधे कॉल करें।' : 'Something went wrong. Please call the clinic directly.');
    }
  };

  const faqs = hi ? FAQ_BOOKING.hi : FAQ_BOOKING.en;

  return (
    <div ref={root}>
      {/* masthead + primary action */}
      <section className="relative overflow-hidden border-b border-line bg-paper py-16 md:py-20">
        <div className="grain pointer-events-none absolute inset-0 opacity-60" />
        <div className="float-slow pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-ink/[0.07] blur-3xl" />
        <div className="wrap relative grid gap-10 md:grid-cols-12">
          <div className="space-y-5 md:col-span-7">
            <span className={`reveal inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ${openNow ? 'bg-neem-soft text-neem' : 'bg-desk-2 text-muted'}`}>
              <span className={`h-2 w-2 rounded-full ${openNow ? 'bg-neem' : 'bg-faint'}`} />
              {openNow === null ? (hi ? 'रोज़ खुला: सुबह 6–9 · शाम 5–9' : 'Open every day: 6–9 am · 5–9 pm') : openNow ? (hi ? 'अभी खुला है' : 'Open right now') : (hi ? 'अभी बंद है' : 'Closed right now')}
            </span>
            <h1 className="reveal font-head text-[36px] font-extrabold leading-[1.1] text-text md:text-[52px]" data-d="1">
              {t('appointmentTitle')}
            </h1>
            <p className="reveal max-w-xl text-[17px] leading-relaxed text-muted md:text-[18.5px]" data-d="2">
              {hi
                ? 'लाइव स्लॉट देखें और सेकंडों में अपना समय पक्का करें। पुष्टि सीधे WhatsApp पर।'
                : 'See live slots and lock your time in seconds. Confirmation comes straight to your WhatsApp.'}
            </p>
            <div className="reveal flex flex-wrap gap-3 pt-1" data-d="3">
              <BookButton size="lg">{t('bookAppointment')}</BookButton>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-lg">
                <Icon n="call" size={20} />{PHONE}
              </a>
            </div>
            <p className="reveal text-[13.5px] text-faint" data-d="4">
              {hi ? 'बुकिंग पेज: ' : 'Booking runs on '}
              <a className="font-medium text-ink hover:underline" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Arogya Rx</a>
            </p>
          </div>

          <div className="reveal reveal-r md:col-span-5" data-d="2">
            <div className="card divide-y divide-line overflow-hidden">
              {[
                ['location_on', t('clinicLocation'), ADDRESS_LINE, MAPS_URL],
                ['call', t('phoneNumber'), PHONE, `tel:${PHONE_TEL}`],
                ['schedule', t('operatingHours'), hi ? 'सुबह 6:00–9:00 · शाम 5:00–9:00' : 'Morning 6:00–9:00 am · Evening 5:00–9:00 pm', null],
                ['mail', t('emailAddress'), t('emailValue'), `mailto:${t('emailValue')}`],
              ].map(([icon, label, value, href]) => (
                <div key={label} className="flex gap-4 p-5">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-sm bg-ink-soft">
                    <Icon n={icon} size={20} className="text-ink" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold uppercase tracking-wider text-faint">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="break-words text-[15px] font-medium text-text hover:text-ink">{value}</a>
                    ) : (
                      <p className="text-[15px] font-medium text-text">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* callback form — the fallback route for patients who'd rather be rung */}
      <section className="py-20 md:py-24">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <h2 className="sec-h mb-4">{t('requestAppointment')}</h2>
            <p className="sec-p mb-6">
              {hi
                ? 'ऑनलाइन बुकिंग सबसे तेज़ है। अगर आप चाहें कि क्लिनिक आपको कॉल करे, तो यह फ़ॉर्म भरें।'
                : 'Booking online is fastest. If you would rather the clinic called you back, use this form instead.'}
            </p>
            <div className="card bg-ink-tint p-6">
              <p className="mb-3 flex items-center gap-2 text-[15px] font-bold text-ink-deep">
                <Icon n="bolt" size={20} />
                {hi ? 'तुरंत चाहिए?' : 'Need it now?'}
              </p>
              <p className="mb-4 text-[15px] leading-relaxed text-muted">
                {hi ? 'लाइव स्लॉट चुनें और तुरंत पुष्टि पाएँ।' : 'Pick a live slot and get confirmed immediately.'}
              </p>
              <BookButton className="w-full">{t('bookNow')}</BookButton>
            </div>
          </div>

          <div className="reveal reveal-r md:col-span-7" data-d="1">
            {status === 'success' ? (
              <div className="card flex flex-col items-center gap-3 p-12 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-neem-soft">
                  <Icon n="check" size={32} className="text-neem" />
                </span>
                <h3 className="text-[22px] font-bold text-text">{t('appointmentRequested')}</h3>
                <p className="max-w-sm text-[15.5px] text-muted">{t('appointmentRequestedMsg')}</p>
                <button className="btn mt-2" onClick={() => setStatus('idle')}>
                  {hi ? 'एक और अनुरोध भेजें' : 'Send another request'}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="card space-y-5 p-7 md:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-semibold text-muted">{t('fullName')} *</span>
                    <input name="full_name" required minLength={2} value={form.full_name} onChange={change} placeholder={t('namePlaceholder')} autoComplete="name"
                      className="w-full rounded-sm border-line-2 bg-paper px-3.5 py-2.5 text-[15px] focus:border-ink focus:ring-4 focus:ring-ink-soft" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-semibold text-muted">{t('phoneNumber')} *</span>
                    <input name="phone" required type="tel" value={form.phone} onChange={change} placeholder={t('phonePlaceholder')} autoComplete="tel"
                      className="w-full rounded-sm border-line-2 bg-paper px-3.5 py-2.5 text-[15px] focus:border-ink focus:ring-4 focus:ring-ink-soft" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-semibold text-muted">{t('emailAddress')}</span>
                    <input name="email" type="email" value={form.email} onChange={change} placeholder={t('emailPlaceholder')} autoComplete="email"
                      className="w-full rounded-sm border-line-2 bg-paper px-3.5 py-2.5 text-[15px] focus:border-ink focus:ring-4 focus:ring-ink-soft" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-semibold text-muted">{t('preferredDate')}</span>
                    <input name="preferred_date" type="date" value={form.preferred_date} onChange={change}
                      className="w-full rounded-sm border-line-2 bg-paper px-3.5 py-2.5 text-[15px] focus:border-ink focus:ring-4 focus:ring-ink-soft" />
                  </label>
                </div>

                <fieldset>
                  <legend className="mb-2 text-[13px] font-semibold text-muted">{t('preferredTime')}</legend>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {slots.map((s) => (
                      <label key={s.value} className={`cursor-pointer rounded-sm border px-3.5 py-3 text-[14px] font-medium transition-colors ${form.time_slot === s.value ? 'border-ink bg-ink-soft text-ink' : 'border-line-2 bg-paper text-muted hover:border-ink'}`}>
                        <input type="radio" name="time_slot" value={s.value} checked={form.time_slot === s.value} onChange={change} className="sr-only" />
                        {s.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-muted">{t('medicalConcern')}</span>
                  <textarea name="medical_concern" rows={4} value={form.medical_concern} onChange={change} placeholder={t('concernPlaceholder')}
                    className="w-full rounded-sm border-line-2 bg-paper px-3.5 py-2.5 text-[15px] focus:border-ink focus:ring-4 focus:ring-ink-soft" />
                </label>

                {status === 'error' && (
                  <p className="rounded-sm border border-sindoor/30 bg-sindoor-soft px-4 py-3 text-[14.5px] text-sindoor">{errorMsg}</p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <button type="submit" disabled={status === 'loading'} className="btn btn-primary btn-lg disabled:opacity-60">
                    {status === 'loading' ? t('sending') : t('sendRequest')}
                    <Icon n="send" size={20} />
                  </button>
                  <p className="text-[12.5px] text-faint">{t('privacyPolicy')}</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* map */}
      <section className="border-y border-line bg-paper py-16">
        <div className="wrap">
          <h2 className="reveal sec-h mb-6">{t('clinicLocationTitle')}</h2>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="reveal lift-hover group block overflow-hidden rounded-xl border border-line" data-d="1">
            <div className="relative grid gap-0 bg-desk md:grid-cols-12">
              <div className="p-8 md:col-span-5">
                <Icon n="pin_drop" size={32} className="mb-4 block text-ink" />
                <p className="font-head text-[20px] font-bold text-text">Arogya Clinic: Dr. Deepak Kumar</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {ADDRESS.street},<br />{ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-ink group-hover:underline">
                  {hi ? 'Google Maps में खोलें' : 'Open in Google Maps'}
                  <Icon n="open_in_new" size={20} />
                </span>
              </div>
              <div className="relative min-h-[220px] overflow-hidden bg-ink-soft md:col-span-7">
                <div className="grain absolute inset-0 opacity-80" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="relative flex h-5 w-5">
                    <span className="pulse-dot absolute inline-flex h-5 w-5 rounded-full bg-ink/50" />
                    <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-white bg-ink shadow-lift" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24">
        <div className="wrap max-w-3xl">
          <h2 className="reveal sec-h mb-8 text-center">
            {hi ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently asked questions'}
          </h2>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <div key={q} className="reveal" data-d={(i % 5) + 1}>
                <Faq q={q} a={a} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
