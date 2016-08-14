import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import MarkdownOutput from '../common/MarkdownOutput';
import PostOutput from './PostOutput';

class PostViewMode extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {post} = this.props;
    
    return (
      <Grid>
        <Row>
          <Col sm={12}>
            <PostOutput post={post} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

PostViewMode.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostViewMode;
