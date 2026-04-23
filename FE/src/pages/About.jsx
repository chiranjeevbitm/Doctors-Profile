import React from 'react';
import profileImg from '../assets/hero.png';
import arogyaImg from '../assets/arogya_clinic_front.jpeg';

export default function About() {
  return (
    <>
      {/* Hero Section: Editorial Layout */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1.5 rounded-full text-sm font-medium mb-6 inline-block">The Empathetic Authority</span>
          <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-primary leading-[1.1] tracking-tight mb-8">
            Healing with <span className="text-secondary">Precision</span>, Serving with <span className="text-tertiary">Heart</span>.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
            Dr. Deepak Kumar is a distinguished medical professional dedicated to revolutionizing patient care throughout the Tirhut division. Based in Muzaffarpur, the "Capital of North Bihar," he bridges the gap between advanced medical science and compassionate healing, offering a trusted sanctuary for the community's health.
          </p>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-high shadow-xl">
            <img alt="Professional portrait of Dr. Deepak Kumar" className="w-full h-full object-cover object-[center_10%]" src={profileImg} />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-xl shadow-lg border border-outline-variant/15 max-w-[240px]">
            <p className="font-headline font-bold text-primary text-xl">5+ Years</p>
            <p className="text-sm text-on-surface-variant">Of clinical excellence and community service in Bihar.</p>
          </div>
        </div>
      </section>

      {/* Education Bento Grid */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">Academic Foundation</h2>
            <div className="h-1 w-20 bg-secondary rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 bg-primary-fixed text-on-primary-fixed flex items-center justify-center rounded-lg mb-6">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-2">MBBS</h3>
                <p className="text-on-surface-variant font-medium mb-4">Sri Krishna Medical College (SKMCH)</p>
                <p className="text-on-surface-variant leading-relaxed">Completed his foundational medical education at one of Bihar's premier institutions, developing a robust clinical perspective.</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 bg-secondary-container text-on-secondary-container flex items-center justify-center rounded-lg mb-6">
                  <span className="material-symbols-outlined">medical_services</span>
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-2">MD General medicine</h3>
                <p className="text-on-surface-variant font-medium mb-4">Darbhanga Medical College (DMCH Darbhanga)</p>
                <p className="text-on-surface-variant leading-relaxed">Specialized training that honed his expertise in diagnostic precision and advanced therapeutic interventions.</p>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-1 bg-primary relative overflow-hidden rounded-xl">
              <img alt="Stately medical college building architecture" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD90xfYO3RoQsbfBrdh9WSu5_0C3RjIiG3j_pfRtjEb1zQtBP0DP0mDHlpJTsai80_HUqLwGS7x9cwYYGZLIEi7bPVaoSI05N9XpT6pp7bArKRGuxGZy5zlrauwIk6aPM0sNUSHZzW7WpEZZ_vBO3SzooQaHRCIj3sjNzi96xW0_-bdGs5Qu5Q1EWi4gjFCNzNk2bU30Lue6zqLrjIdUgJy4uoY05QT43wwO3-evwWRukKCZxV3hG1hTT5ihBlGALXu6C2MYSg4yY8" />
              <div className="relative p-8 h-full flex flex-col justify-end">
                <h3 className="text-white font-headline font-bold text-xl mb-2">Elite Training</h3>
                <p className="text-primary-fixed-dim">Educated at Bihar's most rigorous medical sanctuaries.</p>
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
            <h2 className="text-4xl font-headline font-extrabold text-primary mb-6">A Lifelong Vow to Muzaffarpur</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
              Muzaffarpur is more than just a practice location; it is home. Operating from Arogya Clinic, Dr. Deepak Kumar’s commitment extends to the heart of the "Land of Shahi Lychees". He is deeply involved in local health initiatives, ensuring that quality healthcare is accessible to every strata of society in Bihar.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">volunteer_activism</span>
                <p className="text-on-surface font-medium">Regular free health camps for underprivileged populations.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">diversity_3</span>
                <p className="text-on-surface font-medium">Mentorship programs for local medical aspirants.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">health_and_safety</span>
                <p className="text-on-surface font-medium">Primary advocate for preventive health education in rural zones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Milestones: Timeline */}
      <section className="bg-surface-dim py-24">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">Professional Milestones</h2>
            <p className="text-on-surface-variant">A legacy of clinical excellence and academic rigor.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-outline-variant/30 hidden md:block"></div>
            <div className="space-y-12">
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right">
                  <h4 className="text-primary font-bold text-xl">Academic Commencement</h4>
                  <p className="text-on-surface-variant">MBBS Graduation from SKMCH, Muzaffarpur.</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-primary z-10 hidden md:block"></div>
                <div className="md:w-1/2">
                  <span className="text-secondary font-bold font-headline">Foundation</span>
                </div>
              </div>
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 order-2 md:order-1 md:text-right">
                  <span className="text-secondary font-bold font-headline">Specialization</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-secondary z-10 hidden md:block"></div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <h4 className="text-primary font-bold text-xl">Advanced Medicine</h4>
                  <p className="text-on-surface-variant">Obtained MD General medicine from the prestigious Darbhanga Medical College.</p>
                </div>
              </div>
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:text-right">
                  <h4 className="text-primary font-bold text-xl">Civic Leadership</h4>
                  <p className="text-on-surface-variant">Established the landmark clinic in Muzaffarpur focusing on empathetic care.</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-tertiary z-10 hidden md:block"></div>
                <div className="md:w-1/2">
                  <span className="text-secondary font-bold font-headline">Establishment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications: Tonal Cards */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <h2 className="text-3xl font-headline font-bold text-primary mb-12 text-center">Accreditations & Honors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-low p-6 rounded-xl text-center border border-transparent hover:border-outline-variant/20 transition-all">
            <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <p className="font-bold text-primary">IMA Member</p>
            <p className="text-xs text-on-surface-variant mt-1">Indian Medical Association</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl text-center border border-transparent hover:border-outline-variant/20 transition-all">
            <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            <p className="font-bold text-primary">Board Certified</p>
            <p className="text-xs text-on-surface-variant mt-1">Medical Council of India</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl text-center border border-transparent hover:border-outline-variant/20 transition-all">
            <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            <p className="font-bold text-primary">Excellence Award</p>
            <p className="text-xs text-on-surface-variant mt-1">State Health Mission</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl text-center border border-transparent hover:border-outline-variant/20 transition-all">
            <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>published_with_changes</span>
            <p className="font-bold text-primary">Fellowship</p>
            <p className="text-xs text-on-surface-variant mt-1">Internal Medicine</p>
          </div>
        </div>
      </section>
    </>
  );
}
