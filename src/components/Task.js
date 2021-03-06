import { Row, Col } from "react-bootstrap"
import { MdClose } from "react-icons/md"
import { FaHospitalSymbol } from "react-icons/fa"

const Task = ({color, task, onDelete, onComplete}) => {
    return (
        <div className={"task mb-3 " + (task.habit ? "habit" : "")} key={task.id} style={{ filter: 'opacity(0.7) drop-shadow(0 0 0 ' + color + ' )' }}>
            <Row className="px-4 py-2">
                <Col className="col-1 align-self-center">
                    <input className="form-check-input taskCheckBox" type="checkbox" checked={task.completed}
                    onChange= {() => onComplete(task.id)}></input>
                </Col>

                <Col>
                    {/* {task.habit ? <FaHospitalSymbol className="d-inline" size={20} /> : <></>} */}
                    <h5 className="d-inline">{task.text}</h5>
                </Col>

                <Col className="col-1 ms-auto align-self-center">
                    {(!task.habit) ? <button className="closeButton" onClick={() => onDelete(task.id)}>
                        <MdClose size={20} className="pr-5"/>
                    </button> : null }
                </Col>
            </Row>
        </div>
    );
  }
  
  export default Task