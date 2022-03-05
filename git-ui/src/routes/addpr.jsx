import React, { useEffect, useState } from 'react';

let submitPr = (pr,cleanFun)=>{
  fetch('http://127.0.0.1:8000/pr/', {
    method: 'POST',
    body: JSON.stringify(pr)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .then(cleanFun({
    origin: '',
    destiny: '',
    title: '',
    description: '',
    author: '',
    status: 'open',
  }));
}

let fetchbranches = (setFunct)=>{
  fetch('http://127.0.0.1:8000/branches')
  .then(response => response.json())
  .then(data => setFunct(data.branches));
}

export default function AddPr() {
  const [form, setForm] = useState({
    origin: '',
    destiny: '',
    title: '',
    description: '',
    author: '',
    status: 'open',
  });
  const [branches,setBranches] = useState([''])
  useEffect(() => {
    fetchbranches(setBranches)
  }, [])
  let branch_options = branches.map((branch) => (
    <option value={branch} key={branch}>{branch}</option>
  ))


  return (
    <main style={{ padding: "1rem 0" , display:"block"}}>

      <h2>Create Pull Request</h2>
      <div>
      <label>
        Origin:
        <select value={form.origin} onChange={e => {
          setForm({
            ...form,
            origin: e.target.value
          });
        }}>
          {branch_options}
            </select>
      </label>
      ----->
      <label>
        Destiny:
        <select value={form.destiny} onChange={e => {
          setForm({
            ...form,
            destiny: e.target.value
          });
        }}>
          {branch_options}
            </select>
      </label>
      </div>
      -
      <div>
      <label>
        Title:
        <input
          value={form.title}
          onChange={e => {
            setForm({
              ...form,
              title: e.target.value
            });
          }}
        />
      </label>
      </div>
      -
      <div>
      <label>
        Description:
        <input
          value={form.description}
          onChange={e => {
            setForm({
              ...form,
              description: e.target.value
            });
          }}
        />
      </label>
      </div>
      -
      <div>
      <label>
        Author:
        <input
          value={form.author}
          onChange={e => {
            setForm({
              ...form,
              author: e.target.value
            });
          }}
        />
      </label>
      </div>
      -
      <div>
      <button onClick={() => {
        submitPr(form,setForm);
      }}>Create Pull Request</button>
      </div>
    </main>
  );
}
