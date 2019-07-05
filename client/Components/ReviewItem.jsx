import React from "react";

function ReviewItem(props) {


    let recommendedStatus = props.recommended ? (
        <div data="recommended data">
            <span className="checkMark"></span>
        <small>Recommended</small>
  </div>
    ) :(
        <div />
    )


  return (
    <div className="row" style={{padding: '40px'}}>
      <div className="col-7 border-right">
      <h4>"Title for Review in Quotes"</h4>
        <div data="star data">
            <span className="stars5" />
            <small style={{paddingLeft: '10px'}}>Reviewed on 4/4/1019</small>
        </div>
        { recommendedStatus }
        <div className='fadeout' style={{height: '100px', marginTop: '16px', overflow:'hidden'}}>
        <p className='text-muted'>
            The review description goes here. It's needs to be colisiple and
            expandableThe review description goes here. It's needs to be colisiple and
            expandableThe review description goes here. It's needs to be colisiple and
            expandableThe review description goes here. It's needs to be colisiple and
            expandableThe review description goes here. It's needs to be colisiple and
            expandableThe review description goes here. It's needs to be colisiple and
            expandableThe review description goes here. It's needs to be colisiple and
            expandable
          </p>
        </div>

        <div className='text-primary font-weight-bold text-center'><u>Read More</u></div>
      </div>
      <div className="col-5">
        <p className="font-weight-bold">Reviewer's name</p>
        <p>Was this review helpful?</p>
        <div data="button container">
          <div className="lowesButton">Yes({ props.helpful.yes})</div>
          <div className="lowesButton">No({ props.helpful.no})</div>
          <div>
            <i data="flag">flag</i>
            <a>Report</a>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default ReviewItem;
