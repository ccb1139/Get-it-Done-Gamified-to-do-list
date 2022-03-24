import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Select from 'react-select'

const NewHabit = () => {
    const lengthUnitOptions = [{value: "Days", label: "Days"},
    {value: "Weeks", label: "Weeks"},
    {value: "Months", label: "Months"}];

    const lengthUnitStyle = {
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? 'white' : 'black',
          backgroundColor: state.isSelected ? '#0D6EFD' : 'white'
        })
    }

    const [selectedLengthUnit, setSelectedLengthUnit] = useState(0);

    const updateLengthUnit = (e) => {
        setSelectedLengthUnit(e.value);
    }

    function saveHabit(e) {
        // Get data from form
        const habitName = document.getElementById("habitNameInput").value;
        const task = document.getElementById("taskInput").value;
        const frequency = document.getElementById("frequencyInput").value;
        const length = document.getElementById("lengthInput").value;
        const lengthUnit = selectedLengthUnit;
        
        // Validate input
        

        // Save habit to database
        const habit = {
            habit: habitName,
            task: task,
            frequency: frequency,
            length: length,
            lengthUnit: lengthUnit
        }

        // For now just output what will be saved to the database
        alert(JSON.stringify(habit));
    }

    return (
        <>
        <h1 className="NewHabitHeading">New Habit</h1>

        <Container className="NewHabitForm w-50">
            <Form>
                <Row className="mb-4">
                    <Col className="col-sm-4">
                        <Form.Label className="text-right">Habit Name</Form.Label> 
                    </Col>

                    <Col className="col-sm-6">
                        <Form.Control placeholder="Enter habit" id="habitNameInput"/>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col className="col-sm-4">
                        <Form.Label className="text-right">Task</Form.Label> 
                    </Col>

                    <Col className="col-sm-6">
                        <Form.Control placeholder="Enter task" id="taskInput" />
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col className="col-sm-4">
                        <Form.Label className="text-right">Frequency</Form.Label> 
                    </Col>

                    <Col className="col-sm-3">
                        <Form.Control type="number" id="frequencyInput" />
                    </Col>

                    <Col className="col-sm-3">
                        <Form.Label>Days</Form.Label> 
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col className="col-sm-4">
                        <Form.Label className="text-right">Length</Form.Label> 
                    </Col>

                    <Col className="col-sm-3">
                        <Form.Control type="number" id="lengthInput" />
                    </Col>

                    <Col className="col-sm-3">
                        <Select id="lengthUnitInput" styles={lengthUnitStyle}
                        options={lengthUnitOptions}
                        value={lengthUnitOptions.find(obj => obj.value === selectedLengthUnit)}
                        onChange={updateLengthUnit}>
                        </Select>
                    </Col>
                </Row>
                
            
                <Row>
                    <Col className="col-sm-12 text-center" >
                        <Button variant="primary" size="lg" onClick={saveHabit}>
                            Create
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
        </>
    );
  }
  
  export default NewHabit