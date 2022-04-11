
import Image from 'react-bootstrap/Image'
import { Container, Row, Col } from 'react-bootstrap'
import rewardEx from '../img/landing/rewards.png';
import taskEx from '../img/landing/task.png';
import trackerEx from '../img/landing/tracker.png';
import face from '../img/landing/faces/placeholder.png';

/*
var sectionStyle = {
    backgroundImage: `url(${LandingPageSkeleton})`
 }

*/

const Home = () => {
    return (
        <>
            <div>
                <Container> 
                    <Row className="m-5"> 
                        <h1 className="text-center m-2">Productivity with a <span className="difText"> Push </span> </h1> 
                        <p className="text-center m-2"> Lorem ipsum dolor sit amet, consectetur adipiscing elit </p> 
                    </Row>
                </Container>
            </div>
            <div className="keyFeature">
                <Container className="keyFeatureContainer" > 
                    <Row>
                        <Col lg={4} className="keyFeatureCol" >
                            <Row className="p-5">
                                <img src={rewardEx} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                            </Row>
                            <Row className="p-5">
                                 <p className="text-center">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas mi turpis, 
                                    ac bibendum neque faucibus et. Vivamus sodales lacus tristique justo dapibus, non aliquam magna volutpat. 
                                     
                                </p>
                            </Row>
                        </Col>
        
                        <Col lg={4} className="keyFeatureCol">
                            <Row className="p-5">
                                <img src={trackerEx} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                            </Row>
                            <Row className="p-5">
                                <p className="text-center">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas mi turpis, 
                                    ac bibendum neque faucibus et. Vivamus sodales lacus tristique justo dapibus, non aliquam magna volutpat. 
                                </p>
                            </Row>
                        </Col>

                        <Col lg={4} className="keyFeatureCol">
                            <Row className="p-5">
                                <img src={taskEx} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                            </Row>
                            <Row className="p-5">
                                <p className="text-center">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas mi turpis, 
                                    ac bibendum neque faucibus et. Vivamus sodales lacus tristique justo dapibus, non aliquam magna volutpat. 

                                </p>
                            </Row>
                        </Col>
                    </Row>    
                </Container>
            </div>

            <div>
                <Container> 
                    <Row className="m-5"> 
                        <h1 className="text-center m-2"> About <span className="difText"> Us </span> </h1> 
                    </Row>
                </Container>
            </div>
            
            <div className="">
                <Container className="keyFeatureContainer" > 
                    <Row>
                        <Col lg={4} className="p-2" >
                            <Row>
                                <img src={face} alt="Get It Done Logo" className="rounded-circle w-50 mx-auto" fluid="true"/>  
                            </Row>
                            <Row>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas mi turpis
                                </p>
                            </Row>
                        </Col>
        
                        <Col lg={4} className="p-2">
                            <Row>
                                <img src={face} alt="Get It Done Logo" className="rounded-circle w-50 mx-auto" fluid="true"/>  
                            </Row>
                            <Row>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas mi turpis
                                </p>
                            </Row>
                        </Col>

                        <Col lg={4} className="p-2">
                            <Row>
                                <img src={face} alt="Get It Done Logo" className="rounded-circle w-50 mx-auto" fluid="true"/>  
                            </Row>
                            <Row>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas mi turpis
                                </p>
                            </Row>
                        </Col>
                    </Row>  
                    <Row>
                        <Col lg={4} className="p-2" >
                            <Row>
                                <img src={face} alt="Get It Done Logo" className="rounded-circle w-50 mx-auto" fluid="true"/>  
                            </Row>
                            <Row>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas mi turpis
                                </p>
                            </Row>
                        </Col>
        
                        <Col lg={4} className="p-2">
                            <Row> 
                                <img src={face} alt="Get It Done Logo" className="rounded-circle w-50 mx-auto" fluid="true"/>  
                            </Row>
                            <Row>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas mi turpis
                                </p>
                            </Row>
                        </Col>
                    </Row>      
                </Container>
            </div>
        </>
    );
  }
  
  export default Home