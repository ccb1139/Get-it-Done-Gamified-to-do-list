import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBack2Line } from "react-icons/ri";
import InvalidInput from './InvalidInput';
import { useForm } from "react-hook-form";
import { db } from "../db/firebase";
import { getDatabase, remove, ref, child, push, update} from "firebase/database";
import * as firebase from "../db/firebase";


const EditHabits = () => {

    // Grab user ID and habits that are stored

    const userID = firebase.getUserID();

    const [habits, setHabits] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);
    const [tempUuid, setTempUuid] = useState("");

    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    useEffect(() => {
        firebase.getCollection(`users/${userID}/Habits`).then((result) => {
            setHabits(result);
            
        });
    }, []);

    useEffect(() => {
        firebase.getCollection(`users/${userID}/Tasks/`).then((result) => {
            setTasks(result);
            
        });
    }, []);

    function findTaskId () {
        for (let key of tasks.keys()) {
            console.log(key);
        }
    }
   
    const handleDelete = (item) => {
        var temp; 
        var div = document.getElementById(`${item.id}`);

        //get key for task 
        for (let key of tasks.values()) {
           if(key.text == item.task) {
                temp = key.id;
           }
        }

        firebase.deleteDocument(`users/${userID}/Tasks/${temp}`).then(() => { });
        firebase.deleteDocument(`users/${userID}/Habits/${item.id}`).then(() => { });
        
        div.remove();
        setTasks(tasks.filter((task) => task.id !== item.id))
    }
    /*
    function saveHabit(e) {
        // Check if form has any errors
        // if (isSubmitSuccessful === false) {
        //     return;
        // }

        // Get data from form
        const habitName = document.getElementById("habitNameInput").value;
        const task = document.getElementById("taskInput").value;
        const frequency = document.getElementById("frequencyInput").value;
        const length = document.getElementById("lengthInput").value;
        const lengthUnit = document.getElementById("lengthUnitInput").value;
        
        // Start date
        var today = new Date();
        const start = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
        }

        // Convert length to days
        var totalDays = 0;
        if (lengthUnit === "Days") {
            totalDays = length
        } else if (lengthUnit === "Weeks") {
            totalDays = length * 7;
        } else if (lengthUnit === "Months") {
            totalDays = length * 30;
        }

        // End date
        const endDate = new Date(today.setDate(today.getDate() + parseInt(totalDays)));
        const end = {
            year: endDate.getFullYear(),
            month: endDate.getMonth() + 1,
            day: endDate.getDate()
        }

        // Save habit to database
        const habit = {
            habit: habitName,
            task: task,
            frequency: frequency,
            start: start,
            end: end
        }

        // Save habit
        firebase.createDocument(`users/${userID}/Habits/`, habit).then(() => {});

        var tasks = []
        for (var i = 0; i < totalDays; i++) {
            const todayTemp = new Date();
            const dueDate = new Date(todayTemp.setDate(todayTemp.getDate() + parseInt(i)));
            tasks.push({id: habitName + "___" + i, completed: false, due: dueDate, text: habit.task, habit: true})
        }

        // Create task related to habit
        var habitAsTask = {
            text: habit.task,
            // completed: false,
            habit: true,
            due: endDate,
            created: new Date(),
            tasks: tasks
        }
        firebase.createDocument(`users/${userID}/Tasks/`, habitAsTask).then((id) => {});


        // firebase.getCollection(`users/${userID}/Habits/`).then((result) => {
        //     console.log(result)
        // })

        setShow(true)
    }

    /*
    const handleSubmitChange = () => {
        const habitName = document.getElementById("habitNameInput").value;
        const task = document.getElementById("taskInput").value;
        const frequency = document.getElementById("frequencyInput").value;
        const length = document.getElementById("lengthInput").value;
        const lengthUnit = document.getElementById("lengthUnitInput").value;

        update(ref(db, '/$tempUuid'), {
            habit: habitName,
            task: task,
            frequency: frequency,
            /*
            start: start,
            end: end
        
            });
        }
        */
    return (
        <>
        <div className="NewHabitHeading">
            <h1> Edit Habits</h1>
        </div>
           <Container> 
                {habits.map((habit) => 
                    <div className="p-2" id ={habit.id} key={habit.id}>
                    <Row>
                        <Col>
                            <span className="">{habit.habit}</span>
                        </Col>
                        <Col>
                            {/*<Button className="m-1">
                                <AiOutlineEdit className="" size="25" />
                            </Button>
                                                        */}                            
                            <Button onClick={() => handleDelete(habit)}>
                                <RiDeleteBack2Line className="" size="25" />
                            </Button>
                        </Col>
                    </Row>
                    
                    <Row className="p-5">
                       {/* <Form >
                            <Row className="mb-2">
                                <Col className="col-4">
                                    <Form.Label htmlFor="habitNameInput" className="text-right">Habit Name</Form.Label> 
                                </Col>

                                <Col className="col-6">
                                    <input className="form-control"  
                                    id="habitNameInput" 
                                    autoComplete="off" 
                                    {...register("habitNameInput", {required: true, maxLength: 25})}
                                    aria-required="true"
                                    value={habit.habit}
                                    />
                                    
                                </Col>
                            </Row>
                            <div className="text-center mb-4">
                                {errors.habitNameInput?.type === "required" && <InvalidInput text="Habit name is required" />}
                                {errors.habitNameInput?.type === "maxLength" && <InvalidInput text="Habit name must be less than 25 characters" />}
                            </div>

                            <Row className="mb-2">
                                <Col className="col-4">
                                    <Form.Label htmlFor="taskInput" className="text-right">Task</Form.Label> 
                                </Col>

                                <Col className="col-6">
                                    <input className="form-control" 
                                    id="taskInput" 
                                    autoComplete="off" 
                                    {...register("taskInput", {required: true, maxLength: 25})}
                                    aria-required="true"
                                    value={habit.task}
                                    />
                                    
                                </Col>
                            </Row>
                            <div className="text-center mb-4">
                                {errors.taskInput?.type === "required" && <InvalidInput text="Task is required" />}
                                {errors.taskInput?.type === "maxLength" && <InvalidInput text="Task must be less than 25 characters" />}
                            </div>

                            <Row className="mb-2">
                                <Col className="col-4">
                                    <Form.Label htmlFor="frequencyInput" className="text-right">Frequency</Form.Label> 
                                </Col>

                                <Col className="col-3">
                                    <input className="form-control" 
                                    id="frequencyInput" 
                                    type="number" 
                                    autoComplete="off" 
                                    {...register("frequencyInput", {required: true, min:1, max: 7})}
                                    aria-required="true"
                                    value={habit.frequency}
                                    />
                                </Col>
                                
                                <Col className="col-3">
                                    <Form.Label>Days</Form.Label> 
                                </Col>
                            </Row>
                            <div className="text-center mb-4">
                                {errors.frequencyInput?.type === "required" && <InvalidInput text="Frequency is required" />}
                                {errors.frequencyInput?.type === "min" && <InvalidInput text="Frequency must be greater than 0" />}
                                {errors.frequencyInput?.type === "max" && <InvalidInput text="Frequency must be less than 7" />}
                            </div>

                            <Row className="mb-2">
                                <Col className="col-4">
                                    <Form.Label htmlFor="lengthInput" className="text-right">Length</Form.Label> 
                                </Col>

                                <Col className="col-3">
                                    <input className="form-control" 
                                    id="lengthInput" 
                                    type="number" 
                                    autoComplete="off" {...register("lengthInput", {required: true, min:1, max: 365})}
                                    aria-required="true"
                                    />
                                </Col>

                                <Col className="col-3">
                                    <select className="form-select" id="lengthUnitInput">
                                        <option value="Days">Days</option>
                                        <option value="Weeks">Weeks</option>
                                        <option value="Years">Years</option>
                                    </select>
                                </Col>
                                {/* <Col className="col-sm-3">
                                    <Select id="lengthUnitInput" styles={lengthUnitStyle}
                                    options={lengthUnitOptions}
                                    value={lengthUnitOptions.find(obj => obj.value === selectedLengthUnit)}
                                    onChange={updateLengthUnit}>
                                    </Select>
                                </Col> }
                            </Row>
                            <div className="text-center mb-4">
                                {errors.lengthInput?.type === "required" && <InvalidInput text="Length is required" />}
                                {errors.lengthInput?.type === "min" && <InvalidInput text="Length must be greater than 0" />}
                                {errors.lengthInput?.type === "max" && <InvalidInput text="Length must be less than 365" />}
                            </div>
                        
                            <Row>
                                <Col className="col-12 text-center" >
                                    <Button variant="primary" name="submit" size="lg" type="submit">Create</Button>
                                </Col>
                            </Row>
                        </Form> */ }
                    </Row>
                </div>
                )}
        </Container>
        </>
    );
  }
  
  export default EditHabits