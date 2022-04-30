import { ProgressBar } from 'react-bootstrap'
import '../css/UnlockProgress.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-circular-progressbar/dist/styles.css';
import Tracker from "./Tracker"
import { useState, useEffect, useRef } from "react";
import * as firebase from "../db/firebase";

function UnlockProgress({_canWrite, unlockAvailSender}) {
    const userID = firebase.getUserID();

    const [comple_total, setcompTot] = useState([]);
    const [_trackers, setTrackers] = useState([]);
    const [unlockStatus, setunlockStatus] = useState(0);

    // Get the list of tasks when the page loads
    useEffect(() => {
        firebase.getCollection(`users/${userID}/inp-Ach-Trackers/`).then((result1) => {
            setTrackers(result1);
            calcTotalAndComp(result1);
        });
    }, []);


    // For Demo


    function calcTotalAndComp(trackers) {
        var total = 0;
        var complete = 0;

        var tasksCopy = ""
        var unlocksCopy = ""

        for (var i in trackers) {
            if (trackers[i]["ach_id"] == "001") { tasksCopy = trackers[i] }
            if (trackers[i]["ach_id"] == "UNLOCKS") { unlocksCopy = trackers[i] }
        }
        setunlockStatus(unlocksCopy["unlocksAvail"])
        var aU = 0;
        for(var i = 1; i < tasksCopy["stUnlocked"] + 1; i++){
            //console.log(i);
            if(i % 5 == 0) {
                //console.log("Unlock Avail!")
                aU++
            }
        }
        //console.log(aU )

        if(aU > unlocksCopy["unlocksEarned"]){
            //console.log(aU - unlocksCopy["unlocksEarned"])
            
            firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/${unlocksCopy["id"]}`, { unlocksEarned: aU }).then(() => { });

            firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/${unlocksCopy["id"]}`, { unlocksAvail: (aU) }).then(() => { });
            
        }
        //setunlockStatus(aU - unlocksCopy["unlocksEarned"])
        
        total = 5;
        complete = (tasksCopy["stUnlocked"] % 5)
        setcompTot([total, complete])
    }

    function sendUnlocks(numOfUnlocks){
        // unlockAvailSender(numOfUnlocks)
    }

    //sendUnlocks(unlockStatus);

    const progressMsg = comple_total[1] + " / " + comple_total[0]

    return (
        <div className='col-sm-10 fixed-bottom border' id='ACH-Unlock-Progress'>
            <div className='row d-flex align-items-center justify-content-center'>
                <div className='col-sm-10'>
                    <ProgressBar now={(comple_total[1] / comple_total[0]) * 100} label={progressMsg}></ProgressBar>
                </div>
                <div className='col-sm-2' style={{ textAlign: "center" }}>
                    <p id="ACH-Unlock-Info" >Complete {comple_total[0] - comple_total[1]} more tasks for an unlock!</p>
                </div>

            </div>
            <Tracker canwrite={_canWrite}></Tracker>
        </div>


    )
}

export default UnlockProgress