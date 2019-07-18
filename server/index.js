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

const whitelist = ['http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com','http://lowesproxy-env.6tim4uzsty.us-east-2.elasticbeanstalk.com', 'http://ec2-18-188-213-241.us-east-2.compute.amazonaws.com', 'http://fec-proxy.us-east-1.elasticbeanstalk.com', 'http://search-banner.us-east-1.elasticbeanstalk.com', 'http://fec-lowes-carousel.us-east-2.elasticbeanstalk.com']
const whitelistRegex = /http:\/\/localhost.*/;
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1 || !origin || whitelistRegex.test(origin)) {
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

app.post("/api/question", (req, res) => {
  const {
    product_id,
    author,
    question
  } = req.body;
  if (req.validSession) {
    Session.findOne({ customerID: req.validSession.id }).exec((err, data) => {
      if(err) {
        res.status(500).send({err: "Bad Session ID", message: "Please delete your cookies and try again."})
      } else if (data.questions.includes(product_id)) {
        res.status(403).send({err: "Question already exists", message: "Looks like you have already submitted a question for this product. Thank you for your continued interest!"});
      } else {
        Product.updateOne(
          { product_id },
          {
            $push: {
              questions: {
                $each: [
                  {
                    author,
                    answers: [],
                    date: moment().format("l"),
                    question,
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
            res.status(500).send({err: "Unable to save question", message: "We are very sorry, we were unable to save your question at this moment. \n\nPlease try again later."})
          } else {
            Session.updateOne(
              { customerID: req.validSession.id },
              { $push: { questions: product_id } }
            ).exec((err, data) => {
              if (err) {
                console.log(err);
                res.status(500).send({err: "Unable to save question", message: "We are very sorry, we were unable to save your question at this moment. \n\nPlease try again later."})
              } else {
                res.status(201).send({title: "Question submitted - Thank you!", message: "From everyone here at Lowe's, We appreciate you taking the time to inquire about this product. \nWe have added your question to the page.\n\nGo take a look!"})
                setTimeout(() =>{sortDBQuestions(product_id)}, 1000);
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({err: "User doesn't exist", message: "Not a valid Session"})
  }
});


app.post("/api/review", (req, res) => {
  const starsArr = [null, "one", "two", "three", "four", "five"];
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
      if(err) {
        res.status(500).send({err: "Bad Session ID", message: "Please delete your cookies and try again."})
      } else if (data.reviews.includes(product_id)) {
        res.status(403).send({err: "Review already exists", message: "Looks like you have already submitted a review for this product. Thank you for your continued interest!"});
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
            res.status(500).send({err: "Unable to save review", message: "We are very sorry, we were unable to save your review at this moment. \n\nPlease try again later."})
          } else {
            Session.updateOne(
              { customerID: req.validSession.id },
              { $push: { reviews: product_id } }
            ).exec((err, data) => {
              if (err) {
                console.log(err);
                res.status(500).send({err: "Unable to save review", message: "We are very sorry, we were unable to save your review at this moment. \n\nPlease try again later."})
              } else {
                res.status(201).send({title: "Review submitted - Thank you!", message: "From everyone here at Lowe's, We appreciate you taking the time to review this product. \nWe have added your review to the page.\n\nGo take a look!"})
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
    res.status(400).send({err: "User doesn't exist", message: "Not a valid Session"})
  }
});

app.get('/api/search', (req, res) => {
  const {product_id, type, string} = req.query;
  const queryArr = string.split(/[\s-]/)
  Product.findOne({ product_id },{questions: 1}).exec((err, results) => {
    let filtered = results.questions.filter(question => {
      let split = question.question.split(/[\s-]/);
      for(let part of queryArr) {
        const regEx = new RegExp('^"?'+part+".*")
        for(let word of split) {
          if(regEx.test(word.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    })
    res.send(filtered);
  })
});

app.get('/api/questions/:id', (req, res) => {
  const {id} = req.params;
  const {type} = req.query;
  if(type === 'default') {
    Product.findOne({ product_id: id }, { questions: 1 }).then(data => res.send(data.questions))
  } else if(type === "newest" || type === "oldest" || type === 'needed' || type === 'recentlyAnswered') {
    Product.findOne({ product_id: id }, { questions: 1 }).then(data => {
      sorted = data.questions.sort((a, b) => {
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
        } else if(type === 'needed') {
          return a.answers.length - b.answers.length || moment(strB).unix() - moment(strA).unix();;
        } else if(type === 'recentlyAnswered') {
          let AA;
          let BB;
          if(a.answers.length) {
            AA = a.answers[0].date.split("/");
          } else {
            AA = '05/05/1995';
            AA = AA.split("/");
          }
          if(b.answers.length) {
            BB = b.answers[0].date.split("/");
          } else {
            BB = '05/05/1975';
            BB = BB.split("/");
          }
          let strAA = `${AA[2].padStart(2, "0")}-${AA[0].padStart(
            2,
            "0"
          )}-${AA[1].padStart(2, "0")}`;
          let strBB = `${BB[2].padStart(2, "0")}-${BB[0].padStart(
            2,
            "0"
          )}-${BB[1].padStart(2, "0")}`;
          return moment(strBB).unix() - moment(strAA).unix();
        }
      });
      res.send(sorted);
    });
  }

})

app.get("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const review = Number(req.query.review) || 0;
	const type = req.query.type;
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


function sortDBQuestions(id) {
  Product.findOne({product_id : id}).exec((err, results) => {
    if(err) {
      console.log(err);
    } else {
      results.questions.sort((questionA, questionB) => {
        return questionB.answers.length - questionA.answers.length;
      })
      Product.updateOne({product_id: id}, results).exec((err, results) => {
        if(err) {
          console.log(err)
        } else {
          console.log('sorted product questions')
        }
      })
    }
  })
}