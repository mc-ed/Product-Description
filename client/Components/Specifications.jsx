import React from "react";
import uuidv4 from 'uuid/v4';
import SpecItem from './SpecItem.jsx';
import header from '../styles/CardHeader.less';
import signs from '../styles/signs.less';

function Specifications(props) {
  let { specs } = props;

  specs = specs.map(spec => <SpecItem key={ uuidv4() } spec={ spec } />)
  let [columnA, columnB] = [specs.slice(0, Math.floor(specs.length /2)), specs.slice(Math.floor(specs.length /2))];

  const signToggle = document.querySelector('span[data="toggleSpecificationsSign"]');

  return (
    <div className="card">
      <div
      onClick={ ()=> { props.onClick(signToggle) } }
        className={`card-header ${header.header}`}
        id="headingTwo"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <span className={header.icon}>{ '\u004D ' }</span>
        <span className="text-white font-weight-bold">Specifications</span>
        <span data='toggleSpecificationsSign' className={`float-right ${signs.plusSign}`}></span>
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
