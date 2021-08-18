//import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from './request';
import NewsFeedClass from './components/NewsFeed'
import ProfileView from './components/Profile'
import { Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import {useState, useEffect} from 'react'

  async function loadUser () {
    return axios.get('http://server.domain.net/restapi/user/current')
  }

  async function loadUserByID (user_id) {
    return axios.get(`http://server.domain.net/restapi/user/${user_id}/`)
  }

  async function loadPosts () {
    return axios.get('http://server.domain.net/restapi/post/')
  }

  async function deletePost(post_id){
    return axios.delete(`http://server.domain.net/restapi/post/${post_id}/`)
  }

  async function loadUserPosts (user_id) {
    return axios.get(`http://server.domain.net/restapi/user/${user_id}/posts`)
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

const Main = () => { 
  const [user, setUser] = useState();
  
  //User (/current) is now only loaded once (in Main)
  useEffect(() => {
      loadUser()
      .then(({data}) => {
        setUser(data);
      })
      .catch((error) => {
        if(error.response.status === 403){
          setUser(null);
        }
        else alert('Failed to load user from API');
      })
    }, []);

      if(user === null){
        return(
        <div className='Main'>
          <NavBar></NavBar>
          <Switch>
            <Route path="/login" render={ () => (<div>PLACEHOLDER</div>)}/>
            <Route path="/register" render={ () => (<div>PLACEHOLDER</div>)}/>
          </Switch>
      </div>
        )
      }

      if(user){
        return (
          <div className='Main'>
          <NavBar user={user}></NavBar>
          <Switch>
            <Route exact path="/" render={(props) => (<NewsFeedClass {...props} user={user}/>)}/>
            <Route path="/profile/:user_id" render={(props) => (<ProfileView {...props} curr_user={user}/>)}/>
          </Switch>
      </div>
    );
  }

  return (<div className='Main'>Loading User...</div>);
}
export default App;

export {
  Button,
  loadUser,
  loadUserByID,
  loadUserPosts,
  loadPosts,
  deletePost,
}
