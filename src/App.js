import './App.css';
import MainNav from './components/Nav';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import DailyView from './components/DailyView';
import Achievements from './components/Achievements';
import NewHabit from './components/NewHabit';
import Wheelspin from './components/Wheelspin';
import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
  <div className="App"> 
    <Router>
      <MainNav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/NewHabit" element={<NewHabit />} />
        <Route path="/Tasks" element={<DailyView />} />
        <Route path="/Achievements" element={<Achievements />} />
        <Route path="/AboutUs" element={<Home />} />
        {/* Temp wheel spin button on nav bar */}

        /* this is a test */
        <Route path="/Wheelspin" element={<Wheelspin/>} />
      </Routes>

    </Router>
  </div>
  );
}

export default App;
