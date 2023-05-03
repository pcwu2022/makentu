import {useNavigate, useLocation, Link } from "react-router-dom";
import {useState, useEffect} from "react";

const PillGrid = ({Pills,title,handleDelete}) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="container" > 
            {/* className="PillGridA" */}
            <div>
                {Pills.length!==0 && Pills.map((pill)=>{
                    if (pill.have == true){                        
                                
                                    
                                    return(
                                    <div className='colleft'>
                                    <div key={pill.id} className=' d-flex PillGrid'> 
                                        <div>
                                            <div className="text">
                                            <h3 className="PillName">{pill.name}</h3>
                                            <h4 className="PillText">{pill.intro.split('\n').map(subintro=>( 
                                                <span key={subintro}>{subintro}<br/></span>
                                            ))}</h4>
                                            <h4 className="PillText">Remaining Numbers: {pill.num}</h4>
                                            <h4 className="PillText">Taking time:
                                                {pill.giveDrug.map((subgiveDrug)=>(
                                                    <div key={Math.random() + ""}>{subgiveDrug.time} : take {subgiveDrug.dose} pill(s)</div>
                                                ))}
                                            </h4>
                                            </div>
                                        </div>
                                        <div className="frame">
                                            <img src={pill.image} alt="PLEASE LOAD IMAGE" className="Image" width="200" height="200"></img>
                                        </div>
                                        <div className="EDButton">
                                            <Link to={'/EditPill/'+pill.id} className='btn btn-outline-success d-flex justify-content-center'>Edit</Link>
                                            <button onClick={()=>handleDelete(pill.id)} className='btn btn-outline-danger mt-3'>Delete</button>
                                        </div>
                                    </div>
                                    </div>
                                    )
                                    // else{ 
                                    // return(
                                    // <div className='colright'>
                                    // <div key={pill.id} className='d-flex PillGrid'> 
                                    //     <div className="text">
                                    //         <h3 className="PillName">{pill.name}</h3>
                                    //         <h4 className="PillText">{pill.intro.split('\n').map(subintro=>( 
                                    //             <span key={subintro}>{subintro}<br/></span>
                                    //         ))}</h4>
                                    //         <h4 className="PillText">Remaining Numbers: {pill.num}</h4>
                                    //         <h4 className="PillText">Taking time:
                                    //             {pill.giveDrug.map((subgiveDrug)=>(
                                    //                 <div key={Math.random() + ""}>{subgiveDrug.time} : take {subgiveDrug.dose} pill(s)</div>
                                    //             ))}
                                    //         </h4>
                                            
                                    //     </div>
                                    //     <img src={pill.image} alt="PLEASE LOAD IMAGE" className="Image" width="200" height="200"></img>
                                    //     <div className="EDButton">
                                    //         <Link to={'/EditPill/'+pill.id} className='btn btn-outline-success d-flex justify-content-center'>Edit</Link>
                                    //         <button onClick={()=>handleDelete(pill.id)} className='btn btn-outline-danger mt-3'>Delete</button>
                                    //     </div>
                                    // </div>
                                    // </div> )}
                                                        
                        // if(pill.id>=3){
                        //     return (
                        //     <div className='col'>
                        //     <div key={pill.id} className='border border-dark p-2 m-2 d-flex PillGridB'> 
                        //         <div>
                        //             <h3 className="PillName">{pill.name}</h3>
                        //             <h4 className="PillText">{pill.intro.split('\n').map(subintro=>( 
                        //                 <span key={subintro}>{subintro}<br/></span>
                        //             ))}</h4>
                        //             <h4 className="PillText">Remaining Numbers: {pill.num}</h4>
                        //             <h4 className="PillText">Taking time:
                        //                 {pill.giveDrug.map((subgiveDrug)=>(
                        //                     <div key={Math.random() + ""}>{subgiveDrug.time} : take {subgiveDrug.dose} pill(s)</div>
                        //                 ))}
                        //             </h4>
                                    
                        //         </div>
                        //         <img src={pill.image} alt="PLEASE LOAD IMAGE" className="Image" width="200" height="200"></img>
                        //         <div className="EDButton">
                        //             <Link to={'/EditPill/'+pill.id} className='btn btn-outline-success d-flex justify-content-center'>Edit</Link>
                        //             <button onClick={()=>handleDelete(pill.id)} className='btn btn-outline-danger mt-3'>Delete</button>
                        //         </div>
                        //     </div>
                        //     </div>
                        //     )
                    }
                    
                    else if (pill.have == false){
                        return(
                            <div key={pill.id}>
                                <br></br>
                                <Link to={'/EditPill/'+pill.id} className='btn btn-outline-success d-flex justify-content-center'>ADD</Link>
                                <br></br>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}
 
export default PillGrid;