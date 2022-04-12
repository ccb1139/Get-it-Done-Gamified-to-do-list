import logo from '../img/logo.png';
import setting from '../img/gear.svg';
import github from '../img/github.svg';
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
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
  const [show, setShow] = useState(false);
  function openSignin() { setShow(true) }
  function closeSignin() { setShow(false) }

  function userSignOut() {
    localStorage.setItem("userSignedIn", false);

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate(`${appname}/`);

    }).catch((error) => {
      // An error happened.
    });
  }

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
        { JSON.parse(localStorage.getItem("userSignedIn")) ? 
          <>
            <Nav className='navbar-nav nav me-auto'>
              <Nav.Link as={Link} to={appname + "/NewHabit"}> New Habit</Nav.Link>
              <Nav.Link as={Link} to={appname + "/Tasks"}> Lists </Nav.Link>
              <Nav.Link as={Link} to={appname + "/Achievements"}> Achievements</Nav.Link>
              {/* Temp wheelspin button on nav bar */}
              <Nav.Link as={Link} to={appname + "/HallOfFrame"}> Hall Of Fame</Nav.Link>
              <Nav.Link as={Link} to={appname + "/Wheelspin"}> Wheelspin</Nav.Link>
            </Nav>

            <Nav> 
              <Nav.Link as={Link} to={appname + "/Settings"}>
                <img src={setting} alt="Settings" className = "icons" width="30" height="30"/>  
              </Nav.Link>
              
              <Nav.Link href="https://github.com/ccb1139/Get-it-Done-Gamified-to-do-list">
                <img src={github} alt="Github Link" className = "icons" width="30" height="30"/>  
              </Nav.Link>
    
              
              <Button id="signIn" size="sm" onClick={userSignOut}> Sign-out </Button> 
              
             
            </Nav>
          </> :
          <>
            <Nav className='navbar-nav nav me-auto'></Nav>
            <Nav>
              <Button id="signIn" size="sm" onClick={openSignin}> Sign-in </Button>
            </Nav>
          </>
          }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Signin show={show} close={closeSignin}/>
  </div>

  );
}

export default MainNav