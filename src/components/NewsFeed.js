import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
// import PostCreator from './PostCreator';
import { deletePost } from '../App';
import {Button} from '../components/Button';
import {Posts} from '../test_responses/Posts';

export default function NewsFeedClass(props) {
  const [paginator, setPaginator] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts(Posts);
  }, []);

  function loadPosts({data}) {
    setPaginator(data);
    setPosts(data.results);
  }
  // const addPost = newPost =>{
  //   setPosts([newPost, ...posts]);
  // };

  const requestMorePosts = () =>{
    if(paginator.next){
      loadPosts(paginator.next)
        .then(({data}) => {
          setPaginator(data);
          setPosts([...posts, ...data.results]);
        });
      // .catch(console.log);
    }
  };

  return(
    <div className='NewsFeed'>
      {/* <PostCreator addPost={addPost} user={props.user}/> */}
      <div className='posts__wrapper wrapper'>
        {console.log(posts)}
        { posts.map(postData => <Post key={postData.id} data={postData} onDelete={deletePost} user={props.user}/>) }
      </div>
      {paginator.next ?
        <Button title='Load More' onClick={requestMorePosts}/>
        :
        null}
    </div>);
}

NewsFeedClass.propTypes = {
  user: PropTypes.object,
};


// export default NewsFeedClass;