const mysql = require('mysql2');

// Create a connection pool to the MySQL database
const db = mysql.createPool({
    host: 'localhost', // Replace with your MySQL host
    user: 'root',      // Replace with your MySQL username
    password: 'manoj123', // Replace with your MySQL password
    database: 'storecart'   // Replace with your database name
});

// Check the database connection
db.getConnection((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;