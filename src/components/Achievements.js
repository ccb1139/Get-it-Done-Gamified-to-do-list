import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect, useState } from "react";
import Achievement from './Achievement'
import badgeTmp from '../img/badgePlaceHolder.png'
import UnlockProgress from './UnlockProgress'
import Donut from './Donut'
import achJSON from '../ach/ach.json'



const Achievements = () => {
    return (
        <div className='overview col-10'>
            {achJSON.map((data) => (
                <Achievement key={data.ach_name} donut={<Donut total={2} complete={5} size={150}/>} badge={data.filename} 
                    title={data.ach_name} description={data.descp}/>
            ))}
            <UnlockProgress complete={3} total={5}></UnlockProgress>
        </div>
    );
  }
  
  export default Achievements