import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Prs from "./routes/prs";
import Branches from "./routes/branches";
import Branchese from "./routes/only_branches";
import OnlyPrs from "./routes/only_prs";
import Branch from "./routes/branch";
import Pr from "./routes/pr";
import AddPr from "./routes/addpr";






ReactDOM.render(
  <BrowserRouter>
     <Routes>
      <Route path="/" element={<App />} >
        <Route path="pull-requests" element={<Prs />} >
          <Route path=":PrId" element={<Pr />} />
        </Route>
        <Route path="branches" element={<Branches />} >
          <Route path=":branch" element={<Branch />} />
        </Route>
        <Route path="add_pr" element={<AddPr />} />
        <Route path="branchese" element={<Branchese />} />
        <Route path="prs" element={<OnlyPrs />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />


      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
