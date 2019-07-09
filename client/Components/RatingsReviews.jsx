import React from "react";
import uuidv4 from "uuid/v4";
import ReviewItem from "./ReviewItem.jsx";


function RatingsReviews(props) {
  console.log(props)

  function renderReviews() {
    let arr = [];
    for(let i = 0; i< props.count; i++) {
       arr.push(<>
      <ReviewItem key={uuidv4()} review={props.reviews[i]} />
      <hr />
      </>)
    }
    return arr;
  }
  const { backgroundColor } = props.style.lowesMedBackground;
  const signToggle = document.querySelector(
    'span[data="toggleRatingsReviewsSign"]'
  );
  const reviews = props.reviews.length ? (
    renderReviews()
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

  let fiveWidthValue = props.stats.starCounts ? ((props.stats.starCounts.five / props.stats.reviewCount) * 100) : 0
  let fourWidthValue = props.stats.starCounts ? ((props.stats.starCounts.four / props.stats.reviewCount) * 100) : 0
  let threeWidthValue = props.stats.starCounts ? ((props.stats.starCounts.three / props.stats.reviewCount) * 100) : 0
  let twoWidthValue = props.stats.starCounts ? ((props.stats.starCounts.two / props.stats.reviewCount) * 100) : 0
  let oneWidthValue = props.stats.starCounts ? ((props.stats.starCounts.one / props.stats.reviewCount) * 100) : 0

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
                  <h2 className="font-weight-bold">{props.stats.percentRecommended}%</h2>
                  <div className="font-weight-bold">
                    Recommended this product
                  </div>
                  <div>of {props.stats.reviewCount} reviews</div>
                </div>
                <div className="col-2 text-center" style={{ padding: "16px" }}>
                  <div>{props.stats.reviewCount} Ratings</div>
                  <div className={`stars${cssAdjust(props.stats.averageStars)}`} />
                  <small>{props.stats.averageStars} Average</small>
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
                            width: `${fiveWidthValue}%`
                          }}
                        >
                          {props.stats.starCounts ? props.stats.starCounts.five : 0}
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
                            width: `${fourWidthValue}%`
                          }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                        {props.stats.starCounts ? props.stats.starCounts.four : 0}
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
                            width: `${threeWidthValue}%`
                          }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                        {props.stats.starCounts ? props.stats.starCounts.three : 0}
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
                            width: `${twoWidthValue}%`
                          }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                        {props.stats.starCounts ? props.stats.starCounts.two : 0}
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
                            width: `${oneWidthValue}%`
                          }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                        {props.stats.starCounts ? props.stats.starCounts.one : 0}
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
              <h3 className="col-9">{props.stats.reviewCount} Reviews</h3>
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
            {props.count !== props.stats.reviewCount ? (
            <div onClick={()=> {props.moreReviews()}} className="lowesButton">Read {props.stats.reviewCount - props.count < 10 ? props.stats.reviewCount - props.count : 10} More</div>
            ) : (<></>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingsReviews;
