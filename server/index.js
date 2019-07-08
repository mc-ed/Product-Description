const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const db = require('../db/index.js');
const data = require('./dummyData.json');
const axios = require('axios');
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/api/product/:id', (req, res) => {
    res.send(data)
});


app.put('/saveImage/:url', (req,res) => {
    console.log(req.body);

})

app.listen(PORT, () => console.log('now listening on port: ' + PORT));
