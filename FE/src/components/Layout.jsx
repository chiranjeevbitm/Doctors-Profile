import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import DrDeeepakWidget from './DrDeeepakWidget';

export default function Layout() {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "text-blue-900 font-bold border-b-2 border-blue-900 pb-1"
      : "text-slate-600 hover:text-blue-900 transition-opacity duration-200";
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" onClick={closeMobileMenu} className="text-2xl font-bold tracking-tight text-blue-900">{t('drName')}</Link>
          
          <button 
            className="md:hidden text-blue-900 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          <div className="hidden md:flex space-x-8 items-center">
            <NavLink className={getNavLinkClass} to="/">{t('home')}</NavLink>
            <NavLink className={getNavLinkClass} to="/about">{t('about')}</NavLink>
            <NavLink className={getNavLinkClass} to="/services">{t('services')}</NavLink>
            <NavLink className={getNavLinkClass} to="/appointments">{t('appointments')}</NavLink>
            <NavLink className={getNavLinkClass} to="/doctor-in-10-mins">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                {t('doctorIn10NavLabel')}
              </span>
            </NavLink>

          </div>
          <Link to="/appointments" className="hidden md:block bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 active:scale-95 transition-all">
            {t('appointments')}
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
            <NavLink className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-900 hover:bg-slate-50" onClick={closeMobileMenu} to="/">{t('home')}</NavLink>
            <NavLink className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-900 hover:bg-slate-50" onClick={closeMobileMenu} to="/about">{t('about')}</NavLink>
            <NavLink className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-900 hover:bg-slate-50" onClick={closeMobileMenu} to="/services">{t('services')}</NavLink>
            <NavLink className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-900 hover:bg-slate-50" onClick={closeMobileMenu} to="/appointments">{t('appointments')}</NavLink>
            <NavLink className="block px-3 py-3 rounded-md text-base font-bold text-green-700 hover:bg-green-50" onClick={closeMobileMenu} to="/doctor-in-10-mins">
              {t('doctorIn10NavLabel')} ⚡
            </NavLink>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="pt-20 flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-200 w-full mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8 py-12 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="text-xl font-bold text-blue-900">{t('drName')}</div>
            <p className="text-slate-500 max-w-xs leading-relaxed">{t('footerDesc')}</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-blue-900 uppercase text-xs tracking-widest">{t('navigation')}</h4>
            <ul className="space-y-2">
              <li><Link className="text-slate-500 hover:text-blue-900 transition-colors" to="/about">{t('aboutUs')}</Link></li>
              <li><Link className="text-slate-500 hover:text-blue-900 transition-colors" to="/appointments">{t('patientPortal')}</Link></li>
              <li><Link className="text-slate-500 hover:text-blue-900 transition-colors" to="/services">{t('services')}</Link></li>
              <li><Link className="text-slate-500 hover:text-blue-900 transition-colors" to="/reserve">{t('reserve')}</Link></li>
              <li><Link className="text-slate-500 hover:text-green-700 font-semibold transition-colors" to="/doctor-in-10-mins">{t('doctorIn10NavLabel')} ⚡</Link></li>

            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-blue-900 uppercase text-xs tracking-widest">{t('clinicLocationTitle')}</h4>
            <p className="text-slate-500 leading-relaxed">
              <a href="https://www.google.com/maps/place/Dr+Deepak+kumar/@26.1500074,85.4007174,17z/data=!4m6!3m5!1s0x39ed110057681ebf:0xcc7a1deab9d79035!8m2!3d26.150109!4d85.400502!16s%2Fg%2F11z5t68_qr?entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900 transition-colors">
                {t('address')}
              </a><br/>
              <span className="inline-block mt-2 font-semibold">{t('morningTiming')}<br/>{t('eveningTiming')}</span><br/>
              <span className="inline-block mt-1 font-semibold text-blue-900">{t('phone')}</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 border-t border-slate-300">
          <p className="text-slate-500 text-sm">{t('copyright')}</p>
        </div>
      </footer>

      {/* Pre-consultation WhatsApp Chat Widget - visible on all pages */}
      <DrDeeepakWidget />
    </div>
  );
}
