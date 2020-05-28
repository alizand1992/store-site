import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { setCurrentComponent } from '../../../../actions/common';
import PostForm from '../Common';

class New extends React.Component {
  componentDidMount() {
    this.props.setCurrentComponent('posts');
  }

  render() {
    return <PostForm />
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ setCurrentComponent }, dispatch);

export default connect(null, mapDispatchToProps)(New);