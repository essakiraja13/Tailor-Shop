const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db.cjs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from root (for now, simpler than separating build)
app.use(express.static(path.join(__dirname, '../')));

// API: Create Order
app.post('/api/orders', (req, res) => {
    const { id, name, phone, service, status, timestamp } = req.body;
    const sql = `INSERT INTO orders (id, name, phone, service, status, timestamp) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [id, name, phone, service, status || 'placed', timestamp];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": req.body
        });
    });
});

// API: Get All Orders (Admin)
app.get('/api/orders', (req, res) => {
    const sql = "SELECT * FROM orders ORDER BY timestamp DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// API: Get Single Order (Tracking)
app.get('/api/orders/:id', (req, res) => {
    const sql = "SELECT * FROM orders WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (row) {
            res.json({
                "message": "success",
                "data": row
            });
        } else {
            res.status(404).json({ "message": "Order not found" });
        }
    });
});

// API: Update Order Status
app.put('/api/orders/:id', (req, res) => {
    const { status } = req.body;
    const sql = `UPDATE orders SET status = ? WHERE id = ?`;
    db.run(sql, [status, req.params.id], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: req.params.id, status }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
