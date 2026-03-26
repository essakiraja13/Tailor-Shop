import React, { useState } from 'react';

const pricing = [
  { service: 'Blouse Stitching (Normal)', price: '₹500', delivery: '3 Days' },
  { service: 'Blouse with Lining', price: '₹800', delivery: '4 Days' },
  { service: 'Princess Cut Blouse', price: '₹1200', delivery: '5 Days' },
  { service: 'Salwar Kameez', price: '₹900', delivery: '5 Days' },
  { service: 'Designer Gown', price: '₹1500', delivery: '7 Days' },
  { service: 'Aari Work (Bridal)', price: '₹2000', delivery: '10-15 Days' },
];

export default function Pricing() {
  const [showPayModal, setShowPayModal] = useState(false);

  return (
    <>
      <header className="page-header" style={{ background: 'var(--primary-maroon)', padding: '8rem 0 4rem', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Pricing Guide</h1>
          <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>Transparent rates for premium quality</p>
        </div>
      </header>

      <section id="pricing" className="section">
        <div className="container">
          <div className="pricing-container reveal">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Starting From</th>
                  <th>Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map(row => (
                  <tr key={row.service}>
                    <td>{row.service}</td>
                    <td>{row.price}</td>
                    <td>{row.delivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>* Prices vary based on design complexity and fabric type. Express delivery available.</p>

            {/* Loyalty Program */}
            <div style={{ background: 'var(--bg-creme)', border: '2px dashed var(--secondary-gold)', padding: '2rem', marginTop: '3rem', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--primary-maroon)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>👑 Customer Loyalty Program</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>We value your trust!</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-gold)' }}>5</span>
                  <span style={{ fontSize: '0.9rem' }}>Orders Completed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', color: '#aaa' }}>➡</div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-maroon)' }}>FREE</span>
                  <span style={{ fontSize: '0.9rem' }}>1 Alteration</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowPayModal(true)}>
                <i className="fas fa-qrcode"></i> Pay Advance Online
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPayModal && (
        <div className="modal" style={{ display: 'flex' }} onClick={e => e.target === e.currentTarget && setShowPayModal(false)}>
          <div className="modal-content" style={{ textAlign: 'center' }}>
            <span className="close-payment" onClick={() => setShowPayModal(false)}>&times;</span>
            <h2 style={{ color: 'var(--primary-maroon)' }}>Scan to Pay</h2>
            <p>Use any UPI App to pay advance</p>
            <div style={{ margin: '2rem 0', padding: '1rem', border: '2px dashed var(--primary-gold)', display: 'inline-block' }}>
              <i className="fas fa-qrcode" style={{ fontSize: '10rem', color: '#333' }}></i>
            </div>
            <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>UPI ID: selvicouture@oksbi</p>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '1rem' }}>After payment, please share screenshot on WhatsApp.</p>
          </div>
        </div>
      )}
    </>
  );
}
