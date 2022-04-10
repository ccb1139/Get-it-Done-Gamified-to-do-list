import { Button, Collapse, Card, Form, Row, Col } from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import { useState } from "react";

const AddTaskButton = ({onAdd}) => {
    const [open, setOpen] = useState(false);
    
    function openCollapse() {
        setOpen(!open);
    }

    function handleSumbit() {
        const task = document.getElementById("taskInput");
        
        var today = new Date();
        const date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
        onAdd({
            text: task.value,
            completed: false,
            due: "N/A",
            created: date
        });
    }

    return (
        <>
            <button className="addTaskButton" onClick={openCollapse}><IoIosAddCircle size= {30} /></button>
            
            <Collapse in={open} >
                <Card body >
                    <Form className="addTaskForm">
                        <Row className="justify-content-center mb-3">
                            <Col className="col-2 align-self-center">
                                <Form.Label>Task</Form.Label> 
                            </Col>
                            
                            <Col className="col-8">
                                <input className="form-control" placeholder="Enter a task..." id="taskInput"></input>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Button className="w-25" onClick={handleSumbit}>
                                Add
                            </Button>
                        </Row>
                        
                        
                    </Form>
                </Card>
            </Collapse>
        </>
    );
  }
  
  export default AddTaskButton