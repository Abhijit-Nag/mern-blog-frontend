import React, { useState } from 'react'
import "./sidebar.css"
import {Facebook, GitHub, Instagram, Twitter} from "@material-ui/icons"
import { useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
export default function Sidebar() {
    const [cats, setCats]=useState([]);

    useEffect(()=>{
        const getCats = async ()=>{
            try{
                const res = await axios.get("/categories");
                setCats(res.data);
                console.log(res.data);
            }catch(err){console.log(err);}
        }
        getCats();
    },[]);
  return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img 
            src="https://w0.peakpx.com/wallpaper/393/713/HD-wallpaper-robert-downey-jr-rdj-real-life-iron-man.jpg"
             alt="" 
             className='sidebarImg'/>
             <p>
                Hi, I'm Abhijit I'm a full-stack Web Developer, Competitive Programmer along with knowing 
                lots of new updated tech tools like clouds...AWS , DevOps Techniques, NGINX,
                I've worked on Django framework for fully function full-stack app development,REST API, POSTMAN!
                Currently I'm studying in 2nd Year in btech CSE in NIT DURGAPUR.
             </p>
        </div>
        <div className="siderbarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {cats.map((c)=>(
                    <Link className='link' to={`/?cat=${c.name}`}>
                    <li className="sidebarListItem">{c.name} </li>
                    </Link>

                ))}
               
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <Facebook className='sidebarIcon'/>
                <GitHub className='sidebarIcon'/>
                <Instagram className='sidebarIcon'/>
                <Twitter className='sidebarIcon'/>
            </div>
        </div>
    </div>
  )
}
