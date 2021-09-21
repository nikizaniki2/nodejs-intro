import './styles/App.css';
import React from 'react';
import PropTypes from 'prop-types';
import axios from './request';
import NewsFeedClass from './components/NewsFeed';
import ProfileView from './components/Profile';
import { Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import {useState, useEffect} from 'react';

async function loadUser () {
  return axios.get('http://server.domain.net/restapi/user/current');
}

async function loadUserByID (user_id) {
  return axios.get(`http://server.domain.net/restapi/user/${user_id}/`);
}

async function loadPosts (page_url=null) {
  if(page_url){
    return axios.get(page_url);
  }
  return axios.get(`http://server.domain.net/restapi/post/`);
}

async function loadUserPosts (user_id, page_url=null) {
  if(page_url){
    return axios.get(page_url);
  }
  return axios.get(`http://server.domain.net/restapi/user/${user_id}/posts`);
}

async function deletePost(post_id){
  return axios.delete(`http://server.domain.net/restapi/post/${post_id}/`);
}

function Button ({ title, onClick }) {
  return (
    <button className='button' onClick={onClick}>{title}</button>
  );
}

// https://blog.pusher.com/getting-started-with-react-router-v4/
// http://www.hackingwithreact.com/read/1/24/making-custom-urls-with-react-router-params

const App = () => {
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
      });
  }, []);

  if(user === null){
    return(
      <div className='App'>
        <header>
          <NavBar></NavBar>
        </header>
        <Switch>
          <Route path='/login' render={ () => (<div>PLACEHOLDER</div>)}/>
          <Route path='/register' render={ () => (<div>PLACEHOLDER</div>)}/>
        </Switch>
      </div>
    );
  }

  if(user){
    return (
      <div className='App'>
        <header>
          <NavBar user={user}></NavBar>
        </header>
        <Switch>
          <Route exact path='/' render={(props) => (<NewsFeedClass {...props} user={user}/>)}/>
          <Route path='/profile/:user_id' render={(props) => (<ProfileView {...props} curr_user={user}/>)}/>
        </Switch>
      </div>
    );
  }

  return (<div className='App'>Loading User...</div>);
};

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};



export default App;

export {
  Button,
  loadUser,
  loadUserByID,
  loadUserPosts,
  loadPosts,
  deletePost,
};
