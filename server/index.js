const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto'); // Beépített modul a véletlenszám-generáláshoz
const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./romlott_zokni.db', (err) => {
    if (!err) console.log("Adatbázis aktív.");
});

// Véletlenszerű, egyedi azonosító generáló függvény (pl: RZ-X8F2-A9P1)
function generateOrderCode() {
    return 'RZ-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

db.serialize(() => {
    // Hozzáadtuk az order_code oszlopot UNIQUE megkötéssel
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_code TEXT UNIQUE, 
        email TEXT,
        address TEXT,
        payment_method TEXT,
        total_price INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        product_name TEXT,
        size TEXT,
        price INTEGER,
        FOREIGN KEY(order_id) REFERENCES orders(id)
    )`);
});

const tourDates = [
    { id: 1, date: '2026.05.20', city: 'Budapest', venue: 'Penészes Pince', ticketUrl: 'https://peneszespince.hu/tickets' },
    { id: 2, date: '2026.06.05', city: 'Debrecen', venue: 'Szakadt Húr Pub', ticketUrl: 'https://szakadthur.hu/jegyek' },
    { id: 3, date: '2026.06.12', city: 'Szeged', venue: 'Zajos Garázs', ticketUrl: 'https://zajosgarazs.hu/booking' },
    { id: 4, date: '2026.06.20', city: 'Győr', venue: 'Rozsdás Gyár', ticketUrl: 'https://rozsdasgyar.hu/merch' },
    { id: 5, date: '2026.07.04', city: 'Pécs', venue: 'Füstös Alagsor', ticketUrl: 'https://fustos-alagsor.hu/entry' },
    { id: 6, date: '2026.07.18', city: 'Miskolc', venue: 'Gépzaj Klub', ticketUrl: 'https://gepzaj-miskolc.hu/tickets' },
    { id: 7, date: '2026.08.01', city: 'Veszprém', venue: 'Beton Kert', ticketUrl: 'https://betonkert.hu/info' },
    { id: 8, date: '2026.08.15', city: 'Sopron', venue: 'Zokni-fesztivál', ticketUrl: 'https://zoknifest.hu/vip' },
    { id: 9, date: '2026.08.29', city: 'Eger', venue: 'Vár-Árok Underground', ticketUrl: 'https://vararok.hu/tickets' },
    { id: 10, date: '2026.09.12', city: 'Székesfehérvár', venue: 'Kód-Kocsma', ticketUrl: 'https://kodkocsma.hu/jegy' },
    { id: 11, date: '2026.10.10', city: 'Kecskemét', venue: 'Bit-Bár', ticketUrl: 'https://bitbar.hu/event' },
    { id: 12, date: '2026.11.07', city: 'Budapest', venue: 'Záró-Káosz Aréna', ticketUrl: 'https://arena.hu/romlottzokni' }
];

app.get('/api/tour-dates', (req, res) => res.json(tourDates));

// RENDELÉS LEADÁSA - MENTÉS AZ ADATBÁZISBA
app.post('/api/checkout', (req, res) => {
    const { email, address, cart, total, payment } = req.body;

    // 1. Mentés az 'orders' táblába
    const orderSql = `INSERT INTO orders (email, address, payment_method, total_price) VALUES (?, ?, ?, ?)`;
    
    db.run(orderSql, [email, address, payment, total], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        const lastOrderId = this.lastID; // Megkapjuk a generált ID-t

        // 2. Mentés az 'order_items' táblába minden tételre
        const itemSql = `INSERT INTO order_items (order_id, product_name, size, price) VALUES (?, ?, ?, ?)`;
        
        cart.forEach(item => {
            db.run(itemSql, [lastOrderId, item.name, item.selectedSize, item.price]);
        });

        console.log(`✅ Új rendelés mentve az adatbázisba! ID: ${lastOrderId}`);
        res.status(201).json({ 
            message: "RENDELÉS SIKERESEN MENTVE AZ ADATBÁZISBA!", 
            orderId: "RZ-" + lastOrderId 
        });
    });
});

app.listen(5000, () => console.log("Szerver fut az 5000-es porton"));