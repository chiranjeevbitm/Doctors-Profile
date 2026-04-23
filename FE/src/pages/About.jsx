import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import profileImg from '../assets/hero.png';
import arogyaImg from '../assets/arogya_clinic_front.jpeg';

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section: Editorial Layout */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1.5 rounded-full text-sm font-medium mb-6 inline-block">{t('aboutSubtitle')}</span>
          <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-primary leading-[1.1] tracking-tight mb-8">
            {t('aboutTitle')}
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
            {t('drName')} {t('aboutDesc')}
          </p>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-high shadow-xl">
            <img alt={`${t('drName')} Professional Portrait`} className="w-full h-full object-cover object-[center_10%]" src={profileImg} />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-xl shadow-lg border border-outline-variant/15 max-w-[240px]">
            <p className="font-headline font-bold text-primary text-xl">{t('yearsExp')}</p>
            <p className="text-sm text-on-surface-variant">{t('yearsExpDesc')}</p>
          </div>
        </div>
      </section>

      {/* Education Bento Grid */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">{t('academicFoundation')}</h2>
            <div className="h-1 w-20 bg-secondary rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 bg-primary-fixed text-on-primary-fixed flex items-center justify-center rounded-lg mb-6">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-2">{t('mbbs')}</h3>
                <p className="text-on-surface-variant font-medium mb-4">{t('mbbsCollege')}</p>
                <p className="text-on-surface-variant leading-relaxed">{t('mbbsDesc')}</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 bg-secondary-container text-on-secondary-container flex items-center justify-center rounded-lg mb-6">
                  <span className="material-symbols-outlined">medical_services</span>
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-2">{t('md')}</h3>
                <p className="text-on-surface-variant font-medium mb-4">{t('mdCollege')}</p>
                <p className="text-on-surface-variant leading-relaxed">{t('mdDesc')}</p>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-1 bg-primary relative overflow-hidden rounded-xl">
              <img alt="Stately medical college building architecture" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD90xfYO3RoQsbfBrdh9WSu5_0C3RjIiG3j_pfRtjEb1zQtBP0DP0mDHlpJTsai80_HUqLwGS7x9cwYYGZLIEi7bPVaoSI05N9XpT6pp7bArKRGuxGZy5zlrauwIk6aPM0sNUSHZzW7WpEZZ_vBO3SzooQaHRCIj3sjNzi96xW0_-bdGs5Qu5Q1EWi4gjFCNzNk2bU30Lue6zqLrjIdUgJy4uoY05QT43wwO3-evwWRukKCZxV3hG1hTT5ihBlGALXu6C2MYSg4yY8" />
              <div className="relative p-8 h-full flex flex-col justify-end">
                <h3 className="text-white font-headline font-bold text-xl mb-2">{t('eliteTraining')}</h3>
                <p className="text-primary-fixed-dim">{t('eliteTrainingDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Commitment: Asymmetric Layout */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg translate-y-8">
                <img alt="Arogya Clinic Entrance" className="w-full h-full object-cover" src={arogyaImg} />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <img alt="Life in Muzaffarpur Bihar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Clwpb1cmxXU11MoA57fPjch7cd2ADf_weIBF-Ao5RPUK4aOLtiM20rvX_6_Cc2ouV3_vdYgYRBOxpHrQKXKAsR3_WSU2307bljxrYpsOM_UZ6vD6kQuFTjQyrORUHaf6y1S-huCaieMIxToUzYlYV8iACaKOz5OOKXazUcJoXvvQtsDI0SCV4c5NfHG_CDGb0_HLynhcQsw_wnRZL8-EbXEGPx1OJNml2IEguQYJmx6oXH71jWwO5H882Tb3voMDovsoaBBXqA0" />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-4xl font-headline font-extrabold text-primary mb-6">{t('communityTitle')}</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
              {t('communityDesc')}
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">volunteer_activism</span>
                <p className="text-on-surface font-medium">{t('freeCamps')}</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">diversity_3</span>
                <p className="text-on-surface font-medium">{t('mentorship')}</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">health_and_safety</span>
                <p className="text-on-surface font-medium">{t('preventiveHealth')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Milestones: Timeline */}
      <section className="bg-surface-dim py-24">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">{t('milestonesTitle')}</h2>
            <p className="text-on-surface-variant">{t('milestonesDesc')}</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-outline-variant/30 hidden md:block"></div>
            <div className="space-y-12">
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right">
                  <h4 className="text-primary font-bold text-xl">{t('academicCommencement')}</h4>
                  <p className="text-on-surface-variant">{t('academicCommencementDesc')}</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-primary z-10 hidden md:block"></div>
                <div className="md:w-1/2">
                  <span className="text-secondary font-bold font-headline">{t('foundation')}</span>
                </div>
              </div>
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 order-2 md:order-1 md:text-right">
                  <span className="text-secondary font-bold font-headline">{t('specializationLabel')}</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-secondary z-10 hidden md:block"></div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <h4 className="text-primary font-bold text-xl">{t('advancedMedicine')}</h4>
                  <p className="text-on-surface-variant">{t('advancedMedicineDesc')}</p>
                </div>
              </div>
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right">
                  <h4 className="text-primary font-bold text-xl">{t('civicLeadership')}</h4>
                  <p className="text-on-surface-variant">{t('civicLeadershipDesc')}</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-tertiary z-10 hidden md:block"></div>
                <div className="md:w-1/2">
                  <span className="text-secondary font-bold font-headline">{t('establishment')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications: Tonal Cards */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <h2 className="text-3xl font-headline font-bold text-primary mb-12 text-center">{t('accreditationsTitle')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-low p-6 rounded-xl text-center border border-transparent hover:border-outline-variant/20 transition-all">
            <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <p className="font-bold text-primary">{t('imaMember')}</p>
            <p className="text-xs text-on-surface-variant mt-1">{t('imaDesc')}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl text-center border border-transparent hover:border-outline-variant/20 transition-all">
            <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            <p className="font-bold text-primary">{t('boardCertified')}</p>
            <p className="text-xs text-on-surface-variant mt-1">{t('boardDesc')}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl text-center border border-transparent hover:border-outline-variant/20 transition-all">
            <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            <p className="font-bold text-primary">{t('excellenceAward')}</p>
            <p className="text-xs text-on-surface-variant mt-1">{t('awardDesc')}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl text-center border border-transparent hover:border-outline-variant/20 transition-all">
            <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>published_with_changes</span>
            <p className="font-bold text-primary">{t('fellowship')}</p>
            <p className="text-xs text-on-surface-variant mt-1">{t('fellowshipDesc')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
