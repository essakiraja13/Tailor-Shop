import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
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
      {/* Page Header */}
      <header className="page-header" style={{ background: 'var(--primary-maroon)', padding: '8rem 0 4rem', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Our Story</h1>
          <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>Crafting elegance since 2024</p>
        </div>
      </header>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image reveal">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
                alt="Selvi Couture House Interior" loading="lazy" decoding="async"
              />
            </div>
            <div className="about-content reveal">
              <h2 className="section-title" style={{ textAlign: 'left', left: 0, transform: 'none' }}>About Us</h2>
              <h3>Exclusive Ladies &amp; Bridal Studio</h3>
              <p style={{ marginBottom: '1rem' }}>
                Established in 2024, Selvi Couture House brings the finest craftsmanship to Tamil Nadu. We specialize in Aari work, Bridal Blouses, and custom-fit dresses for women and children.
              </p>
              <p>Our master cutters ensure a perfect fit every time, blending traditional values with modern fashion trends.</p>
              <div className="about-stats">
                {[['1000+', 'Happy Clients'], ['500+', 'Bridal Orders'], ['24h', 'Express Delivery']].map(([num, label]) => (
                  <div className="stat-item" key={label}>
                    <span className="stat-number">{num}</span>
                    <span className="stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section" style={{ background: 'var(--bg-creme)' }}>
        <div className="container">
          <h2 className="section-title reveal">How We Work</h2>
          <div className="timeline reveal">
            {[
              { icon: 'fa-clipboard-list', step: 'Order Placed', desc: 'Book online or visit us' },
              { icon: 'fa-ruler-combined', step: 'Measurement', desc: 'Precise body fittings' },
              { icon: 'fa-pencil-alt', step: 'Pattern & Cut', desc: 'Master cutter at work' },
              { icon: 'fa-tshirt', step: 'Stitching', desc: 'Expert tailoring' },
              { icon: 'fa-check-circle', step: 'Delivery', desc: 'On-time pickup/drop' },
            ].map(item => (
              <div className="timeline-step" key={item.step}>
                <div className="timeline-icon"><i className={`fas ${item.icon}`}></i></div>
                <h4>{item.step}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
