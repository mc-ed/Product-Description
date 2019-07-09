const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const db = require('../db/index.js');
const axios = require('axios');
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/api/product/:id', (req, res) => {
    const { id } = req.params;
    db.Product.find({product_id: id}).then(data => res.send(data[0]))
});


app.get('')

app.listen(PORT, () => console.log('now listening on port: ' + PORT));
