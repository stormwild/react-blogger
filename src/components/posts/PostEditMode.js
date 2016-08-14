import React, {PropTypes} from 'react';
import TextArea from '../common/TextArea';
import {Grid, Row, Col} from 'react-bootstrap';
import PostOutput from './PostOutput';
import * as constants from 'constants/constants';

class PostEditMode extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {post, handleChange} = this.props;

    return (
      <Grid>
        <Row>
          <Col sm={6}>
            <TextArea
              onChange={handleChange.bind(this, 'post-title')}
              value={post.title || ''}
              initialHeight={constants.TEXTAREA_HEADER_HEIGHT}
            />
            <TextArea
              onChange={handleChange.bind(this, 'post-content')}
              value={post.content || ''}
              initialHeight={constants.TEXTAREA_CONTENT_HEIGHT}
            />
          </Col>
          <Col sm={6}>
            <PostOutput post={post} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

PostEditMode.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostEditMode;
