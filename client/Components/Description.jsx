import React from "react";
import uuidv4 from 'uuid/v4';

function Description(props) {
  const { backgroundColor } = props.style.lowesMedBackground;
  const items = props.descriptions.length ? 
  (
    props.descriptions.map(item => <li key={ uuidv4() }>{item}</li>)
  ) : (
    <div>Sorry, there is no descriptions for this product</div>
  )

  const signToggle = document.querySelector('span[data="toggleDescriptionSign"]');
  
  return (
    <div onClick={ ()=> { props.onClick(signToggle) } } className="card">
      <div
        style={{ backgroundColor, cursor: "pointer" }}
        className="card-header"
        id="headingOne"
        data-toggle="collapse"
        data-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne"
      >
        <span className="iconFont">{ '\u004B ' }</span>
        <span className="text-white font-weight-bold">Description</span>
        <span data='toggleDescriptionSign' className="float-right plusSign"></span>
      </div>

      <div
        id="collapseOne"
        className="collapse"
        aria-labelledby="headingOne"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <ul>
            { items }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Description;
