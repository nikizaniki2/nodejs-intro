import React from 'react'
import { NavLink } from "react-router-dom";

function Navbar(props) {
    
    return props.user ? (
        <div className="navbar">
            <h1>Navbar</h1>
            <ul>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to={'/profile/' + props.user.id  + '/'}>Profile</NavLink></li>
            </ul>
        </div>
    )
    :
    (        <div className="navbar">
    <h1>Navbar</h1>
    <ul>
        <li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
    </ul>
</div>)
}

export default Navbar;