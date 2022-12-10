import React, { useState } from 'react'
import "./singlePost.css"
import { Delete, Edit } from "@material-ui/icons"
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';

// import for SWEETALERT2 NOTIFICATION

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function SinglePost() {
    const MySwal = withReactContent(Swal);
    const location = useLocation();
    const [post, setPost] = useState([]);
    const { user } = useContext(Context);
    const path = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`https://mern-blog-app-api-q9a6.onrender.com/api/posts/${path}`);
                console.log(res.data);
                setPost(res.data);
            } catch (err) { console.log(err); }
        }
        getPost();
    }, [path]);
    const handleUpdate = async () => {
        try {
            await axios.put("https://mern-blog-app-api-q9a6.onrender.com/api/posts/" + path, {

                username: user.username, title, desc

            });
            // Here I'm commenting out the below code to use it after the sweetalert code segment otherwise windows will reload first before 
            // showing the alert 

            // window.location.reload();
            setUpdateSuccess(true);
        } catch (err) {
            console.log(err);
        }
    };
    const PF = "https://mern-blog-app-api-q9a6.onrender.com/images/";
    const handleDelete = async () => {
        try {
            // without this "{data}" in below post was not deleting it was coming an error don't know why;
            await axios.delete("https://mern-blog-app-api-q9a6.onrender.com/api/posts/" + path, { data: { username: user.username }, });
            setDeleteSuccess(true);
            // Here I'm commenting out the below code to use it after the sweetalert code segment otherwise windows will navigate first before 
            // showing the alert 

            // navigate("/");
            // window.location.replace("/");
        } catch (err) { console.log(err); }
    }
    console.log(user.username === post.username)
    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={PF + post.photo} alt=""
                        className="singlePostImg"
                    />
                )}

                {updateMode ? (
                    <input type="text" placeholder={post.title} value={title} className='singlePostTitle'
                        onChange={(e) => setTitle(e.target.value)} />
                ) : (
                    <h1 className="singlePostTitle">

                        {post.title}
                        {post.username === user.username && (
                            <div className="singlePostEdit">
                                <Edit className='singlePostEditIconEdit'
                                    onClick={() => setUpdateMode(true)} />
                                <Delete className='singlePostEditIconDelete'
                                    onClick={handleDelete} />
                            </div>
                        )}

                    </h1>
                )}

                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author: < b><Link className='link' to={`/?user=${post.username}`}>  {post.username}</Link> </b>

                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()} </span>
                </div>
                {updateMode ? (
                    <textarea className='updateDesc'
                        value={desc}
                        onChange={e => setDesc(e.target.value)}></textarea>
                ) : (

                    <p className='singlePostDesc'>
                        {post.desc}
                    </p>
                )}
                {updateMode && (

                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                )}

                {updateSuccess && (<>
                    {
                        MySwal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Successfully Post Updated!',
                            showConfirmButton: false,
                            timer: 3000,
                        })
                    }
                </>)
                // && window.location.reload()
                && window.location.replace("/")
                
                }

                {deleteSuccess && (<>
                {
                    MySwal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully Post Deleted!',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                    
                }
                </>) && navigate("/")}
            </div>
        </div>
    )
}
