import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route,Routes,Switch} from "react-router-dom";
import LoginPage from './Pages/LoginPage.js';
import MainPage from './Pages/MainPage.js';
import AddPage from './Pages/AddPage.js';
import PillDetail from './Pages/components/PillDetail.js';
import EditPage from './Pages/EditPage.js';

import 'bootstrap/dist/css/bootstrap.css';
// import './style.scss'

function App() {
  return (
    <div class="APP">
      <span class="App_header">SMART PILLBOX</span>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path='/MainPage' element={<MainPage/>}/>
          <Route path='/AddPill' element={<AddPage/>}/>
          <Route path='/EditPill/:id' element={<EditPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
