const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const http = require('http');

const db = require('./utils/dbConfig');
const constants = require('./constants');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const filePath = path.join(__dirname, "logs", "request.log");
const accessLogStream = fs.createWriteStream(filePath, { flags: 'a' });

app.use(morgan(':method :url :status :res[content-length] :response-time ms', { stream: accessLogStream }));
app.use(morgan(':method :url :status :res[content-length] :response-time ms'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/test', (req, res) => {
    res.status(200).send('Api working successfully');
});

// Routes
const login = require('./routes/loginRoutes');

// Endpoints
app.use('/api/login', login);

app.listen(constants.PORT, () => {
    console.log(`Server is running on http://localhost:${constants.PORT}`);
});