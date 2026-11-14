import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import Layout from './components/Layout';
import Home from './pages/Home';

// Home ships in the main bundle; everything else splits out, so the first
// paint carries only what the landing page needs.
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Reserve = lazy(() => import('./pages/Reserve'));
const DoctorIn10Mins = lazy(() => import('./pages/DoctorIn10Mins'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteFallback() {
  return (
    <div className="wrap grid min-h-[55vh] place-items-center">
      <div className="flex items-center gap-3 text-muted">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-line-2 border-t-ink" />
        <span className="text-[15px]">Loading…</span>
      </div>
    </div>
  );
}

// The router is passed in: BrowserRouter in the browser (main.jsx),
// StaticRouter when pre-rendering (entry-server.jsx).
export default function App({ Router, routerProps = {} }) {
  return (
    <LanguageProvider>
      <Router {...routerProps}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="reserve" element={<Reserve />} />
              <Route path="doctor-in-10-mins" element={<DoctorIn10Mins />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        <LanguageToggle />
      </Router>
    </LanguageProvider>
  );
}
