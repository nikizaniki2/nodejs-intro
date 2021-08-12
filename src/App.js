//import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from './request';
import NewsFeedClass from './NewsFeed'
  
  async function loadUser () {
    return axios.get('http://server.domain.net/restapi/user/current')
  }

  async function loadPosts () {
    return axios.get('http://server.domain.net/restapi/post/')
  }
  
function Button ({ title, onClick }) {
  return (
    <button onClick={onClick}>{title}</button>
    )
  }

const App = () => (
  <div className='App'>
    <Main />
  </div>
);

const Main = () => (
  <NewsFeedClass/>
);

export default App;

export {
  Button,
  loadUser,
  loadPosts,
}
