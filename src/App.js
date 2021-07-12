import {useState, useEffect} from 'react'
//import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios';

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
  const [listed, setListed] = useState(true);
//https://dev.to/chilupa/remove-element-from-dom-in-react-way-n2l
  const deleteComment = () => {
    //return axios.delete(`/restapi/comment/${data.id}`)
    setListed(false);
  }

  return listed ? (
    <div className={'comment__wrapper'}>
      <div className='comment__author'>author: {data.author.name}</div>
      <div className='comment__content'>{data.content}</div>
      <Button onClick={deleteComment} title={'Delete comment'}/>
    </div>
  )
  :
  null
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

async function loadComments () {
  return Promise.resolve(comments)
}

// UI for comment. Represent comment data (restapi GET data) to the user.
function Post ({ data }) {
  // request comments for this post from API and display them
  const [comments, setComments] = useState([]);
  const [listed, setListed] = useState(true);
  //https://dev.to/chilupa/remove-element-from-dom-in-react-way-n2l
  
  useEffect(() => {
    loadComments().then(comments => setComments(comments))
  }, []);

  const deletePost = () => {
    //return axios.delete(`/restapi/post/${data.id}`)
    setListed(false);
  }

  return listed ? (
    <div className={'post__wrapper'}>
      <div className='post__title'>Title: {data.title}</div>
      <div className='post__content'>{data.content}</div>
      <Button onClick={deletePost} title={'Delete post'}/>

      <div className='comment__list'>
      { comments
        .filter(commentData => commentData.postId === data.id)
        .map(commentsData => <Comment data={commentsData} />) }
      </div>
    </div>
  )
  :
  null
}

async function loadPosts () {
  // axios.get('/posts/')
  return Promise.resolve(posts)
}

class NewsFeedClass extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  // One-time callback after first render
  // Equivalent to useEffect(() => {...}, []);
  componentDidMount() {
    loadPosts()
      .then(posts => this.setState({posts}))
      .catch(() => alert('Failed to load posts from API'))
  }

  render () {
    return <div className="App">
      <header className="App-header">
        { posts.map(postData => <Post data={postData} />) }
      </header>
    </div>
  }
}

function NewsFeed() {
  const [posts, setPosts] = useState([]);
  // const [ count, setCpunt] = useUstate
  // const [ count2, setCpunt2] = useUstate

  useEffect(() => {
    loadPosts().then(posts => setPosts(posts))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        { posts.map(postData => <Post data={postData} />) }
      </header>
    </div>
  );
}

export default NewsFeedClass;
