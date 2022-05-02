
import cosmetic from '../img/how/unlockables.png';
import donut from '../img/how/donut.png';
import habit from '../img/how/newhabit.png';
import list from '../img/how/todolist.png';
import arch from '../img/how/achievement.png';
import edit from '../img/how/edit.png';

import { Container, Row, Col} from 'react-bootstrap';

const HowTo = () => {
    return (
        <>
            <div>
                <Container> 
                    <Row className="m-5">
						<h1 className="text-center m-2"> <span className="difText"> How To Use </span> </h1> 
                    </Row>
                </Container>
            </div>

            <div>
                <Container> 
                    <Row className="m-4">
						<h2 className="text-center m-2">New <span className="difText"> Habit </span> </h2> 
                    </Row>
                </Container>
            </div>

            <div>
                <Container> 
                    <Row className="mb-4">
                        <img src={habit} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                    </Row>    
                </Container>
            </div>

            <div className="keyFeature">
                <Container> 
                    <Row className="mt-3 pt-3">
						<h2 className="text-center m-2"> Edit <span className="difText"> Tasks </span> </h2> 
                    </Row>
                </Container>
            </div>

            <div className="keyFeature">
                 <Container className="keyFeatureContainer" > 
                    <Row>
                        <Col className="keyFeatureCol" >
                            <Row className="p-5">
                                <img src={edit} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                            </Row>
                        </Col>
                    </Row>    
                </Container>
            </div>

            <div>
                <Container> 
                    <Row className="mt-3 pt-5">
						<h2 className="text-center m-2">To-Do <span className="difText"> List </span> </h2> 
                    </Row>
                </Container>
            </div>

            <div>
                
                <Container className="keyFeatureContainer" > 
                    <Row>
                        <Col lg={6} className="keyFeatureCol" >
                            <Row className="mt-5">
                                <img src={list} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                            </Row>
                        </Col>
        
                        <Col lg={6} className="keyFeatureCol">
                            <Row className="mt-5">
                                <img src={donut} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                            </Row>
                        </Col>
                    </Row>    
                </Container>
            </div>

            <div className="keyFeature">
                <Container> 
                    <Row className="mt-5 pt-5">
						<h2 className="text-center m-2"> Achievement <span className="difText">System</span></h2> 
                    </Row>
                </Container>
            </div>

            <div className="keyFeature">
            <Container> 
                    <Row>
                        <Col lg={6} className="keyFeatureCol" >
                            <Row className="mt-5">
                                <img src={cosmetic} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                            </Row>
                        </Col>
        
                        <Col lg={6} className="keyFeatureCol">
                            <Row className="mt-5 mb-5">
                                <img src={arch} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                            </Row>
                        </Col>
                    </Row>    

                
            </Container>
            </div>
        </>
    );
  }
  
  export default HowTo