import React from "react";

function AnswerItem(props) {
  const { author, date, text, badgeName, helpful } = props.answer;
  return (
    <div className='row'>
      <div className="col-2"></div>
      <div className='col-9'>
        {badgeName ? <img src={`https://lowesproject.s3.amazonaws.com/badges/${badgeName}.jpg`} alt="Company Lego(if I do this)" /> : <></>}
        <div className='mt-2'><small className='text-muted'>{author} on {date}</small></div>
        <div className='mt-2'>{text}</div>
        <div className="row mt-2">
          <div className="col-2 text-center lowesButton ml-3">
            Yes({helpful.yes})
              </div>
          <div
            className="col-2 text-center lowesButton ml-3"
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
      </div>

    </div>
  );
}

export default AnswerItem;
