import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"; 

const AddPill = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [intro,setIntro] = useState('');
    const [num,setNum] =useState(0);
    // const [time,setTime] =useState();
    // const [dose,setDose] =useState(0);
    const [giveDrug,setGiveDrug] = useState([{time: '', dose: ''}]);
    const handleInput = (e,index) =>{
        const newgiveDrug = [...giveDrug];
        newgiveDrug [index][e.target.name] = e.target.value;
        setGiveDrug(newgiveDrug);
    }
    const AddGiveDrug = (e) =>{
        //const newgiveDrug = [...giveDrug];
        setGiveDrug([...giveDrug,{time: '', dose: ''}]);
    }

    useEffect(() => {
        
    });

    return  (
        <div className="AddPill">
            <h2> ADD A NEW DRUG </h2>
            <form>
                <label> Drug Name: </label>
                    <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                <br></br>
                <label> Drug Description: </label>
                    <textarea 
                        type="text"
                        required
                        value={intro}
                        onChange={(e)=>setIntro(e.target.value)}
                    ></textarea>
                <br></br>

                <label>Pill Photo: </label>
                <br></br>
                <input type="file" id="myfile" name="myfile" />
                <br></br>

                <label> Drug Remaining Number: </label>
                    <input 
                        type="number"
                        required
                        value={num}
                        onChange={(e)=>setNum(e.target.value)}
                    />
                <br></br>
            </form>
            {giveDrug.map((item, index) => {
                return(
                    <div className="form-group col-12 col-lg-4"> 
                        <label> Time: </label>
                            <input 
                                name="time"
                                type="time"
                                required
                                value={item.time}
                                min="00:00" 
                                max="24:00"
                                onChange={(e) =>handleInput(e,index)}
                            />
                        <label> Dose: </label>  
                            <input 
                                name="dose"
                                type="number"
                                required
                                min="1"
                                value={item.dose}
                                onChange={(e) =>handleInput(e,index)}
                            />  
                    </div>
                )
            })}
            <br></br>
            <button onClick={AddGiveDrug}> ADD TIME </button>
            <br></br>
            <button > SAVE </button>
        </div>
    );
}
export default AddPill