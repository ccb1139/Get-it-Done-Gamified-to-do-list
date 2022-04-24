import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import Tilt from 'react-parallax-tilt';
import { useEffect, useState, useRef } from "react";
import { Menu, MenuItem, ControlledMenu, SubMenu, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import * as firebase from "../db/firebase";
import { memo } from "react";

const StickyNote = ({ id, idSender, color, hId, tId }) => {
    const userID = firebase.getUserID();

    const [menuProps, toggleMenu] = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    //const [selectionMarker, setSelectionMarker] = useState("");

    if (color[0] != "#") {
        color = "#" + color
    }

    useEffect(() => {


    }, []);

    const selectionMarker = (_id, habId, taskId) => {
        if (_id === habId) {
            // setSelectionMarker("H");
            return ("H");
        } else if (_id === taskId) {
            // setSelectionMarker("T");
            return ("T");
        } else {
            // setSelectionMarker("");
            return ("");
        }
    }

    // denoteObj is the new label for the data base and old id is the id of the prev habit or task sticky
    // newStatus = 0 for habit, 1 for task
    function updateStickyDenote(newStatus, curStickyId, habID, taskID) {


        // If the current sticky note is the already the habit and we want it to be the task:
        // make the task sticky not the habit sticky note and make the habit the task

        //Return a 2d array with the first index 
        //Switch habit and task with the cur sticky being the new habit
        if (curStickyId == taskID && newStatus == 0) {
            sendHabitAndTask([curStickyId, habID])
        }
        // Switch task and habit with the cur sticky being the new task
        else if (curStickyId == habID && newStatus == 1) {
            sendHabitAndTask([taskID, curStickyId])
        } 
        //set cur sticky to new status
        else {
            if (newStatus === 0) { sendHabitAndTask([curStickyId, taskID]) }
            else if (newStatus === 1) { sendHabitAndTask([habID, curStickyId]) }
        }

    }

    function sendHabitAndTask(type) {
        idSender(type);
    }


    return (
        <div className='stickyDiv'>
            <div
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
                    <p className='TypeDenoter'>{selectionMarker(id, hId, tId)}</p>
                </Tilt>
            </div>

            <ControlledMenu
                {...menuProps} anchorPoint={anchorPoint}
                onClose={() => toggleMenu(false)}>

                <MenuItem value="HabitNote"
                    onClick={(e) => {
                        updateStickyDenote(0, id, hId, tId);
                    }}
                >Set as habbit sticky note</MenuItem>
                <MenuItem value="TaskNote"
                    onClick={(e) => {
                        updateStickyDenote(1, id, hId, tId);
                    }}>Set as task sticky note</MenuItem>
            </ControlledMenu>
        </div>
    )
}

export default StickyNote