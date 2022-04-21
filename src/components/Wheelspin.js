import Button from "react-bootstrap/Button"
import StickyNote from "./StickyNote"
import PickOne from "./PickOne"
import 'bootstrap/dist/css/bootstrap.css'
import '../css/Wheelspin.css'
import UnlockProgress from './UnlockProgress'
import * as firebase from "../db/firebase";
import { useState, useEffect } from "react";

// const userID = "test-user";
const userID = firebase.getUserID();

const Wheelspin = () => {
    const [stickies, setStickies] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        firebase.getCollection(`users/${userID}/collectables/`).then((result) => {
            setStickies(result);
        });
        firebase.getCollection(`users/${userID}/Tasks/`).then((result) => {
            setTasks(result);
        });
    }, []);

    function updateStickies() {
        firebase.getCollection(`users/${userID}/collectables/`).then((result) => {
            setStickies(result);
        });
    }

    var unlock_Avil = tasks.filter(task => task.completed).length == tasks.length ? true : false;

    return (
        <div className='container'>
            <div id='WsMain' className='row'>
                <div id='MysterySticky' className='col-md-6 d-flex align-items-center justify-content-center'>
                    <PickOne unlockAvil={unlock_Avil} updateFunc={updateStickies()} />
                </div>
                <div className='col-md-6'>
                    <div id='Owned-Items' className="row">
                        <div className="col-sm-12 border ACH-p1-Head">
                            <h3>Owned Cosmetics</h3>
                        </div>
                        <div className="col-sm-12 border cosHolder">
                            {stickies.map((element) => (
                                <StickyNote color={element["color"]} key={element["color"]}></StickyNote>
                            ))}
                        </div>

                    </div>
                </div>
                <UnlockProgress></UnlockProgress>
            </div>

        </div>
    )
}

export default Wheelspin