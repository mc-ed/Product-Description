const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const moment = require('moment');
const { Product, Session, Report } = require("../db/index.js");
const axios = require("axios");
const cors = require("cors");
const cookieSetting = require("./middleWare/cookies.js");
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");

app.set("trust proxy", true);
app.use(express.json());
app.use(cors());
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

  const {
    product_id,
    author,
    title,
    description,
    stars,
    recommended,
    purchased
  } = req.body;
  Product.updateOne(
    {product_id},
    {
      $push: {
        reviews: {
          $each: [
            {
              author,
              images : [],
              date : moment().format('l'),
              title,
              text : description,
              rating: Number(stars),
              recommended,
              verifiedPurchaser: purchased,
              sweepstakesEntry: false,
              helpful: {
                  yes: 0,
                  no : 0
              }
            }
          ],
          $position: 0
        }
      }
    }
  ).exec((err,data) => {
    if(err) {
        res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
  })
  // Needs to reupdate the ReviewStats when I a new Review is added, emit event to other components;
});

app.get("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const review = Number(req.query.review) || 0;
  if (!review) {
    Product.findOne(
      { product_id: id },
      { reviews: { $slice: [review, 20] } }
    ).then(data => res.send(data));
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
  Product.findOne({ product_id: id })
    .select("reviewStats")
    .exec((err, data) => res.send(data));
});

app.use("/", express.static(path.join(__dirname, "../public")));
app.listen(PORT, () => console.log("now listening on port: " + PORT));
