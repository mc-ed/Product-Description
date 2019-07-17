const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const moment = require("moment");
const { Product, Session, Report } = require("../db/index.js");
const axios = require("axios");
const cors = require("cors");
const cookieSetting = require("./middleWare/cookies.js");
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const padStart = require('./poly/padStart.js');

const whitelist = ['http://localhost:3050', 'http://lowesproxy-env.6tim4uzsty.us-east-2.elasticbeanstalk.com']
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}



app.set("trust proxy", true);
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser("LowesUsesJQuery!"));
app.use("/*", cookieSetting);

app.get("/api/helpful/:itemID", (req, res, next) => {
  const { itemID } = req.params;
  const helpfulID = req.query.id;
  const selection = req.query.selection;
  if (req.validSession) {
    const { id } = req.validSession;
    Session.findOne({ customerID: id, responses: helpfulID }).exec(
      (err, data) => {
        if (err) {
          console.log(err);
          res.send({ allow: false });
        } else {
          if (data) {
            res.send({ allow: false });
          } else {
            Session.updateOne(
              { customerID: id },
              { $push: { responses: helpfulID } }
            ).exec((err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log("successful reponse to user record: ", data);
                if (selection === "yes" || selection === "no") {
                  let input =
                    selection === "yes"
                      ? "reviews.$.helpful.yes"
                      : "reviews.$.helpful.no";
                  Product.update(
                    {
                      product_id: itemID,
                      "reviews._id": helpfulID
                    },
                    { $inc: { [input]: 1 } }
                  ).exec((err, data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.send({ allow: true });
                    }
                  });
                } else if (selection === "report") {
                  const report = new Report({
                    product_id: itemID,
                    review_id: helpfulID,
                    reported_by: req.validSession.id
                  });
                  report.save((err, data) => {
                    if (err) {
                      console.log("error creating report", err);
                      res.send({ reported: false });
                    } else {
                      res.send({ reported: true });
                    }
                  });
                }
              }
            });
          }
        }
      }
    );
  }
});

app.post("/api/review", (req, res) => {
  const starsArr = [null, "one", "two", "three", "four", "five"];
  console.log(req.validSession);

  const {
    product_id,
    author,
    title,
    description,
    stars,
    recommended,
    purchased
  } = req.body;
  if (req.validSession) {
    Session.findOne({ customerID: req.validSession.id }).exec((err, data) => {
      if (data.reviews.includes(product_id)) {
        res.sendStatus(403);
      } else {
        Product.updateOne(
          { product_id },
          {
            $push: {
              reviews: {
                $each: [
                  {
                    author,
                    images: [],
                    date: moment().format("l"),
                    title,
                    text: description,
                    rating: Number(stars),
                    recommended,
                    verifiedPurchaser: purchased,
                    sweepstakesEntry: false,
                    helpful: {
                      yes: 0,
                      no: 0
                    }
                  }
                ],
                $position: 0
              }
            }
          }
        ).exec((err, data) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            Session.updateOne(
              { customerID: req.validSession.id },
              { $push: { reviews: product_id } }
            ).exec((err, data) => {
              if (err) {
                console.log(err);
                res.sendStatus(500);
              } else {
                res.sendStatus(201);
              }
            });
            Product.findOne(
              { product_id },
              { reviewStats: 1, reviews: 1 }
            ).exec((err, data) => {
              if (err) {
                console.log(err);
              } else {
                let stats = data.reviewStats;
                stats.starCounts[starsArr[stars]]++;
                let totalRec = data.reviews.reduce((total, review) => {
                  return (total += review.recommended ? 1 : 0);
                }, 0);
                stats.reviewCount++;
                if (recommended) {
                  totalRec++;
                }
                stats.percentRecommended = Math.floor(
                  (totalRec / stats.reviewCount) * 100
                ).toString();
                stats.averageStars = newAvg(stats.starCounts);
                Product.updateOne(
                  { product_id },
                  { $set: { reviewStats: stats } }
                ).exec((err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("updated Stats!");
                  }
                });
              }
            });
          }
        });
      }
    });
  } else {
    res.sendStatus(400);
  }
});

app.get("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const review = Number(req.query.review) || 0;
	const type = req.query.type;
	console.log(review, type)
  if (type || type.length) {
    let sorted;
    if (type === "newest" || type === "oldest" || type === 'highest' || type === 'lowest') {
      Product.findOne({ product_id: id }, { reviews: 1 }).then(data => {
        sorted = data.reviews.sort((a, b) => {
          let A = a.date.split("/");
          let B = b.date.split("/");
          let strA = `${A[2].padStart(2, "0")}-${A[0].padStart(
            2,
            "0"
          )}-${A[1].padStart(2, "0")}`;
          let strB = `${B[2].padStart(2, "0")}-${B[0].padStart(
            2,
            "0"
          )}-${B[1].padStart(2, "0")}`;
          if (type === "newest") {
            return moment(strB).unix() - moment(strA).unix();
          } else if(type === 'oldest'){
            return moment(strA).unix() - moment(strB).unix();
          } else if(type === 'highest') {
						return b.rating - a.rating;
					} else if(type === 'lowest') {
						return a.rating - b.rating;
					}
				});
				if(!review || review === 0) {
					res.send({reviews: sorted.slice(0, 20)});
				} else {
					res.send({reviews:sorted.slice(review, review + 10)});
				}
			});
			return
		}
  }
  if (!review) {
    Product.findOne(
      { product_id: id },
      { reviews: { $slice: [review, 20] } }
		).then(data => res.send(data))
			.catch(err => console.log(err))
  } else {
    Product.findOne(
      { product_id: id },
      {
        descriptions: 0,
        questions: 0,
        reviewStats: 0,
        specs: 0,
        reviews: { $slice: [review, 10] }
      }
    ).exec((err, data) => res.send(data));
  }
});

app.get("/api/stats/:id", (req, res) => {
  const { id } = req.params;
  if (id === "all") {
    Product.find({}, { reviewStats: 1 }).exec((err, data) => res.send(data));
  } else {
    Product.findOne({ product_id: id }, { reviewStats: 1 }).exec((err, data) =>
      res.send(data)
    );
  }
});

app.use("/", express.static(path.join(__dirname, "../public")));
app.listen(PORT, () => console.log("now listening on port: " + PORT));

function newAvg(counts) {
  let total = 0;
  let avg = 0;
  total += counts.five;
  avg += counts.five * 5;
  total += counts.four;
  avg += counts.four * 4;
  total += counts.three;
  avg += counts.three * 3;
  total += counts.two;
  avg += counts.two * 2;
  total += counts.one;
  avg += counts.one * 1;
  return (avg / total).toFixed(1).toString();
}
