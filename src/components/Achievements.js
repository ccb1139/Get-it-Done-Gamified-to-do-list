import 'bootstrap/dist/css/bootstrap.css'
import '../css/Achievements.css'
import React, { useEffect, useState } from "react";
import Achievement from './Achievement'
import UnlockProgress from './UnlockProgress'
import Donut from './Donut'
import achJSON from '../ach/ach.json'



const Achievements = () => {
    var ach = JSON.parse(JSON.stringify(achJSON));
    var active_achs = []

    function calcCurSteps(CurLevel, usrLvl, factor) {
        if(usrLvl <= 1){return 0}
        var prvLevel = 0;
        var tmp = 0;
        for (let i = 1; i < usrLvl; i++) {
            tmp = Math.round((prvLevel + CurLevel) * factor);
            prvLevel = CurLevel;
            CurLevel = tmp;
        }
        return (CurLevel);
    }


    function create_ach(curr_ach) {
        active_achs = []
        //console.log(curr_ach[0]["id"])

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
                        "id": ach[allAch]["id"]


                    }

                    active_achs.push(tmpAch)
                    break
                }
            }
        }
    }

    // To load an achievment you need to enter the users achivement ids and then their current levels into the 
    // create_ach function 
    return (
        <div className='overview container'>
            {/* Put an array filled with dicts */}
            {create_ach([{ id: "001", level: 2 }, { id: "002", level: 1 }])}
            {active_achs.map((element) => (
                <Achievement key={element["ach_name"]} title={element["ach_name"]}
                    description={element["descp"]} level={element["level"]} badge={element["id"]}
                    donut={<Donut total={element["nxtlevel"]}
                        complete={element["level"]} size={150} />}></Achievement>
            ))}

            <UnlockProgress complete={3} total={5}></UnlockProgress>
        </div>
    );
}

export default Achievements