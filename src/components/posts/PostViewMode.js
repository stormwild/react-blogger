import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import MarkdownOutput from '../common/MarkdownOutput';

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
            <h1><MarkdownOutput content={post.title || ''} /></h1>
            <MarkdownOutput content={post.content || ''} />
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
