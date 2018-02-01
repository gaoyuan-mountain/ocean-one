import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { authAction } from '../../redux/auth';

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
      this.props.dispatch(authAction.profile());
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

const mapStateToProps = (state) => {
  return {
    profile: state.auth.profile,
    profileReady: state.auth.profileReady,
  };
};

export default withRouter(connect(mapStateToProps)(PermissionGuard));
