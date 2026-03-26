import React, { useState, useEffect, useRef } from 'react';

const stages = ['placed', 'measurement', 'stitching', 'ready', 'delivered'];
const stageLabels = ['Placed', 'Measure', 'Stitching', 'Ready', 'Delivered'];

export default function Track() {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');
  const intervalRef = useRef(null);

  function handleTrack(e) {
    e.preventDefault();
    if (!orderId.trim()) { setError('Please enter an Order ID.'); return; }
    setError('');

    fetch(`/api/orders/${orderId.trim()}`)
      .then(r => { if (!r.ok) throw new Error('not found'); return r.json(); })
      .then(json => { setOrderData(json.data); startAutoRefresh(); })
      .catch(() => {
        if (orderId.toUpperCase() === 'DEMO123') {
          setOrderData({ id: 'DEMO123', name: 'Demo User', service: 'Bridal Blouse', status: 'ready' });
        } else {
          setError('Order ID not found. Please check and try again.');
          setOrderData(null);
        }
      });
  }

  function startAutoRefresh() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      fetch(`/api/orders/${orderId.trim()}`)
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(json => setOrderData(json.data))
        .catch(() => { });
    }, 30000);
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const currentIndex = orderData ? stages.indexOf(orderData.status) : -1;

  return (
    <>
      <header className="page-header" style={{ background: 'var(--primary-maroon)', padding: '8rem 0 4rem', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Track Order</h1>
          <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>Check your stitching progress</p>
        </div>
      </header>

      <section id="track" className="section">
        <div className="container">
          <div className="tracking-container reveal" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ marginBottom: '2rem' }}>Enter your Order ID to check status.</p>
            <form style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }} onSubmit={handleTrack}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. SCH-2024"
                style={{ flex: 1 }}
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Track</button>
            </form>

            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

            {orderData && (
              <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '0.5rem' }}>Order #{orderData.id}</h3>
                <p style={{ color: '#666', marginBottom: '2rem' }}>{orderData.service} - {orderData.name}</p>

                <div className="storage-timeline">
                  {stages.map((stage, i) => (
                    <div key={stage} className={`storage-step${i <= currentIndex ? ' active' : ''}`} id={`status-${stage}`}>
                      <div className="step-dot"></div>
                      <div className="step-label">{stageLabels[i]}</div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: '0.75rem', color: '#25D366', marginTop: '0.8rem', fontWeight: 600 }}>
                  🟢 Live tracking active (refreshes every 30s)
                </p>

                {orderData.photos && orderData.photos.length > 0 && (
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>Work in Progress</h4>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {orderData.photos.map((url, i) => (
                        <img key={i} src={url} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer' }}
                          onClick={() => window.open(url, '_blank')} alt="Progress" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
