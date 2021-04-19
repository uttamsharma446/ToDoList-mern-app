import React from 'react'
import { Link } from 'react-router-dom';
import "./sidebar.css";

function Sidebar() {
    return (
      
            <div id="sidebar" className="sidebar">
             <div className="sidebar-items">
             <ul>
                <li>
                 <a href="/todo">ToDo List</a>
                </li>
                <li>
                <Link to="/">Notes</Link>
                </li>
                <li>
                <Link to="/">Get/Take Money</Link>
                </li>
            </ul>

             </div>
            </div>

       
    )
}

export default Sidebar
