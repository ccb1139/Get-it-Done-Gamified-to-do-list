import './App.css';
import MainNav from './components/Nav';
import HowTo from './components/HowTo';
import Home from './components/Home';
import DailyView from './components/DailyView';
import WeeklyView from './components/WeeklyView';
import Achievements from './components/Achievements';
import NewHabit from './components/NewHabit';
import Wheelspin from './components/Wheelspin';
import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HallOfFrame from './components/HallOfFame';

// Import firebase
import * as firebase from "./db/firebase";

function App() {
  // const appname = "Get-it-Done-Gamified-to-do-list";
  const appname = "";

  


  return (
  <div className="App"> 

    <Router>
      <MainNav />
      <Routes>
        <Route path={appname + "/"} exact element={<Home />} />
        <Route path={appname + "/HowTo"} element={<HowTo />} />
        <Route path={appname + "/NewHabit"} element={<NewHabit />} />
        <Route path={appname + "/DailyView"} element={<DailyView />} />
        <Route path={appname + "/WeeklyView"} element={<WeeklyView />} />
        <Route path={appname + "/Achievements"} element={<Achievements />} />
        {/* Temp wheel spin button on nav bar */}
        
        <Route path={appname + "/HallOfFrame"} element={<HallOfFrame />} />
        <Route path={appname + "/Wheelspin"} element={<Wheelspin/>} />
      </Routes>

    </Router>
  </div>
  );
}

export default App;
