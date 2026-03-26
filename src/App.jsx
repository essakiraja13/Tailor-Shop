import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import Chatbot from './components/Chatbot.jsx';
import BackToTop from './components/BackToTop.jsx';
import Preloader from './components/Preloader.jsx';

// Lazy load pages for code-splitting (faster initial load time)
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Collections = lazy(() => import('./pages/Collections.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Track = lazy(() => import('./pages/Track.jsx'));
const MeasurementGuide = lazy(() => import('./pages/MeasurementGuide.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      
      {/* Suspense handles the loading state of lazily evaluated components */}
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track" element={<Track />} />
          <Route path="/measurement-guide" element={<MeasurementGuide />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>

      <Footer />
      <FloatingActions />
      <BackToTop />
      <Chatbot />
    </>
  );
}
