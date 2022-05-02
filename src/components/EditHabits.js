import "../css/EditHabits.css"
import { Container, Row, Col, Button, Alert} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import * as firebase from "../db/firebase";


const EditHabits = () => {

    // Grab user ID and habits that are stored

    const userID = firebase.getUserID();

    const [habits, setHabits] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);

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

        //update current list of habits
        setTasks(tasks.filter((task) => task.id !== item.id))
        setShow(true);
    }

    return (
        <>
        <div className="NewHabitHeading">
            <h1> Edit Habits</h1>
        </div>
           <Container> 
                {habits.map((habit) => 
                    <div className= "border-bottom border-dark" id ={habit.id} key={habit.id}>
                    <Row className="m-4" >
                        <Col>
                            <span>{habit.habit}</span>
                        </Col>
                        <Col className="right-allign">
                            <Button variant="outline-dark" onClick={() => handleDelete(habit)}>
                                <RiDeleteBack2Line className="" size="25" />
                            </Button>
                        </Col>
                    </Row>
                </div>
                )}
        </Container>
        {show ? 
        <Container className="w-25 mt-5">
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                Habit successfully deleted!
            </Alert>
        </Container> : null}
        </>
    );
  }
  
  export default EditHabits