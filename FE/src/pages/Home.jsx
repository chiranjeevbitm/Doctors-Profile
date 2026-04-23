import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import profileImg from '../assets/hero.png';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[870px] flex items-center overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-8 w-full grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-8 z-10">
            <a href="https://www.google.com/maps/place/Dr+Deepak+kumar/@26.1500074,85.4007174,17z/data=!4m6!3m5!1s0x39ed110057681ebf:0xcc7a1deab9d79035!8m2!3d26.150109!4d85.400502!16s%2Fg%2F11z5t68_qr?entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1.5 rounded-full text-sm font-medium hover:bg-tertiary hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {t('location')}
            </a>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-[1.1] tracking-tight">
              {t('welcome')} <br /><span className="text-secondary">{t('tagline')}</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
              {t('welcome')} <strong>Arogya Clinic</strong>. {t('heroDesc')}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/appointments" className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
                {t('bookAppointment')}
                <span className="material-symbols-outlined">calendar_today</span>
              </Link>
              <Link to="/services" className="px-8 py-4 rounded-xl font-bold text-primary border border-outline-variant/30 hover:bg-surface-container-low transition-colors inline-block text-center pt-4">
                {t('viewServices')}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/10">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-outline">{t('education')}</p>
                <p className="text-lg font-bold text-primary">{t('educationDetail')}</p>
                <p className="text-sm text-on-surface-variant">{t('location').split(',')[0]}</p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-outline">{t('specialization')}</p>
                <p className="text-lg font-bold text-primary">{t('specializationDetail')}</p>
                <p className="text-sm text-on-surface-variant">Darbhanga</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
              <img alt={`${t('drName')} Professional Portrait`} className="w-full h-full object-cover object-top" src={profileImg} />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary-container rounded-3xl -z-0 opacity-40 blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-tertiary-fixed rounded-full -z-0 opacity-30 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Asymmetric Bento Grid */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-extrabold text-primary mb-4">{t('whyChooseTitle')}</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl">{t('whyChooseDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-[2rem] flex flex-col justify-between shadow-sm border border-outline-variant/5">
              <div className="w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">school</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3">{t('academicExcellence')}</h3>
                <p className="text-on-surface-variant leading-relaxed text-lg">{t('academicExcellenceDesc')}</p>
              </div>
            </div>
            <div className="bg-secondary text-on-secondary p-10 rounded-[2rem] flex flex-col shadow-lg">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-white text-3xl">patient_list</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('patientFirst')}</h3>
              <p className="opacity-90 leading-relaxed">{t('patientFirstDesc')}</p>
            </div>
            <div className="bg-tertiary-container text-white p-10 rounded-[2rem] flex flex-col shadow-lg">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-white text-3xl">medical_services</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('modernFacility')}</h3>
              <p className="opacity-90 leading-relaxed">{t('modernFacilityDesc')}</p>
            </div>
            <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-[2rem] flex flex-col md:flex-row gap-8 shadow-sm border border-outline-variant/5">
              <div className="flex-1">
                <div className="w-16 h-16 bg-secondary-fixed rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-secondary-fixed-variant text-3xl">verified_user</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">{t('verifiedExperience')}</h3>
                <p className="text-on-surface-variant leading-relaxed">{t('verifiedExperienceDesc')}</p>
              </div>
              <div className="flex-shrink-0 w-full md:w-64 h-48 md:h-full rounded-2xl overflow-hidden bg-slate-200">
                <img alt="Medical Consultation" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxN9u76w1slLdl6lmBwRNs0odLTG3aqehrTPPs1EpWv_v0LQ44N2JObyABX_R5Cu58Jt814Mtp4V3s0EEKWbtMVQlYMDWpPs-ZTIKONsW4rLS5GMfsL44XNEepSxateBC51arUBvjRMFUABVYeDTOfGvXGwjIFPO3zVeKYSoiPvFzp-uEbrIo0Rq7e2JfZwWltPCSLJRO7AhAgfiPJqu9O4fjVfztOa97QEEAkYcP-HCvGu7_RNLCPz0zUaJixvUPjgZ3LDDoynQ0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-primary mb-4">{t('coreServicesTitle')}</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">{t('coreServicesDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="group bg-surface-container-low p-8 rounded-xl hover:bg-primary-container transition-all duration-300">
              <span className="material-symbols-outlined text-4xl text-primary group-hover:text-on-primary-container mb-6">stethoscope</span>
              <h4 className="text-xl font-bold text-primary group-hover:text-on-primary-container mb-2">{t('generalConsultation')}</h4>
              <p className="text-sm text-on-surface-variant group-hover:text-on-primary-container/80">{t('generalConsultationDesc')}</p>
            </div>
            <div className="group bg-surface-container-low p-8 rounded-xl hover:bg-primary-container transition-all duration-300">
              <span className="material-symbols-outlined text-4xl text-primary group-hover:text-on-primary-container mb-6">vital_signs</span>
              <h4 className="text-xl font-bold text-primary group-hover:text-on-primary-container mb-2">{t('diagnostics')}</h4>
              <p className="text-sm text-on-surface-variant group-hover:text-on-primary-container/80">{t('diagnosticsDesc')}</p>
            </div>
            <div className="group bg-surface-container-low p-8 rounded-xl hover:bg-primary-container transition-all duration-300">
              <span className="material-symbols-outlined text-4xl text-primary group-hover:text-on-primary-container mb-6">pill</span>
              <h4 className="text-xl font-bold text-primary group-hover:text-on-primary-container mb-2">{t('chronicCare')}</h4>
              <p className="text-sm text-on-surface-variant group-hover:text-on-primary-container/80">{t('chronicCareDesc')}</p>
            </div>
            <div className="group bg-surface-container-low p-8 rounded-xl hover:bg-primary-container transition-all duration-300">
              <span className="material-symbols-outlined text-4xl text-primary group-hover:text-on-primary-container mb-6">emergency</span>
              <h4 className="text-xl font-bold text-primary group-hover:text-on-primary-container mb-2">{t('emergencyAdvice')}</h4>
              <p className="text-sm text-on-surface-variant group-hover:text-on-primary-container/80">{t('emergencyAdviceDesc')}</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link className="text-secondary font-bold flex items-center justify-center gap-2 hover:underline" to="/services">
              {t('exploreServices')}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad1)"></path>
              <defs>
                <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: 'white', stopOpacity: 1}}></stop>
                  <stop offset="100%" style={{stopColor: 'transparent', stopOpacity: 0}}></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-primary mb-6">{t('ctaTitle')}</h2>
              <p className="text-primary-fixed-dim text-xl max-w-md">{t('ctaDesc')}</p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <Link to="/appointments" className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-colors shadow-xl text-center">
                {t('ctaButton')}
              </Link>
              <div className="flex items-center justify-center md:justify-start gap-4 text-on-primary/80">
                <span className="material-symbols-outlined">call</span>
                <span className="font-bold">{t('phone')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
