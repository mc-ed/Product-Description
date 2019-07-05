import React from "react";
import ReviewItem from './ReviewItem.jsx'

function RatingsReviews(props) {
  const { backgroundColor } = props.style.lowesMedBackground;
  const signToggle = document.querySelector(
    'span[data="toggleRatingsReviewsSign"]'
  );
  return (
    <div
      onClick={() => {
        props.onClick(signToggle);
      }}
      className="card"
    >
      <div
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
                  <h2 className="font-weight-bold">94%</h2>
                  <div className="font-weight-bold">
                    Recommended this product
                  </div>
                  <div>of 104 reviews</div>
                </div>
                <div className="col-2 text-center" style={{ padding: "16px" }}>
                  <div>109 Ratings</div>
                  <div className="stars5" />
                  <small>5.0 Average</small>
                </div>
                <div className="col-6">
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="stars5" />
                    </div>
                    <div className="col-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-lowes"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          89
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="stars4" />
                    </div>
                    <div className="col-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-lowes"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          89
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="stars3" />
                    </div>
                    <div className="col-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-lowes"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          89
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="stars2" />
                    </div>
                    <div className="col-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-lowes"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          89
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-2">
                      <div className="stars1" />
                    </div>
                    <div className="col-10">
                      <div class="progress">
                        <div
                          class="progress-bar bg-lowes"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          89
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
            <div className="row bg-grey" style={{paddingTop: '12px', marginTop: '16px'}}>
              <h3 className='col-9'>109 Reviews</h3>
              <div className='col-3'>
                <select className='select-box' name="sortReviewBy" id="sortReviewBy">
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
            <div data="all the reviews">
              <ReviewItem  recommended={ true } />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingsReviews;
