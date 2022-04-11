import "../css/Signin.css"
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InvalidInput from './InvalidInput';

import GoogleButton from 'react-google-button'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import * as firebase from "../db/firebase";
// import * as firebase from "firebase";s
// import * as firebaseui from "firebaseui";

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

const Signin = ({show, close, manageUser}) => {
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

    function GoogleSignIn() {
        const provider = new GoogleAuthProvider()
        const auth = getAuth();
      
        signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            
            console.log(firebase.getUserID());
            manageUser(true);
            close();
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
      });
      
    }
    
    // Initialize the FirebaseUI Widget using Firebase.
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());

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
                        {required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/})}/>
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
 
                        <Button className="w-100" type="submit">Sign-in</Button>

                        <div className="lineDivide mt-3 mb-5">
                            <span className="lineDivideText">
                                OR
                            </span>
                        </div>

                        <GoogleButton className="w-100 mx-auto mt-4" onClick={GoogleSignIn} />
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
  }
  
  export default Signin