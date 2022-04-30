import 'bootstrap/dist/css/bootstrap.css'
import '../css/Achievements.css'
import React, { useEffect, useState } from "react";
import Achievement from './Achievement'
import UnlockProgress from './UnlockProgress'
import Donut from './Donut'
import achJSON from '../ach/ach.json'
import * as firebase from "../db/firebase";
import { async } from '@firebase/util';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Achievements = () => {
    const userID = firebase.getUserID();
    //console.log(userID)

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
                if (result2.length === 1) {
                    toast.success(("First Timer unlocked!"), {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

                setComplete_ach(result2);

                firebase.getCollection(`users/${userID}/inp-Ach-Trackers/`).then((result1) => {
                    setTrackerInfo(result1);
                    create_ach(result, result1, result2);
                });
            });

            //console.log("pulling from database")
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
        for (var i = 1; i < lvlProg.length; i++) {
            rtnArray.push(lvlProg[i]);
        }
        return rtnArray;
    }

    // Function creates an array of all the achivments to be displayed
    function create_ach(curr_ach, tracker__info, complete__ach) {
        var today = new Date();
        console.log()
        active_achs = [];
        var fully_completed_ach = ["005"];
        for (var usrAch in curr_ach) {
            for (var allAch in ach) {
                // If the current users achivments are in the list of all achivments 
                if (curr_ach[usrAch]["id"] == ach[allAch]["id"]) {

                    // Check how many steps of this achivment are done
                    const StepsDone = getStepsCompleted(ach[allAch]["id"], tracker__info);

                    // Finds the first level and then the next level
                    var curLVL = calcCurSteps(ach[allAch]["stp_req"],
                        curr_ach[usrAch]["level"], ach[allAch]["curve"])
                    var nxtLVL = calcCurSteps(ach[allAch]["stp_req"],
                        (curr_ach[usrAch]["level"] + 1), ach[allAch]["curve"])
                    var i = 1;


                    // If the amout of steps completed for this achivment are greater than the 2nd level
                    // Figure out what the next teir is
                    if (StepsDone >= nxtLVL) {
                        var nxtLvlTmp = nxtLVL
                        var lvlPrg = [nxtLVL];

                        // Loop through until next teir is found
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
                                // If lower levels of this achivment have been found then make sure more arent added
                                // to the database
                                if ((i - 1) > complete__ach[cmp_ach]["level"]) {
                                    lvlPrg = shrinkLvlArray(lvlPrg);
                                }
                            }

                            // This part cant happen unless we have iterated through all the achivments to see if one was found
                            if (cmp_ach == (complete__ach.length - 1)) {
                                // Add new achivment to the database
                                if (foundAch === false) {
                                    var ind = lvlPrg.length - 2;
                                    for (var j = i - 1; j > 0; j--) {
                                        toast.success((ach[allAch]["ach_name"] + " " + j + " unlocked!"), {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });

                                        firebase.createDocument(`users/${userID}/earned-Achievements/`,
                                            {
                                                ach_id: curr_ach[usrAch]["id"],
                                                description: (ach[allAch]["earned_d1"] + " " + lvlPrg[ind] + " " + ach[allAch]["earned_d2"]),
                                                level: j,
                                                title: ach[allAch]["ach_name"],
                                                earned_date: (today.getMonth()+1 + "/" + today.getDate() + "/" + today.getFullYear())
                                            }
                                        ).then((id) => { })

                                        if (ind <= 0) {
                                            break;
                                        }
                                        ind--;
                                    }
                                }
                            }
                            
                            if (foundAch === true) {
                                //console.log((ach[allAch]))
                                if ((ach[allAch]["levels"] === complete__ach[cmp_ach]["level"])
                                    && !(fully_completed_ach.includes(curr_ach[usrAch]["id"]))) {
                                    fully_completed_ach.push(curr_ach[usrAch]["id"])
                                }
                            }

                        }

                    }

                    // Add achivment to list that will be displayed 
                    const levelStr = (i === 1) ? "" : (i).toString();
                    var descpString = ach[allAch]["descp1"]
                    if (ach[allAch]["showStpRq"]) {
                        descpString += " " + nxtLVL + " " + ach[allAch]["descp2"]
                    }

                    

                    var tmpAch = {
                        "ach_name": (ach[allAch]["ach_name"] + " " + levelStr),
                        "descp": (descpString),
                        "level": (i - 1),
                        "nxtlevel": nxtLVL,
                        "stepsDone": StepsDone,
                        "id": ach[allAch]["id"],
                        "curve": ach[allAch]["curve"],
                        "maxlevel": ach[allAch]["levels"],
                        "step_req": ach[allAch]["stp_req"]
                    }



                    if (fully_completed_ach.includes(curr_ach[usrAch]["id"])) { break }
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


            <UnlockProgress  _canWrite={true}/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
        </div>
    );
}

export default Achievements