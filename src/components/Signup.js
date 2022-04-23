import InvalidInput from './InvalidInput';
import { Modal, Form, Button, Container, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({show, close}) => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    const [showSignupError, setShowSignupError] = useState(false);
    const [showSignupSuccess, setShowSignupSuccess] = useState(false);

    function singup() {
        const auth = getAuth();
        
        const email = document.getElementById("emailInputSignup").value;
        const password = document.getElementById("passwordInputSignup").value;

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setShowSignupError(false);
            setShowSignupSuccess(true);
        })
        .catch((error) => {
            setShowSignupError(true);
            const errorCode = error.code;
            console.log("Error creating account: ", errorCode);
        });
    }

    return (
        <>
        <Modal show={show} onHide={close} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create an account</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(singup)}>
                        <Form.Label>Email</Form.Label>
                        <input type="text" className="form-control" id="emailInputSignup" {...register("emailInput",
                            { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })} />
                        <div className="text-center mb-4">
                            {errors.emailInput?.type === "required" && <InvalidInput type="Signin" text="Email is required" />}
                            {errors.emailInput?.type === "pattern" && <InvalidInput type="Signin" text="Please enter a valid email" />}
                        </div>

                        <Form.Label>Password</Form.Label>
                        <input type="password" className="form-control" id="passwordInputSignup" {...register("passwordInput",
                            { required: true })} />
                        <div className="text-center mb-4">
                            {errors.passwordInput?.type === "required" && <InvalidInput type="Signin" text="Password is required" />}
                        </div>

                        {showSignupError ? 
                        <Container>
                            <InvalidInput type="Signin" text="Invalid email or password" />
                        </Container> : null}

                        <Button className="w-100" type="submit">Create Account</Button>

                        {showSignupSuccess ? 
                        <Container className="mt-4">
                            <Alert variant="success" onClose={() => setShowSignupSuccess(false)} dismissible>
                                Account successfully created!
                            </Alert>
                        </Container> : null}

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
  }
  
  export default Signup