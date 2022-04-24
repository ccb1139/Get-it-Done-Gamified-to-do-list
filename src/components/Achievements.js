import 'bootstrap/dist/css/bootstrap.css'
import '../css/Achievements.css'
import React, { useEffect, useState } from "react";
import Achievement from './Achievement'
import UnlockProgress from './UnlockProgress'
import Donut from './Donut'
import achJSON from '../ach/ach.json'
import * as firebase from "../db/firebase";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { async } from '@firebase/util';

const Achievements = () => {
    const userID = firebase.getUserID();

    //Firebase Stuff
    const [curr__ach, setCurrAch] = useState([]);
    const [tracker_info, setTrackerInfo] = useState([]);
    const [complete_ach, setComplete_ach] = useState([]);
    const [allAch, setAllAch] = useState([]);
    var achIds = [];

    var ach = JSON.parse(JSON.stringify(achJSON));
    var active_achs = [];

    useEffect(() => {
        firebase.getCollection(`users/${userID}/inp-Achievements/`).then((result) => {

            if (result.length === 0) {
                for (var i in ach) {
                    //console.log("No achivements detected")
                    const inp_ach = {
                        "ach_name": (ach[i]["ach_name"] + " 1"),
                        "descp": (ach[i]["descp1"] + " " + ach[i]["stp_req"] + " " + ach[i]["descp2"]),
                        "level": 1,
                        "nxtlevel": ach[i]["stp_req"],
                        "stepsDone": 0,
                        "id": ach[i]["id"],
                        "curve": ach[i]["curve"],
                        "maxlevel": ach[i]["levels"],
                        "step_req": ach[i]["stp_req"]
                    }

                    result.push(inp_ach)
                    firebase.createDocument(`users/${userID}/inp-Achievements/`, inp_ach).then((id) => {
                        achIds.push(id)
                    })
                }

            }

            console.log("curr_ach loaded")
            setCurrAch(result)
            create_ach(result);
        });
        firebase.getCollection(`users/${userID}/inp-Ach-Trackers/`).then((result) => {
            setTrackerInfo(result);
        });
        firebase.getCollection(`users/${userID}/earned-Achievements/`).then((result) => {
            setComplete_ach(result);

        });
        ach = JSON.parse(JSON.stringify(achJSON));

        

    }, []);

    function calcCurSteps(CurLevel, usrLvl, factor) {
        if (usrLvl <= 1) { return 0 }
        var prvLevel = 0;
        var tmp = 0;
        for (let i = 1; i < usrLvl; i++) {
            tmp = Math.round((prvLevel + CurLevel) * factor);
            prvLevel = CurLevel;
            CurLevel = tmp;
            //console.log("prvLevel: " + prvLevel + "\t curLevel: " + CurLevel)
        }
        return (CurLevel);
    }

    function getStepsCompleted(ach_id) {
        for (var i in tracker_info) {
            if (ach_id == tracker_info[i]["ach_id"]) {
                return tracker_info[i]["stUnlocked"];
            }

        }
        return 0;
    }



    function create_ach(curr_ach) {
        console.log("CREATED ACH")
        active_achs = []
        console.log(curr_ach)
        console.log(ach)

        for (var usrAch in curr_ach) {
            for (var allAch in ach) {
                if (curr_ach[usrAch]["id"] == ach[allAch]["id"]) {

                    const StepsDone = getStepsCompleted(ach[allAch]["id"]);

                    var curLVL = calcCurSteps(ach[allAch]["stp_req"],
                        curr_ach[usrAch]["level"], ach[allAch]["curve"])
                    var nxtLVL = calcCurSteps(ach[allAch]["stp_req"],
                        (curr_ach[usrAch]["level"] + 1), ach[allAch]["curve"])

                    var i = 1;
                    if (StepsDone >= nxtLVL) {
                        var nxtLvlTmp = nxtLVL
                        while (StepsDone >= nxtLVL) {
                            curLVL = calcCurSteps(ach[allAch]["stp_req"],
                                (curr_ach[usrAch]["level"] + i), ach[allAch]["curve"])
                            nxtLVL = calcCurSteps(ach[allAch]["stp_req"],
                                (curr_ach[usrAch]["level"] + (i + 1)), ach[allAch]["curve"])
                            i++;
                        }
                        //console.log(StepsDone + " === " + nxtLvlTmp)
                        if (StepsDone === nxtLvlTmp) {
                            var foundAch = false;



                            for (var cmp_ach in complete_ach) {


                                // console.log(complete_ach.length)
                                // Find if achviment has already been completed 
                                if ((curr_ach[usrAch]["id"] == complete_ach[cmp_ach]["ach_id"])
                                    && ((i - 1) == complete_ach[cmp_ach]["level"])) {
                                    //console.log("Achivment already in database!");
                                    foundAch = true;
                                }
                                if (cmp_ach === (complete_ach.length - 1)) {
                                    if (foundAch === false) {
                                        console.log(curr_ach[usrAch]["id"] + " == " + complete_ach[cmp_ach]["ach_id"])
                                        console.log((i - 1) + " == " + complete_ach[cmp_ach]["level"])

                                        firebase.createDocument(`users/${userID}/earned-Achievements/`,
                                            {
                                                ach_id: curr_ach[usrAch]["id"],
                                                description: (curr_ach[usrAch]["descp1"] + " " + nxtLVL + " " + curr_ach[usrAch]["descp2"]),
                                                level: i - 1,
                                                title: ach[allAch]["ach_name"]
                                            }
                                        ).then((id) => { console.log("Unlocked achivment") })
                                    }
                                }
                            }

                        }

                    }




                    const levelStr = (i === 1) ? "" : (i).toString();

                    var tmpAch = {
                        "ach_name": (ach[allAch]["ach_name"] + " " + levelStr),
                        "descp": (ach[allAch]["descp1"] + " " + nxtLVL + " " + ach[allAch]["descp2"]),
                        "level": (i - 1),
                        "nxtlevel": nxtLVL,
                        "stepsDone": StepsDone,
                        "id": ach[allAch]["id"],
                        "curve": ach[allAch]["curve"],
                        "maxlevel": ach[allAch]["levels"],
                        "step_req": ach[allAch]["stp_req"]
                    }

                    //setAllAch(tmpAch)

                    active_achs.push(tmpAch)
                    break
                }
            }

        }
        //console.log(active_achs)
        setAllAch(active_achs);
    }

    // To load an achievment you need to enter the users achivement ids and then their current levels into the 
    // create_ach function 
    return (
        <div className='overview container'>
            {/* Put an array filled with dicts */}
            {allAch.map((element) => (
                <Achievement key={element["ach_name"]} title={element["ach_name"]}
                    description={element["descp"]} level={element["level"] + 1} badge={element["id"]}
                    factor={element["curve"]} max={element["maxlevel"]} step_req={element["step_req"]}
                    donut={<Donut total={element["nxtlevel"]}
                        complete={element["stepsDone"]} size={150} />}></Achievement>))}

            <UnlockProgress />
            <NotificationContainer />
        </div>
    );
}

export default Achievements