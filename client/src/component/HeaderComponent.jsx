import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavbarBrand



} from "reactstrap";
import $ from "jquery";
import Sidebar from './Sidebar/Sidebar'

import { NavLink, useParams } from "react-router-dom";
import Axios from "axios";

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ID = cookies.get('ID');
const name=cookies.get("name");

function HeaderComponent() {

    const [isToggle, setIsToggle] = useState(false);
    const [isLoginModalToggle, setLoginModalToggle] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        email: ""
    })
    function handleToggle() {
        setIsToggle(!isToggle);
    }
    const handleLoginBtn = () => {
        setLoginModalToggle(!isLoginModalToggle);
    }
    const handleLogin = (event) => {
        alert(loginDetails.email);
        Axios.get("https://todoappbyus.herokuapp.com/user/finde", loginDetails)
            .then(res => { console.log(res.data) })
            .catch(res => { console.log(res.message) })
        event.preventDefault();
    }
    const handleChange = (event) => {
        const { value, name } = event.target;
        setLoginDetails({
            email: value
        })
    }
const handleLogout=()=>{
    cookies.remove("ID");
    window.location="/login"
}

// handle sidebar 
const handleMenubar=(a)=>{
    var bars=document.getElementById("sidebar-icon");
    var closeIcon=document.getElementById("sidebar-close");
    var sidebar=document.getElementById("sidebar");
    if(a)
    {
       bars.style.display="none";
       closeIcon.style.display="initial";
      
       $("#sidebar").slideDown("slow");
      
    }
    if(!a)
    {
        bars.style.display="flex";
        closeIcon.style.display="none";
        
        $("#sidebar").slideUp("slow");
    }
    
}
    return <React.Fragment>

        <Navbar style={{backgroundColor:"#dbf6e9"}}  expand="md">
            
            <i className="fa fa-bars fa-lg" onClick={()=>{handleMenubar(true)}} style={{cursor:"pointer"}}  id="sidebar-icon" aria-hidden="true"></i>
            <i className="fa fa-times fa-lg" onClick={()=>{handleMenubar(false)}} style={{display:"none",cursor:"pointer"}} id="sidebar-close" aria-hidden="true"></i>
              Menu
            <NavbarToggler onClick={handleToggle} />
            <Collapse isOpen={isToggle} navbar>

                <Nav className="mr-auto" navbar>
                    {/* <NavItem >
                        <NavLink className="nav-link" to="/" > Home </NavLink>
                    </NavItem> */}
                  
                   



                </Nav> 
               {ID&&<>
               <small style={{margin:"0px 10px"}}> {name}! </small>
                <li  style={{display:"inline-block",cursor:"pointer",float:"right"}} onClick={handleLogout}>Logout</li >

               </>}
            </Collapse>
        </Navbar>
    <Sidebar/>
    </React.Fragment>

}

export default HeaderComponent;