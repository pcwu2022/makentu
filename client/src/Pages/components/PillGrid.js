import {useNavigate, useLocation, Link } from "react-router-dom";
import {useState, useEffect} from "react";

const PillGrid = ({Pills,title,handleDelete}) => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log(Pills);
    return ( 
        <div className="PillGrid">
            {Pills.map((pill)=>(
                <div className="PillPreview" key={pill.id}>
                    <Link to={`/pills/${pill.id}`}>
                    <button onclick = {(e) => {e.target.key}} key = {pill.id}>
                        <h2> {pill.name} </h2>
                        <p> {pill.intro} </p>
                    </button>
                    <button onClick={()=> handleDelete(pill.id)}>X</button>
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default PillGrid;