import {useState} from 'react'
import './App.css';
import React from 'react'
import axios from './request';
import {Button} from './App'

  function Comment ({ data }) {
    const [listed, setListed] = useState(true);
    //https://dev.to/chilupa/remove-element-from-dom-in-react-way-n2l
    const deleteComment = () => {
      setListed(false);
      return axios.delete(`http://server.domain.net/restapi/comment/${data.id}/`)
    }
    
    return listed ? (
      <div className={'comment__wrapper'}>
      {/* <div className='comment__author'>author: {data.author.name}</div> */}
      <div className='comment__content'>{data.content}</div>
      <Button onClick={deleteComment} title={'Delete comment'}/>
    </div>
  )
  :
  null
  }

  export default Comment;