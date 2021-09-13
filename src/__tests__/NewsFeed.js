import React from 'react';
import {render, screen} from '@testing-library/react';
import NewsFeedClass from '../components/NewsFeed';
import {loadPosts as MockLoadPosts} from '../App';
import {loadComments as MockLoadComments} from '../components/Post';
import {User} from '../test_responses/User';
import {Posts} from '../test_responses/Posts';
import {Comments} from '../test_responses/Comments';
import '@testing-library/jest-dom';
//Attemt getPosts Mock

jest.mock('../App');
jest.mock('../components/Post');

test('Check if newsFeedback renders hard coded posts from mocked loadPosts()', async () => {
  MockLoadPosts.mockResolvedValue({data: Posts});
  MockLoadComments.mockResolvedValue({data: Comments});
  render(<NewsFeedClass user={User}/>);
  console.log(await screen.findAllByText(/mock content/i));
  // debug();
});

//loadPosts => count === results.len