import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { message } from 'ocean-utils';
import { withRouter } from 'react-router-dom';

import './style.less';

const { MsgRegister, MsgUnregister } = message;

class Navbar extends React.Component {
  static propTypes = {
    history: PropTypes.any.isRequired,
  }

  constructor() {
    super();
    this.state = {
      open: true
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    this.props.history.push(event.key);
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
          defaultSelectedKeys={[window.location.pathname]}
        >
          <Menu.SubMenu key="activity" title={<span>ACTIVITY</span>}>
            <Menu.Item key="/activity/home">
              <Icon type="pie-chart" />
              <span>首页</span>
            </Menu.Item>
            <Menu.ItemGroup key="activity-table" title="表格">
              <Menu.Item key="/activity/searchTable">
                <Icon type="table" />
                <span>查询表格</span>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Navbar);
