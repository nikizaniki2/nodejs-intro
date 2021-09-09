import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import PostCreator from '../components/PostCreator';
import {PostCreatorAPI as MockPostCreatorAPI} from '../components/ApiCalls';
// import {CommentCreator} from '../components/Post';
import '@testing-library/jest-dom';

jest.mock('../components/ApiCalls');

const myUser = {
  "id": 1,
  "username": "nikola-sekulov"
};
const myPostReseponse = {
  "id": 25,
  "title": "New User",
  "content": "New Post 2",
  "author": {
    "id": 2,
    "username": "tester"
  }
};

test('Post Creator Form', () => {
  MockPostCreatorAPI.mockResolvedValueOnce(myPostReseponse);
  const {getByLabelText, getByText} = render(<PostCreator user={myUser}/>);
  const inputOne = getByLabelText(/Title/i);
  const inputTwo = getByLabelText(/Content/i);
  const buttonOne = getByText(/Post/i);
  inputOne.value = 'My Title';
  inputTwo.value = 'Has Content';
  fireEvent.click(buttonOne);
  expect(MockPostCreatorAPI).toHaveBeenCalledTimes(1);
});