import "../css/Signin.css"
import InvalidInput from './InvalidInput';
import Signup from "./Signup";
import { Modal, Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import GoogleButton from 'react-google-button'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import * as firebase from "../db/firebase";
import { useBootstrapPrefix } from "react-bootstrap/esm/ThemeProvider";

const Signin = ({ showSignin, closeSignin, showSignup, closeSignup, openSignup }) => {
    const userID = firebase.getUserID();

    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    const [showLoginError, setShowLoginError] = useState(false);
    // const [showSignup, setShowSignup] = useState(false);

    function loadNewAccount(_userID) {
        //console.log(_userID)
        // Load sticky notes
        firebase.getCollection(`users/${_userID}/collectables/`).then((result) => {

            if (result.length === 0) {
                firebase.createDocument(`users/${_userID}/collectables/`,
                    ({ color: "ff7575", habit: true, task: false })).then((id) => { });
                firebase.createDocument(`users/${_userID}/collectables/`,
                    { color: "f8d78b", habit: false, task: true }).then((id) => { });
            }
        });
        // Load Hall of fame
        firebase.getCollection(`users/${_userID}/earned-Achievements/`).then((result) => {
            console.log(result)
            if (result.length === 0) {
                const placeholder = {
                    description: "Login for the first time!",
                    ach_id: "005",
                    level: 1,
                    title: "First timer"
                }
                result.push(placeholder)
                firebase.createDocument(`users/${_userID}/earned-Achievements/`, placeholder).then((id) => { })
            }
        });
        //Load inprogress achivment trackers
        firebase.getCollection(`users/${_userID}/inp-Ach-Trackers/`).then((result) => {
            //console.log(result)
            if (result.length === 0) {
                firebase.createDocument(`users/${_userID}/inp-Ach-Trackers/`,
                    ({ stUnlocked: 0, ach_id: "002" })).then((id) => { });
                firebase.createDocument(`users/${_userID}/inp-Ach-Trackers/`,
                    ({ stUnlocked: 0, ach_id: "001" })).then((id) => { });
                firebase.createDocument(`users/${_userID}/inp-Ach-Trackers/`,
                    ({ stUnlocked: 0, ach_id: "004", habit: "ff7575", task: "f8d78b" })).then((id) => { });
                firebase.createDocument(`users/${_userID}/inp-Ach-Trackers/`,
                    ({ stUnlocked: 0, ach_id: "003" })).then((id) => { });
                //Load unlocks avail (slight spaghetti code)
                firebase.createDocument(`users/${_userID}/inp-Ach-Trackers/`,
                    ({ ach_id: "UNLOCKS", unlocksAvail: 0, unlocksEarned: 0 })).then((id) => { });
            }
        });
    }

    function login() {
        // if (isSubmitSuccessful === false) return;

        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;

            localStorage.setItem("userSignedIn", true);
            localStorage.removeItem("userID");
            localStorage.setItem("userID", user.uid);

            loadNewAccount(user.uid);
            setShowLoginError(false);
            closeSignin();
        })
            .catch((error) => {
                const errorCode = error.code;
                console.log("Error signing in: ", errorCode);
                setShowLoginError(true);
            });
    }

    function GoogleSignIn() {
        const provider = new GoogleAuthProvider()
        const auth = getAuth();
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;

            localStorage.setItem("userSignedIn", true);
            localStorage.removeItem("userID");
            localStorage.setItem("userID", user.uid);

            loadNewAccount(user.uid);
            closeSignin();
        });
    }

    return (
        <>
            <Modal show={showSignin} onHide={closeSignin} centered>
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
                        </div>

                        {showLoginError ?
                            <Container>
                                <InvalidInput type="Signin" text="Incorrect email or password" />
                            </Container> : <></>}

                        <p>Don't have an account? <span className="link" onClick={() => { closeSignin(); openSignup(); }}>Create one!</span></p>

                        <Button className="w-100" type="submit">Sign-in</Button>

                        <div className="lineDivide">
                            <span className="lineDivideText">
                                OR
                            </span>
                        </div>

                        <GoogleButton className="w-100 mx-auto mt-4" onClick={GoogleSignIn} />
                    </Form>
                </Modal.Body>
            </Modal>
            {showSignup ? <Signup show={showSignup} close={closeSignup} /> : <></>}
        </>
    );
}

export default Signin