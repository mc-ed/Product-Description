import React from "react";

function RatingsReviews(props) {
  const { backgroundColor } = props.style.lowesMedBackground;
  const signToggle = document.querySelector('span[data="toggleRatingsReviewsSign"]');
  return (
    <div onClick={ ()=> { props.onClick(signToggle) } } className="card">
      <div
        style={{ backgroundColor, cursor: "pointer" }}
        className="card-header"
        id="headingThree"
        data-toggle="collapse"
        data-target="#collapseThree"
        aria-expanded="true"
        aria-controls="collapseThree"
      >
        <span className="iconFont">{ '\uECE0 ' }</span>
        <span className="text-white font-weight-bold">Reviews and Ratings</span>
        <span data='toggleRatingsReviewsSign' className="float-right plusSign"></span>
      </div>

      <div
        id="collapseThree"
        className="collapse"
        aria-labelledby="headingThree"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <div data="component container">
            <div data="header container">
              <h4>Ratings Summary</h4>
              <div data="summary section container">
                <div data="percent recommended container">
                  <div>94%</div>
                  <div>Recommended this product</div>
                  <div>of 104 reviews</div>
                </div>
                <div data="average rating container">
                  <div>109 Ratings</div>
                  <i data="star graphic">*****</i>
                  <div>5.0 Average</div>
                </div>
                <div data="star breakdown container">
                  <div data="single star container">
                    <div>5 Stars</div>
                    <div>Progress Bar</div>
                    <div>89</div>
                  </div>
                  <div data="single star container">
                    <div>4 Stars</div>
                    <div>Progress Bar</div>
                    <div>89</div>
                  </div>
                  <div data="single star container">
                    <div>3 Stars</div>
                    <div>Progress Bar</div>
                    <div>89</div>
                  </div>
                  <div data="single star container">
                    <div>2 Stars</div>
                    <div>Progress Bar</div>
                    <div>89</div>
                  </div>
                  <div data="single star container">
                    <div>1 Stars</div>
                    <div>Progress Bar</div>
                    <div>89</div>
                  </div>
                </div>
                <div>
                  <button>Write a review</button>
                </div>
              </div>
            </div>
            <div data="review nav container">
              <div>109 Reviews</div>
              <select name="sortReviewBy" id="sortReviewBy">
                <option defaultValue="Most Relevant">
                  Most Relevant
                </option>
                <option value="Newest to Oldest">
                  Newest to Oldest
                </option>
                <option value="Oldest to Newest">
                  Oldest to Newest
                </option>
                <option value="Highest to Lowest Rating">
                  Highest to Lowest Rating
                </option>
                <option value="Lowest to Highest Rating">
                  Lowest to Highest Rating
                </option>
              </select>
            </div>
            <div data="all the reviews">
              <div data="single review">
                <h4>"Title for Review in Quotes"</h4>
                <div data="review details" className="border-right">
                  <div data="star data">
                    <i data="star Rating">*****</i>
                  </div>
                  <div data="reviewed data">
                    <small>Reviewed on 4/4/1019</small>
                  </div>
                  <div data="recommended data">
                    <i data="check mark">check</i>
                    <small>Rocemmended</small>
                  </div>
                  <div data="description">
                    <p>
                      The review description goes here. It's needs to be
                      colisiple and expandable
                    </p>
                  </div>
                  <a>Expand and Collapse the description</a>
                </div>
                <div>
                  <p className="font-weight-bold">Reviewer's name</p>
                  <p>Was this review helpful?</p>
                  <div data="button container">
                    <button>Yes</button>
                    <button>No</button>
                    <div>
                      <i data="flag">flag</i>
                      <a>Report</a>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingsReviews;
