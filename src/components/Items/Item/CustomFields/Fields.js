import React from 'react';

import Field from './Field';
import { getItemAttributes } from '../../../../util/ajax/Item';

class Fields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemId: props.itemId,
      fields: {},
    };
  }

  componentDidMount() {
    const { itemId } = this.state;
    let { fields } = this.state;

    if (itemId) {
      getItemAttributes(itemId, (res) => {
        const { attrs } = res.data;

        if (Array.isArray(attrs)) {
          fields = {...attrs};
        } else {
          fields[attrs.id] = { ...attrs };
        }

        this.setState({ fields });
        this.props.getFields(fields);
      });
    }
  }

  getField = (field) => {
    const { fields } = this.state;

    fields[field.id] = field;
    this.setState({ fields });

    this.props.getFields(fields);
  }

  render() {
    const { fields } = this.state;

    console.log(fields)

    return (
      <React.Fragment>
        {Object.values(fields).map((field) => {
          return <Field field={field} key={field.id} getField={this.getField} />;
        })}
      </React.Fragment>
    )
  }
}

export default Fields;