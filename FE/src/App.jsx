import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Appointments from './pages/Appointments';
import Reserve from './pages/Reserve';
import DoctorIn10Mins from './pages/DoctorIn10Mins';


export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="reserve" element={<Reserve />} />
            <Route path="doctor-in-10-mins" element={<DoctorIn10Mins />} />

          </Route>
        </Routes>
        <LanguageToggle />
      </BrowserRouter>
    </LanguageProvider>
  );
}
