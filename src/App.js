import React, { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";
import ForgetPassword from "./component/ForgetPassword";
import OTPpage from "./component/OTPpage";

function App() {
 const [alert,setAlert]=useState(null);
 const showAlert=(message,type)=>{
  setAlert({ 
    msg:message,
    type:type
  })
  setTimeout(() => {
    setAlert(null)
  }, 2000);
}

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/forgetPassword" element={<ForgetPassword showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route path="/OTPpage" element={<OTPpage showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
