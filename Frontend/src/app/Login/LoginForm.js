import React, { useState } from "react";
import { Link } from "react-router-dom";
import image1 from '../../images/2149bcff-5c92-4ee7-841d-4e36de2f5770.png';
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa6";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "", SId: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data Submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-56 bg-[#F8F6F4] py-10 h-[90%]">
      <div className="flex w-full max-w-4xl bg-[#D2F9FA] shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image1})` }}></div>
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <img src="/as.png" alt="Logo" className="w-24 mb-2 p-3" />
          <form onSubmit={handleSubmit} className="w-full max-w-sm bg-[#B8EEFB] p-2 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <label className="block text-gray-700 text-left">Email:</label>
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mt-2" required />
            <label className="block text-gray-700 mt-4 text-left">Password:</label>
            <input type="password" name="password" placeholder="Paasword" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded mt-2" required />
            <label className="block text-gray-700 mt-4 text-left">Service ID:</label>
            <input type="text" name="SId" placeholder="Serivce Id" value={formData.SId} onChange={handleChange} className="w-full p-2 border rounded mt-2" required />
            <div className="text-left mt-4">
              <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
            </div>
            <button type="submit" className="w-[30%] mt-6 py-1 bg-[#27D5E5] rounded hover:bg-[#1CB8CC]">Login</button>
          
            <p className="text-center text-gray-600 mt-4">or continue with</p>
            <div className="flex justify-center space-x-4 mt-3">
              <button className="p-2 bg-white border rounded-full shadow hover:bg-gray-100"><FcGoogle /></button>
              <button className="p-2 bg-white border rounded-full shadow hover:bg-gray-100"><FaGithub /></button>
              <button className="p-2 bg-white border rounded-full shadow hover:bg-gray-100"><FaFacebook /></button>
            </div>
            <p className="text-center text-gray-700 mt-6">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;