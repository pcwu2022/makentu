import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'
import { useNavigate, useLocation } from 'react-router-dom'
import './EditPage.css';



const EditPill=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const [act, setAct] = useState({});
    const id = params.id;
    const [name,setName] = useState('');
    const [intro,setIntro] = useState('');
    const [num,setNum] =useState(0);
    const [giveDrug,setGiveDrug] = useState([{time: '', dose: '',id:''}]);
    const [image,setImage] = useState('');
    // const getAct = () => {
    //     .get("/",{params:{id:id}}).then(res=>{
    //       setAct(res.data[0]);
    //     }).catch(err=>console.log("error in getAct",err))
    // }

    // load data on start
    useEffect(() => {
        // load sessionStorage
        if (sessionStorage.getItem("data") === null){
            navigate("/", {state: {username: null, message: "No data in sessionStorage"}});
        }
        try {
            let elData = JSON.parse(sessionStorage.getItem("data"))[id];
            console.log(elData);
            setName(elData.name);
            setIntro(elData.intro);
            setNum(elData.num);
            setGiveDrug(elData.giveDrug);
        } catch (err) {
            console.error(err);
        }
    }, [])

    const handleInput = (e,index) =>{
        const newgiveDrug = [...giveDrug];
        newgiveDrug [index][e.target.name] = e.target.value;
        newgiveDrug [index][e.target.id] = index;
        setGiveDrug(newgiveDrug);
    }

    const AddGiveDrug = (e) =>{
        let num = giveDrug.length;
        setGiveDrug([...giveDrug,{time: '', dose: '',id:num}]);
    }
     const DeleteGiveDrug = (e, idx) =>{
         const newGiveDrug = giveDrug.filter((_,id)=>id != idx);;
         setGiveDrug(newGiveDrug);
     }
     const onSubmit = () => {
        navigate("/MainPage", {state: {username: sessionStorage.getItem("username")}})
     };

    return  (
        <div className="EditPill">
            <span className="Edit_header">Edit Drug</span>
            <br></br>
            <form className='Edit_form'>
                <label className="Edit_subheader"> Drug Name: </label>
                    <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e)=>setName([...name,e.target.value])}
                    />
                <br></br>
                <label className="Edit_subheader"> Drug Description: </label>
                    <textarea 
                        type="text"
                        required
                        value={intro}
                        onChange={(e)=>setIntro([...intro,e.target.value])}
                    ></textarea>
                <br></br>
                <label 
                    className="Edit_subheader"
                    // value={image}
                    // onClick={setImage()}
                >Pill Photo: </label>
                <input type="file" required className="EditPhoto" />
                <br></br>

                <label className="Edit_subheader"> Drug Remaining Number: </label>
                    <input 
                        type="number"
                        required
                        value={num}
                        onChange={(e)=>setNum([...num,e.target.value])}
                    />
                <br></br>
            </form>
            {giveDrug.map((item, index) => {
                //console.log("index:",index)
                return(
                    <div className="Edit_Time"> 

                        <span className="EditTime_header">&nbsp;&nbsp;Taking Time: &nbsp; </span>
                        <label className="EditTime_subheader"> &nbsp;&nbsp;&nbsp;Time:&nbsp; </label>
                            <input 
                                name="time"
                                type="time"
                                required
                                value={item.time}
                                min="00:00" 
                                max="24:00"
                                onChange={(e) =>handleInput(e,index)}
                            />
                        <label className="EditTime_subheader"> &nbsp; &nbsp; Dose:&nbsp; </label>  
                            <input 
                                name="dose"
                                type="number"
                                required
                                min="1"
                                value={item.dose}
                                onChange={(e) =>handleInput(e,index)}
                            /> 
                        <p>&nbsp; &nbsp;&nbsp; &nbsp;</p>
                        <button 
                            className="btn btn-outline-danger " 
                            id={item.id}
                            onClick={(e) =>DeleteGiveDrug(e, index)}
                        >
                         X </button>
                         
                    </div>
                )
            })}
            <br></br>
            <div className="d-grid gap-2 col-3 mx-auto">
                <button className="btn btn-outline-success " onClick={AddGiveDrug}> ADD TIME </button>
                <button className="btn btn-outline-dark" onClick={onSubmit}> SAVE </button>
                <br></br>
                <br></br>
            </div>
        </div>
    );



}
export default EditPill;