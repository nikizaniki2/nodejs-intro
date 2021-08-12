//import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from './request';
import Post from './Post'
import ProfileNav from './Profile'
  
  async function loadUser () {
    return axios.get('http://server.domain.net/restapi/user/current')
  }

  async function loadPosts () {
    return axios.get('http://server.domain.net/restapi/post/')
  }

class PostCreator extends React.Component{
  constructor (props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      content: ""
    }
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
      <p className="Username text-small">{this.props.user.username}</p>
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
      user: null,
      auth: true
    };
  }

  componentDidMount() {
    loadUser()
      .then(({data}) => {
        this.setState({user: data}, () =>{
      })})
    .catch((error) => {
      if(error.response.status === 403){
        this.setState({auth: false}, () =>{})
      }
      else{
        alert('Failed to load user from API');
      }
    });
    
    loadPosts()
    .then(({data}) => {
      this.setState({posts: data}, () =>{
    })})
    .catch((error) => {
      if(error.response.status === 403){
        this.setState({auth: false}, () =>{})
      }
      else{
        alert('Failed to load posts from API');
      }
    });
  }

  addPost = newPost =>{
    this.setState({posts: [newPost, ...this.state.posts]})
  }

  deletePost(post_id){
    return axios.delete(`http://server.domain.net/restapi/post/${post_id}/`)
  }

  //User load wait can probably be done better using a dependency?
  render () {
    return this.state.user ?
    <div className="App">
      <header className="App-header">
        <ProfileNav user={this.state.user}/>
        <PostCreator addPost={this.addPost} user={this.state.user}/>
        { this.state.posts.map(postData => <Post key={postData.id} data={postData} onDelete={this.deletePost} user={this.state.user}/>) }
      </header>
    </div>
    : this.state.auth ?
    <div className="App">
      <header className="App-header">
      <p>Loading User</p>
      </header>
    </div>
    :
    <div className="App">
    <header className="App-header">
    <ProfileNav/>
    </header>
  </div>
  }
}

export default NewsFeedClass;
export {
  Button,
  loadUser,
}
