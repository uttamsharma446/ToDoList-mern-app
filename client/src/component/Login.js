import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import Axios from "axios";
import todoimg from "../Images/todoimg.png" 
import "./main.css";
function Login() {
    const cookies = new Cookies();
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [statusStyle, setStatusStyle] = useState({
        color: "#046582"
    })
    const [err, setErr] = useState({
        email: "",
        password: "",
        name: ""
    })
    const [registerData, setRegisterData] = useState({
        name: "",
        username: "",
        password: "",
    })
    const [hideAndShow, setHideAndShow] = useState(false);
    const [getId, setId] = useState("");
    const [status, setStatus] = useState("");
    const handleLogin = (e) => {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        if (username === "") {
            setErr(prev => {
                return {
                    ...prev,
                    email: "please enter your email"
                }
            })
        }
        else if (password === "") {
            setErr(prev => {
                return {
                    ...prev,
                    password: "please enter your password"
                }
            })
        }
        else {
            try {
                Axios.post("https://todoappbyus.herokuapp.com/login", loginData)
                    .then(result => {
                        if (result.data) {
                            cookies.set("ID", result.data._id, { path: "/" });
                            alert("login successfylly")
                            setLoginData({
                                username: "",
                                password: ""
                            })
                            window.location = "/"
                        }
                        else {

                            alert("email or password is incorrect!!");
                        }

                    })
            }

            catch (err) {

            }
        }
        e.preventDefault(false)
    }
    const handleLoginChange = (e) => {


        const { value, name } = e.target;
        if (name === "username") {
            setErr(prev => {
                return {
                    ...prev,
                    email: ""
                }
            })
        }
        if (name === "password") {
            setErr(prev => {
                return {
                    ...prev,
                    password: ""
                }
            })
        }
        setLoginData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    //handle register 
    const handleRegister = (e) => {


        Axios.post("https://todoappbyus.herokuapp.com/adduser", registerData)
            .then(result => {
                if (result.data) {
                    if (result.data == "exist") {

                        alert("email is already exist!!")
                    }
                    else {

                        alert("Register Sucessfully!!");
                        setRegisterData({
                            name: "",
                            username: "",
                            password: "",
                        })
                        window.location = "/login"
                    }


                }
                else {

                }
            })
            .catch(err => {
                console.log(err);
            })




        e.preventDefault(false);

    }
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setStatus("");
        setRegisterData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }
    // method for hide and show
    const handleShowHide = () => {
        setHideAndShow(!hideAndShow);
    }
    return (
        <div className="container">
            <small className="status" style={statusStyle}>{status}</small>
            <div className="row">
                <div className="col-lg-4">
                <div className="main login-form">
                {/* login panel */}
                {!hideAndShow && <div className="Login-Panel" id="login-panel">


                    <form onSubmit={handleLogin}>

                        <input
                            id="username"
                            name="username"
                            placeholder="Email"
                            value={loginData.username}
                            onChange={handleLoginChange}
                            className="login-input" type="text" /><br />
                        <small className="error-msg">{err.email}</small><br />

                        <input className="login-input"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleLoginChange} type="password" /><br />
                        <small className="error-msg">{err.password}</small>
                        <br />
                        <button type="submit"

                            className="btn btn1  btn-primary" >Login</button>
                    </form>
                    <div style={{textAlign:"center"}} >
                        <small className="forget">Forgotten Password? </small>
                        <button onClick={handleShowHide} className="btn newAccount btn-success" >Create New Account</button>

                    </div>
                </div>
                }
                {/* end of registeration panel  */}
                {hideAndShow && <div className="Register-Panel" id="login-panel">


                    <form onSubmit={handleRegister}>

                        <input
                            name="name"
                            placeholder="Name"
                            value={registerData.name}
                            onChange={handleRegisterChange}
                            className="login-input" type="text" /> <br />
                        <small className="error-msg">{err.password}</small>
                        <br />
                        <input
                            name="username"
                            placeholder="Email"
                            value={registerData.username}
                            onChange={handleRegisterChange}
                            className="login-input" type="text" /> <br />
                        <small className="error-msg">{err.password}</small>
                        <br />
                        <input className="login-input"
                            name="password"
                            placeholder="Password"
                            value={registerData.password}
                            onChange={handleRegisterChange} type="password" /><br />
                        <small className="error-msg">{err.password}</small>
                        <br />
                        <button type="submit" className="btnbtn btn1 btn-primary" >Register</button>
                    </form>
                    <label style={{ fontSize: "1.7vh" }}>Already Register? <label onClick={handleShowHide} style={{ color: "#1a508b", cursor: "pointer" }}>Login Now!! </label>  </label>
                </div>}
            </div>

                </div>
                <div className="col-lg-8">
                    <div className="show-feature">
                    <img src={todoimg} width="30%" height="30%" /><hr/>
                        <h3 className="msg">Add your Tasks in ToDo-List to remind you what to do next to complete!!</h3>
                   
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Login
