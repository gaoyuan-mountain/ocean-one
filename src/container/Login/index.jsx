import React from 'react';
import { Icon, Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import authService from 'service/auth';

import './style.less';

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.valueChange = this.valueChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  componentDidCatch(error) {
    console.error(error);
  }

  valueChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  async doLogin() {
    const profile = await authService.login(this.state.username, this.state.password);
    if (profile.username) {
      window.location = '/activity/home';
    } else {
      openNotificationWithIcon('error', '登录失败', '用户名、密码错误');
    }
  }

  render() {
    return (
      <div className="login layout">
        <div className="login-bill" />
        <div className="login-form">
          <div className="login-form-main">
            <h1>OCEAN ONE</h1>
            <div className="login-form-body">
              <div className="input-wrapper">
                <Icon type="user" />
                <input type="text" placeholder="用户名" onChange={(event) => this.valueChange('username', event.target.value)} />
              </div>
              <div className="input-wrapper">
                <Icon type="lock" />
                <input type="password" placeholder="密码" onChange={(event) => this.valueChange('password', event.target.value)} />
              </div>
              <div className="submit-wrapper">
                <Button type="primary" size="large" style={{width: '100%'}} onClick={this.doLogin}>登录</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

