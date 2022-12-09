import { Person, PersonAdd } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import "./settings.css"
import axios from "axios";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Settings() {
    const PF = "http://localhost:5000/images/";

    const MySwal = withReactContent(Swal)

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, dispatch } = useContext(Context);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
        } catch (err) {
            console.log(err);
        }
    };
    return (
    <div className='settings'>
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update your Account</span>
                <span className="settingsDeleteTitle">Delete your Account</span>
            </div>
            <form action="" className="settingsForm" onSubmit={handleSubmit}>
                <label htmlFor="">Profile Picture</label>
                <div className="settingsPP">
                    <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt="" />
                    <label htmlFor="fileInput">
                        <Person className='settingsPPIcon'/>
                    </label>
                    <input
                     type="file" 
                     id='fileInput' 
                     style={{display:"none"}}
                     onChange={e=> setFile(e.target.files[0])} />
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)} />
                <label>Email</label>
                <input type="email" placeholder={user.email}
                onChange={e=>setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" onChange={e=>setPassword(e.target.value)}  />
                <button className="settingsSubmit" type='submit'>Update</button>
                {success && 

                  ( 
                  <>
                     {
                     MySwal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Profile has been updated',
                          showConfirmButton: false,
                          timer: 3000,
                     }
                        )}
                        </>
                //  <span style={{color:"green"}}>Profile has been updated!</span>
                ) 
                && 
                // window.location.reload()
                setTimeout(window.location.reload(),3000) 
             }
            </form>
        </div>
            <Sidebar/>
    </div >
  )
}
