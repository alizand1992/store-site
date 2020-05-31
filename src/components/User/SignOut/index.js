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

  componentDidMount() {
    const { auth_key } = this.props;

    if (auth_key || localStorage.getItem('auth_key')) {
      const key = auth_key || localStorage.getItem('auth_key')

      signOutUser(key, (res) => {
        console.log(res)
        localStorage.clear();
        removeAuthKey();

        this.setState({ redirect: true });
      });
    } else {
      this.setState({ redirect: true });
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