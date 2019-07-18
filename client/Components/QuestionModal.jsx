import React from 'react'

function QuestionModal() {
    const [author, setAuthor] = useState('');
    const [question, setQuestion] = useState('');

    const submit = () => {
        props.submit({
            author,
            question
        })
        setAuthor('')
        setQuestion('')
    }

    return (
        <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>What's your Question?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="Author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control onChange={(e) => setAuthor(e.target.value)} value={author} type="text" placeholder="Enter Your Name" />
                </Form.Group>
                <Form.Group controlId="Question">
                    <Form.Label>Question</Form.Label>
                    <Form.Control onChange={(e) => setQuestion(e.target.value)} value={question} type="text" placeholder='"Is it even possible to make this product any better?"' />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {submit({author, question}); props.close(); }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default QuestionModal
