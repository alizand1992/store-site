import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Preview from '../../Preview';
import Row from 'react-bootstrap/Row';

import { LoadingPage } from '../../../../Common/LoadingPage';
import DragAndDrop from '../../../../../util/DragAndDrop';

import { saveImages } from '../../../../../util/ajax/Items/Item/New';
import { getImageData } from '../../../../../util/ajax/Items/Item/Edit';

class Images extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: -1,
      deleted: [],
      data: [],
      files: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    getImageData(id, (data) => {
      this.setState({
        id,
        data,
      });
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

  onDelete = (data, id) => {
    const { deleted } = this.state;
    deleted.push(id);

    this.setState({
      data, deleted
    });
  }

  onThumbnail = (thumbnail) => {
    console.log(thumbnail)
    this.setState({ thumbnail });
  }

  submit = () => {
    let { id, files, data, deleted, thumbnail } = this.state;

    console.log(id, files, thumbnail)

    if (thumbnail === -1 && files) {
      thumbnail = files[0];
    } else {
      let temp = data.filter(d => d.id === thumbnail);

      if (deleted.includes(thumbnail)) {
        if (data.length > 0) {
          thumbnail = data[0].id;
        } else if (files.length > 0) {
          thumbnail = files[0];
        }
      } else if (temp.length === 1) {
        thumbnail = temp[0].id;
      } else {
        let addToIndex = 0;
        data.forEach((d) => { if (d.id > addToIndex) addToIndex = d.id; });
        addToIndex++;
        thumbnail = files[thumbnail - addToIndex]
      }
    }

    saveImages(id, thumbnail, files, deleted, (res) => {
      if (res.data.success) {
        this.props.history.push(`/`);
      }
    });
  }

  skip = () => {
    this.props.history.push(`/`);
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
                     onDelete={this.onDelete}
                     onThumbnail={this.onThumbnail} />
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

export default Images;