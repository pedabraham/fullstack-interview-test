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

export default function AddPr() {
  const [form, setForm] = useState({
    origin: '',
    destiny: '',
    title: '',
    description: '',
    author: '',
    status: 'open',
  });
  

  return (
    <main style={{ padding: "1rem 0" }}>
    
      <h2>Create Pull Request</h2>
      <label>
        Origin:
        <input
          value={form.origin}
          onChange={e => {
            setForm({
              ...form,
              origin: e.target.value
            });
          }}
        />
      </label>
      <label>
        Destiny:
        <input
          value={form.destiny}
          onChange={e => {
            setForm({
              ...form,
              destiny: e.target.value
            });
          }}
        />
      </label>
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
      <button onClick={() => {
        submitPr(form,setForm);
      }}>Add</button>
      <p>
        {form.origin}{' '}
        {form.destiny}{' '}
        ({form.title})
      </p>
    </main>
  );
}

