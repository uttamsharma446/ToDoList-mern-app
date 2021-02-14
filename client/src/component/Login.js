import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import Axios from "axios";

import "./main.css";
function Login() {
    const cookies = new Cookies();
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    })
    const [getId, setId] = useState("");
    const [status,setStatus]=useState("");
    const handleLogin = (e) => {

        try {
            Axios.post("http://localhost:5000/login", loginData)
                .then(result => {
                    if (result.data) {
                        cookies.set("ID", result.data._id, { path: "/" });
                        setStatus("login successfully")
                        window.location="/"
                    }
                    else {
                        setStatus("username or password is incorrect")
                    }

                })
        }

        catch (err) {

        }
        setLoginData({
            username: "",
            password: ""
        })
        e.preventDefault(false)
    }
    const handleLoginChange = (e) => {
        setStatus("");
        const { value, name } = e.target;
        setLoginData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }
    return (
        <div className="container">
            <div className="main login-form">
                <div>
                   <small style={{color:"red"}}>{status}</small>
                    <form onSubmit={handleLogin}>
                        <label>Username</label> <br />
                        <input
                            name="username"
                            value={loginData.username}
                            onChange={handleLoginChange}
                            className="login-input" type="text" /> <br />
                        <label>Password</label> <br />
                        <input className="login-input"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange} type="password" /><br></br>
                        <button type="submit"

                            className="btnbtn btn1 btn-primary" >Login</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login
