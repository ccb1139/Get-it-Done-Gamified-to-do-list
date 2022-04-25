import ToDoList from "./ToDoList"
import Donut from "./Donut";
import TrackerContainer from "./TrackerContainer";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

function WeeklyView() {
    const [tasks, setTasks] = useState({ Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []});
    const [mondayTasks, setMondayTasks] = useState([]);
    const [tuesdayTasks, setTuesdayTasks] = useState([]);
    const [wednesdayTasks, setWednesdayTasks] = useState([]);
    const [thursdayTasks, setThursdayTasks] = useState([]);
    const [fridayTasks, setFridayTasks] = useState([]);
    const [saturdayTasks, setSaturdayTasks] = useState([]);
    const [sundayTasks, setSundayTasks] = useState([]);
    
    function getTasks() {
        setTasks({ Monday: mondayTasks, Tuesday: tuesdayTasks, Wednesday: wednesdayTasks, Thursday: thursdayTasks, Friday: fridayTasks, Saturday: saturdayTasks, Sunday: sundayTasks})
        // return { Monday: mondayTasks, Tuesday: tuesdayTasks, Wednesday: wednesdayTasks, Thursday: thursdayTasks, Friday: fridayTasks, Saturday: saturdayTasks, Sunday: sundayTasks} ;
        return tasks;
    }

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
    startDate.setDate((startDate.getDate() - startDate.getDay()));
    for (var i = 0; i < 7; i++) {
        weekDates.push( new Date(startDate) ); 
        startDate.setDate(startDate.getDate() + 1);
    }
    
    return (
        <>
            <div className="viewToggleButton text-center">
                <AiOutlineUnorderedList className="d-inline" size="25" />
                <div className="form-switch d-inline">
                    <input id="dailyViewToggle" className="form-check-input" type="checkbox" role="switch" onClick={toggleDailyView} />
                </div>
                <MdOutlineStickyNote2 className="inline" size="25" />
            </div>

            {/* <ToDoList Day="Sunday" curDate={weekDates[0]} updateTasks={today.getDay() === 0 ? setTasks : () => {} }/>
            <ToDoList Day="Monday" curDate={weekDates[1]} updateTasks={today.getDay() === 1 ? setTasks : () => {} } />
            <ToDoList Day="Tuesday" curDate={weekDates[2]} updateTasks={today.getDay() === 2 ? setTasks : () => {} } />
            <ToDoList Day="Wednesday" curDate={weekDates[3]} updateTasks={today.getDay() === 3 ? setTasks : () => {} } />
            <ToDoList Day="Thursday" curDate={weekDates[4]} updateTasks={today.getDay() === 4 ? setTasks : () => {} } />
            <ToDoList Day="Friday" curDate={weekDates[5]} updateTasks={today.getDay() === 5 ? setTasks : () => {} } />
            <ToDoList Day="Saturday" curDate={weekDates[6]} updateTasks={today.getDay() === 6 ? setTasks : () => {} } /> */}
            <ToDoList Day="Sunday" curDate={weekDates[0]} getTasks={getTasks} updateTasks={setSundayTasks}/>
            <ToDoList Day="Monday" curDate={weekDates[1]} getTasks={getTasks} updateTasks={setMondayTasks} />
            <ToDoList Day="Tuesday" curDate={weekDates[2]} getTasks={getTasks} updateTasks={setTuesdayTasks} />
            <ToDoList Day="Wednesday" curDate={weekDates[3]} getTasks={getTasks} updateTasks={setWednesdayTasks} />
            <ToDoList Day="Thursday" curDate={weekDates[4]} getTasks={getTasks} updateTasks={setThursdayTasks} />
            <ToDoList Day="Friday" curDate={weekDates[5]} getTasks={getTasks} updateTasks={setFridayTasks} />
            <ToDoList Day="Saturday" curDate={weekDates[6]} getTasks={getTasks} updateTasks={setSaturdayTasks} />

            <div style={{"height": "75px"}}></div>

            <TrackerContainer view={"weekly"} getTasks={getTasks} 
            mondayTasks={mondayTasks} tuesdayTasks={tuesdayTasks} wednesdayTasks={wednesdayTasks} thursdayTasks={thursdayTasks} 
            fridayTasks={fridayTasks} saturdayTasks={saturdayTasks} sundayTasks={sundayTasks} />

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
    )
}

export default WeeklyView