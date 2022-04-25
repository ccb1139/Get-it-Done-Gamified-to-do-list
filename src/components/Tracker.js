import { useState, useEffect } from "react";
import * as firebase from "../db/firebase";

function Tracker({ _stickies }) {
    const userID = firebase.getUserID();

    const [_trackers, setTrackers] = useState([]);
    // const [_stickies, setStickies] = useState([]);

    useEffect(() => {
        firebase.getCollection(`users/${userID}/inp-Ach-Trackers/`).then((result) => {
            setTrackers(result);
        });
    }, []);


    //const id2 = trackers[0]["stUnlocked"]
    function ach_002_Tracker(trackers, stickies) {
        if(stickies.length === 0) {return;}

        for (var i in trackers) {
            if (trackers[i]["ach_id"] == "002") {
                var stickyCount = stickies.length - 2;
                if (stickyCount <= 0) { stickyCount = 0; }
                if (stickyCount != trackers[i]["stUnlocked"]) {
                    //console.log("updating databse: " + "stickyCount" + stickyCount + " trackers[i][stUnlocked]: " + trackers[i]["stUnlocked"])
                    
                    trackers[i]["stUnlocked"] += 1
                    setTrackers(trackers)

                    firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/${trackers[i]["id"]}`, {stUnlocked: stickyCount}).then(()=> {});
                }

            }
        }
    }


    //firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/`, {stUnlocked: 1}).then(()=> {});
    ach_002_Tracker(_trackers, _stickies)

    //console.log(stickies)
    return (
        <></>
    )
}

export default Tracker

