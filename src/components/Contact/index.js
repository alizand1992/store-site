import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setCurrentComponent } from '../../actions/common';


class Contact extends React.Component {
  componentDidMount() {
    this.props.setCurrentComponent('contact');
  }

  render() {
    return <div>Contact</div>;
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ setCurrentComponent }, dispatch);

export default connect(null, mapDispatchToProps)(Contact);