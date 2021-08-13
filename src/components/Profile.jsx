import '../App.css';
import React from 'react'
import {loadUser ,Button} from '../App'
import {useState, useEffect} from 'react'
import axios from '../request';
import Post from './Post'
import { useParams } from "react-router";
import PostCreator from './PostCreator';

function ProfileNav () {

  const [user, setUser] = useState();
  const { user_id } = useParams();
   
  useEffect(() => {
    loadUserByID()
    .then(({data}) => {
      setUser(data)
    })
    .catch(() => alert('Failed to load user from API'))
  }, []);
  
  async function loadUserByID () {
    return axios.get(`http://server.domain.net/restapi/user/${user_id}/`)
  }
  
  const profileView = () => {
   }
  const loginView = () => {
   }
  const registerView = () => {
   }

    return user ? (
      <div className={'profile__wrapper wrapper'}>
      <div className='profile__content'>
        {user.username}
      </div>
      <Button onClick={profileView} title={'Profile'}/>
      <ProfileView user={user}/>
    </div>
  )
  :
      <div className={'profile__wrapper wrapper'}>
      <Button onClick={loginView} title={'Log In'}/>
      <Button onClick={registerView} title={'Register'}/>
    </div>
  }
  
  function ProfileView({user}){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      loadUserPosts(user.id)
      .then(({data}) => {
        setPosts(data.posts)
      })
      .catch(() => alert('Failed to load posts from API'))
    }, [user]);

    async function loadUserPosts () {
      return axios.get(`http://server.domain.net/restapi/user/${user.id}/posts`)
    }
    async function deletePost(post_id){
      return axios.delete(`http://server.domain.net/restapi/post/${post_id}/`)
    }
    
    return(posts.map(postData => <Post key={postData.id} data={postData} onDelete={deletePost} user={user}/>))
  }
  
  export default ProfileNav;
  export {
    ProfileView,
}