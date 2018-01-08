import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { activityAction } from '../../action';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(activityAction.list());
  }

  render() {
    return (
      <div>
        <h2>ACTIVITY LIST</h2>
        <ul>
        {
          this.props.list.map((activity) => {
            return <li key={activity.id}>{ activity.title }</li>;
          })
        }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.activity.list
  };
};

export default withRouter(connect(mapStateToProps)(Home));
