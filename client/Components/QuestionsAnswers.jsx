import React from "react";
import QuestionItem from "./QuestionItem.jsx";

function QuestionsAnswers(props) {
  const signToggle = document.querySelector(
    'span[data="toggleQuestionAndAnswerSign"]'
  );
  {/* style={{ backgroundColor, cursor: "pointer" }} */}
  return (
    <div className="card">
      <div
        onClick={() => {
          props.onClick(signToggle);
        }}
        className="card-header"
        id="headingFour"
        data-toggle="collapse"
        data-target="#collapseFour"
        aria-expanded="true"
        aria-controls="collapseFour"
      >
        <span className="iconFont">{"\uEAC6 "}</span>
        <span className="text-white font-weight-bold">Community Q & A</span>
        <span
          data="toggleQuestionAndAnswerSign"
          className="float-right plusSign"
        />
      </div>
      <div
        id="collapseFour"
        className="collapse"
        aria-labelledby="headingFour"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <div className="row">
            <div className="col-2 text-center">
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                {props.questions.length}
              </div>
              <div>Question{props.questions.length > 1 ? "s" : ""}</div>
            </div>
            <div className="col-8">
              <div className="font-weight-bold">Search All Questions</div>
              <input style={{ width: "80%", height: "36px" }} type="text" />
              <span className="lowesButton">Search</span>
            </div>
            <div className="col-2">
              <div className="lowesButton">ASK A QUESTION</div>
            </div>
          </div>
          <div
            className="bg-grey"
            style={{ height: "60px", marginTop: "10px" }}
          >
            <select
              className="float-right"
              style={{ height: "36px", margin: "10px" }}
              name="sortQuestions"
              id="sortQuestions"
            >
              <option defaultValue="MOST ANSWERED">MOST ANSWERED</option>
              <option defaultValue="Newest to Oldest">Newest to Oldest</option>
              <option defaultValue="Oldest to Newest">Oldest to Newest</option>
              <option defaultValue="Answers Needed">Answers Needed</option>
              <option defaultValue="Most Recently Answered">
                Most Recently Answered
              </option>
            </select>
          </div>
          <div data="All questions container">
            {props.questions.length && props.questions.length > 1 ? (
              props.questions.map(question => (
                <>
                  <QuestionItem question={question} />
                  <hr />
                </>
              ))
            ) : props.questions.length === 1 ? (
              <QuestionItem question={props.questions[0]} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsAnswers;
