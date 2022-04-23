import Task from "./Task";
import Donut from "./Donut";
import AddTaskButton from "./AddTaskButton";
import DraggableStickyNote from "./DraggableStickyNote";
import { Container, Image, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlineStickyNote2 } from "react-icons/md";
import * as firebase from "../db/firebase";

function ToDoList({Day, curDate, updateTasks}) {
    const userID = firebase.getUserID();
    const [tasks, setTasks] = useState([]);
    const [taskColor, setTaskColor] = useState("#FFFFFF");
    const [habitColor, setHabitColor] = useState("#FFFFFF");

    function updateTaskLists(tasks) {
        setTasks(tasks);
        updateTasks(tasks);
    }

    // Get the list of tasks when the page loads
    useEffect(() => {
        firebase.getCollection(`users/${userID}/Tasks/`).then((result) => {
            var tasksToAdd = []
            result.forEach((element) => {
                const elementDueDate = new Date(element.due.seconds * 1000);
                const elementStartDate = new Date(element.created.seconds * 1000);
                if (!element.habit) {
                    if (elementDueDate.getDate() === curDate.getDate()) {
                        tasksToAdd.push(element);
                    }
                } else if (elementDueDate >= curDate && curDate >= elementStartDate) {
                    tasksToAdd.push(element);
                }
            })
            updateTaskLists(tasksToAdd)
        });

        firebase.getCollection(`users/${userID}/collectables/`).then((result) => {
            result.forEach(sticky => {
                if (sticky.habit) {
                    setHabitColor("#" + sticky.color);
                }
                if (sticky.task) {
                    setTaskColor("#" + sticky.color);
                }
            });
            console.log(result);
        });
    }, []);

    function deleteTask(id) {
        updateTaskLists(tasks.filter((task) => task.id !== id))

        firebase.deleteDocument(`users/${userID}/Tasks/${id}`).then(() => { });
    }

    function completeTask(id) {
        const updatedTasks = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                firebase.updateDocument(`users/${userID}/Tasks/${id}`, { completed: !task.completed }).then(() => { });

                // use object spread to make a new object
                // whose `completed` prop has been inverted
                return { ...task, completed: !task.completed }
            }

            return task;
        });

        updateTaskLists(updatedTasks);
    }

    function addTask(task) {
        // Add inputted task to database
        firebase.createDocument(`users/${userID}/Tasks/`, task).then((id) => {

            // Use the id from the database as the id in the tasks array locally
            const newTask = { id, ...task }
            updateTaskLists([...tasks, newTask])
        });

        // All tasks saved in the database for the given user
        // firebase.getCollection(`users/${userID}/Tasks/`).then((result) => {
        //     console.log(result);
        // });
    }

    const today = new Date();
    const month = curDate.getMonth() + 1;
    const day = curDate.getDate();
    const year = curDate.getFullYear();
    const curDateDisplay = month + "/" + day + "/" + year;

    const todayColor = "#94d2bd";//"#ABC4FF";

    return (
        <>
            <div className="taskHeading border border-dark "
            style={(curDate.getDate() === today.getDate()) ? {"background" : todayColor } : {}}>
                <h1 className="text-center">{Day}</h1>
                <h5 className="text-center mb-0">{curDateDisplay}</h5>
            </div>

            <Container className="taskContainer border border-dark">
                <AddTaskButton onAdd={addTask} dueDate={curDate} color={(curDate.getDate() === today.getDate()) ? todayColor : ""} />
                <div className="dailyViewTraditional">
                    {tasks.map((task) => 
                    <Task key={task.id} task={task} onDelete={deleteTask} onComplete={completeTask} color={task.habit ? habitColor : taskColor} />)}
                </div>

                <div className="dailyViewStickyNotes">
                    {tasks.map((task) => <DraggableStickyNote key={task.id} task={task} onDelete={deleteTask} onComplete={completeTask} color={task.habit ? habitColor : taskColor} />)}
                </div>
            </Container>
        </>
    )
}

export default ToDoList