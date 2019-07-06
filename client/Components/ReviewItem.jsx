import React from "react";
import uuidv4 from "uuid/v4";

function ReviewItem(props) {
  let recommendedStatus = props.recommended ? (
    <div data="recommended data">
      <span className="checkMark" />
      <small>Recommended</small>
    </div>
  ) : (
    <div />
  );

  function handleClick() {
    if (readMoreRef.innerText === "Read More") {
      textRef.classList.remove("fadeout");
      textRef.style.overflow = "visible";
      textRef.style.height = "auto";
      readMoreRef.innerText = "Read Less";
    } else {
      textRef.classList.add("fadeout");
      textRef.style.overflow = "hidden";
      textRef.style.height = "100px";
      readMoreRef.innerText = "Read More";
    }
  }

  const { title, rating, date, text, author, helpful } = props.review;
  let textRef = null;
  let readMoreRef = null;
  return (
    <div className="row" style={{ padding: "40px" }}>
      <div className="col-7 border-right">
        <h4>{title}</h4>
        <div data="star data">
          <span className={`stars${rating}`} />
          <small style={{ paddingLeft: "10px" }}>{`Reviewed on ${date}`}</small>
        </div>
        {recommendedStatus}
        <div
          className={text.length > 200 ? "fadeout" : ""}
          style={{ height: "100px", marginTop: "16px", overflow: "hidden" }}
          ref={input => {
            textRef = input;
          }}
        >
          <p className="text-muted">{text}</p>
        </div>

        {text.length > 200 ? (
          <div className="text-primary font-weight-bold text-center">
            <u
              onClick={() => {
                handleClick();
              }}
              ref={input => {
                readMoreRef = input;
              }}
              style={{ cursor: "pointer" }}
            >
              Read More
            </u>
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="col-5">
        <p className="font-weight-bold">{author}</p>
        {helpful ? (
          <>
            <p>Was this review helpful?</p>
            <div className="row">
              <div className="col-3 text-center lowesButton">
                Yes({helpful.yes})
              </div>
              <div
                className="col-3 text-center lowesButton"
                style={{ marginLeft: "8px" }}
              >
                No({helpful.no})
              </div>
              <div>
                <a>
                  <span className="flag" style={{ marginLeft: "16px" }} />
                  <span> Report</span>
                </a>
              </div>
            </div>{" "}
          </>
        ) : (
          <div />
        )}
      </div>
      <hr />
    </div>
  );
}

export default ReviewItem;
