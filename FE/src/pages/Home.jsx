import React from 'react';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useReveal, useTilt, useCountUp } from '../lib/motion';
import HeroBackdrop from '../components/HeroBackdrop';
import BookButton from '../components/BookButton';
import { PHONE, PHONE_TEL, MAPS_URL, clinicOpenNow } from '../lib/site';
import heroImg from '../assets/hero.webp';
import clinicImg from '../assets/arogya_clinic_front.webp';

const CONDITIONS = [
  'Diabetes', 'Blood Pressure', 'Thyroid', 'Asthma', 'COPD',
  'Abdominal disease', 'Fever', 'Anaemia', 'Lipid disorders', 'Follow-up care',
];

function Stat({ to, suffix, label }) {
  const [n, ref] = useCountUp(to);
  return (
    <div ref={ref}>
      <p className="font-head text-[34px] font-extrabold leading-none text-ink">
        {n}{suffix}
      </p>
      <p className="mt-1.5 text-[13.5px] font-medium text-muted">{label}</p>
    </div>
  );
}

export default function Home() {
  const { t, language } = useLanguage();
  const root = useReveal([language]);
  const tilt = useTilt(6);
  const openNow = clinicOpenNow();
  const hi = language === 'hi';

  return (
    <div ref={root}>
      {/* ───────────────── hero ───────────────── */}
      <section className="relative isolate overflow-hidden pb-20 pt-10 md:pb-28 md:pt-16">
        <HeroBackdrop />

        <div className="wrap relative grid items-center gap-12 md:grid-cols-12">
          <div className="space-y-7 md:col-span-7">
            <div className="reveal flex flex-wrap items-center gap-2.5">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ${openNow ? 'bg-neem-soft text-neem' : 'bg-desk-2 text-muted'}`}>
                <span className="relative flex h-2 w-2">
                  {openNow && <span className="pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-neem" />}
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${openNow ? 'bg-neem' : 'bg-faint'}`} />
                </span>
                {openNow ? (hi ? 'अभी क्लिनिक खुला है' : 'Clinic open now') : (hi ? 'अभी बंद — ऑनलाइन बुक करें' : 'Closed now — book online')}
              </span>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-ink-soft px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white">
                <Icon n="location_on" size={16} />
                {t('location')}
              </a>
            </div>

            <h1 className="reveal" data-d="1">
              <span className="block font-head text-[40px] font-extrabold leading-[1.08] text-text md:text-[62px]">
                {t('drName')}
              </span>
              <span className="mt-2 block font-head text-[22px] font-bold leading-snug text-ink md:text-[30px]">
                {t('tagline')}
              </span>
            </h1>

            <p className="reveal max-w-xl text-[17px] leading-relaxed text-muted md:text-[19px]" data-d="2">
              {t('heroDesc')}
            </p>

            <div className="reveal flex flex-wrap gap-3 pt-1" data-d="3">
              <BookButton size="lg">{t('bookAppointment')}</BookButton>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-lg">
                <Icon n="call" size={20} />
                {PHONE}
              </a>
            </div>

            <div className="reveal grid grid-cols-3 gap-6 border-t border-line pt-7" data-d="4">
              <Stat to={5} suffix="+" label={hi ? 'वर्षों का अनुभव' : 'Years in practice'} />
              <Stat to={10} suffix="k+" label={hi ? 'मरीज़ देखे गए' : 'Patients seen'} />
              <Stat to={2} suffix="" label={hi ? 'रोज़ OPD सत्र' : 'OPD sessions daily'} />
            </div>
          </div>

          {/* portrait card — CSS 3D tilt on desktop pointers */}
          <div className="reveal reveal-s md:col-span-5" data-d="2">
            <div ref={tilt} className="tilt relative">
              <div className="tilt-in relative">
                <div className="relative z-10 overflow-hidden rounded-2xl border border-line bg-paper shadow-lift-lg">
                  <img
                    src={heroImg}
                    alt={`${t('drName')} — MBBS, MD General Medicine, Arogya Clinic Muzaffarpur`}
                    width="697"
                    height="877"
                    fetchPriority="high"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                  <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
                    <div>
                      <p className="font-head text-[16px] font-extrabold text-ink-deep">{t('drName')}</p>
                      <p className="text-[13px] text-muted">MBBS (SKMCH) · MD (DMCH Darbhanga)</p>
                    </div>
                    <span className="tag tag-green">
                      <Icon n="verified" size={15} />
                      IMA
                    </span>
                  </div>
                </div>

                {/* floating credential chip */}
                <div className="float-slow absolute -left-4 top-1/3 z-20 hidden rounded-lg border border-line bg-paper/95 px-4 py-3 shadow-lift backdrop-blur-sm md:block">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-faint">{t('specialization')}</p>
                  <p className="text-[14px] font-bold text-ink">MD General Medicine</p>
                </div>
                <div className="float-slower absolute -bottom-5 -right-3 z-20 hidden rounded-lg border border-line bg-paper/95 px-4 py-3 shadow-lift backdrop-blur-sm md:block">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-faint">Senior Consultant</p>
                  <p className="text-[14px] font-bold text-ink">I T Memorial Hospital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── conditions marquee ───────────── */}
      <section className="overflow-hidden border-y border-line bg-paper py-5">
        <div className="flex select-none whitespace-nowrap">
          <div className="marquee-track flex shrink-0 items-center gap-3 pr-3">
            {[...CONDITIONS, ...CONDITIONS].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full border border-line bg-desk px-4 py-1.5 text-[14px] font-semibold text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── why choose ───────────── */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="reveal mb-12 max-w-2xl">
            <p className="eyebrow mb-3">{hi ? 'क्यों चुनें' : 'Why patients choose us'}</p>
            <h2 className="sec-h mb-4">{t('whyChooseTitle')}</h2>
            <p className="sec-p">{t('whyChooseDesc')}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="reveal lift-hover card group overflow-hidden p-8 md:col-span-2 hover:shadow-lift-lg" data-d="1">
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-lg bg-ink-soft transition-transform duration-300 group-hover:scale-110">
                <Icon n="school" size={28} className="text-ink" />
              </div>
              <h3 className="mb-3 text-[22px] font-bold text-text">{t('academicExcellence')}</h3>
              <p className="text-[16px] leading-relaxed text-muted">{t('academicExcellenceDesc')}</p>
            </article>

            <article className="reveal lift-hover relative overflow-hidden rounded-lg bg-ink p-8 text-white shadow-ink" data-d="2">
              <div className="grain absolute inset-0 opacity-20" />
              <div className="relative">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-lg bg-white/15">
                  <Icon n="favorite" size={28} className="text-white" />
                </div>
                <h3 className="mb-3 text-[22px] font-bold">{t('patientFirst')}</h3>
                <p className="text-[15.5px] leading-relaxed text-white/85">{t('patientFirstDesc')}</p>
              </div>
            </article>

            <article className="reveal lift-hover rounded-lg bg-neem p-8 text-white" data-d="1">
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-lg bg-white/15">
                <Icon n="medical_services" size={28} className="text-white" />
              </div>
              <h3 className="mb-3 text-[22px] font-bold">{t('modernFacility')}</h3>
              <p className="text-[15.5px] leading-relaxed text-white/85">{t('modernFacilityDesc')}</p>
            </article>

            <article className="reveal lift-hover card flex flex-col gap-7 p-8 md:col-span-2 md:flex-row" data-d="2">
              <div className="flex-1">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-lg bg-haldi-soft">
                  <Icon n="verified_user" size={28} className="text-haldi" />
                </div>
                <h3 className="mb-3 text-[22px] font-bold text-text">{t('verifiedExperience')}</h3>
                <p className="text-[16px] leading-relaxed text-muted">{t('verifiedExperienceDesc')}</p>
              </div>
              <div className="h-48 w-full flex-none overflow-hidden rounded bg-desk-2 md:h-auto md:w-56">
                <img src={clinicImg} alt="Arogya Clinic, Ahiyapur, Muzaffarpur" loading="lazy" decoding="async" width="1100" height="733" className="h-full w-full object-cover" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ───────────── services ───────────── */}
      <section className="border-y border-line bg-paper py-20 md:py-28">
        <div className="wrap">
          <div className="reveal mb-12 text-center">
            <p className="eyebrow mb-3">{hi ? 'सेवाएँ' : 'What we treat'}</p>
            <h2 className="sec-h mb-4">{t('coreServicesTitle')}</h2>
            <p className="sec-p mx-auto max-w-2xl">{t('coreServicesDesc')}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['stethoscope', 'generalConsultation', 'generalConsultationDesc'],
              ['vital_signs', 'diagnostics', 'diagnosticsDesc'],
              ['pill', 'chronicCare', 'chronicCareDesc'],
              ['emergency', 'emergencyAdvice', 'emergencyAdviceDesc'],
            ].map(([icon, title, desc], i) => (
              <article key={title} className="reveal lift-hover group rounded-lg border border-line bg-desk p-7 hover:border-ink hover:bg-ink-tint" data-d={i + 1}>
                <Icon n={icon} size={36} className="mb-5 block text-ink transition-transform duration-300 group-hover:-translate-y-0.5" />
                <h3 className="mb-2 text-[18px] font-bold text-text">{t(title)}</h3>
                <p className="text-[14.5px] leading-relaxed text-muted">{t(desc)}</p>
              </article>
            ))}
          </div>

          <div className="reveal mt-10 text-center" data-d="2">
            <Link to="/services" className="inline-flex items-center gap-2 font-bold text-ink hover:underline">
              {t('exploreServices')}
              <Icon n="arrow_forward" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── how booking works ───────────── */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="reveal mb-12 max-w-2xl">
            <p className="eyebrow mb-3">{hi ? 'बुकिंग' : 'Booking'}</p>
            <h2 className="sec-h mb-4">{hi ? 'तीन चरणों में समय बुक करें' : 'Book your slot in three steps'}</h2>
            <p className="sec-p">
              {hi
                ? 'ऑनलाइन बुकिंग Arogya Rx पर चलती है — वही सिस्टम जिससे क्लिनिक अपना OPD चलाता है। कोई ऐप डाउनलोड नहीं।'
                : 'Online booking runs on Arogya Rx, the same system the clinic uses to run its OPD. No app to download.'}
            </p>
          </div>

          <ol className="grid gap-5 md:grid-cols-3">
            {[
              [hi ? 'दिन और समय चुनें' : 'Pick a day and time', hi ? 'अगले 7 दिनों के खाली स्लॉट लाइव दिखते हैं — सुबह या शाम के सत्र में।' : 'Live free slots for the next 7 days, across the morning and evening sessions.'],
              [hi ? 'अपना विवरण भरें' : 'Add your details', hi ? 'नाम, फ़ोन, उम्र और आने का कारण। एक मिनट से कम।' : 'Name, phone, age and the reason for your visit. Under a minute.'],
              [hi ? 'WhatsApp पर पुष्टि पाएँ' : 'Get WhatsApp confirmation', hi ? 'पुष्टि तुरंत आपके WhatsApp पर, और एक दिन पहले याद दिलाने वाला संदेश।' : 'Confirmation straight to your WhatsApp, plus a reminder the day before.'],
            ].map(([title, body], i) => (
              <li key={title} className="reveal card relative p-7" data-d={i + 1}>
                <span className="absolute right-6 top-5 font-head text-[46px] font-black leading-none text-ink/[0.08]">{i + 1}</span>
                <h3 className="mb-2 pr-12 text-[18px] font-bold text-text">{title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ol>

          <div className="reveal mt-10 flex flex-wrap gap-3" data-d="3">
            <BookButton size="lg">{t('bookAppointment')}</BookButton>
            <Link to="/appointments" className="btn btn-lg">
              {hi ? 'क्लिनिक का पता और समय' : 'Clinic address & timings'}
              <Icon n="arrow_forward" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── closing CTA ───────────── */}
      <section className="pb-24">
        <div className="wrap">
          <div className="reveal relative overflow-hidden rounded-2xl bg-ink-deep p-9 text-white shadow-ink md:p-16">
            <div className="grain absolute inset-0 opacity-25" />
            <div className="float-slow absolute -right-16 -top-16 h-72 w-72 rounded-full bg-ink/60 blur-3xl" />
            <div className="float-slower absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-neem/25 blur-3xl" />

            <div className="relative flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h2 className="mb-4 font-head text-[30px] font-extrabold leading-tight md:text-[42px]">{t('ctaTitle')}</h2>
                <p className="text-[17px] leading-relaxed text-white/80">{t('ctaDesc')}</p>
              </div>
              <div className="flex w-full flex-col gap-3 md:w-auto">
                <BookButton size="lg" variant="" className="!border-white !bg-white !text-ink-deep hover:!bg-desk">
                  {t('ctaButton')}
                </BookButton>
                <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 font-bold text-white/85 hover:text-white">
                  <Icon n="call" size={20} />{PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
