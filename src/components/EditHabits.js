import { Container, Row, Col, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import * as firebase from "../db/firebase";


const EditHabits = () => {

    // Grab user ID and habits that are stored

    const userID = firebase.getUserID();

    const [habits, setHabits] = useState([]);
    const [tasks, setTasks] = useState([]);

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

        //update current list of habits
        setTasks(tasks.filter((task) => task.id !== item.id))
    }

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
                            <Button onClick={() => handleDelete(habit)}>
                                <RiDeleteBack2Line className="" size="25" />
                            </Button>
                        </Col>
                    </Row>
                    
                    <Row className="p-5">
                      
                    </Row>
                </div>
                )}
        </Container>
        </>
    );
  }
  
  export default EditHabits