import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setCurrentComponent } from '../../../../actions/common';
import PostForm from '../Common';
import { getPost } from '../../../../util/ajax/Post';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      active: false,
    };
  }

  componentDidMount() {
    this.props.setCurrentComponent('posts');

    const { id } = this.props.match.params;

    if (id) {
      getPost(id, (res) => {
        const { post } = res.data;

        this.setState({ ...post });
      });
    }
  }

  render() {
    const { id, title, active, body } = this.state;

    return <PostForm id={id} title={title} active={active} body={body} />;
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ setCurrentComponent }, dispatch);

export default connect(null, mapDispatchToProps)(Edit);