import axios from '../request';

async function PostCreatorAPI(post){
  axios.post('http://server.domain.net/restapi/post/', post)
    .then((response) => {
      this.props.addPost(response.data);
    })
    .catch(() => alert("Failed to post"));
}
export {
  PostCreatorAPI
};