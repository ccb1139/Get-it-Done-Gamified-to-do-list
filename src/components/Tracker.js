import { useState, useEffect } from "react";
import * as firebase from "../db/firebase";

function Tracker({ canWrite, _stickies, _tasks }) {
    const userID = firebase.getUserID();

    const [_trackers, setTrackers] = useState([]);
    const [tasks, setTasks] = useState([]);
    // const [_stickies, setStickies] = useState([]);

    useEffect(() => {
        firebase.getCollection(`users/${userID}/inp-Ach-Trackers/`).then((result) => {
            console.log("Pulling from database trackers")
            setTrackers(result);
        });
        firebase.getCollection(`users/${userID}/Tasks/`).then((result) => {
            setTasks(result);
            //console.log(result)
        });
    }, []);




    function ach_001_Tracker(trackers, tasks) {

        if (tasks.length === 0) { return; }
        // console.log(trackers);
        // console.log(tasks);
        for (var i in trackers) {
            if (trackers[i]["ach_id"] == "001") {
                var tasksCount = tasks.filter(task => task.completed).length;
                if (tasksCount > trackers[i]["stUnlocked"]) {
                    console.log("updating databse: ")
                    console.log("taskCount: " + tasksCount)
                    console.log('trackers[i]["stUnlocked"]: ' + trackers[i]["stUnlocked"]);

                    trackers[i]["stUnlocked"] += 1
                    setTrackers(trackers)

                    firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/${trackers[i]["id"]}`, { stUnlocked: tasksCount }).then(() => { });
                }

            }
        }
    }

    //const id2 = trackers[0]["stUnlocked"]
    function ach_002_Tracker(trackers, stickies) {
        if (stickies.length === 0) { return; }

        for (var i in trackers) {
            if (trackers[i]["ach_id"] == "002") {
                var stickyCount = stickies.length - 2;
                if (stickyCount <= 0) { stickyCount = 0; }
                if (stickyCount != trackers[i]["stUnlocked"]) {
                    //console.log("updating databse: " + "stickyCount" + stickyCount + " trackers[i][stUnlocked]: " + trackers[i]["stUnlocked"])

                    trackers[i]["stUnlocked"] += 1
                    setTrackers(trackers)

                    firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/${trackers[i]["id"]}`, { stUnlocked: stickyCount }).then(() => { });
                }

            }
        }
    }

    function ach_004_Tracker(trackers, stickies) {
        if (stickies.length === 0) { return; }

        var count = 0;
        for (var i in trackers) {
            if (trackers[i]["ach_id"] == "004") {
                for(var j in stickies){
                    if(((stickies[j]["color"] == 'ff7575') && (stickies[j]["habit"] == false))
                    && trackers[i]["habit"] == 'ff7575'){
                        count += 1
                        firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/${trackers[i]["id"]}`, { habit: '000000' }).then(() => { });
                    }
                    if((stickies[j]["color"] == 'f8d78b') && (stickies[j]["task"] == false)
                    && trackers[i]["task"] == 'f8d78b'){
                        count += 1
                        firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/${trackers[i]["id"]}`, { task: '000000' }).then(() => { });
                    }
                }
                if(count > trackers[i]["stUnlocked"]){
                    trackers[i]["stUnlocked"] = count;
                    setTrackers(trackers);
                    firebase.updateDocument(`users/${userID}/inp-Ach-Trackers/${trackers[i]["id"]}`, { stUnlocked: count }).then(() => { });
                }
            }
        }
        
        
    }

    ach_001_Tracker(_trackers, tasks)
    // if(typeof _tasks !== 'undefined' || _tasks.length === 0){

    // }
    if (typeof _stickies !== 'undefined') {
        console.log(_stickies)
        console.log(_trackers)
        ach_002_Tracker(_trackers, _stickies)
        ach_004_Tracker(_trackers, _stickies)
    }



    //console.log(stickies)
    return (
        <></>
    )
}

export default Tracker

