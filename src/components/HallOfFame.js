import React, { useEffect, useState } from "react";
import '../css/HallOfFame.css'
import HOFAchCard from './HOFAchCard'
import Achievement from './Achievement'
import Donut from './Donut'
import * as firebase from "../db/firebase";

// Temp user
// const userID = "test-user";
const userID = firebase.getUserID();

function HallOfFrame() {
    //Firebase Stuff
    const [earned_ach, setEarnedAch] = useState([]);

    var achIds = [];

    useEffect(() => {
        firebase.getCollection(`users/${userID}/earned-Achievements/`).then((result) => {
            if(result.length === 0){
                const placeholder = {
                    description: "Login for the first time! (place holder)",
                    id: "001",
                    level: 1,
                    title: "First timer"
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