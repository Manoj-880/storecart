const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./utils/dbConfig');
const constants = require('./constants');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Example route to get data from MySQL
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
});

// Example route to add a user
app.get('/test', (req, res) => {
    res.status(200).send('Api working successfully');
});

// Start the server
app.listen(constants.PORT, () => {
    console.log(`Server is running on http://localhost:${constants.PORT}`);
});
