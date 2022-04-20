import React, { useEffect, useState } from "react";
import '../css/HallOfFame.css'
import HOFAchCard from './HOFAchCard'
import Achievement from './Achievement'
import Donut from './Donut'
import * as firebase from "../db/firebase";

// Temp user
const userID = "test-user";

function HallOfFrame() {
    //Firebase Stuff
    const [earned_ach, setEarnedAch] = useState([]);

    var achIds = [];

    useEffect(() => {
        firebase.getCollection(`users/${userID}/earned-Achievements/`).then((result) => {
            if(result.length === 0){
                const placeholder = {
                    description: "Unlock 12 sticky note colors by completing donuts",
                    id: "002",
                    level: 1,
                    title: "Sticking with it"
                }
                result.push(placeholder)
                firebase.createDocument(`users/${userID}/earned-Achievements/`, placeholder).then((id) => {
                    achIds.push(id)
                })
            }


            setEarnedAch(result)
        });
    }, []);


    return (
        <div className='container'>
            <div className='row'>
                {earned_ach.map((element) => (
                    <HOFAchCard title={element["title"]} badge={element["id"]} level={element["level"]}
                        description={element["description"]} key={element["id"]}></HOFAchCard>
                ))}
            </div>

        </div>
    )
}

export default HallOfFrame