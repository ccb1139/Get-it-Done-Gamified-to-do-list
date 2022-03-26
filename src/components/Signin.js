import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InvalidInput from './InvalidInput';

const Signin = ({show, close}) => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    function login() {
        if (isSubmitSuccessful === false) return;

        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;
        
        // Check with database
        const account = {email: email, password: password};
        console.log(account);

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
                    <Form onSubmit={handleSubmit(login)}>
                        <Form.Label>Email</Form.Label>
                        <input type="text" className="form-control" id="emailInput" {...register("emailInput", 
                        {required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}/>
                        <div className="text-center mb-4">
                            {errors.emailInput?.type === "required" && <InvalidInput type="Signin" text="Email is required" />}
                            {errors.emailInput?.type === "pattern" && <InvalidInput type="Signin" text="Please enter a valid email" />}
                        </div>

                        <Form.Label>Password</Form.Label>
                        <input type="password" className="form-control" id="passwordInput" {...register("passwordInput", 
                        {required: true})}/>
                         <div className="text-center mb-4">
                            {errors.passwordInput?.type === "required" && <InvalidInput type="Signin" text="Password is required" />}
                            {errors.passwordInput?.type === "pattern" && <InvalidInput type="Signin" text="Please enter a valid email" />}
                        </div>

                        <Button type="submit">Sign-in</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
  }
  
  export default Signin