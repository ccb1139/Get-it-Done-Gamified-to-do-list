import Donut from "./Donut";
import { Container, Row, Col, Collapse, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import * as firebase from "../db/firebase";

const TrackerContainer = ({view, tasks, getTasks, mondayTasks, tuesdayTasks, wednesdayTasks, thursdayTasks, fridayTasks, saturdayTasks, sundayTasks}) => {
    const userID = firebase.getUserID();

    const [open, setOpen] = useState(false);
    const [habits, setHabits] = useState([]);
    const [localTasks, setLocalTasks] = useState([]);

    useEffect(() => {
        firebase.getCollection(`users/${userID}/Habits`).then((result) => {
            setHabits(result);
        });

        var weekDates = [];
        var startDate = new Date();
        startDate.setDate((startDate.getDate() - startDate.getDay()));
        for (var i = 0; i < 7; i++) {
            weekDates.push( new Date(startDate) ); 
            startDate.setDate(startDate.getDate() + 1);
        }

        if (view === "daily") {
            var tasksToAdd = [];
            const today = new Date();

            firebase.getCollection(`users/${userID}/Tasks`).then((result) => {
                result.forEach((element) => {
                    if (element.habit) {
                        element.tasks.forEach((task) => {
                            for (var i = 0; i < weekDates.length; i++) {
                                // Check if the element is {}
                                if (Object.keys(task).length === 0) { continue; }

                                const dueDate = new Date(task.due.seconds * 1000);
                                // Check that it is in this week
                                if (dueDate.getDate() === weekDates[i].getDate() && dueDate.getMonth() === weekDates[i].getMonth() && dueDate.getYear() === weekDates[i].getYear()) {
                                    // Check that it isn't today
                                    if (!(dueDate.getDate() === today.getDate() && dueDate.getMonth() === today.getMonth() && dueDate.getYear() === today.getYear()))
                                    tasksToAdd.push(task);
                                }
                            }
     
                        });
                        setLocalTasks(tasksToAdd);
                    }
                });
            });
        }
    }, []);

    function toggleMenu() {
        open ? setOpen(false) : setOpen(true);
    }

    if (view === "weekly") {
        function todaysTasks() {
            const today = new Date().getDay();
            switch (today) {
                case 0:
                    return sundayTasks;
                case 1:
                    return mondayTasks;
                case 2:
                    return tuesdayTasks;
                case 3:
                    return wednesdayTasks;
                case 4:
                    return thursdayTasks;
                case 5:
                    return fridayTasks;
                case 6:
                    return saturdayTasks;
                default:
                    return null;
            }
        }
    
        function allTasks() {
            var ret = [];
            sundayTasks.forEach(element => {
                ret.push(element);
            });
            mondayTasks.forEach(element => {
                ret.push(element);
            });
            tuesdayTasks.forEach(element => {
                ret.push(element);
            });
            wednesdayTasks.forEach(element => {
                ret.push(element);
            });
            thursdayTasks.forEach(element => {
                ret.push(element);
            });
            fridayTasks.forEach(element => {
                ret.push(element);
            });
            saturdayTasks.forEach(element => {
                ret.push(element);
            });
            return ret;
        }

        return (
            <>
                <div className="fixed-bottom">
                    <Button className="trackerContainerToggle" onClick={toggleMenu}>
                        {open ? <RiArrowDownSFill size={45} /> : <RiArrowUpSFill size={45} />}
                    </Button>
                    <Collapse in={open} className="trackerContainer">
                        <Container className="col-sm-10" fluid>
                            <div>
                                <Row>
                                    <Col className="habitDonuts">
                                        {habits.map((habit) => 
                                            <div className="d-inline-block mx-4" key={habit.id}>
                                                <span className="text-center d-block trackerText">{habit.habit}</span>
                                                <span className="text-center d-block">{habit.task}</span>
                                                <Donut
                                                // complete={5}
                                                complete={(allTasks()
                                                    .filter(task => task.text === habit.task && task.completed).length)}
                                                total={habit.frequency} size={150}></Donut>
                                                
                                                {/* <Donut complete={(tasks.filter(task => task.habit && task.completed).length)}
                                                total={(tasks.filter(task => task.habit).length)} size={150}></Donut> */}
                                            </div>
                                        )}
                                        <span className="trackerHeadingText">Weekly Habit Progress</span>
                                    </Col>
                                    <Col xl={2} lg={3} sm={4} xs={4} className="dailyDonuts text-center">
                                        <div className="d-inline-block">
                                            <div style={{"height" : "48px"}}></div>
                                            {/* <span className="d-block trackerText" style={{"margin-bottom": "24px"}}>{dayName[today.getDay()]}</span> */}
                                            <div className="dailyDonut">
                                                <Donut complete={(todaysTasks().filter(task => task.completed).length)}
                                                    total={todaysTasks().length} size={150}></Donut>
                                            </div>
                                        </div>
    
                                        <span className="trackerHeadingText">Daily Progress</span>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </Collapse>
                </div>
            </>
        );
    } else {

        
        
        // firebase.getCollection(`users/${userID}/Tasks`).then((result) => {
        //     // console.log(result);
        //     // setLocalTasks(result);
        // });

        return (
            <>
                <div className="fixed-bottom">
                    <Button className="trackerContainerToggle" onClick={toggleMenu}>
                        {open ? <RiArrowDownSFill size={45} /> : <RiArrowUpSFill size={45} />}
                    </Button>
                    <Collapse in={open} className="trackerContainer">
                        <Container className="col-sm-10" fluid>
                            <div>
                                <Row>
                                    <Col className="habitDonuts">
                                        {habits.map((habit) => 
                                            <div className="d-inline-block mx-4" key={habit.id}>
                                                <span className="text-center d-block trackerText">{habit.habit}</span>
                                                <span className="text-center d-block">{habit.task}</span>
                                                <Donut
                                                // complete={5}
                                                complete={((localTasks.concat(tasks))
                                                    .filter(task => task.text === habit.task && task.completed).length)}
                                                total={habit.frequency} size={150}></Donut>
                                                
                                                {/* <Donut complete={(tasks.filter(task => task.habit && task.completed).length)}
                                                total={(tasks.filter(task => task.habit).length)} size={150}></Donut> */}
                                            </div>
                                        )}
                                        <span className="trackerHeadingText">Weekly Habit Progress</span>
                                    </Col>
                                    <Col xl={2} lg={3} sm={4} xs={4} className="dailyDonuts text-center">
                                        <div className="d-inline-block">
                                            <div style={{"height" : "48px"}}></div>
                                            {/* <span className="d-block trackerText" style={{"margin-bottom": "24px"}}>{dayName[today.getDay()]}</span> */}
                                            <div className="dailyDonut">
                                                <Donut complete={(tasks.filter(task => task.completed).length)}
                                                    total={tasks.length} size={150}></Donut>
                                            </div>
                                        </div>
    
                                        <span className="trackerHeadingText">Daily Progress</span>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </Collapse>
                </div>
            </>
        );

    }

    

    // return (
    //     <>
    //         <div className="fixed-bottom">
    //             <Button className="trackerContainerToggle" onClick={toggleMenu}>
    //                 {open ? <RiArrowDownSFill size={45} /> : <RiArrowUpSFill size={45} />}
    //             </Button>
    //             <Collapse in={open} className="trackerContainer">
    //                 <Container className="col-sm-10" fluid>
    //                     <div>
    //                         <Row>
    //                             <Col className="habitDonuts">
    //                                 {habits.map((habit) => 
    //                                     <div className="d-inline-block mx-4" key={habit.id}>
    //                                         <span className="text-center d-block trackerText">{habit.habit}</span>
    //                                         <span className="text-center d-block">{habit.task}</span>
    //                                         <Donut
    //                                         // complete={5}
    //                                         complete={(allTasks()
    //                                             .filter(task => task.text === habit.task && task.completed).length)}
    //                                         total={habit.frequency} size={150}></Donut>
                                            
    //                                         {/* <Donut complete={(tasks.filter(task => task.habit && task.completed).length)}
    //                                         total={(tasks.filter(task => task.habit).length)} size={150}></Donut> */}
    //                                     </div>
    //                                 )}
    //                                 <span className="trackerHeadingText">Weekly Habit Progress</span>
    //                             </Col>
    //                             <Col xl={2} lg={3} sm={4} xs={4} className="dailyDonuts text-center">
    //                                 <div className="d-inline-block">
    //                                     <div style={{"height" : "48px"}}></div>
    //                                     {/* <span className="d-block trackerText" style={{"margin-bottom": "24px"}}>{dayName[today.getDay()]}</span> */}
    //                                     <div className="dailyDonut">
    //                                         <Donut complete={(todaysTasks().filter(task => task.completed).length)}
    //                                             total={todaysTasks().length} size={150}></Donut>
    //                                     </div>
    //                                 </div>

    //                                 <span className="trackerHeadingText">Daily Progress</span>
    //                             </Col>
    //                         </Row>
    //                     </div>
    //                 </Container>
    //             </Collapse>
    //         </div>
    //     </>
    // );

}
  
export default TrackerContainer