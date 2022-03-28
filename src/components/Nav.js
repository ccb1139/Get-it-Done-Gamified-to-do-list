import logo from '../img/logo.png';
import setting from '../img/gear.svg';
import github from '../img/github.svg';
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Signin from './Signin';

const MainNav = () => {
  const appname = "Get-it-Done-Gamified-to-do-list";

  // Open and closing signin page
  const [show, setShow] = useState(false);
  function openSignin() { setShow(true) }
  function closeSignin() { setShow(false) }

  return (
  <div>
      <Navbar className ='navbar' sticky="top" expand="lg">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to={appname + "/"}>
              <img src={logo} alt="Get It Done Logo" id="logoImg" heigth= "120" width = "70"/>  
            </Nav.Link>
            
          </Navbar.Brand>
        
        <Navbar.Toggle />
        <Navbar.Collapse>

            <Nav className='navbar-nav nav me-auto'>
              <Nav.Link as={Link} to={appname + "/NewHabit"}> New Habit</Nav.Link>
              <Nav.Link as={Link} to={appname + "/Tasks"}> Lists </Nav.Link>
              <Nav.Link as={Link} to={appname + "/Achievements"}> Achievements</Nav.Link>
              <Nav.Link as={Link} to={appname + "/AboutUs"}> About Us</Nav.Link>
              {/* Temp wheelspin button on nav bar */}
              <Nav.Link as={Link} to={appname + "/Wheelspin"}> Wheelspin</Nav.Link>
            </Nav>

            <Nav> 
              <Nav.Link as={Link} to={appname + "/Settings"}>
                <img src={setting} alt="Settings" className = "icons" width="30" height="30"/>  
              </Nav.Link>
              
              <Nav.Link href="https://github.com/ccb1139/Get-it-Done-Gamified-to-do-list">
                <img src={github} alt="Github Link" className = "icons" width="30" height="30"/>  
              </Nav.Link>
    
              <Button id="signIn" size="sm" onClick={openSignin}> Sign-in </Button>
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Signin show={show} close={closeSignin}/>
  </div>

  );
}

export default MainNav