import React from 'react';
import {render} from '@testing-library/react';
import PostCreator from '../components/PostCreator';
import '@testing-library/jest-dom';

const myUser = {
  "id": 1,
  "username": "nikola-sekulov"
};

test('Post Creator Form', () => {
  const {getByLabelText} = render(<PostCreator user={myUser}/>);
  const inputOne = getByLabelText(/Title/i);
  const inputTwo = getByLabelText(/Content/i);
  expect(inputOne).toHaveAttribute('type', 'text');
  expect(inputTwo).toHaveAttribute('type', 'text');
});