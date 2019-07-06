import React from "react";

function AnswerItem(props) {
    console.log('answer:', props)
    const { author, date, text } = props.answer;
  return (
    <div className='row'>
        <div className="col-1"></div>
      <div className='col-10'>
        <img src="" alt="Company Lego(if I do this)" />
        <div>{author} on {date}</div>
      <div>{text}</div>
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
  );
}

export default AnswerItem;
