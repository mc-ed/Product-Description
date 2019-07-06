import React from "react";
import AnswerItem from "./AnswerItem.jsx";

function QuestionItem(props) {
  console.log("question: ", props);
  const { question, author, date, answers } = props.question;
  return (
    <div data="single question and answer">
      <div className="row">
        <div className="col-1 text-center" style={{padding: '12px'}}>
          <span className="downCaret" />
        </div>
        <div className="col-9">
          <div data="question container">
            <div className='text-lowes font-weight-bold'>{question}</div>
            <div>
              <small className='text-muted'>
              {author} on {date}
              </small>
            </div>
          </div>
        </div>
        <div className="col-2">
        {answers.length ? (
          <div className='text-center'>
            <div style={{fontSize: '24px', fontWeight: 'bold'}}>{answers.length}</div>
            <div>{answers.length > 1 ? "Answers" : "Answer"}</div>
            <span className="lowesButton" style={{position: 'absolute', width: '250px', left: '-80px', top: '80px'}}>ANSWER THIS QUESTION</span>
          </div>
        ) : (
          <></>
        )}

        </div>
      </div>
      <div data="All Answers container">
        {props.question.answers.length ? (
          <AnswerItem answer={props.question.answers[0]} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default QuestionItem;
