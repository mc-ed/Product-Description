import React from "react";
import uuidv4 from "uuid/v4";
import header from '../styles/CardHeader.less';
import signs from '../styles/signs.less'

function Description(props) {
  const items = props.descriptions.list && props.descriptions.list.length ? (
    props.descriptions.list.map(item => <li key={uuidv4()}>{item}</li>)
  ) : (
    <div>Sorry, there is no descriptions for this product</div>
  );

  const signToggle = document.querySelector(
    'span[data="toggleDescriptionSign"]'
  );

  return (
    <div
      className="card"
    >
      <div
            onClick={() => {
              props.onClick(signToggle);
            }}
        className={`card-header ${header.header}`}
        id="headingOne"
        data-toggle="collapse"
        data-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne"
      >
        <span className="iconFont">{"\u004B "}</span>
        <span className="text-white font-weight-bold">Description</span>
        <span data="toggleDescriptionSign" className={`float-right ${signs.plusSign}`} />
      </div>

      <div
        id="collapseOne"
        className="collapse"
        aria-labelledby="headingOne"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <div className="row">
            <div className="col">{ props.descriptions.overview }</div>
            <div className="col">
              <ul>{items}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
