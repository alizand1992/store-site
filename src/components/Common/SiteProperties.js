import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSiteProperties } from '../../util/ajax/Common';
import { setSiteProperties } from '../../actions/common';

class SiteProperties extends React.Component {
  componentDidMount() {
    getSiteProperties((res) => {
      this.props.setSiteProperties(res.data.properties)
    })
  }

  render() {
    return <React.Fragment />
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ setSiteProperties }, dispatch);

export default connect(null, mapDispatchToProps)(SiteProperties);