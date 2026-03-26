import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = '/api';
const stages = ['placed', 'measurement', 'stitching', 'ready', 'delivered'];
const statusColors = { placed: '#FFF3CD', measurement: '#CCE5FF', stitching: '#E2D9F3', ready: '#D4EDDA', delivered: '#D6D8D9' };
const statusTextColors = { placed: '#856404', measurement: '#004085', stitching: '#6f42c1', ready: '#155724', delivered: '#383d41' };

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState('');
  const [photoModal, setPhotoModal] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');

  const getHeaders = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('adminToken')}` });

  const loadOrders = useCallback(() => {
    setLastUpdated('Loading...');
    fetch(`${API_BASE}/orders`, { headers: getHeaders() })
      .then(r => { if (r.status === 401 || r.status === 403) throw new Error('Unauthorized'); return r.json(); })
      .then(json => { setOrders(json.data || []); setLastUpdated('Last updated: ' + new Date().toLocaleTimeString()); })
      .catch(err => { if (err.message === 'Unauthorized') { localStorage.removeItem('adminToken'); setLoggedIn(false); } });
  }, []);

  useEffect(() => { if (loggedIn) loadOrders(); }, [loggedIn, loadOrders]);

  function login() {
    if (!username || !password) { alert('Please enter both fields.'); return; }
    fetch(`${API_BASE}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) })
      .then(r => r.json())
      .then(data => {
        if (data.success) { localStorage.setItem('adminToken', data.token); setLoggedIn(true); }
        else alert(data.error || 'Invalid credentials');
      })
      .catch(() => alert('Login failed. Ensure server is running.'));
  }

  function logout() { localStorage.removeItem('adminToken'); setLoggedIn(false); }

  function updateStatus(id, newStatus) {
    fetch(`${API_BASE}/orders/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify({ status: newStatus }) })
      .then(r => r.json()).then(() => loadOrders()).catch(() => alert('Failed to update status'));
  }

  function addPhoto(orderId) {
    const url = photoUrl.trim();
    if (!url) { alert('Please enter a photo URL.'); return; }
    fetch(`${API_BASE}/orders/${orderId}`)
      .then(r => r.json())
      .then(d => {
        const photos = [...(d.data.photos || []), url];
        return fetch(`${API_BASE}/orders/${orderId}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify({ photos }) });
      })
      .then(() => { setPhotoModal(null); setPhotoUrl(''); loadOrders(); alert('✅ Photo added!'); })
      .catch(() => alert('Failed to add photo'));
  }

  function sendReminder(id) {
    fetch(`${API_BASE}/orders/${id}/remind`, { method: 'POST', headers: getHeaders() })
      .then(r => r.json()).then(data => alert(data.success ? '✅ ' + data.message : data.error || 'Failed'));
  }

  const counts = stages.reduce((acc, s) => ({ ...acc, [s]: orders.filter(o => o.status === s).length }), {});
  const filtered = orders.filter(o => {
    const qs = search.toLowerCase();
    const matchSearch = o.id?.toLowerCase().includes(qs) || o.name?.toLowerCase().includes(qs) || o.phone?.includes(qs);
    return matchSearch && (statusFilter === 'all' || o.status === statusFilter);
  });

  const adminStyle = { fontFamily: "'Outfit', sans-serif", background: '#F5F1EB', minHeight: '100vh' };

  if (!loggedIn) {
    return (
      <div style={{ ...adminStyle, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg,#800000,#4a0000)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', textAlign: 'center', width: '340px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✂️</div>
          <h2 style={{ color: '#800000', marginBottom: '0.3rem', fontSize: '1.5rem' }}>Admin Login</h2>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Selvi Couture House</p>
          <input type="text" placeholder="Username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', padding: '0.9rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem' }} />
          <input type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ width: '100%', padding: '0.9rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem' }} />
          <button onClick={login} style={{ width: '100%', padding: '0.9rem', background: '#800000', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={adminStyle}>
      <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ color: '#800000', fontSize: '1.5rem' }}>✂️ Selvi Couture — Admin Dashboard</h1>
            <p style={{ color: '#888', fontSize: '0.85rem' }}>{lastUpdated}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{ background: '#eee', color: '#333', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>🏠 Site</Link>
            <button onClick={logout} style={{ background: '#800000', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[['Total', orders.length, '#800000'], ...stages.map(s => [s.charAt(0).toUpperCase() + s.slice(1), counts[s], statusTextColors[s]])].map(([label, val, color]) => (
            <div key={label} style={{ background: 'white', borderRadius: '12px', padding: '1.2rem', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderTop: '3px solid #800000' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: color || '#800000' }}>{val ?? '—'}</div>
              <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.2rem' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <input type="search" placeholder="🔍 Search by name or Order ID..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '200px', padding: '0.7rem 1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem' }} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '0.7rem 1rem', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
            <option value="all">All Status</option>
            {stages.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <button onClick={loadOrders} style={{ background: '#800000', color: 'white', border: 'none', padding: '0.7rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>

        {/* Table */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 15px rgba(0,0,0,0.06)', overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Order ID', 'Customer', 'Phone', 'Service', 'Status', 'Photos', 'Actions'].map(h => (
                  <th key={h} style={{ background: '#800000', color: 'white', padding: '1rem 0.8rem', textAlign: 'left', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#aaa', fontSize: '1.1rem' }}>📭 No orders found</td></tr>
              ) : filtered.map(order => (
                <tr key={order.id}>
                  <td style={{ padding: '0.9rem 0.8rem', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem' }}>
                    <strong style={{ color: '#800000' }}>{order.id}</strong>
                  </td>
                  <td style={{ padding: '0.9rem 0.8rem', borderBottom: '1px solid #f0f0f0' }}>{order.name}</td>
                  <td style={{ padding: '0.9rem 0.8rem', borderBottom: '1px solid #f0f0f0' }}>
                    {order.phone ? <a href={`tel:${order.phone}`} style={{ color: '#800000' }}>{order.phone}</a> : '—'}
                  </td>
                  <td style={{ padding: '0.9rem 0.8rem', borderBottom: '1px solid #f0f0f0' }}>{order.service || '—'}</td>
                  <td style={{ padding: '0.9rem 0.8rem', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: statusColors[order.status], color: statusTextColors[order.status] }}>
                      {order.status}
                    </span>
                    <br />
                    <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)}
                      style={{ marginTop: '0.4rem', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.85rem', cursor: 'pointer' }}>
                      {stages.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '0.9rem 0.8rem', borderBottom: '1px solid #f0f0f0' }}>
                    <button onClick={() => setPhotoModal(order.id)} style={{ padding: '0.4rem 0.8rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, background: '#555', color: 'white' }}>
                      📷 {order.photos?.length || 0} Photo{order.photos?.length !== 1 ? 's' : ''}
                    </button>
                  </td>
                  <td style={{ padding: '0.9rem 0.8rem', borderBottom: '1px solid #f0f0f0' }}>
                    <button onClick={() => sendReminder(order.id)} style={{ padding: '0.4rem 0.8rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, background: '#FFD700', color: 'black' }}>
                      🛎️ Remind
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Photo Modal */}
      {photoModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
          onClick={e => e.target === e.currentTarget && setPhotoModal(null)}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', width: '380px', maxWidth: '90%' }}>
            <h3 style={{ color: '#800000', marginBottom: '1rem' }}>📷 Add Progress Photo</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>Paste a photo URL</p>
            <input type="text" placeholder="https://example.com/photo.jpg" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '1rem' }} />
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button onClick={() => { setPhotoModal(null); setPhotoUrl(''); }} style={{ flex: 1, padding: '0.7rem', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', background: '#eee', color: '#333' }}>Cancel</button>
              <button onClick={() => addPhoto(photoModal)} style={{ flex: 1, padding: '0.7rem', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', background: '#800000', color: 'white' }}>Add Photo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
