import React from 'react';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../lib/motion';
import BookButton from '../components/BookButton';

export default function Reserve() {
  const { language } = useLanguage();
  const root = useReveal([language]);
  const hi = language === 'hi';

  const soon = hi
    ? [['पिछली पर्चियाँ', 'अपनी सभी पुरानी पर्चियाँ एक जगह देखें और डाउनलोड करें।'],
       ['जाँच रिपोर्ट', 'लैब रिपोर्ट अपलोड करें और पिछली रीडिंग से तुलना देखें।'],
       ['दवा याद-दिलावा', 'दवा और फ़ॉलो-अप के लिए WhatsApp पर रिमाइंडर।']]
    : [['Past prescriptions', 'Every parchi you have been given, in one place, ready to download.'],
       ['Lab reports', 'Upload a report and see it compared against your earlier readings.'],
       ['Medicine reminders', 'WhatsApp nudges for doses and follow-up visits.']];

  return (
    <div ref={root} className="wrap py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="reveal tag tag-amber mb-5 inline-flex">
          <Icon n="schedule" size={15} />
          {hi ? 'जल्द आ रहा है' : 'Coming soon'}
        </span>
        <h1 className="reveal font-head text-[34px] font-extrabold leading-tight text-text md:text-[46px]" data-d="1">
          {hi ? 'मरीज़ पोर्टल' : 'Patient portal'}
        </h1>
        <p className="reveal mt-4 text-[17px] leading-relaxed text-muted" data-d="2">
          {hi
            ? 'आपका अपना रिकॉर्ड पन्ना — पर्चियाँ, रिपोर्ट और रिमाइंडर एक जगह। तब तक, अपॉइंटमेंट ऑनलाइन बुक कर सकते हैं।'
            : 'Your own record page — prescriptions, reports and reminders in one place. Until it lands, you can still book online.'}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
        {soon.map(([title, body], i) => (
          <div key={title} className="reveal card p-7 text-center" data-d={i + 1}>
            <Icon n={i === 0 ? 'receipt_long' : i === 1 ? 'lab_panel' : 'notifications_active'} size={30} className="mb-4 block text-ink" />
            <h2 className="mb-2 text-[17px] font-bold text-text">{title}</h2>
            <p className="text-[14.5px] leading-relaxed text-muted">{body}</p>
          </div>
        ))}
      </div>

      <div className="reveal mt-12 flex flex-wrap justify-center gap-3" data-d="3">
        <BookButton size="lg">{hi ? 'अभी अपॉइंटमेंट बुक करें' : 'Book an appointment now'}</BookButton>
        <Link to="/" className="btn btn-lg">{hi ? 'होम' : 'Back home'}</Link>
      </div>
    </div>
  );
}
