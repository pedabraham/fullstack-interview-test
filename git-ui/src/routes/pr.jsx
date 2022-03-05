import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import '../App.css';


let fetchPrs = (setFunct,PrId)=>{
    fetch('http://127.0.0.1:8000/pr/'+PrId)
    .then(response => response.json())
    .then(data => setFunct(data));
  }

let closePr = (PrId,setFunct,state_var)=>{
  fetch('http://127.0.0.1:8000/pr/'+PrId+'?status=closed', {
    method: 'PUT'
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .then(setFunct({
    ...state_var,
    status: 'closed'
  }));
}

let mergePr = (PrId,origin,destiny,setmsg)=>{
  fetch('http://127.0.0.1:8000/pr-merge/'+PrId+'?origin='+origin+'&destiny='+destiny, {
    method: 'PUT'
  })
  .then(response => response.json())
  .then(data => setmsg(data.msg));
}

export default function Pr() {
    let params = useParams();
    const [prDetails,setPrDetails] = useState([])
    const [msg,setMsg] = useState('')
    useEffect(() => {
      fetchPrs(setPrDetails,params.PrId)
      setMsg('')
    }, [params.PrId])
    return (
        <div style={{margin:"10px"}}>
          <h1>
            {prDetails.title}
          </h1>
          By: {prDetails.author}
          <h3>
            {prDetails.origin} -> {prDetails.destiny}
          </h3>
          {prDetails.status}
          <div>{prDetails.description}</div>
          <button onClick={() => {
            mergePr(prDetails.id,prDetails.origin,prDetails.destiny,setMsg);
          }}>Merge</button>
          <button onClick={() => {
            closePr(prDetails.id,setPrDetails,prDetails);
          }}>Close</button>
          <div>{msg}</div>
        </div>
    )
}
