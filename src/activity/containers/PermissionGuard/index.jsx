import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { globalAction } from '../../action';

class PermissionGuard extends React.PureComponent {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    profileReady: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.profile.id) {
      // this.props.dispatch(globalAction.profile());
    }
  }

  render() {
    const { profileReady } = this.props;
    if (!profileReady) {
      return <div>LOADING...</div>;
    } else if (this.props.profile.id) {
      return <div className="container">{this.props.children}</div>;
    }
    window.location = '/#/forbidden';
    return null;
  }
}

const mapStateToProps = () => {
  return {
    profile: { id: 1 },
    profileReady: true,
  };
};

export default withRouter(connect(mapStateToProps)(PermissionGuard));
