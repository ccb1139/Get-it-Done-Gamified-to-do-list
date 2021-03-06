import Button from "react-bootstrap/Button"
import StickyNote from "./StickyNote"
import PickOne from "./PickOne"
import 'bootstrap/dist/css/bootstrap.css'
import '../css/Wheelspin.css'
import UnlockProgress from './UnlockProgress'
import * as firebase from "../db/firebase";
import { useState, useEffect } from "react";
import React, { useCallback } from 'react';
import { Menu, MenuItem, ControlledMenu, SubMenu, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Tracker from "./Tracker"
import { set } from "react-hook-form"

const userID = firebase.getUserID();

const Wheelspin = () => {
    // const userID = firebase.getUserID();

    const [stickies, setStickies] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [habitStickyId, sethID] = useState([]);
    const [taskStickyId, settId] = useState([]);

    const [testguy, setTest] = useState("");
    const [numOfUnlocks, setnou] = useState(0);

    useEffect(() => {
        firebase.getCollection(`users/${userID}/collectables/`).then((result) => {
            setStickies(result);
            setHab_Task_taskStickyId(result);
        });

        firebase.getCollection(`users/${userID}/Tasks/`).then((result) => {
            setTasks(result);
        });

    }, []);

    function setHab_Task_taskStickyId(_stickies) {
        for (var sticky in _stickies) {
            if (_stickies[sticky].habit == true) {
                sethID(_stickies[sticky].id);
            }
            else if (_stickies[sticky].task == true) {
                settId(_stickies[sticky].id);
            }
        }

    }

    function updateStickies() {
        firebase.getCollection(`users/${userID}/collectables/`).then((result) => {
            setStickies(result);
            setHab_Task_taskStickyId();
        });
    }

    function setMarker(habitEl, taskEl, index) {
        if (habitEl) { return "H"; }
        if (taskEl) { return "T"; }
        return "";
    }


    function animationEndUpdate() {
        setTimeout(() => { updateStickies() }, 1000);
    }

    // Function gets and array:
    // First slot is the new habit ID and second is the new Task ID
    // [NewHabitId, NewTaskId]
    function getStickyData(stickyData) {
        const oldHabId = habitStickyId;
        const oldTaskId = taskStickyId;

        sethID(stickyData[0])
        settId(stickyData[1])

        // If there are is a new habit or task
        if ((stickyData[0] != oldHabId) || (stickyData[1] != oldTaskId)) {
            // If the habit is the same as before just update the task
            if (stickyData[0] === oldHabId) {
                firebase.updateDocument(`users/${userID}/collectables/${stickyData[1]}`, { habit: false, task: true }).then(() => { });
                firebase.updateDocument(`users/${userID}/collectables/${oldTaskId}`, { habit: false, task: false }).then(() => { });
            }
            // If the task is the same just update the habit
            if (stickyData[1] === oldTaskId) {
                firebase.updateDocument(`users/${userID}/collectables/${stickyData[0]}`, { habit: true, task: false }).then(() => { });
                firebase.updateDocument(`users/${userID}/collectables/${oldHabId}`, { habit: false, task: false }).then(() => { });
            }
            // Swap them if they need to be swapped
            if((oldHabId === stickyData[1]) && (oldTaskId === stickyData[0])){
                firebase.updateDocument(`users/${userID}/collectables/${stickyData[0]}`, { habit: true, task: false }).then(() => { });
                firebase.updateDocument(`users/${userID}/collectables/${stickyData[1]}`, { habit: false, task: true }).then(() => { });
            }
        }
    }

    // var unlock_Avil = tasks.filter(task => task.completed).length == tasks.length ? true : false;
    var unlock_Avil = tasks.filter(task => {
        // console.log(task)
        var completed = true;
        const today = new Date();

        var weekDates = [];
        var startDate = new Date();
        startDate.setDate((startDate.getDate() - startDate.getDay()));
        for (var i = 0; i < 7; i++) {
            weekDates.push( new Date(startDate) ); 
            startDate.setDate(startDate.getDate() + 1);
        }

        if (task.habit) {
            task.tasks.forEach((habit) => {
                for (var i = 0; i < weekDates.length; i++) {
                    // Check if the element is {}
                    if (Object.keys(habit).length === 0) { continue; }

                    const dueDate = new Date(habit.due.seconds * 1000);

                    // Check that the habit is today
                    if ((dueDate.getDate() === today.getDate() && dueDate.getMonth() === today.getMonth() && dueDate.getYear() === today.getYear())) {
                        // Check if the habit is completed
                        if (!habit.completed) {
                            //console.log(habit);
                            completed = false
                        }
                    }
                }

            });
        }

        // If its a normal task just check if its completed, if its a habit
        // check if the habit is for today and it is completed
        return task.completed || completed
    }).length == tasks.length ? true : false;

    // function getUnlockAvail(unlockAvil){
    //     console.log("from wheelspin: " + unlockAvil)
    //     var tempdude = unlockAvil;
    //     //setnou(tempdude)
    // }

    return (
        <div className='container'>
            <div id='WsMain' className='row'>
                <div id='MysterySticky' className='col-md-6 d-flex align-items-center justify-content-center' onMouseUp={animationEndUpdate} >
                    <PickOne unlockAvil={0} />
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
                                    hId={habitStickyId} tId={taskStickyId} idSender={getStickyData}
                                    test2={testguy}></StickyNote>
                            ))}
                        </div>

                    </div>
                </div>
                <Tracker _stickies={stickies}></Tracker>
                <UnlockProgress _canWrite={true} ></UnlockProgress>
            </div>
        </div>
    )
}

export default Wheelspin