import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Bundle from './components/Lazyload';
import PermissionGuard from './containers/PermissionGuard';
import Home from 'bundle-loader?lazy&name=activity-home!./containers/Home';
import store from './store';

const createComponent = (component) => {
  return () => {
    let AsyncComponent = (
      <Bundle load={component}>
        {
          (Async) => Async ? <Async /> : <div>LOADING...</div>
        }
      </Bundle>
    );
    return AsyncComponent;
  };
};

class Root extends React.PureComponent {
  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <PermissionGuard profile={this.props.profile}>
            <Switch>
              <Route path="/activity/home" component={createComponent(Home)} />
            </Switch>
          </PermissionGuard>
        </HashRouter>
      </Provider>
    );
  }
}

if (module.hot) {
  module.hot.accept('./activity.entry.js', () => {
    const NextRoot = require('./activity.entry.js').default;
    ReactDOM.render(React.createElement(NextRoot), document.getElementById('activity'));
  });
}

export default Root;
