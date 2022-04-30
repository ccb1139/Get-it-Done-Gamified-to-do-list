import { Container, Row, Col } from 'react-bootstrap'
import rewardEx from '../img/landing/rewards.png';
import taskEx from '../img/landing/task.png';
import trackerEx from '../img/landing/tracker.png';
import face from '../img/landing/faces/Ankit.jpg';
import john from '../img/landing/faces/johnface.png';
import michael from '../img/landing/faces/michaelface.jpg';
import rebecca from '../img/landing/faces/rebeccaface.jpg';
import caleb from '../img/landing/faces/calebface.jpg';


const Home = () => {
    return (
        <>
            <div>
                <Container> 
                    <Row className="m-5">
						<h1 className="text-center m-2">Get it Done</h1> 
                        <h2 className="text-center m-2">Productivity with a <span className="difText"> Push</span> </h2>
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
                                    Earn cool collectables and cosmetics for completing tasks and sticking to habits!
                                </p>
                            </Row>
                        </Col>
        
                        <Col lg={4} className="keyFeatureCol">
                            <Row className="p-5">
                                <img src={trackerEx} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                            </Row>
                            <Row className="p-5">
                                <p className="text-center">
                                    Keep track of upcoming tasks, daily chores, and consistent habits with convenient trackers!
                                </p>
                            </Row>
                        </Col>

                        <Col lg={4} className="keyFeatureCol">
                            <Row className="p-5">
                                <img src={taskEx} alt="Get It Done Logo" className= "keyImages" fluid="true"/>  
                            </Row>
                            <Row className="p-5">
                                <p className="text-center">
                                    View upcoming tasks in either a traditional list view or an intuitive sticky-note view!
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
                                <img src={rebecca} alt="Rebecca Alves" className="rounded-circle w-50 mx-auto" fluid="true"/>
                            </Row>
                            <Row style={{textAlign: "center"}} className="mx-auto">
								<h1>Rebecca Alvez</h1>
								<h3> Developer and Project Manager</h3>
                            </Row>
                        </Col>
        
                        <Col lg={4} className="p-2">
                            <Row>
                                <img src={caleb} alt="Caleb Bergen" className="rounded-circle w-50 mx-auto" fluid="true"/>  
                            </Row>
                            <Row style={{textAlign: "center"}} className="mx-auto">
								<h1>Caleb Bergen</h1>
								<h3>User Progression Developer</h3>
                            </Row>
                        </Col>

                        <Col lg={4} className="p-2">
                            <Row>
                                <img src={michael} alt="Michael McGilvray" className="rounded-circle w-50 mx-auto" fluid="true"/>  
                            </Row>
                            <Row style={{textAlign: "center"}} className="mx-auto">
								<h1>Michael McGilvray</h1>
								<h3>Lead Developer</h3>
                            </Row>
                        </Col>
                    </Row>  
                    <Row className="justify-content-md-center">
                        <Col lg={4} className="p-2" >
                            <Row>
                                <img src={john} alt="John O'Neill" className="rounded-circle w-50 mx-auto" fluid="true"/>  
                            </Row>
                            <Row style={{textAlign: "center"}} className="mx-auto">
								<h1>John O'Neill</h1>
								<h3>Developer / Backend</h3>
                            </Row>
                        </Col>
        
                        <Col lg={4} className="p-2">
                            <Row> 
                                <img src={face} alt="Ankit Lalotra" className="rounded-circle w-50 mx-auto" fluid="true"/> 
                            </Row>
                            <Row style={{textAlign: "center"}} className="mx-auto">
								<h1>Ankit Lalotra</h1>
								<h3>Developer</h3>
                            </Row>
                        </Col>
                    </Row>      
                </Container>
            </div>
        </>
    );
  }
  
  export default Home