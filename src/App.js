import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route,Routes,Switch} from "react-router-dom";
import LoginPage from './Pages/LoginPage.js';
import MainPage from './Pages/MainPage.js';
import AddPage from './Pages/AddPage.js';
import PillDetail from './Pages/components/PillDetail.js';

function App() {
  return (
    <div className="APP">
      <h1>SMART PILLBOX</h1>
      <Router>
      <switch>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path='/MainPage' element={<MainPage/>}/>
          <Route path='/AddPill' element={<AddPage/>}/>
          <Route path='/pills/:id' element={<PillDetail/>}/>
        </Routes>
      </switch>  
      </Router>
    </div>
  );
}

export default App;
