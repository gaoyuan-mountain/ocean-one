import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import toolbar from './toolbar.component.js';

function domElementGetter() {
  return document.getElementById('toolbar');
}

const reactLifecyles = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter,
  rootComponent: toolbar,
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
  module.hot.accept('./toolbar.component.js', () => {
    const NextRoot = require('./toolbar.component.js').default;
    ReactDOM.render(React.createElement(NextRoot), domElementGetter());
  });
}
