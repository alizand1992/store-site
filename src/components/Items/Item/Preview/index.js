import React from 'react';

import { v1 as uuidv1 } from 'uuid';

import Thumbnail from './Thumbnail';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Preview extends React.Component{
  render() {
    const { files } = this.props

    return (
      <div className="preview-container">
        {files.map((file) => {
          return (
            <Thumbnail file={file} key={uuidv1()} />
          );
        })}
      </div>
    );
  }
}

export default Preview;