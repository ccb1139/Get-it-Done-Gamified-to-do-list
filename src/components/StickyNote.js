import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import Tilt from 'react-parallax-tilt';
import { useEffect, useState, useRef } from "react";
import { Menu, MenuItem, ControlledMenu, SubMenu, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import * as firebase from "../db/firebase";


const userID = firebase.getUserID();

const StickyNote = ({ id, stickyImg, color, selectionMarker, hId, tId }) => {
    const [menuProps, toggleMenu] = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    const [status, setStatus] = useState();

    console.log("Hab Id: " + hId)
    console.log("Task Id: " + tId)

    if (color[0] != "#") {
        color = "#" + color
    }

    function stickyClicked() {
        console.log("Clicked on: " + id);
    }

    function updateStickyDenote(denoteObj, oldId) {
        console.log("Hab Id: " + hId)
        console.log("Task Id: " + tId)

        const labelStr = Object.keys(denoteObj)[0];

        firebase.updateDocument(`users/${userID}/collectables/${oldId}`, { habit: false, task:false }).then(() => { });

        firebase.updateDocument(`users/${userID}/collectables/${id}`, denoteObj).then(() => { });
    }

    //style={{ filter: 'opacity(0.5) drop-shadow(0 0 0 ' + color + ' )' }}

    return (
        <div className='stickyDiv'>
            <div onClick={stickyClicked}
                onContextMenu={e => {
                    e.preventDefault();
                    var list = document.getElementsByClassName("szh-menu--state-open")


                    setAnchorPoint({ x: e.clientX, y: e.clientY });

                    //console.log(list.length)
                    if (list.length === 0) {
                        toggleMenu(true);
                    }
                }}>

                <Tilt className='stickyTilt' tiltEnable={false} scale={1.17}
                    style={{ filter: 'opacity(0.7) drop-shadow(0 0 0 ' + color + ' )' }}>
                    <p className='TypeDenoter'>{selectionMarker}</p>
                </Tilt>
            </div>

            <ControlledMenu
                {...menuProps} anchorPoint={anchorPoint}
                onClose={() => toggleMenu(false)}>

                <MenuItem value="HabitNote"
                    onClick={(e) => {
                        selectionMarker = "H";
                        updateStickyDenote({ habit: true }, hId);
                    }}
                >Set as habbit sticky note</MenuItem>
                <MenuItem value="TaskNote"
                    onClick={(e) => {
                        selectionMarker = "T";
                        updateStickyDenote({ task: true }, tId);
                    }}>Set as task sticky note</MenuItem>
                <MenuItem>Close Menu</MenuItem>
            </ControlledMenu>
        </div>
    )
}

export default StickyNote