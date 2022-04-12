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

    useEffect(() => {
        firebase.getCollection(`users/${userID}/earned-Achievements/`).then((result) => {
            setEarnedAch(result)
        });
    }, []);


    const earned_ach_db = [{
        description: "Unlock 12 sticky note colors by completing donuts",
        id: "002",
        level: 2,
        title: "Sticking with it"
    },
    {
        description: "Complete 7 tasks total",
        id: "001",
        level: 1,
        title: "An Apple a Day"
    }
    ]

    return (
        <div className='container'>
            <div className='row'>
                {earned_ach_db.map((element) => (
                    <HOFAchCard title={element["title"]} badge={element["id"]} level={element["level"]}
                        description={element["description"]} key={element["id"]}></HOFAchCard>
                ))}
            </div>

        </div>
    )
}

export default HallOfFrame