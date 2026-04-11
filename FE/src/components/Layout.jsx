import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';

export default function Layout() {
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "text-blue-900 font-bold border-b-2 border-blue-900 pb-1"
      : "text-slate-600 hover:text-blue-900 transition-opacity duration-200";
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-bold tracking-tight text-blue-900">Dr. Deepak Kumar</Link>
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink className={getNavLinkClass} to="/">Home</NavLink>
            <NavLink className={getNavLinkClass} to="/about">About</NavLink>
            <NavLink className={getNavLinkClass} to="/services">Services</NavLink>
            <NavLink className={getNavLinkClass} to="/appointments">Appointments</NavLink>
          </div>
          <Link to="/appointments" className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 active:scale-95 transition-all">
            Book Now
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20 flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-200 w-full mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-12 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="text-xl font-bold text-blue-900">Dr. Deepak Kumar</div>
            <p className="text-slate-500 max-w-xs leading-relaxed">Expert healthcare professional dedicated to the wellness of the Muzaffarpur community at Arogya Clinic. MBBS (SKMCH), MD (DMCH).</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-blue-900 uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-2">
              <li><Link className="text-slate-500 hover:text-blue-900 transition-colors" to="/about">About Us</Link></li>
              <li><Link className="text-slate-500 hover:text-blue-900 transition-colors" to="/appointments">Patient Portal</Link></li>
              <li><Link className="text-slate-500 hover:text-blue-900 transition-colors" to="/services">Services</Link></li>
              <li><Link className="text-slate-500 hover:text-blue-900 transition-colors" to="/reserve">Reserve (Dashboard)</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-blue-900 uppercase text-xs tracking-widest">Arogya Clinic Location</h4>
            <p className="text-slate-500 leading-relaxed">
              Main Road, Muzaffarpur,<br/>
              Bihar - 842001<br/>
              <span className="inline-block mt-2 font-semibold">Evening Clinic Starts: 8:30 PM</span><br/>
              <span className="inline-block mt-1 font-semibold text-blue-900">+91 74888 78725</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-6 border-t border-slate-300">
          <p className="text-slate-500 text-sm">© 2024 Dr. Deepak Kumar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
