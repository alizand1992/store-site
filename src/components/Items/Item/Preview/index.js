import React from 'react';

import { v1 as uuidv1 } from 'uuid';

import Thumbnail from './Thumbnail';
import { getItemImageData } from '../../../../util/ajax/Preview';

class Preview extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      files: props.files,
    };
  }

  componentDidMount() {
    const { itemId } = this.props;
    const { files } = this.state;

    if (itemId && !isNaN(itemId)) {
      getItemImageData(itemId, (image_data) => {
        this.setState({
          files: {
            ...files,
            ...image_data,
          }
        })
      });
    }
  }

  render() {
    const { files } = this.state

    const fileArr = Object.values(files);
    fileArr.push(...this.props.files);

    return (
      <div className="preview-container">
        {fileArr.map((file) => {
          return (
            <Thumbnail inMemoryFile={file} key={uuidv1()} />
          );
        })}
      </div>
    );
  }
}

export default Preview;