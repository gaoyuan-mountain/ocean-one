import React from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Lazyload } from 'ocean-utils';
import PermissionGuard from './containers/PermissionGuard';
import Home from 'bundle-loader?lazy&name=vip-home!./containers/Home';
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
              <Route path="/vip/home" component={createComponent(Home)} />
            </Switch>
          </PermissionGuard>
        </HashRouter>
      </Provider>
    );
  }
}

export default Root;
