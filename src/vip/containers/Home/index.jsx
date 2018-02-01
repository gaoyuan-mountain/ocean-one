import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import { vipAction } from '../../redux/vip';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(vipAction.list());
  }

  render() {
    return (
      <div>
        <h2>VIP LIST</h2>
        <Button type="primary">Primary</Button>
        <ul>
          {
            this.props.list.map((vip) => {
              return <li key={vip.id}>{ vip.username }</li>;
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.vip.list
  };
};

export default withRouter(connect(mapStateToProps)(Home));
