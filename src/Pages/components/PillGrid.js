import { Link } from "react-router-dom";
const PillGrid = ({Pills,title,handleDelete}) => {
    return ( 
        <div className="PillGrid">
            {Pills.map((pill)=>(
                <div className="PillPreview" key={pill.id}>
                    <Link to={`/pills/${pill.id}`}>
                        <h2> {pill.name} </h2>
                        <p> {pill.intro} </p>
                    </Link>
                    <button onClick={()=> handleDelete(pill.id)}>X</button>
                </div>
            ))}
        </div>
     );
}
 
export default PillGrid;