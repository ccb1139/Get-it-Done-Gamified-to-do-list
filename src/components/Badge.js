import React from 'react'
import Image from 'react-bootstrap/Image'
import '../css/Badge.css'

function Badge({ id, badge_path }) {
    const expandBadge = (badgeId) => {
        badgeId.target.classList.add('cardHover');
    }
    const shrinkBadge = (badgeId) => {
        badgeId.target.classList.remove('cardHover');
    }

    return (
        <div id="badgeConatiner">
            <Image className='col acvh-img' id={id}
                src={require('../img/badges/' + badge_path + "/3.png")}
                onMouseOver={expandBadge} onMouseLeave={shrinkBadge}
            />
        </div>

    )
}

export default Badge