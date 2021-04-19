import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavbarBrand



} from "reactstrap";


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
    return <React.Fragment>

        <Navbar color="light" light expand="md">
            <NavLink to="/" className="nav-link">
                <i className="fa fa-list-ol" aria-hidden="true"></i>
            </NavLink>
            <NavbarToggler onClick={handleToggle} />
            <Collapse isOpen={isToggle} navbar>

                <Nav className="mr-auto" navbar>
                    <NavItem >
                        <NavLink className="nav-link" to="/" > Home </NavLink>
                    </NavItem>
                  
                   



                </Nav> 
               {ID&&<>
               <small style={{margin:"0px 10px"}}> {name}! </small>
                <li  style={{display:"inline-block",cursor:"pointer",float:"right"}} onClick={handleLogout}>Logout</li >

               </>}
            </Collapse>
        </Navbar>

    </React.Fragment>

}

export default HeaderComponent;