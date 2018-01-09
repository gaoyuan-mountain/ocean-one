import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import navbar from './navbar.component.js';

function domElementGetter() {
  return document.getElementById('navbar');
}

const reactLifecyles = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter,
  rootComponent: navbar,
});

export const bootstrap = [
  reactLifecyles.bootstrap,
];

export const mount = [
  reactLifecyles.mount,
];

export const unmount = [
  reactLifecyles.unmount,
];

if (module.hot) {
  module.hot.accept('./navbar.component.js', () => {
    const NextRoot = require('./navbar.component.js').default;
    ReactDOM.render(React.createElement(NextRoot), domElementGetter());
  });
}
