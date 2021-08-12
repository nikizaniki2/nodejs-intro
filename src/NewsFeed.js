import React from 'react'
import axios from './request';
import Post from './Post'
import ProfileNav from './Profile'
import PostCreator from './PostCreator';
import {loadPosts, loadUser} from './App'

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
      <div className="NewsFeed">
        <header className="App-header">
          <ProfileNav user={this.state.user}/>
          <PostCreator addPost={this.addPost} user={this.state.user}/>
          { this.state.posts.map(postData => <Post key={postData.id} data={postData} onDelete={this.deletePost} user={this.state.user}/>) }
        </header>
      </div>
      : this.state.auth ?
      <div className="NewsFeed">
        <header className="App-header">
        <p>Loading User</p>
        </header>
      </div>
      :
      <div className="NewsFeed">
      <header className="App-header">
      <ProfileNav/>
      </header>
    </div>
    }
  }

  export default NewsFeedClass;