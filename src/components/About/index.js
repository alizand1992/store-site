import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setCurrentComponent } from '../../actions/common';

class About extends React.Component {
  componentDidMount() {
    this.props.setCurrentComponent('about');
  }

  render() {
    return <div>About</div>;
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ setCurrentComponent }, dispatch);

export default connect(null, mapDispatchToProps)(About);