import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import https from 'https';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tailorshop';
const JWT_SECRET = process.env.JWT_SECRET || 'selvicouturesecret123';
const WA_PHONE = process.env.WHATSAPP_PHONE || '';
const WA_APIKEY = process.env.WHATSAPP_APIKEY || '';

// WhatsApp Notification via CallMeBot (free API)
// Setup: Message +34 644 62 84 32 on WhatsApp: "I allow callmebot to send me messages"
// Then add WHATSAPP_PHONE and WHATSAPP_APIKEY to .env
function sendWhatsApp(message) {
    if (!WA_PHONE || !WA_APIKEY) return; // Skip if not configured
    const encoded = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${WA_PHONE}&text=${encoded}&apikey=${WA_APIKEY}`;
    https.get(url, (res) => {
        console.log(`[WhatsApp] Notification sent. Status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error('[WhatsApp] Failed to send notification:', err.message);
    });
}

app.use(compression());
app.use(cors());
app.use(bodyParser.json());

// Serve Static Frontend Files (Vite Build)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.status(401).json({ error: 'Access Denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

// Define Order Schema and Model
const orderSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, default: '' },
    service: { type: String },
    status: { type: String, default: 'placed' },
    timestamp: { type: Date, default: Date.now },
    photos: { type: [String], default: [] }
});
const Order = mongoose.model('Order', orderSchema);

// Define Admin Schema
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const Admin = mongoose.model('Admin', adminSchema);

// API Routes
// API Routes
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin in the database
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }

        // Generate JWT token valid for 12 hours
        const token = jwt.sign({ role: 'admin', username: admin.username }, JWT_SECRET, { expiresIn: '12h' });
        res.json({ success: true, token });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

app.get('/api/orders', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find().sort({ timestamp: -1 });
        // Cache for 10 seconds
        res.set('Cache-Control', 'public, max-age=10');
        res.json({ data: orders });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ id: req.params.id });
        if (order) {
            res.json({ data: order });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const newOrderData = req.body;
        if (!newOrderData.id || !newOrderData.name) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        const newOrder = new Order({
            id: newOrderData.id,
            name: newOrderData.name,
            phone: newOrderData.phone || '',
            service: newOrderData.service,
            status: 'placed',
            photos: newOrderData.photos || []
        });

        await newOrder.save();
        // 🔔 Notify shop owner via WhatsApp
        sendWhatsApp(`🆕 New Booking!\nOrder: ${newOrder.id}\nName: ${newOrder.name}\nPhone: ${newOrder.phone || 'N/A'}\nService: ${newOrder.service}\nStatus: Placed`);
        res.json({ success: true, data: newOrder });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.put('/api/orders/:id', authenticateToken, async (req, res) => {
    try {
        const current = await Order.findOne({ id: req.params.id });
        if (!current) return res.status(404).json({ error: 'Order not found' });

        if (req.body.name) current.name = req.body.name;
        if (req.body.status) current.status = req.body.status;
        if (req.body.photos) current.photos = req.body.photos;

        await current.save();
        res.json({ success: true, data: current });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Reminder Feature
app.post('/api/orders/:id/remind', authenticateToken, async (req, res) => {
    try {
        const order = await Order.findOne({ id: req.params.id });
        if (!order) return res.status(404).json({ error: 'Order not found' });

        console.log(`[REMINDER SENT] To: ${order.name} (${order.id}) - "Your order is ready!"`);
        // 🔔 Notify shop owner via WhatsApp
        sendWhatsApp(`🛎️ Reminder!\nOrder: ${order.id}\nCustomer: ${order.name}\nPhone: ${order.phone || 'N/A'}\n"Your order is ready for pickup!"`);
        res.json({ success: true, message: 'Reminder sent successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Seed Initial Data if Empty
setTimeout(async () => {
    try {
        // Seed default Admin if it doesn't exist
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            console.log('Seeding default Admin user...');
            const defaultPassword = 'password123'; // Default password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(defaultPassword, salt);

            const newAdmin = new Admin({
                username: 'admin',
                password: hashedPassword
            });
            await newAdmin.save();
            console.log('Default Admin user created. Username: admin | Password: password123');
        }

        const count = await Order.countDocuments();
        if (count === 0) {
            console.log('Seeding initial data...');
            const seed = [
                {
                    id: 'SCH-1001',
                    name: 'Priya Sharma',
                    service: 'Bridal Blouse',
                    status: 'measurement',
                    photos: []
                },
                {
                    id: 'SCH-1002',
                    name: 'Anitha Raj',
                    service: 'Salwar Suit',
                    status: 'placed',
                    timestamp: new Date(Date.now() - 86400000), // 1 day ago
                    photos: []
                }
            ];
            await Order.insertMany(seed);
        }
    } catch (err) {
        console.error('Seeding error:', err.message);
    }
}, 3000);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
