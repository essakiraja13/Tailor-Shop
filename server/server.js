import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const db = require('./db.cjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(compression());
app.use(cors());
app.use(bodyParser.json());

// Helper for DB Queries (Promisified)
const dbAll = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const dbGet = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const dbRun = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};

// API Routes
app.get('/api/orders', async (req, res) => {
    try {
        const rows = await dbAll('SELECT * FROM orders');
        const orders = rows.map(o => ({
            ...o,
            photos: o.photos ? JSON.parse(o.photos) : []
        }));
        // Cache for 10 seconds
        res.set('Cache-Control', 'public, max-age=10');
        res.json({ data: orders });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const row = await dbGet('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        if (row) {
            row.photos = row.photos ? JSON.parse(row.photos) : [];
            res.json({ data: row });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = req.body;
        if (!newOrder.id || !newOrder.name) {
            return res.status(400).json({ error: 'Invalid data' });
        }
        newOrder.timestamp = new Date().toISOString();
        newOrder.status = 'placed';
        newOrder.photos = newOrder.photos || [];

        await dbRun(
            `INSERT INTO orders (id, name, phone, service, status, timestamp, photos) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [newOrder.id, newOrder.name, newOrder.phone || '', newOrder.service, newOrder.status, newOrder.timestamp, JSON.stringify(newOrder.photos)]
        );

        res.json({ success: true, data: newOrder });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        const current = await dbGet('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        if (!current) return res.status(404).json({ error: 'Order not found' });

        const updated = { ...current, ...req.body }; // This is simplistic, practically we'd update specific fields
        // But for SQLite update, we construct the query based on body or just specific allowed fields?
        // Let's stick to updating status, etc.
        // Actually, let's just update the status and photos, or whatever fields are in body.

        // For simplicity in this demo, let's update common fields
        const name = req.body.name || current.name;
        const status = req.body.status || current.status;
        const photos = req.body.photos ? JSON.stringify(req.body.photos) : current.photos;

        await dbRun(
            `UPDATE orders SET name = ?, status = ?, photos = ? WHERE id = ?`,
            [name, status, photos, req.params.id]
        );

        const finalRow = await dbGet('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        finalRow.photos = finalRow.photos ? JSON.parse(finalRow.photos) : [];
        res.json({ success: true, data: finalRow });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Reminder Feature
app.post('/api/orders/:id/remind', async (req, res) => {
    try {
        const order = await dbGet('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        console.log(`[REMINDER SENT] To: ${order.name} (${order.id}) - "Your order is ready!"`);
        res.json({ success: true, message: 'Reminder sent successfully via WhatsApp/Email' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Seed Initial Data if Empty
(async () => {
    try {
        const row = await dbGet('SELECT count(*) as count FROM orders');
        if (row.count === 0) {
            console.log('Seeding initial data...');
            const seed = [
                {
                    id: 'SCH-1001',
                    name: 'Priya Sharma',
                    service: 'Bridal Blouse',
                    status: 'measurement',
                    timestamp: new Date().toISOString(),
                    photos: []
                },
                {
                    id: 'SCH-1002',
                    name: 'Anitha Raj',
                    service: 'Salwar Suit',
                    status: 'placed',
                    timestamp: new Date(Date.now() - 86400000).toISOString(),
                    photos: []
                }
            ];
            for (const o of seed) {
                await dbRun(
                    `INSERT INTO orders (id, name, phone, service, status, timestamp, photos) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [o.id, o.name, '', o.service, o.status, o.timestamp, JSON.stringify(o.photos)]
                );
            }
        }
    } catch (err) {
        console.error('Seeding error:', err);
    }
})();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
