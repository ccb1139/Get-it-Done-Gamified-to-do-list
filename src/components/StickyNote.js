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


    if (color[0] != "#") {
        color = "#" + color
    }

    function stickyClicked() {
        //console.log("Clicked on: " + id);
    }

    // denoteObj is the new label for the data base and old id is the id of the prev habit or task sticky
    function updateStickyDenote(denoteObj, oldId) {
        if (id === oldId) {
            window.alert("Please select a new stickynote!");
            return;
        }

        // If the current sticky note is the already the habit and we want it to be the task:
        // make the task sticky not the habit sticky note and make the habit the task
        if (oldId == hId && id == tId) {
            firebase.updateDocument(`users/${userID}/collectables/${hId}`, { habit: false, task: true }).then(() => { });
            firebase.updateDocument(`users/${userID}/collectables/${tId}`, { habit: true, task: false }).then(() => { });
        }
        else if (oldId == tId && id == hId) {
            firebase.updateDocument(`users/${userID}/collectables/${tId}`, { habit: true, task: false }).then(() => { });
            firebase.updateDocument(`users/${userID}/collectables/${hId}`, { habit: false, task: true }).then(() => { });
        } else {
            firebase.updateDocument(`users/${userID}/collectables/${oldId}`, { habit: false, task: false }).then(() => { });
            firebase.updateDocument(`users/${userID}/collectables/${id}`, denoteObj).then(() => { });
        }

    }

    //style={{ filter: 'opacity(0.5) drop-shadow(0 0 0 ' + color + ' )' }}

    return (
        <div className='stickyDiv'>
            <div onClick={stickyClicked}
                onContextMenu={e => {
                    e.preventDefault();
                    var list = document.getElementsByClassName("szh-menu--state-open")


                    setAnchorPoint({ x: e.clientX, y: e.clientY });

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
            </ControlledMenu>
        </div>
    )
}

export default StickyNote