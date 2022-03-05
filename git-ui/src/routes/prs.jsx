import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";

let fetchPrs = (setFunct)=>{
  fetch('http://127.0.0.1:8000/pr/')
  .then(response => response.json())
  .then(data => setFunct(data));
}

export default function Prs() {
    const [prs,setPrs] = useState([])
    useEffect(() => {
      fetchPrs(setPrs)
    }, [])
    let bhtml = prs.map((pr) => (
      <Link
        style={{ display: "block", margin: "1rem" }}
        to={`/pull-requests/${pr.id}`}
        key={pr.id}
      >
        {pr.title} {pr.status}
      </Link>
      ))
    return (
        <main style={{ padding: "1rem 4rem" }}>
        <h2>Pull Reuests</h2>
        <Link
          style={{ display: "block", margin: "1rem 0", padding: '10px'}}
        to={`/add_pr`}
        >
        <button>
          create pull request
          </button>
        </Link>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px auto'}}>
          <nav ClassName="left">
            {bhtml}
          </nav>
            <div ClassName="right">
            <Outlet />
            </div>
        </div>
        </main>
    );
  }
