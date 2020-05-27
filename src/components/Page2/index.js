import React from 'react';
import Post from './Post/Show';
import { getActivePosts } from '../../util/ajax/Post';

class Page2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    getActivePosts((res) => {
      this.setState({ posts: res.data.posts });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <React.Fragment>
        {posts.map((post) => {
          return <Post post={post} />
        })}
      </React.Fragment>
    );
  }
}

export default Page2;