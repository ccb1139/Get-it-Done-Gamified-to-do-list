import 'bootstrap/dist/css/bootstrap.css'
import { Container, Dropdown, Form, Button, Row, Col } from "react-bootstrap";

const NewHabit = () => {
    return (
        <>
        <Container className="mt-3 mb-3">
            <Row className="justify-content-sm-center">
                <Col className="col-sm-2">
                    <h1 >New Habit</h1>
                </Col>
            </Row>
        </Container>
        

        <Container className="NewHabitForm w-50">
            <Form>
                <Row className="mb-4 justify-content-sm-center">
                    <Col className="col-lg-2">
                        <Form.Label>Habit Name</Form.Label> 
                    </Col>

                    <Col className="col-lg-4">
                        <Form.Control placeholder="Enter habit" />
                    </Col>
                </Row>

                <Row className="mb-4 justify-content-lg-center">
                    <Col className="col-lg-2">
                        <Form.Label>Task</Form.Label> 
                    </Col>

                    <Col className="col-lg-4">
                        <Form.Control placeholder="Enter task" />
                    </Col>
                </Row>

                <Row className="mb-4 justify-content-lg-center">
                    <Col className="col-lg-2">
                        <Form.Label>Frequency</Form.Label> 
                    </Col>

                    <Col className="col-lg-2">
                        <Form.Control placeholder="" />
                    </Col>

                    <Col className="col-lg-2">
                        <Form.Label>Days</Form.Label> 
                    </Col>
                </Row>

                <Row className="mb-4 justify-content-lg-center">
                    <Col className="col-lg-2">
                        <Form.Label>Length</Form.Label> 
                    </Col>

                    <Col className="col-lg-2">
                        <Form.Control placeholder="" />
                    </Col>

                    <Col className="col-lg-2">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                Days
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/weeks">Weeks</Dropdown.Item>
                                <Dropdown.Item href="#/months">Months</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                
            
                <Row className="justify-content-sm-center">
                    <Col className="col-sm-2">
                        <Button variant="primary" size="lg">
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