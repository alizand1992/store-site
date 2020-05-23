import React from 'react';
import Fields from './Fields';
import NewFields from './NewFields';

class CustomFields extends React.Component {
  getFields = (fields) => {

  }

  render() {
    return (
      <React.Fragment>
        <Fields fields={this.props.fields} getFields={this.getFields}/>
        <NewFields />
      </React.Fragment>
    )
  }
}

export default CustomFields;