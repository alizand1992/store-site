import React from 'react';
import Fields from './Fields';
import NewFields from './NewFields';

class CustomFields extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Fields fields={this.props.fields} />
        <NewFields />
      </React.Fragment>
    )
  }
}

export default CustomFields;