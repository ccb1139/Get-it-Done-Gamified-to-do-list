import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect, useState } from "react";
import Achievement from './Achievement'
import badgeTmp from '../img/badgePlaceHolder.png'
import UnlockProgress from './UnlockProgress'
import Donut from './Donut'
import achJSON from '../ach/ach.json'



const Achievements = () => {
    var ach = JSON.parse(JSON.stringify(achJSON));
    var active_achs = []
    //console.log(ach)

    function create_ach(curr_ach){
        active_achs = []
        //console.log(curr_ach["id"])

        for (let i = 0; i < curr_ach.length; i++) {
            //console.log(curr_ach[i]["id"])
            //console.log(curr_ach[i]["level"])
            for(var key in ach){
                //console.log(ach[key]["id"])
                if((ach[key]["id"] == curr_ach[i]["id"]) && (ach[key]["level"] == curr_ach[i]["level"])){
                    // console.log(ach[key])
                    active_achs.push(ach[key])
                }
            }
        }
        //console.log(active_achs)
    }

    return (
        <div className='overview col-10'>
            {/* {achJSON.map((data) => (
                <Achievement key={data.ach_name} donut={<Donut total={4} complete={5} size={150}/>} badge={data.filename} 
                    title={data.ach_name} description={data.descp}/>
            ))} */}
            { create_ach( [{id:"001", level:3}, {id:"002", level:5}] )}
            { active_achs.map((element) => (
                // console.log(element["ach_name"])
                <Achievement key={element["ach_name"]} title={element["ach_name"]}
                description={element["descp"]} level={element["level"]} badge={element["id"]}
                donut={<Donut total={element["steps"]} complete={(Math.floor(Math.random() * (24 - 15) + 15))} size={150}/>}></Achievement>
            ))}
            
            <UnlockProgress complete={3} total={5}></UnlockProgress>
        </div>
    );
  }
  
  export default Achievements