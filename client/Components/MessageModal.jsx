import React from 'react';
import {Modal, Button} from 'react-bootstrap';

function MessageModal(props) {

    return (
        <Modal centered show={props.show} onHide={() => {props.toggle('message')}}>
        <Modal.Header closeButton>
          <Modal.Title>{props.message.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{whiteSpace: 'pre-line'}}>
            {props.message.message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {props.toggle('message')}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default MessageModal
