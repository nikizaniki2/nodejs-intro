import React from 'react'
import { NavLink } from "react-router-dom";
import { loadUser } from '../App'
import {useState, useEffect} from 'react'

function Navbar() {

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        loadUser()
        .then(({data}) => {
          setUser(data)
        })
        .catch(() => alert('Failed to load user from API'))
      }, []);
    
    return user ? (
        <div className="navbar">
            <h1>Navbar</h1>
            <ul>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to={'/profile/' + user.id  + '/'}>Profile</NavLink></li>
            </ul>
        </div>
    )
    :
    (        <div className="navbar">
    <h1>Navbar</h1>
    <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to='#'>Profile</NavLink></li>
    </ul>
</div>)
}

export default Navbar;