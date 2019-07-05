import React from "react";

function QuestionsAnswers(props) {
  const { backgroundColor } = props.style.lowesMedBackground;
  const signToggle = document.querySelector('span[data="toggleQuestionAndAnswerSign"]');
  return (
    <div onClick={ ()=> { props.onClick(signToggle) } } className="card">
      <div
        style={{ backgroundColor, cursor: "pointer" }}
        className="card-header"
        id="headingFour"
        data-toggle="collapse"
        data-target="#collapseFour"
        aria-expanded="true"
        aria-controls="collapseFour"
      >
        <span className="iconFont">{ '\uEAC6 ' }</span>
        <span className="text-white font-weight-bold">Community Q & A</span>
        <span data='toggleQuestionAndAnswerSign' className="float-right plusSign"></span>
      </div>
      <div
        id="collapseFour"
        className="collapse"
        aria-labelledby="headingFour"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <div data="search bar container">
            <div data="questions asked">
              <div>3</div>
              <div>Questions</div>
            </div>
            <div data="input box">
              <div>Search All Questions</div>
              <input type="text" />
              <button>Search</button>
            </div>
            <div>Ask a Question</div>
          </div>
          <div data="sort container">
            <select name="sortQuestions" id="sortQuestions">
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
            <div data="single question and answer">
              <div data="question layer container">
                <div>
                  <i>down/up caret</i>
                </div>
                <div data="question container">
                  <div>Is this the question?</div>
                  <div>:USER_NAME on DATE</div>
                </div>
                <div data="answer counter container">
                  <div>Answer</div>
                  <div>1</div>
                </div>
              </div>
              <div data="All Answers container">
                <div data="single answer container">
                  <div><img src="" alt="Possibly Company Lego"/></div>
                  <div>USER_NAME on DATE</div>
                  <div>This is the answer to the question</div>
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
              <button>Answer this question</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsAnswers;
