import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import menu from './menu.component.js';

function domElementGetter() {
  return document.getElementById('menu');
}

const reactLifecyles = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter,
  rootComponent: menu,
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
  module.hot.accept('./menu.component.js', () => {
    const NextRoot = require('./menu.component.js').default;
    ReactDOM.render(React.createElement(NextRoot), domElementGetter());
  });
}
