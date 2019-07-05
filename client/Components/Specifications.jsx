import React from "react";
import uuidv4 from 'uuid/v4';
import SpecItem from './SpecItem.jsx'

function Specifications(props) {
  const { backgroundColor } = props.style.lowesMedBackground;
  let { specs } = props;

  specs = specs.map(spec => <SpecItem key={ uuidv4() } spec={ spec } />)
  let [columnA, columnB] = [specs.slice(0, Math.floor(specs.length /2)), specs.slice(Math.floor(specs.length /2))];

  const signToggle = document.querySelector('span[data="toggleSpecificationsSign"]');

  return (
    <div onClick={ ()=> { props.onClick(signToggle) } } className="card">
      <div
        style={{ backgroundColor, cursor: "pointer" }}
        className="card-header"
        id="headingTwo"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <span className="iconFont">{ '\u004D ' }</span>
        <span className="text-white font-weight-bold">Specifications</span>
        <span data='toggleSpecificationsSign' className="float-right plusSign"></span>
      </div>

      <div
        id="collapseTwo"
        className="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <div className="row">
            <div className="col">
              <table className="table table-borderless">
                <tbody>
                 { columnA }
                </tbody>
              </table>
            </div>
            <div className="col">
              <table className="table table-borderless">
                <tbody>
                  { columnB }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Specifications;
