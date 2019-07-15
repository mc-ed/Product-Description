var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://lowez-zporx.mongodb.net/main", {
  user: "cjfizzle",
  pass: "cjf114078145",
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connnected!");
});

var Schema = mongoose.Schema;

var SessionSchema = new mongoose.Schema({
      customerID: String,
      timeStamp: { type: Date, default: Date.now },
      responses: [String]
});

var ReportSchema = new mongoose.Schema({
  product_id: Number,
  review_id: String,
  reported_by: String
})

var ProductSchema = new mongoose.Schema({
  product_id : Number,
  descriptions: {
    overview: String,
    list: [String]
  },
  specs: [
    {
      title: String,
      spec: Schema.Types.Mixed
    }
  ],
  reviews: [
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
      helpful: {
        yes: Number,
        no: Number
      }
    }
  ],
  reviewStats : {
    reviewCount: Number,
    percentRecommended: String,
    averageStars: String,
    starCounts: {
      five: Number,
      four: Number,
      three: Number,
      two: Number,
      one: Number,
    }
  },
  questions: [
    {
      question: String,
      author: String,
      date: String,
      answers: [
        {
          badgeName: String,
          author: String,
          date: String,
          text: String,
          helpful: {
            yes: Number,
            no: Number
          }
        }
      ]
    }
  ]
});

const Product = mongoose.model("Product", ProductSchema);
const Session = mongoose.model("Session", SessionSchema);
const Report = mongoose.model("Report", ReportSchema);

// let data = require("../data/product43.json");
// const product = new Product({product_id: 43 ,...data});


// function saveIt(i) {
//   i = i || 1
//   if(i > 100) {return;}
//     let data = require(`../data/product${i}.json`);
//     let product = new Product({product_id: `${i}` ,...data});
//     product.save((err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("success");
//         saveIt(++i)
//       }
//     });
//   }

//   saveIt();


module.exports = {
  Product,
  Session,
  Report
};
