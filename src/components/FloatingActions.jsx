import React from 'react';

export default function FloatingActions() {
  return (
    <div className="floating-actions">
      <a href="https://wa.me/918122698966" className="float-btn whatsapp-btn" target="_blank" rel="noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
      <a href="tel:+918122698966" className="float-btn call-btn">
        <i className="fas fa-phone"></i>
      </a>
    </div>
  );
}
