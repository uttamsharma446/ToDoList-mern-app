import React from 'react'
import { Link } from 'react-router-dom';
import "./sidebar.css";

function Sidebar() {
    return (
      
            <div id="sidebar" className="sidebar">
             <div id="" className="sidebar-items">
             <ul>
                 <Link className="sidebar-link"  to="/todo">
                  <li>ToDo List</li>
                 </Link>
                 <Link className="sidebar-link" to="/gave-got-money">
                  <li>Gave/Got Money</li>
                 </Link>
               
                 <Link className="sidebar-link" to="/">
                  <li>Notes</li>
                 </Link>
               
            
               
            </ul>

             </div>
            </div>

       
    )
}

export default Sidebar
