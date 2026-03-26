import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', service: "Women's Blouse", date: '' });
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const id = 'SCH-' + Math.floor(1000 + Math.random() * 9000);
    const orderData = { id, name: form.name, phone: form.phone, service: form.service, status: 'placed', timestamp: new Date().toISOString() };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then(r => r.json())
      .then(() => { setOrderId(id); setSubmitted(true); })
      .catch(() => alert('Error saving booking. Please try again.'));
  }

  return (
    <>
      <header className="page-header" style={{ background: 'var(--primary-maroon)', padding: '8rem 0 4rem', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Get in Touch</h1>
          <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>Book your slot or visit our boutique</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <h2 className="section-title" style={{ textAlign: 'left', left: 0, transform: 'none' }}>Contact Details</h2>
              <p style={{ marginBottom: '2rem' }}>Visit us for a personal consultation and measurement session.</p>
              <div style={{ marginBottom: '2rem' }}>
                <p><strong><i className="fas fa-map-marker-alt"></i> Address:</strong></p>
                <p>9/732, Sri Nagar, Thalaiyuthu, Shankar Nagar, Tirunelveli, TamilNadu 627-357</p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <p><strong><i className="fas fa-phone"></i> Phone:</strong></p>
                <p>+91 81226 98966</p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <p><strong><i className="fas fa-envelope"></i> Email:</strong></p>
                <p>sasiselvi.234@gmail.com</p>
              </div>
              <div className="map-container" style={{ borderRadius: '8px', overflow: 'hidden', height: '250px' }}>
                <iframe
                  src="https://maps.google.com/maps?q=9/732,%20Sri%20Nagar,%20Thalaiyuthu,%20Shankar%20Nagar,%20Tirunelveli,%20TamilNadu%20627-357&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location"
                ></iframe>
              </div>
            </div>

            <div className="reveal">
              <h2 className="section-title" style={{ textAlign: 'left', left: 0, transform: 'none' }}>Book Appointment</h2>
              {submitted ? (
                <div style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                  <h2 style={{ color: '#800000', marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
                  <p style={{ color: '#666', marginBottom: '1.5rem' }}>Thank you, <strong>{form.name}</strong>! Your <strong>{form.service}</strong> appointment is booked.</p>
                  <div style={{ background: '#FFF8E7', border: '2px solid #FFD700', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.3rem' }}>Your Order ID</p>
                    <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#800000', letterSpacing: '2px' }}>{orderId}</p>
                    <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.3rem' }}>Save this ID to track your order</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => navigator.clipboard.writeText(orderId).then(e => e.target.textContent = '✅ Copied!')}
                      style={{ background: '#800000', color: 'white', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 600 }}>
                      📋 Copy ID
                    </button>
                    <a href={`https://wa.me/918122698966?text=Hi!%20I%20just%20booked.%20My%20Order%20ID%20is%20${orderId}%20(${encodeURIComponent(form.name)}%20-%20${encodeURIComponent(form.service)})`}
                      target="_blank" rel="noreferrer"
                      style={{ background: '#25D366', color: 'white', textDecoration: 'none', padding: '0.7rem 1.5rem', borderRadius: '50px', fontWeight: 600 }}>
                      💬 Share on WhatsApp
                    </a>
                  </div>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', service: "Women's Blouse", date: '' }); }}
                    style={{ marginTop: '1.2rem', background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}>
                    Book Another
                  </button>
                </div>
              ) : (
                <form id="booking-form" className="booking-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" required placeholder="Enter your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-input" required placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Service</label>
                    <select className="form-select" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                      <option>Women's Blouse</option>
                      <option>Salwar</option>
                      <option>Bridal</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Confirm Booking</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
