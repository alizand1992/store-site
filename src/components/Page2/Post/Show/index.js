import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Post extends React.Component {
  render() {
    const created_at = '1/1/2019';
    const updated_at = '11/25/2020'
    const body = "This is the first line.\nThis is the second line."

    return (
      <React.Fragment>
        <Row>
          <Col>
            <h2>Title</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="text-muted post-subtitle">
              Date: {created_at}
            </span>
            <span className="text-muted post-subtitle">
              Last Editted: {updated_at}
            </span>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            {body.split("\n").map((paragraph) => {
              return <p>{paragraph}</p>;
            })}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Post;