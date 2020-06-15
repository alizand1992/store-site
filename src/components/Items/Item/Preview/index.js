import React from 'react';

import Thumbnail from './Thumbnail';
import ListGroup from 'react-bootstrap/ListGroup';

class Preview extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      files: props.files,
    };
  }

  remove = (index) => {
    let { files } = this.state;
    files = files.filter((_f, i) => i !== index);

    this.setState({ files });

    this.props.onRemove(files);
  }

  delete = (id) => {
    let { data } = this.state;
    data = data.filter(d => d.id !== id);

    this.setState({ data });
    this.props.onDelete(data, id)
  }

  render() {
    const { data, files } = this.state

    let addToIndex = 0;

    if (data) {
      addToIndex = 0;
      data.forEach((d) => { if (d.id > addToIndex) addToIndex = d.id; });
      addToIndex++;
    }


    return (
      <ListGroup>
        {data.map((d) => {
          return (
            <Thumbnail index={d.id}
                       remove={this.delete}
                       inMemoryFile={d}
                       key={d.id} />
          )
        })}
        {files.map((file, index) => {
          return (
            <Thumbnail index={index + addToIndex}
                       remove={this.remove}
                       inMemoryFile={file}
                       key={index} />
          );
        })}
      </ListGroup>
    );
  }
}

export default Preview;