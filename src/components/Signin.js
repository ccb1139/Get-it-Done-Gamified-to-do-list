import "../css/Signin.css"
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InvalidInput from './InvalidInput';

import GoogleButton from 'react-google-button'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, setPersistence, inMemoryPersistence } from "firebase/auth";
import * as firebase from "../db/firebase";
// import * as firebase from "firebase";s
// import * as firebaseui from "firebaseui";

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

// const userID = "test-user";
const userID = firebase.getUserID();

const Signin = ({ show, close }) => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    function loadNewAccount() {
        //console.log("LOGIN!")
        // Load sticky notes
        firebase.getCollection(`users/${userID}/collectables/`).then((result) => {
            //console.log(result)
            if (result.length === 0) {
                firebase.createDocument(`users/${userID}/collectables/`, { color: "ff7575" }).then((id) => { });
                firebase.createDocument(`users/${userID}/collectables/`, { color: "f8d78b" }).then((id) => { });
            }
        });
        // Load Hall of fame
        firebase.getCollection(`users/${userID}/earned-Achievements/`).then((result) => {
            if(result.length === 0){
                const placeholder = {
                    description: "Login for the first time! (place holder)",
                    id: "001",
                    level: 1,
                    title: "First timer"
                }
                result.push(placeholder)
                firebase.createDocument(`users/${userID}/earned-Achievements/`, placeholder).then((id) => { })
            }
        });
    }


    function login() {
        if (isSubmitSuccessful === false) return;

        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        // Check with database
        const account = { email: email, password: password };
        console.log(account);

        // Load new account items
        loadNewAccount();

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
            
            localStorage.setItem("userSignedIn", true);
            localStorage.setItem("userID", user.uid);

            loadNewAccount();
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