const express = require('express');
const path = require('path');
const app = express();
const db = require('../db/index.js');
const data = require('./dummyData.json');
const axios = require('axios');

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/api/product/:id', (req, res) => {
    res.send(data)
});


app.put('/saveImage/:url', (req,res) => {
    console.log(req.body);

})

app.listen(3050);
