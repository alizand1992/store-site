import React from 'react';

import { v1 as uuidv1 } from 'uuid';

import Thumbnail from './Thumbnail';
import { getItemImageData } from '../../../../util/ajax/Preview';

class Preview extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      image_data: [],
      files: [],
    };
  }

  componentDidMount() {
    const { itemId } = this.props;

    if (itemId && !isNaN(itemId)) {
      getItemImageData(itemId, (image_data) => {
        this.setState({ image_data })
      });
    }
  }

  render() {
    const { image_data } = this.state

    return (
      <div className="preview-container">
        {image_data.map((data) => {
          return (
            <Thumbnail data={data} key={uuidv1()} />
          );
        })}
      </div>
    );
  }
}

export default Preview;