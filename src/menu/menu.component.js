import React from 'react';
import { Menu, Icon } from 'antd';
import { MsgRegister, MsgUnregister } from '../_common/utils/message';

import './style.less';

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    MsgRegister('EVENT:TOGGLE_MENU', this.toggleMenu);
  }

  componentWillUnmount() {
    MsgUnregister('EVENT:TOGGLE_MENU', this.toggleMenu);
  }

  componentDidCatch(error) {
    console.error(error);
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open,
    });
  }

  handleClick(event) {
    window.location = event.key;
  }

  render() {
    return (
      <div className={`menu ${this.state.open ? '' : 'close'}`}>
        <header>
          <div className="logo">
            <img src={require('./assets/logo.png')} />
          </div>
          <p>Ocean One</p>
        </header>
        <Menu
          onClick={this.handleClick}
          style={{ width: 254 }}
          mode="inline"
          defaultSelectedKeys={[window.location.hash]}
        >
          <Menu.SubMenu key="activity" title={<span>ACTIVITY</span>}>
            <Menu.Item key="#/activity/home">
              <Icon type="pie-chart" />
              <span>首页</span>
            </Menu.Item>
            <Menu.ItemGroup key="activity-table" title="表格">
              <Menu.Item key="#/activity/searchTable">
                <Icon type="table" />
                <span>查询表格</span>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          <Menu.SubMenu key="vip" title={<span>VIP</span>}>
            <Menu.Item key="#/vip/home">
              <Icon type="desktop" />
              <span>首页</span>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    );
  }
}
