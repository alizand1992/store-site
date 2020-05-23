import React from 'react';
import Fields from './Fields';
import NewFields from './NewFields';

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
        <Fields itemId={this.props.itemId} getFields={this.getFields}/>
        <NewFields getFields={this.getFields} />
      </React.Fragment>
    )
  }
}

export default CustomFields;