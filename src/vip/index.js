import React from 'react';
import ReactDOM from 'react-dom';
import AppEntry from './vip.entry.js';

ReactDOM.render(React.createElement(AppEntry), document.getElementById('vip'));

module.hot.accept('./vip.entry.js', () => {
  const NextRoot = require('./vip.entry.js').default;
  ReactDOM.render(React.createElement(NextRoot), document.getElementById('vip'));
});
