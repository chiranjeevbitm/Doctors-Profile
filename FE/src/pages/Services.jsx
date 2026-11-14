import React from 'react';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../lib/motion';
import BookButton from '../components/BookButton';
import bannerImg from '../assets/services_banner.webp';

export default function Services() {
  const { t, language } = useLanguage();
  const root = useReveal([language]);
  const hi = language === 'hi';

  const minor = [
    ['endocrineCare', 'endocrineCareDesc', 'endocrinology'],
    ['respiratoryHealth', 'respiratoryHealthDesc', 'pulmonology'],
    ['abdomenDiseases', 'abdomenDiseasesDesc', 'gastroenterology'],
    ['teleconsultation', 'teleconsultationDesc', 'videocam'],
  ];

  return (
    <div ref={root}>
      {/* masthead */}
      <section className="relative overflow-hidden border-b border-line bg-paper py-16 md:py-24">
        <div className="grain pointer-events-none absolute inset-0 opacity-60" />
        <div className="float-slower pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-neem/[0.08] blur-3xl" />
        <div className="wrap relative max-w-3xl">
          <p className="reveal eyebrow mb-3">{t('servicesHeroBadge')}</p>
          <h1 className="reveal font-head text-[36px] font-extrabold leading-[1.1] text-text md:text-[54px]" data-d="1">
            {t('servicesHeroTitle')}
          </h1>
          <p className="reveal mt-5 text-[17px] leading-relaxed text-muted md:text-[18.5px]" data-d="2">
            {t('servicesHeroDesc')}
          </p>
          <div className="reveal mt-7 flex flex-wrap gap-3" data-d="3">
            <BookButton size="lg">{t('scheduleAppt')}</BookButton>
          </div>
        </div>
      </section>

      {/* flagship service */}
      <section className="py-20 md:py-24">
        <div className="wrap">
          <div className="reveal mb-10 max-w-2xl">
            <h2 className="sec-h mb-4">{t('clinicalServices')}</h2>
            <p className="sec-p">{t('clinicalServicesDesc')}</p>
          </div>

          <article className="reveal relative overflow-hidden rounded-2xl bg-ink text-white shadow-ink" data-d="1">
            <div className="grain absolute inset-0 opacity-20" />
            <div className="relative grid gap-0 md:grid-cols-12">
              <div className="p-9 md:col-span-7 md:p-12">
                <Icon n="monitor_heart" size={40} className="mb-6 block" />
                <h3 className="mb-4 font-head text-[26px] font-extrabold leading-snug md:text-[32px]">{t('diabetesBp')}</h3>
                <p className="max-w-lg text-[16px] leading-relaxed text-white/85">{t('diabetesBpDesc')}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {['HbA1c', 'BP charting', 'Lipid profile', 'Diet plan'].map((x) => (
                    <span key={x} className="rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold">{x}</span>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[240px] md:col-span-5">
                <img src={bannerImg} alt="" aria-hidden="true" width="904" height="523" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent md:bg-gradient-to-r" />
              </div>
            </div>
          </article>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {minor.map(([title, desc, icon], i) => (
              <article key={title} className="reveal lift-hover card group p-8 hover:border-ink" data-d={i + 1}>
                <div className="mb-5 grid h-13 w-13 place-items-center rounded-lg bg-ink-soft p-3 transition-transform duration-300 group-hover:scale-110">
                  <Icon n={icon} size={26} className="text-ink" />
                </div>
                <h3 className="mb-2 text-[20px] font-bold text-text">{t(title)}</h3>
                <p className="text-[15.5px] leading-relaxed text-muted">{t(desc)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* partnership */}
      <section className="border-y border-line bg-paper py-20 md:py-24">
        <div className="wrap">
          <h2 className="reveal sec-h mb-10 max-w-2xl">{t('beyondMedicine')}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[['evidenceBased', 'evidenceBasedDesc', 'science'], ['personalizedTouch', 'personalizedTouchDesc', 'diversity_1']].map(([title, desc, icon], i) => (
              <div key={title} className="reveal rounded-lg border border-line bg-desk p-8" data-d={i + 1}>
                <Icon n={icon} size={30} className="mb-4 block text-neem" />
                <h3 className="mb-2 text-[19px] font-bold text-text">{t(title)}</h3>
                <p className="text-[15.5px] leading-relaxed text-muted">{t(desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* what to bring — practical, and the kind of thing patients search for */}
      <section className="py-20 md:py-24">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <h2 className="sec-h mb-4">{hi ? 'अपॉइंटमेंट पर क्या लाएँ' : 'What to bring to your visit'}</h2>
            <p className="sec-p">
              {hi
                ? 'ये चीज़ें साथ लाने से परामर्श तेज़ होता है और दोबारा जाँच कराने की ज़रूरत नहीं पड़ती।'
                : 'Bringing these makes the consultation faster and usually saves you from repeating a test.'}
            </p>
          </div>
          <ul className="grid gap-3 md:col-span-7 md:grid-cols-2">
            {(hi
              ? ['पुरानी पर्चियाँ', 'हाल की जाँच रिपोर्ट', 'चल रही दवाइयों के पत्ते', 'शुगर / BP की डायरी', 'एलर्जी की जानकारी', 'आधार या कोई पहचान पत्र']
              : ['Old prescriptions', 'Recent test reports', 'Current medicine strips', 'Sugar / BP diary', 'Known allergies', 'Aadhaar or any ID']
            ).map((item, i) => (
              <li key={item} className="reveal flex items-center gap-3 rounded-lg border border-line bg-paper px-5 py-4" data-d={(i % 5) + 1}>
                <Icon n="check" size={20} className="flex-none text-ink" />
                <span className="text-[15px] font-medium text-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="wrap">
          <div className="reveal relative overflow-hidden rounded-2xl border border-line bg-paper p-9 md:p-14">
            <div className="float-slow pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-ink/[0.07] blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-lg">
                <h2 className="mb-3 font-head text-[28px] font-extrabold text-text md:text-[36px]">{t('startRecovery')}</h2>
                <p className="text-[16.5px] leading-relaxed text-muted">{t('startRecoveryDesc')}</p>
              </div>
              <div className="flex flex-col gap-3">
                <BookButton size="lg">{t('scheduleAppt')}</BookButton>
                <Link to="/appointments" className="btn">{hi ? 'क्लिनिक की जानकारी' : 'Clinic details'}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
