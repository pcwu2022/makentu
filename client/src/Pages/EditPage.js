import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'
import { useNavigate, useLocation } from 'react-router-dom'
const EditPill=()=>{
    const location = useLocation();
    console.log(location.id);
}
export default EditPill;