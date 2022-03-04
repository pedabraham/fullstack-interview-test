import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";

let fetchPrs = (setFunct)=>{
  fetch('http://127.0.0.1:8000/pr/')
  .then(response => response.json())
  .then(data => setFunct(data));
}

export default function Prs() {
    const [Prs,setPrs] = useState([])
    useEffect(() => {
      fetchPrs(setPrs)
    }, [])
    let bhtml = Prs.map((pr) => (
      <Link
        style={{ display: "block", margin: "1rem 0" }}
        to={`/pull-requests/${pr.id}`}
        key={pr.id}
      >
        {pr.title} {pr.status}
      </Link>
      ))
    return (
        <main style={{ padding: "1rem 0" }}>
        <h2>Pull Reuests</h2>
        <Link
        style={{ display: "block", margin: "1rem 0" }}
        to={`/add_pr`}
        >
          create pull request
        </Link>
        <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
          >
        {bhtml}

        </nav>
        <Outlet />
        </div>
        </main>
    );
  }