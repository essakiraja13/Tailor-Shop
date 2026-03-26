import React, { useState, useEffect } from 'react';

const galleryItems = [
  { src: '/assets/images/design-1.jpg', alt: 'Blue Saree Design', category: 'blouses' },
  { src: '/assets/images/design-2.png', alt: 'Maroon Bridal Blouse', category: 'bridal' },
  { src: '/assets/images/design-3.jpg', alt: 'Blue Puff Sleeve Blouse', category: 'blouses' },
  { src: '/assets/images/design-4.jpg', alt: 'Maroon Blouse Details', category: 'bridal' },
  { src: '/assets/images/design-5.jpg', alt: 'Intricate Blue Pink Blouse', category: 'blouses' },
];

const filters = ['All', 'Blouses', 'Bridal', 'Salwars', 'Gowns'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.classList.add('js-loaded');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeFilter.toLowerCase());

  return (
    <>
      <header className="page-header" style={{ background: 'var(--primary-maroon)', padding: '8rem 0 4rem', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Design Gallery</h1>
          <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>Our latest creations for inspiration</p>
        </div>
      </header>

      <section id="gallery" className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="gallery-filters" style={{ marginBottom: '3rem' }}>
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >{f}</button>
            ))}
          </div>
          <div className="gallery-grid reveal">
            {filtered.map(item => (
              <div className="gallery-item" key={item.src} data-category={item.category} onClick={() => setLightbox(item)}>
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" style={{ cursor: 'pointer' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" style={{ display: 'flex' }} onClick={() => setLightbox(null)}>
          <span className="close-lightbox" onClick={() => setLightbox(null)}>&times;</span>
          <img className="lightbox-img" src={lightbox.src} alt={lightbox.alt} onClick={e => e.stopPropagation()} />
          <div className="lightbox-caption">{lightbox.alt}</div>
        </div>
      )}
    </>
  );
}
