import React, { useState } from 'react';
import axios from 'axios';
import aaa from "../../assets/aaa.png";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:3000/auth/register', { name, email, password });
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      console.error('Error registering', error);
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className='flex items-center justify-center py-4'>
    <div className="parent flex  w-full ">
    <div className="left sm:hidden md:hidden lg:inline">
      <img src={aaa} alt="" />
    </div>
    <div className="right w-full flex items-center justify-evenly ">
      <div className="div"></div>
      <div className="box h-full w-1/2 flex justify-center flex-col gap-3">
      <div className="head">
      <h5 className='font-semibold text-2xl'>Create An Account</h5>
      <p className='text-zinc-400 text-sm mt-2'>Enter your detail's below:</p> 
      </div>
        <div className="inputs border-b border-zinc-500 ">
          <input type="text" className='py-2 px-1 w-full outline-none bg-transparent border-none placeholder:text-sm' placeholder='enter your email Or Phone Number' />
        </div>
        <div className="inputs border-b border-zinc-500 ">
          <input type="password" className='py-2 px-1 w-full outline-none bg-transparent border-none placeholder:text-sm' placeholder='enter your password' />
        </div>
        <button className='text-white w-[180px] bg-[#DB4545] p-2 cursor-pointer hover:opacity-80 rounded-sm mt-5'>Create Account</button>
        <p className='text-sm'>Already have an Account ? <Link className='font-semibold' to={"/login"}>Login</Link></p>
      </div>
    </div>
  </div>
  </div>
  );
};

export default Login;
