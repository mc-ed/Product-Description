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
    const review = Number(req.query.review) || 0;
    if(!review) {
        db.Product.findOne({product_id: id},{reviews:{$slice: [review, 20]}}).then(data => res.send(data))
    } else {
        db.Product.findOne({product_id: id}, { descriptions: 0, questions: 0, reviewStats: 0, specs: 0, reviews: { $slice: [review, 10] } }).exec((err,data) => res.send(data))
    }
});


app.get('')

app.listen(PORT, () => console.log('now listening on port: ' + PORT));
