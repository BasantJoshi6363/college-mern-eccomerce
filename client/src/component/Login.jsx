import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import loginImg from "../assets/login.png"

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="flex justify-center">
            <div className=" p-8 rounded-lg shadow-md max-w-4xl w-full flex">
                <div className="w-1/2 hidden md:block">
                    <img
                        src={loginImg}
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full md:w-1/2 px-6 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
                    <p className="text-gray-600 text-sm mb-4">Enter your details below</p>

                    <form onSubmit={handleSubmit}>
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
                            Login
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-500 font-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
