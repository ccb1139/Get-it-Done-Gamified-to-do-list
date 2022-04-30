import React from 'react'
import '../css/HallOfFame.css'
import Image from 'react-bootstrap/Image'
import ReactTooltip from 'react-tooltip';
import UnlockProgress from './UnlockProgress'
import Badge from './Badge';

function HOFAchCard({ title, badge, description, level, date }) {
    
    const toolTipStr = "You earned this achievment by " + description

    return (
        <div id="HOFCard" className='col-sm-3 border border-dark' data-tip={toolTipStr}>
            <div id="HOFCardHeader" className='row-sm HOFcardInfo border'>
                <h3 style={{ fontWeight: "bold" }} >{title + " " + level}</h3>
            </div>
            <div className='row-sm HOFcardInfo'>
                <Badge id="achv-badge" badge_id={badge} badge_level={level}> </Badge>
                
            </div>
            <div className='row-sm HOFcardInfo'>
                <p>Earned on {date}</p>
            </div>
            <ReactTooltip place="bottom" type="dark" effect="solid" />

        </div>
    )
}

export default HOFAchCard