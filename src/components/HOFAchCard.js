import React from 'react'
import '../css/HallOfFame.css'
import Image from 'react-bootstrap/Image'
import ReactTooltip from 'react-tooltip';
import UnlockProgress from './UnlockProgress'
import Badge from './Badge';

function HOFAchCard({ title, badge, description }) {
    
    const toolTipStr = "You earned this achievment by " + description

    return (
        <div id="HOFCard" className='col-sm-3 border' data-tip={toolTipStr}>
            <div id="HOFCardHeader" className='row-sm HOFcardInfo'>
                <h3 style={{ fontWeight: "bold" }} >{title}</h3>
            </div>
            <div className='row-sm HOFcardInfo'>
                <Badge id="achv-badge" badge_path={badge}> </Badge>
                
            </div>
            <div className='row-sm HOFcardInfo'>
                <p>75% of users have this</p>
            </div>
            <ReactTooltip place="bottom" type="dark" effect="solid" />

            <UnlockProgress complete={3} total={5}></UnlockProgress>
        </div>
    )
}

export default HOFAchCard