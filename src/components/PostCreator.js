import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '../App';
import {PostCreatorAPI} from './ApiCalls';

class PostCreator extends React.Component{
  constructor (props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      content: ""
    };
  }

  handleSubmit(event){
    event.preventDefault();
    const post = {
      title: this.state.title,
      content: this.state.content
    };
    PostCreatorAPI(post);
  }

  handleTitleChange(event){
    this.setState({title: event.target.value});
  }
  handleContentChange(event){
    this.setState({content: event.target.value});
  }

  render () {
    return <div className='post__creator post__creator__wrapper'>
      <p className='post__creator__username'>{this.props.user.username}</p>
      <form className='PostContent' onSubmit={this.handleSubmit}>
        <input type='text' id='title' placeholder='Title...' onChange={this.handleTitleChange}></input>
        <br/>
        <input type='text' id='content' placeholder='Content...' onChange={this.handleContentChange}></input>
        <br/>
        <Button onClick={this.props.action} title={'Post'}/>
      </form>
    </div>;
  }
}

PostCreator.propTypes = {
  user: PropTypes.object,
  action: PropTypes.func,
  addPost: PropTypes.func,
};

export default PostCreator;