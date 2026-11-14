import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import DoctorIn10Widget from './DoctorIn10Widget';
import BookButton from './BookButton';
import { PHONE, PHONE_TEL, MAPS_URL, clinicOpenNow } from '../lib/site';

const NAV = [
  { to: '/', key: 'home', end: true },
  { to: '/about', key: 'about' },
  { to: '/services', key: 'services' },
  { to: '/appointments', key: 'navAppointments' },
];

export default function Layout() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(() => clinicOpenNow());
  const loc = useLocation();

  // nav condenses once you leave the top — passive listener, no layout reads
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [loc.pathname]);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    const id = setInterval(() => setIsOpenNow(clinicOpenNow()), 60_000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navCls = ({ isActive }) =>
    `relative px-1 py-1.5 text-[15.5px] font-semibold transition-colors ${
      isActive ? 'text-ink' : 'text-muted hover:text-text'
    } after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-ink after:transition-all after:duration-300 ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-desk text-text">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          solid ? 'bg-paper/85 shadow-lift backdrop-blur-xl' : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="wrap flex items-center justify-between" style={{ height: 'var(--nav-h)' }}>
          <Link to="/" className="group flex flex-none items-center gap-2.5" aria-label="Arogya Clinic — home">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-[10px] bg-ink font-head text-[20px] font-black leading-none text-white transition-transform duration-300 group-hover:scale-105">
              आ
            </span>
            <span className="leading-tight">
              <span className="block whitespace-nowrap font-head text-[16px] font-extrabold text-ink-deep">{t('drName')}</span>
              <span className="block whitespace-nowrap text-[11.5px] font-medium text-muted">MBBS, MD · Arogya Clinic</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={navCls}>{t(n.key)}</NavLink>
            ))}
            <NavLink to="/doctor-in-10-mins" className={navCls}>
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-neem" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neem" />
                </span>
                {t('navQuick')}
              </span>
            </NavLink>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={`tel:${PHONE_TEL}`} className="btn btn-ghost px-3 text-[15px]" aria-label={`Call ${PHONE}`}>
              <Icon n="call" size={20} />
              <span className="hidden xl:inline">{PHONE}</span>
            </a>
            <BookButton>{t('bookNow')}</BookButton>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-sm text-ink-deep lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <Icon n={open ? 'close' : 'menu'} size={26} />
          </button>
        </div>

        {/* mobile sheet */}
        <div
          className={`overflow-hidden border-line bg-paper transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
            open ? 'max-h-[26rem] border-t opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="wrap flex flex-col gap-1 py-3">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `rounded-sm px-3 py-3 text-[16px] font-semibold ${isActive ? 'bg-ink-soft text-ink' : 'text-text'}`
                }
              >
                {t(n.key)}
              </NavLink>
            ))}
            <NavLink to="/doctor-in-10-mins" className="rounded-sm px-3 py-3 text-[16px] font-bold text-neem">
              {t('doctorIn10NavLabel')} ⚡
            </NavLink>
            <div className="mt-2 grid grid-cols-2 gap-2 px-1 pb-2">
              <a href={`tel:${PHONE_TEL}`} className="btn">
                <Icon n="call" size={20} />
                {language === 'hi' ? 'कॉल करें' : 'Call'}
              </a>
              <BookButton>{t('bookNow')}</BookButton>
            </div>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-grow" style={{ paddingTop: 'var(--nav-h)' }}>
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-line bg-paper">
        <div className="wrap grid grid-cols-1 gap-10 py-14 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-ink font-head text-[22px] font-black text-white">आ</span>
              <span>
                <span className="block font-head text-[17px] font-extrabold text-ink-deep">{t('drName')}</span>
                <span className="block text-[12.5px] text-muted">MBBS, MD (General Medicine)</span>
              </span>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">{t('footerDesc')}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="tag tag-ink">IMA</span>
              <span className="tag tag-ink">SKMCH</span>
              <span className="tag tag-ink">DMCH Darbhanga</span>
            </div>
          </div>

          <div className="space-y-3 md:col-span-3">
            <h4 className="eyebrow">{t('navigation')}</h4>
            <ul className="space-y-2 text-[15px]">
              {[['/about', 'aboutUs'], ['/services', 'services'], ['/appointments', 'appointments'], ['/doctor-in-10-mins', 'doctorIn10NavLabel']].map(([to, key]) => (
                <li key={to}>
                  <Link className="text-muted transition-colors hover:text-ink" to={to}>{t(key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 md:col-span-4">
            <h4 className="eyebrow">{t('clinicLocationTitle')}</h4>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="block text-[15px] leading-relaxed text-muted transition-colors hover:text-ink">
              Bada Jagrnath, Shakti Dharmkanta,<br />Ahiyapur, Muzaffarpur, Bihar 842001
            </a>
            <div className="space-y-1 text-[15px]">
              <p className="flex items-center gap-2 font-semibold">
                <span className={`h-2 w-2 flex-none rounded-full ${isOpenNow ? 'bg-neem' : 'bg-faint'}`} />
                {isOpenNow
                  ? (language === 'hi' ? 'अभी खुला है' : 'Open now')
                  : (language === 'hi' ? 'अभी बंद है' : 'Closed now')}
              </p>
              <p className="text-muted">{language === 'hi' ? 'सुबह' : 'Morning'} 6:00–9:00</p>
              <p className="text-muted">{language === 'hi' ? 'शाम' : 'Evening'} 5:00–9:00</p>
            </div>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 font-bold text-ink">
              <Icon n="call" size={20} />{PHONE}
            </a>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="wrap flex flex-col gap-2 py-5 text-[13px] text-faint md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Dr. Deepak Kumar · Arogya Clinic, Muzaffarpur</p>
            <p>
              {language === 'hi' ? 'संचालित' : 'Runs on'}{' '}
              <span className="font-semibold text-muted">Arogya Rx</span>
            </p>
          </div>
        </div>
      </footer>

      {/* mobile action bar — the two things a patient actually wants */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-paper/95 px-3 pt-2 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <a href={`tel:${PHONE_TEL}`} className="btn">
          <Icon n="call" size={20} />
          {language === 'hi' ? 'कॉल' : 'Call'}
        </a>
        <BookButton className="whitespace-nowrap">
          {language === 'hi' ? 'बुक करें' : 'Book now'}
        </BookButton>
      </div>
      <div className="h-[76px] lg:hidden" aria-hidden="true" />

      <DoctorIn10Widget />
    </div>
  );
}
