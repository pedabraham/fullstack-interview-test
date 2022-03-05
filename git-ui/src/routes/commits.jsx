import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";

let fetchbranches = (setFunct,branch,position)=>{
  fetch('http://127.0.0.1:8000/commit/'+position+'?branch='+branch)
  .then(response => response.json())
  .then(data => setFunct(data));
}

export default function Commits() {
    return (
      <main style={{ padding: "1rem 4rem" }}>
      <Outlet />
        </main>
    );
  }
