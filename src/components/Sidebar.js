import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav } from 'react-bootstrap'

const Sidebar = () => {
    return (

        /*
       <div className="Sidebar">
           <ul className="SidebarList">
               <li className ="row"> Daily </li>
               <li className ="row"> Monthly</li>
               <li className ="row"> Weekly</li>
           </ul>
       </div>

       */
        <Nav className='Sidebar col-lg-2 nav sidebar-offcanvas'>
            <div className="SidebarList col-xs-6 col-sm-3 sidebar-offcanvas">
                <Nav.Link className ="navItem" href="#NewTasks"> Daily </Nav.Link>
                <Nav.Link className ="navItem"href="#Tasks"> Weekly</Nav.Link>
                <Nav.Link className ="navItem"href="#Achievements"> Monthly </Nav.Link>
           </div>
        </Nav>
    );
  }
  
  export default Sidebar