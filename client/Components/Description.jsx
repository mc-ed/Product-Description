import React from "react";
import uuidv4 from "uuid/v4";
import { Accordion, Card } from "react-bootstrap";
import header from "../styles/CardHeader.less";
import signs from "../styles/signs.less";

function Description(props) {
  const items =
    props.descriptions.list && props.descriptions.list.length ? (
      props.descriptions.list.map(item => <li key={uuidv4()}>{item}</li>)
    ) : (
      <div>Sorry, there is no descriptions for this product</div>
    );

  const signToggle = document.querySelector(
    'span[data="toggleDescriptionSign"]'
  );

  return (
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        eventKey="0"
        className={`card-header ${header.header}`}
        onClick={() => {
          props.onClick(signToggle);
        }}
      >
        <span className={header.icon}>{"\u004B "}</span>
        <span className="text-white font-weight-bold">Description</span>
        <span
          data="toggleDescriptionSign"
          className={`float-right ${signs.plusSign}`}
        />
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <div className="row">
            <div className="col-md-6">{props.descriptions.overview}</div>
            <div className="col-md-6">
              <ul>{items}</ul>
            </div>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default Description;
