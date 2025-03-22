import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import login from "../assets/login.png"

const Register = () => {
  const { register } = useContext(AuthContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(fullname, email, password);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full flex">
        <div className="w-1/2 hidden md:block">
          <img
            src={login}
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 px-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create an account</h2>
          <p className="text-gray-600 text-sm mb-4">Enter your details below</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              required
            />
            <input
              type="email"
              placeholder="Email or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md font-bold"
            >
              Create Account
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
