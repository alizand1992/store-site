import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Preview from '../../Preview';
import { LoadingPage } from '../../../../Common/LoadingPage';
import { isUserSignedIn } from '../../../../../util/ajax/User';
import { getImageData } from '../../../../../util/ajax/Items/Item/Edit';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_key: props.auth_key,
      id: 0,
      files: [],
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
            data,
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

  render() {
    const { id, data, files } = this.state;

    if (!id) {
      return <LoadingPage />
    }

    return (
      <React.Fragment>
        <Row>
          <Col lg={12}>
            <Preview data={data}
                     files={files}
                     onRemove={this.onRemove}
                     onDelete={this.onDelete}
                     onThumbnail={this.onThumbnail} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Thumbnail;