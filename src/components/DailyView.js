// import DailyViewSc from '../img/DailyViewSc.png'
// import Image from 'react-bootstrap/Image'
// const DailyView = () => {
//     return (
//         <>
//             <Image src={DailyViewSc} fluid />
//         </>
//     );
//   }
  

//   export default DailyView

import Task from  "./Task";
import Donut from  "./Donut";
import AddTaskButton from "./AddTaskButton";
import DraggableStickyNote from "./DraggableStickyNote";
import { Container, Image, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import DailyViewPlaceHolder from "../img/DailyViewPlaceHolder.png"
import * as firebase from "../db/firebase";

// Temp user
const userID = "test-user";

const DailyView = () => {
    const [tasks, setTasks] = useState([]);

    // Get the list of tasks when the page loads
    useEffect(() => {
        firebase.getCollection(`users/${userID}/Tasks/`).then((result) => {
            setTasks(result);
        });
    }, []);

    function deleteTask(id) {
        setTasks(tasks.filter((task) => task.id !== id))

        firebase.deleteDocument(`users/${userID}/Tasks/${id}`).then(() => {});
    }

    function completeTask(id) {
        const updatedTasks = tasks.map(task => {
          // if this task has the same ID as the edited task
          if (id === task.id) {
            firebase.updateDocument(`users/${userID}/Tasks/${id}`, {completed: !task.completed}).then(() => {});

            // use object spread to make a new object
            // whose `completed` prop has been inverted
            return {...task, completed: !task.completed}
          }

          return task;
        });

        setTasks(updatedTasks);
    }    

    function addTask(task) {
        // Add inputted task to database
        firebase.createDocument(`users/${userID}/Tasks/`, task).then((id) => {

            // Use the id from the database as the id in the tasks array locally
            const newTask = { id, ...task }
            setTasks([...tasks, newTask])
        });

        // All tasks saved in the database for the given user
        // firebase.getCollection(`users/${userID}/Tasks/`).then((result) => {
        //     console.log(result);
        // });
    }

    function toggleDailyView() {
        var traditionalElement = document.getElementById("dailyViewTraditional");
        var stickyElement = document.getElementById("dailyViewStickyNotes");
        var traditional = window.getComputedStyle(traditionalElement).display;

        if (traditional === "block") {
            traditionalElement.style.display = "none";
            stickyElement.style.display = "block";
        } else {
            traditionalElement.style.display = "block";
            stickyElement.style.display = "none";
        }
    }

    var today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    today = month + "/" + day + "/" + year;
    var listSize = tasks.length;

    return (
        <>
            <div className="taskHeading border border-dark">
                <h1 className="text-center">Today - {today}</h1>
                <div className="form-switch text-center">
                    <input id="dailyViewToggle" className="form-check-input" type="checkbox" 
                    role="switch" onClick={toggleDailyView}/>
                </div>
            </div>

            <Container className="taskContainer border border-dark">
                <AddTaskButton onAdd={addTask}/>
                <div id="dailyViewTraditional">
                    {tasks.map((task) => <Task key={task.id} task={task} onDelete={deleteTask} onComplete={completeTask}/>)}
                </div>

                <div id="dailyViewStickyNotes">
                    {/* <Image id="dailyViewPlaceHolder" src={DailyViewPlaceHolder}/> */}
                    {tasks.map((task) => <DraggableStickyNote key={task.id} task={task} onDelete={deleteTask} onComplete={completeTask}/>)}
                    {/* <DraggableStickyNote /> */}
                </div> 
            </Container>

            <Container className="fixed-bottom border border-dark" fluid>
                <div>
                    <Row>
                        <Col lg={9} sm={6} xs={6} id="habitDonuts">
                            ignore this one
                            <Donut complete={2} total={listSize} size={150}></Donut>
                        </Col>
                        <Col lg={3} sm={6} xs={6} id="dailyDonut">
                            unstyled daily
                            <Donut complete={tasks.filter(task => task.completed).length} total={listSize} size={150}></Donut>
                        </Col>
                    </Row>
                </div> 
            </Container>
        </>
    );
  }
  
  export default DailyView