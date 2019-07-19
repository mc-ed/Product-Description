import React from "react";
import uuidv4 from "uuid/v4";
import SpecItem from "./SpecItem.jsx";
import header from "../styles/CardHeader.less";
import { Accordion, Card } from "react-bootstrap";
import signs from "../styles/signs.less";

function Specifications(props) {
  let { specs } = props;

  specs = specs.map(spec => <SpecItem key={uuidv4()} spec={spec} />);
  let [columnA, columnB] = [
    specs.slice(0, Math.floor(specs.length / 2)),
    specs.slice(Math.floor(specs.length / 2))
  ];

  const signToggle = document.querySelector(
    'span[data="toggleSpecificationsSign"]'
  );

  return (
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        eventKey="1"
        className={`card-header ${header.header}`}
        onClick={() => {
          props.toggle(signToggle);
        }}
      >
        <span className={header.icon}>{"\u004D "}</span>
        <span className="text-white font-weight-bold">Specifications</span>
        <span
          data="toggleSpecificationsSign"
          className={`float-right ${signs.plusSign}`}
        />
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="1">
        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              <table className="table table-borderless">
                <tbody>{columnA}</tbody>
              </table>
            </div>
            <div className="col-md-6">
              <table className="table table-borderless">
                <tbody>{columnB}</tbody>
              </table>
            </div>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default Specifications;
