import { useState, useEffect } from "react";
import * as firebase from "../db/firebase";

// const userID = "test-user";
const userID = firebase.getUserID();

function Tracker({ stickies }) {
    const [trackers, setTrackers] = useState([]);
    
    useEffect(() => {
        firebase.getCollection(`users/${userID}/inp-Ach-Trackers/`).then((result) => {
            //console.log(result)
            if (result.length === 0) {
                firebase.createDocument(`users/${userID}/inp-Ach-Trackers/`,
                    ({ stUnlocked: 0 })).then((id) => { });
            } 
    
            setTrackers(result);
            //console.log(result)
        });
    }, []);


    //const id2 = trackers[0]["stUnlocked"]
    //console.log(trackers)

    //firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/`, {stUnlocked: 1}).then(()=> {});


    //console.log(stickies)
    return (
        <div></div>
    )
}

export default Tracker

