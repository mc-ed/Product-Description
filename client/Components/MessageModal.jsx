import React from 'react';
import {Modal, Button} from 'react-bootstrap';

function MessageModal(props) {
    const blank = {
        title : '',
        text : ''
    }

    return (
        <Modal show={props.show} onHide={() => {props.toggle(blank)}}>
        <Modal.Header closeButton>
          <Modal.Title>{props.message.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{whiteSpace: 'pre-line'}}>
            {props.message.message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {props.toggle(blank)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default MessageModal
