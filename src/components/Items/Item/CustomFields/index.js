import React from 'react';


class CustomFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newFields: [],
      fields: {}
    }
  }

  getFields = (updatedFields) => {
    let { fields, newFields } = this.state;

    if (Array.isArray(updatedFields)) {
      newFields = updatedFields;
      this.setState({ newFields });
    } else {
      fields = updatedFields;
      this.setState({ fields });
    }

    this.props.getFields({ fields, newFields });
  }

  render() {
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
}

export default CustomFields;