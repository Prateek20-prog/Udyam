// Log all incoming requests for debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send('NGO website is running!');
});

// Add a new user with validation and better error handling
app.post('/register', (req, res) => {
    const { fullname, email, role, password } = req.body;
    if (!fullname || !email || !role || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const sql = 'INSERT INTO users (fullname, email, role, password) VALUES (?, ?, ?, ?)';
    connection.query(sql, [fullname, email, role, password], (err, result) => {
        if (err) {
            console.error('DB Insert Error:', err.message);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.json({ message: 'User registered successfully!', userId: result.insertId });
    });
});

// Orphanage Registration (register.html)
app.post('/orphanage-register', (req, res) => {
    const { name, email, phone, address, password } = req.body;
    if (!name || !email || !phone || !address || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const sql = 'INSERT INTO orphanages (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, phone, address, password], (err, result) => {
        if (err) {
            console.error('Orphanage Insert Error:', err.message);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.json({ message: 'Orphanage registered successfully!', id: result.insertId });
    });
});

// Donor Registration (donor.html)
app.post('/donor-register', (req, res) => {
    const { name, age, income, document, side } = req.body;
    if (!name || !age || !income || !document || !side) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const sql = 'INSERT INTO donors (name, age, income, document, side) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, age, income, document, side], (err, result) => {
        if (err) {
            console.error('Donor Insert Error:', err.message);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.json({ message: 'Donor registered successfully!', id: result.insertId });
    });
});

// Contact Form (contact.html)
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Contact Insert Error:', err.message);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.json({ message: 'Message sent successfully!', id: result.insertId });
    });
});


// 404 handler (always returns JSON)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler (always returns JSON)
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


