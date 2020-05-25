import React from 'react';

import { v1 as uuidv1 } from 'uuid';

import Thumbnail from './Thumbnail';
import ListGroup from 'react-bootstrap/ListGroup';

class Preview extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: 0,
      files: props.files,
    };
  }

  makeThumbnail = (index) => {
    const { files } = this.state;

    this.setState({ thumbnail: index })
    this.props.onThumbnail(files[index]);
  }

  remove = (index) => {
    let { files } = this.state;
    files = files.filter((_f, i) => i !== index);

    this.setState({ files });

    this.props.onRemove(files);
  }

  render() {
    const { files, thumbnail } = this.state

    return (
      <ListGroup>
        {files.map((file, index) => {
          return (
            <Thumbnail index={index}
                       remove={this.remove}
                       inMemoryFile={file}
                       key={uuidv1()}
                       thumbnail={thumbnail}
                       makeThumbnail={this.makeThumbnail} />
          );
        })}
      </ListGroup>
    );
  }
}

export default Preview;