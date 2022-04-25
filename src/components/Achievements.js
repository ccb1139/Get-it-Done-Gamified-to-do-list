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

            setCurrAch(result);
            firebase.getCollection(`users/${userID}/earned-Achievements/`).then((result2) => {
                setComplete_ach(result2);

                firebase.getCollection(`users/${userID}/inp-Ach-Trackers/`).then((result1) => {
                    setTrackerInfo(result1);
                    create_ach(result, result1, result2);
                });
            });

            console.log("pulling from database")
            //create_ach(result);
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
        }
        return (CurLevel);
    }

    function getStepsCompleted(ach_id, tracker__info) {
        for (var i in tracker__info) {
            if (ach_id == tracker__info[i]["ach_id"]) {
                return tracker__info[i]["stUnlocked"];
            }

        }
        return 0;
    }

    function shrinkLvlArray(lvlProg) {
        var rtnArray = []
        for (var i = 1; i < lvlProg.length; i++){
            rtnArray.push(lvlProg[i]);
        }
        return rtnArray;
    }

    // Function creates an array of all the achivments to be displayed
    function create_ach(curr_ach, tracker__info, complete__ach) {
        active_achs = []
        for (var usrAch in curr_ach) {
            for (var allAch in ach) {
                // If the current users achivments are in the list of all achivments 
                if (curr_ach[usrAch]["id"] == ach[allAch]["id"]) {

                    // Check how many steps of this achivment are done
                    const StepsDone = getStepsCompleted(ach[allAch]["id"], tracker__info);

                    var curLVL = calcCurSteps(ach[allAch]["stp_req"],
                        curr_ach[usrAch]["level"], ach[allAch]["curve"])
                    var nxtLVL = calcCurSteps(ach[allAch]["stp_req"],
                        (curr_ach[usrAch]["level"] + 1), ach[allAch]["curve"])

                    var i = 1;



                    if (StepsDone >= nxtLVL) {
                        var nxtLvlTmp = nxtLVL
                        var lvlPrg = [nxtLVL];
                        while (StepsDone >= nxtLVL) {
                            curLVL = calcCurSteps(ach[allAch]["stp_req"],
                                (curr_ach[usrAch]["level"] + i), ach[allAch]["curve"])
                            nxtLVL = calcCurSteps(ach[allAch]["stp_req"],
                                (curr_ach[usrAch]["level"] + (i + 1)), ach[allAch]["curve"])
                            i++;
                            lvlPrg.push(nxtLVL);
                        }
                        var foundAch = false;
                        for (var cmp_ach in complete__ach) {
                            // Find if achviment has already been completed 
                            if ((curr_ach[usrAch]["id"] == complete__ach[cmp_ach]["ach_id"])) {
                                if ((i - 1) == complete__ach[cmp_ach]["level"]) {
                                    foundAch = true;
                                }
                                if ((i - 1) > complete__ach[cmp_ach]["level"]) {
                                    lvlPrg = shrinkLvlArray(lvlPrg);
                                }
                            }

                            // This part cant happen unless we have iterated through all the achivments to see if one was found
                            if (cmp_ach == (complete__ach.length - 1)) {
                                if (foundAch === false) {
                                    var ind = lvlPrg.length - 2;
                                    for (var j = i - 1; j > 0; j--) {
                                        firebase.createDocument(`users/${userID}/earned-Achievements/`,
                                            {
                                                ach_id: curr_ach[usrAch]["id"],
                                                description: (ach[allAch]["descp1"] + " " + lvlPrg[ind] + " " + ach[allAch]["descp2"]),
                                                level: j,
                                                title: ach[allAch]["ach_name"]
                                            }
                                        ).then((id) => {})

                                        if(ind <= 0){
                                            break;
                                        }
                                        ind--;
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