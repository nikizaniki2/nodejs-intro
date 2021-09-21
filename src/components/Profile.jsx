import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {loadUserByID} from '../App';
import {useState, useEffect} from 'react';
import Post from './Post';
import { useParams } from "react-router";
import { deletePost, loadUserPosts, Button } from '../App';
import PostCreator from './PostCreator';

function ProfileView({curr_user}){
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [paginator, setPaginator] = useState();
  const [ isOwner, setIsOwner ] = useState(false);

  const { user_id } = useParams();

  const addPosts = useCallback(
    ({data}) => {
      setPaginator(data);
      setPosts(posts => [...posts, ...data.results]);
    }, []);

  useEffect(() => {
    loadUserByID(user_id)
      .then(({data}) => {
        setUser(data);
        if(Number(curr_user.id) === Number(user_id)) setIsOwner(true);
      })
      .catch(() => alert('Failed to load user from API'));

    loadUserPosts(Number(user_id))
      .then(addPosts)
      .catch((error) => alert('Failed to load user from API erro: ' + error));
  }, [addPosts, curr_user.id, user_id]);

  function requestMorePosts(){
    if(paginator.next){
      loadUserPosts(Number(user_id), paginator.next)
        .then(addPosts)
        .catch(() => alert('Failed to load Posts from API'));
    }
  }

  if(paginator){
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
        {paginator.next ?
          <Button title='Load More' onClick={requestMorePosts}/>
          :
          null}
      </div>
    );}
  return null;
}

ProfileView.propTypes = {
  curr_user: PropTypes.object,
};


export default ProfileView;