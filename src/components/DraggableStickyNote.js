import "../css/DraggableStickyNote.css"
import { Row, Col } from "react-bootstrap"
import { MdClose } from "react-icons/md"

const DraggableStickyNote = ({color, task, onDelete, onComplete}) => {
    return (
        <div className={"DraggableStickyNote " + (task.habit ? "DraggableStickyNoteHabit" : "")}>
            <Row className="StickyNoteRow">
                <Col className="col-2 p-0">
                    <input className="form-check-input taskCheckBox" type="checkbox" checked={task.completed}
                    onChange= {() => onComplete(task.id)}></input>
                </Col>

                <Col className="col-8 p-0">
                    <p>{task.text}</p>
                </Col>
                
                <Col className="col-2 p-0">
                    <button className="closeButton" onClick={() => onDelete(task.id)}>
                        <MdClose size={20} className="pr-5"/>
                    </button>
                </Col>
            </Row>
        </div>
    )
}

export default DraggableStickyNote