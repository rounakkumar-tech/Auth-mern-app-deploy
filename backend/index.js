const express = require('express');
const app = express();
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouters');

require('dotenv').config();
require('./Models/db');

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use(express.json());
app.use(cors());
app.use('/auth', AuthRouter);

module.exports = app;