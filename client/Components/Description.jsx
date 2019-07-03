import React from "react";

function Description() {
  return (
    <div className="card">
      <div className="card-header" id="headingOne">
        <h5 className="mb-0">
          <button
            className="btn btn-link"
            type="button"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Description
          </button>
        </h5>
      </div>

      <div
        id="collapseOne"
        className="collapse show"
        aria-labelledby="headingOne"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <ul>
            <li>Spec 1</li>
            <li>Spec 2</li>
            <li>Spec 3</li>
            <li>Spec 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Description;
