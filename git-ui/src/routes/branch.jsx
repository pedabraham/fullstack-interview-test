import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";



let fetchcommits = (setFunct,branch)=>{
    fetch('http://127.0.0.1:8000/commits?branch='+branch)
    .then(response => response.json())
    .then(data => setFunct(data.commits));
  }

export default function Branch() {
    let params = useParams();
    const [commits,setCommits] = useState([])
    useEffect(() => {
      fetchcommits(setCommits,params.branch)
    }, [params.branch])
    let commitsView = commits.map(commit => (
      <div>
        <Link
        style={{ display: "block", margin: "1rem 0" }}
        to={`/commits/${params.branch+'-'+commit.position}`}
        key={commit.msg}
      >
      <div><h4>{commit.msg}</h4> {commit.name} {commit.email}</div>
      </Link>
      ----
      </div>
    ))
    return (
      <div>
        <h1>{params.branch}</h1>
        {commitsView}
      </div>
    )
}
