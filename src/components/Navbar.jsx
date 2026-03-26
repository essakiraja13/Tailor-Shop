import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const translations = {
  en: { home: 'Home', about: 'About', services: 'Services', gallery: 'Gallery', pricing: 'Pricing', contact: 'Contact' },
  ta: { home: 'முகப்பு', about: 'எங்களைப் பற்றி', services: 'சேவைகள்', gallery: 'டைலர் வேலைப்பாடுகள்', pricing: 'விலைப்பட்டியல்', contact: 'தொடர்பு கொள்ள' },
  ml: { home: 'ഹോം', about: 'ഞങ്ങളെ കുറിച്ച്', services: 'സേവനങ്ങൾ', gallery: 'ഗാലറി', pricing: 'വിലകൾ', contact: 'ബന്ധപ്പെടുക' },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const location = useLocation();

  const t = translations[lang];

  function cycleLang() {
    setLang(prev => prev === 'en' ? 'ta' : prev === 'ta' ? 'ml' : 'en');
  }

  function langLabel() {
    return lang === 'en' ? 'தமிழ்' : lang === 'ta' ? 'മലയാളം' : 'English';
  }

  const navLinks = [
    { to: '/', label: t.home },
    { to: '/about', label: t.about },
    { to: '/collections', label: 'Collections' },
    { to: '/services', label: t.services },
    { to: '/gallery', label: t.gallery },
    { to: '/measurement-guide', label: 'Measure Guide' },
    { to: '/pricing', label: t.pricing },
    { to: '/track', label: 'Track Order' },
    { to: '/contact', label: t.contact },
  ];

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <img src="/assets/images/logo.png" alt="Selvi Couture House" style={{ height: '50px', objectFit: 'contain' }} />
        </Link>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)}>
          <i className="fas fa-bars"></i>
        </button>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`nav-link${location.pathname === link.to ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button className="btn btn-gold" style={{ padding: '0.4rem 1rem' }} onClick={cycleLang}>
              {langLabel()}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
