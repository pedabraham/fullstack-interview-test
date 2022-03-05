import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";


let fetchCommit = (setFunct,branch,position)=>{
  fetch('http://127.0.0.1:8000/commit/'+position+'?branch='+branch)
  .then(response => response.json())
  .then(data => setFunct(data));
}


export default function Commit() {
    const [commit,setCommit] = useState([''])
    const [branch,setBranch] = useState('')
    let params = useParams();
    useEffect(() => {
      let commit = params.commit
      let commit_parts = commit.split('-')
      setBranch(commit_parts[0])
      fetchCommit(setCommit,commit_parts[0],commit_parts[1])
    }, [])

    return (
      <main style={{ padding: "1rem 4rem" }}>
      <h2>Commit</h2>
      <Link to={`/branches/${branch}`}>
      <button> {"<"} back</button>
      </Link>
      <h1>{commit.msg}</h1>
      <div>{commit.name}</div>
      <div>{commit.email}</div>
      <div>date: {commit.date}</div>
      <div>files: {commit.files_change}</div>
        </main>
    );
  }
