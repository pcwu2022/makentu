import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"; 
import './AddPage.css';

const AddPill = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [intro,setIntro] = useState('');
    const [num,setNum] =useState(0);
    const [giveDrug,setGiveDrug] = useState([{time: '', dose: '',id:''}]);
    const [image,setImage] = useState('');
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

    // useEffect(() => {
        
    // });
    const onSubmit = () => {
        
    };

    return  (
        <div className="AddPill">
            <span className="Add_header">ADD A NEW DRUG</span>
            <br></br>
            <form className='Add_form'>
                <label className="Add_subheader"> Drug Name: </label>
                    <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                <br></br>
                <label className="Add_subheader"> Drug Description: </label>
                    <textarea 
                        type="text"
                        required
                        value={intro}
                        onChange={(e)=>setIntro(e.target.value)}
                    ></textarea>
                <br></br>
                <label className="Add_subheader">Pill Photo: </label>
                <input type="file"
                    // value={image}
                    // onClick={setImage()}
                    required 
                    className="Photo" />
                <br></br>

                <label className="Add_subheader"> Drug Remaining Number: </label>
                    <input 
                        type="number"
                        required
                        value={num}
                        onChange={(e)=>setNum(e.target.value)}
                    />
                <br></br>
            </form>
            {giveDrug.map((item, index) => {
                console.log("index:",index)
                return(
                    <div className="Add_Time"> 

                        <span className="AddTime_header">&nbsp;&nbsp;Taking Time: &nbsp; </span>
                        <label className="AddTime_subheader"> &nbsp;&nbsp;&nbsp;Time:&nbsp; </label>
                            <input 
                                name="time"
                                type="time"
                                required
                                value={item.time}
                                min="00:00" 
                                max="24:00"
                                onChange={(e) =>handleInput(e,index)}
                            />
                        <label className="AddTime_subheader"> &nbsp; &nbsp; Dose:&nbsp; </label>  
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
export default AddPill