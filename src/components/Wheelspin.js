import Button from "react-bootstrap/Button"
import StickyNote from "./StickyNote"
import PickOne from "./PickOne"
import 'bootstrap/dist/css/bootstrap.css'
import '../css/Wheelspin.css'
import UnlockProgress from './UnlockProgress'
import * as firebase from "../db/firebase";
import { useState, useEffect } from "react";
import { Menu, MenuItem, ControlledMenu, SubMenu, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

// const userID = "test-user";
const userID = firebase.getUserID();

const Wheelspin = () => {
    const [stickies, setStickies] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [habitStickyId, sethID] = useState([]);
    const [taskStickyId, settId] = useState([]);

    useEffect(() => {
        firebase.getCollection(`users/${userID}/collectables/`).then((result) => {
            setStickies(result);
            setHab_Task_taskStickyId();  
        });
              
        firebase.getCollection(`users/${userID}/Tasks/`).then((result) => {
            setTasks(result);
        });
    }, []);

    function setHab_Task_taskStickyId(){
        for(var sticky in stickies) {
            console.log(stickies[sticky]);
            if(stickies[sticky].habit == true){
                console.log("In wheelspin" + stickies[sticky].id)
                sethID(stickies[sticky].id);
            }
            else if(stickies[sticky].task == true){
                console.log("huh")
                settId(stickies[sticky].id);
            }
        }
        
    }

    function updateStickies(){
        firebase.getCollection(`users/${userID}/collectables/`).then((result) => {
            setStickies(result);
            setHab_Task_taskStickyId();
        });
        
        
    }

    function setMarker(habitEl, taskEl, index) {
        console.log("habitStickyId: " + habitStickyId)
        console.log("taskStickyId: " + taskStickyId)

        if(habitEl) {return "H";}
        if(taskEl) {return "T";}
        return "";
    }

    var unlock_Avil = tasks.filter(task => task.completed).length == tasks.length ? true : false;

    return (
        <div className='container' onMouseUp={updateStickies}>
            <div id='WsMain' className='row'>
                <div id='MysterySticky' className='col-md-6 d-flex align-items-center justify-content-center'>
                    <PickOne unlockAvil={unlock_Avil} />
                </div>
                <div className='col-md-6'>
                    <div id='Owned-Items' className="row">
                        <div className="col-sm-12 border ACH-p1-Head">
                            <h3>Owned Cosmetics</h3>
                        </div>
                        <div className="col-sm-12 border cosHolder">

                            {stickies.map((element, index) => (
                                

                                <StickyNote color={element["color"]} key={element["color"]}
                                    id={element["id"]}
                                    selectionMarker={setMarker(element["habit"], element["task"], index)}
                                    hID={habitStickyId} tId={taskStickyId}></StickyNote>
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