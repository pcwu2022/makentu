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
                location.state.username = sessionStorage.getItem("username");
            }
        }
        if (localArr.length === 0){
            // load sessionStorage
            if (sessionStorage.getItem("data") === null){
                navigate("/", {state: {username: null, message: "No data in sessionStorage"}});
            }
            try {
                localArr = JSON.parse(sessionStorage.getItem("data"));
                //console.log(localArr);
                setPills(localArr);
                //console.log(localArr.length);
            } catch (err) {
                console.error(err);
            }
        }
        fetch(sessionStorage.getItem("backHref")+ "getdata/drug?device=" + sessionStorage.getItem("device"), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((data) => {data.json()
            .then((data) => {
                let jsonData = data;
                
                // data processing
                if (jsonData.success === false){
                    alert("Message:" + jsonData.message);
                } else {
                    
                }

                // add image path
                for (let element of jsonData.deviceData){
                    if (element.image.indexOf("image/") !== -1  && element.image.indexOf("http" === -1)){
                        element.image = (sessionStorage.getItem("backHref") + element.image).replace("//image", "/image");
                    }
                }
                setPills(jsonData.deviceData);

                if (jsonData.success === true){
                    sessionStorage.setItem("data", JSON.stringify(jsonData.deviceData))
                }
            })
        })
        .catch((err) => {
            alert(`Cannot connect to server at ${sessionStorage.getItem("backHref")}`);
            console.error(err);
        });
    }, []);

    const Oxygen=99;
    const Heartrate=60;
    const [LowerLimitOxygen,setLowerLimitOxygen] =useState(85);
    const [LowerLimitHeartrate,setLowerLimitHeartrate] =useState(50);
    const [UpperLimitHeartrate,setUpperLimitHeartrate] =useState(120);
    const handleDelete = async (id) =>{
        // await
        // const newPills = Pills.filter(pill => pill.id !== id);
        // console.log(newPills);
        // setPills(newPills);

        // modify state Pills
        const newPills = [...Pills]
        newPills[id] = {
            id: id + "",
            have: false,
            name: "",
            intro: "",
            num: "0",
            giveDrug: [],
            image: "" //! default
        };
        // render again
        // with callback
        setPills(newPills);

        // load into sessionStorage
        sessionStorage.setItem("data", JSON.stringify(newPills));
        // send back to server
        fetch(sessionStorage.getItem("backHref") + "postdata/modify", {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                deviceName: sessionStorage.getItem("device"),
                deviceData: newPills
            })
        })
        .then(data => data.json())
        .then((data) => {
            if (data.success !== true){
                console.log("Failed to send.");
            }
        });
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
            <span className="Main_header">Health Information</span>
            <br></br>
            <div className="container">  
                <div className="row">   
                    <div className="Oxygen col-6">
                        <span className="HealthSubtitle">Oxygen : {Oxygen} (mm Hg)</span>
                        <br></br>
                        <label className="SetLimit"> Lower-limit: </label>
                            <input 
                                type="number"
                                value={LowerLimitOxygen}
                                onChange={(e)=>setLowerLimitOxygen(e.target.value)}
                            />
                    </div>
                    
                    <div className="Heartrate col-6">
                        <span className="HealthSubtitle">Heartrate : {Heartrate} (Beat per minute) </span>
                        <br></br>
                        <label className="SetLimit"> Lower-limit: </label>
                            <input 
                                type="number"
                                value={LowerLimitHeartrate}
                                onChange={(e)=>setLowerLimitHeartrate(e.target.value)}
                            />
                        <br></br>
                        <label className="SetLimit"> Upper-limit: </label>
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
            <br></br>
            <br></br>
        </div>
    );
}
export default MainPage;