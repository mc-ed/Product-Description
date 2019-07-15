const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const {Product, Session} = require('../db/index.js');
const axios = require('axios');
const cors = require('cors');
const cookieSetting = require('./middleWare/cookies.js')
const PORT = process.env.PORT || 3000
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookieParser('LowesUsesJQuery!'))
app.use('/*', cookieSetting )

app.get('/helpful/:id', (req, res, next) => {
    const itemID = req.params.id;
    console.log(itemID, req.validSession);
    if(req.validSession) {
        const {id} = req.validSession;
        Session.findOne({customerID : id}).exec((err, data) => res.send({err, data}))
    }
})

app.use('/', express.static(path.join(__dirname, '../public')));


app.get('/api/product/:id', (req, res) => {
    const { id } = req.params;
    const review = Number(req.query.review) || 0;
    if(!review) {
        Product.findOne({product_id: id},{reviews:{$slice: [review, 20]}}).then(data => res.send(data))
    } else {
        Product.findOne({product_id: id}, { descriptions: 0, questions: 0, reviewStats: 0, specs: 0, reviews: { $slice: [review, 10] } }).exec((err,data) => res.send(data))
    }
});

app.get('/api/stats/:id', (req,res) => {
    const { id } = req.params;
    Product.findOne({product_id: id}).select('reviewStats').exec((err,data) => res.send(data))
})


app.listen(PORT, () => console.log('now listening on port: ' + PORT));
