import React from 'react';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import { LoadingPage } from '../../../Common/LoadingPage';

import { getImageUrls } from '../../../../util/ajax/Items/Item/Show';

class Images extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id
    }
  }

  componentDidMount() {
    const { id } = this.props;

    getImageUrls(id, (urls) => {
      urls = urls.map((url => url.replace(':3000', ':5001')))
      this.setState({ urls });
    }, (err) => {
      if (err.response.status === 401) {
        this.props.noPermission();
      }
    });
  }

  render() {
    const { urls } = this.state;

    if (!urls) {
      return <LoadingPage />
    }

    return (
      <div style={{ display: 'block', overflowY: 'scroll', overflowX: 'hidden', height: '85vh' }}>
        {urls.map((url) => {
          return (
            <React.Fragment key={url}>
              <Row>
                <Col lg={12}>
                  <Image style={{ imageOrientation: 'from-image' }} src={url} fluid />
                </Col>
              </Row>
              <br />
            </React.Fragment>
          );
        })}
      </div>);
  }
}

export default Images;