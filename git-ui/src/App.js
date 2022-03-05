import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react'
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <div>
      <h1>Git tool</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/prs">Pull Requests</Link> |{" "}
        <Link to="/branchese">Branches</Link>
      </nav>
      <Outlet />
      </div>

    </div>
  );
}

export default App;
