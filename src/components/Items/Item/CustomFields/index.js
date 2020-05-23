import React from 'react';
import Fields from './Fields';
import NewFields from './NewFields';

class CustomFields extends React.Component {
  getFields = (fields) => {
    console.log(fields)
  }

  render() {
    return (
      <React.Fragment>
        <Fields itemId={this.props.itemId} getFields={this.getFields}/>
        <NewFields />
      </React.Fragment>
    )
  }
}

export default CustomFields;