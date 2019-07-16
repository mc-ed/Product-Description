import React, {useState} from 'react';
import {Modal, Button, Form, Col} from 'react-bootstrap';

function ReviewModal(props) {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState('');
    const [recommended, setRecommended] = useState(true);
    const [purchased, setPurchased] = useState(true);

    const submit = () => {
        props.submit({
            author,
            title,
            description,
            stars,
            recommended,
            purchased
        })
        setAuthor('')
        setTitle('')
        setDescription('')
        setStars('')
        setRecommended(true)
        setPurchased(true)
    }

    return (
        <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Write your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="Author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control onChange={(e) => setAuthor(e.target.value)} value={author} type="text" placeholder="Enter Your Name" />
                </Form.Group>
                <Form.Group controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='"I love this thing!"' />
                </Form.Group>
                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => setDescription(e.target.value)} value={description} as="textarea" rows="5" placeholder='This is the best product of all the products!'/>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Rate</Form.Label>
                    <Form.Control onChange={(e) => setStars(e.target.value)} as="select">
                        <option value={5}>5 stars</option>
                        <option value={4}>4 stars</option>
                        <option value={3}>3 stars</option>
                        <option value={2}>2 stars</option>
                        <option value={1}>1 star</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Recommended">
                        <Form.Check type="checkbox" label="Recommended" checked={recommended} onChange={(e) =>  setRecommended(e.target.checked)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="Purchased">
                        <Form.Check type="checkbox" label="Purchased" checked={purchased} onChange={(e) => setPurchased(e.target.checked)} />
                    </Form.Group>
                </Form.Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {submit({author, title, description, stars, recommended, purchased}); props.close(); }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ReviewModal
