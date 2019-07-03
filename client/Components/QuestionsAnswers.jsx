import React from "react";

function QuestionsAnswers(props) {
    const { backgroundColor } = props.style.lowesMedBackground;
  return (
    <div className="card">
      <div
        style={{ backgroundColor, cursor: "pointer" }}
        className="card-header"
        id="headingFour"
        data-toggle="collapse"
        data-target="#collapseFour"
        aria-expanded="true"
        aria-controls="collapseFour"
      >
        <span className="iconFont">M </span>
        <span className="text-white font-weight-bold">Community Q & A</span>
        <span className="float-right iconFont">Z</span>
      </div>
      <div
        id="collapseFour"
        className="collapse"
        aria-labelledby="headingFour"
        data-parent="#accordionExample"
      >
        <div className="card-body">
            <div data='search bar container'>
                <div data='questions asked'>
                    <div>3</div>
                    <div>Questions</div>
                </div>
                <div data="input box">
                    <div>Search All Questions</div>
                    <input type="text"/>
                    <button>Search</button>
                </div>
                <div>
                    Ask a Question
                </div>
            </div>
            <div data='sort container'>
                <select name="sortQuestions" id="sortQuestions">
                    <option defaultValue="MOST ANSWERED">MOST ANSWERED</option>
                    <option defaultValue="Newest to Oldest">Newest to Oldest</option>
                    <option defaultValue="Oldest to Newest">Oldest to Newest</option>
                    <option defaultValue="Answers Needed">Answers Needed</option>
                    <option defaultValue="Most Recently Answered">Most Recently Answered</option>
                </select>
            </div>
            
        </div>
        </div>
    </div>
  );
}

export default QuestionsAnswers;
