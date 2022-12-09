import React, { useState } from 'react'
import "./home.css";
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import { useEffect } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const location=useLocation();
  const {search}=location;
  console.log(search);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts/"+search);
        setPosts(res.data);
        console.log(res.data);
      } catch (err) { console.log(err); }
    }
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  )
}
