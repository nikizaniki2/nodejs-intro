import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import '../styles/Nav.css';

function Navbar(props) {

  return props.user ? (
    <React.Fragment>
      <div className='float-left'>
        <h1>Social Network&trade;</h1>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink to={'/profile/' + props.user.id  + '/'}>Profile</NavLink>
      </div>
      <div className='float-right'>
        <NavLink exact to='/'>Example</NavLink>
        <NavLink to={'/'}>Example 2</NavLink>
      </div>
    </React.Fragment>
  )
    :
    (
      <React.Fragment>
        <h1>Navbar</h1>
        <ul>
          <li><NavLink to='/login'>Login</NavLink></li>
          <li><NavLink to='/register'>Register</NavLink></li>
        </ul>
      </React.Fragment>);
}
Navbar.propTypes = {
  user: PropTypes.object
};


export default Navbar;