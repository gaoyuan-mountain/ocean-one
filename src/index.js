import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Lazyload } from 'ocean-utils';
import PermissionGuard from './container/PermissionGuard';
import Login from 'bundle-loader?lazy&name=loogin!./container/Login';
import Home from 'bundle-loader?lazy&name=activity-home!./container/Home';
import SearchTable from 'bundle-loader?lazy&name=activity-searct-table!./container/SearchTable';
import Navbar from 'component/Navbar';
import Toolbar from 'component/Toolbar';
import store from './redux/_store';

import './style/global.less';

const createComponent = (component) => {
  return () => {
    const AsyncComponent = (
      <Lazyload load={component}>
        {
          (Async) => {
            return Async ? <Async /> : <div>LOADING...</div>;
          }
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
        <BrowserRouter>
          <Switch>
            <Route path="/activity/login" component={createComponent(Login)} exact />
            <Route path='/'>
              <PermissionGuard>
                <div className="layout">
                  <Navbar />
                  <main className="layout vertical layout-main">
                    <Toolbar />
                    <div className="layout-content">
                      <Switch>
                        <Route path="/activity/home" component={createComponent(Home)} />
                        <Route path="/activity/searchTable" component={createComponent(SearchTable)} />
                      </Switch>
                    </div>
                  </main>
                </div>
              </PermissionGuard>
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('app')
);

// 异常监控管理平台
window.addEventListener('error', (e) => {
  // 向平台发送错误

});
