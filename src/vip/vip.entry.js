import React from 'react';
import { render } from 'react-dom';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Bundle from './components/Lazyload';
import PermissionGuard from './containers/PermissionGuard';
import Home from 'bundle-loader?lazy&name=customTable!./containers/Home';
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
    console.log(error);
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
