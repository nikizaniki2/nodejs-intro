import React from 'react';
import {render} from '@testing-library/react';
import PostCreator from '../components/PostCreator';
import {CommentCreator} from '../components/Post';
import '@testing-library/jest-dom';

const myUser = {
  "id": 1,
  "username": "nikola-sekulov"
};

//debug should only be used when making test not running them (slows down tests)

test('Post Creator Form', () => {
  // const {getByLabelText, debug} = render(<PostCreator user={myUser}/>);
  const {getByLabelText} = render(<PostCreator user={myUser}/>);
  const inputOne = getByLabelText(/Title/i);
  const inputTwo = getByLabelText(/Content/i);
  expect(inputOne).toHaveAttribute('type', 'text');
  expect(inputTwo).toHaveAttribute('type', 'text');
  // debug(inputOne);
  // debug(inputTwo);
});

test('Comment Creator Form', () => {
  const {getByLabelText} = render(<CommentCreator/>);
  const inputOne = getByLabelText(/comment/i);
  expect(inputOne).toHaveAttribute('type', 'text');
});