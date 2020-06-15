import React from 'react';

import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { LoadingPage } from '../../../../Common/LoadingPage';
import Thumbnail from './Thumbnail';

import { isUserSignedIn } from '../../../../../util/ajax/User';
import { getImageData } from '../../../../../util/ajax/Items/Item/Edit';

class SelectThumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_key: props.auth_key,
      id: 0,
      thumbnail: 0,
      images: [],
    };
  }

  getItemInformation = (auth_key) => {
    if (auth_key) {
      isUserSignedIn(auth_key, () => {
        const { id } = this.props.match.params;

        getImageData(id, (data) => {
          this.setState({
            auth_key,
            id,
            images: data,
          });
        });
      }, () => {
        this.setState({ redirect: true });
      });
    }
  }

  componentDidMount() {
    const { auth_key } = this.props;

    if (auth_key) {
      this.getItemInformation(auth_key);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { auth_key } = this.props;

    if (prevProps.auth_key !== auth_key) {
      this.getItemInformation(auth_key);
    }
  }

  thumbnail = (thumbnail) => {
    this.setState({ thumbnail });
  }

  done = () => {
    if (this.state.thumbnail === 0) {
      this.setState({ showModal: true });
    } else {
      this.props.history.push(`/`);
    }
  }

  render() {
    const { id, images, thumbnail } = this.state;

    if (!id) {
      return <LoadingPage />
    }

    return (
      <React.Fragment>
        <Row>
          <Col>
            <h3>Choose a Thumbnail:</h3>
          </Col>
        </Row>
        <Row>
          {images.map((image) => {
            return (
              <Col lg={4} md={4} sm={6} xs={6} key={image.url}>
                <Thumbnail image={image}
                           id={id}
                           thumbnail={this.thumbnail}
                           selected={image.id === thumbnail} />
              </Col>
            )
          })}
        </Row>
        <br />
        <Row>
          <Col lg={12} className="text-right">
            <Button onClick={this.done}>Done</Button>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  auth_key: state.user.auth_key,
});

export default connect(mapStateToProps)(SelectThumbnail);