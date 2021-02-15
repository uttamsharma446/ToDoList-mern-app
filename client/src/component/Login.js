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
    const [registerData, setRegisterData] = useState({
        name:"",
        username: "",
        password: "",
    })
    const [hideAndShow,setHideAndShow]=useState(false);
    const [getId, setId] = useState("");
    const [status, setStatus] = useState("");
    const handleLogin = (e) => {

        try {
            Axios.post("http://localhost:5000/login", loginData)
                .then(result => {
                    if (result.data) {
                        cookies.set("ID", result.data._id, { path: "/" });
                        setStatus("login successfully")
                        window.location = "/"
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

    //handle register 
    const handleRegister=(e)=>{
       
        
            Axios.post("http://localhost:5000/adduser",registerData)
            .then(result=>{
                if(result.data)
                {
                    console.log(result.data);

                }
                else
                {

                }
            })
            .catch(err=>{
                console.log(err);
            })
            
       
       
        
        e.preventDefault(false);

    }
    const handleRegisterChange=(e)=>{
        const {name,value}=e.target;
        setRegisterData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
       
    }
    // method for hide and show
    const handleShowHide=()=>{
        setHideAndShow(!hideAndShow);
    }
    return (
        <div className="container">
            <div className="main login-form">
                {/* login panel */}
   {!hideAndShow&&<div className="Login-Panel">
   <h5 style={{color:"#af0069",marginTop:"10px"}}>Login here!!</h5>
                    <small style={{ color: "red" }}>{status}</small>
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
                    <label style={{ fontSize: "2vh" }}>Not Register Yet? <label onClick={handleShowHide} style={{ color: "#1a508b", cursor: "pointer" }}>Sign Up Now!! </label>  </label>
                </div>
        }
           {/* end of login panel  */}
               {hideAndShow&&<div className="Register-Panel">
               <h5 style={{color:"#af0069",marginTop:"10px"}}>Register here!!</h5>
                    <small style={{ color: "red" }}>{status}</small>
                    <form onSubmit={handleRegister}>
                        <label>Name</label> <br />
                        <input
                            name="name"
                            value={registerData.name}
                            onChange={handleRegisterChange}
                            className="login-input" type="text" /> <br />
                        <label>Username</label> <br />
                        <input
                            name="username"
                            value={registerData.username}
                            onChange={handleRegisterChange}
                            className="login-input" type="text" /> <br />
                        <label>Password</label> <br />
                        <input className="login-input"
                            name="password"
                            value={registerData.password}
                            onChange={handleRegisterChange} type="password" /><br></br>
                        <button type="submit" className="btnbtn btn1 btn-primary" >Register</button>
                    </form>
                    <label style={{ fontSize: "2vh" }}>Already Register? <label  onClick={handleShowHide} style={{ color: "#1a508b", cursor: "pointer" }}>Login Now!! </label>  </label>
                </div>}
            </div>

        </div>
    )
}

export default Login
