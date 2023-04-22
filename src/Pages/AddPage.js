import { useState } from 'react';

const AddPill = () => {
    const [name,setName] = useState('');
    const [intro,setIntro] = useState('');
    const [num,setNum] =useState(0);
    const [time,setTime] =useState();
    const [dose,setDose] =useState(0);
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
                <label> Drug Discription: </label>
                    <textarea 
                        type="text"
                        required
                        value={intro}
                        onChange={(e)=>setIntro(e.target.value)}
                    ></textarea>
                <br></br>
                <label> Drug Remaining Number: </label>
                    <input 
                        type="number"
                        required
                        value={num}
                        onChange={(e)=>setNum(e.target.value)}
                    />
                <br></br>
                <div class="form-group col-12 col-lg-4"> 
                    <label> Time: </label>
                        <input 
                            type="time"
                            required
                            value={time}
                            min="00:00" 
                            max="24:00"
                            onChange={(e)=>setTime(e.target.value)}
                        />
                     <label> Dose: </label>  
                        <input 
                            type="number"
                            required
                            value={dose}
                            onChange={(e)=>setDose(e.target.value)}
                        />  
                </div>
                <button> ADD TIME </button>
                <br></br>
                <button> SAVE </button>
            </form>
        </div>
    );
}
export default AddPill