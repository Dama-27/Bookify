import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./app/Home/Home";
import LoginForm from "./app/Login/LoginForm";
import RegisterForm from "./app/signUp/RegisterForm"; 
import SignUpCommon from "./app/signUp/SignUpCommon"; 
import SignUp1 from "./app/signUp/SignUp1";
import Account1 from "./app/account/Account1";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/signupcommon" element={<SignUpCommon />} />
          <Route path="/signup1" element={<SignUp1 />} />
          <Route path="/account1" element={<Account1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
