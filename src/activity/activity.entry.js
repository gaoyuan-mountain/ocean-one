import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Lazyload } from 'ocean-utils';
import PermissionGuard from './containers/PermissionGuard';
import Home from 'bundle-loader?lazy&name=activity-home!./containers/Home';
import SearchTable from 'bundle-loader?lazy&name=activity-searct-table!./containers/SearchTable';
import store from './redux/_store';

const createComponent = (component) => {
  return () => {
    let AsyncComponent = (
      <Lazyload load={component}>
        {
          (Async) => Async ? <Async /> : <div>LOADING...</div>
        }
      </Lazyload>
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
              <Route path="/activity/searchTable" component={createComponent(SearchTable)} />
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
