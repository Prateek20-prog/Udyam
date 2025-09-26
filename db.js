
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2008',
    database: 'janata_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1); // Exit if DB connection fails
    } else {
        console.log('Connected to MySQL database!');
    }
});

// Optional: handle connection errors after initial connect
connection.on('error', (err) => {
    console.error('MySQL error:', err.message);
});

module.exports = connection;

// Optional: handle connection errors after initial connect
connection.on('error', (err) => {
    console.error('MySQL error:', err.message);
});

module.exports = connection;


