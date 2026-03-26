import React, { useState } from 'react';

const guides = {
  blouse: {
    title: 'Blouse Measurement Guide',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder',
    steps: [
      { icon: 'fa-arrows-alt-h', title: '1. Shoulder', desc: 'Measure from one shoulder bone to the other across the back.' },
      { icon: 'fa-ruler-horizontal', title: '2. Chest/Bust', desc: 'Measure around the fullest part of your chest, keeping tape relaxed.' },
      { icon: 'fa-compress-arrows-alt', title: '3. Waist', desc: 'Measure around your natural waistline where the blouse ends.' },
    ],
  },
  salwar: {
    title: 'Salwar & Kurti Guide',
    steps: [
      { icon: 'fa-arrows-alt-v', title: '1. Full Length', desc: 'Measure from shoulder to your desired length (knee/ankle).' },
      { icon: 'fa-child', title: '2. Hip', desc: 'Measure around the widest part of your hips.' },
      { icon: 'fa-tshirt', title: '3. Sleeve Length', desc: 'Measure from shoulder edge to desired sleeve end.' },
    ],
  },
  men: {
    title: "Men's Shirt & Pant",
    steps: [
      { icon: null, title: 'Shirt: Collar', desc: 'Measure around the neck, leaving one finger gap.' },
      { icon: null, title: 'Shirt: Chest', desc: 'Measure under armpits around the fullest part of chest.' },
      { icon: null, title: 'Pant: Waist', desc: 'Measure where you normally wear your pants.' },
    ],
  },
};

export default function MeasurementGuide() {
  const [activeTab, setActiveTab] = useState('blouse');
  const guide = guides[activeTab];

  return (
    <>
      <header className="hero" style={{ height: '40vh', background: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/assets/images/hero-banner.webp')", backgroundPosition: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3rem' }}>Measurement Guide</h1>
          <p style={{ color: 'var(--primary-gold)', fontSize: '1.2rem' }}>How to measure yourself perfectly at home</p>
        </div>
      </header>

      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {Object.entries({ blouse: 'Blouse Guide', salwar: 'Salwar/Kurti', men: "Men's Wear" }).map(([key, label]) => (
              <button key={key}
                className={`guide-tab-btn${activeTab === key ? ' active' : ''}`}
                onClick={() => setActiveTab(key)}
                style={{ padding: '1rem 2rem', background: activeTab === key ? 'var(--primary-maroon)' : 'white', border: '1px solid var(--primary-maroon)', color: activeTab === key ? 'white' : 'var(--primary-maroon)', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s' }}
              >{label}</button>
            ))}
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', animation: 'fadeIn 0.5s ease-out' }}>
            <h2 className="section-title">{guide.title}</h2>

            {guide.video && (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000', marginBottom: '2rem', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe
                  width="560" height="315" src={guide.video}
                  title="YouTube video player" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                ></iframe>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2rem', marginTop: '2rem' }}>
              {guide.steps.map(step => (
                <div key={step.title} style={{ textAlign: 'center' }}>
                  {step.icon && (
                    <div style={{ width: '100%', height: '200px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', marginBottom: '1rem', border: '2px dashed #ddd' }}>
                      <i className={`fas ${step.icon} fa-3x`}></i>
                    </div>
                  )}
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
