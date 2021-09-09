import React from 'react';
import ReactDom from 'react-dom';
import { Main } from '../App';

test('is user', () => {
  const div = document.createElement('div');
  ReactDom.render(<Main/>, div);
  console.log(div.innerHTML);
});