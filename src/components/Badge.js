import React, { useState } from 'react';
import Image from 'react-bootstrap/Image'
import Tilt from 'react-parallax-tilt';
import '../css/Badge.css'

function Badge({ id, badge_path }) {
    const [scale, setScale] = useState(1.35);

    return (
        <Tilt scale={scale} transitionSpeed={2500}>
            <Image className='col acvh-img' id={id}
                src={require('../img/badges/' + badge_path + "/3.png")}
            />
        </Tilt>

    )
}

export default Badge