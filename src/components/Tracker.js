import { useState, useEffect } from "react";
import * as firebase from "../db/firebase";

// const userID = "test-user";
const userID = firebase.getUserID();

function Tracker({ stickies }) {
    const [trackers, setTrackers] = useState([]);
    
    useEffect(() => {
        firebase.getCollection(`users/${userID}/inp-Ach-Trackers/`).then((result) => { 
            setTrackers(result);
            console.log(result)
        });
    }, []);


    //const id2 = trackers[0]["stUnlocked"]
    console.log(trackers[0])

    for(var i in trackers) {
        if(trackers[i]["ach_id"] == "002"){
            var stickyCount = stickies.length - 2;
            if (stickyCount < 0) {stickyCount = 0;}
            firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/${trackers[i]["id"]}`, {stUnlocked: stickyCount}).then(()=> {});
        }
    }

    //firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/`, {stUnlocked: 1}).then(()=> {});


    //console.log(stickies)
    return (
        <></>
    )
}

export default Tracker

