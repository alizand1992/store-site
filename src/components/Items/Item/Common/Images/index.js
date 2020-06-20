import React from 'react';

import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Preview from '../../Preview';
import { LoadingPage } from '../../../../Common/LoadingPage';
import DragAndDrop from '../../../../../util/DragAndDrop';

import { saveImages } from '../../../../../util/ajax/Items/Item/New';
import { getImageData } from '../../../../../util/ajax/Items/Item/Edit';
import { isUserSignedIn } from '../../../../../util/ajax/User';

class Images extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_key: props.auth_key,
      deleted: [],
      data: [],
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

  onFileDrop = (newFiles) => {
    const { files } = this.state;

    for (let i = 0; i < newFiles.length; i++) {
      files.push(newFiles.item(i));
    }

    this.setState({ files });
  }

  onRemove = (files) => {
    this.setState({ files });
  }

  onDelete = (data, id) => {
    const { deleted } = this.state;
    deleted.push(id);

    this.setState({
      data, deleted
    });
  }

  submit = () => {
    let { id, files, deleted, auth_key } = this.state;

    saveImages(id, files, deleted, auth_key, (res) => {
      if (res.data.success) {
        this.props.history.push(`/item/edit/${id}/thumbnail`);
      }
    });
  }

  skip = () => {
    this.props.history.push(`/item/edit/${this.state.id}/thumbnail`);
  }

  saveIsDisabled = () => {
    const { deleted, files, thumbnail } = this.state;

    return files.length === 0 && thumbnail === 0 && deleted.length === 0;
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
            <DragAndDrop onFileDrop={this.onFileDrop} />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Preview data={data}
                     files={files}
                     onRemove={this.onRemove}
                     onDelete={this.onDelete} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={12} className="text-right">
            <Button variant="success" onClick={this.skip}>Skip</Button>
            {' '}
            <Button onClick={this.submit} disabled={this.saveIsDisabled()}>Save</Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth_key: state.user.auth_key,
});

export default connect(mapStateToProps)(Images);