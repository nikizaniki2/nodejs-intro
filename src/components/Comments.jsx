import {useState, useEffect} from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import axios from '../request';
// import {Button} from '../App';
import { NavLink } from "react-router-dom";

function Comment ({ data }) {
  const [listed, setListed] = useState(true);
  const [author, setAuthor] = useState();

  //https://dev.to/chilupa/remove-element-from-dom-in-react-way-n2l
  const deleteComment = () => {
    setListed(false);
    return axios.delete(`http://server.domain.net/restapi/comment/${data.id}/`);
  };

  useEffect(() => {
    setAuthor(data.author);
  }, [data.author]);
  if(!listed){
    return null;
  }
  return author ? (

  //TODO: backend returns just the id of the author
  // should I load the user for every comment
  // or try to change the backend (it uses serializers)
  // maybe we can store userinfo in upper component so we only need to request a user once?

    <div className={'comment__wrapper'}>
      <div className='comment__author'>
        <NavLink to={'/profile/' + author.id + '/'}>{author.username}</NavLink>
        {/* author: {data.author.username} */}
      </div>
      <div className='comment__content'>{data.content}
        <button onClick={deleteComment} className='button delete__button'>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='#e2e2e2' d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z'/></svg>
        </button>
      </div>
    </div>
  )
    :
    null;
}
Comment.propTypes = {
  data: PropTypes.object,
};

export default Comment;