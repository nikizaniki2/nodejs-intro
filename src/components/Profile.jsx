import '../App.css';
import React from 'react'
import {loadUserByID} from '../App'
import {useState, useEffect} from 'react'
import Post from './Post'
import { useParams } from "react-router";
import { deletePost, loadUserPosts } from '../App'
import PostCreator from './PostCreator';

function ProfileView({curr_user}){
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const { user_id } = useParams();

  const [ isOwner, setIsOwner ] = useState(false);
  

    useEffect(() => {
      loadUserByID(user_id)
      .then(({data}) => {
        setUser(data);
        if(Number(curr_user.id) === Number(user_id)) setIsOwner(true);
      })
      .catch(() => alert('Failed to load user from API'))
      
      loadUserPosts(Number(user_id))
      .then(({data}) => {
        setPosts(data.posts)
      })
      .catch((error) => console.log(error))
    }, []);

    
    
    return (
      <div className={'profile__wrapper wrapper'}>
      <div className='profile__content'>
        {user ? 
        user.username
      :
      "Loading user..."}
      </div>
      {isOwner ?
       <PostCreator user={user}/>
      : null
      }
      { posts.map(postData => <Post key={postData.id} data={postData} onDelete={deletePost} user={user}/>) }
      </div>
    )
  }
  
  export default ProfileView;
  export {
    ProfileView,
}