import React from "react";
import AnswerItem from "./AnswerItem.jsx";

function QuestionItem(props) {
  console.log("question: ", props);


  let questionRef = null;
  function toggleShow () {
    let rotateCaret = questionRef.querySelector('span.downCaret').parentElement;
    if(questionRef.classList.contains('show')) {
      questionRef.classList.remove('show', 'expand');
      rotateCaret.classList.remove('rotateCaret');
    } else {
      questionRef.classList.add('show', 'expand');
      rotateCaret.classList.add('rotateCaret');
    }
  }

  const { question, author, date, answers } = props.question;
  return (
    <div className='questionHide' ref={input => questionRef = input}>
      <div onClick={() => {toggleShow()} } className="row" style={{cursor: 'pointer', marginTop: '8px'}}>
        <div className="col-1 text-center down" style={{padding: '16px'}}>
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
            <span className="lowesButton" style={{position: 'absolute', width: '250px', left: '-120px', top: '80px'}}>ANSWER THIS QUESTION</span>
          </div>
        ) : (
          <span className="lowesButton" style={{position: 'absolute', width: '250px', left: '-80px', top: '8px'}}>ANSWER THIS QUESTION</span>
        )}

        </div>
      </div>
      <div data="All Answers container">
        {answers.length && answers.length > 1 ? (
          answers.map(answer => (<><AnswerItem answer={answer} /><hr /></>))) :
          answers.length === 1 ? <AnswerItem answer={answers[0]} /> :<div />
        }
      </div>
    </div>
  );
}

export default QuestionItem;
