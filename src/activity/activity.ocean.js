import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import AppEntry from './activity.entry.js';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: AppEntry,
  domElementGetter: () => document.getElementById('activity'),
});

export const bootstrap = [
  reactLifecycles.bootstrap,
];

export const mount = [
  reactLifecycles.mount,
];

export const unmount = [
  reactLifecycles.unmount,
];

if (module.hot) {
  module.hot.accept('./activity.entry.js', () => {
    const NextRoot = require('./activity.entry.js').default;
    ReactDOM.render(React.createElement(NextRoot), document.getElementById('activity'));
  });
}
