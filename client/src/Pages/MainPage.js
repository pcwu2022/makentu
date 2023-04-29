import { React, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PillGrid from './components/PillGrid';
import './MainPage.css';

const MainPage = () =>{
    // get username from location
    const location = useLocation();
    const navigate = useNavigate();

    let localArr = [];
    
    // [
    //     {name: 'Aspirin', intro: 'for fever',num: 7, id: 1 },
    //     {name: 'Prolactin', intro: 'pain relief',num: 7, id: 2 }
    // ]
    const [Pills,setPills] = useState([]);

    // redirect if username is not present
    useEffect(() => {
        if (location.state === null || location.state.username === null){
            if (sessionStorage.getItem("username") === null){
                navigate("/", {state: {username: null}});
            } else {
                // update state
            }
        }
        if (localArr.length === 0){
            // load sessionStorage
            if (sessionStorage.getItem("data") === null){
                navigate("/", {state: {username: null, message: "No data in sessionStorage"}});
            }
            try {
                localArr = JSON.parse(sessionStorage.getItem("data"));
                console.log(localArr);
                for(let i = 0; i < localArr.length; i++){
                    localArr[i].id = i + "";
                }
                setPills(localArr);
                console.log(localArr.length);
            } catch (err) {
                console.error(err);
            }
        }
    }, []);

    const Oxygen=99;
    const Heartrate=60;
    const [LowerLimitOxygen,setLowerLimitOxygen] =useState(85);
    const [LowerLimitHeartrate,setLowerLimitHeartrate] =useState(50);
    const [UpperLimitHeartrate,setUpperLimitHeartrate] =useState(120);
    const handleDelete = async (id) =>{
        // await
        const newPills = Pills.filter(pill => pill.id !== id);
        console.log(newPills);
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
            <span className="Main_header">HOME</span>
            <div className="Main">
                <PillGrid Pills={Pills} handleDelete={handleDelete}/>
            </div>
            
            <div className="Health">
                <span className="Main_header">Health Information</span>
                <div className="Oxygen">
                    Oxygen : {Oxygen} (mm Hg)
                    
                    <br></br>
                    <label> Lower-limit: </label>
                        <input 
                            type="number"
                            value={LowerLimitOxygen}
                            onChange={(e)=>setLowerLimitOxygen(e.target.value)}
                        />
                </div>
                <br></br>
                <div className="Heartrate">
                    Heartrate : {Heartrate} (Beat per minute)
                    <br></br>
                    <label> Lower-limit: </label>
                        <input 
                            type="number"
                            value={LowerLimitHeartrate}
                            onChange={(e)=>setLowerLimitHeartrate(e.target.value)}
                        />
                    <br></br>
                    <label> Upper-limit: </label>
                        <input 
                            type="number"
                            value={UpperLimitHeartrate}
                            onChange={(e)=>setUpperLimitHeartrate(e.target.value)}
                        />
                    <br></br>
                </div>
                <br></br>
            </div>
        </div>
    );
}
export default MainPage;