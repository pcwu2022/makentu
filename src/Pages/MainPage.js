import { React, useState } from "react";
import { Link } from "react-router-dom";
import PillGrid from './components/PillGrid';

const MainPage = () =>{
    const [Pills,setPills] = useState([
        {name: 'Aspirin', intro: 'for fever',num: 7, id: 1 },
        {name: 'Prolactin', intro: 'pain relief',num: 7, id: 2 }
    ]);
    const Oxygen=99;
    const Heartrate=60;
    const handleDelete = (id) =>{
        const newPills = Pills.filter(pill => pill.id !== id);
        setPills(newPills);
    }

   
    
    return(
        <div id = "root">   
            <h1> Home </h1>
            <div className="Main">
                <PillGrid Pills={Pills} title="All" handleDelete={handleDelete}/>
            </div>
            <br></br>
            <Link to ="/AddPill">ADD</Link>
            <div className="Health">
                <h1> Home </h1>
                Oxygen : {Oxygen} (mm Hg)
                <br></br>
                Heartrate : {Heartrate} (Beat per minute)
                <br></br>
                <button> SET LIMIT </button>
            </div>
        </div>
    );
}
export default MainPage;