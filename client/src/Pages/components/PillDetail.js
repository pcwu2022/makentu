import { useHistory,useParams } from "react-router-dom";
import './PillGrid.css';

const PillDetail = () => {
    const {id} =useParams();
    
    return ( 
        <div className="PillDetail">
            <h2> Pill Details - {id} </h2>
            <h3> Name: </h3> 
            <p> Introduction: </p>
            <p> Photo: </p>
        </div> 
     );
}
 
export default PillDetail;