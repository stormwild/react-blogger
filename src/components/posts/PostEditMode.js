import React, {PropTypes} from 'react';
import TextArea from '../common/TextArea';
import {Grid, Row, Col} from 'react-bootstrap';
import PostOutput from './PostOutput';

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
              initialHeight={'45px'}
            />
            <TextArea
              onChange={handleChange.bind(this, 'post-content')}
              value={post.content || ''}
              initialHeight={'750px'}
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
