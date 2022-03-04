import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";



let fetchPrs = (setFunct,PrId)=>{
    fetch('http://127.0.0.1:8000/pr/'+PrId)
    .then(response => response.json())
    .then(data => setFunct(data));
  }

let closePr = (PrId)=>{
  fetch('http://127.0.0.1:8000/pr/'+PrId+'?status=closed', {
    method: 'PUT'
  })
  .then(response => response.json())
  .then(data => console.log(data));
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
        <div>
          {prDetails.origin} ,
          {prDetails.destiny} ,
          {prDetails.status} ,
          {prDetails.author} ,
          {prDetails.title} ,
          {prDetails.description} ,
          <button onClick={() => {
            mergePr(prDetails.id,prDetails.origin,prDetails.destiny,setMsg);
          }}>merge</button>
          <button onClick={() => {
            closePr(prDetails.id);
          }}>Close</button>
          {msg}
        </div>
    )
}