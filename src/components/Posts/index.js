import React from 'react';
import Post from './Post/Show';
import { getActivePosts } from '../../util/ajax/Post';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentComponent } from '../../actions/common';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.props.setCurrentComponent('posts');

    getActivePosts((res) => {
      this.setState({ posts: res.data.posts });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <React.Fragment>
        {posts.map((post) => {
          return <Post post={post} key={post.id} />
        })}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ setCurrentComponent }, dispatch);

export default connect(null, mapDispatchToProps)(Posts);