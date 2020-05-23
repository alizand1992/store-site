import React from 'react';

import CircularProgressBar from './CircularProgressBar';

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);

    this.uploadInputRef = React.createRef();

    this.state = {
      displayLoading: false,
    };
  }

  componentDidMount() {
    document.ondrop = (e) => {
      this.suppressEvent(e);

      // Stop the progress bar
      clearInterval(this.interval);
      this.interval = 0;

      const { files } = e.dataTransfer;

      // merge file list
      this.props.onFileDrop(files);

      this.setState({
        displayLoading: false,
      });
    };
  }

  drag = (e) => {
    this.suppressEvent(e);
    this.setState({ displayLoading: true });
  }

  suppressEvent = (e) => {
    e.preventDefault();
  }

  openUploadWindow = (e) => {
    this.uploadInputRef.current.click();
  }

  render() {
    const { displayLoading } = this.state;
    return (
      <div onDragOver={(e) => this.drag(e)}
           onDragEnter={(e) => this.suppressEvent(e)}
           onClick={(e) => this.openUploadWindow(e)}
           className="drop-zone" id="item-drop-zone">
        {!displayLoading &&
          <span style={{ display: 'inline-block' }}>
            <i className="material-icons md-64">archive</i><br/>
            Drag and Drop you images or click to upload
          </span>
        }
        {displayLoading && <CircularProgressBar />}
        <input style={{ display: 'none' }}
               multiple={true}
               accept="image/*"
               type="file"
               onChange={(e) => this.props.onFileDrop(this.uploadInputRef.current.files)}
               ref={this.uploadInputRef} />
      </div>
    )
  }
}

export default DragAndDrop;