import React from 'react'
import "./post.css"
import { Link } from "react-router-dom"

export default function Post({ post }) {
    const PF= "https://mern-blog-app-api-q9a6.onrender.com/images/";
    return (
        <Link className='link' to={`/post/${post._id}`} >
            {/* "https://wallpapercave.com/wp/wp2127342.jpg" */}
        <div className="post">
            {post.photo && (
                <img src={PF + post.photo} alt=""
                    className='postImg'
                />
            )}

            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((cat) => (

                        <span className="postCat">{cat} </span>
                    ))}
                </div>
                    <span className="postTitle">
                        {post.title}
                    </span>

                <hr />
                <span className="postDate">1 hour ago</span>
                <p className="postDesc">
                    {post.desc}
                </p>
            </div>
        </div>
                </Link>
    )
}
