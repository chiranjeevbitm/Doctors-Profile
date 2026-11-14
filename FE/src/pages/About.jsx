import React from 'react';
import Icon from '../components/Icon';
import { useLanguage } from '../context/LanguageContext';
import { useReveal, useTilt } from '../lib/motion';
import BookButton from '../components/BookButton';
import cardImg from '../assets/dr_deepak_kumar_card.webp';
import clinicImg from '../assets/arogya_clinic_front.webp';

export default function About() {
  const { t, language } = useLanguage();
  const root = useReveal([language]);
  const tilt = useTilt(5);
  const hi = language === 'hi';

  const timeline = [
    ['foundation', 'academicCommencement', 'academicCommencementDesc', 'school'],
    ['specializationLabel', 'advancedMedicine', 'advancedMedicineDesc', 'biotech'],
    ['establishment', 'civicLeadership', 'civicLeadershipDesc', 'local_hospital'],
  ];

  return (
    <div ref={root}>
      {/* masthead */}
      <section className="relative overflow-hidden border-b border-line bg-paper py-16 md:py-24">
        <div className="grain pointer-events-none absolute inset-0 opacity-60" />
        <div className="float-slow pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-ink/[0.07] blur-3xl" />
        <div className="wrap relative grid items-center gap-12 md:grid-cols-12">
          <div className="space-y-5 md:col-span-7">
            <p className="reveal eyebrow">{t('aboutSubtitle')}</p>
            <h1 className="reveal font-head text-[36px] font-extrabold leading-[1.1] text-text md:text-[54px]" data-d="1">
              {t('aboutTitle')}
            </h1>
            <p className="reveal max-w-xl text-[17px] leading-relaxed text-muted md:text-[18.5px]" data-d="2">
              <strong className="text-text">{t('drName')}</strong> {t('aboutDesc')}
            </p>
            <div className="reveal flex flex-wrap gap-2 pt-2" data-d="3">
              <span className="tag tag-ink">MBBS — SKMCH</span>
              <span className="tag tag-ink">MD — DMCH Darbhanga</span>
              <span className="tag tag-green">IMA Member</span>
            </div>
          </div>
          <div className="reveal reveal-s md:col-span-5" data-d="2">
            <div ref={tilt} className="tilt">
              <div className="tilt-in overflow-hidden rounded-2xl border border-line shadow-lift-lg">
                <img src={cardImg} alt={t('drName')} width="900" height="900" loading="eager" decoding="async" className="aspect-square w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* years + community */}
      <section className="py-20 md:py-24">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <div className="card sticky top-28 p-8">
              <p className="font-head text-[48px] font-black leading-none text-ink">{t('yearsExp')}</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{t('yearsExpDesc')}</p>
            </div>
          </div>
          <div className="space-y-8 md:col-span-8">
            <div className="reveal" data-d="1">
              <h2 className="sec-h mb-4">{t('communityTitle')}</h2>
              <p className="sec-p">{t('communityDesc')}</p>
            </div>
            <ul className="space-y-3">
              {['freeCamps', 'mentorship', 'preventiveHealth'].map((k, i) => (
                <li key={k} className="reveal reveal-l flex items-start gap-3 rounded-lg border border-line bg-paper p-5" data-d={i + 1}>
                  <Icon n="check_circle" size={22} className="mt-0.5 flex-none text-neem" />
                  <span className="text-[15.5px] leading-relaxed text-text">{t(k)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* education */}
      <section className="border-y border-line bg-paper py-20 md:py-24">
        <div className="wrap">
          <h2 className="reveal sec-h mb-10">{t('academicFoundation')}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[['mbbs', 'mbbsCollege', 'mbbsDesc'], ['md', 'mdCollege', 'mdDesc'], ['eliteTraining', null, 'eliteTrainingDesc']].map(([title, college, desc], i) => (
              <article key={title} className="reveal lift-hover card p-7" data-d={i + 1}>
                <Icon n={i === 0 ? 'menu_book' : i === 1 ? 'biotech' : 'workspace_premium'} size={32} className="mb-5 block text-ink" />
                <h3 className="text-[19px] font-bold text-text">{t(title)}</h3>
                {college && <p className="mt-1 text-[14px] font-semibold text-ink">{t(college)}</p>}
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(desc)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="py-20 md:py-24">
        <div className="wrap">
          <div className="reveal mb-12 max-w-2xl">
            <h2 className="sec-h mb-3">{t('milestonesTitle')}</h2>
            <p className="sec-p">{t('milestonesDesc')}</p>
          </div>
          <ol className="relative space-y-5 before:absolute before:left-[27px] before:top-3 before:h-[calc(100%-2rem)] before:w-px before:bg-line md:before:left-[31px]">
            {timeline.map(([label, title, desc, icon], i) => (
              <li key={title} className="reveal reveal-l relative flex gap-5" data-d={i + 1}>
                <span className="relative z-10 grid h-14 w-14 flex-none place-items-center rounded-full border border-line bg-paper shadow-lift md:h-16 md:w-16">
                  <Icon n={icon} size={26} className="text-ink" />
                </span>
                <div className="card flex-1 p-6">
                  <p className="eyebrow mb-1.5">{t(label)}</p>
                  <h3 className="mb-2 text-[19px] font-bold text-text">{t(title)}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{t(desc)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* accreditations + clinic */}
      <section className="border-t border-line bg-paper py-20 md:py-24">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="reveal sec-h mb-8">{t('accreditationsTitle')}</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['imaMember', 'imaDesc', 'verified'], ['boardCertified', 'boardDesc', 'shield_person'], ['excellenceAward', 'awardDesc', 'trophy'], ['fellowship', 'fellowshipDesc', 'school']].map(([t1, t2, icon], i) => (
                <div key={t1} className="reveal lift-hover rounded-lg border border-line bg-desk p-5 text-center" data-d={i + 1}>
                  <Icon n={icon} size={28} className="mb-2 block text-ink" />
                  <p className="text-[15px] font-bold text-text">{t(t1)}</p>
                  <p className="text-[13px] text-muted">{t(t2)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal reveal-r md:col-span-5" data-d="2">
            <div className="overflow-hidden rounded-xl border border-line shadow-lift">
              <img src={clinicImg} alt="Arogya Clinic, Ahiyapur, Muzaffarpur" width="1100" height="733" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
              <div className="bg-desk px-5 py-4">
                <p className="font-head text-[16px] font-bold text-ink-deep">Arogya Clinic</p>
                <p className="text-[13.5px] text-muted">Bada Jagrnath, Shakti Dharmkanta, Ahiyapur, Muzaffarpur</p>
              </div>
            </div>
            <div className="mt-5">
              <BookButton size="lg" className="w-full">{t('bookAppointment')}</BookButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
