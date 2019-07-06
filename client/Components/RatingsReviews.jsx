import React from "react";
import uuidv4 from "uuid/v4";
import ReviewItem from "./ReviewItem.jsx";

function RatingsReviews(props) {
  const { backgroundColor } = props.style.lowesMedBackground;
  const signToggle = document.querySelector(
    'span[data="toggleRatingsReviewsSign"]'
  );
  const reviews = props.reviews.length ? (
    props.reviews.map(review => (
      <ReviewItem key={uuidv4()} readMore={props.readMore} review={review} />
    ))
  ) : (
    <div />
  );

  function percentRecommended() {
    if (!props.reviews.length) {
      return "";
    } else {
      let recommendedCount = 0;
      props.reviews.forEach(review => {
        if (review.recommended) {
          recommendedCount++;
        }
      });
      return Math.floor(
        (recommendedCount / props.reviews.length) * 100
      ).toString();
    }
  }

  function cssAdjust(num) {
    num = Math.round(num * 2) / 2;
    num = num.toString().split("");
    num = !num[2] ? num[0] : `${num[0]}_${num[2]}`;
    return num;
  }

  function averageStars() {
    if (!props.reviews.length) {
      return "5.0";
    } else {
      let starSum = 0;
      props.reviews.forEach(review => {
        starSum += review.rating;
      });
      return (starSum / props.reviews.length).toFixed(1).toString();
    }
  }

  function countStars(stars) {
    if (!props.reviews.length) {
      return 0;
    } else {
      let count = 0;
      props.reviews.forEach(review => {
        if (review.rating === stars) {
          count++;
        }
      });
      return count;
    }
  }

  return (
    <div className="card">
      <div
        onClick={() => {
          props.onClick(signToggle);
        }}
        style={{ backgroundColor, cursor: "pointer" }}
        className="card-header"
        id="headingThree"
        data-toggle="collapse"
        data-target="#collapseThree"
        aria-expanded="true"
        aria-controls="collapseThree"
      >
        <span className="iconFont">{"\uECE0 "}</span>
        <span className="text-white font-weight-bold">Reviews and Ratings</span>
        <span
          data="toggleRatingsReviewsSign"
          className="float-right plusSign"
        />
      </div>

      <div
        id="collapseThree"
        className="collapse"
        aria-labelledby="headingThree"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <div data="component container">
            <div data="container-fluid">
              <h6 className="font-weight-bold">Ratings Summary</h6>
              <div className="row">
                <div
                  className="col-2 text-center bg-grey"
                  style={{ padding: "16px" }}
                >
                  <h2 className="font-weight-bold">{percentRecommended()}%</h2>
                  <div className="font-weight-bold">
                    Recommended this product
                  </div>
                  <div>of {props.reviews.length} reviews</div>
                </div>
                <div className="col-2 text-center" style={{ padding: "16px" }}>
                  <div>{props.reviews.length} Ratings</div>
                  <div className={`stars${cssAdjust(averageStars())}`} />
                  <small>{averageStars()} Average</small>
                </div>
                <div className="col-6">
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="stars5" />
                    </div>
                    <div className="col-10">
                      <div className="progress">
                        <div
                          className="progress-bar bg-lowes"
                          role="progressbar"
                          style={{
                            width: `${(countStars(5) / props.reviews.length) *
                              100}%`
                          }}
                        >
                          {countStars(5)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="stars4" />
                    </div>
                    <div className="col-10">
                      <div className="progress">
                        <div
                          className="progress-bar bg-lowes"
                          role="progressbar"
                          style={{
                            width: `${(countStars(4) / props.reviews.length) *
                              100}%`
                          }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {countStars(4)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="stars3" />
                    </div>
                    <div className="col-10">
                      <div className="progress">
                        <div
                          className="progress-bar bg-lowes"
                          role="progressbar"
                          style={{
                            width: `${(countStars(3) / props.reviews.length) *
                              100}%`
                          }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {countStars(3)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="stars2" />
                    </div>
                    <div className="col-10">
                      <div className="progress">
                        <div
                          className="progress-bar bg-lowes"
                          role="progressbar"
                          style={{
                            width: `${(countStars(2) / props.reviews.length) *
                              100}%`
                          }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {countStars(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="stars1" />
                    </div>
                    <div className="col-10">
                      <div className="progress">
                        <div
                          className="progress-bar bg-lowes"
                          role="progressbar"
                          style={{
                            width: `${(countStars(1) / props.reviews.length) *
                              100}%`
                          }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {countStars(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2 wrapper">
                  <span className="lowesButton content">WRITE A REVIEW</span>
                </div>
              </div>
            </div>
            <div
              className="row bg-grey"
              style={{ paddingTop: "12px", marginTop: "16px" }}
            >
              <h3 className="col-9">{props.reviews.length} Reviews</h3>
              <div className="col-3">
                <select
                  className="select-box"
                  name="sortReviewBy"
                  id="sortReviewBy"
                >
                  <option defaultValue="Most Relevant">Most Relevant</option>
                  <option value="Newest to Oldest">Newest to Oldest</option>
                  <option value="Oldest to Newest">Oldest to Newest</option>
                  <option value="Highest to Lowest Rating">
                    Highest to Lowest Rating
                  </option>
                  <option value="Lowest to Highest Rating">
                    Lowest to Highest Rating
                  </option>
                </select>
              </div>
            </div>
            <div data="all the reviews">{reviews}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingsReviews;
