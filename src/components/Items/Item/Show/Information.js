import React from 'react';

class Information extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id
    }
  }

  componentDidMount() {
    const { id } = this.props;

  }

  render() {
    return (
      <React.Fragment></React.Fragment>
    );
  }
}

export default Information;