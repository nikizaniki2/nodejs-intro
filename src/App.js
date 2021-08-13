//import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from './request';
import NewsFeedClass from './components/NewsFeed'
import ProfileNav from './components/Profile'
import { HashRouter, Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar'

  async function loadUser () {
    return axios.get('http://server.domain.net/restapi/user/current')
  }

  async function loadUserByID (user_id) {
    return axios.get(`http://server.domain.net/restapi/user/${user_id}/`)
  }

  async function loadPosts () {
    return axios.get('http://server.domain.net/restapi/post/')
  }
  
function Button ({ title, onClick }) {
  return (
    <button onClick={onClick}>{title}</button>
    )
  }

  // https://blog.pusher.com/getting-started-with-react-router-v4/
  // http://www.hackingwithreact.com/read/1/24/making-custom-urls-with-react-router-params

const App = () => (
  <div className='App'>
    <Main />
  </div>
);

const Main = () => (
  <div className='Main'>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/" component={NewsFeedClass}/>
        <Route path="/profile/:user_id" component={ProfileNav}/>
      </Switch>
  </div>
);

export default App;

export {
  Button,
  loadUser,
  loadUserByID,
  loadPosts,
}
