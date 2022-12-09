import React, { useRef } from 'react'
import "./login.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function Login() {
  const userRef= useRef();
  const passwordRef= useRef();
  const {user, dispatch, isFetching}= useContext(Context);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
        const res=await axios.post("/auth/login",{
          username:userRef.current.value,
          password:passwordRef.current.value,
        });

    dispatch({type:"LOGIN_SUCCESS", payload:res.data});
    console.log(res.data);
    }catch(err){
    dispatch({type:"LOGIN_FAILURE"});
    console.log(err);
    }
  }
  console.log(isFetching);
  return (
    <div className='login'>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" className='loginInput' placeholder='Enter your usename....'
        ref={userRef} />
        <label>Password</label>
        <input type="password" className='loginInput' placeholder='Enter your password....'
        ref={passwordRef}/>
        <button className="loginButton">Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>Register</Link></button>
    </div>
  )
}
