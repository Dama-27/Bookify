import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/ui/button";
import "../../styles/Home.css";
import { Link } from "react-router-dom";


const navigration = () => {

  return (
    
    <div className= "bg-gray-100">
      <nav className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center w-full h-full rounded-lg border-b-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              BOOKIFY
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-blue-500 font-medium">Home</Link>
            <Link to="/review" className="text-gray-600 hover:text-blue-500 transition-colors">Review</Link>
            <Link to="/community" className="text-gray-600 hover:text-blue-500 transition-colors">Community</Link>
            <Link to="/service" className="text-gray-600 hover:text-blue-500 transition-colors">Service</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button className="hidden md:block bg-white text-gray-700 border hover:bg-gray-50">
                Sign In
              </Button>
            </Link>
            <Link to="/signupcommon">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Register
              </Button>
            </Link>
          </div>
        </div>      
      </nav>
      </div>
      );
      };
      export default navigration;