import {useNavigate, useLocation, Link } from "react-router-dom";
import {useState, useEffect} from "react";

const PillGrid = ({Pills,title,handleDelete}) => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log(Pills);
    return (
        <div className="PillGrid">
            <div>
                {Pills.length!==0 && Pills.map((pill)=>{
                    if (pill.have == true){
                        console.log(pill);
                        return (
                            <div key={pill.id} className='border border-dark p-2 m-2 d-flex justify-content-between'> 
                                <div>
                                    <h3>{pill.name}</h3>
                                    <h4>{pill.intro.split('\n').map(subintro=>( 
                                        <span key={subintro}>{subintro}<br/></span>
                                    ))}</h4>
                                    <h4>Remaining Numbers: {pill.num}</h4>
                                    <h4>Taking time:
                                        {pill.giveDrug.map((subgiveDrug)=>(
                                            <h5>{subgiveDrug.time} : take {subgiveDrug.dose} pill(s)</h5>
                                        ))}
                                    </h4>
                                </div>

                                <div>
                                    <Link to={'/EditPill/'+pill.id} className='btn btn-outline-success d-flex justify-content-center'>Edit</Link>
                                    <button onClick={()=>handleDelete(pill.id)} className='btn btn-outline-danger mt-3'>Delete</button>
                                </div>
                            </div>
                        )
                    }
                    else if (pill.have == false){
                        return(
                            <Link to ="/AddPill" className='btn btn-outline-success d-flex justify-content-center'>ADD</Link>
                        )
                    }
                })}
            </div>

            {/* {Pills.map((pill)=> (
                <div className="PillPreview" key={pill.id}>
                    <Link to={`/pills/${pill.id}`}>
                    <button onclick = {(e) => {e.target.key}} key = {pill.id}>
                        <h2> {pill.name} </h2>
                        <p> {pill.intro} </p>
                    </button> 
                    </Link>
                    <button onClick={()=> handleDelete(pill.id)}>X</button>
                    
                </div>
            ))} */}
        </div>
    );
}
 
export default PillGrid;