import { React, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PillGrid from './components/PillGrid';
import './MainPage.css';

const MainPage = () =>{
    
    //for return
    const[mode,setMode]=useState('not_add');
    // const Appointments =[
    //     {have:true ,hospital: '臺大醫院', time: '05/20 (六) 12:00',Department:'Cardiology', address:'中山南路7號', website:'https://www.ntuh.gov.tw/ntuh/ntuhgroup.jsp',id: 0 },
    //     {have:true ,hospital: '馬偕紀念醫院', time: '05/20 (六) 12:00',Department:'Neurology', address:'104台北市中山區中山北路二段92號', website:'https://www.mmh.org.tw/home.php?area=tp',id: 1 }
    // ]
    const [Appointments,setAppointments] = useState([]);

    //! handle emergency
    const handleEmergency = () => {

    }

    const handleAppointmentInput = (e) =>{   
        console.log("e.target",e.target);   
        console.log("e.target.name",e.target.name);   
        console.log("e.target.value",e.target.value);  
        const newAppointments = [...Appointments];
        newAppointments [Appointments.length-1][e.target.name] = e.target.value;
        setAppointments(newAppointments);
    }
    const AddAppointment= (e) =>{
        let num = Appointments.length;
        if (Appointments.length<1){
            num = 0;
        }
        setAppointments([...Appointments,{have:false,hospital: '', time: '',Department:'', address:'', website:'',id:num}]);
    }
    
    const onSubmitAppointment = () =>{
        try {
            console.log(Appointments);
            let appointments = [...Appointments];
            appointments[appointments.length-1].have = true;
            setAppointments(appointments);
            fetch(sessionStorage.getItem("backHref") + "postdata/appointment", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: sessionStorage.getItem("username"),
                    appointments: [...appointments]
                })
            })
        } catch (err){
            console.error(err);
        }
    }
    const DeleteAppointments= (e, idx) =>{
        console.log("e",e)
        console.log("idx",idx)
        console.log(Appointments)
        const newAppointments = Appointments.filter((_,id)=>id != ""+idx);
        console.log("newAppointments",newAppointments)
        setAppointments(newAppointments);
        // const tempAppointments = [...newAppointments]
        for(let i=0;i<newAppointments.length;i++){
            newAppointments[i].id=""+i;
        }
        // console.log("tempAppointments",tempAppointments)
        setAppointments(newAppointments);  
        console.log("newAppointments2",newAppointments)
        onSubmitAppointment(); 
    }

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
        
        // fetch appointments
        fetch(sessionStorage.getItem("backHref")+ "getdata/appointment?username=" + sessionStorage.getItem("username"))
        .then(data => data.json())
        .then((data) => {
            for(let i=0;i<data.appointments.length;i++){
                data.appointments[i].id=i;
            }
            setAppointments([...data.appointments]);
        }).catch(err => console.error(err));

        // interval
        setInterval(() => {
            fetch(sessionStorage.getItem("backHref")+ "getdata/update")
                .then(data => data.json())
                .then((data) => {
                    if (data.emergency){
                        handleEmergency();
                    }
                    setHeartrate(data.heart);
                })
                .catch((err) => console.error(err));
        }, 3000);

    }, []);

    const Oxygen=99;
    const [Heartrate, setHeartrate] = useState(60);
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
    
    console.log("mode2",mode);

    return(
        <div id = "root">   
            <span className="Main_header">HOME</span>
            <div className="Main">
                <PillGrid Pills={Pills} handleDelete={handleDelete}/>
            </div>
            <span className="Main_header">Health Information</span>
            <br></br>
            <div className="container2">  
                <div className="row">   
                    <div className="Oxygen col-6">
                        <span className="HealthSubtitle">Oxygen : {Oxygen} (mm Hg)</span>
                        <br></br>
                        <div className="SetLimit">
                        <label> Lower-limit: </label>
                            <input 
                                type="number"
                                value={LowerLimitOxygen}
                                onChange={(e)=>setLowerLimitOxygen(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="Heartrate col-6">
                        <span className="HealthSubtitle">Heartrate : {Heartrate} (Beat per minute) </span>
                        <br></br>
                        <div className="SetLimit">
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
                    </div>
                    <br></br>
                    
                </div>
            </div>
            <br></br>
            <span className="Main_header">Return Appointment Information</span>

            <div className="BigAppointment_block">
                <div>
                    {Appointments.length!==0 && Appointments.map((appointment)=>{
                        return(
                        <div>
                            {appointment.have==true && <div className="Appointment_block m-5 p-5">
                                    <h2>{appointment.hospital} &nbsp;&nbsp; {appointment.department}</h2>
                                    <h3>{appointment.time}</h3>
                                    <h3>{appointment.address}</h3>
                                    <a href={appointment.website} class="btn btn-info" role="button">Hospital Website Link</a>
                                    <button 
                                        className="btn btn-outline-danger " 
                                        // id={appointment.id}
                                        onClick={(e) =>DeleteAppointments(e, appointment.id)}
                                    >
                                    X </button>
                                </div>
                            }
                        </div>
                        );
                    })}
                </div>
                {mode==='add' && <div className='AddAppointment'>
                                    <span className="Add_Appointment_header">Add a New Appointment</span>
                                    <div className='ADD_block'>
                                        <div>
                                            <label> Hospital: </label>
                                            <input 
                                                type="text"
                                                required
                                                name="hospital"
                                                value={Appointments[Appointments.length-1].hospital}
                                                onChange={(e)=>handleAppointmentInput(e)}
                                            />
                                            <br></br>
                                            <label> Time: </label>
                                            <input 
                                                type="text"
                                                required
                                                name="time"
                                                value={Appointments[Appointments.length-1].time}
                                                onChange={(e)=>handleAppointmentInput(e)}
                                            />
                                            <br></br>
                                            <label> Department: </label>
                                            <input 
                                                type="text"
                                                required
                                                name="department"
                                                value={Appointments[Appointments.length-1].department}
                                                onChange={(e)=>handleAppointmentInput(e)}
                                            />
                                            <br></br>
                                            <label> Address: </label>
                                            <textarea
                                                type="text"
                                                required
                                                name="address"
                                                value={Appointments[Appointments.length-1].address}
                                                onChange={(e)=>handleAppointmentInput(e)}
                                            ></textarea>
                                            <br></br>
                                            <label>Website: </label>
                                            <input 
                                                type="text"
                                                required
                                                name="website"
                                                value={Appointments[Appointments.length-1].website}
                                                onChange={(e)=>handleAppointmentInput(e)}
                                            />
                                            <br></br>
                                            
                                        </div>
                                        <br></br>
                                    </div>
                                    <br></br>
                                    
                                    <button className="btn btn-outline-success" onClick={()=>{
                                        setMode('not_add')
                                        onSubmitAppointment()
                                    }}> SAVE </button>
                                </div>
                            }
                <div className='d-flex justify-content-center'> 
                    {mode==='add' &&
                        <button className="btn btn-secondary btn-lg btn-block disabled" onClick={()=>{
                                        AddAppointment();
                                        setMode('add');
                        }}> ADD </button>
                    }
                    {mode==='not_add' &&
                        <button className="btn btn-secondary btn-lg btn-block" onClick={()=>{
                                        AddAppointment();
                                        setMode('add');
                        }}> ADD </button>
                    }
                </div>
            </div>

        </div>
    )
}
export default MainPage;