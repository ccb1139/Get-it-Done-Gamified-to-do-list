import Task from "./Task";
import Donut from "./Donut";
import AddTaskButton from "./AddTaskButton";
import DraggableStickyNote from "./DraggableStickyNote";
import { Container, Image, Row, Col } from "react-bootstrap";
import TrackerContainer from "./TrackerContainer";
import { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlineStickyNote2 } from "react-icons/md";
import * as firebase from "../db/firebase";

const DailyView = () => {
    const [tasks, setTasks] = useState([]);

    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var today = new Date();
    var listSize = tasks.length;

    function toggleDailyView() {
        var traditionalElements = document.getElementsByClassName("dailyViewTraditional");
        var stickyElements = document.getElementsByClassName("dailyViewStickyNotes");

        var traditional = window.getComputedStyle(traditionalElements[0]).display;

        if (traditional === "block") {
            Array.prototype.forEach.call(traditionalElements, (element) => element.style.display = "none")
            Array.prototype.forEach.call(stickyElements, (element) => element.style.display = "block")
        } else {
            Array.prototype.forEach.call(traditionalElements, (element) => element.style.display = "block")
            Array.prototype.forEach.call(stickyElements, (element) => element.style.display = "none")
        }
    }
    
    return (
        <>
            {/* <div className="taskHeading border border-dark">
                <h1 className="text-center">Today - {today}</h1>
                <div className="form-switch text-center">
                    <input id="dailyViewToggle" className="form-check-input" type="checkbox"
                        role="switch" onClick={toggleDailyView} />
                </div>
            </div>

            <Container className="taskContainer border border-dark">
                <AddTaskButton onAdd={addTask} />
                <div id="dailyViewTraditional">
                    {tasks.map((task) => <Task key={task.id} task={task} onDelete={deleteTask} onComplete={completeTask} />)}
                </div>

                <div id="dailyViewStickyNotes">
                    {tasks.map((task) => <DraggableStickyNote color={"#ff7575"} key={task.id} task={task} onDelete={deleteTask} onComplete={completeTask} />)}
                </div>
            </Container> */}
            <div className="viewToggleButton text-center">
                <AiOutlineUnorderedList className="d-inline" size="25" />
                <div className="form-switch d-inline">
                    <input id="dailyViewToggle" className="form-check-input" type="checkbox" role="switch" onClick={toggleDailyView} />
                </div>
                <MdOutlineStickyNote2 className="inline" size="25" />
            </div>

            <ToDoList Day={dayName[today.getDay()]} curDate={today} updateTasks={setTasks} />

            <TrackerContainer tasks={tasks} view={"daily"} />

            {/* <Container className="col-sm-10 fixed-bottom border border-dark" fluid>
                <div>
                    <Row>
                        <Col lg={9} sm={6} xs={6} id="habitDonuts">
                            <span className="trackerText">Habit Trackers</span>
                            <Donut complete={(tasks.filter(task => task.habit && task.completed).length)}
                            total={(tasks.filter(task => task.habit).length)} size={150}></Donut>
                        </Col>
                        <Col lg={3} sm={6} xs={6} id="dailyDonut">
                            <span className="trackerText">Daily Tracker</span>
                            <Donut complete={tasks.filter(task => task.completed).length}
                                total={listSize} size={150}></Donut>
                        </Col>
                    </Row>
                </div>
            </Container> */}
        </>
    );
}

export default DailyView