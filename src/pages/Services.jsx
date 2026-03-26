import React, { useState, useEffect } from 'react';

const fabricSuggestions = {
  Wedding: { High: 'Heavy Aari Work on Raw Silk or Velvet.', Medium: 'Embroidery on Silk Cotton or Mix Silk.', Low: 'Embroidery on Silk Cotton or Mix Silk.' },
  Party: { High: 'Designer Georgette or Organza with trendy cuts.', Medium: 'Designer Georgette or Organza with trendy cuts.', Low: 'Designer Georgette or Organza with trendy cuts.' },
  Office: { High: 'Cotton or Linen Kurti with subtle piping.', Medium: 'Cotton or Linen Kurti with subtle piping.', Low: 'Cotton or Linen Kurti with subtle piping.' },
  Daily: { High: 'Comfortable Cotton or Rayon blends.', Medium: 'Comfortable Cotton or Rayon blends.', Low: 'Comfortable Cotton or Rayon blends.' },
};

const faqs = [
  { q: 'Do you provide home pickup & delivery?', a: 'Yes, we offer home pickup and delivery services in selected areas for orders above ₹2000.' },
  { q: 'How long does it take for a bridal blouse?', a: 'Normal bridal blouses take 5-7 days. Heavy Aari work blouses may take 10-15 days.' },
];

export default function Services() {
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', neck: 'U Neck', sleeve: 'Short Sleeve', color: '' });

  useEffect(() => {
    document.body.classList.add('js-loaded');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (occasion && budget) {
      setSuggestion(fabricSuggestions[occasion]?.[budget] || '');
    } else {
      setSuggestion('');
    }
  }, [occasion, budget]);

  function handleCustomRequest(e) {
    e.preventDefault();
    const orderId = 'SCH-' + Math.floor(1000 + Math.random() * 9000);
    const serviceDesc = `Custom Design: ${form.neck}, ${form.sleeve}, ${form.color}`;
    const orderData = { id: orderId, name: form.name, phone: form.phone, service: serviceDesc, status: 'placed' };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then(r => r.json())
      .then(() => {
        alert('Your custom design request has been submitted! Order ID: ' + orderId);
        setForm({ name: '', phone: '', neck: 'U Neck', sleeve: 'Short Sleeve', color: '' });
      })
      .catch(() => alert('Error submitting request. Please try again.'));
  }

  return (
    <>
      <header className="page-header" style={{ background: 'var(--primary-maroon)', padding: '8rem 0 4rem', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Our Services</h1>
          <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>Expert tailoring for every occasion</p>
        </div>
      </header>

      {/* Services Grid */}
      <section id="services" className="section">
        <div className="container">
          <div className="services-grid">
            {[
              { icon: 'fa-child', title: 'Kids & Girls Wear', desc: 'Traditional Pattu Pavadai, Frocks, and Party wear for girls.' },
              { icon: 'fa-female', title: "Women's Tailoring", desc: 'Blouses, Salwars, Lehengas, and Saree falls.' },
              { icon: 'fa-ring', title: 'Bridal Stitching', desc: 'Exclusive bridal blouses with Aari work and embroidery.' },
              { icon: 'fa-cut', title: 'Alterations', desc: 'Perfect fitting adjustments for all types of garments.' },
            ].map(s => (
              <div className="service-card reveal" key={s.title}>
                <i className={`fas ${s.icon} service-icon`}></i>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fabric Suggestion */}
      <section className="section" style={{ background: 'var(--bg-creme)' }}>
        <div className="container">
          <h2 className="section-title">Fabric Suggestion Assistant 🧵</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Not sure what to choose? Let us help you!</p>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Occasion</label>
                <select className="form-select" value={occasion} onChange={e => setOccasion(e.target.value)}>
                  <option value="">Select Occasion</option>
                  <option value="Wedding">Wedding / Bridal</option>
                  <option value="Party">Party / Reception</option>
                  <option value="Office">Office / Formal</option>
                  <option value="Daily">Daily Wear</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Budget</label>
                <select className="form-select" value={budget} onChange={e => setBudget(e.target.value)}>
                  <option value="">Select Budget</option>
                  <option value="Low">Economy</option>
                  <option value="Medium">Standard</option>
                  <option value="High">Premium</option>
                </select>
              </div>
            </div>
            {suggestion && (
              <div style={{ background: '#fffbe6', padding: '1rem', border: '1px solid #ffe58f', borderRadius: '4px', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--primary-maroon)', fontSize: '1.2rem' }}>Our Recommendation</h3>
                <p style={{ fontWeight: 500 }}>{suggestion}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Custom Design Request */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Custom Design Request 🎨</h2>
          <div className="booking-form">
            <form onSubmit={handleCustomRequest}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" placeholder="Your Name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" placeholder="Your Phone" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Neck Design</label>
                  <select className="form-select" value={form.neck} onChange={e => setForm(f => ({ ...f, neck: e.target.value }))}>
                    {['U Neck', 'V Neck', 'Boat Neck', 'Collar Neck', 'Custom (Specify below)'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Sleeve Type</label>
                  <select className="form-select" value={form.sleeve} onChange={e => setForm(f => ({ ...f, sleeve: e.target.value }))}>
                    {['Short Sleeve', 'Elbow Sleeve', 'Full Sleeve', 'Puff Sleeve'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Color Preference</label>
                <input type="text" className="form-input" placeholder="e.g. Royal Blue with Gold" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Upload Reference Image (Optional)</label>
                <input type="file" className="form-input" accept="image/*" />
                <small style={{ color: '#666' }}>We will discuss this image on WhatsApp</small>
              </div>
              <input type="submit" value="Send Request via WhatsApp" className="btn btn-primary" style={{ width: '100%' }} />
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section" style={{ background: 'var(--bg-creme)' }}>
        <div className="container">
          <h2 className="section-title reveal">Client Love</h2>
          <div className="testimonials-grid reveal">
            {[
              { name: 'Priya S.', loc: 'Chennai', text: '"The fittings are absolutely perfect! I stitched my wedding blouse here with Aari work, and it came out stunning."' },
              { name: 'Lakshmi K.', loc: 'Madurai', text: '"Very professional service. They delivered my daughter\'s pattu pavadai on time as promised."' },
            ].map(t => (
              <div className="testimonial-card" key={t.name}>
                <p>{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar" style={{ background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-user"></i></div>
                  <div><h4>{t.name}</h4><small>{t.loc}</small></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <h2 className="section-title reveal">FAQ</h2>
          <div className="faq-container reveal">
            {faqs.map((faq, i) => (
              <div className={`faq-item${openFaq === i ? ' active' : ''}`} key={i}>
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <i className="fas fa-chevron-down faq-icon"></i>
                </div>
                <div className="faq-answer"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
