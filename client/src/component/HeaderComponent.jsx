import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavbarBrand,

    DropdownToggle,
    DropdownMenu,
    Button,
    Form,
    Input,
    FormGroup,

} from "reactstrap";


import { NavLink, useParams } from "react-router-dom";
import Axios from "axios";



function HeaderComponent() {

    const [isToggle, setIsToggle] = useState(false);
    const [isLoginModalToggle, setLoginModalToggle] = useState(false);
    const [loginDetails,setLoginDetails]=useState({
        email:""
    })
    function handleToggle() {
        setIsToggle(!isToggle);
    }
    const handleLoginBtn = () => {
        setLoginModalToggle(!isLoginModalToggle);
    }
    const handleLogin=(event)=>
    {
       alert(loginDetails.email);
       Axios.get("http://localhost:5000/user/finde",loginDetails)
       .then(res=>{console.log(res.data)})
       .catch(res=>{console.log(res.message)})
      event.preventDefault();
    }
    const handleChange=(event)=>
    {
        const {value,name}=event.target;
        setLoginDetails({
              email:value
        })
    }

    return <React.Fragment>

        <Navbar color="light" light expand="md">
            <NavbarBrand> <NavLink to="/" className="nav-link"> 
            <i class="fa fa-list-ol" aria-hidden="true"></i>
              </NavLink></NavbarBrand>
            <NavbarToggler onClick={handleToggle} />
            <Collapse isOpen={isToggle} navbar>

                <Nav className="mr-auto" navbar>
                    <NavItem >
                        <NavLink className="nav-link" to="/" > Home </NavLink>
                    </NavItem>
                   
                    
                   
                </Nav>
            </Collapse>
        </Navbar>
        
    </React.Fragment>

}

export default HeaderComponent;