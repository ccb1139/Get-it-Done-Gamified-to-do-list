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