import ToDoList from "./ToDoList"
import Donut from "./Donut";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

function WeeklyView() {
    const [tasks, setTasks] = useState([]);
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

    var weekDates = [];
    var startDate = new Date();
    startDate.setDate((startDate.getDate() - startDate.getDay() + 1)); // Start the week at monday
    for (var i = 0; i < 7; i++) {
        weekDates.push( new Date(startDate) ); 
        startDate.setDate(startDate.getDate() +1);
    }

    const today = new Date();

    return (
        <>
            <div className="viewToggleButton text-center">
                <AiOutlineUnorderedList className="d-inline" size="25" />
                <div className="form-switch d-inline">
                    <input id="dailyViewToggle" className="form-check-input" type="checkbox" role="switch" onClick={toggleDailyView} />
                </div>
                <MdOutlineStickyNote2 className="inline" size="25" />
            </div>

            <ToDoList Day="Monday" curDate={weekDates[0]} updateTasks={today.getDay() == 1 ? setTasks : () => {} } />
            <ToDoList Day="Tuesday" curDate={weekDates[1]} updateTasks={today.getDay() == 2 ? setTasks : () => {} } />
            <ToDoList Day="Wednesday" curDate={weekDates[2]} updateTasks={today.getDay() == 3 ? setTasks : () => {} } />
            <ToDoList Day="Thursday" curDate={weekDates[3]} updateTasks={today.getDay() == 4 ? setTasks : () => {} } />
            <ToDoList Day="Friday" curDate={weekDates[4]} updateTasks={today.getDay() == 5 ? setTasks : () => {} } />
            <ToDoList Day="Saturday" curDate={weekDates[5]} updateTasks={today.getDay() == 6 ? setTasks : () => {} } />
            <ToDoList Day="Sunday" curDate={weekDates[6]} updateTasks={today.getDay() == 0 ? setTasks : () => {} }/>

            <div style={{"height": "500px"}}></div>

            <Container className="col-sm-10 fixed-bottom border border-dark" fluid>
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
            </Container>
        </>
    )
}

export default WeeklyView