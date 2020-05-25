import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { getImage } from '../../../../util/ajax/Preview';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image: null,
      showInfo: false,
    };
  }

  componentDidMount() {
    const { inMemoryFile } = this.props;

    // Coming from the server
    if (inMemoryFile.url) {
      if (inMemoryFile.url) {
        getImage(inMemoryFile, (blob) => {
          this.fileFromBlob(blob, inMemoryFile);
        });
      }
    } else {
      this.fileFromBlob(inMemoryFile, { name: inMemoryFile.name })
    }
  }

  fileFromBlob = (blob, data) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = () => {
      this.setState({
        name: data.name,
        image: fileReader.result
      });
    }
  }

  showInfo = () => {
    this.setState({ showInfo: true });
  }

  hideInfo = () => {
    this.setState({ showInfo: false });
  }

  info = () => {
    const { name } = this.state;
    let displayName = name.substr(0, 15);

    if (displayName.length !== name.length) {
      displayName += '...';
    }

    return displayName;
  }

  render() {
    const { image, showInfo } = this.state;

    if (!image) {
      return (
        <div className="preview-thumbnail text-center"
             style={{ paddingTop: '40px' }}>
          <Spinner animation="border" />
        </div>
      );
    }

    return (
      <div className="preview-thumbnail">
        <Card onMouseEnter={this.showInfo} onMouseLeave={this.hideInfo}>
          <Card.Img src={image}/>
          {showInfo &&
            <Card.ImgOverlay>
              <Card.Text className="display-name">
                {this.info()}
              </Card.Text>
            </Card.ImgOverlay>
          }
        </Card>
      </div>
    );
  }
}

export default Thumbnail;