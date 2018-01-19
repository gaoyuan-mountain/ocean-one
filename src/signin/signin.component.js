import React from 'react';
import { Icon, Button, notification } from 'antd';
import authService from 'common-service/auth';

import './style.less';

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.valueChange = this.valueChange.bind(this);
    this.signin = this.signin.bind(this);
  }

  componentDidCatch(error) {
    console.error(error);
  }

  valueChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  async signin() {
    const profile = await authService.signin(this.state.username, this.state.password);
    if (profile.username) {
      window.location = '#/activity/home';
    } else {
      openNotificationWithIcon('error', '登录失败', '用户名、密码错误');
    }
  }

  render() {
    return (
      <div className="signin">
        <div className="signin-bill" />
        <div className="signin-form">
          <div className="signin-form-main">
            <h1>OCEAN ONE</h1>
            <div className="signin-form-body">
              <div className="input-wrapper">
                <Icon type="user" />
                <input type="text" placeholder="用户名" onChange={(event) => this.valueChange('username', event.target.value)} />
              </div>
              <div className="input-wrapper">
                <Icon type="lock" />
                <input type="password" placeholder="密码" onChange={(event) => this.valueChange('password', event.target.value)} />
              </div>
              <div className="submit-wrapper">
                <Button type="primary" size="large" style={{width: '100%'}} onClick={this.signin}>登录</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
