import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SPECIALTIES = [
  { key: 'doctorIn10Fever',   icon: '🌡️' },
  { key: 'doctorIn10Heat',    icon: '☀️' },
  { key: 'doctorIn10Stomach', icon: '🤢' },
  { key: 'doctorIn10BP',      icon: '❤️' },
  { key: 'doctorIn10Thyroid', icon: '🦋' },
  { key: 'doctorIn10Cold',    icon: '🤧' },
];

const FAQS = [
  ['doctorIn10FAQ1Q', 'doctorIn10FAQ1A'],
  ['doctorIn10FAQ2Q', 'doctorIn10FAQ2A'],
  ['doctorIn10FAQ3Q', 'doctorIn10FAQ3A'],
  ['doctorIn10FAQ4Q', 'doctorIn10FAQ4A'],
  ['doctorIn10FAQ5Q', 'doctorIn10FAQ5A'],
];

const TESTIMONIALS = [
  ['doctorIn10Test1', 'doctorIn10Test1Author'],
  ['doctorIn10Test2', 'doctorIn10Test2Author'],
  ['doctorIn10Test3', 'doctorIn10Test3Author'],
];

const COMP_ROWS = [
  ['doctorIn10CompRow1', '✅ हाँ', '❌ नहीं', '✅ Yes', '❌ No'],
  ['doctorIn10CompRow2', '30–60 मिनट', '~10 मिनट', '30–60 min', '~10 min'],
  ['doctorIn10CompRow3', '₹300–500', '₹199', '₹300–500', '₹199'],
  ['doctorIn10CompRow4', 'कागज', 'डिजिटल PDF', 'Paper', 'Digital PDF'],
  ['doctorIn10CompRow5', '⚠️ जोखिम', '✅ सुरक्षित', '⚠️ Risk', '✅ Safe'],
];

const TRUST_BADGES = [
  { key: 'doctorIn10Trust1', icon: '🏥' },
  { key: 'doctorIn10Trust2', icon: '✅' },
  { key: 'doctorIn10Trust3', icon: '🔒' },
  { key: 'doctorIn10Trust4', icon: '🛡️' },
];

function openWidget() {
  const btn = document.getElementById('dr-deepak-widget-launcher');
  if (btn) btn.click();
}

export default function DoctorIn10Mins() {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const [activeMode, setActiveMode] = useState('chat');
  const [activeFaq, setActiveFaq]   = useState(null);
  const [testIdx, setTestIdx]       = useState(0);
  const [timer, setTimer]           = useState(0);

  // Rotating testimonials
  useEffect(() => {
    const id = setInterval(() => setTestIdx(i => (i + 1) % 3), 4000);
    return () => clearInterval(id);
  }, []);

  // Elapsed timer (for "responding now" feel)
  useEffect(() => {
    const id = setInterval(() => setTimer(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

  return (
    <div className="bg-white text-slate-800 font-sans">

      {/* ────────────────────────────────────────────
          HERO
      ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-8 pb-16 md:pt-12 md:pb-24">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-100 rounded-full opacity-40 blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded-full text-sm font-semibold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              {t('doctorIn10Badge')}
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {t('doctorIn10HeroHeadline')}
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
              {t('doctorIn10HeroSub')}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={openWidget}
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb356] text-white font-bold px-7 py-4 rounded-2xl shadow-lg shadow-green-200 transition-all hover:scale-[1.03] active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="white">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                {t('doctorIn10StartCTA')}
              </button>
              <span className="text-slate-500 font-semibold text-sm">{t('doctorIn10FlatFee')}</span>
            </div>
          </div>

          {/* Right — Phone mockup card */}
          <div className="relative flex justify-center">
            <div className="relative w-72 md:w-80">
              {/* Phone frame */}
              <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-[2.5rem] p-4 shadow-2xl">
                <div className="bg-slate-800 rounded-[2rem] overflow-hidden aspect-[9/16] flex flex-col items-center justify-center gap-4 p-6">
                  <div className="text-6xl">📱</div>
                  <div className="text-white text-center">
                    <div className="font-bold text-lg">Dr. Deepak Kumar</div>
                    <div className="text-green-400 text-sm flex items-center justify-center gap-1 mt-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
                      Online · {isHi ? 'उपलब्ध' : 'Available'}
                    </div>
                    <div className="mt-3 text-xs text-slate-400">{fmtTime(timer)}</div>
                  </div>
                </div>
              </div>
              {/* Response card */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">⏱</div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t('doctorIn10AvgResponse')}</div>
                  <div className="text-slate-400 text-xs">{t('doctorIn10ResponseSub')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SPECIALTIES CHIPS
      ──────────────────────────────────────────── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{t('doctorIn10SpecTitle')}</h2>
          <p className="text-slate-500 mb-10">{t('doctorIn10SpecSub')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {SPECIALTIES.map(s => (
              <div key={s.key} className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-3 shadow-sm hover:border-green-400 hover:shadow-md transition-all">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-semibold text-slate-700 text-sm">{t(s.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          FEATURE CARDS (from mockup)
      ──────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{t('doctorIn10CareTitle')}</h2>
            <p className="text-slate-500">{t('doctorIn10CareSub')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* WhatsApp card — light */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">💬</div>
              <h3 className="text-xl font-bold text-slate-900">{t('doctorIn10WAFirst')}</h3>
              <p className="text-slate-500 leading-relaxed">{t('doctorIn10WAFirstDesc')}</p>
              <button onClick={openWidget} className="text-[#25D366] font-semibold text-sm hover:underline flex items-center gap-1">
                {t('doctorIn10LearnHow')}
              </button>
            </div>
            {/* 42°C warning card — dark navy */}
            <div className="bg-blue-900 rounded-3xl p-8 space-y-4 text-white hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%"><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white"/></pattern><rect width="100%" height="100%" fill="url(#dots)"/></svg>
              </div>
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-2xl">🌡️</div>
              <h3 className="text-xl font-bold">{t('doctorIn10WarnTemp')}</h3>
              <p className="text-blue-200 leading-relaxed">{t('doctorIn10WarnDesc')}</p>
              <div className="h-1 bg-amber-500 rounded-full w-3/4" />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          CONSULTATION MODE TOGGLE
      ──────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center mb-8">{t('doctorIn10ModeTitle')}</h2>
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white border border-slate-200 rounded-full p-1 flex gap-1 shadow-sm">
              {['chat', 'video'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                    activeMode === mode
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {mode === 'chat' ? t('doctorIn10ChatMode') : t('doctorIn10VideoMode')}
                </button>
              ))}
            </div>
          </div>
          {/* Mode content */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
            <div className="text-5xl mb-4">{activeMode === 'chat' ? '💬' : '📹'}</div>
            <p className="text-slate-600 leading-relaxed max-w-lg mx-auto mb-6">
              {activeMode === 'chat' ? t('doctorIn10ChatDesc') : t('doctorIn10VideoDesc')}
            </p>
            <button
              onClick={openWidget}
              className="bg-[#25D366] hover:bg-[#1fb356] text-white font-bold px-8 py-3 rounded-2xl transition-all hover:scale-[1.03] active:scale-95 shadow-md shadow-green-100"
            >
              {t('doctorIn10StartCTA')} →
            </button>
            <p className="text-slate-400 text-xs mt-3">₹199 · {isHi ? '3 दिन फॉलो-अप' : '3-day follow-up included'}</p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          PRICING + TESTIMONIAL ROW
      ──────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-stretch">
          {/* Fee card */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-5">
            <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">{t('doctorIn10FeeTitle')}</h3>
            <div className="text-5xl font-extrabold text-blue-900">{t('doctorIn10FeeAmount')}</div>
            <p className="text-slate-500 text-sm leading-relaxed">{t('doctorIn10FeeValid')}</p>
            <ul className="space-y-3">
              {['doctorIn10FeeItem1','doctorIn10FeeItem2','doctorIn10FeeItem3'].map(k => (
                <li key={k} className="flex items-center gap-3 text-slate-700 text-sm">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                  {t(k)}
                </li>
              ))}
            </ul>
            <button onClick={openWidget} className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-2xl transition-all">
              {t('doctorIn10StartCTA')} →
            </button>
          </div>

          {/* Testimonial carousel */}
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 flex flex-col justify-between">
            <h3 className="font-bold text-blue-900 uppercase text-xs tracking-widest mb-6">{t('doctorIn10TestTitle')}</h3>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-slate-700 text-base italic leading-relaxed mb-4 transition-all">
                {t(TESTIMONIALS[testIdx][0])}
              </p>
              <p className="text-blue-700 font-semibold text-sm">{t(TESTIMONIALS[testIdx][1])}</p>
            </div>
            {/* Dots */}
            <div className="flex gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestIdx(i)}
                  className={`h-2 rounded-full transition-all ${i === testIdx ? 'w-8 bg-blue-900' : 'w-2 bg-blue-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          HOW TO CONSULT (3 steps)
      ──────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center mb-12">{t('doctorIn10HowTitle')}</h2>
          <div className="space-y-6">
            {[
              { n: '1', tKey: 'doctorIn10Step1Title', dKey: 'doctorIn10Step1Desc', color: 'bg-blue-900' },
              { n: '2', tKey: 'doctorIn10Step2Title', dKey: 'doctorIn10Step2Desc', color: 'bg-[#25D366]' },
              { n: '3', tKey: 'doctorIn10Step3Title', dKey: 'doctorIn10Step3Desc', color: 'bg-amber-500' },
            ].map(step => (
              <div key={step.n} className="flex gap-5 items-start bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`${step.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg flex-shrink-0`}>
                  {step.n}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{t(step.tKey)}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{t(step.dKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          COMPARISON TABLE
      ──────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center mb-10">{t('doctorIn10CompTitle')}</h2>
          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="bg-slate-50 text-left px-6 py-4 font-bold text-slate-600 uppercase text-xs tracking-widest">{t('doctorIn10CompFeature')}</th>
                  <th className="bg-slate-50 text-center px-6 py-4 font-bold text-slate-600 uppercase text-xs tracking-widest">{t('doctorIn10CompClinic')}</th>
                  <th className="bg-blue-900 text-center px-6 py-4 font-bold text-white uppercase text-xs tracking-widest">{t('doctorIn10CompOnline')}</th>
                </tr>
              </thead>
              <tbody>
                {COMP_ROWS.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-4 font-medium text-slate-700 border-t border-slate-100">{t(row[0])}</td>
                    <td className="px-6 py-4 text-center text-slate-500 border-t border-slate-100">{isHi ? row[1] : row[3]}</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600 bg-green-50 border-t border-slate-100">{isHi ? row[2] : row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          FAQ ACCORDION
      ──────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center mb-10">{t('doctorIn10FAQTitle')}</h2>
          <div className="space-y-3">
            {FAQS.map(([qKey, aKey], i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  {t(qKey)}
                  <span className={`text-blue-900 text-xl transition-transform duration-200 ${activeFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-5 text-slate-500 leading-relaxed text-sm border-t border-slate-100 pt-4">
                    {t(aKey)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          TRUST BADGES
      ──────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">{t('doctorIn10TrustTitle')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map(b => (
              <div key={b.key} className="flex flex-col items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-3xl">{b.icon}</span>
                <span className="font-semibold text-slate-700 text-sm">{t(b.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          EMERGENCY BOX
      ──────────────────────────────────────────── */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center space-y-3">
            <h3 className="text-xl font-extrabold text-amber-800">⚠️ {t('doctorIn10Emergency')}</h3>
            <p className="text-amber-700 text-sm leading-relaxed">{t('doctorIn10EmergencyDesc')}</p>
            <div className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-6 py-3 rounded-full text-sm mt-2">
              {t('doctorIn10Ambulance')}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
