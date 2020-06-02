import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signOutUser } from '../../../util/ajax/User';
import { removeAuthKey } from '../../../actions/User';
import { LoadingPage } from '../../Common/LoadingPage';
import { Redirect } from 'react-router-dom';

class SignOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { auth_key } = this.props;

    if (prevProps.auth_key !== auth_key && auth_key === undefined) {
      this.setState({ redirect: true });
    } else {
      const key = auth_key || localStorage.getItem('auth_key')

      signOutUser(key, (res) => {
        localStorage.clear();
        this.props.removeAuthKey();
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    } else {
      return <LoadingPage />;
    }
  }
}

const mapStateToProps = (state) => ({
  auth_key: state.user.auth_key,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ removeAuthKey }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);