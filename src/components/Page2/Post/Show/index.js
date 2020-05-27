import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Post extends React.Component {
  render() {
    const { title, body, created_at, updated_at } = this.props.post;

    return (

      <React.Fragment>
        <Row>
          <Col>
            <h2>{title}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="text-muted post-subtitle">
              Date: {created_at}
            </span>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            {body.split("\n").map((paragraph, index) => {
              return <p key={index}>{paragraph}</p>;
            })}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Post;