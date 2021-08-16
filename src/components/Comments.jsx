import {useState, useEffect} from 'react'
import '../App.css';
import React from 'react'
import axios from '../request';
import {Button} from '../App'
import { NavLink } from "react-router-dom";
import { loadUserByID } from '../App'

  function Comment ({ data }) {
    const [listed, setListed] = useState(true);
    const [author, setAuthor] = useState();

    //https://dev.to/chilupa/remove-element-from-dom-in-react-way-n2l
    const deleteComment = () => {
      setListed(false);
      return axios.delete(`http://server.domain.net/restapi/comment/${data.id}/`)
    }
    
    useEffect(() => {
        setAuthor(data.author)
    }, []);

    return author ? (
      
      //TODO: backend returns just the id of the author
      // should I load the user for every comment
      // or try to change the backend (it uses serializers)
      // maybe we can store userinfo in upper component so we only need to request a user once?

      <div className={'comment__wrapper'}>
      <div className='comment__author'>
      Author: <NavLink to={'/profile/' + author.id + '/'}>{author.username}</NavLink>
        {/* author: {data.author.username} */}
        </div>
      <div className='comment__content'>{data.content}</div>
      <Button onClick={deleteComment} title={'Delete comment'}/>
    </div>
  )
  :
  null
  }

  export default Comment;