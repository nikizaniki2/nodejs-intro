import {useState, useEffect} from 'react'
//import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from './request';

  // const posts = [
  //   {
  //     "id": 10,
  //     "title": "Wikipedia down",
  //     "content": "Today there is no more wiki for you"
  //   },
  //   {
  //     "id": 11,
  //     "title": "React releases version 17",
  //     "content": "Use hooks now"
  //   },
  //   {
  //     "id": 12,
  //     "title": "Django",
  //     "content": "Django is a framework, React is not"
  //   }
  // ]
  
  const user =
  {
    "id": 1,
    "username": "Simo"
  }
  
  // const comments = [
  //   {
  //     id: 1,
  //     postId: 11,
  //     author: {name: "Niki", id: 1 },
  //     content: "Nik comment"
  //   },  {
  //     id: 2,
  //     postId: 12,
  //     author: {name: "Simo", id: 2 },
  //     content: "Simo comment"
  //   },  {
  //     id: 3,
  //     postId: 12,
  //     author: {name: "Emo", id: 3 },
  //     content: "Emo comment"
  //   },
  // ]
  
  async function loadPosts () {
    return axios.get('http://server.domain.net/restapi/post/')
    // return Promise.resolve(posts)
  }
  
  async function loadUser () {
    return Promise.resolve(user)
  }
  
  async function loadComments (post_id) {
    const url = 'http://server.domain.net/restapi/post/' + post_id + '/comments'
    return axios.get(url)
    // return Promise.resolve(comments)
  }
  

  // UI for comment. Represent comment data (restapi GET data) to the user.
function Post ({ data, onDelete}) {
  // request comments for this post from API and display them
  const [comments, setComments] = useState([]);
  const [listed, setListed] = useState(true);
  //https://dev.to/chilupa/remove-element-from-dom-in-react-way-n2l
  
  useEffect(() => {
    loadComments(data.id)
    .then(({data}) => {
      setComments(data.comments)
    })
    .catch(() => alert('Failed to load comments from API'))
  }, []);
  
  const deletePost = () => {
    onDelete(data.id)
    .then(() => setListed(false))
    .catch(() => alert("Failed to delete post."))
    
  }
  const addComment = newComment =>{
   setComments([newComment, ...comments])
  }
  
  return listed ? (
    <div className={'post__wrapper'}>
      <div className='post__title'>Title: {data.title}</div>
      <div className='post__content'>{data.content}</div>
      <Button onClick={deletePost} title={'Delete post'}/>
      <CommentCreator addComment={addComment} postId={data.id}/>
      <div className='comment__list'>
      { comments ?
        comments
        .map(commentData => <Comment key={commentData.id} data={commentData} />)
      : "Loading..." }
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
    .then((response) => {
      this.props.addPost(response.data)
    })
    .catch(() => alert("Failed to post"))
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

class CommentCreator extends React.Component{
  constructor (props) {
    super(props);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: {},
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
    const comment = {
      content: this.state.content,
      author: this.state.user.id,
      post: this.props.postId
    }
    console.log(this.state.user.id)

    axios.post(`http://server.domain.net/restapi/comment/`, comment)
    .then((response) => {
      this.props.addComment(response.data)
    })
    .catch(() => alert("Failed to post"))
  }

  handleContentChange(event){
    this.setState({content: event.target.value})
  }
  render () {
    return <div className="wrapper">
      <form className="" onSubmit={this.handleSubmit}>
        <label htmlFor="comment" className="text-small">Add Comment: </label>
        <input type="text" id="comment" onChange={this.handleContentChange}></input>
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
    
    this.state = {
      posts: [],
      comments: []
    };
  }

  // One-time callback after first render
  // Equivalent to useEffect(() => {...}, []);
  componentDidMount() {
    loadPosts()
    .then(({data}) => {
      this.setState({posts: data}, () =>{
    })})
    .catch(() => alert('Failed to load posts from API'))
  }
  componentDidUpdate() {
    // console.log(posts)
  }
  
  addPost = newPost =>{
    this.setState({posts: [newPost, ...this.state.posts]})
  }

  deletePost(post_id){
    // return Promise.resolve()
    return axios.delete(`http://server.domain.net/restapi/post/${post_id}/`)//string
  }
  

  render () {
    return <div className="App">
      <header className="App-header">
        <NavigationMenu/>
        <PostCreator addPost={this.addPost}/>
        { this.state.posts.map(postData => <Post key={postData.id} data={postData} onDelete={this.deletePost}/>) }
      </header>
    </div>
  }
}

export default NewsFeedClass;
