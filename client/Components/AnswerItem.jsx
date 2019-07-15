import React from "react";
import buttons from '../styles/buttons.less';
import signs from '../styles/signs.less';
import styles from '../styles/QuestionItem.less'

function AnswerItem(props) {
  const { author, date, text, badgeName, helpful } = props.answer;
  return (
    <div className='row mt-4'>
      <div className="col-2"></div>
      <div className='col-6'>
        {badgeName ? <img src={`https://lowesproject.s3.amazonaws.com/badges/${badgeName}.jpg`} alt="Company Lego(if I do this)" /> : <></>}
        <div className='mt-2'><small className='text-muted'>{author} on {date}</small></div>
        <div className='mt-2'>{text}</div>
        <div className="row mt-2">
          <div className={`col-2 text-center ml-3 ${buttons.button}`}>
            Yes({helpful.yes})
              </div>
          <div
            className={`col-2 text-center ml-3 ${buttons.button}`}
          >
            No({helpful.no})
              </div>
          <div>
            <a>
              <span className={`${signs.flag} ${styles.ml16}`}/>
              <span> Report</span>
            </a>
          </div>
        </div>{" "}
      </div>

    </div>
  );
}

export default AnswerItem;
