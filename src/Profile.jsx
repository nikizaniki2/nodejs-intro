import './App.css';
import React from 'react'
import {Button} from './App'
import {useState, useEffect} from 'react'
import axios from './request';
import Post from './Post'

function ProfileNav ({ user }) {

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
      <ProfileView user_id="1"/>
    </div>
  )
  :
      <div className={'profile__wrapper wrapper'}>
      <Button onClick={loginView} title={'Log In'}/>
      <Button onClick={registerView} title={'Register'}/>
    </div>
  }
  export default ProfileNav;

function ProfileView({user_id}){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadUserPosts(user_id)
        .then(({data}) => {
            setPosts(data.posts)
        })
        .catch(() => alert('Failed to load posts from API'))
      }, [user_id]);

    async function loadUserPosts () {
        return axios.get(`http://server.domain.net/restapi/user/${user_id}/posts`)
      }
    async function deletePost(post_id){
        return axios.delete(`http://server.domain.net/restapi/post/${post_id}/`)
      }
    
    return(posts.map(postData => <Post key={postData.id} data={postData} onDelete={deletePost} user={user_id}/>))
}