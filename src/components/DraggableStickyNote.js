import "../css/DraggableStickyNote.css"
import { Row, Col } from "react-bootstrap"
import { MdClose } from "react-icons/md"
import { useState, useEffect } from "react";
import * as firebase from "../db/firebase";

const DraggableStickyNote = ({ color, task, onDelete, onComplete }) => {
    return (
        <div className={"DraggableStickyNote " + (task.habit ? "DraggableStickyNoteHabit" : "")}
            style={{ filter: 'opacity(0.7) drop-shadow(0 0 0 ' + color + ' )' }}>
            <Row className="StickyNoteRow">
                <Col className="col-2 p-0">
                    <input className="form-check-input taskCheckBox" type="checkbox" checked={task.completed}
                        onChange={() => onComplete(task.id)}></input>
                </Col>

                <Col className="col-8 p-0">
                    <p>{task.text}</p>
                </Col>

                <Col className="col-2 p-0">
                    <button className="closeButton" onClick={() => onDelete(task.id)}>
                        <MdClose size={20} className="pr-5" />
                    </button>
                </Col>
            </Row>
        </div>
    )
}

export default DraggableStickyNote