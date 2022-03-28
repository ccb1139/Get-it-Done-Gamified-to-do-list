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
import AddTaskButton from "./AddTaskButton";
import { Container, Image } from "react-bootstrap";
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
                    {tasks.map((task) => <Task key={task.id} task={task} onDelete={deleteTask}/>)}
                    <AddTaskButton onAdd={addTask}/>
                </div>

                <div id="dailyViewStickyNotes">
                    <Image id="dailyViewPlaceHolder" src={DailyViewPlaceHolder}/>
                </div> 
            </Container>
        </>
    );
  }
  
  export default DailyView