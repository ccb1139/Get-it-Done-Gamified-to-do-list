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
import { Container, Image, Row, Col } from "react-bootstrap";
import { useState } from "react";
import DailyViewPlaceHolder from "../img/DailyViewPlaceHolder.png"

const DailyView = () => {
    // Sample list of tasks
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "Example Task 1",
            due: "N/A",
            completed: false,
            habit: false,
        },
        {
            id: 2,
            text: "Example Task 2",
            due: "N/A",
            completed: false,
            habit: false,
        },
        {
            id: 3,
            text: "Example Task 3",
            due: "N/A",
            completed: false,
            habit: false,
        },
        {
            id: 4,
            text: "Example Task 4",
            due: "N/A",
            completed: false,
            habit: false,
        },
        {
            id: 5,
            text: "Example Habit",
            due: "N/A",
            completed: false,
            habit: true,
        }
    ])

    function deleteTask(id) {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    function completeTask(id) {
        const updatedTasks = tasks.map(task => {
          // if this task has the same ID as the edited task
          if (id === task.id) {
            // use object spread to make a new object
            // whose `completed` prop has been inverted
            return {...task, completed: !task.completed}
          }

          return task;
        });

        console.log(updatedTasks)
        setTasks(updatedTasks);

    }    

    function addTask(task) {
        // Generate random id for now
        const id = Math.floor(Math.random() * 1000) + 1;
        
        const newTask = { id, ...task }

        setTasks([...tasks, newTask])

        console.log(task);
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
            <div className="taskHeading">
                <h1 className="text-center">Today - {today}</h1>
                <div className="form-switch text-center">
                    <input id="dailyViewToggle" className="form-check-input" type="checkbox" 
                    role="switch" onClick={toggleDailyView}/>
                </div>
            </div>

            <Container className="taskContainer">
                <div id="dailyViewTraditional">
                    <AddTaskButton onAdd={addTask}/>
                    {tasks.map((task) => <Task key={task.id} task={task} onDelete={deleteTask} onComplete={completeTask}/>)}
                </div>

                <div id="dailyViewStickyNotes">
                    <Image id="dailyViewPlaceHolder" src={DailyViewPlaceHolder}/>
                </div> 
            </Container>

            <Container id="trackerContainer" fluid>
                <div>
                    <Row>
                        <Col lg={9} sm={6} xs={6} id="habitDonuts">
                            <Donut complete={2} total={listSize} size={150}></Donut>
                        </Col>
                        <Col lg={3} sm={6} xs={6} id="dailyDonut">
                            <Donut complete={tasks.filter(task => task.completed).length} total={listSize} size={150}></Donut>
                        </Col>
                    </Row>
                </div> 
            </Container>
        </>
    );
  }
  
  export default DailyView