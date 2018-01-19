import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import SignIn from './signin.component.js';

function domElementGetter() {
  return document.getElementById('signin');
}

const reactLifecyles = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter,
  rootComponent: SignIn,
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
  module.hot.accept('./signin.component.js', () => {
    const NextRoot = require('./signin.component.js').default;
    ReactDOM.render(React.createElement(NextRoot), domElementGetter());
  });
}
