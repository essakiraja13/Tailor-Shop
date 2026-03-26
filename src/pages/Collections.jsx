import React, { useState } from 'react';

const products = [
  { id: 'BL01', category: 'blouse', img: '/assets/images/blouse1.jpg', title: 'Red Bridal Aari Blouse', price: '₹2,500', badge: 'Trending' },
  { id: 'KD01', category: 'kids', img: '/assets/images/kids1.jpg', title: 'Green Pattu Pavadai', price: '₹1,800' },
  { id: 'DP01', category: 'dupatta', img: '/assets/images/dupatta1.jpg', title: 'Banarasi Silk Dupatta', price: '₹950' },
  { id: 'BL02', category: 'blouse', img: '/assets/images/blouse2.jpg', title: 'Golden Sequence Blouse', price: '₹1,200' },
];

const filters = ['all', 'blouse', 'dupatta', 'kids'];

export default function Collections() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? products : products.filter(p => p.category === active);

  return (
    <>
      <nav className="navbar" style={{ display: 'none' }}></nav>
      <header className="hero" style={{ minHeight: '50vh', background: "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/assets/images/shop-banner.png')" }}>
        <div className="container">
          <div className="hero-content" style={{ textAlign: 'center', margin: '0 auto' }}>
            <h1>Ready-Made Collections</h1>
            <p className="hero-tagline">Exclusive Designer Wear. Ready to Ship.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem 0', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} className={`filter-btn${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1) === 'All' ? 'All' : f === 'blouse' ? 'Blouses' : f === 'dupatta' ? 'Dupattas' : 'Kids Wear'}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2rem', padding: '2rem 0' }}>
            {filtered.map(p => (
              <div key={p.id} className="product-card" style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.3s', position: 'relative' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {p.badge && <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--primary-gold)', color: 'black', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>{p.badge}</span>}
                <img src={p.img} alt={p.title} style={{ height: '300px', width: '100%', objectFit: 'cover', background: '#eee' }}
                  onError={e => { e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(p.title)}`; }} loading="lazy" decoding="async"
                />
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>{p.title}</h3>
                  <span style={{ color: 'var(--primary-maroon)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', display: 'block' }}>{p.price}</span>
                  <a href={`https://wa.me/918122698966?text=I'm interested in ${encodeURIComponent(p.title)} (Code: ${p.id})`}
                    className="btn btn-primary" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem' }}>
                    <i className="fab fa-whatsapp"></i> Buy Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
