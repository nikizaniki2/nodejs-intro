import React from 'react'
import Post from './Post'
import PostCreator from './PostCreator';
import { loadPosts , deletePost } from '../App'
import {Button} from '../App'

class NewsFeedClass extends React.Component {
    constructor (props) {
      super(props);
      
      this.state = {
        paginator: null,
        posts: []
      };

      this.requestMorePosts = this.requestMorePosts.bind(this);
    }
  
    componentDidMount() {
      loadPosts()
      .then(({data}) => {
        this.setState({paginator: data}, () =>{})
        this.setState({posts: data.results}, () =>{})
    })
      .catch(() => alert('Failed to load Posts from API'));
    }
  
    addPost = newPost =>{
      this.setState({posts: [newPost, ...this.state.posts]})
    }

    requestMorePosts(){
      if(this.state.paginator.next){
        loadPosts(this.state.paginator.next)
        .then(({data}) => {
          this.setState({paginator: data}, () =>{})
          this.setState({posts: [...this.state.posts, ...data.results]}, () =>{})
      })
        .catch(() => alert('Failed to load Posts from API'));
      }
    }

  
    //User load wait can probably be done better using a dependency?
    render () {
      if(this.state.paginator){
      return (
      <div className="NewsFeed">
        <header className="App-header">
          <PostCreator addPost={this.addPost} user={this.props.user}/>
          <div className="posts__wrapper wrapper">
          { this.state.posts.map(postData => <Post key={postData.id} data={postData} onDelete={deletePost} user={this.props.user}/>) }
          </div>
        {this.state.paginator.next ?
        <Button title="Load More" onClick={this.requestMorePosts}/>
        :
        null}
        </header>
      </div>)
      }
      else return null
    }
  }

  export default NewsFeedClass;