import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative px-8 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-sm font-semibold mb-6">
              <span className="material-symbols-outlined text-sm mr-2">verified_user</span>
              Patient-Centered Excellence
            </div>
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-primary leading-[1.1] mb-6">
              Specialized Care Tailored to <span className="text-secondary">Your Wellness</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mb-8">
              Experience comprehensive medical solutions combining state-of-the-art diagnostics with a compassionate, editorial approach to modern healthcare.
            </p>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
              <img className="w-full h-full object-cover" alt="professional medical setting with modern diagnostic equipment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAcY89hGQbZC7A1BgiyItCfj2abPLHHWoiXaWY2bETea7xwvBhGpIiC-c4GAFSnuQvY2QjRzwu3jA_BBI4BIwv_DkbCdDOdk-neH76gs8tYwOiH1WxhRuc5GxLSWplkoVKjCF4lAl5Q_faOEZw_tomtfIy6H2BYvyyHNy_yrgwhr1w3O2TNdP3yne19phJDEmIx2luMYQb9hDhuGIYlOKMcOrQizSh-pXaV7XDYCk3WBDAQ3jt9smanUpzuXiK-Nezc0BUCxr7VpU" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-container rounded-2xl -z-10 opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="px-8 py-16 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary mb-4">Clinical Services</h2>
            <p className="text-on-surface-variant max-w-xl">Our multidisciplinary approach ensures every patient receives focused attention and a personalized treatment roadmap.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between group hover:shadow-lg transition-shadow duration-300">
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">monitor_heart</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-3">Diabetes & Blood Pressure Management</h3>
                <p className="text-on-surface-variant leading-relaxed max-w-lg mb-8">
                  Guideline-directed medical treatment for managing chronic conditions like Diabetes and Hypertension. We provide continuous monitoring and personalized therapeutic plans to ensure your vitals remain balanced and optimal.
                </p>
              </div>
              <Link to="/appointments" className="inline-flex items-center text-tertiary font-bold group-hover:gap-2 transition-all">
                Learn More <span className="material-symbols-outlined ml-1">arrow_forward</span>
              </Link>
            </div>
            <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-xl flex flex-col group hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-6">
                <span className="material-symbols-outlined text-3xl">local_pharmacy</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-3">Endocrine Care</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Advanced diagnosis and holistic management of Thyroid-related disorders.</p>
              <Link to="/appointments" className="inline-flex items-center text-tertiary font-bold">
                Learn More <span className="material-symbols-outlined ml-1">arrow_forward</span>
              </Link>
            </div>
            <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-xl flex flex-col group hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-tertiary/10 rounded-lg flex items-center justify-center text-tertiary mb-6">
                <span className="material-symbols-outlined text-3xl">pulmonology</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-3">Respiratory Health</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Specialized interventions for Asthma, COPD, and other pulmonary challenges.</p>
              <Link to="/appointments" className="inline-flex items-center text-tertiary font-bold">
                Learn More <span className="material-symbols-outlined ml-1">arrow_forward</span>
              </Link>
            </div>
            <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-xl flex flex-col group hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary-container mb-6">
                <span className="material-symbols-outlined text-3xl">gastroenterology</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-3">Abdomen Diseases</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Expert consultations and treatment plans for diseases related to the abdomen and GI tract.</p>
              <Link to="/appointments" className="inline-flex items-center text-tertiary font-bold">
                Learn More <span className="material-symbols-outlined ml-1">arrow_forward</span>
              </Link>
            </div>
            <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-xl flex flex-col group hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-secondary-container/20 rounded-lg flex items-center justify-center text-secondary mb-6">
                <span className="material-symbols-outlined text-3xl">video_camera_front</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-3">Teleconsultation</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Access personalized medical advice and follow-up care remotely from the comfort of your home.</p>
              <Link to="/appointments" className="inline-flex items-center text-tertiary font-bold">
                Learn More <span className="material-symbols-outlined ml-1">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-8 py-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="font-headline text-4xl font-bold text-primary mb-8 leading-tight">Beyond Medicine:<br />A Partnership in Health</h2>
            <div className="space-y-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center text-on-tertiary-fixed">
                  <span className="material-symbols-outlined">task_alt</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-lg">Evidenced-Based Protocols</h4>
                  <p className="text-on-surface-variant">Treatments rooted in the latest clinical research and global medical standards.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center text-on-secondary-fixed">
                  <span className="material-symbols-outlined">diversity_1</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-lg">Personalized Touch</h4>
                  <p className="text-on-surface-variant">Every patient is unique. We build medical plans that respect individual lifestyles.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <img className="w-full h-64 object-cover rounded-2xl shadow-md" alt="close up of a compassionate doctor holding a patient's hand" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4gnSosnoHdB_bNcWc09Vc4J1ZCOW76FuDb0-QfCpMlwvrRig7GaRHA0nCI4JPPITZp1yCJgZw4V_NbjIQ7C37IxrdKbgETaAnunpq5NLjbf8m6bjgsLWIPNHn0p4s1hvgQhN21dZJEPjVLPH7W_ZXQih4qNvCyAmzSZ58Lm_O1VCf7n0WryVzyEF9N3pYm744TGKHS_k06Oq0g-GVj47zDofU1qjRStJ8M-Zf_reB4N6ajSujsScXKF96jNiS7s_JGSP7ouh5FeE" />
              <img className="w-full h-48 object-cover rounded-2xl shadow-md" alt="clean bright laboratory with microscope" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQCxQehDcjv3OmlzxBQc5e9YUlVdvfJRkBvHU9C24HCyomL_kQ5KAF-yAgwwklvSawm20nX4RNWgi2zALavN-8WRscxV7nlJ8wJOpCD-IrXrJ32Jl3p4r6xjGNLZlw3uHA317sP27Z7HEUoNFexCYWWaIArouncVHc7tuhoX4b1c4aCytn1mDp5P7zhCkv_MvlCYaV6kA398v_efE5gZZNtlNj7Mgmw9NSpJwoWZ44TGTFPwL6MaUjfmMiol9LhCF8EOp7mjN8oEs" />
            </div>
            <div className="space-y-4">
              <img className="w-full h-48 object-cover rounded-2xl shadow-md" alt="modern hospital hallway" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwJBMB5SBfEl0otRxQXHDFXNB-e-NNzLiJQB83AWyE-q7aMGmtUMhV_5fvAbjuOBIrSeceBs-8dgb_Lvd0OOn6fuJlO4i_WxcyV7vIMOEOhUu6ExzYJcaGeMt806QqFHqrDg2kPeBqpFTy73WhW_7N6oqbH55B5wGrlYN86J5A_6-CHX8bPgQxcvTkqYdtV4L6f0X6kYzQhX_2UK7iJEyTBisokhGvW5zZTIzLPN5s991YLiyhA8P6ggCQnufns2RThQkXuN6X60Y" />
              <img className="w-full h-64 object-cover rounded-2xl shadow-md" alt="stethoscope on a desk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGkoVgRYHqpI8YwnoXBm3Yqys0-t8u7HIZWBrJN5qK2RBw3nSYbyfXC0ujTY34Zey0Nla8I7ZCawJMcsBDzuiWIHS2XykOHzWdCkSCE8bPoQg2eWlAYByekmKl-dHIeicrj6cJweeYGSkEr9IwadKIM5m4z2N31n3-zXc3DRdXkfjeHGoS15D1ghLu5n1RGgsqMpkci5ZEyfxqVpa7bmWu4wG3Sr-6gDDKzwXY1R6w24Xc4cvTImp3GIqSnZpC1M0aLQJEaAfFkwo" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-br from-primary to-primary-container p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10">Start Your Path to Recovery</h2>
          <p className="text-on-primary-container text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
            Schedule a comprehensive consultation today and experience healthcare reimagined for the modern age.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 relative z-10">
            <Link to="/appointments" className="px-8 py-4 bg-surface-container-lowest text-primary rounded-xl font-bold shadow-xl hover:scale-105 transition-transform text-center">
              Schedule Appointment
            </Link>
            <Link to="/appointments" className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-colors text-center">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
