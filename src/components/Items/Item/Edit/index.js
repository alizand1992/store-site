import React from 'react';

class Edit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.history.push(`/item/edit/${id}/information`);
  }

  render() {
    return null;
  }
}

export default Edit;