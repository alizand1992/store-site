import React from 'react';

import { v1 as uuidv1 } from 'uuid';

import Thumbnail from './Thumbnail';
import { getItemImages } from '../../../../util/ajax/Preview';

class Preview extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  componentDidMount() {
    const { itemId } = this.props;

    if (itemId && !isNaN(itemId)) {

    }

  }

  render() {
    const { files } = this.state

    console.log('render', files)

    return (
      <div className="preview-container">
        {files.map((file) => {
          console.log(file)
          return (
            <Thumbnail file={file} key={uuidv1()} />
          );
        })}
      </div>
    );
  }
}

export default Preview;