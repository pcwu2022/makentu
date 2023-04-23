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
    const [LowerLimitOxygen,setLowerLimitOxygen] =useState(85);
    const [LowerLimitHeartrate,setLowerLimitHeartrate] =useState(50);
    const [UpperLimitHeartrate,setUpperLimitHeartrate] =useState(120);
    const handleDelete = (id) =>{
        const newPills = Pills.filter(pill => pill.id !== id);
        setPills(newPills);
    }

    function alertEvent1() {
        alert(" Your blood oxygen is too low, please pay attention! ");
    }
    function alertEvent2() {
        alert(" Your heartrate is too low, please pay attention! ");
    }
    function alertEvent3() {
        alert(" Your heartrate is too high, please pay attention! ");
    }
    
    if (Oxygen < LowerLimitOxygen){
        alertEvent1();
    }
    if (Heartrate < LowerLimitHeartrate){
        alertEvent2();
    }
    if (Heartrate > UpperLimitHeartrate){
        alertEvent3();
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
                <h1> Health Information </h1>
                Oxygen : {Oxygen} (mm Hg)
                <br></br>
                Lower-limit : {LowerLimitOxygen} (mm Hg)
                <br></br>
                <label> SET: </label>
                    <input 
                        type="number"
                        value={LowerLimitOxygen}
                        onChange={(e)=>setLowerLimitOxygen(e.target.value)}
                    />
                <br></br>

                Heartrate : {Heartrate} (Beat per minute)
                <br></br>
                Lower-limit : {LowerLimitHeartrate} (Beat per minute)
                <br></br>
                <label> SET: </label>
                    <input 
                        type="number"
                        value={LowerLimitHeartrate}
                        onChange={(e)=>setLowerLimitHeartrate(e.target.value)}
                    />
                <br></br>
                Upper-limit : {UpperLimitHeartrate} (Beat per minute)
                <br></br>
                <label> SET: </label>
                    <input 
                        type="number"
                        value={UpperLimitHeartrate}
                        onChange={(e)=>setUpperLimitHeartrate(e.target.value)}
                    />
                <br></br>
                
                
            </div>
        </div>
    );
}
export default MainPage;