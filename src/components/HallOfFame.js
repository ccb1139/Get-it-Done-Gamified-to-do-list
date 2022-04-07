import React from 'react'
import '../css/HallOfFame.css'
import HOFAchCard from './HOFAchCard'
import Achievement from './Achievement'
import Donut from './Donut'

function HallOfFrame() {
    return (
        <div className='container'>
            <div className='row'>
                <HOFAchCard title={"An Apple a Day 1"} badge="001" 
                description={"Complete 7 tasks total"}></HOFAchCard>
                <HOFAchCard title={"Sticking with it 2"} badge="002" 
                description={"Unlock 12 sticky note colors by completing donuts"}></HOFAchCard>
            </div>

        </div>
    )
}

export default HallOfFrame