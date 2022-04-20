import 'bootstrap/dist/css/bootstrap.css'
import '../css/Achievements.css'
import React, { useEffect, useState } from "react";
import Achievement from './Achievement'
import UnlockProgress from './UnlockProgress'
import Donut from './Donut'
import achJSON from '../ach/ach.json'
import * as firebase from "../db/firebase";
import { async } from '@firebase/util';

const userID = "test-user";

const Achievements = () => {
    //Firebase Stuff
    const [curr_ach, setCurrAch] = useState([]);
    var achIds = [];

    var ach = JSON.parse(JSON.stringify(achJSON));
    var active_achs = [];

    useEffect(() => {
        firebase.getCollection(`users/${userID}/inp-Achievements/`).then((result) => {
            
            if(result.length === 0){
                for(var i in ach){
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
                
            } else {
                //console.log("achivements found")
            }
            //console.log(result)
            setCurrAch(result)            
        });

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

    function create_ach() {
        active_achs = []
        for (var usrAch in curr_ach) {
            for (var allAch in ach) {
                if (curr_ach[usrAch]["id"] == ach[allAch]["id"]) {
                    var curLVL = calcCurSteps(ach[allAch]["stp_req"], curr_ach[usrAch]["level"], ach[allAch]["curve"])
                    var nxtLVL = calcCurSteps(ach[allAch]["stp_req"], (curr_ach[usrAch]["level"] + 1), ach[allAch]["curve"])
                    var tmpAch = {
                        "ach_name": (ach[allAch]["ach_name"] + " " + curr_ach[usrAch]["level"]),
                        "descp": (ach[allAch]["descp1"] + " " + nxtLVL + " " + ach[allAch]["descp2"]),
                        "level": curLVL,
                        "nxtlevel": nxtLVL,
                        "stepsDone": curr_ach[usrAch]["stepsDone"],
                        "id": ach[allAch]["id"],
                        "curve": ach[allAch]["curve"],
                        "maxlevel": ach[allAch]["levels"],
                        "step_req": ach[allAch]["stp_req"]
                    }
                    active_achs.push(tmpAch)
                    break
                }
            }
        }
        //console.log(active_achs)
    }

    // To load an achievment you need to enter the users achivement ids and then their current levels into the 
    // create_ach function 
    return (
        <div className='overview container'>
            {/* Put an array filled with dicts */}
            {create_ach()}
            {active_achs.map((element) => (
                <Achievement key={element["ach_name"]} title={element["ach_name"]}
                    description={element["descp"]} level={element["level"] + 1} badge={element["id"]}
                    factor={element["curve"]} max={element["maxlevel"]} step_req={element["step_req"]}
                    donut={<Donut total={element["nxtlevel"]}
                        complete={element["stepsDone"]} size={150} />}></Achievement>
            ))}

            <UnlockProgress></UnlockProgress>
        </div>
    );
}

export default Achievements