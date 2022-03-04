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
        <Link
        style={{ display: "block", margin: "1rem 0" }}
        to={`/commits/${commit.name}`}
        key={commit.msg}
      >
        <div>{commit.msg} {commit.name} {commit.email}</div>
      </Link>
    ))
    return (
      <div>
        <h1>{params.branch}</h1>
        {commitsView}
      </div>
    )
}