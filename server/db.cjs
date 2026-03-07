const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create DB file in server directory
const dbPath = path.resolve(__dirname, 'tailor.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            name TEXT,
            phone TEXT,
            service TEXT,
            status TEXT,
            timestamp DATETIME,
            photos TEXT
        )`);

        // Add indexes for performance
        db.run(`CREATE INDEX IF NOT EXISTS idx_phone ON orders(phone)`);
        db.run(`CREATE INDEX IF NOT EXISTS idx_status ON orders(status)`);

        console.log('Orders table and indexes ready.');
    });
}

module.exports = db;
