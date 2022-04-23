import InvalidInput from './InvalidInput';
import { Modal, Form, Button, Container, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from 'react';

const Signup = ({show, close}) => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    const [showLoginError, setShowLoginError] = useState(false);

    function login() {

    }

    return (
        <>
        <Modal show={show} onHide={close} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign-in</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(login)}>
                        <Form.Label>Email</Form.Label>
                        <input type="text" className="form-control" id="emailInput" {...register("emailInput",
                            { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })} />
                        <div className="text-center mb-4">
                            {errors.emailInput?.type === "required" && <InvalidInput type="Signin" text="Email is required" />}
                            {errors.emailInput?.type === "pattern" && <InvalidInput type="Signin" text="Please enter a valid email" />}
                        </div>

                        <Form.Label>Password</Form.Label>
                        <input type="password" className="form-control" id="passwordInput" {...register("passwordInput",
                            { required: true })} />
                        <div className="text-center mb-4">
                            {errors.passwordInput?.type === "required" && <InvalidInput type="Signin" text="Password is required" />}
                            {errors.passwordInput?.type === "pattern" && <InvalidInput type="Signin" text="Please enter a valid email" />}
                        </div>

                        {showLoginError ? 
                        <Container>
                            {/* <Alert variant="danger">
                                Habit successfully created!
                            </Alert> */}
                            <InvalidInput type="Signin" text="Incorrect email or password." />
                        </Container> : null}

                        {/* <p>Don't have an account? <a onClick={createAccount}>Create one!</a></p> */}

                        <Button className="w-100" type="submit">Sign-in</Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
  }
  
  export default Signup