import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { activityAction } from '../../redux/activity';
import Bread from 'component/Bread';

import './style.less';

const paths = [
  { text: 'Activity' },
  { text: 'Home', link: '/activity/home' },
];

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(activityAction.list());
  }

  render() {
    return [
      <Bread paths={paths} key="breadcrumb" />,
      <div key="activity-home" className="activity-home">
        <Card>
          <h1>WELCOME TO AVTIVITY SYSTEM</h1>
        </Card>
      </div>
    ];
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.activity.list
  };
};

export default withRouter(connect(mapStateToProps)(Home));
