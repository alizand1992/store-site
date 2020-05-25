import React from 'react';
import Col from 'react-bootstrap/Col';
import DragAndDrop from '../../../../../util/DragAndDrop';
import Preview from '../../Preview';
import Row from 'react-bootstrap/Row';
import { LoadingPage } from '../../../../Common/LoadingPage';
import Button from 'react-bootstrap/Button';
import { saveImages } from '../../../../../util/ajax/Items/Item/New';

class Images extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id,
    });
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

  onThumbnail = (thumbnail) => {
    this.setState({ thumbnail });
  }

  submit = () => {
    let { id, files, thumbnail } = this.state;

    if (!thumbnail && files) {
      thumbnail = files[0];
    }

    saveImages(id, thumbnail, files, (res) => {
      if (res.data.success) {
        this.props.history.push(`/`);
      }
    });
  }

  skip = () => {
    this.props.history.push(`/`);
  }

  render() {
    const { id, files } = this.state;
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
            <Preview files={files} onRemove={this.onRemove} onThumbnail={this.onThumbnail} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={12} className="text-right">
            <Button onClick={this.skip}>Skip</Button>
            {' '}
            <Button onClick={this.submit} disabled={files.length === 0}>Save</Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Images;