import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Selvi Couture House</h3>
              <p>Your destination for premium custom tailoring in Tamil Nadu. We bring your dream designs to life.</p>
              <div className="social-links" style={{ marginTop: '1rem' }}>
                <a href="https://www.instagram.com/selvicouturehouse" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/selvicouturehouse" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://www.youtube.com/@selvicouturehouse" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h3>Contact Us</h3>
              <div className="map-container" style={{ marginBottom: '1rem', borderRadius: '4px', overflow: 'hidden' }}>
                <iframe
                  src="https://maps.google.com/maps?q=9/732,%20Sri%20Nagar,%20Thalaiyuthu,%20Shankar%20Nagar,%20Tirunelveli,%20TamilNadu%20627-357&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="150" style={{ border: 0 }} allowFullScreen loading="lazy" title="Shop Location"
                ></iframe>
              </div>
              <p><i className="fas fa-map-marker-alt"></i> 9/732, Sri Nagar, Thalaiyuthu, Shankar Nagar, Tirunelveli, TamilNadu 627-357</p>
              <p><i className="fas fa-phone"></i> +91 81226 98966</p>
              <p><i className="fas fa-envelope"></i> sasiselvi.234@gmail.com</p>
            </div>
            <div className="footer-col">
              <h3>Hours</h3>
              <p>Mon - Sat: 9:00 AM - 9:00 PM</p>
              <p>Sunday: Holiday</p>
              <div style={{ marginTop: '1rem', background: 'white', padding: '0.5rem', display: 'inline-block', borderRadius: '4px' }}>
                <p style={{ color: 'black', fontWeight: 'bold', marginBottom: '5px' }}>Scan to Pay</p>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=selvicouture@oksbi%26pn=SelviCouture%26cu=INR"
                  alt="UPI QR Code" width="100" height="100" loading="lazy" style={{ display: 'block' }}
                />
                <p style={{ color: '#555', fontSize: '0.75rem', marginTop: '4px' }}>selvicouture@oksbi</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; 2024 Selvi Couture House. All rights reserved. |{' '}
              <a href="#" onClick={e => { e.preventDefault(); setShowPrivacy(true); }} style={{ color: '#888', textDecoration: 'underline' }}>
                Privacy Policy
              </a>{' '}|{' '}
              <Link to="/admin" style={{ color: '#555', textDecoration: 'none', marginLeft: '10px' }}>Admin</Link>
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="modal" style={{ display: 'flex' }} onClick={e => e.target === e.currentTarget && setShowPrivacy(false)}>
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowPrivacy(false)}>&times;</span>
            <h2>Privacy Policy</h2>
            <p>At Selvi Couture House, we respect your privacy. We collect your name, phone number, and measurement details solely for the purpose of fulfilling your stitching orders. We do not share your data with any third parties.</p>
            <p>For any concerns, please contact us at sasiselvi.234@gmail.com.</p>
          </div>
        </div>
      )}
    </>
  );
}
