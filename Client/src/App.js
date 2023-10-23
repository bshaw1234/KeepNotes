import React from "react"
// import './App.css';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './components/Home'


const App=()=> {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Home/>}/> */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
