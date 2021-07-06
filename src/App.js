import {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    );
  }
}

// Same but as function
function Button ({ title, onClick }) {
  return (
    <button onClick={onClick}>{title}</button>
  )
}

// restapi GET comment => 

const posts = [
  {
      "id": 10,
      "title": "Wikipedia down",
      "content": "Today there is no more wiki for you"
  },
  {
      "id": 11,
      "title": "React releases version 17",
      "content": "Use hooks now"
  },
  {
      "id": 12,
      "title": "Django",
      "content": "Django is a framework, React is not"
  }
]

const comments = [
  {
    id: 1,
    postId: 11,
    author: {name: "Niki", id: 1 },
    content: "Nik comment"
  },  {
    id: 2,
    postId: 12,
    author: {name: "Simo", id: 2 },
    content: "Simo comment"
  },  {
    id: 3,
    postId: 12,
    author: {name: "Emo", id: 3 },
    content: "Emo comment"
  },
]

// React Hooks syntax
function Comment ({ data }) {
  const [counter, setCounter] = useState(0);

  const deleteComment = () => {
    return axios.delete(`/restapi/comment/${data.id}`)
  }

  return(
    <div className={'comment__wrapper'}>
      <div className='comment__author'>author: {data.author.name}</div>
      <div className='comment__content'>{data.content}</div>
      <Button onClick={deleteComment} title={'Delete comment'}/>
    </div>
  )
}

// UI for comment. Represent comment data (restapi GET data) to the user.
function Post ({ data }) {
  /*
    Interpolation:

    f"adasd{request.user.id}asdasdas"
    `adasd${request.user.id}asdasdas`
   */

  const deletePost = () => {
    return axios.delete(`/restapi/post/${data.id}`)
  }

  // className = CSS classes,
  // CSS BEM model (naming convention)
  // block__element--modification

  // button--primary
  // button--secondary

  // .toolbar__button--red
  
  // post__title
  // post__title--red
  // post__title--large

  return (
    <div className={'post__wrapper'}>
      <div className='post__title'>Title: {data.title}</div>
      <div className='post__content'>{data.content}</div>
      <Button onClick={deletePost} title={'Delete post'}/>
      <div className='comment__list'>
        { comments
          .filter(commentData => commentData.postId === data.id)
          .map(commentData => <Comment data={commentData} />)
        }
      </div>
    </div>
  )
}


function NewsFeed() {
  return (
    <div className="App">
      <header className="App-header">
        { posts.map(postData => <Post data={postData} />) }

        <Timer></Timer>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default NewsFeed;
