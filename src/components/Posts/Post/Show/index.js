import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Post extends React.Component {
  render() {
    const { id, title, body, created_at } = this.props.post;

    return (
      <React.Fragment>
        <Row>
          <Col>
            <h2>{title}</h2>
          </Col>
          {this.props.auth_key &&
            <Col lg={1}>
              <span style={{ display: 'inline-block', paddingTop: '10px', cursor: 'pointer' }}>
                <Link to={`/posts/${id}/edit/`} style={{ color: 'black' }}>
                  <i className="material-icons">edit</i>
                </Link>
              </span>
            </Col>
          }
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

const mapStateToProps = (state) => ({
  auth_key: state.user.auth_key,
});

export default connect(mapStateToProps)(Post);