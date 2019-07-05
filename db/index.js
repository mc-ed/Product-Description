var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lowez-zporx.mongodb.net/main', {user: 'cjfizzle', pass: 'cjf114078145', useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connnected!');
});

var Schema = mongoose.Schema;

var Product = new Schema({
  descriptions:  [{description: String}],
  specs: [{title: String, spec: String}],
  reviews:   [{
      title: String,
      rating: Number,
      date: String,
      recommended: Boolean,
      text: String,
      author: String,
      verifiedPurchaser: Boolean,
      sweepstakesEntry: Boolean,
      helpful : { yes: Number, no: Number }
  }],
  questions : {}
});
