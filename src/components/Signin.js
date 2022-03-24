import { Modal, Form, Button } from "react-bootstrap";

const Signin = ({show, close}) => {
    function checkInput() {
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        // Validate input

        // Check with database

        // Close modal
        close();
    }

    return (
        <>
            <Modal show={show} onHide={close} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign-in</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" className="mb-4" id="emailInput" />

                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" className="mb-4" id="passwordInput" />
                    </Form>

                    <Button onClick={checkInput}>Sign-in</Button>
                </Modal.Body>
            </Modal>
        </>
    );
  }
  
  export default Signin