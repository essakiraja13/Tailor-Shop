import React, { useState, useEffect } from 'react';

export default function Preloader() {
  return (
    <div id="preloader" style={{ opacity: 1 }}>
      <div className="loader-content">
        <img src="/assets/images/logo.png" alt="Selvi Couture House Loader" style={{ height: '100px', animation: 'pulse 1.5s infinite' }} />
      </div>
    </div>
  );
}
