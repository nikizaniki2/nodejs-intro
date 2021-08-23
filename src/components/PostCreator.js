import '../App.css';
import React from 'react';
import PropTypes from 'prop-types';
import axios from '../request';
import {Button} from '../App';

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

    axios.post('http://server.domain.net/restapi/post/', post)
      .then((response) => {
        this.props.addPost(response.data);
      })
      .catch(() => alert("Failed to post"));
  }

  handleTitleChange(event){
    this.setState({title: event.target.value});
  }
  handleContentChange(event){
    this.setState({content: event.target.value});
  }

  render () {
    return <div className='post__creator wrapper'>
      <p className='Username text-small'>{this.props.user.username}</p>
      <form className='PostContent' onSubmit={this.handleSubmit}>
        {/* https://www.w3schools.com/tags/tag_input.asp */}
        <label htmlFor='title' className='text-small'>Title: </label>
        <input type='text' id='title' onChange={this.handleTitleChange}></input>
        <br/>
        <label htmlFor='content' className='text-small'>Content: </label>
        <input type='text' id='content' onChange={this.handleContentChange}></input>
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