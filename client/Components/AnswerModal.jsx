import React,{useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap';

function AnswerModal(props) {
    const [author, setAuthor] = useState('');
    const [answer, setAnswer] = useState('');

    const submit = () => {
        props.submit({
            author,
            answer
        })
        setAuthor('')
        setAnswer('')
    }

    return (
        <Modal show={props.show} onHide={() => props.toggle('answer')}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for helping out!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="Author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control onChange={(e) => setAuthor(e.target.value)} value={author} type="text" placeholder="Enter Your Name" />
                </Form.Group>
                <Form.Group controlId="Answer">
                    <Form.Label>Your Answer</Form.Label>
                    <Form.Control onChange={(e) => setAnswer(e.target.value)} value={answer} type="text" placeholder='"Let me help you out!"' />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.toggle('answer')}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {submit({author, answer}); props.toggle('answer'); }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AnswerModal