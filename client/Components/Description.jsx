import React from "react";

function Description(props) {
  const { backgroundColor } = props.style.lowesMedBackground;
  return (
    <div className="card">
      <div
        style={{ backgroundColor, cursor: "pointer" }}
        className="card-header"
        id="headingOne"
        data-toggle="collapse"
        data-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne"
      >
        <span className="iconFont">K </span>
        <span className="text-white font-weight-bold">Description</span>
        <span className="float-right iconFont">Z</span>
      </div>

      <div
        id="collapseOne"
        className="collapse"
        aria-labelledby="headingOne"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <ul>
            <li>Description 1</li>
            <li>Description 2</li>
            <li>Description 3</li>
            <li>Description 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Description;
