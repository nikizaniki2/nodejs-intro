import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import PostCreator from './PostCreator';
import { loadPosts , deletePost } from '../App';
import {Button} from '../App';
import {NavLink} from 'react-router-dom';

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
        this.setState({paginator: data}, () =>{});
        this.setState({posts: data.results}, () =>{});
      })
      .catch(() => alert('Failed to load Posts from API'));
  }

    addPost = newPost =>{
      this.setState({posts: [newPost, ...this.state.posts]});
    }

    requestMorePosts(){
      if(this.state.paginator.next){
        loadPosts(this.state.paginator.next)
          .then(({data}) => {
            this.setState({paginator: data}, () =>{});
            this.setState({posts: [...this.state.posts, ...data.results]}, () =>{});
          })
          .catch(() => alert('Failed to load Posts from API'));
      }
    }


    //User load wait can probably be done better using a dependency?
    render () {
      if(this.state.paginator){
        return (
          <div className='NewsFeed'>
            <div className='side-bar'>
              <NavLink exact to='/'>Example</NavLink>
              <NavLink to={'/'}>Example 2</NavLink>
              <NavLink to={'/'}>Example #</NavLink>
            </div>
            <div className='app_container'>
              <div className='toolbar'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='#e2e2e2' d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z'/></svg>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='#e2e2e2' d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z'/></svg>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='#e2e2e2' d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z'/></svg>
              </div>
              <div className='posts_container'>
                <PostCreator addPost={this.addPost} user={this.props.user}/>
                <div className='posts__wrapper wrapper'>
                  { this.state.posts.map(postData => <Post key={postData.id} data={postData} onDelete={deletePost} user={this.props.user}/>) }
                </div>
                {this.state.paginator.next ?
                  <Button title='Load More' onClick={this.requestMorePosts}/>
                  :
                  null}
              </div>
            </div>
          </div>);
      }
      else return null;
    }
}

NewsFeedClass.propTypes = {
  user: PropTypes.object,
};

export default NewsFeedClass;