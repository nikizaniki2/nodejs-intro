import {useState, useEffect} from 'react'
//import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from './request';

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
  
  const user =
  {
    "id": 1,
    "username": "Simo"
  }
  
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
  
  async function loadPosts () {
    return axios.get('http://server.domain.net/restapi/post/')
    // return Promise.resolve(posts)
  }
  
  async function loadUser () {
    return Promise.resolve(user)
  }
  
  async function loadComments () {
    return Promise.resolve(comments)
  }
  

  // UI for comment. Represent comment data (restapi GET data) to the user.
function Post ({ data, onDelete}) {
  // request comments for this post from API and display them
  const [comments, setComments] = useState([]);
  const [listed, setListed] = useState(true);
  //https://dev.to/chilupa/remove-element-from-dom-in-react-way-n2l
  
  useEffect(() => {
    loadComments().then(comments => setComments(comments))
  }, []);
  
  const deletePost = () => {
    onDelete(data.id)
    .then(() => setListed(false))
    .catch(() => alert("Failed to delete post."))
    
  }
  
  return listed ? (
    <div className={'post__wrapper'}>
      <div className='post__title'>Title: {data.title}</div>
      <div className='post__content'>{data.content}</div>
      <Button onClick={deletePost} title={'Delete post'}/>
      <CommentCreator/>
      <div className='comment__list'>
      { comments
        .filter(commentData => commentData.postId === data.id)
        .map(commentsData => <Comment key={commentsData.id} data={commentsData} />) }
      </div>
    </div>
  )
  :
  null
}

class PostCreator extends React.Component{
  constructor (props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: {},
      title: "",
      content: ""
    }
  }
  componentDidMount() {
    loadUser()
    .then(user => this.setState({user}))
    .catch(() => alert('Failed to load user from API'))
  }

  handleSubmit(event){
    event.preventDefault();
    const post = {
      title: this.state.title,
      content: this.state.content
    }

    axios.post('http://server.domain.net/restapi/post/', post)
  }

  handleTitleChange(event){
    this.setState({title: event.target.value})
  }
  handleContentChange(event){
    this.setState({content: event.target.value})
  }
  
  render () {
    return <div className="post__creator wrapper">
      <p className="Username text-small">{user.username}</p>
      <form className="PostContent" onSubmit={this.handleSubmit}>
      {/* https://www.w3schools.com/tags/tag_input.asp */}
        <label htmlFor="title" className="text-small">Title: </label>
        <input type="text" id="title" onChange={this.handleTitleChange}></input>
        <br/>
        <label htmlFor="content" className="text-small">Content: </label>
        <input type="text" id="content" onChange={this.handleContentChange}></input>
        <br/>
        <Button onClick={this.props.action} title={'Post'}/>
      </form>
    </div>
  }
}

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

class CommentCreator extends React.Component{
  createComment () {
    return Promise.resolve()
  }

  handleSubmit(event){
    event.preventDefault()
  }

  render () {
    return <div className="wrapper">
      <form className="" onSubmit={this.handleSubmit}>
        <label htmlFor="comment" className="text-small">Add Comment: </label>
        <input type="text" id="comment"></input>
        <br/>
        <Button onClick={this.createComment} title={'Comment'}/>
      </form>
    </div>
  }
}

class Profile extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      user: {}
    }
  }
  componentDidMount() {
    loadUser()
    .then(user => this.setState({user}))
    .catch(() => alert('Failed to load user from API'))
  }
  
  render () {
    return <div className="nav__profile wrapper">
      profile
    </div>
  }
}

class NavigationMenu extends React.Component{
  
  render () {
    return <div className="nav wrapper">
      nav
      <Profile/>
    </div>
  }
}

function Button ({ title, onClick }) {
  return (
    <button onClick={onClick}>{title}</button>
    )
  }

class NewsFeedClass extends React.Component {
  constructor (props) {
    super(props)
    this.newPostHandler = this.newPostHandler.bind(this);

    this.state = {
      newPost: null,
      posts: []
    };
  }
  
  deletePost(post_id){
    return Promise.resolve()
    //return axios.delete(post_id)//string
  }
  
  // One-time callback after first render
  // Equivalent to useEffect(() => {...}, []);
  componentDidMount() {
    loadPosts()
    .then(({data}) => {
      this.setState({posts: data}, () =>{
      console.log(posts)
    })})
    .catch(() => alert('Failed to load posts from API'))
  }
  componentDidUpdate() {
    // console.log(posts)
  }

   newPostHandler(title, content){
     this.setState({
      newPost: {
      "title": title,
      "content": content}
    })
  }
  
  render () {
    return <div className="App">
      <header className="App-header">
        <NavigationMenu/>
        <PostCreator action={this.newPostHandler} />
        {/* {this.state.newPost ? 
        <Post data={this.state.newPost} key={this.state.newPost.id} onDelete={this.deletePost} /> : 
        null} */}
        { this.state.posts.map(postData => <Post key={postData.id} data={postData} onDelete={this.deletePost}/>) }
      </header>
    </div>
  }
}

export default NewsFeedClass;
