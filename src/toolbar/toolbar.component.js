import React from 'react';
import { Icon, Badge } from 'antd';
import { MsgTrigger } from '../_common/utils/message';

import './style.less';

export default class Toolbar extends React.Component {
  constructor() {
    super();
  }

  componentDidCatch(error) {
    console.error(error);
  }

  toggleMenu() {
    MsgTrigger('EVENT:TOGGLE_MENU');
  }

  render() {
    return (
      <div className="toolbar">
        <Icon type="menu-fold" className="menu-trigger" onClick={this.toggleMenu} />
        <div className="personal">
          <Badge count={5}>
            <Icon type="bell" />
          </Badge>
          <p className="user">GaoYuan</p>
        </div>
      </div>
    );
  }
}
