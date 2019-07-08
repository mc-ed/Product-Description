var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lowez-zporx.mongodb.net/main', {user: 'cjfizzle', pass: process.env.databasePass, useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connnected!');
});

var Schema = mongoose.Schema;

var Product = new Schema({
  descriptions:  {
    overview: String,
    list: [
      {
        description: String
      }
    ]
  },
  specs: [
    {
      title: String, spec: String
    }
  ],
  reviews:   [
    {
      images: [
        {
          smallName: String,
          largeName: String
        }
      ],
      title: String,
      rating: Number,
      date: String,
      recommended: Boolean,
      text: String,
      author: String,
      verifiedPurchaser: Boolean,
      sweepstakesEntry: Boolean,
      helpful : { 
        yes: Number, 
        no: Number 
      }
    }
  ],
  questions : {}
});
