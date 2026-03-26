import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  // Scroll reveal
  useEffect(() => {
    document.body.classList.add('js-loaded');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Quick Actions */}
      <div className="container" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <Link to="/contact?service=blouse" className="btn btn-gold" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}><i className="fas fa-tshirt"></i> Book Blouse</Link>
        <Link to="/contact?service=aari" className="btn btn-gold" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}><i className="fas fa-gem"></i> Book Aari</Link>
        <Link to="/contact?service=uniform" className="btn btn-gold" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}><i className="fas fa-user-nurse"></i> Uniforms</Link>
        <Link to="/contact?service=alteration" className="btn btn-gold" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}><i className="fas fa-cut"></i> Alteration</Link>
      </div>

      {/* Hero */}
      <header id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Perfect Stitching • Perfect Fit</h1>
            <p className="hero-tagline">Experience the art of premium tailoring with on-time delivery.</p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">Book Appointment</Link>
              <a href="tel:+918122698966" className="btn btn-secondary">Call Now</a>
            </div>
          </div>
        </div>
      </header>

      {/* About Summary */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image reveal">
              <img src="/assets/images/about-us.webp" alt="Selvi Couture House Interior" loading="lazy" decoding="async" />
            </div>
            <div className="about-content reveal">
              <h2 className="section-title" style={{ textAlign: 'left', left: 0, transform: 'none' }}>About Us</h2>
              <p style={{ marginBottom: '2rem' }}>
                Established in 2024, Selvi Couture House brings the finest craftsmanship to Tamil Nadu. We specialize in Aari work, Bridal Blouses, and custom-fit dresses for women and children.
              </p>
              <Link to="/about" className="btn btn-secondary">Read Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section" style={{ background: 'var(--bg-creme)' }}>
        <div className="container">
          <h2 className="section-title">Our Expertise</h2>
          <div className="services-grid">
            {[
              { icon: 'fa-ring', title: 'Bridal Stitching', desc: 'Exclusive bridal blouses with Aari work and embroidery.' },
              { icon: 'fa-female', title: "Women's Boutique", desc: 'Blouses, Salwars, Lehengas, and Saree falls.' },
              { icon: 'fa-child', title: 'Kids Wear', desc: 'Traditional Pattu Pavadai and Party wear for girls.' },
            ].map(s => (
              <div className="service-card reveal" key={s.title}>
                <i className={`fas ${s.icon} service-icon`}></i>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--bg-creme)' }}>
        <div className="container">
          <h2 className="section-title">What Our Clients Say ❤️</h2>
          <div className="testimonials-grid">
            {[
              { initial: 'P', name: 'Priya Sharma', location: 'Chennai', bg: 'linear-gradient(135deg,#FFD700,#800000)', text: '"The bridal blouse stitching was absolutely perfect! The Aari work was intricate and beautiful. Delivered on time for my wedding. Highly recommended!"' },
              { initial: 'L', name: 'Lakshmi K.', location: 'Madurai', bg: 'linear-gradient(135deg,#800000,#a00000)', text: '"My daughter\'s Pattu Pavadai came out stunning. Perfect fit, premium fabric, and amazing stitching quality. Will definitely come back for more!"' },
              { initial: 'A', name: 'Anitha R.', location: 'Tirunelveli', bg: 'linear-gradient(135deg,#4a0050,#800000)', text: '"Very professional and on-time delivery. I ordered 3 salwar sets and all came out perfectly stitched. The price is also very reasonable."' },
            ].map(t => (
              <div className="testimonial-card reveal" key={t.name}>
                <p>{t.text}</p>
                <div className="testimonial-author">
                  <div style={{ width: '50px', height: '50px', minWidth: '50px', borderRadius: '50%', background: t.bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>{t.initial}</div>
                  <div>
                    <h4>{t.name}</h4>
                    <small>⭐⭐⭐⭐⭐ &nbsp;{t.location}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Designs */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Trending Designs 🏆</h2>
          <div className="gallery-grid">
            {[
              { src: '/assets/images/design-2.png', label: 'Best Seller' },
              { src: '/assets/images/design-3.jpg', label: 'Most Viewed' },
              { src: '/assets/images/design-5.jpg', label: 'Premium' },
            ].map(item => (
              <div className="gallery-item" key={item.label}>
                <img src={item.src} alt={item.label} loading="lazy" />
                <div style={{ position: 'absolute', bottom: 0, background: 'rgba(0,0,0,0.7)', color: 'white', width: '100%', padding: '0.5rem', textAlign: 'center' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/gallery" className="btn btn-secondary" style={{ borderColor: 'var(--primary-maroon)', color: 'var(--primary-maroon)' }}>View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--primary-maroon)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '1rem', color: 'white' }}>Ready for a Perfect Fit?</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Book your measurement session online today.</p>
          <Link to="/contact" className="btn btn-gold">Book Appointment Now</Link>
        </div>
      </section>
    </>
  );
}
