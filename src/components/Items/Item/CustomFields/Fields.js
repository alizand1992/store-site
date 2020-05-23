import React from 'react';
import { v1 as uuidv1 } from 'uuid';

import Field from './Field';

class Fields extends React.Component {
  getField = (field) => {

  }

  render() {
    const { fields } = this.props;

    return (
      <React.Fragment>
        {fields.map((field) => {
          return <Field field={field} key={uuidv1()} getField={this.getField} />;
        })}
      </React.Fragment>
    )
  }
}

export default Fields;