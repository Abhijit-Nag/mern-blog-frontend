import React from 'react'
import "./topbar.css"
import { Facebook, GitHub, Instagram, LinkedIn, Search, Twitter } from "@material-ui/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';
export default function Topbar() {
    const PF= "http://localhost:5000/images/";
    const {user, dispatch} = useContext(Context);
    const navigate= useNavigate();
    const handleLogout=()=>{
        dispatch({type:"LOGOUT"});
        navigate("/login");
    }
    return (
        <>
            <div className="top">
                <div className="topLeft">
                  <a href="https://www.facebook.com/profile.php?id=100024876668698"><Facebook className='topIcon' /></a>  
                    <a href="https://www.linkedin.com/in/abhijit-nag-180272230/"><Twitter className='topIcon' /></a>
                    <a href="https://www.linkedin.com/in/abhijit-nag-180272230/"><Instagram className='topIcon' /></a>
                    <a href="https://github.com/Abhijit-Nag"><GitHub className='topIcon' /></a>
                    <a href="https://www.linkedin.com/in/abhijit-nag-180272230/"><LinkedIn className='topIcon linkedIn' /></a>
                </div>
                <div className="center">
                    <ul className="topList">
                        <li className="topListItem">
                            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
                        </li>
                        <li className="topListItem">
                            <a href='https://abhijitnagportfolio.netlify.app/' style={{ textDecoration: "none", color: "inherit" }}>About</a>

                        </li>
                        <li className="topListItem">
                            <a href='https://abhijitnagportfolio.netlify.app/' style={{ textDecoration: "none", color: "inherit" }}>Contact</a>

                        </li>
                        <li className="topListItem">
                            <Link to="/write" style={{ textDecoration: "none", color: "inherit" }}>Write</Link>

                        </li>
                        <li className="topListItem" onClick={handleLogout}>
                            {user && "Logout"}
                        </li>
                    </ul>
                </div>
                <div className="topRight">
                    {
                        user ? (
                            <Link className='link' to={"/settings"}>
                                <img src={PF+user.profilePic} alt="" className='topImg' />

                            </Link>

                        ) : (
                            <ul className='topList'>
                                <li className="topListItem">
                                    <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>Login</Link>
                                </li>

                                <li className="topListItem">
                                    <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>Register</Link>
                                </li>
                            </ul>
                        )
                    }
                    <Search className='searchIcon' />
                </div>
            </div>
        </>
    )
}
