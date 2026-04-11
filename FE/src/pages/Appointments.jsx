import React from 'react';

export default function Appointments() {
  return (
    <>
      <main className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h1 className="font-headline text-5xl font-extrabold text-primary leading-tight tracking-tight">Let's prioritize your health.</h1>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">Schedule a consultation with Dr. Deepak Kumar at our Muzaffarpur clinic. We're committed to providing you with the highest standard of care.</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-secondary-container p-3 rounded-lg text-on-secondary-container">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Clinic Location</p>
                  <p className="text-on-surface-variant">Main Road, Opp. Civil Hospital<br/>Muzaffarpur, Bihar 842001</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-tertiary-fixed p-3 rounded-lg text-on-tertiary-fixed">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Phone Number</p>
                  <p className="text-on-surface-variant">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container">
                <div className="bg-primary-fixed p-3 rounded-lg text-on-primary-fixed">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Email Address</p>
                  <p className="text-on-surface-variant">contact@drdeepakkumar.com</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm h-64 relative group">
              <img className="w-full h-full object-cover" alt="Map of Muzaffarpur clinic location" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbhfOZE7-iStuQMCwWuo6V8DTUc24azDU9tv8jRn_AVdTcCQrh3clQoNipvckFb0SeTSm--BJxfQSNipegv0WR7IsuyLEEExh8qNm_EWkU4xwEM4CVxMiIDg34rci0TMu0zcsZGPH6EE7h9wQdzRoohI-tXvy1BFHJNseOrHseUh1q9l2htL-04kxLGEBzEloLIEPgc-P8MUuPGToOWsXm_VEAYrGCHN5-qfY4FcrOXYt1S1c62n6x_n-p-MXsNkVuNmHuUM98sJY"/>
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-sm border border-outline-variant/10">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-sm font-bold mb-4">
                  Available Today
                </span>
                <h2 className="font-headline text-3xl font-bold text-primary">Request an Appointment</h2>
              </div>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Full Name</label>
                    <input className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all" placeholder="John Doe" type="text"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Phone Number</label>
                    <input className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all" placeholder="+91 00000 00000" type="tel"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant px-1">Email Address</label>
                  <input className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all" placeholder="john@example.com" type="email"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Preferred Date</label>
                    <input className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all" type="date"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Preferred Time Slot</label>
                    <select className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all">
                      <option>Morning (9 AM - 12 PM)</option>
                      <option>Afternoon (2 PM - 5 PM)</option>
                      <option>Evening (6 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant px-1">Medical Concern</label>
                  <textarea className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all resize-none" placeholder="Briefly describe your health concern..." rows="4"></textarea>
                </div>
                <div className="pt-4">
                  <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold text-lg shadow-md hover:opacity-90 transition-all active:scale-[0.98]" type="submit">
                    Send Request
                  </button>
                  <p className="text-center text-xs text-on-surface-variant mt-4">
                    By submitting this form, you agree to our <a className="underline" href="#">Privacy Policy</a>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
