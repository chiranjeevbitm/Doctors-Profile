import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import BookButton from '../components/BookButton';

export default function NotFound() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  return (
    <div className="wrap grid min-h-[60vh] place-items-center py-24 text-center">
      <div className="max-w-md">
        <p className="font-head text-[72px] font-black leading-none text-ink/15">404</p>
        <h1 className="mt-2 font-head text-[28px] font-extrabold text-text">
          {hi ? 'यह पन्ना नहीं मिला' : 'That page is not here'}
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-muted">
          {hi ? 'शायद पता बदल गया है। नीचे से आगे बढ़ें।' : 'The address may have changed. Carry on from here.'}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-lg">{hi ? 'होम' : 'Home'}</Link>
          <BookButton size="lg">{hi ? 'अपॉइंटमेंट बुक करें' : 'Book an appointment'}</BookButton>
        </div>
      </div>
    </div>
  );
}
