import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

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
    const { file } = this.props;

    console.log(file)

    if (file) {
      let blob = file;
      if (file.image) {
        blob = file.image
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = () => {
        this.setState({
          name: file.name,
          image: fileReader.result
        });
      }
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