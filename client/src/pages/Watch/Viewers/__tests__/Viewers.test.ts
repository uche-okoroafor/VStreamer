import React from 'react';
import ReactDOM from 'react-dom';
import Viewers from '../Viewers';

it('going to fail', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Viewers />, div);
});
