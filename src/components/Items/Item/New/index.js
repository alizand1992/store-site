import React from 'react';

class New extends React.Component {
  componentDidMount() {
    this.props.history.push(`/item/new/information`);
  }

  render() {
    return null;
  }
}

export default New;