import logo from '../img/logo.png';
import github from '../img/github.svg';
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import Signin from './Signin';
import { useNavigate } from "react-router-dom";

import * as firebase from "../db/firebase";
import { getAuth, signOut } from "firebase/auth";

const MainNav = () => {
  // const appname = "Get-it-Done-Gamified-to-do-list";
  const appname = "";

  var navigate = useNavigate();

  // Open and closing signin page
  const [showSignin, setShowSignin] = useState(false);
  function openSignin() { setShowSignin(true) }
  function closeSignin() { setShowSignin(false) }
  const [showSignup, setShowSignup] = useState(false);
  function openSignup() { setShowSignup(true) }
  function closeSignup() { setShowSignup(false) }

  function userSignOut() {
    localStorage.setItem("userSignedIn", false);
    localStorage.setItem("userID", null);
    localStorage.removeItem("userID");

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate(`${appname}/`);
    });
  }

  return (
  <div>
      <Navbar className='navbar' sticky="top" expand="lg">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to={appname + "/"}>
              <img src={logo} alt="Get It Done Logo" id="logoImg" heigth= "120" width = "70"/>  
            </Nav.Link>
            
          </Navbar.Brand>
        
        <Navbar.Toggle />
        <Navbar.Collapse>
        { JSON.parse(localStorage.getItem("userSignedIn")) ? 
          <>
            <Nav className='navbar-nav nav me-auto'>
              <Nav.Link as={Link} to={appname + "/HowTo"}> How To Use </Nav.Link>
              <NavDropdown title="Habits">
                <Nav.Link as={Link} to={appname + "/NewHabit"}> New Habit</Nav.Link>
                <Nav.Link as={Link} to={appname + "/EditHabits"}> Edit Habits</Nav.Link>
              </NavDropdown>
              <NavDropdown title="To-Do Lists">
                <NavDropdown.Item as={Link} to={appname + "/DailyView"}> Daily View </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={appname + "/WeeklyView"}> Weekly View </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Unlockables">
                <NavDropdown.Item as={Link} to={appname + "/Achievements"}> Achievements </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={appname + "/HallOfFrame"}> Hall Of Fame </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={appname + "/Wheelspin"}> Wheelspin </NavDropdown.Item>
              </NavDropdown>
              
              {/* <Nav.Link as={Link} to={appname + "/Achievements"}> Achievements</Nav.Link>
              <Nav.Link as={Link} to={appname + "/HallOfFrame"}> Hall Of Fame </Nav.Link>
              <Nav.Link as={Link} to={appname + "/Wheelspin"}> Wheelspin</Nav.Link> */}
            </Nav>

            <Nav> 
              {/* <Nav.Link as={Link} to={appname + "/Settings"}>
                <img src={setting} alt="Settings" className = "icons" width="30" height="30"/>  
              </Nav.Link> */}
              
              <Nav.Link href="https://github.com/ccb1139/Get-it-Done-Gamified-to-do-list">
                <img src={github} alt="Github Link" className = "icons" width="30" height="30"/>  
              </Nav.Link>
    
              
              <Button variant="outline-dark" id="signIn" size="sm" onClick={userSignOut}> Sign-out </Button> 
              
             
            </Nav>
          </> :
          <>
            <Nav className='navbar-nav nav me-auto'></Nav>
            <Nav>
              <Button variant="outline-dark" id="signIn" size="sm" onClick={openSignin}> Sign-in </Button>
            </Nav>
          </>
          }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Signin showSignin={showSignin} closeSignin={closeSignin} showSignup={showSignup} closeSignup={closeSignup} openSignup={openSignup} />
  </div>

  );
}

export default MainNav