import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";

let fetchbranches = (setFunct)=>{
  fetch('http://127.0.0.1:8000/branches')
  .then(response => response.json())
  .then(data => setFunct(data.branches));
}

export default function Branches() {
    const [branches,setBranches] = useState([''])
    useEffect(() => {
      fetchbranches(setBranches)
    }, [])
    let bhtml = branches.map((branch) => (
      <Link
        style={{ display: "block", margin: "1rem 0" }}
        to={`/branches/${branch}`}
        key={branch}
      >
        {branch}
      </Link>
      ))
    return (
      <main style={{ padding: "1rem 4rem" }}>
      <h2>Branches</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px auto'}}>
      <nav
        style={{

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
