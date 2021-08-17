import React from 'react'
import axios from '../request';
import Post from './Post'
import PostCreator from './PostCreator';
import {loadPosts} from '../App'

class NewsFeedClass extends React.Component {
    constructor (props) {
      super(props);
      
      this.state = {
        posts: []
      };
    }
  
    componentDidMount() {
      loadPosts()
      .then(({data}) => {
        this.setState({posts: data}, () =>{
      })})
      .catch(() => alert('Failed to load Posts from API'));
    }
  
    addPost = newPost =>{
      this.setState({posts: [newPost, ...this.state.posts]})
    }
  
    deletePost(post_id){
      return axios.delete(`http://server.domain.net/restapi/post/${post_id}/`)
    }
  
    //User load wait can probably be done better using a dependency?
    render () {
      return (
      <div className="NewsFeed">
        <header className="App-header">
          <PostCreator addPost={this.addPost} user={this.props.user}/>
          <div className="posts__wrapper wrapper">
          { this.state.posts.map(postData => <Post key={postData.id} data={postData} onDelete={this.deletePost} user={this.props.user}/>) }
          </div>
        </header>
      </div>)
    }
  }

  export default NewsFeedClass;