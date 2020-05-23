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

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.setState({
          name: file.name,
          image: fileReader.result
        });
      }
    }
  }

  showInfo = () => {
    console.log('showInfo');
    this.setState({ showInfo: true });
  }

  hideInfo = () => {
    console.log('hideInfo');
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

    console.log(showInfo);

    if (!image) {
      return <Spinner animation="border" />;
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