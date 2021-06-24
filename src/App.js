import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    );
  }
}

// Same but as function
function Button ({ title, onClick }) {
  return (
    <button onClick={onClick}>{title}</button>
  )
}

// restapi GET comment => 
const firstCommentData = {
  id: 1,
  author: {name: "Niki", id: 1 },
  content: "This is my comment"
}

const posts = [
  {
      "id": 5,
      "title": "d",
      "content": "d"
  },
  {
      "id": 6,
      "title": "d",
      "content": "d"
  },
  {
      "id": 7,
      "title": "fdg",
      "content": "dfg"
  },
  {
      "id": 8,
      "title": "fdg",
      "content": "dfg"
  },
  {
      "id": 9,
      "title": "fdg",
      "content": "sadasd"
  },
  {
      "id": 10,
      "title": "fdg",
      "content": "sadasd"
  },
  {
      "id": 11,
      "title": "fdg",
      "content": "sadasd"
  },
  {
      "id": 12,
      "title": "hfghf",
      "content": "hjhgfjfghjfghjfg"
  }
]



// UI for comment. Represent comment data (restapi GET data) to the user.
function Post ({ data }) {
  /*
    Interpolation:

    f"adasd{request.user.id}asdasdas"
    `adasd${request.user.id}asdasdas`
   */

  const deleteComment = () => {
    return axios.delete(`/restapi/comments/${data.id}`)
  }

  return (
    <div style={{ border: '1px solid grey', width: '50%', margin: 10}}>
      This is a comment UI element
      <h1>{data.title}</h1>
      <div>{data.content}</div>
      <Button onClick={deleteComment} title={'Delete post'}/>
    </div>
  )
}


function App() {

  const firstBtnHandler = () => {
    console.log("first")
  }
  const secondBtnHandler = () => {
    console.log("second")
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={firstBtnHandler} title="First"></Button>
        <Button onClick={secondBtnHandler} title="Second"></Button>
        
        { posts.map(postData => <Post data={postData} />) }

        <Timer></Timer>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
