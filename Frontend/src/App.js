import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./app/Home/Home";
import LoginForm from "./app/Login/LoginForm";
import RegisterForm from "./app/signUp/RegisterForm"; 
import SignUpCommon from "./app/signUp/SignUpCommon"; 
import SignUp1 from "./app/signUp/SignUp1";
import Account1 from "./app/account/Account1";
import Review from "./app/Home/review";
import Community from "./app/Home/community";
import Service from "./app/Home/service";
import Contact from "./app/Home/contact";

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
          <Route path="/review" element={<Review />} />
          <Route path="/community" element={<Community />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
