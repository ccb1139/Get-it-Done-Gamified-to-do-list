import React from 'react'
import '../css/HallOfFame.css'
import Image from 'react-bootstrap/Image'

function HOFAchCard({ title, badge, description }) {
    const expandBadge = (badgeId) => {
        badgeId.target.classList.add('cardHover');
    }
    const shrinkBadge = (badgeId) => {
        badgeId.target.classList.remove('cardHover');
    }

    return (
        <div id="HOFCard" className='col-sm-3 border'>
            <div id="HOFCardHeader"className='row-sm HOFcardInfo'>
                <h3 style={{fontWeight:"bold"}}>{title}</h3>
            </div>
            <div className='row-sm HOFcardInfo'>
                <Image className='col acvh-img' id="achv-badge"
                    src={require('../img/badges/' + badge + "/3.png")}
                    onMouseOver={expandBadge} onMouseLeave={shrinkBadge}/>
            </div>
            <div className='row-sm HOFcardInfo'>
                <p>75% of users have this</p>
            </div>
        </div>
    )
}

export default HOFAchCard